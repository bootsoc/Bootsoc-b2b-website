# BootSoc website: setup and operations

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Motion + GSAP · Sanity · Neon Postgres · Vercel

The site is live at https://bootsoc.com. This file covers running it locally, where things live, and how each connected service is set up and maintained. For an overview, see [README.md](README.md).

## Run locally
```bash
npm install
cp .env.example .env.local   # fill DATABASE_URL and IP_HASH_SALT at minimum
npm run dev                  # http://localhost:3000
```
`npm run dev`, `npm run build` and `npm run typecheck` first run `scripts/gen-lastmod.mjs`, which writes
`src/generated/lastmod.json` (git-ignored) for the sitemap.

## Where things live
| What | Where |
|---|---|
| Solution pages copy (7 services) | `src/content/services.ts` |
| Company facts, metrics, client logos, nav, `policyVersion` | `src/content/site.ts` |
| Homepage FAQs | `src/content/faqs.ts` |
| Starter articles | `src/content/posts.ts` |
| Long-form guides | `src/content/guides.ts` |
| Page titles and meta descriptions | `export const metadata` in each `src/app/**/page.tsx` (layout adds " \| BootSoc") |
| Legal pages | `src/app/{privacy,cookies,terms,email-policy,dpa,accessibility,privacy-choices}/page.tsx` |
| Form handling (validation, spam guard, Turnstile, Neon writes, email) | `src/app/actions.ts` |
| Consent banner / GPC / Consent Mode v2 / GA4 / LinkedIn | `src/components/consent/*`, `src/proxy.ts`, `src/lib/consent.ts` |
| RB2B visitor identification | `src/components/analytics/*` (snippet rendered in `<head>` by `src/app/layout.tsx`) |
| Audience estimator model | `src/lib/estimator.ts` |
| Sitemap, robots, `llms.txt` | `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/llms.txt/route.ts` |
| Security headers, Content Security Policy, old WordPress URL redirects | `next.config.ts` |
| Design tokens | `src/app/globals.css`, `DESIGN.md` |

## Hosting and deploys (Vercel)
- Project `bootsoc-web` in the Fusionbyte Web team, connected to GitHub `bootsoc/Bootsoc-b2b-website`.
- Every push to `main` deploys to production. Other branches get preview URLs (behind Vercel login, marked noindex).
- Environment variables live in Vercel → Project → Settings → Environment Variables. After changing one, redeploy.
- The Vercel CLI login on a machine expires from time to time. If a `vercel` command says the token is invalid, run `vercel login`.
- Add a secret from the terminal so it never appears in chat or code:
  ```bash
  vercel env add NAME production,preview --sensitive
  ```
  Variables starting with `NEXT_PUBLIC_` are public by design and need `--type config` instead.

## Domain and DNS (Hostinger)
- `bootsoc.com` is registered at Hostinger, and Hostinger runs its DNS.
- `@` is an ALIAS and `www` a CNAME, both pointing to Vercel's target shown in Vercel → Domains. `www` redirects to `bootsoc.com` (`next.config.ts`).
- Leave the root MX (Google Workspace mail), the TXT verification records and the `notify` records (Resend) alone.

## Database (Neon project "BootSoc Web")
Tables: `leads` (contact, sample, estimator, newsletter, careers, report), `privacy_requests`, `suppression`, `consent_events`.
View submissions in the Neon console → SQL editor, e.g. `select * from leads order by created_at desc;`
Test submissions are named "QA Test (delete me)"; delete them when convenient.

## Sanity CMS
- Project ID `zwce73mp`, dataset `production`. Studio: https://bootsoc.com/studio
- CORS origins (sanity.io/manage → API) include localhost, the Vercel URL and bootsoc.com, with credentials allowed.
- Use the studio to publish articles, job openings and case studies. Pages refresh within 5 minutes.
- Articles have optional `seoTitle` and `seoDescription` fields. Keep `seoTitle` to 50 characters or less (the " | BootSoc" suffix makes 60) and descriptions to 120 to 160 characters.
- Case studies only appear on the site once at least one is published. Use real, approved results only.

## Email notifications (Resend)
- Sending domain `notify.bootsoc.com` (verified in Resend; its DNS records are at Hostinger).
- Website alerts go from `website@notify.bootsoc.com` to `sayhi@bootsoc.com` (`NOTIFY_FROM`, `NOTIFY_TO`).
- `RESEND_API_KEY` is set in Vercel as a sensitive variable. SMTP works as a fallback if Resend isn't configured.
- Every submission is stored in Neon even if email fails.

