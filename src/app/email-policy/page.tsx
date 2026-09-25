import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Email and outreach policy",
  description: "How BootSoc sends email and makes calls in line with CAN-SPAM, TCPA, CASL, PECR and UK GDPR.",
  alternates: { canonical: "/email-policy" },
};

const sections: LegalSection[] = [
  {
    id: "principles",
    title: "Principles for every message",
    body: (
      <ul>
        <li>We only contact business professionals about offers relevant to their role.</li>
        <li>Every email identifies BootSoc (or the client we act for), includes our postal address and has a working one-click unsubscribe.</li>
        <li>Subject lines and headers are accurate and never misleading.</li>
        <li>Every opt-out joins a global suppression list and is honored within 10 business days at the latest, across all programs.</li>
        <li>We never send to personal (non-work) email addresses from our business contact data.</li>
      </ul>
    ),
  },
  {
    id: "us",
    title: "United States",
    body: (
      <ul>
        <li>Commercial email follows CAN-SPAM, and we honor opt-out requests under state privacy laws.</li>
        <li>Calls are screened against the National Do Not Call Registry and applicable state lists, and follow TCPA and state calling-hour rules.</li>
        <li>We don&apos;t use autodialers or prerecorded messages to call mobile numbers without prior express written consent.</li>
      </ul>
    ),
  },
  {
    id: "canada",
    title: "Canada",
    body: (
      <ul>
        <li>
          We send commercial electronic messages only with express consent, or where implied consent clearly applies under CASL (for example
          conspicuous publication, where the message relates to the person&apos;s role).
        </li>
        <li>Every message identifies the sender and includes contact information and an unsubscribe mechanism valid for at least 60 days.</li>
        <li>We keep records that prove consent for as long as we rely on it.</li>
        <li>Calls are screened against the National Do Not Call List.</li>
      </ul>
    ),
  },
  {
    id: "uk",
    title: "United Kingdom",
    body: (
      <ul>
        <li>
          We email corporate subscribers on the basis of legitimate interests, with an opt-out in every message, as PECR allows. Sole traders
          and some partnerships are treated as individual subscribers and contacted only with consent.
        </li>
        <li>We document legitimate interests assessments and honor objections to direct marketing immediately.</li>
        <li>Calls are screened against the Telephone Preference Service (TPS) and Corporate TPS.</li>
      </ul>
    ),
  },
  {
    id: "clients",
    title: "Programs we run for clients",
    body: (
      <p>
        When a person engages with a client&apos;s content through a BootSoc program, the opt-in wording names the client or clearly describes
        who will contact them. Clients receive the consent record with each lead and agree to honor the same opt-out standards.
      </p>
    ),
  },
  {
    id: "report",
    title: "Report a problem",
    body: (
      <p>
        If you think you received a message from us in error, email <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a> or submit
        an <Link href="/privacy-request">unsubscribe request</Link>. We investigate every report.
      </p>
    ),
  },
];

export default function EmailPolicyPage() {
  return <LegalPage title="Email and outreach policy" sections={sections} />;
}
