"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/** Slow vertical drift on the hero image while the hero scrolls away. */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ["0%", "0%"] : ["-6%", "6%"]);
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div className="absolute inset-[-8%_0]" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
