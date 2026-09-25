import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/sections/page-hero";
import { VerificationPipeline } from "@/components/sections/verification-pipeline";
import { CtaBand } from "@/components/sections/cta-band";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "How it works",
  description:
    "From ICP workshop to verified delivery: how BootSoc plans, targets, verifies and optimises B2B lead generation programs.",
  alternates: { canonical: "/how-it-works" },
};

const phases = [
  {
    title: "Define the ideal customer",
    body: "A 45-minute workshop turns your ICP, personas and target account list into a written spec: industries, company sizes, titles, regions, suppression and qualifying questions. Nothing launches until you sign it.",
    time: "Week 1",
  },
  {
    title: "Build the audience",
    body: "We size the audience, layer BootSoc Signal intent to find accounts researching now, and remove your customers, open opportunities and competitors.",
    time: "Week 1",
  },
  {
    title: "Launch the engagement",
    body: "Hosted landing pages, email and IntentBuy placements, display and SDR outreach go live in the mix that fits the program.",
    time: "Week 2",
  },
  {
    title: "Verify every record",
    body: "Consent, engagement, identity, company fit and deliverability are checked by software, then reviewed by our QA team before anything ships.",
    time: "Ongoing",
  },
  {
    title: "Deliver on your cadence",
    body: "Leads arrive daily or weekly by CSV, API or direct CRM push, mapped to your fields and lead source values.",
    time: "Ongoing",
  },
  {
    title: "Optimise weekly",
    body: "A weekly review covers pacing, acceptance and downstream conversion. We move budget toward the assets, titles and accounts that turn into pipeline.",
    time: "Weekly",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageHero
        title="A spec you sign. Leads that match it."
        lede="Every BootSoc program follows the same six-part process, so you always know what's happening, what's next and why."
        crumbs={[{ label: "How it works", href: "/how-it-works" }]}
      />

      <section aria-labelledby="phases-heading" className="shell py-12 md:py-20">
        <h2 id="phases-heading" className="sr-only">
          The six phases
        </h2>
        <ol className="grid gap-3">
          {phases.map((p, i) => (
            <li key={p.title}>
              <Reveal delay={i * 0.03} className="grid gap-6 rounded-[1.5rem] p-6 ring-1 ring-line md:grid-cols-[6rem_1fr_8rem] md:items-baseline md:p-8">
                <span className="display tabular text-6xl text-signal [[data-theme=light]_&]:text-fg" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="display-md text-3xl md:text-4xl">{p.title}</h3>
                  <p className="mt-3 max-w-[62ch] text-lg text-muted">{p.body}</p>
                </div>
                <p className="text-sm text-muted md:text-right">{p.time}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <VerificationPipeline />

      <section aria-labelledby="team-heading" className="shell py-20 md:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-6px)]">
              <Image src="/images/process-desk.jpg" alt="A BootSoc analyst reviewing lead records at a desk" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <div>
            <h2 id="team-heading" className="display max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)]">
              People check what software can&apos;t.
            </h2>
            <p className="mt-6 max-w-[48ch] text-lg text-muted">
              Automated checks catch most problems. Our QA analysts catch the rest: a title that doesn&apos;t match the company, a
              free-mail address pretending to be corporate, or engagement that looks too neat to be human. Every file is reviewed
              by a person before delivery.
            </p>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
