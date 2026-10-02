import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Accessibility statement",
  description: "How bootsoc.com is built to meet WCAG 2.2 AA, the accessibility features on every page, known limitations, and how to report a barrier by email.",
  alternates: { canonical: "/accessibility" },
};

const sections: LegalSection[] = [
  {
    id: "commitment",
    title: "Our commitment",
    body: (
      <p>
        We want everyone to be able to use bootsoc.com. We design and test against the Web Content Accessibility Guidelines (WCAG) 2.2 at
        level AA, which supports our obligations under the Americans with Disabilities Act, the UK Equality Act 2010 and the Accessibility for
        Ontarians with Disabilities Act.
      </p>
    ),
  },
  {
    id: "features",
    title: "What we've built in",
    body: (
      <ul>
        <li>Semantic headings, landmarks and a skip link on every page</li>
        <li>Full keyboard support with visible focus indicators</li>
        <li>Text and interface contrast that meets or exceeds AA ratios, in both dark and light themes</li>
        <li>Animations that stop or simplify when your device asks for reduced motion</li>
        <li>Form fields with visible labels, clear error messages and announced status updates</li>
        <li>Text alternatives for meaningful images</li>
      </ul>
    ),
  },
  {
    id: "limits",
    title: "Known limitations",
    body: (
      <p>
        Some third-party content, such as embedded documents supplied by partners, may not fully meet our standard. We work with those
        partners to improve it and can provide the content in another format on request.
      </p>
    ),
  },
  {
    id: "feedback",
    title: "Feedback and help",
    body: (
      <p>
        If you have trouble using any part of the site, email <a href={`mailto:${site.email}`}>{site.email}</a> with the page and the problem.
        We aim to respond within 5 business days and will provide the information in an accessible format.
      </p>
    ),
  },
];

export default function AccessibilityPage() {
  return <LegalPage title="Accessibility statement" sections={sections} />;
}
