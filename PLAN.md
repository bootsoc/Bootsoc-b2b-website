# BootSoc Media B2B website: build plan

Status: draft for review (2026-09-25)
Goal: a fast, motion-rich, legally sound B2B demand-gen and intent-data site for BootSoc Media LLC. It targets buyers in the US, UK and Canada and aims to outperform vereigenmedia.com on design, clarity, trust and conversion.

---

## 0. Ground rule on "copying" the competitor

We use Vereigen Media for **structure and positioning research only**. Their copy, images, case studies, stats, publisher network and client logos are their own content and claims. Copying them would create copyright risk and false-advertising risk (FTC Act §5, UK CAP Code, Canada Competition Act). Everything on the new site is:
- **Original copy** written in BootSoc's voice, with the same service coverage and a sharper message.
- **Only BootSoc's real numbers.** Every stat and logo needs a source we can defend. The logos currently on bootsoc.com (AT&T, Adobe, Cisco, SAP…) should stay only if we have written permission or a documented client relationship.

---

## 1. Research findings

### Competitor: vereigenmedia.com (WordPress 7.1 + Elementor, ~820 KB HTML homepage)
- **Nav:** Home · Solutions · Resources · Publications · About (Team, Careers) · Contact
- **Solutions:** Verified Content Engagement (content syndication) · ABM · Demand Generation · Event Registration · VM Engage (programmatic display)
- **Homepage order:** trust hero → "Why us" (110M+ contacts, 100% in-house, <2% bounce) → owned publisher network (7 niche tech-news sites) → case studies → 5-step full-funnel → "How we guarantee lead accuracy" → 7-step process → FAQ → newsletter footer
- **Service page template:** hero → problem → solution bullets → 4-step flow → value prop → 5-part framework → benefits → 8-item FAQ → CTA
- **Weaknesses we can beat:** heavy Elementor build (slow LCP), placeholder imagery, generic stock look, repeated CTAs with no clear next step, no interactive tools, and a thin privacy policy (only CCPA + EU GDPR; no UK GDPR, PIPEDA/Law 25 or CASL, and no trust center)

### BootSoc brand (from bootsoc.com, WordPress 6.9 + Elementor)
| Token | Value | Use |
|---|---|---|
| Brand yellow | `#FFF100` | Primary accent, CTAs, highlights |
| Ink | `#111111` / `#171717` | Primary dark surface / text |
| Cream | `#FCF7F3` | Light surface |
| Lime | `#C4F012` | Secondary accent (sparingly, data/"live" states) |
| Greys | `#555555`, `#999999` | Secondary text |
| Fonts in use | DM Sans (body), Instrument Sans (UI), Thunder (display), Tartuffo *Trial*, Sequel Sans | |

- The logo files are saved in `brand/`: the `#BooᵒtSoc` wordmark in yellow and the yellow "oo" favicon. **We need an SVG version** of the wordmark; if none exists we vectorise the PNG.
- ⚠️ **Font licensing:** "Tartuffo_Trial" is a trial licence, which does not allow production use. Thunder and Sequel Sans are commercial. Either we buy licences or we swap to free fonts: DM Sans + Instrument Sans (Google, free) plus a condensed display face, for example *Anton* / *Bebas Neue* (free) or a licensed Thunder.
- **Company facts:** BootSoc Media LLC, 5830 East 2nd Street, Ste 7000 #29910, Casper, WY 82609 · sayhi@bootsoc.com

---

## 2. Skills and tooling for the build

