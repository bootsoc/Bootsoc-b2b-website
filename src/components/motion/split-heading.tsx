"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type Tag = "h1" | "h2" | "h3";

/**
 * Headline whose words rise out of a mask when scrolled into view. The heading's accessible name is the
 * full sentence (aria-label); the split, animated words are aria-hidden.
 */
export function SplitHeading({ as = "h2", children, className, id }: { as?: Tag; children: string; className?: string; id?: string }) {
  const reduce = useReducedMotion();
  const Comp = motion[as];
  const words = children.split(" ");
  return (
    <Comp
      id={id}
      aria-label={children}
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.045 } } }}
    >
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden pb-[0.08em] align-top">
            <motion.span
              className={cn("inline-block")}
              variants={{
                hidden: { y: "105%" },
                show: { y: "0%", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
              }}
            >
              {w}
              {i < words.length - 1 ? " " : ""}
            </motion.span>
          </span>
        ))}
      </span>
    </Comp>
  );
}
