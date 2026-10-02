import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { getPosts } from "@/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "B2B demand generation guides and playbooks",
  description: "Guides, playbooks and compliance explainers for B2B demand generation, intent data and ABM, written for teams selling in the US, UK and Canada.",
  alternates: { canonical: "/resources" },
};

const date = (iso: string) => new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(iso));

export default async function ResourcesPage() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <PageHero
        title="Notes from the demand floor."
        lede="Practical guides on verified leads, intent data and staying compliant across the US, UK and Canada."
        crumbs={[{ label: "Resources", href: "/resources" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/report" className="inline-flex min-h-11 items-center rounded-full bg-signal px-5 text-sm font-medium text-on-signal hover:bg-signal-press">
            Get the 2026 lead quality report
          </Link>
          <Link href="/glossary" className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium ring-1 ring-line hover:bg-raise">
            Browse the glossary
          </Link>
          <Link href="/audience-estimator" className="inline-flex min-h-11 items-center rounded-full px-5 text-sm font-medium ring-1 ring-line hover:bg-raise">
            Audience and pipeline calculators
          </Link>
        </div>
      </PageHero>
      <section aria-label="Articles" className="shell pb-16">
        {posts.length === 0 ? (
          <p className="text-muted">New articles are on the way. Subscribe below to get them first.</p>
        ) : (
          <>
            {lead && (
              <Link href={`/resources/${lead.slug}`} className="group grid gap-8 rounded-[2rem] bg-raise p-2 ring-1 ring-line lg:grid-cols-[1.3fr_1fr] lg:items-center">
                {lead.coverUrl && (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-[calc(2rem-8px)]">
                    <Image src={lead.coverUrl} alt={lead.coverAlt ?? ""} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]" />
                  </div>
                )}
                <div className="p-6 lg:p-10">
                  <p className="text-sm text-muted">
                    {lead.category} <span aria-hidden="true">·</span> <time dateTime={lead.publishedAt}>{date(lead.publishedAt)}</time>
                  </p>
                  <h2 className="display-md mt-4 text-4xl md:text-5xl">{lead.title}</h2>
                  <p className="mt-4 text-lg text-muted">{lead.excerpt}</p>
                </div>
              </Link>
            )}
            <RevealGroup className="mt-3 grid gap-3 md:grid-cols-2">
              {rest.map((p) => (
                <RevealItem key={p.slug}>
                  <Link href={`/resources/${p.slug}`} className="group flex h-full flex-col rounded-[1.5rem] p-6 ring-1 ring-line transition-colors hover:bg-raise md:p-8">
                    <p className="text-sm text-muted">
                      {p.category} <span aria-hidden="true">·</span> <time dateTime={p.publishedAt}>{date(p.publishedAt)}</time>
                    </p>
                    <h2 className="display-md mt-4 text-3xl">{p.title}</h2>
                    <p className="mt-3 text-muted">{p.excerpt}</p>
                  </Link>
                </RevealItem>
              ))}
            </RevealGroup>
          </>
        )}
      </section>
      <CtaBand />
    </>
  );
}
