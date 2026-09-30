"use client";

import { useSyncExternalStore } from "react";
import { MoonIcon, SunIcon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

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
      className="grid size-11 place-items-center rounded-full text-muted transition-[background-color,color,transform] duration-160 ease-out hover:bg-raise hover:text-fg active:scale-[0.94]"
    >
      {/* Both icons stay mounted and cross-fade with a slight scale and blur, so the swap reads as one change. */}
      <span aria-hidden="true" className="grid [&>*]:col-start-1 [&>*]:row-start-1">
        <SunIcon
          size={18}
          className={cn(
            "transition-[opacity,transform,filter] duration-200 ease-out",
            theme === "dark" ? "scale-100 opacity-100 blur-0" : "scale-75 -rotate-45 opacity-0 blur-[2px]",
          )}
        />
        <MoonIcon
          size={18}
          className={cn(
            "transition-[opacity,transform,filter] duration-200 ease-out",
            theme === "light" ? "scale-100 opacity-100 blur-0" : "scale-75 rotate-45 opacity-0 blur-[2px]",
          )}
        />
      </span>
    </button>
  );
}

/**
 * Inline, render-blocking script that applies the theme before first paint: the visitor's saved choice,
 * otherwise their system preference. It also syncs the browser UI colour (theme-color meta).
 */
export const themeScript = `(()=>{var t;try{t=localStorage.getItem("bs-theme")}catch(e){}if(t!=="light"&&t!=="dark")t=window.matchMedia&&matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t;var c=t==="light"?"#f5f5f4":"#0b0b0a",f=function(){var m=document.querySelectorAll('meta[name="theme-color"]');m.forEach(function(e){e.setAttribute("content",c)});return m.length};f()||document.addEventListener("DOMContentLoaded",f)})()`;
