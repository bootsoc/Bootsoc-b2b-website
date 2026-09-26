"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";

const text =
  "Most lead programs sell volume. Bots, stale records and loose filters mean a big share of every file gets rejected, and your SDRs lose weeks chasing people who never read a word. We run it the other way round: fewer, verified leads from accounts that are actually researching.";

/** Words brighten as the paragraph scrolls through the viewport. Reads as a plain paragraph with reduced motion. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");

  return (
    <section aria-labelledby="manifesto-heading" className="shell py-24 md:py-36">
      <h2 id="manifesto-heading" className="sr-only">
        Why BootSoc
      </h2>
      <p ref={ref} className="display-md max-w-[22ch] text-[clamp(2.1rem,5vw,4.5rem)] leading-[1.02] sm:max-w-[24ch]">
        {reduce
          ? text
          : words.map((w, i) => (
              <Word key={`${w}-${i}`} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
                {w}
              </Word>
            ))}
      </p>
    </section>
  );
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  // Dimmed words stay at 60% so they still pass WCAG AA contrast in both themes.
  const opacity = useTransform(progress, range, [0.6, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}
