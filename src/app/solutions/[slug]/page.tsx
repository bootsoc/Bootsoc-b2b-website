import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/sections/page-hero";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/reveal";
import { JsonLd } from "@/components/seo/json-ld";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) return {};
  return {
    title: s.metaTitle,
    description: s.metaDescription,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { title: s.metaTitle, description: s.metaDescription, url: `/solutions/${s.slug}` },
  };
}

export default async function ServicePage({ params }: PageProps<"/solutions/[slug]">) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const related = services.filter((x) => x.slug !== s.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: s.product ? `${s.product} (${s.name})` : s.name,
          description: s.metaDescription,
          serviceType: s.name,
          url: absoluteUrl(`/solutions/${s.slug}`),
          areaServed: ["US", "GB", "CA"],
          provider: { "@type": "Organization", name: site.legalName, url: site.url },
        }}
      />
      <PageHero
        eyebrow={s.product ? s.name : undefined}
        title={s.heroTitle}
        lede={s.heroSub}
        image={s.image}
        imageAlt={s.imageAlt}
        crumbs={[
          { label: "Solutions", href: "/solutions" },
          { label: s.product ?? s.name, href: `/solutions/${s.slug}` },
        ]}
      >
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact" icon>
            Book a strategy call
          </ButtonLink>
          <ButtonLink href="/contact?intent=sample" variant="secondary">
            Get a sample lead file
          </ButtonLink>
        </div>
      </PageHero>

      {/* Problems: sticky heading, stacked issues */}
      <section aria-labelledby="problems-heading" className="shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <h2 id="problems-heading" className="display max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)] lg:sticky lg:top-32 lg:self-start">
            {s.problemTitle}
          </h2>
          <RevealGroup className="divide-y divide-line border-y border-line">
            {s.problems.map((p) => (
              <RevealItem key={p.title} className="py-8">
                <h3 className="display-md text-3xl">{p.title}</h3>
                <p className="mt-3 max-w-[52ch] text-lg text-muted">{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Process: a real sequence, so numbered */}
      <section aria-labelledby="process-heading" className="shell py-20 md:py-28">
        <h2 id="process-heading" className="display max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)]">
          How the program runs
        </h2>
        <RevealGroup className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {s.steps.map((step, i) => (
            <RevealItem key={step.title} className="relative rounded-[1.5rem] bg-raise p-6 ring-1 ring-line md:p-7">
              <span className="display tabular text-6xl text-signal [[data-theme=light]_&]:text-fg" aria-hidden="true">
                {i + 1}
              </span>
              <h3 className="mt-8 text-xl font-medium">{step.title}</h3>
              <p className="mt-2 text-muted">{step.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* Deliverables + guarantees */}
      <section aria-labelledby="deliverables-heading" className="shell py-20 md:py-28">
        <div className="grid gap-3 lg:grid-cols-[1.3fr_1fr]">
          <Reveal className="rounded-[1.5rem] bg-raise p-7 ring-1 ring-line md:p-10">
            <h2 id="deliverables-heading" className="display-md text-4xl">
              What you get
            </h2>
            <ul className="mt-8 grid gap-4">
              {s.deliverables.map((d) => (
                <li key={d} className="flex items-start gap-3 text-lg">
                  <span className="mt-1 grid size-6 shrink-0 place-items-center rounded-full bg-signal text-on-signal" aria-hidden="true">
                    <CheckIcon size={13} weight="bold" />
                  </span>
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="grid gap-3">
            {s.guarantees.map((g) => (
              <div key={g.label} className="flex items-end justify-between gap-6 rounded-[1.5rem] bg-signal p-6 text-on-signal md:p-7">
                <p className="display text-5xl">{g.value}</p>
                <p className="max-w-[16ch] text-right text-sm font-medium text-on-signal/80">{g.label}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Targeting options */}
      <section aria-labelledby="targeting-heading" className="shell py-20 md:py-24">
        <h2 id="targeting-heading" className="display max-w-[16ch] text-[clamp(2.25rem,4.5vw,4rem)]">
          Target exactly who you sell to
        </h2>
        <ul className="mt-10 flex flex-wrap gap-2.5">
          {s.targeting.map((t) => (
            <li key={t} className="rounded-full bg-raise px-5 py-3 text-lg ring-1 ring-line">
              {t}
            </li>
          ))}
        </ul>
        <p className="mt-8 text-muted">
          Leads land in HubSpot, Salesforce, Marketo, Eloqua or any system that accepts CSV or API delivery.{" "}
          <Link href="/audience-estimator" className="text-fg underline underline-offset-4 hover:decoration-signal">
            Size your audience first
          </Link>
          .
        </p>
      </section>

      <Faq items={s.faqs} title={`${s.product ?? s.name} questions`} />

      <section aria-labelledby="related-heading" className="shell py-16">
        <h2 id="related-heading" className="text-sm font-medium text-muted">
          Works well with
        </h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-3">
          {related.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/solutions/${r.slug}`}
                className="group block h-full rounded-[1.5rem] p-6 ring-1 ring-line transition-colors hover:bg-raise"
              >
                <span className="display-md text-2xl">{r.product ?? r.name}</span>
                <span className="mt-2 block text-sm text-muted">{r.summary}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand />
    </>
  );
}
