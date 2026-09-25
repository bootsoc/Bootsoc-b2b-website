import { Hero } from "@/components/sections/hero";
import { LogoMarquee } from "@/components/sections/logo-marquee";
import { Metrics } from "@/components/sections/metrics";
import { Manifesto } from "@/components/sections/manifesto";
import { SolutionsBento } from "@/components/sections/solutions-bento";
import { VerificationPipeline } from "@/components/sections/verification-pipeline";
import { EstimatorTeaser } from "@/components/sections/estimator-teaser";
import { NetworkBand } from "@/components/sections/network-band";
import { Regions } from "@/components/sections/regions";
import { Faq } from "@/components/sections/faq";
import { CtaBand } from "@/components/sections/cta-band";
import { homeFaqs } from "@/content/faqs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <Metrics />
      <Manifesto />
      <SolutionsBento />
      <VerificationPipeline />
      <EstimatorTeaser />
      <NetworkBand />
      <Regions />
      <Faq items={homeFaqs} />
      <CtaBand />
    </>
  );
}
