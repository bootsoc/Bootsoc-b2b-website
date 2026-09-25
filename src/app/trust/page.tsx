import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRightIcon, DatabaseIcon, LockKeyIcon, NewspaperIcon, ShieldCheckIcon, UserCircleCheckIcon, ProhibitIcon } from "@phosphor-icons/react/dist/ssr";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { Faq } from "@/components/sections/faq";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Data and trust center",
  description:
    "Where BootSoc's B2B data comes from, the lawful basis we rely on in the US, UK and Canada, how every lead is verified, and how people can opt out.",
  alternates: { canonical: "/trust" },
};

const sources = [
  {
    icon: NewspaperIcon,
    title: "First-party publisher engagement",
    body: "Readers of IntentBuy, our technology publication, who register for content or newsletters and agree to be contacted about related offers.",
  },
  {
    icon: UserCircleCheckIcon,
    title: "Program opt-ins",
    body: "Professionals who request an asset, register for an event or agree to a call through a BootSoc program, with the consent text and timestamp stored.",
  },
  {
    icon: DatabaseIcon,
    title: "Maintained business contact data",
    body: "Work contact details (name, title, company, business email and phone) compiled from public professional sources and re-verified on a rolling cycle. Used to reach professionals about offers relevant to their role, with an opt-out in every message.",
  },
];

const basis = [
  {
    region: "United States",
    items: [
      "Notice at collection and a clear opt-out in every message (CAN-SPAM, state privacy laws)",
      "Opt-in consent recorded for every lead delivered to a client",
      "Global Privacy Control and “Do Not Sell or Share” requests honored",
      "Calling screened against the National Do Not Call Registry and state lists (TCPA)",
    ],
  },
  {
    region: "United Kingdom",
    items: [
      "Legitimate interests, with a documented balancing test, for B2B outreach to corporate subscribers (UK GDPR, PECR)",
      "Consent for any lead passed to a client, identified by name at the point of opt-in",
      "Calls screened against TPS and CTPS",
      "Data subject rights answered within one month",
    ],
  },
  {
    region: "Canada",
    items: [
      "Express consent for commercial electronic messages, or a documented CASL exemption such as conspicuous publication",
      "Sender identification and a working unsubscribe in every message, honored within 10 business days",
      "Opt-in for tracking technologies and a named privacy officer for Quebec (Law 25)",
      "Calling screened against the National DNCL",
    ],
  },
];

const controls = [
  { icon: ProhibitIcon, title: "Global suppression", body: "Every opt-out joins a global suppression list checked before each send and each delivery, across all clients." },
  { icon: ShieldCheckIcon, title: "No sensitive data", body: "We don't collect or infer health, financial account, precise location, children's or other sensitive personal data." },
  { icon: LockKeyIcon, title: "Security by default", body: "Encryption in transit and at rest, least-privilege access, audit logging and signed data processing terms with every vendor." },
];

const faqs = [
  {
    q: "Can I find out what data BootSoc holds about me?",
    a: "Yes. Submit a request through our privacy request form or email privacy@bootsoc.com. We verify your identity by email and respond within the time your law requires: 45 days in the US, one month in the UK and EU, and 30 days in Canada.",
  },
  {
    q: "How do I stop BootSoc from contacting me?",
    a: "Use the unsubscribe link in any email, tell our caller, or submit an “unsubscribe” request. Your address joins our global suppression list, and we stop contact within 10 business days at the latest.",
  },
  {
    q: "Is BootSoc a data broker?",
    a: "Some of our activities, such as maintaining business contact data about people we don't have a direct relationship with, can meet the definition of a data broker under certain US state laws. Where they do, we register with that state and process deletion requests through its official mechanism, including California's Delete Request and Opt-out Platform.",
  },
  {
    q: "Do you sell personal data?",
    a: "We deliver leads to clients only when the person has opted in to hear from that client. Under some US state laws, other sharing for advertising may count as a “sale” or “sharing”. You can opt out at any time through Your privacy choices or by using Global Privacy Control.",
  },
];

