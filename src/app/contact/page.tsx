import type { Metadata } from "next";
import { EnvelopeSimpleIcon, MapPinIcon } from "@phosphor-icons/react/dist/ssr";
import { ContactForm } from "@/components/forms/contact-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Book a strategy call",
  description: "Talk to a BootSoc strategist about verified B2B lead generation, ABM and intent data. You leave with a target spec, audience size and a program plan.",
  alternates: { canonical: "/contact" },
};

const expect = [
  "A written target spec for your ICP",
  "An audience size and in-market estimate",
  "A recommended program mix and timeline",
  "A fixed quote, before anything launches",
];

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const { intent } = await searchParams;
  const isSample = intent === "sample";

  return (
    <section className="shell pb-10 pt-32 md:pt-40">
      <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <h1 className="display max-w-[12ch] animate-fade-up text-[clamp(3rem,7vw,6.5rem)]">
            {isSample ? "See a sample lead file." : "Book a strategy call."}
          </h1>
          <p className="mt-6 max-w-[40ch] animate-fade-up text-lg text-muted" style={{ animationDelay: "100ms" }}>
            {isSample
              ? "Tell us who you sell to. We'll send a small, anonymised file that matches your spec so you can judge quality before you buy."
              : "30 minutes with a strategist who has run programs like yours. No slides, no pressure."}
          </p>
          {!isSample && (
            <div className="mt-10 animate-fade-up" style={{ animationDelay: "180ms" }}>
              <h2 className="text-sm font-medium">You&apos;ll leave with</h2>
              <ul className="mt-4 grid gap-3">
                {expect.map((e) => (
                  <li key={e} className="flex gap-3 text-muted">
                    <span aria-hidden="true" className="mt-2.5 h-px w-4 shrink-0 bg-signal" />
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-12 grid gap-4 text-sm text-muted">
            <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:text-fg">
              <EnvelopeSimpleIcon size={18} aria-hidden="true" />
              {site.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPinIcon size={18} aria-hidden="true" className="mt-0.5 shrink-0" />
              {site.legalName}, {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
          <div className="rounded-[calc(2rem-6px)] bg-raise p-6 md:p-10">
            <ContactForm intent={isSample ? "sample" : "contact"} />
          </div>
        </div>
      </div>
    </section>
  );
}
