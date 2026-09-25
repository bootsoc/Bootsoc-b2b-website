"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { animate, useReducedMotion } from "motion/react";
import { submitEstimator } from "@/app/actions";
import { Checkbox, FormGuards, FormMessage, SubmitButton, TextField, useServerForm } from "@/components/forms/fields";
import { compact, defaultSelection, estimate, groups, recommend, regions, type Selection } from "@/lib/estimator";
import { cn } from "@/lib/utils";

const keys: (keyof Selection)[] = ["regions", "industries", "functions", "seniority", "sizes"];

function fromUrl(): Selection | null {
  const p = new URLSearchParams(window.location.search);
  if (!keys.some((k) => p.has(k))) return null;
  return Object.fromEntries(keys.map((k) => [k, p.get(k)?.split(",").filter(Boolean) ?? []])) as Selection;
}

function AnimatedRange({ low, high, className }: { low: number; high: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const prev = useRef({ low, high });
  const reduce = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const from = prev.current;
    prev.current = { low, high };
    if (reduce) {
      node.textContent = `${compact(low)} to ${compact(high)}`;
      return;
    }
    const c = animate(0, 1, {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (t) => {
        const l = from.low + (low - from.low) * t;
        const h = from.high + (high - from.high) * t;
        node.textContent = `${compact(l)} to ${compact(h)}`;
      },
    });
    return () => c.stop();
  }, [low, high, reduce]);

  return (
    <span ref={ref} className={className}>
      {compact(low)} to {compact(high)}
    </span>
  );
}

function Chip({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-full px-4 text-sm ring-1 transition-[background-color,color,box-shadow] duration-200 active:scale-[0.98]",
        pressed ? "bg-signal font-medium text-on-signal ring-signal" : "bg-raise text-muted ring-line hover:text-fg hover:ring-fg/30",
      )}
    >
      {children}
    </button>
  );
}

export function AudienceEstimator({ compactMode = false }: { compactMode?: boolean }) {
  const [sel, setSel] = useState<Selection>(defaultSelection);
  const hydrated = useRef(false);

  useEffect(() => {
    if (compactMode || hydrated.current) return;
    hydrated.current = true;
    const s = fromUrl();
    // Reading the URL is only possible after mount; syncing it into state once is intended.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (s) setSel(s);
  }, [compactMode]);

  useEffect(() => {
    if (compactMode || !hydrated.current) return;
    const p = new URLSearchParams(keys.map((k) => [k, sel[k].join(",")]));
    window.history.replaceState(null, "", `?${p.toString()}`);
  }, [sel, compactMode]);

  const result = useMemo(() => estimate(sel), [sel]);
  const recs = useMemo(() => recommend(sel, result.inMarket.high), [sel, result.inMarket.high]);

  const toggle = (key: keyof Selection, id: string) =>
    setSel((s) => {
      const has = s[key].includes(id);
      const next = has ? s[key].filter((x) => x !== id) : [...s[key], id];
      if (key === "regions" && next.length === 0) return s;
      return { ...s, [key]: next };
    });

  const visibleGroups = compactMode ? groups.filter((g) => g.id === "functions" || g.id === "seniority") : groups;

  return (
    <div className={cn("grid gap-6", !compactMode && "lg:grid-cols-[1.35fr_1fr] lg:gap-10")}>
      <div className="grid gap-7">
        <fieldset>
          <legend className="text-sm font-medium">Regions</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {regions.map((r) => (
              <Chip key={r.id} pressed={sel.regions.includes(r.id)} onClick={() => toggle("regions", r.id)}>
                {r.label}
              </Chip>
            ))}
          </div>
        </fieldset>
        {visibleGroups.map((g) => (
          <fieldset key={g.id}>
            <legend className="text-sm font-medium">
              {g.label}
              {sel[g.id].length === 0 && <span className="ml-2 font-normal text-muted">(all)</span>}
            </legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {g.options.map((o) => (
                <Chip key={o.id} pressed={sel[g.id].includes(o.id)} onClick={() => toggle(g.id, o.id)}>
                  {o.label}
                </Chip>
              ))}
            </div>
          </fieldset>
        ))}
      </div>

      <div className={cn(!compactMode && "lg:sticky lg:top-28 lg:self-start")}>
        <div className="rounded-[1.5rem] bg-fg/5 p-1.5 ring-1 ring-line">
          <div className="rounded-[calc(1.5rem-6px)] bg-raise p-6 md:p-7" aria-live="polite">
            <p className="text-sm text-muted">Reachable decision makers</p>
            <AnimatedRange
              low={result.reachable.low}
              high={result.reachable.high}
              className="display tabular mt-2 block text-[clamp(2.75rem,5vw,4rem)]"
            />
            <div className="mt-6 rounded-2xl bg-signal p-5 text-on-signal">
              <p className="text-sm font-medium">In-market this quarter</p>
              <AnimatedRange low={result.inMarket.low} high={result.inMarket.high} className="display tabular mt-1 block text-5xl" />
              <p className="mt-2 text-sm text-on-signal/75">About 5% of B2B buyers are actively buying at any time.</p>
            </div>
            {!compactMode && (
              <div className="mt-7">
                <p className="text-sm font-medium">Where we&apos;d start</p>
                <ul className="mt-3 grid gap-3">
                  {recs.map((r) => (
                    <li key={r.slug} className="text-sm">
                      <Link href={`/solutions/${r.slug}`} className="font-medium underline decoration-line underline-offset-4 hover:decoration-signal">
                        {r.label}
                      </Link>
                      <span className="block text-muted">{r.why}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <p className="mt-6 text-xs leading-relaxed text-muted">
              Modeled estimate from public labor-force data, rounded to two significant figures. Your audience report confirms exact counts.
            </p>
            {compactMode && (
              <Link
                href={`/audience-estimator?${new URLSearchParams(keys.map((k) => [k, sel[k].join(",")])).toString()}`}
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-fg px-5 text-sm font-medium text-bg"
              >
                Open the full estimator
              </Link>
            )}
          </div>
        </div>
        {!compactMode && <ReportForm selection={sel} />}
      </div>
    </div>
  );
}


function ReportForm({ selection }: { selection: Selection }) {
  const { state, pending, onSubmit, formRef, errors } = useServerForm(submitEstimator);
  const e = errors;

  return (
    <div className="mt-6 rounded-[1.5rem] p-6 ring-1 ring-line md:p-7">
      <h2 className="display-md text-2xl">Get the exact counts</h2>
      <p className="mt-2 text-sm text-muted">
        We&apos;ll send a breakdown by title, company and region, plus which accounts are surging now.
      </p>
      {state.status === "success" ? (
        <div className="mt-5">
          <FormMessage state={state} />
        </div>
      ) : (
        <form ref={formRef} onSubmit={onSubmit} noValidate className="relative mt-5 grid gap-4">
          <FormGuards />
          <input type="hidden" name="selection" value={JSON.stringify(selection)} />
          <TextField label="Full name" name="name" autoComplete="name" error={e.name} />
          <TextField label="Work email" name="email" type="email" inputMode="email" autoComplete="email" spellCheck={false} error={e.email} />
          <TextField label="Company" name="company" autoComplete="organization" error={e.company} />
          <Checkbox name="marketingConsent">Also send me BootSoc&apos;s monthly demand-gen notes.</Checkbox>
          <FormMessage state={state} />
          <div>
            <SubmitButton pending={pending}>Email my audience report</SubmitButton>
          </div>
        </form>
      )}
    </div>
  );
}
