export interface Env {
  RESEND_API_KEY: string;
  LEAD_TO_EMAIL: string;
  LEAD_FROM_EMAIL: string;
  NOTION_TOKEN?: string;
  NOTION_DATABASE_ID?: string;
}

type LeadPayload = {
  name: string;
  email: string;
  whatsapp?: string;
  company?: string;
  role?: string;
  syndicateSize?: string;
  delivery?: string;
  datasets?: string[];
  message?: string;
  intent: string;
  locale: string;
  website?: string;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function isValidLead(payload: LeadPayload): boolean {
  return Boolean(
    payload.name &&
      payload.email &&
      !payload.website,
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendResendEmail(env: Env, to: string, subject: string, html: string) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: env.LEAD_FROM_EMAIL,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const text = await response.text().catch(() => "");
    throw new Error(`Resend ${response.status}: ${text || response.statusText}`);
  }
}

async function appendNotionRow(env: Env, payload: LeadPayload) {
  if (!env.NOTION_TOKEN || !env.NOTION_DATABASE_ID) {
    return;
  }

  await fetch(`https://api.notion.com/v1/pages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      parent: { database_id: env.NOTION_DATABASE_ID },
      properties: {
        Name: { title: [{ text: { content: payload.name } }] },
        Company: { rich_text: [{ text: { content: payload.company ?? "" } }] },
        Intent: { rich_text: [{ text: { content: payload.intent } }] },
        Locale: { rich_text: [{ text: { content: payload.locale } }] },
      },
    }),
  });
}

function buildLeadHtml(payload: LeadPayload) {
  const datasets = (payload.datasets ?? []).join(", ");
  return `
    <h2>New Horsorion lead</h2>
    <p><strong>Intent:</strong> ${escapeHtml(payload.intent)}</p>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    <p><strong>WhatsApp:</strong> ${escapeHtml(payload.whatsapp ?? "")}</p>
    <p><strong>Company:</strong> ${escapeHtml(payload.company ?? "")}</p>
    <p><strong>Role:</strong> ${escapeHtml(payload.role ?? "")}</p>
    <p><strong>Team size:</strong> ${escapeHtml(payload.syndicateSize ?? "")}</p>
    <p><strong>Delivery:</strong> ${escapeHtml(payload.delivery ?? "")}</p>
    <p><strong>Datasets:</strong> ${escapeHtml(datasets)}</p>
    <p><strong>Locale:</strong> ${escapeHtml(payload.locale)}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;font-family:inherit;">${escapeHtml(payload.message ?? "")}</pre>
  `;
}

function buildConfirmationHtml(locale: string) {
  if (locale === "zh-Hant") {
    return `
      <p>多謝聯絡 Horsorion。</p>
      <p>我們已收到您的查詢，團隊會於 1 個工作天內回覆。如屬緊急事宜，可直接 WhatsApp +852 9600 5554。</p>
      <p>— Horsorion Team</p>
    `;
  }
  return `
    <p>Thanks for contacting Horsorion.</p>
    <p>Your enquiry has been received. The team will reply within one business day. For anything time-sensitive, WhatsApp us at +852 9600 5554.</p>
    <p>— Horsorion Team</p>
  `;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405, headers: corsHeaders });
    }

    let payload: LeadPayload;
    try {
      payload = (await request.json()) as LeadPayload;
    } catch {
      return new Response(JSON.stringify({ ok: false, error: "Invalid JSON" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (!isValidLead(payload)) {
      return new Response(JSON.stringify({ ok: false, error: "Invalid payload" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const errors: string[] = [];

    // 1) Notification to inbox — best-effort; always return 200 to the user.
    try {
      await sendResendEmail(
        env,
        env.LEAD_TO_EMAIL,
        `Horsorion lead: ${payload.intent}`,
        buildLeadHtml(payload),
      );
    } catch (error) {
      errors.push(`notify: ${String(error)}`);
    }

    // 2) Confirmation to user — best-effort.
    try {
      await sendResendEmail(
        env,
        payload.email,
        "Horsorion enquiry received",
        buildConfirmationHtml(payload.locale),
      );
    } catch (error) {
      errors.push(`confirm: ${String(error)}`);
    }

    // 3) Notion mirror — best-effort.
    try {
      await appendNotionRow(env, payload);
    } catch (error) {
      errors.push(`notion: ${String(error)}`);
    }

    return new Response(JSON.stringify({ ok: true, errors }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  },
};
