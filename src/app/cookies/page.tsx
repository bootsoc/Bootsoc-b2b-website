import type { Metadata } from "next";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { PrivacyChoicesLink } from "@/components/consent/privacy-choices-link";

export const metadata: Metadata = {
  title: "Cookie policy and consent choices",
  description: "The cookies BootSoc uses, from strictly necessary to analytics and advertising, how consent works in each region, and how Global Privacy Control applies.",
  alternates: { canonical: "/cookies" },
};

const rows = [
  ["bs_consent", "BootSoc", "Strictly necessary", "Remembers your cookie choices", "12 months"],
  ["bs_geo", "BootSoc", "Strictly necessary", "Applies the right consent rules for your region (country and region only)", "24 hours"],
  ["bs_vid", "BootSoc", "Strictly necessary", "Random ID used to keep a record of your consent choices", "12 months"],
  ["bs-theme (local storage)", "BootSoc", "Functional", "Remembers light or dark theme", "Until cleared"],
  ["_ga, _ga_*", "Google Analytics 4", "Analytics", "Counts visits and measures which pages help visitors", "Up to 13 months"],
  ["li_sugr, bcookie, lidc, UserMatchHistory", "LinkedIn Insight Tag", "Advertising", "Measures B2B campaign performance and builds matched audiences", "Up to 6 months"],
];

const sections: LegalSection[] = [
  {
    id: "what",
    title: "What cookies are",
    body: (
      <p>
        Cookies are small files stored by your browser. Similar technologies include local storage and pixels in emails. We use them to
        run the site securely, remember your choices and, with your permission where required, understand visits and measure advertising.
      </p>
    ),
  },
  {
    id: "list",
    title: "Cookies we use",
    body: (
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Provider</th>
              <th>Type</th>
              <th>Purpose</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r[0]}>
                {r.map((c) => (
                  <td key={c}>{c}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p>We also use Vercel Web Analytics and Speed Insights, which measure page performance without cookies or cross-site identifiers.</p>
      </div>
    ),
  },
  {
    id: "regions",
    title: "How consent works where you are",
    body: (
      <ul>
        <li>
          <strong>UK, EU, EEA, Switzerland and Quebec:</strong> analytics and advertising cookies load only after you accept them. Rejecting is
          as easy as accepting.
        </li>
        <li>
          <strong>United States and the rest of Canada:</strong> analytics and advertising cookies are on by default and you can switch them off
          at any time. A Global Privacy Control signal automatically turns off advertising cookies.
        </li>
      </ul>
    ),
  },
  {
    id: "manage",
    title: "Change your choices",
    body: (
      <>
        <p>
          <PrivacyChoicesLink className="text-base text-fg underline underline-offset-4" label="Open cookie and privacy choices" />
        </p>
        <p>
          You can also block or delete cookies in your browser settings. Blocking strictly necessary cookies may stop parts of the site from
          working.
        </p>
      </>
    ),
  },
  {
    id: "email",
    title: "Email tracking",
    body: (
      <p>
        Our marketing emails may contain pixels and tracked links that tell us whether an email was opened and which links were clicked.
        We use this to measure engagement and avoid sending irrelevant content. You can disable image loading in your email client to
        block pixels, and every email includes an unsubscribe link.
      </p>
    ),
  },
];

export default function CookiesPage() {
  return <LegalPage title="Cookie policy" sections={sections} />;
}
