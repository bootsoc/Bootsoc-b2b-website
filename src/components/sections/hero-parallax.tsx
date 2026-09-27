"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/** Slow vertical drift on the hero image while the hero scrolls away. CSS cancels it under reduced motion. */
export function HeroParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="absolute inset-0">
      <motion.div className="absolute inset-[-8%_0] motion-reduce:!transform-none" style={{ y }}>
        {children}
      </motion.div>
    </div>
  );
}
