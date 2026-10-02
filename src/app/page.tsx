import type { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { Metrics } from "@/components/sections/metrics";
import { Manifesto } from "@/components/sections/manifesto";
import { SolutionsBento } from "@/components/sections/solutions-bento";
import { VerificationPipeline } from "@/components/sections/verification-pipeline";
import { Comparison } from "@/components/sections/comparison";
import { CaseStudyRail } from "@/components/sections/case-study-rail";
import { EstimatorTeaser } from "@/components/sections/estimator-teaser";
import { NetworkBand } from "@/components/sections/network-band";
import { TrustStrip } from "@/components/sections/trust-strip";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { homeFaqs } from "@/content/faqs";
import { getCaseStudies } from "@/sanity/queries";

export const revalidate = 300;

// Home-specific description, sized for search results (120-160 characters). site.description stays the longer
// summary used as the site-wide default and in llms.txt.
export const metadata: Metadata = {
  description:
    "Intent-led demand generation, content syndication and ABM for B2B tech companies in the US, UK and Canada. Every lead consented and human-verified.",
};

export default async function HomePage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Metrics />
      <Manifesto />
      <SolutionsBento />
      <VerificationPipeline />
      <Comparison />
      <CaseStudyRail items={caseStudies} />
      <EstimatorTeaser />
      <NetworkBand />
      <TrustStrip />
      <Faq items={homeFaqs} />
      <CtaBand />
    </>
  );
}