## Bot protection (Cloudflare Turnstile)
- Widget for bootsoc.com, the Vercel URL and localhost. Site key in `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, secret in `TURNSTILE_SECRET_KEY` (sensitive).
- The script loads when a visitor first interacts with a form, and stays invisible unless Cloudflare needs a challenge.
- With no secret set (local and test builds), verification is skipped.

## Analytics and tracking
| Tool | Setup | Loads |
|---|---|---|
| Google Analytics 4 | `NEXT_PUBLIC_GA_ID` (`G-KBLFX9GP1S`) | After consent in the UK, EU, EEA, Switzerland and Quebec; by default elsewhere |
| LinkedIn Insight Tag | Set `NEXT_PUBLIC_LINKEDIN_PARTNER_ID` once an ad account is chosen | With advertising consent; off under Global Privacy Control |
| Vercel Analytics and Speed Insights | Built in | Always (cookieless) |
| RB2B | Script ID `7N850HKD8JN1` in `src/components/analytics/rb2b-snippet.ts` | On every page, outside the cookie choices |

### RB2B notes
- The site uses RB2B's documented v1.0.1 snippet, which loads the tracker from S3
  (`s3-us-west-2.amazonaws.com/b2bjsstore/b/<ID>/reb2b.js.gz`). The newer dashboard snippet loads from CloudFront
  (`ddwl4m2hdecbv.cloudfront.net`), which returned 403 for this key. If RB2B fixes that, the dashboard snippet can replace it.
- Per RB2B's Next.js guide, `RB2BRouteTracker` reloads the tracker on every client-side page change.
- Check it on the live site: open the browser console and type `reb2b`; it should return an object.
- RB2B requires the privacy policy and cookie banner to describe it. Both do, with the opt-out links
  `https://app.retention.com/optout` and `https://www.rb2b.com/rb2b-gdpr-opt-out`. Keep them if the snippet changes.

### Adding any third-party script
Add its domains to the Content Security Policy in `next.config.ts` (`script-src`, plus `connect-src` for the servers it
calls), or browsers will block it. Then update the cookie and privacy policies, bump `policyVersion` in
`src/content/site.ts`, and redeploy.

## Search engines
- Google Search Console (domain property `bootsoc.com`) and Bing Webmaster Tools are verified through Hostinger DNS.
- `https://bootsoc.com/sitemap.xml` is submitted to both. Each URL's `lastmod` comes from the last git commit touching that page's own files.
- For a new or important page, use URL Inspection → Request indexing in Search Console (about 10 requests a day).
- New articles are listed on `/resources`, on solution pages they're tagged for (`solutions: [...]`), in `llms.txt` and in the sitemap automatically.

## Writing a new article without Sanity
1. Add an entry to `src/content/guides.ts` (or `posts.ts`) with `slug`, `title`, `seoTitle`, `seoDescription`, `excerpt`, `category`, `publishedAt`, `coverUrl`, `coverAlt`, `solutions` and `localBody`.
2. Body blocks: `p`, `h2`, `h3`, `ul` and `quote`. Don't use em dashes in site copy.
3. Run `npm run build` to check, then push.

## Tests
```bash
npm test            # unit tests (Vitest): consent regimes, estimator model, report tokens
npm run test:e2e    # browser tests (Playwright): forms, consent, interactions, axe accessibility in both themes
npm run test:all    # lint + typecheck + both suites
```
E2E tests build the site and run it with the database, email and Turnstile switched off, so they never write real leads.
GitHub Actions runs the whole suite on every push and pull request (`.github/workflows/ci.yml`).

## Gated report
- Landing page: `/report`. The form stores a `report` lead and returns a signed download link that expires after 7 days.
- Content: `src/content/report.ts`. Print layout: `/report-print` (dev only).
- To regenerate after editing: run `npm run dev`, then `npm run report:pdf`, then upload the new file:
  `vercel blob put private/bootsoc-b2b-lead-quality-report-2026.pdf --access private --pathname reports/bootsoc-b2b-lead-quality-report-2026.pdf --allow-overwrite true`
- The PDF is stored in the private Vercel Blob store `bootsoc-private`, never in the public repo.

## Fonts
Clash Display and Satoshi (Fontshare, ITF Free Font License) load from Fontshare's CDN. Their @font-face rules are
inlined at build time (`src/lib/fonts.ts`) and paired with metric-matched fallbacks to avoid layout shift. Never
commit the font files to this public repo.

## Open items
- LinkedIn Insight Tag: choose an ad account and set `NEXT_PUBLIC_LINKEDIN_PARTNER_ID`.
- RB2B: confirm verification in the RB2B dashboard; switch to their current snippet if the CloudFront 403 is fixed.
- Case studies: publish real, approved results in Sanity.
- Have the privacy policy (including the RB2B section) and the legitimate-interest guide reviewed by counsel.
- Work through anything left in [CONTENT-REVIEW.md](CONTENT-REVIEW.md).
