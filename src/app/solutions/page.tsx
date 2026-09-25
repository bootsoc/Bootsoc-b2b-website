import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { services } from "@/content/services";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Content syndication, demand generation, ABM, intent data, programmatic display, event registration and appointment setting for B2B tech in the US, UK and Canada.",
  alternates: { canonical: "/solutions" },
};

const stage: Record<string, string> = {
  "intent-data": "Find",
  "programmatic-display": "Warm",
  "content-syndication": "Engage",
  "event-registration": "Engage",
  "account-based-marketing": "Engage",
  "demand-generation": "Qualify",
  "appointment-setting": "Convert",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        title="Seven programs. One verified pipeline."
        lede="Each program works on its own. Together they share one audience, one set of intent signals and one standard for what counts as a real lead."
        crumbs={[{ label: "Solutions", href: "/solutions" }]}
      />
      <section aria-label="All solutions" className="shell pb-16">
        <RevealGroup className="grid gap-3">
          {services.map((s) => (
            <RevealItem key={s.slug}>
              <Link
                href={`/solutions/${s.slug}`}
                className="group grid items-center gap-6 rounded-[1.5rem] bg-raise p-4 ring-1 ring-line transition-[box-shadow] hover:ring-fg/30 md:grid-cols-[14rem_1fr_auto] md:p-5"
              >
                <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(1.5rem-8px)]">
                  <Image
                    src={s.image}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 14rem, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
                  />
                </div>
                <div className="px-2 md:px-0">
                  <p className="text-sm text-muted">{stage[s.slug]}</p>
                  <h2 className="display-md mt-1 text-3xl md:text-4xl">{s.product ?? s.name}</h2>
                  <p className="mt-2 max-w-[60ch] text-muted">{s.summary}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="mx-2 grid size-12 place-items-center rounded-full ring-1 ring-line transition-[transform,background-color,color] duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-signal group-hover:text-on-signal md:mx-4"
                >
                  <ArrowUpRightIcon size={20} weight="bold" />
                </span>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>
      <CtaBand />
    </>
  );
}
