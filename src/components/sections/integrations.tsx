"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import { integrations } from "@/content/audiences";
import { SpotlightGroup } from "@/components/motion/spotlight";
import { cn } from "@/lib/utils";

const categories = ["All", ...Array.from(new Set(integrations.map((i) => i.category)))];

/** Filterable integration grid. Tiles reflow with layout animations when the filter changes. */
export function Integrations() {
  const [filter, setFilter] = useState("All");
  const reduce = useReducedMotion();
  const shown = filter === "All" ? integrations : integrations.filter((i) => i.category === filter);

  return (
    <section aria-labelledby="integrations-heading" className="shell py-20 md:py-28">
      <h2 id="integrations-heading" className="display max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)]">
        Delivered straight into your stack.
      </h2>
      <p className="mt-5 max-w-[50ch] text-lg text-muted">
        Leads, meetings and intent signals arrive mapped to your fields, with lead source values and consent records attached.
      </p>

      <LayoutGroup>
        <div role="group" aria-label="Filter integrations" className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={filter === c}
              onClick={() => setFilter(c)}
              className={cn(
                "relative min-h-10 rounded-full px-4 text-sm transition-colors duration-300",
                filter === c ? "font-medium text-on-signal" : "text-muted ring-1 ring-line hover:text-fg",
              )}
            >
              {filter === c && (
                <motion.span
                  layoutId="integration-filter"
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-signal"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{c}</span>
            </button>
          ))}
        </div>

        <SpotlightGroup as="ul" className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((i) => (
              <motion.li
                key={i.name}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="spotlight flex min-h-28 flex-col justify-between rounded-[1.25rem] bg-raise p-4 ring-1 ring-line"
              >
                <span className="font-medium leading-snug">{i.name}</span>
                <span className="text-xs text-muted">{i.category}</span>
              </motion.li>
            ))}
          </AnimatePresence>
        </SpotlightGroup>
      </LayoutGroup>
    </section>
  );
}
