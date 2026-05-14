import type { LeadIntent } from "./i18n";

const intentMap: Record<string, LeadIntent> = {
  "request-info": "request-info",
  "request-dictionary": "request-dictionary",
  "request-sample": "request-sample",
  "talk-to-us": "talk-to-us",
  "api-waitlist": "api-waitlist",
  "sample-std": "request-sample",
  "sample-pro": "request-sample",
};

export function resolveLeadIntent(value: string | null | undefined): LeadIntent {
  if (!value) {
    return "request-info";
  }

  return intentMap[value] ?? "request-info";
}
