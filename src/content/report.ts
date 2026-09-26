export const report = {
  slug: "b2b-lead-quality-report-2026",
  title: "The 2026 B2B Lead Quality Report",
  subtitle: "Research, regulation and a practical playbook for demand teams selling into the US, UK and Canada.",
  file: "bootsoc-b2b-lead-quality-report-2026.pdf",
  pages: 7,
  published: "2026-09-26",
  inside: [
    "Why only about 5% of your market is buying right now, and what that means for lead targets",
    "The five checks that separate a verified lead from a guessed one",
    "US, UK and Canadian email and privacy rules on one page, with current penalties",
    "Six intent-data plays, matched to the signal you see",
    "A 15-question scorecard for evaluating any lead vendor",
    "The KPIs that connect lead programs to pipeline",
  ],
};

export type Section = { id: string; title: string; paragraphs?: string[]; bullets?: string[]; table?: { head: string[]; rows: string[][] } };

export const reportSections: Section[] = [
  {
    id: "summary",
    title: "Executive summary",
    paragraphs: [
      "B2B demand teams are asked to deliver more pipeline from budgets that are flat or falling. Lead programs promise volume, but volume alone doesn't survive contact with a sales team: records bounce, titles are out of date, and a meaningful share of every file never engaged with the content at all.",
      "This report brings together published research on how B2B buyers behave, the current email and privacy rules in the three markets most North American and UK technology companies sell into, and the operating standards we use to verify leads. It closes with practical tools: a vendor scorecard and a KPI framework you can apply this quarter.",
    ],
    bullets: [
      "Only around 5% of B2B buyers are in-market in any given quarter. Lead targets that ignore this chase the same small pool with ever more aggressive tactics.",
      "Verification is a process, not a promise. Consent, engagement, identity, company fit and deliverability each need a separate check.",
      "The compliance bar is rising: Canada already requires consent for commercial email, the UK has aligned PECR fines with UK GDPR, and US state privacy laws now cover business contact data.",
      "Intent data only pays off when a specific play is attached to each signal before it arrives.",
      "Measure programs on accepted leads, opportunities and pipeline per dollar, not on raw lead counts.",
    ],
  },
  {
    id: "market",
    title: "1. The 95:5 reality",
    paragraphs: [
      "Research by Professor John Dawes at the Ehrenberg-Bass Institute, popularised by LinkedIn's B2B Institute, estimates that only about 5% of potential B2B buyers are in the market for a given category at any time. The other 95% will buy eventually, but not this quarter. Many business purchases happen on multi-year cycles: the same research notes that most companies replace computers roughly every four years and change banks about every five.",
      "For demand teams this has two consequences. First, the in-market pool is small, so lead programs must find those buyers precisely rather than widening filters until volume targets are met. Second, the other 95% still matter: consistent, relevant presence builds the memory that brings them to you when they do enter the market.",
      "In practice this means pairing two motions: intent-led programs that capture active demand now, and always-on content and advertising that keep your brand familiar to the rest of the market.",
    ],
  },
  {
    id: "breaks",
    title: "2. Where lead quality breaks",
    paragraphs: [
      "When sales teams reject leads, the reasons usually fall into a handful of patterns. Each has a different root cause and a different fix.",
    ],
    table: {
      head: ["Failure", "What it looks like", "Root cause"],
      rows: [
        ["Non-human engagement", "Downloads with no reading time, identical form timing, clustered IPs", "Bots, click farms and incentivised downloads"],
        ["Stale identity", "Bounces, wrong titles, people who left months ago", "Records verified at collection, not at delivery"],
        ["Filter leakage", "Wrong company size, adjacent job titles, out-of-region contacts", "Loose matching to fill volume targets"],
        ["Missing consent", "Prospects who don't remember opting in", "Vague or absent consent capture"],
        ["Wrong stage", "Researchers with no project, students, competitors", "No qualification beyond a form fill"],
      ],
    },
  },
  {
    id: "checks",
    title: "3. The five-check verification standard",
    paragraphs: ["A lead should only be called verified when it passes all five of these checks, ideally with an automated first pass and a human review."],
    bullets: [
      "Consent captured: the opt-in wording, the page it appeared on and a timestamp are stored with the record and available on request.",
      "Engagement confirmed: the person actually consumed the content, and bot or click-farm patterns have been screened out.",
      "Identity and role verified: name, title and seniority match a live professional profile at the time of delivery.",
      "Company fit matched: industry, size, revenue and geography match your written specification, and suppression lists have been applied.",
      "Deliverability tested: the mailbox is verified at delivery, catch-all domains are flagged, and phone numbers are validated where calling is involved.",
    ],
  },
  {
    id: "rules",
    title: "4. The rules on one page",
    paragraphs: [
      "This summary reflects the position in September 2026. It is not legal advice; confirm specific programs with counsel.",
    ],
    table: {
      head: ["Market", "Email marketing", "Privacy and data", "Maximum penalties"],
      rows: [
        [
          "United States",
          "CAN-SPAM: accurate headers, postal address, working opt-out honored within 10 business days. No prior consent required.",
          "CCPA/CPRA and about 20 state privacy laws now in force; business contact data is covered. Honor Global Privacy Control. Data broker registration in several states.",
          "CAN-SPAM up to $53,088 per violating email.",
        ],
        [
          "United Kingdom",
          "PECR: corporate subscribers can be emailed without prior consent if the sender is identified and an opt-out is offered. Sole traders need consent or soft opt-in.",
          "UK GDPR as amended by the Data (Use and Access) Act 2025; named business contacts are personal data and need a lawful basis.",
          "UK GDPR up to £17.5m or 4% of turnover. The 2025 Act raises PECR maximums to the same level as its provisions commence.",
        ],
        [
          "Canada",
          "CASL: express or implied consent before sending, sender identification, unsubscribe honored within 10 business days.",
          "PIPEDA nationally; Quebec's Law 25 adds opt-in for tracking technologies and a named person responsible for personal information.",
          "CASL up to CA$10 million per violation for organisations.",
        ],
      ],
    },
  },
  {
    id: "plays",
    title: "5. Six intent plays",
    paragraphs: ["Intent data creates value only when each signal triggers a predefined action. Agree these plays with sales before switching intent on."],
    table: {
      head: ["Signal", "What it suggests", "The play"],
      rows: [
        ["Early, single-topic surge", "Problem awareness", "Educational content via syndication and display"],
        ["Competitor or alternative research", "Active evaluation", "Comparison content and proof points"],
        ["Multi-topic, sustained surge", "Buying committee forming", "ABM personalisation and SDR outreach"],
        ["Surge at an open opportunity", "Deal in motion", "Same-day alert to the account owner"],
        ["Surge at a current customer", "Expansion or churn risk", "Customer success review"],
        ["Surge from a lost deal", "Re-evaluation", "Win-back sequence from the original rep"],
      ],
    },
  },
  {
    id: "scorecard",
    title: "6. The lead vendor scorecard",
    paragraphs: ["Score each answer 0 (no), 1 (partly) or 2 (yes, with evidence). Vendors scoring under 20 of 30 deserve a closer look before you sign."],
    bullets: [
      "Can you show the consent record for any lead you deliver?",
      "How do you detect and remove bot or incentivised engagement?",
      "Are titles and companies verified at delivery, and by whom?",
      "Is every lead matched to our written spec, including company size and region?",
      "Do you apply our customer, opportunity and competitor suppression lists?",
      "Is email deliverability verified at the mailbox level before delivery?",
      "Do you own the audience or publisher sites you distribute through?",
      "Is any work subcontracted to other vendors or offshore list brokers?",
      "What is your written replacement policy for out-of-spec leads?",
      "How do you handle UK and Canadian contacts differently from US ones?",
      "Are you certified (for example ISO/IEC 27001, SOC 2 Type II), and will you share reports under NDA?",
      "Do you honor opt-outs across every client, through a global suppression list?",
      "Can you deliver directly into our CRM or marketing automation platform?",
      "Will you report on acceptance, opportunities and pipeline, not just volume?",
      "Can we review a sample file built to our spec before committing?",
    ],
  },
  {
    id: "kpis",
    title: "7. KPIs that connect leads to pipeline",
    table: {
      head: ["Metric", "Formula", "Why it matters"],
      rows: [
        ["Acceptance rate", "Accepted leads / delivered leads", "The first signal of vendor quality"],
        ["Lead-to-opportunity rate", "Opportunities / accepted leads", "Whether leads reach real sales conversations"],
        ["Cost per opportunity", "Program spend / opportunities", "A fairer comparison than cost per lead"],
        ["Pipeline per dollar", "Pipeline created / program spend", "The number finance cares about"],
        ["Time to first meeting", "Days from delivery to first meeting", "Exposes slow follow-up and routing gaps"],
      ],
    },
  },
];

export const reportSources = [
  "Dawes, J. (2021). Advertising effectiveness and the 95-5 rule: most B2B buyers are not in the market right now. Ehrenberg-Bass Institute / LinkedIn B2B Institute. business.linkedin.com/marketing-solutions/b2b-institute",
  "LinkedIn B2B Institute and Ehrenberg-Bass Institute. How B2B Brands Grow. business.linkedin.com/marketing-solutions/b2b-institute/how-b2b-brands-grow",
  "U.S. Federal Trade Commission. FTC Publishes Inflation-Adjusted Civil Penalty Amounts for 2025. ftc.gov",
  "Data (Use and Access) Act 2025, c. 18. legislation.gov.uk/ukpga/2025/18",
  "Information Commissioner's Office. The Data (Use and Access) Act 2025: what does it mean for organisations? ico.org.uk",
  "Canada's Anti-Spam Legislation (S.C. 2010, c. 23). fightspam.gc.ca",
];
