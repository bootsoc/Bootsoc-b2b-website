"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Tracks the pointer and writes --mx/--my onto each `.spotlight` child, so a soft glow and border light
 * follow the cursor. One delegated listener, CSS variables only, no React re-renders. Pointer-fine devices only (CSS).
 */
export function SpotlightGroup({ children, className, as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "ul" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  return (
    <Tag
      ref={ref as React.RefObject<never>}
      className={cn("spotlight-group", className)}
      onPointerMove={(e: React.PointerEvent<HTMLElement>) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        for (const el of ref.current.querySelectorAll<HTMLElement>(".spotlight")) {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", `${e.clientX - r.left}px`);
          el.style.setProperty("--my", `${e.clientY - r.top}px`);
        }
      }}
    >
      {children}
    </Tag>
  );
}
