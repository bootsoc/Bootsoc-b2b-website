import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { getCaseStudies } from "@/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "B2B demand generation case studies",
  description: "How B2B technology companies use BootSoc content syndication, ABM and intent data programs to build verified pipeline across the US, UK and Canada.",
  alternates: { canonical: "/case-studies" },
};

export default async function CaseStudiesPage() {
  const items = await getCaseStudies();
  return (
    <>
      <PageHero
        title="Programs, in their own numbers."
        lede="Every result here is approved by the client it belongs to."
        crumbs={[{ label: "Case studies", href: "/case-studies" }]}
      />
      <section aria-label="Case studies" className="shell pb-16">
        {items.length === 0 ? (
          <p className="max-w-[56ch] text-lg text-muted">
            We&apos;re collecting client approvals for our first published case studies. In the meantime, ask for a{" "}
            <Link href="/contact?intent=sample" className="text-fg underline underline-offset-4">
              sample lead file
            </Link>{" "}
            or references on a strategy call.
          </p>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {items.map((c) => (
              <li key={c.slug}>
                <Link href={`/case-studies/${c.slug}`} className="block h-full rounded-[1.5rem] bg-raise p-7 ring-1 ring-line hover:ring-fg/30">
                  <p className="text-sm text-muted">{[c.client, c.service].filter(Boolean).join(" / ")}</p>
                  <h2 className="display-md mt-3 text-3xl">{c.title}</h2>
                  {c.summary && <p className="mt-3 text-muted">{c.summary}</p>}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <CtaBand />
    </>
  );
}
