import type { SeedPost } from "@/content/posts";

/**
 * Long-form guides (October 2026). Each one lists the solution pages it supports in `solutions`, which drives the
 * "Further reading" links on /solutions/[slug]. Keep claims general and sourced from public rules; nothing here is
 * legal advice, and no statistics are invented.
 */
export const guidePosts: SeedPost[] = [
  {
    slug: "first-party-vs-third-party-intent-data",
    title: "First-party vs third-party intent data: what's different and when to use each",
    seoTitle: "First-party vs third-party intent data",
    seoDescription:
      "How first-, second- and third-party intent data differ in source, accuracy and coverage, and how B2B teams combine them to find accounts that are buying now.",
    excerpt:
      "Not all intent signals are equal. Where the data comes from decides how far you can trust it and what you should do with it.",
    category: "Guide",
    publishedAt: "2026-10-03T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/intent-analytics.jpg",
    coverAlt: "Analytics dashboards showing account-level research activity",
    solutions: ["intent-data", "account-based-marketing", "demand-generation"],
    localBody: [
      {
        type: "p",
        text: "Intent data is any signal that suggests a company is researching a problem you solve. That definition is broad on purpose, because the signals come from very different places. Some come from your own website. Some come from a publisher whose readers you can see. Some are pooled from thousands of sites you will never see. Each source has a different level of accuracy, a different reach and a different set of rules about how you can use it. Treating them as one number in a dashboard is how intent programs end up with long lists of “surging” accounts that sales ignores.",
      },
      {
        type: "p",
        text: "This guide explains the three main types, where each one is strong and weak, and how to combine them into something your team can act on.",
      },
      { type: "h2", text: "First-party intent: what happens on your own properties" },
      {
        type: "p",
        text: "First-party intent is behaviour you observe directly: visits to your pricing page, repeat sessions from the same company, webinar attendance, demo requests, product sign-ups, replies to your emails and conversations with your sales team. You collect it, you control it and you can see exactly what the person or account did.",
      },
      {
        type: "p",
        text: "Its biggest strength is accuracy. A company that read your pricing page three times this week is telling you something specific about your product, not just your category. Its biggest weakness is reach. First-party data only covers people who already found you, which in most markets is a small share of the accounts that will buy this year. It also arrives late: by the time a buyer visits your site, they have often done most of their research elsewhere.",
      },
      {
        type: "ul",
        items: [
          "Best for: prioritising accounts already in your pipeline, routing hot accounts to sales, and timing follow-up.",
          "Watch for: anonymous traffic that is hard to resolve to an account, and internal or partner visits that inflate scores.",
          "Rules: you still need a privacy notice and, in the UK, EU and Quebec, consent before setting analytics or advertising cookies.",
        ],
      },
      { type: "h2", text: "Second-party intent: a partner's first-party data" },
      {
        type: "p",
        text: "Second-party intent is another organisation's first-party data, shared with you directly. The most common source in B2B is a publisher: a trade site, a research community or a review platform that sees which companies are reading about which topics. Because the publisher owns the audience, it can tell you what content was consumed, how deeply and, when a reader opts in, who they are.",
      },
      {
        type: "p",
        text: "Second-party data sits between the other two types. It covers more of the market than your own site, and it is usually more transparent than pooled third-party data because you know the source. The trade-off is that its coverage is limited to that publisher's audience, so its value depends on whether those readers match your buyers.",
      },
      {
        type: "p",
        text: "This is the model behind BootSoc Signal. IntentBuy, our technology publication, records first-party engagement with articles about AI, cybersecurity, hardware and policy. That engagement is combined with other signals to spot accounts researching a category, and readers who choose to download content become contacts that can be delivered with a consent record.",
      },
      { type: "h2", text: "Third-party intent: signals pooled across many sites" },
      {
        type: "p",
        text: "Third-party intent is collected by a data provider across a large network of websites, then aggregated by company and topic. Common sources include publisher co-operatives that share content consumption data, review and comparison sites, and in some cases advertising bid-stream data. The provider typically reports a “surge” when an account consumes more content on a topic than its normal baseline.",
      },
      {
        type: "p",
        text: "Its strength is coverage. A third-party feed can flag accounts that have never touched your site, which is exactly where new pipeline comes from. Its weaknesses are precision and transparency. You usually can't see which pages were read or by whom, topics are broad, and the account match depends on resolving IP addresses and cookies to companies, which is harder with remote work and stricter browser privacy controls.",
      },
      {
        type: "ul",
        items: [
          "Best for: finding accounts entering a category before they reach you, and weighting target account lists.",
          "Watch for: generic topics that every company in a sector surges on, and small companies that rarely show up at all.",
          "Rules: ask the provider how consent and notice are handled at the source, and whether any personal data is included.",
        ],
      },
      { type: "h2", text: "How the three types compare" },
      {
        type: "ul",
        items: [
          "Source: first-party is your own properties; second-party is a named partner's properties; third-party is a network of sites you usually can't see.",
          "Accuracy: highest for first-party, high to medium for second-party, medium to low for third-party at the individual account level.",
          "Coverage: smallest for first-party, medium for second-party, largest for third-party.",
          "Timing: first-party tends to arrive late in the journey, third-party earliest, second-party in between.",
          "Transparency: you can audit first-party fully, second-party partly, third-party least.",
        ],
      },
      { type: "h2", text: "When to use each" },
      {
        type: "p",
        text: "The right mix depends on what you are trying to do. If your problem is that sales doesn't know which existing opportunities are heating up, start with first-party data and better routing. You probably don't need a new data source yet. If your problem is that the same few hundred accounts keep appearing in every campaign and you need new ones, third-party and second-party signals are where the new names come from.",
      },
      {
        type: "p",
        text: "For account-based programs, use third-party signals to tier a broad target list, second-party engagement to confirm which accounts are genuinely researching, and first-party behaviour to decide when sales should call. For demand generation, use second-party content engagement to reach the people inside surging accounts, because a signal without a reachable contact doesn't create pipeline on its own.",
      },
      { type: "h2", text: "Combining signals without drowning in them" },
      {
        type: "p",
        text: "The most common failure is not bad data. It is a program with no agreed action for each signal. Before switching anything on, write down what happens when a signal arrives. A useful rule of thumb is that every signal should change either who you contact, what you say or when you say it.",
      },
      {
        type: "ul",
        items: [
          "Score accounts, not just individuals. Buying decisions in B2B involve several people, so one engaged reader matters less than three people from the same company reading related topics.",
          "Weight sources differently. A pricing-page visit should outrank a broad topic surge from a third-party feed.",
          "Decay old signals. Interest from last quarter is weak evidence of a purchase this quarter.",
          "Agree thresholds with sales. If sales won't act on a score below a certain level, don't send those accounts as hot.",
          "Close the loop. Feed opportunity and win data back so you can see which signals actually predicted pipeline.",
        ],
      },
      { type: "h2", text: "Questions to ask any intent data provider" },
      {
        type: "ul",
        items: [
          "Where exactly does the data come from, and can you name the sources or the type of sites involved?",
          "How do you resolve activity to a company, and how do you handle remote workers and shared networks?",
          "How is a surge defined, and what baseline is it measured against?",
          "Does the data include any personal information, and what notice or consent applied when it was collected?",
          "How often is it refreshed, and how quickly does a signal reach our systems?",
          "Can we test it against our own closed-won accounts before we sign?",
        ],
      },
      {
        type: "quote",
        text: "Intent data is evidence, not a verdict. The more you know about where it came from, the more weight you can give it.",
      },
      {
        type: "p",
        text: "First-party data tells you who is close to buying from you. Third-party data tells you who might be starting to look. Second-party data from a publisher you can name often fills the gap between them, with real content engagement and contacts you can reach lawfully. Used together, with clear actions agreed in advance, they turn a noisy feed into a short list your sales team will trust.",
      },
      {
        type: "p",
        text: "If you want to see which accounts are researching your category right now, BootSoc Signal combines IntentBuy engagement with other signals and routes reachable contacts into live programs. Our audience estimator gives a first view of how many are in market.",
      },
    ],
  },
  {
    slug: "bant-vs-mql-vs-sql",
    title: "BANT vs MQL vs SQL: how to define a qualified lead",
    seoTitle: "BANT vs MQL vs SQL: defining a qualified lead",
    seoDescription:
      "What BANT, MQL, SAL and SQL actually mean, where each one breaks, and how to write a qualified-lead definition that marketing, sales and your lead vendor share.",
    excerpt:
      "Most arguments between marketing and sales are really arguments about definitions. Here's how to write one everybody signs.",
    category: "Guide",
    publishedAt: "2026-10-03T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/team-collab.jpg",
    coverAlt: "A marketing and sales team reviewing a pipeline together",
    solutions: ["demand-generation", "appointment-setting", "content-syndication"],
    localBody: [
      {
        type: "p",
        text: "Ask five people in a B2B company what a qualified lead is and you'll get five answers. Marketing counts form fills. Sales counts conversations with budget. Finance counts pipeline. Your lead vendor counts whatever the contract says. None of them is wrong, but if the definitions aren't written down and agreed, every report becomes an argument and every vendor becomes a disappointment.",
      },
      {
        type: "p",
        text: "This guide explains the common labels, BANT, MQL, SAL and SQL, what each one is good for and where it breaks, and then walks through how to write a definition that marketing, sales and any outside partner can all use.",
      },
      { type: "h2", text: "BANT: budget, authority, need, timeline" },
      {
        type: "p",
        text: "BANT is a sales qualification checklist popularised by IBM. A lead qualifies when the buyer has budget for a solution, the person has authority to buy or influence the purchase, there is a real need your product meets, and there is a timeline for making a decision.",
      },
      {
        type: "p",
        text: "BANT is simple, which is why it has lasted. It works well for transactional sales and for outbound programs where an SDR needs a quick way to decide whether a call is worth a meeting. It struggles in complex B2B sales. Budgets are often created after a need is agreed, not before. Authority is spread across a buying committee rather than held by one person. And many buyers won't share their timeline with a vendor they've just met.",
      },
      {
        type: "p",
        text: "Treat BANT as a set of questions to answer over time, not a gate every lead must pass on the first call. A program that only accepts leads with confirmed budget will be small and slow. A program that never asks about budget will fill the pipeline with research projects.",
      },
      { type: "h2", text: "MQL: marketing qualified lead" },
      {
        type: "p",
        text: "An MQL is a lead that marketing believes is ready for sales attention, usually based on fit and engagement. Fit covers who the person and company are: industry, size, region, role and seniority. Engagement covers what they did: downloads, event attendance, repeat visits, replies. Most teams combine the two in a lead score and set a threshold.",
      },
      {
        type: "p",
        text: "MQLs are useful because they let marketing hand over leads consistently and measure the quality of what it sends. They become a problem when the threshold is set to hit a volume target rather than to predict revenue. If downloading two whitepapers makes someone an MQL, you will produce plenty of MQLs and very few meetings.",
      },
      { type: "h2", text: "SAL: sales accepted lead" },
      {
        type: "p",
        text: "A sales accepted lead is an MQL that sales has reviewed and agreed to work. The SAL stage is often skipped, which is a mistake, because it is where marketing finds out whether its definition matches what sales actually needs. A low acceptance rate is the clearest early warning that the MQL definition, the targeting or the vendor is off.",
      },
      { type: "h2", text: "SQL: sales qualified lead" },
      {
        type: "p",
        text: "An SQL is a lead that sales has spoken to and confirmed as a real opportunity worth pursuing. In many companies this is the point where an opportunity is created in the CRM. The criteria are usually some version of BANT or a richer framework, plus a clear next step agreed with the buyer.",
      },
      {
        type: "p",
        text: "SQLs are the stage most closely tied to revenue, which is why finance and leadership care about them. The risk is that they're only counted by sales, so marketing has little visibility into why leads did or didn't convert. Shared reporting from MQL through SAL to SQL fixes that.",
      },
      { type: "h2", text: "Other frameworks you will hear about" },
      {
        type: "ul",
        items: [
          "CHAMP: challenges, authority, money, prioritisation. It puts the buyer's problem first, which suits consultative sales.",
          "MEDDIC and MEDDPICC: metrics, economic buyer, decision criteria, decision process, identified pain and champion, with paper process and competition in the longer version. Built for complex enterprise deals.",
          "GPCTBA/C&I: goals, plans, challenges, timeline, budget, authority, plus consequences and implications. Useful when the purchase is driven by a strategic initiative.",
        ],
      },
      {
        type: "p",
        text: "You don't need to pick one framework for the whole funnel. Many teams use fit and engagement for MQLs, a few BANT-style questions for SQLs, and MEDDIC for larger opportunities once they are in the pipeline.",
      },
      { type: "h2", text: "How to write a definition everybody signs" },
      {
        type: "p",
        text: "A good definition is specific enough that two people looking at the same lead would make the same call. Write it as a short document with four parts, and get it signed by the heads of marketing and sales.",
      },
      {
        type: "ul",
        items: [
          "Fit: the industries, company sizes, regions, roles and seniority you sell to, plus exclusions such as current customers, competitors, students and job seekers.",
          "Engagement: the actions that show genuine interest, ranked by strength. A demo request outranks a webinar registration, which outranks a single download.",
          "Qualification questions: the answers you need before a lead counts as an SQL, and which of them are required versus nice to have.",
          "Hand-off: who receives the lead, how fast they must follow up, how they record the outcome and what happens to leads they reject.",
        ],
      },
      { type: "h2", text: "Turn the definition into a service-level agreement" },
      {
        type: "p",
        text: "Definitions only work if both sides keep their side of the deal. A simple SLA says marketing will deliver a certain number of leads that meet the definition each month, and sales will follow up on each one within an agreed time and record the result. Review it monthly with real numbers: how many leads were sent, how many were accepted, how many became SQLs and how many became pipeline.",
      },
      { type: "h2", text: "Use the same definition with outside vendors" },
      {
        type: "p",
        text: "If you buy leads through content syndication, appointment setting or another program, give the vendor the same written spec your team uses. Ask them to confirm each filter, to supply the answers to any qualifying questions with every lead, and to replace any lead that falls outside the spec. A vendor that will only work to a looser definition than your own is telling you something about the quality to expect.",
      },
      {
        type: "p",
        text: "For appointment setting, agree the qualification questions the SDR must ask, what counts as an attended meeting, and how no-shows and unqualified meetings are handled. For content syndication, agree how many custom qualifying questions are included and how answers are captured and delivered.",
      },
      { type: "h2", text: "A worked example" },
      {
        type: "p",
        text: "Imagine a company selling security software to mid-sized firms. Its written definition might say: fit means a US or UK company with 500 to 5,000 employees in financial services or healthcare, and a contact in IT security at manager level or above, excluding current customers and partners. An MQL is a fitting contact who has downloaded a security guide and answered one qualifying question about their current tooling, or who has attended a webinar. Sales accepts the lead if the details are correct and the company isn't already in an open deal. It becomes an SQL once a rep has confirmed a project to replace or add tooling within the next two quarters, identified who signs off the budget, and booked a second meeting. Everyone, including the lead vendor, works from that one page.",
      },
      { type: "h2", text: "Measure what matters" },
      {
        type: "ul",
        items: [
          "Acceptance rate: SALs divided by MQLs. The first sign that the definition or the source is off.",
          "Conversion to SQL: SQLs divided by SALs. Shows whether accepted leads turn into real opportunities.",
          "Speed to first touch: time from hand-off to the first sales activity. Slow follow-up quietly kills good leads.",
          "Pipeline and cost per opportunity: the numbers that connect lead programs to revenue.",
        ],
      },
      {
        type: "quote",
        text: "A qualified lead is whatever marketing, sales and your vendors have agreed in writing. Until that exists, every number is an opinion.",
      },
      {
        type: "p",
        text: "BANT, MQL and SQL aren't competing ideas. They describe different moments in the same journey. Write down what each stage means for your business, attach it to your SLA and your vendor contracts, and review it with real data every month. Most of the friction between marketing and sales disappears once everyone is counting the same thing.",
      },
      {
        type: "p",
        text: "Every BootSoc program starts with a written spec that covers fit, qualifying questions and hand-off, and leads outside it are replaced free. If you'd like a template, ask for one on a strategy call.",
      },
    ],
  },
  {
    slug: "legitimate-interest-b2b-marketing-gdpr",
    title: "GDPR and UK GDPR for B2B marketing: legitimate interest explained",
    seoTitle: "Legitimate interest for B2B marketing (GDPR)",
    seoDescription:
      "When B2B marketers can rely on legitimate interest under the GDPR and UK GDPR, how the three-part test works, and how PECR and the right to object fit in.",
    excerpt:
      "Legitimate interest can cover a lot of B2B marketing, but only if you can show your working. Here's what the test involves.",
    category: "Compliance",
    publishedAt: "2026-10-03T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/process-desk.jpg",
    coverAlt: "A compliance review of marketing data on a laptop",
    solutions: ["content-syndication", "demand-generation", "account-based-marketing"],
    localBody: [
      {
        type: "p",
        text: "B2B marketers often hear two opposite claims about the GDPR. One says you need consent for everything. The other says business contacts aren't personal data, so the rules don't apply. Both are wrong. A named person's work email, job title and phone number are personal data under the GDPR and the UK GDPR, so you need a lawful basis to use them. But consent is only one of six lawful bases, and for a lot of B2B marketing the more practical one is legitimate interest.",
      },
      {
        type: "p",
        text: "This guide explains what legitimate interest means, how to show it applies, where electronic marketing rules add extra requirements, and the mistakes that cause problems. It is general information, not legal advice. Check your specific programs with counsel.",
      },
      { type: "h2", text: "What legitimate interest is" },
      {
        type: "p",
        text: "Article 6(1)(f) of the GDPR allows processing that is necessary for the legitimate interests of the organisation or a third party, unless those interests are overridden by the interests, rights and freedoms of the person whose data it is. Recital 47 says that processing personal data for direct marketing purposes may be regarded as carried out for a legitimate interest. The UK GDPR contains the same basis, and the UK's Data (Use and Access) Act 2025 now names direct marketing in the legislation itself as an example of processing that may be a legitimate interest.",
      },
      {
        type: "p",
        text: "The key word is “may”. Neither law says direct marketing is automatically allowed. You still have to show that your use passes a balancing test and you have to be able to demonstrate it if a regulator or the individual asks.",
      },
      { type: "h2", text: "The three-part test" },
      {
        type: "p",
        text: "Regulators, including the UK Information Commissioner's Office, describe legitimate interest as a three-part test. Record your answers in a legitimate interests assessment, or LIA, before you start processing.",
      },
      {
        type: "ul",
        items: [
          "Purpose: is there a legitimate interest? Telling businesses about relevant products and services is a recognised commercial interest. Be specific about what you will send and why.",
          "Necessity: is the processing necessary for that purpose? Collect and keep only the data you need, and consider whether a less intrusive approach would work just as well.",
          "Balancing: do the person's interests override yours? Consider their reasonable expectations, the relationship, the sensitivity of the data and how easily they can object.",
        ],
      },
      {
        type: "p",
        text: "The balancing test is where most B2B programs succeed or fail. A procurement director at a software company would reasonably expect to hear from vendors about relevant procurement tools at their work address. The same person would not expect a stream of unrelated offers, contact on a personal phone, or their details sold on repeatedly without being told.",
      },
      { type: "h2", text: "Transparency: telling people what you're doing" },
      {
        type: "p",
        text: "Legitimate interest doesn't remove the duty to be transparent. If you collect data directly from someone, you must give them privacy information at the time. If you obtain it from another source, such as a data provider or a public profile, Article 14 generally requires you to tell them within a reasonable period, and at the latest within one month, or at your first communication with them if that's sooner. That notice should say who you are, where the data came from, what you'll use it for, the lawful basis and how to object.",
      },
      { type: "h2", text: "The right to object is absolute for direct marketing" },
      {
        type: "p",
        text: "Under Article 21, a person can object to the use of their data for direct marketing at any time, and you must stop. Unlike some other objections, there is no balancing test here: the objection wins. In practice that means every message needs an easy way to opt out, and opt-outs need to reach a suppression list that every campaign checks, including campaigns run by partners on your behalf.",
      },
      { type: "h2", text: "Where PECR adds extra rules in the UK" },
      {
        type: "p",
        text: "The GDPR decides whether you can use personal data at all. In the UK, the Privacy and Electronic Communications Regulations (PECR) add specific rules for marketing by email, text, phone and fax. For B2B email, PECR draws an important line between two kinds of recipient.",
      },
      {
        type: "ul",
        items: [
          "Corporate subscribers, such as limited companies, LLPs and government bodies: you can send unsolicited marketing email to their employees' work addresses without prior consent, as long as you identify yourself and give a simple way to opt out. GDPR rules, including legitimate interest and transparency, still apply to the personal data.",
          "Individual subscribers, including sole traders and some partnerships: you need prior consent, or the “soft opt-in” for existing customers who bought or negotiated to buy something similar from you and were given a chance to opt out.",
          "Marketing calls: you must screen numbers against the Telephone Preference Service and Corporate Telephone Preference Service unless the person has specifically consented to your calls.",
        ],
      },
      {
        type: "p",
        text: "The EU applies the ePrivacy Directive through national laws that differ by country, and several member states require consent for B2B email in more cases than the UK does. If you send into the EU, check the rules in each country you target.",
      },
      { type: "h2", text: "Penalties are rising" },
      {
        type: "p",
        text: "UK GDPR fines can reach £17.5 million or 4% of worldwide annual turnover, whichever is higher. The Data (Use and Access) Act 2025 raises the maximum PECR fines to the same level as its provisions come into force, so electronic marketing breaches now carry the same top-end risk as other data protection failures.",
      },
      { type: "h2", text: "Legitimate interest or consent: which to use" },
      {
        type: "p",
        text: "Consent is not a stronger basis, just a different one. It must be freely given, specific, informed and as easy to withdraw as to give, and once you rely on it you can't switch to legitimate interest if it is withdrawn. Consent suits situations where the person has a real choice and you want an explicit record of it, such as a content download that shares their details with a named sponsor, or marketing to sole traders by email. Legitimate interest suits ongoing, expected contact with business decision makers about relevant products, where you can show a clear balance in your favour and an easy way out. Many B2B programs use both: consent at the point of collection, and legitimate interest for related follow-up that the notice made clear.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Treating legitimate interest as a default rather than a decision, with no written assessment.",
          "Relying on legitimate interest for sole traders' email, where PECR requires consent or the soft opt-in.",
          "Buying a list without checking how the data was collected and what people were told.",
          "Keeping opt-outs in one tool while other campaigns, partners or vendors keep emailing.",
          "Using data for a new purpose, such as sharing it with partners, that people wouldn't expect from the original notice.",
          "Keeping records indefinitely instead of setting and applying a retention period.",
        ],
      },
      { type: "h2", text: "A practical checklist" },
      {
        type: "ul",
        items: [
          "Write an LIA for each type of B2B marketing you do and review it when the program changes.",
          "Separate corporate subscribers from sole traders and partnerships in your data.",
          "Give privacy information at collection, or within a month when data comes from elsewhere.",
          "Include your identity and a working opt-out in every message.",
          "Run one global suppression list and apply it to every campaign and vendor.",
          "Screen calling lists against TPS and CTPS.",
          "Ask lead vendors for the lawful basis, notice wording and consent record attached to each contact.",
        ],
      },
      {
        type: "quote",
        text: "Legitimate interest isn't a loophole. It's a decision you have to be able to explain, record and stand behind.",
      },
      {
        type: "p",
        text: "Used properly, legitimate interest lets B2B companies reach relevant buyers at work without asking for consent first, while still respecting people's choices. The organisations that get into trouble are the ones that skip the assessment, ignore the notice duty or let opt-outs slip through the cracks.",
      },
      {
        type: "p",
        text: "BootSoc records the lawful basis, the notice wording and a timestamp with every lead, applies separate playbooks for US, UK and Canadian law, and honours opt-outs across every client through a global suppression list. Our data and trust center explains how.",
      },
    ],
  },
  {
    slug: "abm-90-day-plan-tech-companies",
    title: "Account-based marketing for tech companies: a 90-day plan",
    seoTitle: "ABM for tech companies: a 90-day plan",
    seoDescription:
      "A 90-day account-based marketing plan for B2B technology companies: choosing accounts, mapping buying committees, launching plays and measuring pipeline.",
    excerpt:
      "ABM doesn't need a year-long transformation. Here's how to pick the right accounts, launch coordinated plays and prove pipeline in a quarter.",
    category: "Playbook",
    publishedAt: "2026-10-03T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/abm-strategy.jpg",
    coverAlt: "A team planning an account-based marketing program at a whiteboard",
    solutions: ["account-based-marketing", "intent-data", "programmatic-display"],
    localBody: [
      {
        type: "p",
        text: "Account-based marketing has a reputation for being slow and expensive: months of planning, new software and a pilot that never quite ends. It doesn't have to be. At its core, ABM is simply deciding which companies matter most, understanding who inside them makes the decision, and coordinating marketing and sales so those people hear a consistent, relevant story. A focused team can launch that in a quarter and have early pipeline evidence by the end of it.",
      },
      {
        type: "p",
        text: "This plan is written for B2B technology companies with a defined ideal customer profile and at least one sales team that can work named accounts. Adjust the numbers to your deal size and sales capacity.",
      },
      { type: "h2", text: "Before you start: agree what success looks like" },
      {
        type: "p",
        text: "Write down the goal in revenue terms before choosing tactics. Typical goals are new opportunities in a set of target accounts, expansion within existing customers, or faster movement of stalled deals. Agree the measures with sales up front: account engagement, meetings, opportunities created and pipeline value. Leads alone are the wrong measure for ABM, because the point is to win accounts, not to collect form fills.",
      },
      { type: "h2", text: "Days 1 to 30: choose accounts and map the buying committee" },
      {
        type: "p",
        text: "The first month is about focus. Every later step depends on having the right accounts, in the right tiers, with the right people identified inside them.",
      },
      { type: "h3", text: "Build the target account list" },
      {
        type: "p",
        text: "Start from your best customers. Look at closed-won deals from the last two years and find what they share: industry, size, region, technology stack, growth stage and the trigger that started the purchase. Use that profile to build a list of look-alike accounts, then refine it with sales. Reps know which accounts are already in conversation, which are off-limits and which have history.",
      },
      {
        type: "p",
        text: "Next, layer intent data on top. Accounts showing research activity in your category are more likely to be in market this quarter. This doesn't replace fit, it ranks within it. An account that fits perfectly but shows no intent still belongs on the list, just in a lower tier.",
      },
      { type: "h3", text: "Tier the list" },
      {
        type: "ul",
        items: [
          "Tier 1, one-to-one: a small number of high-value accounts, often 10 to 25, with individual research, tailored content and close sales involvement.",
          "Tier 2, one-to-few: clusters of 50 to 200 accounts that share an industry or problem, with content tailored to the cluster.",
          "Tier 3, one-to-many: a broader list, often several hundred to a few thousand accounts, reached with programmatic advertising, content syndication and light personalisation.",
        ],
      },
      { type: "h3", text: "Map the buying committee" },
      {
        type: "p",
        text: "Technology purchases involve several people: an economic buyer, technical evaluators, end users, security and procurement. For each Tier 1 and Tier 2 account, identify the roles you need to reach and the people who hold them. For Tier 3, define the roles by title and seniority so your programs can target them consistently. Note which people already know you and which are new.",
      },
      {
        type: "p",
        text: "Finish the month with a messaging framework: the core problem you solve, how it shows up for each role, the proof points that matter to each, and two or three pieces of content per role. Reuse what you have before creating anything new.",
      },
      { type: "h2", text: "Days 31 to 60: launch coordinated plays" },
      {
        type: "p",
        text: "A play is a coordinated sequence of touches across channels aimed at one tier and one goal. The aim is for the same people to hear a consistent story from several directions within a few weeks, rather than one-off campaigns that never connect.",
      },
      {
        type: "ul",
        items: [
          "Awareness: account-targeted display and native ads to the buying committee, plus sponsored content where your buyers read.",
          "Engagement: content syndication of role-specific assets to reach people in target accounts you can't yet contact, delivered with consent records.",
          "Conversation: SDR outreach to engaged contacts, referencing what they read, with a clear reason to meet.",
          "Acceleration: invitations to events, workshops or executive briefings for Tier 1 accounts, and tailored proposals for open opportunities.",
        ],
      },
      {
        type: "p",
        text: "Agree the hand-offs before launch. When an account crosses an engagement threshold, who is told, how fast must they act and what should they say? Without that agreement, ABM becomes an expensive way to generate unworked activity.",
      },
      {
        type: "p",
        text: "Run a weekly stand-up with marketing and sales to review account activity, share what reps are hearing, and adjust messaging. These short meetings do more to make ABM work than any software.",
      },
      { type: "h2", text: "Days 61 to 90: measure, learn and scale" },
      {
        type: "p",
        text: "By the third month you should have enough activity to see patterns. Look at the program at account level, not lead level, and compare target accounts against a similar group you didn't target if you can.",
      },
      {
        type: "ul",
        items: [
          "Coverage: how many target accounts have engaged contacts, and how many roles in each buying committee you've reached.",
          "Engagement: which accounts are increasing their activity across channels, and which content drives it.",
          "Meetings and opportunities: how many target accounts have had a first meeting and how many have an open opportunity.",
          "Pipeline and velocity: pipeline value in target accounts, and whether deals there move faster than average.",
        ],
      },
      {
        type: "p",
        text: "Then decide what to change. Drop accounts that show no fit or no response after a full cycle and replace them with accounts showing new intent. Double down on the plays and content that produced meetings. Move accounts between tiers as they warm up or cool down.",
      },
      { type: "h2", text: "Content for each role" },
      {
        type: "p",
        text: "ABM content doesn't need to be created from scratch for every account. What matters is that each role in the buying committee sees something that speaks to their concerns. Economic buyers want the business case: cost, risk and return. Technical evaluators want architecture, integrations and security detail. End users want to know how their day changes. Security and procurement want certifications, data handling and contract terms. Map your existing assets to these roles first, then fill the most important gaps.",
      },
      {
        type: "p",
        text: "For Tier 1 accounts, light personalisation goes a long way: an executive summary that names the account's industry and known priorities, a landing page with their logo and relevant case examples, or a short briefing prepared for a specific meeting. For Tier 2, tailor by industry or problem. For Tier 3, rely on strong role-based content and let the targeting do the work.",
      },
      { type: "h2", text: "Budget and team" },
      {
        type: "p",
        text: "A first ABM quarter can run with a small team: one marketer owning the program, a named sales lead for each tier, an SDR or two for outreach, and support for data and advertising. Spend usually concentrates in three places: data to build and enrich the account list, media to reach the buying committee, and content. Keep a small reserve to double down on whatever works in the second month.",
      },
      { type: "h2", text: "Common mistakes" },
      {
        type: "ul",
        items: [
          "Choosing too many Tier 1 accounts to give any of them real attention.",
          "Building the list without sales, so reps ignore it.",
          "Measuring ABM by lead volume, which pushes the program back towards broad lead generation.",
          "Running channels separately, so the buying committee never sees a joined-up story.",
          "Stopping after one quarter. Enterprise deals often take longer than 90 days to close, so treat the first quarter as proof of engagement and early pipeline, not final revenue.",
        ],
      },
      {
        type: "quote",
        text: "ABM works when marketing and sales agree on the accounts, the story and the next step, then show up together.",
      },
      {
        type: "p",
        text: "Ninety days is enough to pick the right accounts, launch coordinated plays and see which accounts are moving. It isn't enough to judge the full revenue impact, so set expectations with leadership: the first quarter proves engagement and builds pipeline, and the following quarters convert it.",
      },
      {
        type: "p",
        text: "BootSoc runs ABM programs that combine intent data, account-targeted display, content syndication and SDR outreach on the same account list, with account-level reporting. Size your target market with the audience estimator, or book a strategy call to plan your first 90 days.",
      },
    ],
  },
  {
    slug: "how-to-evaluate-content-syndication-vendor",
    title: "How to evaluate a content syndication vendor",
    seoTitle: "How to evaluate a content syndication vendor",
    seoDescription:
      "What to check before you buy content syndication: audience source, verification, consent, filters, pricing, pilots and replacement terms, with questions to ask.",
    excerpt:
      "Two vendors can quote the same cost per lead and deliver completely different results. Here's how to tell them apart before you sign.",
    category: "Guide",
    publishedAt: "2026-10-03T09:00:00Z",
    author: "BootSoc team",
    coverUrl: "/images/content-reading.jpg",
    coverAlt: "A professional reading a research report on a tablet",
    solutions: ["content-syndication", "demand-generation"],
    localBody: [
      {
        type: "p",
        text: "Content syndication is simple in principle. You give a vendor an asset, such as a report, an e-book or a webinar recording. They put it in front of people who match your target profile, and you pay for each person who downloads it and agrees to be contacted. Done well, it is one of the most predictable ways to reach new buyers. Done badly, it fills your CRM with people who don't remember downloading anything.",
      },
      {
        type: "p",
        text: "The difference rarely shows up in the proposal. Most vendors promise targeted, verified, compliant leads at a competitive cost per lead. This guide covers what to check underneath those words, how to run a fair pilot and the warning signs to look for.",
      },
      { type: "h2", text: "1. Where does the audience come from?" },
      {
        type: "p",
        text: "This is the most important question and the one most often answered vaguely. Some vendors own the sites and newsletters where your content appears. Others rent access to a network of publishers. Some rely mainly on email lists they've compiled or bought. And some subcontract to other vendors, so you end up buying the same leads at a mark-up.",
      },
      {
        type: "p",
        text: "Owning the audience isn't the only acceptable model, but you should know which model you're buying. Ask the vendor to name the main sources, explain how people come to see your content, and confirm whether any part of the work is subcontracted. If they can't or won't tell you, assume the worst.",
      },
      { type: "h2", text: "2. How is each lead verified?" },
      {
        type: "p",
        text: "Ask for the verification process step by step, not a one-word answer. A strong process checks that a real person engaged with the content, that their name, title and company are current, that the company matches your spec and that the email address is deliverable at the time of delivery.",
      },
      {
        type: "ul",
        items: [
          "Engagement: how do they detect bots, click farms and incentivised downloads?",
          "Identity: are titles and companies checked against live professional profiles, and by software or by a person?",
          "Fit: are company size, industry and region checked against your spec before delivery?",
          "Deliverability: is each mailbox verified when the lead is delivered, and are catch-all domains flagged?",
        ],
      },
      { type: "h2", text: "3. What does the consent record look like?" },
      {
        type: "p",
        text: "Each lead should come with evidence of how it was captured: the wording the person agreed to, the page or form it appeared on, and a timestamp. This matters for any program, and it's essential when you're contacting people in the UK, the EU or Canada, where the rules on consent and transparency are stricter than in the US. Ask for a sample consent record before you sign, and check that the wording names your company or makes clear that the person's details will be shared with the content sponsor.",
      },
      { type: "h2", text: "4. How strictly are filters applied?" },
      {
        type: "p",
        text: "Your spec will list industries, company sizes, regions, job functions and seniority. Ask how the vendor treats near misses: a company just below your size threshold, a title one level below your minimum, a contact in a neighbouring country. Ask whether you can supply suppression lists of customers, open opportunities and competitors, and how they are applied. Then ask how many custom qualifying questions are included and how answers are captured.",
      },
      { type: "h2", text: "5. Understand the pricing" },
      {
        type: "p",
        text: "Content syndication is usually priced per lead, with the cost rising as targeting gets narrower. A very low cost per lead for a narrow spec is a warning sign, because accurate leads from senior people in a specific market cost more to produce. Ask what is included in the price: the number of qualifying questions, the number of assets, delivery into your CRM and reporting. Ask what happens to pricing if the vendor can't reach the volume you ordered within your spec.",
      },
      { type: "h2", text: "6. Replacement terms" },
      {
        type: "p",
        text: "Every program produces some leads that fall outside the spec. What matters is how they're handled. Look for a written policy with a clear review window, rejection reasons tied to the signed spec, and free replacement rather than credit notes. Be wary of policies that require you to prove a lead is bad with evidence the vendor controls.",
      },
      { type: "h2", text: "7. Delivery and reporting" },
      {
        type: "p",
        text: "Leads should land where your team works, with consistent field mapping, lead source values and duplicates removed. Ask how often leads are delivered, whether they can be pushed directly into your CRM or marketing automation platform, and what reporting you'll get. Good reporting goes beyond volume to show acceptance rates and, ideally, the opportunities and pipeline that resulted.",
      },
      { type: "h2", text: "8. What happens after delivery" },
      {
        type: "p",
        text: "Syndicated leads are early-stage. The person read your content and agreed to hear from you, but most aren't ready for a sales call that week. The vendor can't fix weak follow-up, so plan it before the first lead arrives. Send a short, relevant nurture sequence that builds on the asset they downloaded. Route leads from priority accounts, or leads that answered qualifying questions strongly, to an SDR for a personal follow-up within a day or two. Track every lead through to opportunity so you can compare vendors and assets on pipeline, not just volume.",
      },
      {
        type: "p",
        text: "Ask the vendor whether they can help here too. Some can deliver a second touch with related content, flag leads from accounts showing wider intent, or set up appointment setting for the most engaged contacts. Each of these can lift the value of the same leads without buying more.",
      },
      { type: "h2", text: "Questions for your first call" },
      {
        type: "ul",
        items: [
          "Which sites and channels will our content appear on, and do you own them?",
          "Can you show us a sample lead file and a consent record built to our spec?",
          "How many of our target accounts can you reach, and how long will the volume take?",
          "What percentage of leads do you typically reject before delivery, and why?",
          "How do you handle UK and Canadian contacts differently from US ones?",
          "What does your replacement process look like in practice?",
        ],
      },
      { type: "h2", text: "How to run a fair pilot" },
      {
        type: "ul",
        items: [
          "Use the same asset and the same written spec with every vendor you're comparing.",
          "Keep the pilot big enough to judge, but small enough to stop if quality is poor.",
          "Ask for a sample file built to your spec before the pilot starts.",
          "Agree in advance how leads will be followed up, so poor follow-up doesn't make a good vendor look bad.",
          "Judge on acceptance rate, meetings and opportunities, not only cost per lead.",
          "Review results with sales before deciding to scale.",
        ],
      },
      { type: "h2", text: "Warning signs" },
      {
        type: "ul",
        items: [
          "Vague answers about where the audience comes from.",
          "No consent record, or consent wording that doesn't mention sharing details with sponsors.",
          "Large volumes delivered very quickly for a narrow spec.",
          "Many leads with personal email addresses, generic titles or missing company details.",
          "Prospects who say they never downloaded the asset.",
          "Replacement policies that are hard to use in practice.",
        ],
      },
      { type: "h2", text: "A quick scorecard" },
      {
        type: "p",
        text: "Score each vendor 0 (no), 1 (partly) or 2 (yes, with evidence) on the seven areas above: audience source, verification, consent records, filters, pricing clarity, replacement terms, and delivery and reporting. Weight audience source, verification and consent more heavily, because problems there are the hardest to fix later. A vendor that scores well on price but poorly on those three is unlikely to deliver pipeline.",
      },
      {
        type: "quote",
        text: "The cheapest cost per lead is rarely the cheapest cost per opportunity.",
      },
      {
        type: "p",
        text: "Content syndication can be a dependable source of new buyers when the audience is real, every lead is checked and the consent trail is clear. Spend your evaluation time on those three things, run a fair pilot and judge vendors on what happens after delivery. The right partner will welcome that scrutiny.",
      },
      {
        type: "p",
        text: "BootSoc runs content syndication through IntentBuy, our own technology publication, and partner sites we name. Every lead passes five checks with a person reviewing each record, arrives with a consent record, and is replaced free if it falls outside your spec. Ask for a sample lead file built to your spec.",
      },
    ],
  },
];
