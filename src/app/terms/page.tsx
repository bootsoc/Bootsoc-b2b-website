import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Terms of use for bootsoc.com",
  description: "The terms for using bootsoc.com: acceptable use, intellectual property, estimates and third-party links, liability limits and Wyoming governing law.",
  alternates: { canonical: "/terms" },
};

const sections: LegalSection[] = [
  {
    id: "agreement",
    title: "Agreement",
    body: (
      <p>
        These terms apply to your use of bootsoc.com and related pages operated by {site.legalName}. By using the site you agree to them.
        Client programs are governed by a separate signed agreement, which takes priority over these terms.
      </p>
    ),
  },
  {
    id: "use",
    title: "Using the site",
    body: (
      <ul>
        <li>Use the site only for lawful purposes and in line with these terms.</li>
        <li>Don&apos;t attempt to disrupt, overload, probe or gain unauthorised access to the site or its systems.</li>
        <li>Don&apos;t scrape, harvest or bulk-download content or data from the site without our written permission.</li>
        <li>Give accurate information when you submit a form, and only submit information about yourself or with permission.</li>
      </ul>
    ),
  },
  {
    id: "ip",
    title: "Intellectual property",
    body: (
      <p>
        The site, its content, design, software and the BootSoc, BootSoc Signal and BootSoc Reach names and logos belong to {site.legalName}
        or its licensors. Client and partner logos are trademarks of their owners and are shown to describe work we have delivered. You may
        view and share our pages for your own business use, but you may not copy, modify or republish substantial parts without permission.
      </p>
    ),
  },
  {
    id: "estimates",
    title: "Estimates and information",
    body: (
      <p>
        Content on the site, including the audience estimator, is general information. Estimates are modeled and rounded, are not a quote or
        guarantee of results, and may differ from counts in a formal proposal. Nothing on the site is legal advice.
      </p>
    ),
  },
  {
    id: "links",
    title: "Third-party links",
    body: <p>We link to other sites, including IntentBuy and partners. We aren&apos;t responsible for the content or practices of sites we don&apos;t control.</p>,
  },
  {
    id: "liability",
    title: "Disclaimers and liability",
    body: (
      <>
        <p>
          The site is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. To the fullest extent permitted by law, we disclaim all
          warranties, express or implied, and we are not liable for indirect, incidental, special or consequential losses arising from your
          use of the site. Our total liability relating to the site is limited to US$100.
        </p>
        <p>
          Nothing in these terms limits liability that cannot be limited by law, including rights you have as a consumer in the UK or
          Canada.
        </p>
      </>
    ),
  },
  {
    id: "law",
    title: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the State of Wyoming, USA, without regard to conflict-of-law rules. Courts in Wyoming have
        exclusive jurisdiction, except where the law of your country gives you the right to bring proceedings locally.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "Privacy",
    body: (
      <p>
        Our <Link href="/privacy">privacy policy</Link> and <Link href="/cookies">cookie policy</Link> explain how we handle personal
        information.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes",
    body: <p>We may update these terms. The date at the top shows when they last changed. Continuing to use the site means you accept the updated terms.</p>,
  },
];

export default function TermsPage() {
  return <LegalPage title="Terms of use" sections={sections} />;
}
