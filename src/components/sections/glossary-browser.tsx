"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";
import type { Term } from "@/content/glossary";
import { cn } from "@/lib/utils";

/** Live-filtering glossary with an A-Z jump bar. Terms stay server-rendered in the initial HTML for SEO. */
export function GlossaryBrowser({ terms }: { terms: Term[] }) {
  const [q, setQ] = useState("");
  const query = useDeferredValue(q.trim().toLowerCase());
  const reduce = useReducedMotion();
  const shown = useMemo(
    () => (query ? terms.filter((t) => `${t.term} ${t.definition}`.toLowerCase().includes(query)) : terms),
    [terms, query],
  );
  const letters = useMemo(() => Array.from(new Set(terms.map((t) => t.term[0].toUpperCase()))), [terms]);

  return (
    <div className="grid gap-10 lg:grid-cols-[14rem_1fr] lg:gap-16">
      <div className="lg:sticky lg:top-32 lg:self-start">
        <label htmlFor="glossary-search" className="text-sm font-medium">
          Search terms
        </label>
        <div className="relative mt-2">
          <MagnifyingGlassIcon size={18} aria-hidden="true" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" />
          <input
            id="glossary-search"
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="e.g. intent…"
            autoComplete="off"
            spellCheck={false}
            className="min-h-12 w-full rounded-full bg-raise pl-11 pr-4 ring-1 ring-line placeholder:text-muted/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-signal"
          />
        </div>
        <nav aria-label="Jump to letter" className="mt-6 flex flex-wrap gap-1.5">
          {letters.map((l) => (
            <a
              key={l}
              href={`#letter-${l}`}
              className="grid size-9 place-items-center rounded-full text-sm text-muted ring-1 ring-line transition-colors hover:bg-signal hover:text-on-signal hover:ring-signal"
            >
              {l}
            </a>
          ))}
        </nav>
        <p className="mt-6 text-sm text-muted" aria-live="polite">
          {shown.length} of {terms.length} terms
        </p>
      </div>

      <dl className="divide-y divide-line border-y border-line">
        <AnimatePresence initial={false}>
          {shown.map((t, i) => {
            const first = i === 0 || shown[i - 1].term[0].toUpperCase() !== t.term[0].toUpperCase();
            return (
              <motion.div
                key={t.slug}
                id={first ? `letter-${t.term[0].toUpperCase()}` : undefined}
                layout={!reduce}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className={cn("grid scroll-mt-32 gap-2 py-6 md:grid-cols-[16rem_1fr] md:gap-10")}
              >
                <dt id={t.slug} className="scroll-mt-32 text-lg font-medium">
                  {t.term}
                </dt>
                <dd className="text-muted">
                  {t.definition}
                  {t.related && (
                    <>
                      {" "}
                      <Link href={t.related} className="text-fg underline decoration-line underline-offset-4 hover:decoration-signal">
                        Learn more
                      </Link>
                    </>
                  )}
                </dd>
              </motion.div>
            );
          })}
        </AnimatePresence>
        {shown.length === 0 && (
          <p className="py-10 text-muted">
            No terms match &ldquo;{q}&rdquo;. Try a broader word, or <Link href="/contact" className="text-fg underline underline-offset-4">ask us</Link>.
          </p>
        )}
      </dl>
    </div>
  );
}
