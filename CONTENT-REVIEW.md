# Content and legal review

The site went live on bootsoc.com on 30 September 2026. These items still need your confirmation or a lawyer's review; tick them off as you go.

The site copy is original and does not copy Vereigen Media's text, stats, images or case studies. Some sentences describe how BootSoc operates, though, and **only you can confirm those are true**. Please check each item below and edit it or tell me to change it. Publishing an inaccurate claim creates false-advertising risk (FTC Act §5, UK CAP Code, Canada Competition Act).

## 1. Operational claims to confirm
| Claim | Where |
|---|---|
| Every lead passes 5 checks, with human QA on every record | Home pipeline, How it works, services |
| Free replacement of out-of-spec leads | Services, FAQs |
| SDR team is in-house and never outsourced | Demand gen, Appointment setting, About |
| First leads within 7–10 business days of spec sign-off | FAQs |
| Integrations: HubSpot, Salesforce, Marketo, Eloqua, 6sense, Demandbase, Terminus, ON24, Zoom Events, Goldcast, Hopin, Cvent | Services |
| IntentBuy engagement feeds BootSoc Signal as first-party intent | Signal, Network, Trust |
| "We don't buy or sell personal data from data brokers for intent scoring" | Signal FAQ |
| "We don't buy scraped personal email lists or use co-registration" | Trust center |
| Named account lists up to 10,000 | ABM |
| Creative production team for display | BootSoc Reach |
| Remote-friendly roles across US, UK and CA time zones | Careers |
| Metrics: 250+ programs in 24 countries, 98% satisfaction, 95% retention, $5M+ revenue, 25+ specialists, 150+ campaigns, 5+ years (taken from bootsoc.com) | Home, About |
| Client logos: Microsoft, Cisco, SAP, IBM, Oracle, Adobe, HPE, Lenovo, AT&T, Citrix, RingCentral, Mitel, Aruba, LogMeIn, Forrester (from bootsoc.com; Kodak and Kotak dropped) | Logo marquee |
| Comparison table: "Typical vendor" column (no consent record, loose filters, lead counts only) | Home "Why teams switch" |
| Integrations list: Salesforce, HubSpot, Dynamics 365, Marketo, Eloqua, Account Engagement, 6sense, Demandbase, Bombora, ON24, Zoom Events, Goldcast, Cvent, LinkedIn Ads, Google Ads, The Trade Desk, SFTP, API/webhooks | How it works |
| Industries served (cybersecurity, SaaS, fintech, healthcare IT, HR tech, martech, telecoms, manufacturing) | /solutions |
| Compliance chips in the footer (CCPA/CPRA, UK GDPR, PECR, CASL, PIPEDA, Law 25, CAN-SPAM, GPC) describe frameworks you operate under, not certifications | Footer |


## Certifications (confirmed by you: ISO/IEC 27001, ISO 9001, SOC 2 Type II)
- [ ] Check that each certificate's **scope** covers the data and services described on the site, and that it's current. The home heading says "Independently audited. Every year."
- [ ] Send me the certificate numbers, certification bodies and SOC 2 audit period if you'd like them shown on `/trust`.
- [ ] Official marks: the site uses its own typographic seals. If you'd rather show the certification body's official logo (e.g. from your ISO registrar), send the files and their usage rules. The AICPA SOC logo may only be used under AICPA's own terms.
- [ ] Security documentation requests go to privacy@bootsoc.com. Change this if you have a security@ inbox.

## Articles (/resources)
- [ ] Five long-form guides were added on 3 October 2026 (`src/content/guides.ts`). They describe public rules and general practice, with no invented statistics. Check that the BootSoc descriptions at the end of each one are accurate.
- [ ] **"GDPR and UK GDPR for B2B marketing: legitimate interest explained"** summarises Article 6(1)(f), Recital 47, Article 14 and 21, PECR and the Data (Use and Access) Act 2025. Have counsel check it before promoting it, and re-check it as DUAA provisions come into force.
- [ ] "CAN-SPAM, CASL and PECR" (penalty figures) and the report's "rules on one page" table should be re-checked yearly, because penalty amounts are indexed.

## Report (/report)
- [ ] The 2026 B2B Lead Quality Report cites public research and law. Have someone review the "rules on one page" table before promoting it heavily.
- [ ] The scorecard describes BootSoc's own standards (five checks, global suppression, certifications). Make sure these stay true.

## 2. Legal items needing counsel review
- [ ] **RB2B visitor identification** loads on every visit, before any cookie choice, and outside Global Privacy Control. The privacy policy, cookie policy and banner disclose it with RB2B's recommended wording and opt-out links. Ask counsel whether running it without consent is acceptable for UK, EU and Quebec visitors, and for US states that treat it as "sharing" or "targeted advertising". If not, it can be switched to load only after advertising consent.
- [ ] Privacy policy, cookie policy, terms, email policy and DPA page were drafted to current US, UK and Canadian law but **must be reviewed by a qualified lawyer**.
- [ ] **Data broker registration:** if BootSoc maintains contact data about people it has no direct relationship with, register in California (Delete Act / DROP), Texas, Oregon and Vermont. The site already promises this "where required".
- [ ] **UK and EU representatives** (GDPR Art. 27): appoint them if you target UK or EU residents without an establishment there, and add their details to `/privacy`.
- [ ] **Privacy Officer:** name a person for PIPEDA and Quebec Law 25. The policy currently points to privacy@bootsoc.com.
- [ ] Create the **privacy@bootsoc.com** mailbox.
- [ ] Security statements in the privacy policy (encryption, MFA, access controls, incident response) must match reality.
- [ ] Subprocessor list on `/dpa`: now lists Vercel, Neon, Sanity, Google, LinkedIn, Cloudflare (Turnstile), Resend and RB2B. Add your CRM, email platform and dialer, and remove anything you don't use.
- [ ] Check that the retention periods in `/privacy` match your practice.
- [ ] LinkedIn company URL in `src/content/site.ts` (`linkedin.com/company/bootsoc`) should be confirmed.

## 3. Nice to add later
- Real case studies: add them in Sanity under Case study and tick "Client approved". The homepage rail and /case-studies fill in automatically.
- Client testimonials and G2 or TrustRadius badges. Every competitor reviewed shows these; add them only if they're real.
- Team photos and leadership bios (About currently uses stock photography from Unsplash)
- A real sample lead file (PDF or CSV) to send when someone requests one
- LinkedIn Insight Tag: choose an ad account and set `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` (see SETUP.md).

## Done
- Gated research report: "The 2026 B2B Lead Quality Report" at /report.
- SEO metadata pass (titles, descriptions, single-copy home H1) and five long-form guides, October 2026.
- Domain moved to Vercel; sitemap submitted to Google Search Console and Bing.