export default function TrustPage() {
  return (
    <>
      <PageHero
        title="Where our data comes from. And where it doesn't."
        lede="Intent data is only useful if you can trust it. Here's exactly how we source, verify and protect business contact data, and how anyone can opt out."
        crumbs={[{ label: "Data and trust", href: "/trust" }]}
      />

      <section aria-labelledby="sources-heading" className="shell py-16 md:py-24">
        <h2 id="sources-heading" className="display max-w-[14ch] text-[clamp(2.5rem,5vw,4.5rem)]">
          Three sources, all documented
        </h2>
        <RevealGroup className="mt-12 grid gap-3 lg:grid-cols-[1.2fr_1fr_1fr]">
          {sources.map((s, i) => (
            <RevealItem key={s.title} className={i === 0 ? "rounded-[1.5rem] bg-signal p-7 text-on-signal md:p-9" : "rounded-[1.5rem] bg-raise p-7 ring-1 ring-line md:p-9"}>
              <s.icon size={32} weight="light" aria-hidden="true" />
              <h3 className="display-md mt-10 text-3xl">{s.title}</h3>
              <p className={i === 0 ? "mt-3 text-on-signal/80" : "mt-3 text-muted"}>{s.body}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="mt-8 max-w-[70ch] text-muted">
          We don&apos;t buy scraped personal email lists, and we don&apos;t use co-registration or incentivised downloads to inflate lead volume.
        </p>
      </section>

      <section aria-labelledby="basis-heading" className="shell py-16 md:py-24">
        <h2 id="basis-heading" className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
          Lawful basis, market by market
        </h2>
        <div className="mt-12 divide-y divide-line border-y border-line">
          {basis.map((b) => (
            <div key={b.region} className="grid gap-6 py-8 md:grid-cols-[14rem_1fr] md:gap-12">
              <h3 className="display-md text-3xl">{b.region}</h3>
              <ul className="grid gap-3 md:grid-cols-2 md:gap-x-10">
                {b.items.map((it) => (
                  <li key={it} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="controls-heading" className="shell py-16 md:py-24">
        <h2 id="controls-heading" className="display max-w-[16ch] text-[clamp(2.5rem,5vw,4.5rem)]">
          Controls that protect people, not just clients
        </h2>
        <div className="mt-12 grid gap-10 md:grid-cols-3">
          {controls.map((c) => (
            <div key={c.title} className="border-t border-line pt-6">
              <c.icon size={28} weight="light" aria-hidden="true" className="text-signal [[data-theme=light]_&]:text-fg" />
              <h3 className="mt-5 text-xl font-medium">{c.title}</h3>
              <p className="mt-2 text-muted">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="docs-heading" className="shell py-16">
        <h2 id="docs-heading" className="text-sm font-medium text-muted">
          Policies and documents
        </h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Privacy policy", "/privacy"],
            ["Cookie policy", "/cookies"],
            ["Email and outreach policy", "/email-policy"],
            ["DPA and subprocessors", "/dpa"],
            ["Make a privacy request", "/privacy-request"],
            ["Accessibility statement", "/accessibility"],
          ].map(([label, href]) => (
            <li key={href}>
              <Link href={href} className="group flex items-center justify-between rounded-2xl p-5 ring-1 ring-line transition-colors hover:bg-raise">
                {label}
                <ArrowUpRightIcon size={18} aria-hidden="true" className="transition-transform group-hover:rotate-45" />
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-sm text-muted">
          Privacy questions: <a href={`mailto:${site.privacyEmail}`} className="text-fg underline underline-offset-4">{site.privacyEmail}</a>
        </p>
      </section>

      <Faq items={faqs} title="Privacy questions" id="trust-faq" />
      <CtaBand />
    </>
  );
}
