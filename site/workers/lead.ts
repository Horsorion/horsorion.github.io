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
  company: string;
  role: string;
  syndicateSize: string;
  delivery: string;
  datasets: string[];
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
      payload.company &&
      payload.role &&
      payload.syndicateSize &&
      payload.delivery &&
      Array.isArray(payload.datasets) &&
      payload.datasets.length > 0 &&
      !payload.website,
  );
}

async function sendResendEmail(env: Env, _payload: LeadPayload, to: string, subject: string, html: string) {
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
    throw new Error(`Resend failed with status ${response.status}`);
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
        Company: { rich_text: [{ text: { content: payload.company } }] },
        Intent: { rich_text: [{ text: { content: payload.intent } }] },
        Locale: { rich_text: [{ text: { content: payload.locale } }] },
      },
    }),
  });
}

function buildLeadHtml(payload: LeadPayload) {
  return `
    <h2>New Horsorion lead</h2>
    <p><strong>Intent:</strong> ${payload.intent}</p>
    <p><strong>Name:</strong> ${payload.name}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Company:</strong> ${payload.company}</p>
    <p><strong>Role:</strong> ${payload.role}</p>
    <p><strong>Team size:</strong> ${payload.syndicateSize}</p>
    <p><strong>Delivery:</strong> ${payload.delivery}</p>
    <p><strong>Datasets:</strong> ${payload.datasets.join(", ")}</p>
    <p><strong>Message:</strong> ${payload.message ?? ""}</p>
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

    try {
      const payload = (await request.json()) as LeadPayload;

      if (!isValidLead(payload)) {
        return new Response(JSON.stringify({ ok: false, error: "Invalid payload" }), {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      const leadHtml = buildLeadHtml(payload);

      await sendResendEmail(env, payload, env.LEAD_TO_EMAIL, `Horsorion lead: ${payload.intent}`, leadHtml);

      await sendResendEmail(
        env,
        payload,
        payload.email,
        "Horsorion enquiry received",
        "<p>Thanks for contacting Horsorion. We will follow up shortly.</p>",
      );

      await appendNotionRow(env, payload);

      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    } catch (error) {
      return new Response(JSON.stringify({ ok: false, error: String(error) }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  },
};
