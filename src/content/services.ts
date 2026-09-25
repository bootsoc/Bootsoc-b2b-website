export type Step = { title: string; body: string };
export type Faq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  product?: string;
  navLabel: string;
  summary: string;
  heroTitle: string;
  heroSub: string;
  image: string;
  imageAlt: string;
  problemTitle: string;
  problems: { title: string; body: string }[];
  steps: Step[];
  deliverables: string[];
  targeting: string[];
  guarantees: { value: string; label: string }[];
  faqs: Faq[];
  metaTitle: string;
  metaDescription: string;
};

const commonTargeting = [
  "Industry and sub-vertical",
  "Company size and revenue",
  "Job function and seniority",
  "Named account lists (ABM)",
  "Technographics and installed stack",
  "US, UK and Canada geo",
  "Topic-level intent",
  "Suppression and exclusion lists",
];

export const services: Service[] = [
  {
    slug: "content-syndication",
    name: "Content syndication",
    navLabel: "Content syndication",
    summary:
      "Put your whitepapers, reports and webinars in front of the right roles, and get back only the downloads that match your ICP.",
    heroTitle: "Content that reaches buyers, not bots.",
    heroSub:
      "We distribute your assets to verified decision makers and deliver only engaged, consented, in-spec leads.",
    image: "/images/content-reading.jpg",
    imageAlt: "A professional reading a report on a laptop at a wooden desk",
    problemTitle: "Why most syndication programs stall",
    problems: [
      {
        title: "Downloads without intent",
        body: "Incentivised clicks and co-registration inflate volume while your SDRs chase contacts who never read a page.",
      },
      {
        title: "Stale contact data",
        body: "Titles change and people move on. Leads built on year-old records bounce, bounce again, then hurt your domain.",
      },
      {
        title: "Filters that leak",
        body: "Company size, geo and title filters get applied loosely, so a quarter of every file ends up rejected.",
      },
    ],
    steps: [
      {
        title: "Map the audience",
        body: "We turn your ICP, TAL and personas into a written targeting spec you sign off before launch.",
      },
      {
        title: "Match the asset",
        body: "Each asset gets a hosted landing page and an email and on-site placement mix tuned to the persona.",
      },
      {
        title: "Verify every record",
        body: "Engagement, consent, title, company and deliverability are checked by software, then by a person.",
      },
      {
        title: "Deliver and optimise",
        body: "Clean files land in your CRM or MAP on your cadence, with pacing and acceptance reported weekly.",
      },
    ],
    deliverables: [
      "Hosted, branded landing page per asset",
      "Custom qualifying questions (up to three)",
      "Daily or weekly lead delivery via CSV, API or direct CRM push",
      "Weekly pacing and acceptance report",
      "Free replacement of any lead outside spec",
    ],
    targeting: commonTargeting,
    guarantees: [
      { value: "100%", label: "Leads with recorded opt-in consent" },
      { value: "2-step", label: "Automated plus human verification" },
      { value: "Free", label: "Replacement for out-of-spec leads" },
    ],
    faqs: [
      {
        q: "What counts as a valid content syndication lead?",
        a: "A person who matches your written spec (geo, industry, size, title), actively engaged with your asset, gave consent to be contacted about it, and whose email and phone pass our deliverability checks at the time of delivery.",
      },
      {
        q: "Can we add custom qualifying questions?",
        a: "Yes. Most programs use up to three questions, such as project timeline or current vendor. Answers are captured on the landing page and included in the delivery file.",
      },
      {
        q: "How are leads delivered?",
        a: "By secure CSV, API, or a direct push into HubSpot, Salesforce, Marketo or Eloqua. Delivery cadence is daily or weekly, whichever suits your routing.",
      },
      {
        q: "What happens if a lead is rejected?",
        a: "Send it back with the reason within the agreed review window. If it falls outside the signed spec, we replace it at no cost.",
      },
      {
        q: "Is this compliant for UK and Canadian audiences?",
        a: "Yes. Consent language and data handling follow UK GDPR and PECR for the UK, and PIPEDA and CASL for Canada. See our Data and trust center for the detail.",
      },
    ],
    metaTitle: "B2B content syndication with verified leads",
    metaDescription:
      "Content syndication for B2B tech: consented, human-verified leads matched to your ICP across the US, UK and Canada. Free replacement for out-of-spec leads.",
  },
  {
    slug: "demand-generation",
    name: "Demand generation",
    navLabel: "Demand generation",
    summary:
      "Multi-touch programs that move accounts from first engagement to MQL, SQL or BANT-qualified conversation.",
    heroTitle: "Pipeline, not just MQLs.",
    heroSub:
      "Multi-touch nurture across email, content and phone that hands your team qualified conversations, not raw names.",
    image: "/images/demand-gen-night.jpg",
    imageAlt: "A marketer reviewing campaign results on a laptop and phone in the evening",
    problemTitle: "Where demand programs lose value",
    problems: [
      {
        title: "One-touch leads",
        body: "A single download is a weak signal. Without follow-up, most of those names never reach sales-ready.",
      },
      {
        title: "Qualification guesswork",
        body: "MQL means something different to every team. Without a shared definition, handoff turns into argument.",
      },
      {
        title: "Channels that don't talk",
        body: "Email, display and calling run as separate projects, so buyers get mixed messages and you get messy data.",
      },
    ],
    steps: [
      {
        title: "Define qualification",
        body: "We agree the exact MQL, SQL, HQL or BANT criteria with your sales team before anything launches.",
      },
      {
        title: "Engage in sequence",
        body: "Buyers see coordinated touches: content, email follow-up, retargeting and a live qualification call.",
      },
      {
        title: "Qualify by conversation",
        body: "Trained SDRs confirm budget, authority, need and timing, and record the answers verbatim.",
      },
      {
        title: "Hand off warm",
        body: "Qualified leads arrive with the conversation notes, engagement history and preferred next step.",
      },
    ],
    deliverables: [
      "MQL, SQL, HQL and BANT program tiers",
      "Multi-touch nurture across email, content and phone",
      "Call notes and qualification answers on every record",
      "Real-time delivery into your CRM",
      "Program dashboard with stage-by-stage conversion",
    ],
    targeting: commonTargeting,
    guarantees: [
      { value: "BANT", label: "Criteria agreed with your sales team" },
      { value: "Verbatim", label: "Qualification notes on every lead" },
      { value: "Weekly", label: "Optimisation reviews" },
    ],
    faqs: [
      {
        q: "What is the difference between MQL, SQL, HQL and BANT leads?",
        a: "MQLs have engaged and match your profile. HQLs (high-quality leads) add answers to custom qualifying questions. SQLs and BANT leads have been qualified in a live conversation for budget, authority, need and timeline.",
      },
      {
        q: "Who does the qualification calls?",
        a: "BootSoc's in-house SDR team. We don't subcontract calling, and every call follows a script you approve.",
      },
      {
        q: "Can you work alongside our internal SDRs?",
        a: "Yes. Many clients use us to qualify the top of the funnel and route only sales-ready conversations to their own team.",
      },
      {
        q: "How long before we see results?",
        a: "First leads usually arrive within 7 to 10 business days of spec sign-off. Conversation-qualified tiers take slightly longer to ramp.",
      },
    ],
    metaTitle: "B2B demand generation: MQL, SQL and BANT-qualified leads",
    metaDescription:
      "Multi-touch B2B demand generation with MQL, SQL, HQL and BANT-qualified lead programs, run by an in-house team for the US, UK and Canada.",
  },
  {
    slug: "account-based-marketing",
    name: "Account-based marketing",
    navLabel: "Account-based marketing",
    summary:
      "Reach the full buying committee inside your target accounts with coordinated content, display and outreach.",
    heroTitle: "Win the whole buying committee.",
    heroSub:
      "Coordinated content, display and outreach that engages every stakeholder inside the accounts you actually want.",
    image: "/images/abm-strategy.jpg",
    imageAlt: "A strategy session with a presenter at a whiteboard and a team on laptops",
    problemTitle: "Why ABM programs under-deliver",
    problems: [
      {
        title: "One contact per account",
        body: "Enterprise deals involve six to ten people. Reaching only the champion leaves the rest of the committee unconvinced.",
      },
      {
        title: "Lists without signals",
        body: "Static account lists ignore who is actually researching right now, so budget goes to accounts that aren't ready.",
      },
      {
        title: "No account-level view",
        body: "Lead-level reporting hides whether an account is heating up, so sales can't prioritise.",
      },
    ],
    steps: [
      {
        title: "Tier the accounts",
        body: "We score your target list with firmographic fit and live intent, then split it into one-to-one, one-to-few and one-to-many tiers.",
      },
      {
        title: "Map the committee",
        body: "For each account we identify the roles that influence the deal: economic buyer, champion, technical evaluator and users.",
      },
      {
        title: "Orchestrate touches",
        body: "Personalised content, BootSoc Reach display and SDR outreach run in sequence against the same accounts.",
      },
      {
        title: "Report by account",
        body: "You see engagement per account and per role, plus which accounts are ready for sales.",
      },
    ],
    deliverables: [
      "Account tiering with fit and intent scores",
      "Buying-committee contact maps per account",
      "Persona-specific content and landing pages",
      "Account-level engagement dashboard",
      "Sales-ready account alerts",
    ],
    targeting: [
      "Named account lists up to 10,000",
      "Buying-committee roles per account",
      "Account-level intent surges",
      "Technographics and competitor installs",
      "Opportunity-stage suppression",
      "US, UK and Canada geo",
    ],
    guarantees: [
      { value: "6+", label: "Roles mapped per priority account" },
      { value: "Live", label: "Intent refresh on every account" },
      { value: "Account", label: "Level reporting, not just leads" },
    ],
    faqs: [
      {
        q: "How many target accounts can you work with?",
        a: "Programs range from 50 strategic accounts to lists of 10,000. We recommend tiering larger lists so the most valuable accounts get the most personal treatment.",
      },
      {
        q: "Can you integrate with our ABM platform?",
        a: "Yes. We regularly sync account lists and engagement with 6sense, Demandbase, Terminus and HubSpot ABM, and deliver into Salesforce.",
      },
      {
        q: "Do you create the personalised content?",
        a: "We can. Our content team produces persona-specific landing pages, emails and short-form assets, or we can run your existing library.",
      },
      {
        q: "How do you measure ABM success?",
        a: "Account engagement, committee coverage, meetings set and pipeline influenced. We report by account and by role so you can see momentum, not just lead counts.",
      },
    ],
    metaTitle: "Account-based marketing (ABM) for B2B tech",
    metaDescription:
      "ABM programs that reach the full buying committee with intent-scored account tiers, personalised content, display and SDR outreach.",
  },
  {
    slug: "intent-data",
    name: "Intent data",
    product: "BootSoc Signal",
    navLabel: "BootSoc Signal",
    summary:
      "BootSoc Signal spots accounts actively researching your category and turns that research into prioritised, reachable contacts.",
    heroTitle: "Know who is researching before they call anyone.",
    heroSub:
      "BootSoc Signal surfaces accounts showing active research on your topics, then maps the people you can reach.",
    image: "/images/intent-analytics.jpg",
    imageAlt: "An analytics dashboard showing engagement charts on a laptop screen",
    problemTitle: "What goes wrong with intent data",
    problems: [
      {
        title: "Signal without people",
        body: "Knowing an account is surging doesn't help if you can't reach the people doing the research.",
      },
      {
        title: "Noisy topics",
        body: "Broad topic taxonomies flag every company that reads the news. Your team ends up chasing curiosity, not buying intent.",
      },
      {
        title: "Data that sits in a spreadsheet",
        body: "Weekly exports nobody acts on. Intent only matters when it changes what sales and marketing do next.",
      },
    ],
    steps: [
      {
        title: "Choose your topics",
        body: "We build a topic set from your category, competitors and use cases, and tune it to cut noise.",
      },
      {
        title: "Detect the surge",
        body: "Signal compares each account's research on those topics against its own baseline, and flags real spikes.",
      },
      {
        title: "Find the people",
        body: "For surging accounts, we identify reachable contacts in the roles that match your buying committee.",
      },
      {
        title: "Activate",
        body: "Surging accounts feed straight into syndication, ABM, BootSoc Reach display or your own SDR queue.",
      },
    ],
    deliverables: [
      "Custom topic set built around your category",
      "Weekly account surge report with scores",
      "Contact mapping for surging accounts",
      "Direct feeds into CRM, MAP or ABM platform",
      "Activation through BootSoc programs or your team",
    ],
    targeting: [
      "Custom topic clusters",
      "Competitor and alternative research",
      "Account surge thresholds",
      "Firmographic and technographic filters",
      "Buying-committee roles",
      "US, UK and Canada geo",
    ],
    guarantees: [
      { value: "Weekly", label: "Surge refresh on every tracked account" },
      { value: "First-party", label: "Engagement from the IntentBuy network" },
      { value: "Activated", label: "Signals routed into live programs" },
    ],
    faqs: [
      {
        q: "Where does BootSoc Signal intent data come from?",
        a: "From first-party engagement on our owned publisher, IntentBuy, and from BootSoc program engagement, combined with vetted third-party research signals. We don't buy or sell personal data from data brokers for intent scoring.",
      },
      {
        q: "Is intent data identifying individual people?",
        a: "Surge scoring works at the account level. Individual contacts are only added when they have a lawful basis for outreach, and all outreach follows our Email and outreach policy.",
      },
      {
        q: "How is Signal different from Bombora or G2 intent?",
        a: "Signal is built to be activated. Instead of a report, surging accounts flow directly into content syndication, ABM and display programs we run for you. It also works alongside those providers if you already license them.",
      },
      {
        q: "Can we use Signal without other BootSoc programs?",
        a: "Yes. Signal can be delivered as a weekly feed into your CRM or ABM platform for your own teams to action.",
      },
    ],
    metaTitle: "BootSoc Signal: B2B intent data you can act on",
    metaDescription:
      "BootSoc Signal identifies accounts actively researching your category, maps reachable buying-committee contacts and routes them into live programs.",
  },
  {
    slug: "programmatic-display",
    name: "Programmatic and ABM display",
    product: "BootSoc Reach",
    navLabel: "BootSoc Reach",
    summary:
      "BootSoc Reach serves display and native ads only to target accounts and roles, synced with your other programs.",
    heroTitle: "Ads that only your accounts see.",
    heroSub:
      "BootSoc Reach targets display and native ads by company, title and intent, so budget stays on buyers who matter.",
    image: "/images/programmatic-city.jpg",
    imageAlt: "An office tower at night with lit windows across many floors",
    problemTitle: "Where display budget disappears",
    problems: [
      {
        title: "Wasted impressions",
        body: "Broad audience segments serve most impressions to people who will never buy, while your target accounts see nothing.",
      },
      {
        title: "Disconnected creative",
        body: "Ads that ignore where a buyer is in their research get scrolled past, however well they're designed.",
      },
      {
        title: "Clicks, not accounts",
        body: "CTR tells you little. You need to know which accounts engaged and whether they progressed.",
      },
    ],
    steps: [
      {
        title: "Load the accounts",
        body: "Your target list and Signal surges become the audience. Titles and seniority narrow it further.",
      },
      {
        title: "Match creative to stage",
        body: "We rotate creative by stage and persona, from category education to proof and conversion.",
      },
      {
        title: "Serve across quality inventory",
        body: "Ads run on brand-safe display, native and CTV inventory, plus the IntentBuy network.",
      },
      {
        title: "Report by account",
        body: "See impressions, engagement and site visits per account, and hand warm accounts to sales.",
      },
    ],
    deliverables: [
      "Account and title-level ad targeting",
      "Creative production and rotation by stage",
      "Brand-safe display, native and CTV inventory",
      "Account-level engagement and visit reporting",
      "Sync with ABM and syndication programs",
    ],
    targeting: [
      "Named accounts",
      "Job title and seniority",
      "Signal intent surges",
      "Industry and company size",
      "Retargeting of program engagers",
      "US, UK and Canada geo",
    ],
    guarantees: [
      { value: "Account", label: "Level delivery reporting" },
      { value: "Brand-safe", label: "Curated inventory only" },
      { value: "Synced", label: "With your other BootSoc programs" },
    ],
    faqs: [
      {
        q: "What ad formats does BootSoc Reach support?",
        a: "Standard IAB display sizes, native, video and connected TV. We also run placements on the IntentBuy publisher network.",
      },
      {
        q: "Do you produce the creative?",
        a: "Yes, our design team produces and rotates creative sets by persona and funnel stage. You can also supply your own.",
      },
      {
        q: "How does Reach respect privacy choices?",
        a: "Targeting relies on account-level and contextual signals. We honour opt-outs and Global Privacy Control, and don't use sensitive categories of data.",
      },
      {
        q: "What budget do we need?",
        a: "Most programs start from a modest monthly media budget per region. We size it to your account list during planning so the frequency is meaningful.",
      },
    ],
    metaTitle: "BootSoc Reach: account-based programmatic display",
    metaDescription:
      "Account-based programmatic display, native and CTV for B2B. Target by company, title and intent with account-level reporting.",
  },
  {
    slug: "event-registration",
    name: "Event and webinar registration",
    navLabel: "Event registration",
    summary:
      "Fill webinars, virtual events and field events with the right attendees, and get more of them to show up.",
    heroTitle: "Full rooms. The right people in them.",
    heroSub:
      "We drive registrations from your ICP and run reminder sequences that lift live attendance.",
    image: "/images/events-conference.jpg",
    imageAlt: "A large conference hall with an audience facing a speaker on stage",
    problemTitle: "Why events disappoint",
    problems: [
      {
        title: "Registrations that never attend",
        body: "Show-up rates for B2B webinars often sit well under half. Every no-show is budget you already spent.",
      },
      {
        title: "The wrong audience",
        body: "Students, vendors and competitors fill seats that should belong to buyers.",
      },
      {
        title: "No follow-through",
        body: "Attendee lists sit untouched after the event, while interest fades.",
      },
    ],
    steps: [
      {
        title: "Qualify the invite list",
        body: "We invite only contacts who match your attendee profile, and screen every registrant.",
      },
      {
        title: "Drive registrations",
        body: "Email, display and phone outreach push registrations towards your target number.",
      },
      {
        title: "Lift attendance",
        body: "Reminder emails, calendar holds and a pre-event call raise live attendance.",
      },
      {
        title: "Follow up fast",
        body: "Attendee and no-show lists land in your CRM with engagement data within 24 hours.",
      },
    ],
    deliverables: [
      "Screened registrant list against your profile",
      "Multi-channel promotion plan",
      "Reminder and confirmation sequences",
      "Post-event attendee and no-show files",
      "Optional follow-up qualification calls",
    ],
    targeting: commonTargeting,
    guarantees: [
      { value: "Screened", label: "Every registrant checked against spec" },
      { value: "24h", label: "Post-event file delivery" },
      { value: "Replace", label: "Out-of-spec registrants" },
    ],
    faqs: [
      {
        q: "Which event types do you support?",
        a: "Webinars, virtual summits, executive roundtables, trade-show meetings and in-person field events across the US, UK and Canada.",
      },
      {
        q: "Do you guarantee attendance?",
        a: "We guarantee registrations to spec and run proven show-up programs. Attendance-based pricing is available for some formats.",
      },
      {
        q: "Can you work with our event platform?",
        a: "Yes. We register people directly into ON24, Zoom Events, Goldcast, Hopin, Cvent and most other platforms.",
      },
    ],
    metaTitle: "B2B event and webinar registration",
    metaDescription:
      "Drive qualified registrations for B2B webinars and events across the US, UK and Canada, with screening, reminders and fast follow-up.",
  },
  {
    slug: "appointment-setting",
    name: "Appointment setting",
    navLabel: "Appointment setting",
    summary:
      "Qualified sales meetings booked straight into your reps' calendars by our in-house SDR team.",
    heroTitle: "Meetings on the calendar, not maybes.",
    heroSub:
      "In-house SDRs qualify interest and book first meetings with decision makers directly into your reps' calendars.",
    image: "/images/appointment-setting.jpg",
    imageAlt: "A sales development representative wearing a headset at her desk",
    problemTitle: "Why outbound meetings fall through",
    problems: [
      {
        title: "No-show meetings",
        body: "Meetings booked on thin interest vanish from the calendar, or turn into polite brush-offs.",
      },
      {
        title: "Ramp time",
        body: "Hiring and training SDRs takes months before the first qualified meeting appears.",
      },
      {
        title: "Off-brand outreach",
        body: "Scripts that don't sound like you damage the reputation you're trying to build.",
      },
    ],
    steps: [
      {
        title: "Build the playbook",
        body: "We write the messaging, objection handling and qualification criteria with your team.",
      },
      {
        title: "Warm the account",
        body: "Signal intent and program engagement tell our SDRs who to call first and what to talk about.",
      },
      {
        title: "Qualify and book",
        body: "SDRs confirm fit and need, then book directly into your reps' calendars with context attached.",
      },
      {
        title: "Confirm and hand off",
        body: "Confirmation and reminder touches keep show rates high, and reps receive a full briefing note.",
      },
    ],
    deliverables: [
      "Dedicated, in-house SDR pod",
      "Custom playbook and call scripts",
      "Meetings booked straight into rep calendars",
      "Briefing note for every meeting",
      "Weekly call recordings review",
    ],
    targeting: commonTargeting,
    guarantees: [
      { value: "In-house", label: "SDRs, never outsourced" },
      { value: "Briefed", label: "Context note with every meeting" },
      { value: "Replace", label: "Meetings that don't meet criteria" },
    ],
    faqs: [
      {
        q: "Do your SDRs call under our brand?",
        a: "Yes. Our SDRs represent your company using a script and messaging you approve. Calls comply with TCPA, the UK TPS and CTPS rules, and Canada's DNCL.",
      },
      {
        q: "How do you define a qualified meeting?",
        a: "We agree the criteria up front, typically role, company fit, a confirmed need and a timeframe. Meetings that don't meet the criteria are replaced.",
      },
      {
        q: "Can we listen to calls?",
        a: "Yes. With consent captured on the call, recordings are available for weekly quality reviews.",
      },
    ],
    metaTitle: "B2B appointment setting with in-house SDRs",
    metaDescription:
      "Qualified B2B sales meetings booked into your reps' calendars by BootSoc's in-house SDR team, across the US, UK and Canada.",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
