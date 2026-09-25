import { AudienceEstimator } from "@/components/estimator/audience-estimator";

export function EstimatorTeaser() {
  return (
    <section aria-labelledby="estimator-heading" className="shell py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <p className="text-sm font-medium text-signal [[data-theme=light]_&]:text-fg">Audience estimator</p>
          <h2 id="estimator-heading" className="display mt-4 max-w-[12ch] text-[clamp(2.75rem,5.5vw,5rem)]">
            How many of your buyers are in-market?
          </h2>
          <p className="mt-5 max-w-[42ch] text-lg text-muted">
            Pick the roles you sell to. See how many decision makers you can reach across the US, UK and Canada, and how many are buying this quarter.
          </p>
        </div>
        <AudienceEstimator compactMode />
      </div>
    </section>
  );
}
