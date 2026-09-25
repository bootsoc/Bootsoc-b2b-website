import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CareersForm } from "@/components/forms/careers-form";
import { getJobs } from "@/sanity/queries";

export const revalidate = 300;

export const metadata: Metadata = {
  title: "Careers",
  description: "Join BootSoc's team of demand generation, data, media and SDR specialists. Remote-friendly roles across the US, UK and Canada.",
  alternates: { canonical: "/careers" },
};

const perks = [
  { title: "Remote-friendly", body: "Most roles work across US, UK and Canadian time zones, so flexibility is built in." },
  { title: "Learn the full funnel", body: "Data, media, content and SDR sit together, so you see how pipeline is actually built." },
  { title: "Grow with us", body: "A growing company means real ownership early, and room to shape how the work gets done." },
];

export default async function CareersPage() {
  const jobs = await getJobs();
  return (
    <>
      <PageHero
        title="Build pipeline people trust."
        lede="We're a team of demand strategists, data analysts, media buyers and SDRs who care about doing lead generation properly."
        image="/images/careers-team.jpg"
        imageAlt="BootSoc colleagues in a meeting room discussing a project"
        crumbs={[{ label: "Careers", href: "/careers" }]}
      />

      <section aria-labelledby="perks-heading" className="shell py-16 md:py-24">
        <h2 id="perks-heading" className="sr-only">
          Why BootSoc
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {perks.map((p) => (
            <div key={p.title} className="border-t border-line pt-6">
              <h3 className="display-md text-3xl">{p.title}</h3>
              <p className="mt-3 text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="roles-heading" className="shell py-16 md:py-24">
        <h2 id="roles-heading" className="display text-[clamp(2.5rem,5vw,4.5rem)]">
          Open roles
        </h2>
        {jobs.length === 0 ? (
          <p className="mt-6 max-w-[56ch] text-lg text-muted">
            No open roles right now, but we&apos;re always glad to hear from strong SDRs, data analysts and demand marketers. Send a general
            application below.
          </p>
        ) : (
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {jobs.map((j) => (
              <li key={j._id} className="grid gap-2 py-6 md:grid-cols-[1fr_auto] md:items-center">
                <div>
                  <h3 className="text-xl font-medium">{j.title}</h3>
                  {j.summary && <p className="mt-1 text-muted">{j.summary}</p>}
                </div>
                <p className="text-sm text-muted">{[j.team, j.location, j.type].filter(Boolean).join(" / ")}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="apply-heading" className="shell pb-8">
        <div className="grid gap-10 rounded-[2rem] bg-raise p-6 ring-1 ring-line md:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 id="apply-heading" className="display text-5xl">
              Apply
            </h2>
            <p className="mt-4 max-w-[36ch] text-muted">Tell us a little about you. We read every application.</p>
          </div>
          <CareersForm />
        </div>
      </section>
    </>
  );
}
