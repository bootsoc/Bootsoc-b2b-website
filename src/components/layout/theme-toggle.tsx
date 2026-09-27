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
        document
          .querySelectorAll('meta[name="theme-color"]')
          .forEach((m) => m.setAttribute("content", next === "dark" ? "#0b0b0a" : "#f5f5f4"));
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

/**
 * Inline, render-blocking script that applies the theme before first paint: the visitor's saved choice,
 * otherwise their system preference. It also syncs the browser UI colour (theme-color meta).
 */
export const themeScript = `(()=>{var t;try{t=localStorage.getItem("bs-theme")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;var c=t==="light"?"#f5f5f4":"#0b0b0a",f=function(){var m=document.querySelectorAll('meta[name="theme-color"]');m.forEach(function(e){e.setAttribute("content",c)});return m.length};f()||document.addEventListener("DOMContentLoaded",f)})()`;
