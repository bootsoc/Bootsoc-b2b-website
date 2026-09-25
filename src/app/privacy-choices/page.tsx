import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { PrivacyChoicesLink } from "@/components/consent/privacy-choices-link";

export const metadata: Metadata = {
  title: "Your privacy choices",
  description: "Opt out of the sale or sharing of personal information, targeted advertising and marketing contact from BootSoc.",
  alternates: { canonical: "/privacy-choices" },
};

const sections: LegalSection[] = [
  {
    id: "browser",
    title: "Opt out on this browser",
    body: (
      <>
        <p>
          Turn off advertising cookies to opt out of the sale or sharing of personal information collected through this website and of
          targeted advertising. Your choice is saved for this browser and device.
        </p>
        <p>
          <PrivacyChoicesLink className="inline-flex min-h-11 items-center rounded-full bg-signal px-5 text-base font-medium text-on-signal no-underline hover:bg-signal-press" label="Open privacy choices" />
        </p>
        <p>
          If your browser sends a <strong>Global Privacy Control</strong> signal, we honor it automatically as an opt-out for that browser.
        </p>
      </>
    ),
  },
  {
    id: "data",
    title: "Opt out for your business contact data",
    body: (
      <p>
        To opt out of the sale or sharing of the business contact data we maintain about you, stop all marketing contact, or delete your
        data, submit a <Link href="/privacy-request">privacy request</Link>. We don&apos;t need you to create an account, and we only ask for
        the information needed to find your records.
      </p>
    ),
  },
  {
    id: "email",
    title: "Stop emails and calls",
    body: (
      <p>
        Use the unsubscribe link in any BootSoc email, or tell our caller you don&apos;t want further calls. We add you to our global
        suppression list and stop contact within 10 business days at the latest.
      </p>
    ),
  },
];

export default function PrivacyChoicesPage() {
  return <LegalPage title="Your privacy choices" sections={sections} />;
}
