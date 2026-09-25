import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { AudienceEstimator } from "@/components/estimator/audience-estimator";

export const metadata: Metadata = {
  title: "B2B audience estimator",
  description:
    "Estimate how many decision makers you can reach across the US, UK and Canada by industry, function, seniority and company size, and how many are in-market now.",
  alternates: { canonical: "/audience-estimator" },
};

export default function EstimatorPage() {
  return (
    <>
      <PageHero
        title="Size your in-market audience."
        lede="Choose your regions, industries and buyer roles. The estimate updates as you go, and you can email yourself the exact counts."
        crumbs={[{ label: "Audience estimator", href: "/audience-estimator" }]}
      />
      <section aria-label="Estimator" className="shell pb-16">
        <AudienceEstimator />
      </section>
    </>
  );
}
