"use client";

import { useEffect, useRef, useState } from "react";

type TurnstileApi = {
  render: (el: HTMLElement, opts: Record<string, unknown>) => string;
  remove: (id: string) => void;
};
declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __turnstileLoading?: Promise<void>;
  }
}

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  window.__turnstileLoading ??= new Promise<void>((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Turnstile failed to load"));
    document.head.appendChild(s);
  });
  return window.__turnstileLoading;
}

/**
 * Cloudflare Turnstile, rendered explicitly so it also works after client-side navigation.
 * The script only loads once the visitor starts using the form, so pages that merely show a form (the footer
 * newsletter is on every page) don't pay for it. Managed mode is invisible for most visitors; the token lands in
 * a hidden `cf-turnstile-response` input. The holder stays out of layout until Cloudflare actually needs to show
 * a challenge, so the invisible widget doesn't leave a gap in the form.
 */
export function Turnstile({ siteKey }: { siteKey: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [interactive, setInteractive] = useState(false);

  useEffect(() => {
    const holder = ref.current;
    const form = holder?.closest("form");
    if (!holder) return;
    let id: string | undefined;
    let cancelled = false;

    const start = () => {
      form?.removeEventListener("focusin", start);
      form?.removeEventListener("pointerdown", start);
      loadTurnstile()
        .then(() => {
          if (cancelled || !window.turnstile) return;
          const theme = document.documentElement.dataset.theme === "light" ? "light" : "dark";
          id = window.turnstile.render(holder, {
            sitekey: siteKey,
            theme,
            appearance: "interaction-only",
            size: "flexible",
            "before-interactive-callback": () => setInteractive(true),
            "after-interactive-callback": () => setInteractive(false),
          });
        })
        .catch(() => {});
    };

    // Already loaded (e.g. remounted after a submission attempt), or no form to watch: render straight away.
    if (window.turnstile || !form) start();
    else {
      form.addEventListener("focusin", start);
      form.addEventListener("pointerdown", start);
    }

    return () => {
      cancelled = true;
      form?.removeEventListener("focusin", start);
      form?.removeEventListener("pointerdown", start);
      if (id) window.turnstile?.remove(id);
    };
  }, [siteKey]);

  return <div ref={ref} className={interactive ? undefined : "pointer-events-none absolute size-0 overflow-hidden"} />;
}
