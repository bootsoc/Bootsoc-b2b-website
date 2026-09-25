import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { Metrics } from "@/components/sections/metrics";
import { Manifesto } from "@/components/sections/manifesto";
import { SolutionsBento } from "@/components/sections/solutions-bento";
import { RolesTabs } from "@/components/sections/roles-tabs";
import { VerificationPipeline } from "@/components/sections/verification-pipeline";
import { Comparison } from "@/components/sections/comparison";
import { Industries } from "@/components/sections/industries";
import { CaseStudyRail } from "@/components/sections/case-study-rail";
import { EstimatorTeaser } from "@/components/sections/estimator-teaser";
import { NetworkBand } from "@/components/sections/network-band";
import { Regions } from "@/components/sections/regions";
import { Certifications } from "@/components/sections/certifications";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { homeFaqs } from "@/content/faqs";
import { getCaseStudies } from "@/sanity/queries";

export const revalidate = 300;

export default async function HomePage() {
  const caseStudies = await getCaseStudies();
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Metrics />
      <Manifesto />
      <SolutionsBento />
      <RolesTabs />
      <VerificationPipeline />
      <Comparison />
      <Industries />
      <CaseStudyRail items={caseStudies} />
      <EstimatorTeaser />
      <NetworkBand />
      <Regions />
      <Certifications />
      <Faq items={homeFaqs} />
      <CtaBand />
    </>
  );
}
