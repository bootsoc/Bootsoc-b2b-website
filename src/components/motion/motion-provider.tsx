"use client";

import { MotionConfig } from "motion/react";

/**
 * Lets Motion honour prefers-reduced-motion globally: transform and layout animations are skipped, opacity still
 * fades. Components keep the same `initial` state either way, so server and client HTML match on hydration.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
