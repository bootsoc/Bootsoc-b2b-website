"use client";

import Link from "next/link";
import { useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRightIcon, CheckIcon } from "@phosphor-icons/react";
import { roles } from "@/content/audiences";
import { getService } from "@/content/services";
import { cn } from "@/lib/utils";
import { SplitHeading } from "@/components/motion/split-heading";

const ease = [0.16, 1, 0.3, 1] as const;

/** WAI-ARIA tabs (arrow keys, Home/End) with a gliding indicator and a soft panel crossfade. */
export function RolesTabs() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const role = roles[active];

  const focusTab = (i: number) => {
    const next = (i + roles.length) % roles.length;
    setActive(next);
    tabRefs.current[next]?.focus();
    tabRefs.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section aria-labelledby="roles-heading" className="shell py-20 md:py-28">
      <SplitHeading id="roles-heading" className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
        Built for the whole revenue team.
      </SplitHeading>

      <div
        role="tablist"
        aria-label="Who we work with"
        className="mt-10 flex gap-1 overflow-x-auto rounded-full bg-raise p-1.5 ring-1 ring-line [scrollbar-width:none] md:inline-flex"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") focusTab(active + 1);
          else if (e.key === "ArrowLeft") focusTab(active - 1);
          else if (e.key === "Home") focusTab(0);
          else if (e.key === "End") focusTab(roles.length - 1);
          else return;
          e.preventDefault();
        }}
      >
        {roles.map((r, i) => (
          <button
            key={r.id}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            role="tab"
            id={`${baseId}-tab-${r.id}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel`}
            tabIndex={i === active ? 0 : -1}
            onClick={(e) => {
              setActive(i);
              e.currentTarget.scrollIntoView({ block: "nearest", inline: "nearest", behavior: reduce ? "auto" : "smooth" });
            }}
            className={cn(
              "relative min-h-11 shrink-0 whitespace-nowrap rounded-full px-5 text-sm font-medium transition-colors duration-300",
              i === active ? "text-on-signal" : "text-muted hover:text-fg",
            )}
          >
            {i === active && (
              <motion.span
                layoutId={`${baseId}-tab-pill`}
                aria-hidden="true"
                className="absolute inset-0 rounded-full bg-signal"
                transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
              />
            )}
            <span className="relative">{r.label}</span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${baseId}-panel`}
        aria-labelledby={`${baseId}-tab-${role.id}`}
        tabIndex={0}
        className="mt-6 rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line"
      >
        <div className="relative min-h-[22rem] overflow-hidden rounded-[calc(2rem-6px)] bg-raise p-7 md:p-12">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={role.id}
              initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -10, filter: "blur(4px)" }}
              transition={{ duration: 0.45, ease }}
              className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16"
            >
              <div>
                <h3 className="display-md max-w-[20ch] text-[clamp(1.9rem,3.4vw,3rem)]">{role.title}</h3>
                <ul className="mt-8 grid gap-4">
                  {role.points.map((p, i) => (
                    <motion.li
                      key={p}
                      initial={reduce ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.12 + i * 0.06, ease }}
                      className="flex items-start gap-3 text-lg"
                    >
                      <span aria-hidden="true" className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-signal text-on-signal">
                        <CheckIcon size={13} weight="bold" />
                      </span>
                      {p}
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="lg:border-l lg:border-line lg:pl-12">
                <p className="text-sm text-muted">Programs teams like yours start with</p>
                <ul className="mt-4 grid gap-2">
                  {role.programs.map((slug) => {
                    const s = getService(slug)!;
                    return (
                      <li key={slug}>
                        <Link
                          href={`/solutions/${slug}`}
                          className="group flex items-center justify-between gap-4 rounded-2xl bg-bg/60 px-5 py-4 ring-1 ring-line transition-[box-shadow] hover:ring-fg/30"
                        >
                          <span className="font-medium">{s.product ?? s.name}</span>
                          <ArrowRightIcon size={18} aria-hidden="true" className="text-muted transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
