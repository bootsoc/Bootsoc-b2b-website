"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/** Image frame that unmasks upward and settles from a slight zoom when it enters the viewport. */
export function RevealImage({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={cn("overflow-hidden", className)}
      initial={{ clipPath: "inset(18% 0% 0% 0% round 1.5rem)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
      viewport={{ once: true, amount: 0.25 }}
      transition={reduce ? { duration: 0 } : { duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="h-full w-full"
        initial={{ scale: 1.08 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
