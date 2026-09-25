import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { HeroParallax } from "@/components/sections/hero-parallax";
import { Tilt } from "@/components/motion/tilt";
import heroImg from "../../../public/images/hero-buyer-research.jpg";

const lines = [
  ["Pipeline", "from", "buyers"],
  ["already", "in-market."],
];

/**
 * Entrance runs on CSS keyframes so the headline (the LCP element) paints before hydration.
 * Only the scroll parallax on the image is JS-driven.
 */
export function Hero() {
  let i = 0;
  return (
    <section className="relative overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
      <div className="shell">
        <h1 className="display text-[clamp(2.75rem,7.2vw,7.75rem)]">
          <span className="sr-only">Pipeline from buyers already in-market.</span>
          <span aria-hidden="true" className="block">
            {lines.map((line) => (
              <span key={line.join()} className="flex flex-wrap gap-x-[0.2em]">
                {line.map((word) => {
                  const delay = 80 + i++ * 70;
                  return (
                    <span key={word} className="inline-block overflow-hidden pb-[0.06em]">
                      <span
                        className={`inline-block animate-rise ${word === "in-market." ? "text-signal [[data-theme=light]_&]:bg-signal [[data-theme=light]_&]:px-[0.08em] [[data-theme=light]_&]:text-on-signal" : ""}`}
                        style={{ animationDelay: `${delay}ms` }}
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </span>
        </h1>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-[1fr_1.55fr] lg:items-start lg:gap-16">
          <div className="animate-fade-up lg:pt-4" style={{ animationDelay: "480ms" }}>
            <p className="max-w-[30rem] text-lg leading-relaxed text-muted md:text-xl">
              Intent-led syndication, ABM and demand programs for B2B tech. Every lead consented, human-verified and
              delivered to your spec.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Magnetic>
                <ButtonLink href="/contact" icon>
                  Book a strategy call
                </ButtonLink>
              </Magnetic>
              <ButtonLink href="/contact?intent=sample" variant="secondary">
                Get a sample lead file
              </ButtonLink>
            </div>
          </div>

          <div className="relative animate-settle" style={{ animationDelay: "250ms" }}>
            <Tilt>
            <div className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-6px)] md:aspect-[16/9]">
                <HeroParallax>
                  <Image
                    src={heroImg}
                    alt="A technology buyer researching solutions on a laptop in a dimly lit office"
                    fill
                    priority
                    sizes="(min-width: 1024px) 60vw, 100vw"
                    placeholder="blur"
                    className="object-cover object-[65%_30%]"
                  />
                </HeroParallax>
              </div>
            </div>
            </Tilt>
          </div>
        </div>
      </div>
    </section>
  );
}
