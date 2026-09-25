import { ButtonLink } from "@/components/ui/button";
import { Mark } from "@/components/brand/logo";
import { Reveal } from "@/components/motion/reveal";

export function CtaBand({
  title = "Let's plan next quarter's pipeline.",
  body = "A 30-minute call with a strategist. You leave with a target spec, audience size and a program plan, whether or not we work together.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section aria-labelledby="cta-heading" className="shell pt-12 md:pt-16">
      <Reveal className="relative overflow-hidden rounded-[2rem] bg-signal p-8 text-on-signal md:p-14 lg:p-20">
        <Mark className="pointer-events-none absolute -right-10 -top-10 size-64 opacity-[0.08] md:size-96" />
        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <h2 id="cta-heading" className="display max-w-[14ch] text-[clamp(2.75rem,6vw,5.75rem)]">
              {title}
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-on-signal/80">{body}</p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <ButtonLink
              href="/contact"
              icon
              className="bg-on-signal text-signal shadow-none hover:bg-on-signal/90 [&>span:last-child]:bg-signal/15"
            >
              Book a strategy call
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
