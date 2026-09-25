"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";

type Theme = "dark" | "light";

const subscribe = (cb: () => void) => {
  const obs = new MutationObserver(cb);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => obs.disconnect();
};
const getTheme = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, getTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        document.querySelector('meta[name="theme-color"]')?.setAttribute("content", next === "dark" ? "#0b0b0a" : "#f5f5f4");
        try {
          localStorage.setItem("bs-theme", next);
        } catch {}
      }}
      aria-label={`Switch to ${next} theme`}
      className="grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-raise hover:text-fg"
    >
      {theme === "dark" ? <SunIcon size={18} aria-hidden="true" /> : <MoonIcon size={18} aria-hidden="true" />}
    </button>
  );
}

/** Inline, render-blocking script that applies the stored theme before first paint. */
export const themeScript = `(()=>{try{var t=localStorage.getItem("bs-theme");document.documentElement.dataset.theme=t==="light"?"light":"dark"}catch(e){document.documentElement.dataset.theme="dark"}})()`;