| # | Skill / tool | Purpose | Install |
|---|---|---|---|
| 1 | **design-taste-frontend** (taste-skill v2) | Design-system mapping, anti-generic layout/typography rules, GSAP motion skeletons, pre-flight check | `npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"` |
| 2 | **Web Interface Guidelines** (Vercel) | Audit pass on accessibility, focus, forms, animation, typography, images, performance, hydration and anti-patterns, reported as `file:line` | save `command.md` to `.claude/commands/web-guidelines.md` |
| 3 | **awesome-design-skills** (TypeUI) | Pick 1–2 style directions to fuse with the brand: **`bold`** (fits yellow/black) + **`editorial`** or **`premium`** | `npx typeui.sh pull bold` · `npx typeui.sh pull editorial` |
| 4 | **high-end-visual-design** (taste-skill) | Premium spacing/motion polish layer | same repo, `--skill "high-end-visual-design"` |
| 5 | **Anthropic `frontend-design`** | Distinctive, production-grade UI generation | `npx skills add https://github.com/anthropics/skills --skill frontend-design` |
| 6 | **Vercel `react-best-practices`** | React/Next.js performance rules (RSC, bundle size, waterfalls) | `npx skills add https://github.com/vercel-labs/agent-skills --skill react-best-practices` |
| 7 | Built-in: **built-in browser** | Visual QA at 375/768/1440, dark mode, motion checks, competitor browsing | available |
| 8 | Built-in: **ads-landing** | CRO audit of the service and landing pages (message match, forms, trust) | available |
| 9 | Built-in: **ads-dna** | Produce `brand-profile.json` from bootsoc.com so later ad creative matches the site | available |
| 10 | Built-in: **code-review / security-review** | Pre-launch review of forms, API routes and headers | available |
| 11 | **Neon MCP** (connected) | Postgres for leads, consent log and DSAR requests | available |
| 12 | Apollo MCP (connected, optional) | Push inbound leads to Apollo / enrich firmographics | available |
| CLI | Lighthouse, `@axe-core/cli`, Playwright | Perf/a11y budgets, E2E form tests | `npx` |

Order of use: the design skills set direction before any code. Web Interface Guidelines, taste pre-flight and ads-landing run as gates after each page.

---

## 3. Tech stack (latest stable as of Sep 2026)

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 16.2 (App Router, RSC, TypeScript)** | Active LTS until Oct 2027, static + ISR, great SEO |
| Styling | **Tailwind CSS v4.3** + CSS variables for brand tokens | Fast engine, `@theme` tokens, dark mode |
| Components | **shadcn/ui + Radix** primitives | Accessible menus, dialogs, accordions |
| Motion | **Motion (`motion/react`)** for UI/micro-interactions; **GSAP + ScrollTrigger** (now free) for scroll narratives; **Lenis** smooth scroll | Taste-skill's GSAP skeletons; all respect `prefers-reduced-motion` |
| 3D / hero visual (optional) | React Three Fiber or a Lottie/Rive "data flow" animation | "Intent signal" hero visual, lazy-loaded |
| Content/CMS | **Sanity** (visual editing, free tier) for blog, case studies, resources, careers; **MDX** fallback if you prefer no CMS | Marketing team can publish without dev |
| Forms | react-hook-form + zod → Next.js Server Actions → **Neon Postgres** + **Resend** email notification + CRM push (HubSpot or Apollo) | Stores consent proof (timestamp, IP region, policy version, checkbox text) |
| Spam | **Cloudflare Turnstile** | No CAPTCHA puzzles, privacy-friendly |
| Scheduling | Cal.com or HubSpot Meetings embed ("Book a strategy call") | Direct conversion |
| Consent | CMP with **Google Consent Mode v2** + **GPC signal** support (Cookiebot / CookieYes / Osano, or a lean custom banner) | Geo rules: opt-in for UK/EU/Quebec, opt-out + GPC for US states |
| Analytics | GA4 (consent-gated), **Vercel Analytics + Speed Insights**, LinkedIn Insight Tag, optional PostHog | B2B attribution |
| SEO | Metadata API, `sitemap.ts`, `robots.ts`, JSON-LD (Organization, Service, FAQPage, Article, BreadcrumbList), `next/og` dynamic OG images, `llms.txt` for AI search | |
| Hosting | **Vercel** (CLI already installed) + custom domain, preview deploys per branch | |
| Security | CSP, HSTS, Referrer-Policy and Permissions-Policy headers; rate-limited form endpoints | |
| Quality | Lighthouse ≥95 on all four categories, WCAG 2.2 AA, CWV: LCP <2.0s, INP <200ms, CLS <0.05 | |

---

## 4. Information architecture (new site)

