import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { SiteCopy } from "@/lib/i18n";

const step1Schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().optional(),
  intent: z.enum(["request-info", "request-sample", "request-dictionary", "talk-to-us", "api-waitlist"]),
  website: z.string().optional(),
});

const step2Schema = z.object({
  company: z.string().optional(),
  role: z.string().optional(),
  syndicateSize: z.string().optional(),
  delivery: z.string().optional(),
  datasets: z.string().optional(),
  message: z.string().optional(),
});

type Step1 = z.infer<typeof step1Schema>;
type Step2 = z.infer<typeof step2Schema>;

type Props = {
  copy: SiteCopy;
};

const defaultEndpoint = "/api/lead";

function trapFocus(el: HTMLElement) {
  const focusable = el.querySelectorAll<HTMLElement>(
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  function handler(e: KeyboardEvent) {
    if (e.key !== "Tab") return;
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }

  el.addEventListener("keydown", handler);
  return () => el.removeEventListener("keydown", handler);
}

export default function LeadCaptureModal({ copy }: Props) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [step1Data, setStep1Data] = useState<Step1 | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const endpoint =
    (import.meta.env.PUBLIC_LEAD_ENDPOINT || "").trim() || defaultEndpoint;

  const {
    register: reg1,
    handleSubmit: hs1,
    reset: reset1,
    formState: { errors: e1 },
  } = useForm<Step1>({ resolver: zodResolver(step1Schema) });

  const { register: reg2, handleSubmit: hs2, reset: reset2 } = useForm<Step2>();

  const openModal = (intent?: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setStep(1);
    reset1({ intent: (intent ?? "request-info") as Step1["intent"] });
    reset2();
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    setStep1Data(null);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    const handler = (e: CustomEvent<{ intent?: string }>) => openModal(e.detail?.intent);
    window.addEventListener("open-lead-modal", handler as EventListener);
    return () => window.removeEventListener("open-lead-modal", handler as EventListener);
  }, []);

  useEffect(() => {
    if (!open) return;
    const cleanup = modalRef.current ? trapFocus(modalRef.current) : undefined;
    const first = modalRef.current?.querySelector<HTMLElement>("input, button");
    first?.focus();

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      cleanup?.();
    };
  }, [open]);

  const onStep1 = hs1((data) => {
    setStep1Data(data);
    setStep(2);
  });

  const onStep2 = hs2(async (data) => {
    if (!step1Data) return;
    setSubmitting(true);
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: step1Data.name,
          email: step1Data.email,
          whatsapp: step1Data.whatsapp ?? "",
          intent: step1Data.intent,
          company: data.company ?? "",
          role: data.role ?? "",
          syndicateSize: data.syndicateSize ?? "",
          delivery: data.delivery ?? "",
          datasets: data.datasets ? [data.datasets] : [],
          message: data.message ?? "",
          locale: copy.locale,
          website: step1Data.website ?? "",
        }),
      });
    } catch {
      // proceed anyway — don't block user
    } finally {
      setSubmitting(false);
      closeModal();
      window.location.href = copy.locale === "en" ? "/en/thank-you" : "/thank-you";
    }
  });

  const skipStep2 = async () => {
    if (!step1Data) return;
    setSubmitting(true);
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: step1Data.name,
          email: step1Data.email,
          whatsapp: step1Data.whatsapp ?? "",
          intent: step1Data.intent,
          company: "",
          role: "",
          syndicateSize: "",
          delivery: "",
          datasets: [],
          message: "",
          locale: copy.locale,
          website: step1Data.website ?? "",
        }),
      });
    } catch {
      // proceed anyway
    } finally {
      setSubmitting(false);
      closeModal();
      window.location.href = copy.locale === "en" ? "/en/thank-you" : "/thank-you";
    }
  };

  if (!open) return null;

  const lf = copy.leadForm;
  const isZh = copy.locale === "zh-Hant";
  const t = {
    requiredShort:    isZh ? "必填" : "Required",
    requiredEmail:    isZh ? "有效電郵必填" : "Valid email required",
    requiredChoose:   isZh ? "請選擇一項" : "Please choose one",
    submitting:       isZh ? "送出中…" : "Submitting…",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label={step === 1 ? lf.title : (copy.locale === "zh-Hant" ? "補充資料（選填）" : "Additional details (optional)")}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal} />

      {/* Panel */}
      <div
        ref={modalRef}
        className="relative z-10 w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl"
      >
        {/* Close button */}
        <button
          type="button"
          className="absolute right-5 top-5 flex items-center gap-1 rounded-xl px-3 py-1.5 text-xs text-slate-500 hover:bg-slate-100"
          onClick={closeModal}
          aria-label={copy.locale === "zh-Hant" ? "關閉" : "Close"}
        >
          {copy.locale === "zh-Hant" ? "關閉" : "Close"}
          <span aria-hidden="true" className="text-base leading-none">×</span>
        </button>

        {/* Step indicator */}
        <div className="mb-6 flex items-center gap-2">
          <div className={`h-2 w-2 rounded-full ${step === 1 ? "bg-brand-navy" : "bg-brand-gold"}`} />
          <div className={`h-2 w-2 rounded-full ${step === 2 ? "bg-brand-navy" : "bg-slate-200"}`} />
          <span className="ml-2 text-xs text-slate-500">
            {step === 1
              ? (copy.locale === "zh-Hant" ? "第 1 步（必填）" : "Step 1 of 2 (required)")
              : (copy.locale === "zh-Hant" ? "第 2 步（選填）" : "Step 2 of 2 (optional)")}
          </span>
        </div>

        {step === 1 && (
          <form onSubmit={onStep1} className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">{lf.title}</h2>
              <p className="mt-2 text-sm text-slate-600">{lf.subtitle}</p>
            </div>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              {lf.name}
              <input
                type="text"
                autoComplete="name"
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
                {...reg1("name")}
              />
              {e1.name && <span className="text-xs text-red-600">{t.requiredShort}</span>}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              {lf.email}
              <input
                type="email"
                autoComplete="email"
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
                {...reg1("email")}
              />
              {e1.email && <span className="text-xs text-red-600">{t.requiredEmail}</span>}
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              {lf.whatsapp}
              <input
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder={lf.whatsappPlaceholder}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
                {...reg1("whatsapp")}
              />
              <span className="text-xs font-normal text-slate-400">{lf.whatsappHint}</span>
            </label>

            <fieldset className="flex flex-col gap-2">
              <legend className="text-sm font-medium text-slate-700">
                {copy.locale === "zh-Hant" ? "查詢類型" : "Enquiry type"}
              </legend>
              {(
                [
                  ["request-info", copy.locale === "zh-Hant" ? "了解方案" : "Learn more"],
                  ["request-sample", copy.locale === "zh-Hant" ? "索取樣本數據" : "Request sample data"],
                  ["request-dictionary", copy.locale === "zh-Hant" ? "索取數據字典" : "Request data dictionary"],
                  ["talk-to-us", copy.locale === "zh-Hant" ? "直接聯絡洽談" : "Talk to the team"],
                  ["api-waitlist", copy.locale === "zh-Hant" ? "加入 API Waitlist" : "Join API waitlist"],
                ] as const
              ).map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 rounded-xl border border-slate-100 px-3 py-2.5 text-sm hover:border-brand-navy/20 cursor-pointer">
                  <input type="radio" value={value} {...reg1("intent")} className="accent-brand-navy" />
                  {label}
                </label>
              ))}
              {e1.intent && <span className="text-xs text-red-600">{t.requiredChoose}</span>}
            </fieldset>

            <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...reg1("website")} />

            <button type="submit" className="btn-primary w-full">
              {copy.locale === "zh-Hant" ? "繼續 →" : "Continue →"}
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={onStep2} className="flex flex-col gap-5">
            <div>
              <h2 className="text-2xl font-bold text-brand-navy">
                {copy.locale === "zh-Hant" ? "補充資料（選填）" : "Additional details (optional)"}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {copy.locale === "zh-Hant"
                  ? "以下為選填，可直接跳過提交。填寫有助我們更快回覆。"
                  : "All fields optional — skip to submit now."}
              </p>
            </div>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              {lf.company}
              <input
                type="text"
                autoComplete="organization"
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
                {...reg2("company")}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              {lf.role}
              <input
                type="text"
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
                {...reg2("role")}
              />
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              {lf.syndicateSize}
              <select
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
                {...reg2("syndicateSize")}
              >
                <option value="">—</option>
                {lf.syndicateSizes.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-1.5 text-sm font-medium text-slate-700">
              {lf.message}
              <textarea
                rows={3}
                className="rounded-xl border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
                {...reg2("message")}
              />
            </label>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button type="submit" disabled={submitting} className="btn-primary flex-1 disabled:opacity-60">
                {submitting ? t.submitting : lf.submit}
              </button>
              <button
                type="button"
                onClick={skipStep2}
                disabled={submitting}
                className="btn-outline flex-1 disabled:opacity-60"
              >
                {copy.locale === "zh-Hant" ? "跳過，直接送出" : "Skip & submit"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
