"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { industries } from "@/content/audiences";
import { cn } from "@/lib/utils";
import { SplitHeading } from "@/components/motion/split-heading";

/**
 * Large-type industry list. On desktop a photo preview follows the cursor (spring-smoothed motion values,
 * no re-render per frame) and swaps as you move between rows. Every row already shows its full detail inline,
 * so touch, keyboard and reduced-motion users lose nothing. The preview is hidden by CSS under reduced motion
 * (not by a JS branch) so server and client HTML match.
 */
export function Industries() {
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.5 });

  return (
    <section aria-labelledby="industries-heading" className="shell py-20 md:py-28">
      <SplitHeading id="industries-heading" className="display max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)]">
        Deep in the markets tech companies sell to.
      </SplitHeading>
      <p className="mt-5 max-w-[48ch] text-lg text-muted">Audiences, content angles and qualification scripts tuned for each vertical.</p>

      <div
        ref={listRef}
        className="relative mt-12"
        onPointerMove={(e) => {
          if (e.pointerType !== "mouse" || !listRef.current) return;
          const r = listRef.current.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
        onPointerLeave={() => setActive(null)}
      >
        <ul className="border-t border-line">
        {industries.map((ind, i) => (
          <li
            key={ind.id}
            onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
            className="group relative border-b border-line"
          >
            <div className="grid items-baseline gap-2 py-6 md:grid-cols-[1fr_1.1fr] md:gap-10 md:py-7">
              <h3
                className={cn(
                  "display-md text-[clamp(1.75rem,3.4vw,3rem)] transition-[color,transform] duration-300 ease-out",
                  active === i ? "translate-x-3 text-signal [[data-theme=light]_&]:text-fg" : active !== null ? "text-fg/40" : "text-fg",
                )}
              >
                {ind.name}
              </h3>
              <p
                className={cn(
                  "max-w-[46ch] text-muted transition-opacity duration-300 ease-out",
                  active !== null && active !== i ? "md:opacity-40" : "opacity-100",
                )}
              >
                {ind.body}
              </p>
            </div>
          </li>
        ))}
        </ul>

        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 top-0 z-10 hidden lg:block motion-reduce:lg:hidden"
            style={{ x: sx, y: sy }}
          >
            <AnimatePresence>
              {active !== null && (
                <motion.div
                  key="preview"
                  initial={{ opacity: 0, scale: 0.94, rotate: -4 }}
                  animate={{ opacity: 1, scale: 1, rotate: -2, transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] } }}
                  exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] } }}
                  className="relative -translate-x-1/2 -translate-y-[calc(100%+1.5rem)] overflow-hidden rounded-[1.25rem] bg-raise shadow-[0_30px_60px_-20px_rgb(0_0_0/0.6)] ring-1 ring-line"
                  style={{ width: 300, height: 200 }}
                >
                  {industries.map((ind, i) => (
                    <Image
                      key={ind.id}
                      src={ind.image}
                      alt=""
                      fill
                      sizes="300px"
                      className={cn("object-cover transition-opacity duration-300", active === i ? "opacity-100" : "opacity-0")}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
      </div>
    </section>
  );
}