```
/                         Home
/solutions                Solutions overview
  /content-syndication    (≈ their "Verified Content Engagement")
  /account-based-marketing
  /demand-generation      (multi-touch, human-verified leads)
  /intent-data            (NEW: dedicated intent signal page, their gap)
  /event-webinar-registration
  /programmatic-display   (≈ "VM Engage": give it a BootSoc product name)
/how-it-works             ICP → targeting → engagement → verification → delivery → optimisation
/data-quality             NEW Trust Center: sourcing, verification, consent, suppression, SLAs
/industries (phase 2)     Cybersecurity, SaaS, FinTech, HR Tech, MarTech, Healthcare IT
/case-studies/[slug]
/resources                Blog, guides, benchmark reports (CMS)
/about  /team  /careers   (careers with Greenhouse/Ashby-style form, resume upload)
/contact                  Short form + calendar embed
/privacy  /cookies  /terms  /privacy-choices  /dsar  /email-policy  /accessibility  /dpa  /subprocessors
```

### Homepage sections (improved order)
1. **Hero:** a sharp promise about verified pipeline from real in-market buyers, an animated "signal → lead" visual, and a primary CTA (Book a strategy call) plus a secondary CTA (Get a sample lead file)
2. **Proof strip:** real client logos and 3–4 verifiable metrics, with animated counters
3. **Problem → answer:** why syndicated leads fail (fake engagement, stale data, bad fit)
4. **Solutions bento grid:** six services, hover-reveal detail, each linking to its page
5. **How we verify:** a scroll-pinned GSAP pipeline covering first-party consent, human + AI validation, suppression, delivery QA
6. **Interactive TAM / lead estimator (differentiator):** pick industry, titles, region and company size to get an estimated addressable audience and indicative CPL range, then unlock the full breakdown with an email. Doubles as a lead magnet.
7. **Case studies carousel:** outcome numbers first
8. **Regions:** US / UK / Canada coverage map and compliance badges (CCPA-ready, UK GDPR, CASL)
9. **FAQ accordion:** marked up with FAQPage JSON-LD
10. **Final CTA band** and footer (newsletter with explicit opt-in checkbox for CASL/PECR)

### Service page template
Hero → pain → how it works (4 steps, animated) → deliverables & SLAs → targeting options (chips) → integrations (HubSpot, Salesforce, Marketo, Eloqua) → mini case study → FAQ → CTA. It is one reusable template driven by CMS or typed content.

---

## 5. Design and motion direction

- **Look:** "Bold Editorial". Ink-black dominant surfaces, yellow `#FFF100` used surgically for CTAs, highlights and data points, cream sections for readability, and huge condensed display type. The "oo" mark becomes a motion motif (two orbiting dots, like a signal and a match).
- **Grid:** 12-column, bento layouts for services, generous whitespace, max text width 68ch.
- **Motion rules:**
  - Entrance: 12–24px translate plus opacity, 400–600ms, custom ease `[0.22, 1, 0.36, 1]`, staggered 40–60ms
  - Scroll: one pinned narrative per page at most (How we verify); parallax limited to decorative layers
  - Micro: magnetic primary buttons, cursor-follow highlight on bento cards, counter tick-ups, marquee logo strip
  - Only `transform` and `opacity` are animated (no `transition: all`). Everything is disabled or reduced under `prefers-reduced-motion`.
- **Dark and light:** dark by default, with a light theme toggle using `color-scheme` and `theme-color` meta.
- **Accessibility:** yellow on ink passes AAA. Yellow text on cream or white fails, so on light surfaces yellow is used only as a fill behind ink text.

---

## 6. Legal and policy pack (US, UK, Canada)

> I'm not a lawyer. Drafts below will be written to current law, but they **must be reviewed by counsel** before launch, especially because intent-data and lead-gen businesses are treated as data processors or data brokers.

