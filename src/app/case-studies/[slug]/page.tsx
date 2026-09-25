import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { getCaseStudy } from "@/sanity/queries";

export const revalidate = 300;

export async function generateMetadata({ params }: PageProps<"/case-studies/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  return c ? { title: c.title, description: c.summary, alternates: { canonical: `/case-studies/${slug}` } } : {};
}

export default async function CaseStudyPage({ params }: PageProps<"/case-studies/[slug]">) {
  const { slug } = await params;
  const c = await getCaseStudy(slug);
  if (!c) notFound();
  return (
    <>
      <PageHero
        eyebrow={[c.client, c.service].filter(Boolean).join(" / ") || undefined}
        title={c.title}
        lede={c.summary}
        crumbs={[
          { label: "Case studies", href: "/case-studies" },
          { label: c.title, href: `/case-studies/${slug}` },
        ]}
      />
      {c.results && c.results.length > 0 && (
        <section aria-label="Results" className="shell">
          <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.results.map((r) => (
              <div key={r.label} className="rounded-[1.5rem] bg-signal p-6 text-on-signal">
                <dd className="display text-5xl">{r.value}</dd>
                <dt className="mt-2 text-sm font-medium text-on-signal/80">{r.label}</dt>
              </div>
            ))}
          </dl>
        </section>
      )}
      {c.body && (
        <div className="shell">
          <div className="prose-bs mx-auto mt-16">
            <PortableText value={c.body} />
          </div>
        </div>
      )}
      <CtaBand />
    </>
  );
}
