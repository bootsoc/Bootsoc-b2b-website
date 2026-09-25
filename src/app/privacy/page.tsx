import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/legal/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How BootSoc Media LLC collects, uses, shares and protects personal information, and your privacy rights in the US, UK, EU and Canada.",
  alternates: { canonical: "/privacy" },
};

const sections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    body: (
      <>
        <p>
          {site.legalName} (&ldquo;BootSoc&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) runs B2B demand generation, content syndication,
          account-based marketing, intent data and related programs for business clients, and publishes the technology site IntentBuy.
          Our registered address is {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}, USA.
        </p>
        <p>
          For personal information we collect for our own purposes, we are the &ldquo;business&rdquo; (US state laws) or
          &ldquo;controller&rdquo; (UK and EU GDPR). When we process personal information on a client&apos;s instructions, we act as
          their &ldquo;service provider&rdquo; or &ldquo;processor&rdquo;, and the client&apos;s privacy notice also applies.
        </p>
        <p>
          Our Privacy Officer is responsible for how we handle personal information, including under Canada&apos;s PIPEDA and
          Quebec&apos;s Law 25. Contact them at <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>.
        </p>
      </>
    ),
  },
  {
    id: "scope",
    title: "Who this policy covers",
    body: (
      <ul>
        <li>Visitors to bootsoc.com and people who contact us or subscribe to our newsletter</li>
        <li>Business professionals whose work contact details we maintain for B2B marketing</li>
        <li>People who engage with a BootSoc program, for example by downloading content or registering for an event</li>
        <li>Representatives of our clients, prospects, suppliers and partners</li>
        <li>Job applicants (see the applicant section below)</li>
      </ul>
    ),
  },
  {
    id: "information",
    title: "Information we collect",
    body: (
      <>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Identifiers and contact details</td>
              <td>Name, business email, business phone, postal address, online identifiers, IP address</td>
            </tr>
            <tr>
              <td>Professional information</td>
              <td>Job title, seniority, department, employer, company size, industry, professional profile URL</td>
            </tr>
            <tr>
              <td>Internet and engagement activity</td>
              <td>Pages viewed, content downloaded, email opens and clicks, event registrations, form responses</td>
            </tr>
            <tr>
              <td>Inferences</td>
              <td>Topics of professional interest and account-level research intent, derived from engagement</td>
            </tr>
            <tr>
              <td>Approximate location</td>
              <td>Country and region derived from IP address (never precise geolocation)</td>
            </tr>
            <tr>
              <td>Consent and preference records</td>
              <td>Consent wording, timestamp, source page, cookie choices, unsubscribe and opt-out history</td>
            </tr>
            <tr>
              <td>Applicant information</td>
              <td>CV or profile link, work history, location and anything you choose to share in an application</td>
            </tr>
          </tbody>
        </table>
        <p>
          We do not intentionally collect sensitive personal information such as government ID numbers, financial account details,
          health data, precise geolocation, or information about racial or ethnic origin, religion, sexual orientation or union membership.
        </p>
      </>
    ),
  },
  {
    id: "sources",
    title: "Where it comes from",
    body: (
      <ul>
        <li>
          <strong>Directly from you</strong>, when you fill in a form, register for content or events, email us, talk to our team or apply for a job.
        </li>
        <li>
          <strong>Automatically</strong>, through cookies and similar technologies on our sites and emails, subject to your choices. See our{" "}
          <Link href="/cookies">cookie policy</Link>.
        </li>
        <li>
          <strong>Our publication, IntentBuy</strong>, when readers register or subscribe and agree to be contacted about related offers.
        </li>
        <li>
          <strong>Public and professional sources</strong>, such as company websites, press releases, professional networking profiles and
          business directories, from which we compile and re-verify work contact details.
        </li>
        <li>
          <strong>Clients and partners</strong>, for example target account lists or suppression lists a client provides for a program.
        </li>
      </ul>
    ),
  },
  {
    id: "use",
    title: "How we use it, and our lawful bases",
    body: (
      <>
        <table>
          <thead>
            <tr>
              <th>Purpose</th>
              <th>Lawful basis (UK/EU)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Respond to enquiries and provide our services to clients</td>
              <td>Contract, or legitimate interests in running our business</td>
            </tr>
            <tr>
              <td>Send B2B marketing about relevant offers, including on behalf of clients</td>
              <td>Consent, or legitimate interests for corporate subscribers where PECR allows</td>
            </tr>
            <tr>
              <td>Deliver your details to a client whose content or event you requested</td>
              <td>Consent, given at the point you engage, naming or clearly describing the client</td>
            </tr>
            <tr>
              <td>Verify, correct and maintain business contact data</td>
              <td>Legitimate interests in keeping data accurate</td>
            </tr>
            <tr>
              <td>Measure engagement and calculate account-level intent</td>
              <td>Legitimate interests, and consent where cookies require it</td>
            </tr>
            <tr>
              <td>Website analytics and advertising measurement</td>
              <td>Consent (UK, EU, Quebec) or notice with opt-out (other regions)</td>
            </tr>
            <tr>
              <td>Security, fraud prevention and legal compliance</td>
              <td>Legal obligation and legitimate interests</td>
            </tr>
            <tr>
              <td>Recruitment</td>
              <td>Steps prior to a contract, and legitimate interests</td>
            </tr>
          </tbody>
        </table>
        <p>
          Where we rely on legitimate interests, we have assessed that our interests are not overridden by yours. You can ask us for
          details and you can object at any time. You always have an absolute right to object to direct marketing.
        </p>
      </>
    ),
  },
  {
    id: "sharing",
    title: "How we share it",
    body: (
      <>
        <ul>
          <li>
            <strong>Clients</strong>, when you have asked to receive their content or agreed to be contacted by them.
          </li>
          <li>
            <strong>Service providers</strong> who host, store, analyse or send communications for us under contract. See our{" "}
            <Link href="/dpa">subprocessor list</Link>.
          </li>
          <li>
            <strong>Advertising and analytics partners</strong>, such as Google and LinkedIn, only where your cookie choices allow.
          </li>
          <li>
            <strong>Authorities and advisers</strong>, where required by law or to protect rights, safety and security.
          </li>
          <li>
            <strong>A successor business</strong>, if we are involved in a merger, acquisition or sale of assets.
          </li>
        </ul>
        <h3>&ldquo;Sale&rdquo; and &ldquo;sharing&rdquo; under US state laws</h3>
        <p>
          In the past 12 months we may have disclosed identifiers, professional information, internet activity and inferences to clients
          and advertising partners in ways that some US state laws treat as a &ldquo;sale&rdquo;, &ldquo;sharing&rdquo; for cross-context
          behavioral advertising, or &ldquo;targeted advertising&rdquo;. You can opt out at any time through{" "}
          <Link href="/privacy-choices">Your privacy choices</Link>, by submitting a <Link href="/privacy-request">privacy request</Link>, or by
          turning on Global Privacy Control in your browser. We do not knowingly sell or share the personal information of anyone under 16.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    title: "How long we keep it",
    body: (
      <table>
        <thead>
          <tr>
            <th>Record</th>
            <th>Retention</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Business contact data</td>
            <td>While it remains accurate and relevant, re-verified on a rolling basis. Records we cannot verify are deleted.</td>
          </tr>
          <tr>
            <td>Enquiries and lead records</td>
            <td>Up to 3 years from last engagement</td>
          </tr>
          <tr>
            <td>Consent and opt-out records</td>
            <td>For as long as needed to prove consent or honor the opt-out, and at least 3 years</td>
          </tr>
          <tr>
            <td>Suppression list entries</td>
            <td>Indefinitely, keeping only the minimum needed to stop contact</td>
          </tr>
          <tr>
            <td>Job applications</td>
            <td>12 months after the role closes, unless you agree to a longer period</td>
          </tr>
          <tr>
            <td>Analytics data</td>
            <td>Up to 14 months</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    id: "transfers",
    title: "International transfers",
    body: (
      <p>
        We are based in the United States and our main service providers store data in the US. When we transfer personal information from
        the UK, EU or Canada, we use appropriate safeguards such as the UK International Data Transfer Addendum, the EU Standard Contractual
        Clauses, the UK-US Data Bridge or EU-US Data Privacy Framework where a recipient is certified, and contractual protections required
        by PIPEDA and Quebec&apos;s Law 25. You can request a copy of the relevant safeguards.
      </p>
    ),
  },
  {
    id: "security",
    title: "How we protect it",
    body: (
      <p>
        We use encryption in transit and at rest, role-based access controls, multi-factor authentication, logging and vendor due
        diligence. No system is perfectly secure, so we also maintain an incident response process and will notify you and regulators of
        a breach where the law requires.
      </p>
    ),
  },
  {
    id: "us-rights",
    title: "Your rights in the United States",
    body: (
      <>
        <p>
          Depending on your state, including California, Colorado, Connecticut, Virginia, Texas, Oregon, New Jersey and other states with
          comprehensive privacy laws, you may have the right to:
        </p>
        <ul>
          <li>Know and access the personal information we hold about you, and receive a portable copy</li>
          <li>Correct inaccurate personal information</li>
          <li>Delete personal information</li>
          <li>Opt out of the sale or sharing of personal information, targeted advertising and profiling with significant effects</li>
          <li>Limit the use of sensitive personal information (we do not use it)</li>
          <li>Appeal our decision on your request</li>
          <li>Not be discriminated against for exercising these rights</li>
        </ul>
        <p>
          Make a request through our <Link href="/privacy-request">privacy request form</Link> or by emailing{" "}
          <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a>. We verify requests by matching information you provide against our
          records and respond within 45 days, which we may extend once where the law allows. An authorized agent may submit a request with
          your signed permission. If we decline your request, you can appeal by replying to our decision or choosing &ldquo;Appeal&rdquo; on
          the form; if you are unhappy with the outcome you may contact your state Attorney General.
        </p>
        <p>
          California residents may also request information about disclosures for direct marketing under California Civil Code §1798.83.
          Where our activities qualify us as a data broker under California, Texas, Oregon or Vermont law, we register as required, and
          Californians can also submit deletion requests through the state&apos;s Delete Request and Opt-out Platform.
        </p>
      </>
    ),
  },
  {
    id: "uk-eu-rights",
    title: "Your rights in the UK and EU",
    body: (
      <>
        <p>Under the UK GDPR, the Data Protection Act 2018 and the EU GDPR, you can ask us to:</p>
        <ul>
          <li>Give you access to and a copy of your personal data</li>
          <li>Correct or complete it</li>
          <li>Erase it, or restrict how we use it</li>
          <li>Transfer it to you or another organisation</li>
          <li>Stop using it, including for direct marketing (an absolute right)</li>
          <li>Withdraw consent at any time, without affecting earlier processing</li>
        </ul>
        <p>
          We respond within one month, extendable by two months for complex requests. If you have a concern, please contact us first so we
          can resolve it through our complaints process. You also have the right to complain to the UK Information Commissioner&apos;s Office
          (ico.org.uk) or your local EU supervisory authority.
        </p>
      </>
    ),
  },
  {
    id: "canada-rights",
    title: "Your rights in Canada",
    body: (
      <p>
        Under PIPEDA and provincial laws, you can access and correct your personal information and withdraw consent, subject to legal and
        contractual limits. Quebec residents also have rights to data portability, to be informed about and challenge decisions made
        exclusively by automated processing, and to ask us to stop disseminating or de-index personal information. We respond within 30
        days. You may complain to the Office of the Privacy Commissioner of Canada or, in Quebec, the Commission d&apos;accès à
        l&apos;information.
      </p>
    ),
  },
  {
    id: "automated",
    title: "Profiling and automated decisions",
    body: (
      <p>
        We score research intent at the account (company) level and use engagement to decide which content is relevant to a person&apos;s
        role. We do not make decisions based solely on automated processing that produce legal or similarly significant effects on
        individuals.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Global Privacy Control",
    body: (
      <p>
        We use cookies and similar technologies as described in our <Link href="/cookies">cookie policy</Link>. In the UK, EU and Quebec,
        non-essential cookies load only with your consent. Elsewhere you can opt out at any time. We treat a Global Privacy Control signal
        as a valid request to opt out of sale, sharing and targeted advertising for that browser.
      </p>
    ),
  },
  {
    id: "applicants",
    title: "Job applicants",
    body: (
      <p>
        We use the information in your application to assess your suitability, communicate with you and, if you join us, set up your
        employment. We keep applications for 12 months after the role closes, then delete them. You have the same rights described above
        for your region.
      </p>
    ),
  },
  {
    id: "children",
    title: "Children",
    body: <p>Our services are for business professionals. We do not knowingly collect personal information from anyone under 16.</p>,
  },
  {
    id: "changes",
    title: "Changes to this policy",
    body: (
      <p>
        We review this policy at least once a year. If we make material changes, we will update the date at the top and, where
        appropriate, notify you by email or on our website before the change takes effect.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy policy"
      intro={
        <p>
          This policy explains what personal information BootSoc collects, why, who we share it with and the choices you have. Short on
          time? The <Link href="/trust">Data and trust center</Link> summarises the essentials.
        </p>
      }
      sections={sections}
    />
  );
}
