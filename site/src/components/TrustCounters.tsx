import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { TrustCounter } from "@/lib/content";

type TrustCountersProps = {
  counters: TrustCounter[];
};

/**
 * Parses values like "40+", "30K+", "6M+", "16K+" into:
 *   { num, suffix, prefix }
 * num is the integer to animate, suffix/prefix are static decorations.
 */
function parseValue(value: string): { num: number; suffix: string; prefix: string } {
  const m = value.trim().match(/^([^\d]*)(\d+(?:\.\d+)?)([KMB]?)\s*\+?\s*$/i);
  if (!m) return { num: 0, suffix: value, prefix: "" };
  const [, prefix, n, scaleChar] = m;
  const scale = scaleChar?.toUpperCase() === "K" ? 1_000 : scaleChar?.toUpperCase() === "M" ? 1_000_000 : scaleChar?.toUpperCase() === "B" ? 1_000_000_000 : 1;
  return { num: Number(n) * scale, suffix: scaleChar + "+", prefix: prefix ?? "" };
}

function format(num: number, suffix: string): string {
  if (suffix.startsWith("K")) return `${Math.round(num / 1_000)}K+`;
  if (suffix.startsWith("M")) return `${(num / 1_000_000).toFixed(num >= 10_000_000 ? 0 : 1)}M+`;
  if (suffix.startsWith("B")) return `${(num / 1_000_000_000).toFixed(1)}B+`;
  return `${Math.round(num)}+`;
}

function Counter({ value, durationMs = 1500 }: { value: string; durationMs?: number }) {
  const { num, suffix, prefix } = parseValue(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? num : 0);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(num);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min((t - start) / durationMs, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(num * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, num, durationMs, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}
      {format(display, suffix)}
    </span>
  );
}

export default function TrustCounters({ counters }: TrustCountersProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {counters.map((counter, index) => (
        <motion.div
          key={counter.label}
          className="surface-card text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: index * 0.08, duration: 0.45 }}
        >
          <p className="font-mono text-4xl font-bold text-brand-navy tracking-tight">
            <Counter value={counter.value} />
          </p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            {counter.label}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
