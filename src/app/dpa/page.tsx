import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "DPA and subprocessors",
  description: "BootSoc's data processing terms for clients and the list of subprocessors we use.",
  alternates: { canonical: "/dpa" },
};

const subprocessors = [
  ["Vercel Inc.", "Website hosting, edge network and privacy-friendly analytics", "United States"],
  ["Neon (Databricks, Inc.)", "Database hosting for enquiries, consent and privacy request records", "United States"],
  ["Sanity AS", "Content management for website articles and job listings", "EU / United States"],
  ["Google LLC", "Workspace email and, with consent, Google Analytics", "United States"],
  ["LinkedIn Corporation", "Campaign measurement via Insight Tag, with consent", "United States"],
  ["Cloudflare, Inc.", "Bot protection (Turnstile) and DNS", "United States"],
];

const sections: LegalSection[] = [
  {
    id: "dpa",
    title: "Data processing agreement",
    body: (
      <>
        <p>
          When we process personal information on a client&apos;s behalf, for example a target account list, a suppression list or leads
          generated for them, we act as a processor or service provider. Our data processing agreement covers:
        </p>
        <ul>
          <li>UK GDPR and EU GDPR Article 28 terms, including instructions, confidentiality, security, assistance and audit</li>
          <li>CCPA/CPRA service provider and contractor terms, and equivalent terms under other US state laws</li>
          <li>PIPEDA and Quebec Law 25 obligations, including safeguards for transfers outside Quebec</li>
          <li>International transfer mechanisms: UK IDTA / Addendum and EU Standard Contractual Clauses</li>
          <li>Breach notification without undue delay, and deletion or return of data at the end of a program</li>
        </ul>
        <p>
          Clients can request a pre-signed copy by emailing <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
        </p>
      </>
    ),
  },
  {
    id: "subprocessors",
    title: "Subprocessors",
    body: (
      <>
        <div className="overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Purpose</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {subprocessors.map((s) => (
                <tr key={s[0]}>
                  {s.map((c) => (
                    <td key={c}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          We give clients at least 30 days&apos; notice of new subprocessors that handle client personal data. To subscribe to updates, email{" "}
          <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
        </p>
      </>
    ),
  },
  {
    id: "related",
    title: "Related policies",
    body: (
      <p>
        See our <Link href="/privacy">privacy policy</Link>, <Link href="/email-policy">email and outreach policy</Link> and{" "}
        <Link href="/trust">data and trust center</Link>.
      </p>
    ),
  },
];

export default function DpaPage() {
  return <LegalPage title="DPA and subprocessors" sections={sections} />;
}
