"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { RB2B_SRC } from "@/components/analytics/rb2b-snippet";

/**
 * Next.js changes pages without a full reload, so per RB2B's Next.js install guide the tracker is reloaded on every
 * client-side route change. The first page view is handled by the inline snippet.
 */
export function RB2BRouteTracker() {
  const pathname = usePathname();
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    document.querySelectorAll(`script[src="${RB2B_SRC}"]`).forEach((s) => s.remove());
    const script = document.createElement("script");
    script.async = true;
    script.src = RB2B_SRC;
    document.body.appendChild(script);
  }, [pathname]);

  return null;
}
