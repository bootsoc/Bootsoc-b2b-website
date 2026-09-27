"use client";

import Image from "next/image";
import { useState } from "react";
import { PauseIcon, PlayIcon } from "@phosphor-icons/react";
import { clientLogos } from "@/content/site";
import { cn } from "@/lib/utils";

/**
 * The site's only marquee. Pauses on hover, and the button pauses it for keyboard and touch users (WCAG 2.2.2).
 * Under reduced motion it becomes a static, centred wall and the duplicate half is hidden.
 */
export function LogoMarquee() {
  const [paused, setPaused] = useState(false);
  const row = [...clientLogos, ...clientLogos];
  return (
    <section aria-labelledby="clients-heading" className="border-y border-line py-10">
      <div className="shell flex items-center justify-between gap-4">
        <h2 id="clients-heading" className="text-sm text-muted">
          Programs delivered for teams at
        </h2>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          aria-label={paused ? "Play logo animation" : "Pause logo animation"}
          className="grid size-11 shrink-0 place-items-center rounded-full text-muted ring-1 ring-line transition-colors hover:text-fg motion-reduce:hidden"
        >
          {paused ? <PlayIcon size={14} weight="fill" aria-hidden="true" /> : <PauseIcon size={14} weight="fill" aria-hidden="true" />}
        </button>
      </div>
      <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)] motion-reduce:[mask-image:none]">
        <ul
          className={cn(
            "flex w-max animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused]",
            "motion-reduce:w-full motion-reduce:px-6 motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-x-12 motion-reduce:gap-y-8 motion-reduce:pr-6",
            paused && "[animation-play-state:paused]",
          )}
        >
          {row.map((logo, i) => {
            const duplicate = i >= clientLogos.length;
            return (
              <li key={`${logo.name}-${i}`} aria-hidden={duplicate ? true : undefined} className={cn("shrink-0", duplicate && "motion-reduce:hidden")}>
                <Image
                  src={`/logos/${logo.file}`}
                  alt={duplicate ? "" : logo.name}
                  width={logo.width}
                  height={logo.height}
                  className="logo-mono h-auto max-h-10 w-auto"
                  unoptimized
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
