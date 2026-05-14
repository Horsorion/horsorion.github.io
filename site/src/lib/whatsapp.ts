/** E.164 without + (HK business line shown on site). */
const WHATSAPP_PHONE = "85296005554";

/**
 * WhatsApp Web/API chat link. Prefer this over wa.me — some browsers/regions
 * handle api.whatsapp.com more reliably.
 */
export function getWhatsappHref(prefillMessage?: string): string {
  const params = new URLSearchParams({
    phone: WHATSAPP_PHONE,
    type: "phone_number",
    app_absent: "0",
  });
  if (prefillMessage) params.set("text", prefillMessage);
  return `https://api.whatsapp.com/send/?${params.toString()}`;
}
