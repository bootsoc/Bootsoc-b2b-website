"use client";

import { useEffect, useId, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";

type Field = {
  key: "leads" | "cpl" | "toOpp" | "winRate" | "deal";
  label: string;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
};

const usd = (v: number, digits = 0) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: digits, notation: v >= 100_000 ? "compact" : "standard" }).format(v);
const pct = (v: number) => `${v}%`;
const num = (v: number) => new Intl.NumberFormat("en-US").format(v);

const fields: Field[] = [
  { key: "leads", label: "Verified leads per month", min: 25, max: 2000, step: 25, format: num },
  { key: "cpl", label: "Cost per lead", min: 20, max: 400, step: 5, format: (v) => usd(v) },
  { key: "toOpp", label: "Lead to opportunity rate", min: 1, max: 25, step: 1, format: pct },
  { key: "winRate", label: "Opportunity win rate", min: 5, max: 50, step: 1, format: pct },
  { key: "deal", label: "Average deal size", min: 5000, max: 250000, step: 5000, format: (v) => usd(v) },
];

function Animated({ value, format, className }: { value: number; format: (v: number) => string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef(value);
  const reduce = useReducedMotion();
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const from = prev.current;
    prev.current = value;
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    const c = animate(from, value, { duration: 0.5, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => (node.textContent = format(v)) });
    return () => c.stop();
  }, [value, format, reduce]);
  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}

/** Models the pipeline a lead program creates from the visitor's own funnel numbers. */
export function RoiCalculator() {
  const id = useId();
  const [v, setV] = useState({ leads: 300, cpl: 85, toOpp: 8, winRate: 20, deal: 40000 });

  const spend = v.leads * v.cpl;
  const opps = (v.leads * v.toOpp) / 100;
  const pipeline = opps * v.deal;
  const revenue = (pipeline * v.winRate) / 100;
  const roi = spend > 0 ? revenue / spend : 0;

  return (
    <section aria-labelledby={`${id}-title`} className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
      <div className="grid gap-10 rounded-[calc(2rem-6px)] bg-raise p-6 md:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <h2 id={`${id}-title`} className="display-md text-4xl">
            Model the pipeline
          </h2>
          <p className="mt-3 max-w-[44ch] text-muted">Use your own funnel numbers to see what a verified lead program is worth each month.</p>
          <div className="mt-8 grid gap-7">
            {fields.map((f) => {
              const pctFill = ((v[f.key] - f.min) / (f.max - f.min)) * 100;
              return (
                <div key={f.key} className="grid gap-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <label htmlFor={`${id}-${f.key}`} className="text-sm font-medium">
                      {f.label}
                    </label>
                    <output htmlFor={`${id}-${f.key}`} className="font-mono text-sm tabular">
                      {f.format(v[f.key])}
                    </output>
                  </div>
                  <input
                    id={`${id}-${f.key}`}
                    type="range"
                    min={f.min}
                    max={f.max}
                    step={f.step}
                    value={v[f.key]}
                    onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
                    className="range-signal"
                    style={{ "--fill": `${pctFill}%` } as React.CSSProperties}
                  />
                </div>
              );
            })}
          </div>
        </div>

        <dl className="grid content-start gap-3" aria-live="polite">
          <div className="rounded-2xl bg-signal p-6 text-on-signal">
            <dt className="text-sm font-medium">Pipeline created per month</dt>
            <dd>
              <Animated value={pipeline} format={(n) => usd(n)} className="display tabular mt-1 block text-[clamp(2.75rem,5vw,4rem)]" />
            </dd>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-bg/60 p-5 ring-1 ring-line">
              <dt className="text-sm text-muted">Opportunities</dt>
              <dd>
                <Animated value={opps} format={(n) => num(Math.round(n))} className="display tabular mt-1 block text-4xl" />
              </dd>
            </div>
            <div className="rounded-2xl bg-bg/60 p-5 ring-1 ring-line">
              <dt className="text-sm text-muted">Program spend</dt>
              <dd>
                <Animated value={spend} format={(n) => usd(n)} className="display tabular mt-1 block text-4xl" />
              </dd>
            </div>
            <div className="rounded-2xl bg-bg/60 p-5 ring-1 ring-line">
              <dt className="text-sm text-muted">Expected closed revenue</dt>
              <dd>
                <Animated value={revenue} format={(n) => usd(n)} className="display tabular mt-1 block text-4xl" />
              </dd>
            </div>
            <div className="rounded-2xl bg-bg/60 p-5 ring-1 ring-line">
              <dt className="text-sm text-muted">Return on spend</dt>
              <dd>
                <Animated value={roi} format={(n) => `${n.toFixed(1)}x`} className="display tabular mt-1 block text-4xl" />
              </dd>
            </div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted">
            Illustrative model based on the values you enter. It is not a forecast or a quote.
          </p>
        </dl>
      </div>
    </section>
  );
}
