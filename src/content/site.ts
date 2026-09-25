export const site = {
  name: "BootSoc",
  legalName: "BootSoc Media LLC",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://bootsoc.com",
  tagline: "Verified B2B pipeline from buyers already in-market.",
  description:
    "BootSoc runs intent-led demand generation, content syndication and ABM programs for B2B technology companies across the US, UK and Canada. Every lead is consented, human-verified and delivered to your spec.",
  email: "sayhi@bootsoc.com",
  privacyEmail: "privacy@bootsoc.com",
  address: {
    street: "5830 East 2nd Street, Ste 7000 #29910",
    city: "Casper",
    region: "WY",
    postalCode: "82609",
    country: "US",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/bootsoc",
  },
  publisher: {
    name: "IntentBuy",
    url: "https://intentbuy.com",
  },
  policyVersion: "2026-09-25",
} as const;

export const metrics = [
  { value: 250, suffix: "+", label: "Programs delivered across 24 countries" },
  { value: 98, suffix: "%", label: "Average client satisfaction" },
  { value: 95, suffix: "%", label: "Client retention rate" },
  { value: 5, prefix: "$", suffix: "M+", label: "Revenue generated for clients" },
] as const;

export const secondaryMetrics = [
  { value: "25+", label: "Specialists across data, media and SDR" },
  { value: "150+", label: "Campaigns and sites launched" },
  { value: "5+", label: "Years running B2B growth programs" },
] as const;

export type ClientLogo = { name: string; file: string; width: number; height: number };

// Ratios follow each SVG's viewBox so logos keep optical balance in the marquee.
export const clientLogos: ClientLogo[] = [
  { name: "Microsoft", file: "microsoft.svg", width: 118, height: 25 },
  { name: "Cisco", file: "cisco.svg", width: 44, height: 44 },
  { name: "SAP", file: "sap.svg", width: 44, height: 44 },
  { name: "IBM", file: "ibm.svg", width: 72, height: 27 },
  { name: "Oracle", file: "oracle.svg", width: 120, height: 16 },
  { name: "Adobe", file: "adobe.svg", width: 96, height: 25 },
  { name: "Hewlett Packard Enterprise", file: "hpe.svg", width: 84, height: 35 },
  { name: "Lenovo", file: "lenovo.svg", width: 44, height: 44 },
  { name: "AT&T", file: "atandt.svg", width: 88, height: 36 },
  { name: "Citrix", file: "citrix.svg", width: 80, height: 32 },
  { name: "RingCentral", file: "ringcentral.svg", width: 150, height: 23 },
  { name: "Mitel", file: "mitel.svg", width: 100, height: 23 },
  { name: "Aruba", file: "aruba.svg", width: 80, height: 39 },
  { name: "LogMeIn", file: "logmein.svg", width: 104, height: 30 },
  { name: "Forrester", file: "forrester.svg", width: 128, height: 22 },
];

export type NavItem = { label: string; href: string; description?: string };

export const primaryNav: NavItem[] = [
  { label: "Solutions", href: "/solutions" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Data & trust", href: "/trust" },
  { label: "Network", href: "/network" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
];

export const footerNav: { title: string; links: NavItem[] }[] = [
  {
    title: "Solutions",
    links: [
      { label: "Content syndication", href: "/solutions/content-syndication" },
      { label: "Demand generation", href: "/solutions/demand-generation" },
      { label: "Account-based marketing", href: "/solutions/account-based-marketing" },
      { label: "BootSoc Signal", href: "/solutions/intent-data" },
      { label: "BootSoc Reach", href: "/solutions/programmatic-display" },
      { label: "Event registration", href: "/solutions/event-registration" },
      { label: "Appointment setting", href: "/solutions/appointment-setting" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Audience network", href: "/network" },
      { label: "Careers", href: "/careers" },
      { label: "Resources", href: "/resources" },
      { label: "Glossary", href: "/glossary" },
      { label: "Case studies", href: "/case-studies" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Trust & legal",
    links: [
      { label: "Data & trust center", href: "/trust" },
      { label: "Privacy policy", href: "/privacy" },
      { label: "Cookie policy", href: "/cookies" },
      { label: "Terms of use", href: "/terms" },
      { label: "Email & outreach policy", href: "/email-policy" },
      { label: "DPA & subprocessors", href: "/dpa" },
      { label: "Accessibility", href: "/accessibility" },
    ],
  },
];

export const certifications = [
  {
    id: "iso27001",
    top: "ISO/IEC",
    code: "27001",
    name: "ISO/IEC 27001",
    title: "Information security",
    body: "An independently audited information security management system covering how we collect, store and deliver data.",
  },
  {
    id: "soc2",
    top: "SOC 2",
    code: "Type II",
    name: "SOC 2 Type II",
    title: "Security controls, tested over time",
    body: "An independent auditor has tested our security controls in operation over a sustained period, not just on paper.",
  },
  {
    id: "iso9001",
    top: "ISO",
    code: "9001",
    name: "ISO 9001",
    title: "Quality management",
    body: "Documented, audited processes for how programs are specified, verified and delivered, so quality is repeatable.",
  },
] as const;
