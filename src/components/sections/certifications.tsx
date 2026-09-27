import { certifications } from "@/content/site";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SpotlightGroup } from "@/components/motion/spotlight";
import { SplitHeading } from "@/components/motion/split-heading";
import { cn } from "@/lib/utils";

/** Typographic certification seal. Not an official certification-body mark. */
export function CertSeal({ top, code, size = "md" }: { top: string; code: string; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative grid shrink-0 place-items-center rounded-full text-center ring-1 ring-signal/60 [[data-theme=light]_&]:ring-fg/40",
        size === "md" ? "size-28" : "size-16",
      )}
    >
      <span className={cn("absolute rounded-full ring-1 ring-line", size === "md" ? "inset-2" : "inset-1")} />
      <span className="grid leading-none">
        <span className={cn("font-medium uppercase tracking-[0.14em] text-muted", size === "md" ? "text-[0.65rem]" : "text-[0.5rem]")}>{top}</span>
        <span className={cn("display-md text-signal [[data-theme=light]_&]:text-fg", size === "md" ? "mt-1.5 text-3xl" : "mt-0.5 text-base")}>{code}</span>
      </span>
    </span>
  );
}

export function Certifications({ variant = "section" }: { variant?: "section" | "trust" }) {
  return (
    <section aria-labelledby={`certs-heading-${variant}`} className="shell py-20 md:py-28">
      <SplitHeading id={`certs-heading-${variant}`} className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
        Independently audited. Every year.
      </SplitHeading>
      <p className="mt-5 max-w-[52ch] text-lg text-muted">
        Your prospect data sits inside a certified security and quality program, so it clears procurement and InfoSec review faster.
      </p>
      <SpotlightGroup>
        {/* Asymmetric: the lead certification takes the tall cell, the other two stack beside it. */}
        <RevealGroup className="mt-12 grid gap-3 md:grid-cols-[1.25fr_1fr]">
          {certifications.map((c, i) => (
            <RevealItem
              key={c.id}
              className={cn(
                "spotlight flex gap-8 rounded-[1.5rem] bg-raise p-7 ring-1 ring-line md:p-8",
                i === 0 ? "flex-col justify-between md:row-span-2 md:p-10" : "flex-col sm:flex-row sm:items-center",
              )}
            >
              <CertSeal top={c.top} code={c.code} />
              <div>
                <h3 className={cn("font-medium", i === 0 ? "display-md text-3xl md:text-4xl" : "text-xl")}>{c.name}</h3>
                <p className="mt-1 text-sm text-signal [[data-theme=light]_&]:text-fg">{c.title}</p>
                <p className="mt-3 text-muted">{c.body}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </SpotlightGroup>
      <p className="mt-8 text-muted">
        Need evidence for a vendor review? We share our SOC 2 Type II report and ISO certificates under NDA.{" "}
        <a href="mailto:privacy@bootsoc.com?subject=Security%20documentation%20request" className="text-fg underline underline-offset-4 hover:decoration-signal">
          Request security documentation
        </a>
        .
      </p>
    </section>
  );
}
