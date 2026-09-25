import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { Metrics } from "@/components/sections/metrics";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { CtaBand } from "@/components/sections/cta-band";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { RevealImage } from "@/components/motion/reveal-image";
import { secondaryMetrics, site } from "@/content/site";

export const metadata: Metadata = {
  title: "About BootSoc",
  description:
    "BootSoc Media LLC is a B2B demand generation and intent data agency helping technology companies build verified pipeline across the US, UK and Canada.",
  alternates: { canonical: "/about" },
};

const principles = [
  {
    title: "Quality over volume",
    body: "We'd rather deliver 300 leads your sales team accepts than 1,000 they ignore. Every program is priced and measured on accepted, in-spec leads.",
  },
  {
    title: "In-house, end to end",
    body: "Our own publication, data team, SDRs and media buyers run every program. No hidden resellers or offshore list brokers in the chain.",
  },
  {
    title: "Consent is the product",
    body: "A lead is only valuable if the person wants to hear from you. We record consent, honor opt-outs everywhere and explain our sources openly.",
  },
  {
    title: "Report what happened downstream",
    body: "Clicks and downloads are easy to count. We track acceptance, meetings and pipeline so every review is about revenue impact.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="Growth teams deserve leads they can trust."
        lede="BootSoc started as a performance agency obsessed with measurable growth. Today we focus on one thing: verified B2B pipeline for technology companies selling into the US, UK and Canada."
        crumbs={[{ label: "About", href: "/about" }]}
      />

      <section aria-label="Team" className="shell">
        <RevealImage className="rounded-[1.5rem]">
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <Image src="/images/team-collab.jpg" alt="Members of the BootSoc team collaborating around a laptop" fill sizes="100vw" className="object-cover object-[center_35%]" />
          </div>
        </RevealImage>
      </section>

      <Metrics />

      <section aria-labelledby="principles-heading" className="shell py-20 md:py-28">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <h2 id="principles-heading" className="display max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)] lg:sticky lg:top-32 lg:self-start">
            How we work
          </h2>
          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {principles.map((p, i) => (
              <RevealItem key={p.title} className={i === 0 ? "rounded-[1.5rem] bg-signal p-7 text-on-signal sm:col-span-2 md:p-9" : "rounded-[1.5rem] bg-raise p-7 ring-1 ring-line md:p-9"}>
                <h3 className="display-md text-3xl">{p.title}</h3>
                <p className={i === 0 ? "mt-3 max-w-[56ch] text-lg text-on-signal/80" : "mt-3 text-muted"}>{p.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="facts-heading" className="shell py-12">
        <h2 id="facts-heading" className="sr-only">
          Company facts
        </h2>
        <dl className="grid gap-8 border-y border-line py-10 sm:grid-cols-3">
          {secondaryMetrics.map((m) => (
            <div key={m.label}>
              <dt className="text-muted">{m.label}</dt>
              <dd className="display mt-2 text-6xl">{m.value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-[60ch] text-muted">
          {site.legalName} is headquartered in {site.address.city}, Wyoming, and serves clients across North America and the UK. We also publish{" "}
          <a href={site.publisher.url} target="_blank" rel="noopener noreferrer" className="text-fg underline underline-offset-4">
            IntentBuy
          </a>
          , a technology publication for readers researching their next purchase.
        </p>
      </section>

      <LogoMarquee />
      <CtaBand />
    </>
  );
}
