import Link from "next/link";
import type { CaseStudy } from "@/sanity/queries";

/** Horizontal scroll-snap rail of approved case studies. Renders nothing until at least one exists. */
export function CaseStudyRail({ items, title = "Results clients have signed off on" }: { items: CaseStudy[]; title?: string }) {
  if (items.length === 0) return null;
  return (
    <section aria-labelledby="cases-heading" className="py-20 md:py-28">
      <div className="shell flex items-end justify-between gap-6">
        <h2 id="cases-heading" className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
          {title}
        </h2>
        <Link href="/case-studies" className="hidden shrink-0 text-sm text-muted underline underline-offset-4 hover:text-fg md:block">
          All case studies
        </Link>
      </div>
      <ul className="mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-[max(1rem,calc((100vw-1400px)/2+3rem))] pb-4 [scrollbar-width:thin]">
        {items.map((c) => (
          <li key={c.slug} className="w-[min(86vw,28rem)] shrink-0 snap-start">
            <Link href={`/case-studies/${c.slug}`} className="flex h-full flex-col justify-between rounded-[1.5rem] bg-raise p-7 ring-1 ring-line transition-[box-shadow] hover:ring-fg/30">
              <div>
                <p className="text-sm text-muted">{[c.client, c.service].filter(Boolean).join(" / ")}</p>
                <h3 className="display-md mt-3 text-3xl">{c.title}</h3>
              </div>
              {c.results && c.results.length > 0 && (
                <dl className="mt-10 grid grid-cols-2 gap-4">
                  {c.results.slice(0, 2).map((r) => (
                    <div key={r.label}>
                      <dd className="display text-5xl text-signal [[data-theme=light]_&]:text-fg">{r.value}</dd>
                      <dt className="mt-1 text-sm text-muted">{r.label}</dt>
                    </div>
                  ))}
                </dl>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
