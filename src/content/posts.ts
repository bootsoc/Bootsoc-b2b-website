import type { PostSummary } from "@/sanity/queries";
import { guidePosts } from "@/content/guides";

export type LocalBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "quote"; text: string };

/** `seoTitle` is the shorter <title> (the " | BootSoc" suffix is added by the layout); `title` stays the visible H1. */
export type SeedPost = PostSummary & {
  localBody: LocalBlock[];
  seoTitle?: string;
  seoDescription?: string;
  /** Solution slugs this article supports; drives "Further reading" on /solutions/[slug]. */
  solutions?: string[];
};

/** Starter articles shown until (and alongside) content published in Sanity. */
const starterPosts: SeedPost[] = [
  {
    slug: "what-makes-a-b2b-lead-verified",
    title: "What makes a B2B lead verified? A buyer's checklist",
    seoTitle: "What makes a B2B lead verified?",
    solutions: ["content-syndication", "demand-generation", "appointment-setting"],
    excerpt:
      "Every vendor says their leads are verified. Here are the six questions that separate a checked record from a guessed one.",
    category: "Guide",
    publishedAt: "2026-09-18T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/process-desk.jpg",
    coverAlt: "An analyst reviewing records on a laptop",
    localBody: [
      {
        type: "p",
        text: "“Verified” is the most overused word in B2B lead generation. Some vendors mean an email address didn't bounce last month. Others mean a person filled in a form. Neither tells you whether the lead is a real buyer who wants to hear from you. Before you sign a lead program, ask these six questions.",
      },
      { type: "h2", text: "1. Can you show me the consent record?" },
      {
        type: "p",
        text: "A verified lead should arrive with evidence: the consent wording the person saw, the page it was captured on and a timestamp. If a vendor can't produce that on request, you're carrying the compliance risk for them, especially for contacts in the UK and Canada.",
      },
      { type: "h2", text: "2. How do you confirm engagement?" },
      {
        type: "p",
        text: "Form fills can be automated. Ask how the vendor separates people who actually read your asset from bots, click farms and incentivised downloads. Good answers mention time on page, scroll depth, device and network patterns, and a human review of anything that looks too perfect.",
      },
      { type: "h2", text: "3. Who checks the title and company?" },
      {
        type: "p",
        text: "People change jobs constantly, so a record that was right last year may be wrong today. Ask whether titles and companies are checked against live professional profiles at the time of delivery, and whether a person does that check or only a database lookup.",
      },
      { type: "h2", text: "4. How strictly are my filters applied?" },
      {
        type: "p",
        text: "Your spec might say 1,000+ employees, IT director and above, US only. Ask what happens to a lead from a 900-person company or a senior manager. A strict vendor rejects it before delivery. A loose one sends it and hopes you don't notice.",
      },
      { type: "h2", text: "5. What's the deliverability standard?" },
      {
        type: "ul",
        items: [
          "Mailbox-level email verification at the time of delivery, not at the time of collection",
          "Catch-all domains flagged rather than passed as valid",
          "Phone numbers validated for format and line type where calling is part of the program",
        ],
      },
      { type: "h2", text: "6. What happens when a lead is wrong?" },
      {
        type: "p",
        text: "Mistakes happen. What matters is the replacement policy. Look for a written review window, clear rejection reasons tied to your signed spec, and free replacement for anything that falls outside it.",
      },
      {
        type: "quote",
        text: "A verified lead is one you could defend to your sales team, your legal team and the person themselves.",
      },
      {
        type: "p",
        text: "At BootSoc every lead passes five checks before delivery: consent, engagement, identity and role, company fit and deliverability. Software handles the first pass and a person reviews every record. If you'd like to see what that looks like on a file built to your spec, ask us for a sample.",
      },
    ],
  },
  {
    slug: "b2b-email-rules-us-uk-canada",
    title: "CAN-SPAM, CASL and PECR: B2B email rules for the US, UK and Canada",
    seoTitle: "B2B email rules: CAN-SPAM, CASL and PECR",
    solutions: ["content-syndication", "demand-generation", "event-registration"],
    seoDescription:
      "One campaign, three very different laws. A plain-English guide to what CAN-SPAM, CASL and PECR require before you send B2B email in the US, Canada and UK.",
    excerpt:
      "One campaign, three very different laws. A plain-English guide to what each market requires before you hit send.",
    category: "Compliance",
    publishedAt: "2026-09-10T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/demand-gen-night.jpg",
    coverAlt: "A marketer reviewing an email campaign on a laptop and phone",
    localBody: [
      {
        type: "p",
        text: "If your campaigns reach buyers in the US, UK and Canada, you're working under three different rulebooks. The good news is that one well-designed process can satisfy all of them. This guide summarises the essentials. It isn't legal advice, so check your specific program with counsel.",
      },
      { type: "h2", text: "United States: CAN-SPAM" },
      {
        type: "p",
        text: "CAN-SPAM applies to commercial email, including business-to-business messages. It doesn't require prior consent, but it sets firm rules for every message:",
      },
      {
        type: "ul",
        items: [
          "Accurate header information and a subject line that isn't misleading",
          "A valid physical postal address for the sender",
          "A clear way to opt out, honored within 10 business days",
          "Responsibility for what vendors send on your behalf",
        ],
      },
      {
        type: "p",
        text: "Penalties can exceed $50,000 per violating email. State privacy laws add another layer: many now cover business contact data and give people the right to opt out of the sale or sharing of their information.",
      },
      { type: "h2", text: "Canada: CASL" },
      {
        type: "p",
        text: "Canada's Anti-Spam Legislation is stricter. You need consent before sending a commercial electronic message. Consent can be express (the person opted in) or implied in specific situations, such as an existing business relationship or a business address that was conspicuously published without a “no unsolicited messages” statement, where your message is relevant to the person's role.",
      },
      {
        type: "ul",
        items: [
          "Identify the sender and include contact information",
          "Include an unsubscribe mechanism that works for at least 60 days after sending",
          "Process unsubscribes within 10 business days",
          "Keep records that prove consent",
        ],
      },
      {
        type: "p",
        text: "Penalties reach up to CA$10 million per violation for organisations. In Quebec, Law 25 adds requirements around tracking technologies and a named person responsible for personal information.",
      },
      { type: "h2", text: "United Kingdom: PECR and UK GDPR" },
      {
        type: "p",
        text: "Under PECR, you can email corporate subscribers (limited companies, LLPs and government bodies) without prior consent, as long as you identify yourself and offer a simple opt-out in every message. Sole traders and some partnerships count as individual subscribers, so they need consent or a valid soft opt-in.",
      },
      {
        type: "p",
        text: "Named business emails are still personal data under UK GDPR, so you need a lawful basis, usually legitimate interests backed by a documented assessment. The Data (Use and Access) Act 2025 raised maximum PECR fines to match UK GDPR levels, so the stakes are now much higher.",
      },
      { type: "h2", text: "One process that works everywhere" },
      {
        type: "ul",
        items: [
          "Record consent or lawful basis per contact, with source and timestamp",
          "Identify the sender and include a postal address in every message",
          "Offer one-click unsubscribe and sync it to a global suppression list",
          "Honor opt-outs within 10 business days at the latest",
          "Treat Canadian and UK sole-trader contacts as opt-in only unless an exemption clearly applies",
        ],
      },
      {
        type: "p",
        text: "Our Email and outreach policy explains exactly how BootSoc applies these rules to the programs we run for clients.",
      },
    ],
  },
  {
    slug: "intent-data-without-the-noise",
    title: "Intent data without the noise: turning surges into pipeline",
    seoTitle: "Intent data without the noise",
    solutions: ["intent-data", "account-based-marketing", "programmatic-display"],
    seoDescription:
      "Most intent programs fail at activation, not detection. A practical playbook for turning account-level intent signals into meetings and pipeline.",
    excerpt: "Most intent programs fail at activation, not detection. A practical playbook for acting on account-level signals.",
    category: "Playbook",
    publishedAt: "2026-08-28T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/intent-analytics.jpg",
    coverAlt: "An analytics dashboard with engagement charts",
    localBody: [
      {
        type: "p",
        text: "Intent data promises to tell you which accounts are researching your category right now. In practice, many teams end up with a weekly spreadsheet of surging accounts that nobody acts on. The problem is rarely the signal. It's what happens next.",
      },
      { type: "h2", text: "Start with fewer, sharper topics" },
      {
        type: "p",
        text: "Broad topics like “cloud computing” flag half the market. Build a small set around your specific use cases, the problems you solve and the competitors you replace. Ten precise topics beat a hundred vague ones.",
      },
      { type: "h2", text: "Compare accounts to themselves" },
      {
        type: "p",
        text: "A large enterprise always produces more research activity than a mid-market company. Useful surge scoring compares each account's current activity to its own baseline, so you catch real change instead of just size.",
      },
      { type: "h2", text: "Map the people, not just the account" },
      {
        type: "p",
        text: "An account-level surge is only actionable if you can reach the buying committee. For each surging account, identify the roles that matter (economic buyer, champion, technical evaluator) and confirm you have a lawful way to contact them.",
      },
      { type: "h2", text: "Decide the play before the signal arrives" },
      {
        type: "ul",
        items: [
          "Early-stage surge: educational content through syndication and display",
          "Competitor research: comparison content and proof points",
          "Sustained, multi-topic surge: SDR outreach and ABM personalisation",
          "Surge from an open opportunity: alert the account owner the same day",
        ],
      },
      { type: "h2", text: "Measure what the signal changed" },
      {
        type: "p",
        text: "Track engagement, meetings and pipeline for surging accounts against a control group of similar accounts that weren't surging. If intent isn't changing outcomes, adjust the topics or the plays, not just the thresholds.",
      },
      {
        type: "p",
        text: "BootSoc Signal combines first-party engagement from our publication, IntentBuy, with vetted third-party research signals, and routes surging accounts straight into live programs so nothing sits in a spreadsheet.",
      },
    ],
  },
];

export const seedPosts: SeedPost[] = [...guidePosts, ...starterPosts];
