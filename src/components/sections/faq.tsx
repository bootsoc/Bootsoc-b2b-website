import { PlusIcon } from "@phosphor-icons/react/dist/ssr";
import { JsonLd } from "@/components/seo/json-ld";
import type { Faq as FaqItem } from "@/content/services";

/** Native <details> accordion: keyboard and screen-reader friendly with zero JS. Emits FAQPage schema. */
export function Faq({ items, title = "Questions buyers ask us", id = "faq" }: { items: FaqItem[]; title?: string; id?: string }) {
  return (
    <section aria-labelledby={`${id}-heading`} className="shell py-20 md:py-28">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <h2 id={`${id}-heading`} className="display max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)]">
          {title}
        </h2>
        <div className="divide-y divide-line border-y border-line">
          {items.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg font-medium [&::-webkit-details-marker]:hidden">
                {f.q}
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full ring-1 ring-line transition-transform duration-300 ease-out-expo group-open:rotate-45 group-open:bg-signal group-open:text-on-signal group-open:ring-signal"
                >
                  <PlusIcon size={16} weight="bold" />
                </span>
              </summary>
              <p className="max-w-[62ch] pb-7 leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
