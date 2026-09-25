import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { ButtonLink } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Audience network: IntentBuy",
  description:
    "IntentBuy is BootSoc's owned technology publication. Its first-party reader engagement powers BootSoc Signal and gives B2B content a trusted home.",
  alternates: { canonical: "/network" },
};

const topics = ["AI and machine learning", "Cybersecurity", "Gadgets and hardware", "Policy and regulation", "Startups and finance", "Enterprise tech"];

const formats = [
  { title: "Sponsored articles", body: "Editorially reviewed pieces that put your point of view in front of readers already researching the category." },
  { title: "Content hosting", body: "Your reports and whitepapers hosted on IntentBuy with gated download pages, feeding verified content syndication leads." },
  { title: "Newsletter placements", body: "Native placements in IntentBuy's topic newsletters, sent only to subscribers who opted in." },
  { title: "Display and native", body: "BootSoc Reach placements across IntentBuy, targeted by account, topic and role." },
];

export default function NetworkPage() {
  return (
    <>
      <PageHero
        title="IntentBuy. Where buyers research tech."
        lede="Our own publication covers the technology decisions B2B buyers are making right now. Reader engagement becomes first-party intent, and your content reaches people in the middle of their research."
        image="/images/publisher-reading.jpg"
        imageAlt="A reader browsing a technology publication on a laptop"
        crumbs={[{ label: "Network", href: "/network" }]}
      >
        <ButtonLink href={site.publisher.url} target="_blank" rel="noopener noreferrer" icon variant="secondary">
          Visit IntentBuy
        </ButtonLink>
      </PageHero>

      <section aria-labelledby="topics-heading" className="shell py-16 md:py-24">
        <h2 id="topics-heading" className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
          What IntentBuy covers
        </h2>
        <ul className="mt-10 flex flex-wrap gap-3">
          {topics.map((t) => (
            <li key={t} className="display-md rounded-full px-6 py-3 text-2xl ring-1 ring-line md:text-3xl">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="formats-heading" className="shell py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <h2 id="formats-heading" className="display max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)]">
              Ways to reach IntentBuy readers
            </h2>
            <p className="mt-6 max-w-[40ch] text-lg text-muted">
              Every format runs under the same consent and verification rules as the rest of BootSoc.
            </p>
          </div>
          <RevealGroup className="grid gap-3 sm:grid-cols-2">
            {formats.map((f, i) => (
              <RevealItem key={f.title} className={i === 0 ? "rounded-[1.5rem] bg-signal p-7 text-on-signal" : "rounded-[1.5rem] bg-raise p-7 ring-1 ring-line"}>
                <h3 className="display-md text-3xl">{f.title}</h3>
                <p className={i === 0 ? "mt-3 text-on-signal/80" : "mt-3 text-muted"}>{f.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section aria-labelledby="signal-heading" className="shell py-16 md:py-24">
        <div className="rounded-[2rem] p-8 ring-1 ring-line md:p-14">
          <h2 id="signal-heading" className="display max-w-[20ch] text-[clamp(2.25rem,4.5vw,4rem)]">
            Reading patterns become BootSoc Signal.
          </h2>
          <p className="mt-6 max-w-[60ch] text-lg text-muted">
            When readers from the same company start researching a topic more than usual, Signal flags the account. That first-party
            signal sits alongside vetted third-party intent, so your programs focus on accounts that are actively in-market.
          </p>
          <div className="mt-8">
            <ButtonLink href="/solutions/intent-data" icon>
              How Signal works
            </ButtonLink>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
