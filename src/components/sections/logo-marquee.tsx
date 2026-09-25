import Image from "next/image";
import { clientLogos } from "@/content/site";

/** The site's only marquee. Pauses on hover and stops under reduced motion (global CSS). */
export function LogoMarquee() {
  const row = [...clientLogos, ...clientLogos];
  return (
    <section aria-labelledby="clients-heading" className="border-y border-line py-10">
      <h2 id="clients-heading" className="shell text-sm text-muted">
        Programs delivered for teams at
      </h2>
      <div className="group relative mt-8 overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        <ul className="flex w-max animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none motion-reduce:flex-wrap motion-reduce:w-full motion-reduce:justify-center">
          {row.map((logo, i) => (
            <li key={`${logo.name}-${i}`} aria-hidden={i >= clientLogos.length ? true : undefined} className="shrink-0">
              <Image
                src={`/logos/${logo.file}`}
                alt={i >= clientLogos.length ? "" : logo.name}
                width={logo.width}
                height={logo.height}
                className="logo-mono h-auto max-h-10 w-auto"
                unoptimized
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
