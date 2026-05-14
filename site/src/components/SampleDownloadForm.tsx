import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  email: z.string().email(),
  website: z.string().optional(),
});
type FormValues = z.infer<typeof schema>;

type Props = {
  label: string;
  sampleUrl: string;
  submitLabel: string;
  successLabel: string;
  errorLabel: string;
  emailLabel: string;
  disclaimer: string;
};

const defaultEndpoint = "/api/lead";

export default function SampleDownloadForm({
  label,
  sampleUrl,
  submitLabel,
  successLabel,
  errorLabel,
  emailLabel,
  disclaimer,
}: Props) {
  // submitLabel / disclaimer kept in the public API for layout variants;
  // currently the inline form uses `label` + emerald success card.
  void submitLabel;
  void disclaimer;
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const endpoint =
    (import.meta.env.PUBLIC_LEAD_ENDPOINT || "").trim() || defaultEndpoint;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = handleSubmit(async ({ email }) => {
    try {
      await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name: email,
          company: "",
          role: "",
          syndicateSize: "N/A",
          delivery: "N/A",
          datasets: ["Sample download"],
          intent: "request-sample",
          locale: "zh-Hant",
          website: "",
        }),
      });
      setStatus("success");
      // trigger download
      const a = document.createElement("a");
      a.href = sampleUrl;
      a.download = "";
      a.click();
    } catch {
      setStatus("error");
    }
  });

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
        {successLabel}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium text-slate-700">
          {emailLabel}
          <input
            type="email"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
            placeholder="you@syndicate.com"
            {...register("email")}
          />
        </label>
        <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />
        {errors.email && <span className="mt-1 block text-xs text-red-600">Valid email required</span>}
      </div>
      <button type="submit" disabled={isSubmitting} className="btn-primary whitespace-nowrap disabled:opacity-60">
        {label}
      </button>
      {status === "error" && <p className="text-xs text-red-600">{errorLabel}</p>}
    </form>
  );
}
