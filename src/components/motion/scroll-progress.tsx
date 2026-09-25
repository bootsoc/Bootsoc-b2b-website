"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** Hairline reading-progress bar pinned to the top edge. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[65] h-[2px] origin-left bg-signal [[data-theme=light]_&]:bg-fg"
      style={{ scaleX: reduce ? scrollYProgress : scaleX }}
    />
  );
}
