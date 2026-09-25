import type { Metadata } from "next";
import Link from "next/link";
import { PrivacyRequestForm } from "@/components/forms/privacy-request-form";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Make a privacy request",
  description: "Access, delete, correct or opt out of the use of your personal information held by BootSoc.",
  alternates: { canonical: "/privacy-request" },
};

export default function PrivacyRequestPage() {
  return (
    <section className="shell pb-8 pt-32 md:pt-40">
      <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div>
          <h1 className="display max-w-[12ch] animate-fade-up text-[clamp(2.75rem,6vw,5.5rem)]">Make a privacy request.</h1>
          <div className="prose-bs mt-8 text-muted">
            <p>Use this form to access, delete or correct your personal information, or to opt out of its sale, sharing or use for marketing.</p>
            <p>
              We&apos;ll email you to verify your identity, then respond within the time your law requires: 45 days in the US, one month in
              the UK and EU, and 30 days in Canada.
            </p>
            <p>
              Prefer email? Write to <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>. See the{" "}
              <Link href="/privacy">privacy policy</Link> for details of your rights.
            </p>
          </div>
        </div>
        <div className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
          <div className="rounded-[calc(2rem-6px)] bg-raise p-6 md:p-10">
            <PrivacyRequestForm />
          </div>
        </div>
      </div>
    </section>
  );
}
