"use client";

import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { CheckIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";
import { SplitHeading } from "@/components/motion/split-heading";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const gates = [
  {
    title: "Consent captured",
    body: "Opt-in language, timestamp and source page are stored with the record, so you can prove it later.",
    field: "Consent",
    value: "Opt-in recorded 14 Aug, 10:42 ET",
  },
  {
    title: "Engagement confirmed",
    body: "We check the person actually opened and read the asset, and filter out bot and click-farm patterns.",
    field: "Engagement",
    value: "Read 4 min 12 s of the report",
  },
  {
    title: "Identity and role verified",
    body: "Name, title and seniority are cross-checked against live professional profiles by our QA team.",
    field: "Title",
    value: "Director, IT Security",
  },
  {
    title: "Company fit matched",
    body: "Industry, size, revenue and geography are matched to your signed spec, plus suppression lists.",
    field: "Company",
    value: "Healthcare, 1,200 employees, Ohio",
  },
  {
    title: "Deliverability tested",
    body: "Email is verified at the mailbox level and phone numbers are checked before the file ships.",
    field: "Email",
    value: "Mailbox verified, 0 risk flags",
  },
];

export function VerificationPipeline() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(gates.length);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        setActive(0);
        const st = ScrollTrigger.create({
          trigger: pin.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 2.2}`,
          pin: true,
          scrub: true,
          onUpdate: (self) => {
            const next = Math.min(gates.length, Math.floor(self.progress * (gates.length + 0.999)));
            setActive((prev) => (prev === next ? prev : next));
            if (progress.current) progress.current.style.transform = `scaleY(${self.progress})`;
          },
        });
        return () => {
          st.kill();
          setActive(gates.length);
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const delivered = active >= gates.length;

  return (
    <section ref={root} aria-labelledby="pipeline-heading" className="relative">
      <div ref={pin} className="shell grid gap-12 py-20 lg:min-h-[100dvh] lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20 lg:py-24">
        <div>
          <SplitHeading id="pipeline-heading" className="display max-w-[14ch] text-[clamp(2.75rem,5.5vw,5rem)]">
            Five checks before a lead reaches you.
          </SplitHeading>
          <ol className="relative mt-10 grid gap-1">
            <span aria-hidden="true" className="absolute bottom-4 left-[1.1rem] top-4 w-px bg-line" />
            <span
              ref={progress}
              aria-hidden="true"
              className="absolute bottom-4 left-[1.1rem] top-4 hidden w-px origin-top bg-signal lg:block"
              style={{ transform: "scaleY(1)" }}
            />
            {gates.map((g, i) => {
              const done = i < active;
              const current = i === active;
              return (
                <li key={g.title} className="relative grid grid-cols-[2.25rem_1fr] gap-4 py-3">
                  <span
                    className={cn(
                      "relative z-10 grid size-9 place-items-center rounded-full text-sm font-medium ring-1 transition-colors duration-500",
                      done ? "bg-signal text-on-signal ring-signal" : current ? "bg-raise text-fg ring-fg/50" : "bg-bg text-muted ring-line",
                    )}
                  >
                    {done ? <CheckIcon size={16} weight="bold" aria-hidden="true" /> : i + 1}
                  </span>
                  <div className={cn("transition-opacity duration-500", done || current ? "opacity-100" : "opacity-45")}>
                    <h3 className="font-medium">{g.title}</h3>
                    <p className="mt-1 max-w-[46ch] text-sm leading-relaxed text-muted">{g.body}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <figure className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
          <div className="rounded-[calc(2rem-6px)] bg-raise p-6 md:p-8">
            <figcaption className="flex items-center justify-between gap-4 text-sm text-muted">
              <span>Example lead record</span>
              <span
                className={cn(
                  "rounded-full px-3 py-1 font-medium transition-colors duration-500",
                  delivered ? "bg-signal text-on-signal" : "bg-bg text-muted ring-1 ring-line",
                )}
              >
                {delivered ? "Delivered to your CRM" : `Verifying ${Math.min(active + 1, gates.length)} of ${gates.length}`}
              </span>
            </figcaption>
            <p className="display-md mt-6 text-4xl">Priya N.</p>
            <dl className="mt-6 grid gap-3">
              {gates.map((g, i) => {
                const done = i < active;
                return (
                  <div
                    key={g.field}
                    className={cn(
                      "grid grid-cols-[6.5rem_1fr_auto] items-center gap-3 rounded-xl px-4 py-3 ring-1 transition-[background-color,box-shadow] duration-500",
                      done ? "bg-bg ring-line" : "bg-bg/40 ring-transparent",
                    )}
                  >
                    <dt className="text-sm text-muted">{g.field}</dt>
                    <dd className={cn("font-mono text-sm tabular transition-opacity duration-500", done ? "opacity-100" : "opacity-30")}>
                      {done ? g.value : "Pending check…"}
                    </dd>
                    <span
                      aria-hidden="true"
                      className={cn(
                        "grid size-6 place-items-center rounded-full transition-[transform,background-color] duration-500 ease-out-expo",
                        done ? "scale-100 bg-signal text-on-signal" : "scale-75 bg-line text-transparent",
                      )}
                    >
                      <CheckIcon size={12} weight="bold" />
                    </span>
                  </div>
                );
              })}
            </dl>
          </div>
        </figure>
      </div>
    </section>
  );
}
