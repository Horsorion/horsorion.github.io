import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LeadIntent, SiteCopy } from "@/lib/i18n";

const leadSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  role: z.string().min(1),
  syndicateSize: z.string().min(1),
  delivery: z.string().min(1),
  datasets: z.array(z.string()).min(1),
  message: z.string().optional(),
  intent: z.enum(["request-info", "request-dictionary", "request-sample", "talk-to-us", "api-waitlist"]),
  locale: z.enum(["zh-Hant", "en"]),
  website: z.string().optional(),
});

type LeadFormValues = z.infer<typeof leadSchema>;

type ContactLeadFormProps = {
  copy: SiteCopy;
  initialIntent?: LeadIntent;
};

const defaultEndpoint = "/api/lead";

export default function ContactLeadForm({ copy, initialIntent = "request-info" }: ContactLeadFormProps) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const endpoint =
    (import.meta.env.PUBLIC_LEAD_ENDPOINT || "").trim() || defaultEndpoint;

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      intent: initialIntent,
      locale: copy.locale,
      datasets: [],
      website: "",
    },
  });

  const selectedDatasets = watch("datasets");

  const toggleDataset = (dataset: string) => {
    const next = selectedDatasets.includes(dataset)
      ? selectedDatasets.filter((item) => item !== dataset)
      : [...selectedDatasets, dataset];
    setValue("datasets", next, { shouldValidate: true });
  };

  const onSubmit = handleSubmit(async (values) => {
    setStatus("idle");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error("Lead submission failed");
      }

      setStatus("success");
      reset({
        name: "",
        email: "",
        company: "",
        role: "",
        syndicateSize: "",
        delivery: "",
        datasets: [],
        message: "",
        intent: values.intent,
        locale: copy.locale,
        website: "",
      });
    } catch {
      setStatus("error");
    }
  });

  return (
    <form className="surface-card space-y-5" onSubmit={onSubmit}>
      <input type="hidden" {...register("intent")} />
      <input type="hidden" {...register("locale")} />
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" {...register("website")} />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm font-medium text-slate-700">
          {copy.leadForm.name}
          <input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" {...register("name")} />
          {errors.name ? <span className="mt-1 block text-xs text-red-600">Required</span> : null}
        </label>
        <label className="block text-sm font-medium text-slate-700">
          {copy.leadForm.email}
          <input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" type="email" {...register("email")} />
          {errors.email ? <span className="mt-1 block text-xs text-red-600">Required</span> : null}
        </label>
        <label className="block text-sm font-medium text-slate-700">
          {copy.leadForm.company}
          <input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" {...register("company")} />
          {errors.company ? <span className="mt-1 block text-xs text-red-600">Required</span> : null}
        </label>
        <label className="block text-sm font-medium text-slate-700">
          {copy.leadForm.role}
          <input className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" {...register("role")} />
          {errors.role ? <span className="mt-1 block text-xs text-red-600">Required</span> : null}
        </label>
        <label className="block text-sm font-medium text-slate-700">
          {copy.leadForm.syndicateSize}
          <select className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" {...register("syndicateSize")}>
            <option value="">Select</option>
            {copy.leadForm.syndicateSizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          {errors.syndicateSize ? <span className="mt-1 block text-xs text-red-600">Required</span> : null}
        </label>
      </div>

      <label className="block text-sm font-medium text-slate-700">
        {copy.leadForm.delivery}
        <select className="mt-2 w-full rounded-xl border border-slate-200 px-3 py-2" {...register("delivery")}>
          <option value="">Select</option>
          {copy.leadForm.deliveryOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.delivery ? <span className="mt-1 block text-xs text-red-600">Required</span> : null}
      </label>

      <fieldset>
        <legend className="text-sm font-medium text-slate-700">{copy.leadForm.datasets}</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {copy.leadForm.datasetOptions.map((dataset) => {
            const active = selectedDatasets.includes(dataset);
            return (
              <button
                key={dataset}
                type="button"
                onClick={() => toggleDataset(dataset)}
                className={`rounded-full border px-3 py-1 text-xs font-medium ${
                  active ? "border-brand-navy bg-brand-navy text-white" : "border-slate-200 bg-white text-slate-700"
                }`}
              >
                {dataset}
              </button>
            );
          })}
        </div>
        {errors.datasets ? <span className="mt-2 block text-xs text-red-600">Select at least one</span> : null}
      </fieldset>

      <label className="block text-sm font-medium text-slate-700">
        {copy.leadForm.message}
        <textarea className="mt-2 min-h-28 w-full rounded-xl border border-slate-200 px-3 py-2" {...register("message")} />
      </label>

      {status === "success" ? (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{copy.leadForm.success}</p>
      ) : null}
      {status === "error" ? (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{copy.leadForm.error}</p>
      ) : null}

      <button type="submit" className="btn-primary w-full disabled:opacity-60" disabled={isSubmitting}>
        {copy.leadForm.submit}
      </button>
    </form>
  );
}
