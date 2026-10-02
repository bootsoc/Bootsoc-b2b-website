import type { Metadata } from "next";
import Image from "next/image";
import { CheckIcon } from "@phosphor-icons/react/dist/ssr";
import { ReportForm } from "@/components/forms/report-form";
import { Tilt } from "@/components/motion/tilt";
import { JsonLd } from "@/components/seo/json-ld";
import { report } from "@/content/report";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: report.title,
  description: `${report.subtitle} Free ${report.pages}-page report with a vendor scorecard and rules summary.`,
  alternates: { canonical: "/report" },
  openGraph: { images: [{ url: "/images/report-cover.png", width: 1632, height: 2112, alt: report.title }] },
};

export default async function ReportPage({ searchParams }: PageProps<"/report">) {
  const { expired } = await searchParams;
  return (
    <section className="shell pb-10 pt-32 md:pt-40">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Report",
          name: report.title,
          description: report.subtitle,
          datePublished: report.published,
          publisher: { "@type": "Organization", name: site.legalName },
          url: absoluteUrl("/report"),
          image: absoluteUrl("/images/report-cover.png"),
          isAccessibleForFree: true,
        }}
      />
      <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
        <div>
          <p className="animate-lift text-sm font-medium text-signal [[data-theme=light]_&]:text-fg">Free report</p>
          <h1 className="display mt-3 max-w-[14ch] animate-lift text-[clamp(2.75rem,6vw,5.25rem)]" style={{ animationDelay: "60ms" }}>
            {report.title}
          </h1>
          <p className="mt-6 max-w-[40ch] text-lg text-muted">{report.subtitle}</p>
          <div className="mt-10 grid items-start gap-8 sm:grid-cols-[12rem_1fr]">
            <Tilt max={5} className="w-44 sm:w-48">
              <div className="overflow-hidden rounded-xl shadow-[0_30px_60px_-20px_rgb(0_0_0/0.7)] ring-1 ring-line">
                <Image src="/images/report-cover.png" alt={`Cover of ${report.title}`} width={1632} height={2112} className="h-auto w-full" priority />
              </div>
            </Tilt>
            <div>
              <h2 className="text-sm font-medium">Inside the {report.pages} pages</h2>
              <ul className="mt-4 grid gap-3">
                {report.inside.map((i) => (
                  <li key={i} className="flex items-start gap-3 text-muted">
                    <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-signal text-on-signal">
                      <CheckIcon size={11} weight="bold" />
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="lg:pt-6">
          <div className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
            <div className="rounded-[calc(2rem-6px)] bg-raise p-6 md:p-10">
              <h2 className="display-md text-3xl">Get your copy</h2>
              {expired && <p className="mt-3 text-sm text-danger">That download link has expired. Fill in the form for a fresh one.</p>}
              <div className="mt-6">
                <ReportForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
