# bootsoc.com

The website of BootSoc Media LLC: B2B demand generation, content syndication, ABM and intent data for technology companies selling into the US, UK and Canada.

**Live:** https://bootsoc.com (also https://bootsoc-web.vercel.app)

## Hosting and domain

| | |
|---|---|
| Hosting | Vercel, project `bootsoc-web` (team Fusionbyte Web) |
| Deploys | Every push to `main` on [bootsoc/Bootsoc-b2b-website](https://github.com/bootsoc/Bootsoc-b2b-website) deploys to production automatically |
| Domain and DNS | Registered at Hostinger. `@` (ALIAS) and `www` (CNAME) point to Vercel; `www` redirects to `bootsoc.com` |
| Email | Google Workspace (root MX record, unchanged) |

## Tech stack

- **Language:** TypeScript
- **Framework:** Next.js 16 (App Router) with React 19. This Next.js has breaking changes from older versions; read [AGENTS.md](AGENTS.md) before changing code.
- **Styling and motion:** Tailwind CSS 4, Motion, GSAP (one pinned scroll section), React View Transitions
- **Fonts:** Clash Display and Satoshi from Fontshare (licence bars redistribution, so they load from Fontshare's CDN and are inlined at build), Geist Mono
- **Icons:** Phosphor
- **Forms:** server actions with Zod validation, honeypot, fill-time check, rate limiting and Cloudflare Turnstile
- **Testing:** Playwright (end-to-end and axe accessibility, both themes), Vitest (unit), GitHub Actions CI

## Services

| Service | Used for |
|---|---|
| Sanity | CMS for articles, case studies and jobs; studio at [/studio](https://bootsoc.com/studio) |
| Neon (Postgres) | Leads, privacy requests, suppression list and consent records |
| Vercel Blob (private) | The gated report PDF |
| Resend | Internal lead notifications from `notify.bootsoc.com` |
| Cloudflare Turnstile | Bot protection on every form (loads when a visitor starts a form) |
| Google Analytics 4 | Analytics, behind the cookie consent rules |
| Vercel Analytics and Speed Insights | Cookieless performance and traffic data |
| RB2B | Website visitor identification (person-level for US visitors), loaded on every page |
| LinkedIn Insight Tag | Ready in code; needs `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` once an ad account is chosen |
| Google Search Console and Bing Webmaster Tools | Verified; sitemap submitted |

## Privacy and consent

- Regional rules from Vercel geo headers: opt-in banner for the UK, EU, EEA, Switzerland and Quebec; notice with opt-out for the US and the rest of Canada.
- Global Privacy Control switches off advertising cookies. Google Consent Mode v2 stays in sync with choices.
- RB2B runs on every visit, outside the cookie choices. The privacy policy (section "Website visitor identification (RB2B)"), cookie policy and banner disclose it, with RB2B's opt-out links.
- Legal pages: privacy, cookies, terms, email policy, DPA and subprocessors, accessibility, privacy choices and privacy requests. `policyVersion` in `src/content/site.ts` is stored with every consent record; bump it when a policy changes.

## SEO

- Keyword titles (30 to 60 characters) and meta descriptions (120 to 160) on every page.
- JSON-LD: Organization with certifications, Service, FAQPage, Article, DefinedTermSet, Report.
- Sitemap with real per-page `lastmod` dates from git (`scripts/gen-lastmod.mjs` runs before dev, build and typecheck).
- `robots.txt` (noindex on previews), `llms.txt`, OG images, and permanent redirects from the old WordPress URLs (`next.config.ts`).
- Articles: three starter posts plus five long-form guides in `src/content/posts.ts` and `src/content/guides.ts`. Tag a post with `solutions` to list it under "Further reading" on that solution page. Articles published in Sanity appear alongside them.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000. Copy `.env.example` to `.env.local` and fill in the values; most features fall back gracefully when a value is missing.

| Command | What it does |
|---|---|
| `npm run dev` | Development server |
| `npm run build` / `npm start` | Production build and server |
| `npm run lint` | ESLint |
| `npm run typecheck` | Route types and TypeScript |
| `npm test` | Unit tests (Vitest) |
| `npm run test:e2e` | Browser and accessibility tests (Playwright; builds the site first) |
| `npm run test:all` | Everything above, as CI runs it |
| `npm run report:pdf` | Rebuild the gated report PDF and cover image |

### Environment variables

Set in Vercel for production. Never commit real values.

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | Neon Postgres connection |
| `IP_HASH_SALT` | Salt for hashed IPs in consent and rate-limit records |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |
| `NEXT_PUBLIC_SANITY_PROJECT_ID`, `NEXT_PUBLIC_SANITY_DATASET` | Sanity project |
| `RESEND_API_KEY`, `NOTIFY_TO`, `NOTIFY_FROM` | Lead notification email |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY` | Cloudflare Turnstile |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 |
| `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` | LinkedIn Insight Tag (not set yet) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob, for the gated report download |
| `REPORT_TOKEN_SECRET` | Optional; signs report download links (falls back to `IP_HASH_SALT`) |

The RB2B script ID is public and lives in `src/components/analytics/rb2b-snippet.ts`.

## Where things live

| Path | Contents |
|---|---|
| `src/app/` | Routes, metadata, sitemap, robots, `llms.txt`, server actions (`actions.ts`), API routes |
| `src/components/` | Sections, layout, forms, consent manager, motion, analytics (RB2B) |
| `src/content/` | Site copy and data: services, audiences, FAQs, glossary, report, articles |
| `src/sanity/` | Sanity schemas and queries |
| `scripts/` | Report PDF builder and sitemap date generator |
| `tests/` | Playwright end-to-end tests and Vitest unit tests |
| `next.config.ts` | Security headers, Content Security Policy and legacy redirects |

When adding a third-party script, also add its domains to the Content Security Policy in `next.config.ts`, or browsers will block it.

## More documentation

- [SETUP.md](SETUP.md): setup, services, database, tests, gated report and fonts
- [DESIGN.md](DESIGN.md): design system
- [CONTENT-REVIEW.md](CONTENT-REVIEW.md): claims and legal items to review
- [PLAN.md](PLAN.md): original build plan

## Credits

Photography: [Unsplash](https://unsplash.com/license) (free for commercial use). Client logos: Simple Icons and Wikimedia Commons, used to describe past work.
