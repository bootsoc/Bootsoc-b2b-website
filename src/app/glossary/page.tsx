import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { GlossaryBrowser } from "@/components/sections/glossary-browser";
import { CtaBand } from "@/components/sections/cta-band";
import { JsonLd } from "@/components/seo/json-ld";
import { glossary } from "@/content/glossary";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "B2B demand generation glossary",
  description: "Plain-English definitions of B2B demand generation, intent data, ABM and privacy terms, from BANT and MQL to CASL and GPC.",
  alternates: { canonical: "/glossary" },
};

export default function GlossaryPage() {
  const terms = [...glossary].sort((a, b) => a.term.localeCompare(b.term));
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: "BootSoc B2B demand generation glossary",
          url: absoluteUrl("/glossary"),
          hasDefinedTerm: terms.map((t) => ({ "@type": "DefinedTerm", name: t.term, description: t.definition, url: absoluteUrl(`/glossary#${t.slug}`) })),
        }}
      />
      <PageHero
        title="The demand gen glossary."
        lede="Plain-English definitions for the acronyms, frameworks and privacy rules that come up in B2B lead generation."
        crumbs={[
          { label: "Resources", href: "/resources" },
          { label: "Glossary", href: "/glossary" },
        ]}
      />
      <section aria-label="Glossary terms" className="shell pb-16">
        <GlossaryBrowser terms={terms} />
      </section>
      <CtaBand />
    </>
  );
}
