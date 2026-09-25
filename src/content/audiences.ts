export const roles = [
  {
    id: "demand",
    label: "Demand gen leaders",
    title: "Hit the pipeline number without padding the funnel.",
    points: [
      "Lead volume you can forecast, priced on accepted, in-spec leads",
      "Signal intent pushes budget toward accounts already researching",
      "Weekly reviews that tie programs to meetings and pipeline",
    ],
    programs: ["content-syndication", "demand-generation", "intent-data"],
  },
  {
    id: "abm",
    label: "ABM and field marketing",
    title: "Reach every stakeholder inside the accounts that matter.",
    points: [
      "Buying-committee maps for each priority account",
      "Coordinated display, content and SDR touches on the same list",
      "Account-level engagement instead of disconnected lead counts",
    ],
    programs: ["account-based-marketing", "programmatic-display", "event-registration"],
  },
  {
    id: "sales",
    label: "Sales leaders",
    title: "Conversations with buyers who expect your call.",
    points: [
      "Meetings booked straight into rep calendars, with a briefing note",
      "Qualification criteria your team agrees before launch",
      "Surging-account alerts so reps call at the right moment",
    ],
    programs: ["appointment-setting", "demand-generation", "intent-data"],
  },
  {
    id: "ops",
    label: "Marketing ops",
    title: "Clean data that lands where it should.",
    points: [
      "Field mapping, lead source values and dedupe handled before delivery",
      "Direct push into HubSpot, Salesforce, Marketo or Eloqua",
      "Consent records attached to every lead for audit trails",
    ],
    programs: ["content-syndication", "account-based-marketing", "intent-data"],
  },
] as const;

export const industries = [
  {
    id: "cybersecurity",
    name: "Cybersecurity",
    body: "CISOs, security architects and SOC leaders evaluating zero trust, SIEM, XDR and cloud security.",
    image: "/images/ind-cybersecurity.jpg",
  },
  {
    id: "saas",
    name: "Cloud and SaaS",
    body: "Engineering, IT and line-of-business buyers comparing platforms, dev tools and infrastructure.",
    image: "/images/ind-saas.jpg",
  },
  {
    id: "fintech",
    name: "Fintech and financial services",
    body: "Finance, risk and operations leaders at banks, insurers and fast-growing fintechs.",
    image: "/images/ind-fintech.jpg",
  },
  {
    id: "healthcare",
    name: "Healthcare IT",
    body: "Health system CIOs, clinical informatics and revenue-cycle teams across the US, UK and Canada.",
    image: "/images/ind-healthcare.jpg",
  },
  {
    id: "hrtech",
    name: "HR tech",
    body: "CHROs, talent acquisition and people-ops leaders buying HCM, payroll and engagement tools.",
    image: "/images/ind-hrtech.jpg",
  },
  {
    id: "martech",
    name: "Martech and adtech",
    body: "CMOs, demand gen and marketing-ops teams evaluating their stack.",
    image: "/images/ind-martech.jpg",
  },
  {
    id: "telecom",
    name: "Telecoms and networking",
    body: "Network, infrastructure and unified-communications buyers at enterprises and carriers.",
    image: "/images/ind-telecom.jpg",
  },
  {
    id: "manufacturing",
    name: "Manufacturing and industrial tech",
    body: "Operations, supply chain and plant IT leaders modernising with automation and IoT.",
    image: "/images/ind-manufacturing.jpg",
  },
] as const;

export const comparison = [
  { feature: "Consent record (wording, page, timestamp) on every lead", bootsoc: true, typical: false },
  { feature: "Human QA review before delivery", bootsoc: true, typical: false },
  { feature: "Audited security: SOC 2 Type II and ISO/IEC 27001", bootsoc: true, typical: "Rarely" },
  { feature: "Owned publisher audience for first-party intent", bootsoc: true, typical: false },
  { feature: "Filters enforced to your signed spec", bootsoc: true, typical: "Loosely" },
  { feature: "Free replacement for out-of-spec leads", bootsoc: true, typical: "Sometimes" },
  { feature: "Separate playbooks for US, UK and Canadian law", bootsoc: true, typical: false },
  { feature: "Account-level and pipeline reporting", bootsoc: true, typical: "Lead counts" },
] as const;

export const integrations = [
  { name: "Salesforce", category: "CRM" },
  { name: "HubSpot", category: "CRM" },
  { name: "Microsoft Dynamics 365", category: "CRM" },
  { name: "Marketo Engage", category: "Marketing automation" },
  { name: "Oracle Eloqua", category: "Marketing automation" },
  { name: "Salesforce Account Engagement", category: "Marketing automation" },
  { name: "6sense", category: "ABM and intent" },
  { name: "Demandbase", category: "ABM and intent" },
  { name: "Bombora", category: "ABM and intent" },
  { name: "ON24", category: "Events and webinars" },
  { name: "Zoom Events", category: "Events and webinars" },
  { name: "Goldcast", category: "Events and webinars" },
  { name: "Cvent", category: "Events and webinars" },
  { name: "LinkedIn Ads", category: "Advertising" },
  { name: "Google Ads", category: "Advertising" },
  { name: "The Trade Desk", category: "Advertising" },
  { name: "Secure CSV and SFTP", category: "Delivery" },
  { name: "REST API and webhooks", category: "Delivery" },
] as const;