### Pages and components to ship
| Item | Covers |
|---|---|
| **Privacy Policy** | CCPA/CPRA + the ~20 US state comprehensive laws in force in 2026 (e.g. VA, CO, CT, TX, OR, NJ, IN, KY, RI…); UK GDPR as amended by the **Data (Use and Access) Act 2025** (key parts in force Feb 2026); EU GDPR (UK/EU visitors); **PIPEDA** + **Quebec Law 25**. Lists data categories, sources (incl. third-party/intent data), purposes, retention, rights, appeals, international transfers (UK IDTA / EU SCCs). |
| **Cookie Policy + consent banner** | PECR/UK GDPR (opt-in before non-essential cookies; DUAA relaxed some analytics exemptions), Quebec opt-in, US opt-out. Must honour **Global Privacy Control**. Google Consent Mode v2. |
| **"Your Privacy Choices" / Do Not Sell or Share** | Footer link required by CPRA and several states; GPC-aware |
| **Data Subject / Consumer Rights Request form** (`/dsar`) | Access, delete, correct, opt-out, appeal; identity verification; 45-day (US) / 1-month (UK) / 30-day (CA) SLAs; logged in Neon |
| **Terms of Use** | Wyoming governing law, limitation of liability, IP, acceptable use |
| **Email & Outreach Policy** | **CAN-SPAM** (US), **CASL** (Canada: express/implied consent, ID, unsubscribe), **PECR** (UK, corporate-subscriber rules) |
| **Data Sourcing & Quality / Trust Center** | How contacts are obtained, consent basis, verification cadence, suppression and opt-out handling. This is the #1 trust asset for intent-data buyers. |
| **DPA + Subprocessor list** | For clients (GDPR Art. 28 / CPRA service-provider terms) |
| **Accessibility Statement** | ADA (US) / WCAG 2.2 AA, AODA (Ontario), Equality Act (UK) |
| Form micro-copy | Unticked consent checkboxes, link to privacy policy, stored consent record |

### Registrations and business obligations to check with counsel
- **Data broker registration** if BootSoc sells or licenses contact data about people it has no direct relationship with: **California (Delete Act; the DROP deletion platform goes live and brokers must process requests from Aug 2026)**, Texas, Oregon, Vermont.
- **UK representative** (UK GDPR Art. 27) and **EU representative** (Art. 27) if targeting those residents without an establishment there.
- **ICO data protection fee** if required.
- **Privacy officer/contact** named in the policy (PIPEDA and Law 25 require a person in charge of personal information).
- Suppression list and unsubscribe honoured within 10 business days (CAN-SPAM, CASL).

---

## 7. Build phases

| Phase | Output | Gate |
|---|---|---|
| **0. Setup** | Install skills, `git init`, Next.js 16 + Tailwind 4 scaffold, brand tokens, fonts, SVG logo, Vercel project | builds and deploys a preview |
| **1. Design system** | Tokens, type scale, buttons, cards, nav/mega-menu, footer, form fields, motion primitives; `/styleguide` page | taste pre-flight + Web Interface Guidelines audit |
| **2. Content** | Original copy for Home, 6 services, How it works, Trust Center, About, FAQs; filled with your real stats and cases | your approval of copy |
| **3. Pages** | Home, services (template), how-it-works, data-quality, about/team/careers, contact | browser QA at 3 breakpoints, a11y axe = 0 violations |
| **4. Functionality** | Forms → Neon + Resend + CRM, Turnstile, calendar embed, TAM estimator, newsletter, careers upload, DSAR form | Playwright E2E green |
| **5. Compliance** | Legal pages, CMP + GPC + Consent Mode v2, security headers | counsel review, cookie scan |
| **6. SEO/Perf** | JSON-LD, sitemap, OG images, redirects from old bootsoc.com URLs, Lighthouse ≥95 | CWV budgets met |
| **7. Launch** | DNS cutover, GA4/LinkedIn verified, Search Console + Bing Webmaster, uptime monitor | ads-landing CRO audit, security-review |

---

## 8. Open decisions (need your input)
1. **Domain:** replace bootsoc.com entirely, or launch on a subdomain / new domain for the B2B arm? (This affects the redirect plan and brand.)
2. **CMS:** Sanity (editable by team) or MDX in repo (dev-only edits, zero cost)?
3. **CRM** for inbound leads: HubSpot, Salesforce, Apollo, or email + Neon only?
4. **Real proof:** which metrics, client logos (with permission) and case studies can we publish? Do you own any publisher/media sites like Vereigen's network?
5. **Fonts:** license Thunder (and drop Tartuffo Trial) or switch to free alternatives?
6. **Service names:** keep generic names, or brand a product (e.g. "BootSoc Signal" for intent + programmatic)?
7. **Data role:** does BootSoc hold its own contact database (possible data-broker duties) or only run campaigns on clients' and partners' data?
