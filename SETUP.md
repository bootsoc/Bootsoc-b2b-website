# BootSoc website: setup and launch

Next.js 16 (App Router) · Tailwind CSS 4 · Motion + GSAP · Sanity · Neon Postgres · Vercel

## Run locally
```bash
npm install
cp .env.example .env.local   # fill DATABASE_URL and IP_HASH_SALT at minimum
npm run dev
```

## Where things live
| What | Where |
|---|---|
| Solution pages copy (7 services) | `src/content/services.ts` |
| Company facts, metrics, client logos, nav | `src/content/site.ts` |
| Homepage FAQs | `src/content/faqs.ts` |
| Starter articles (shown until Sanity has posts) | `src/content/posts.ts` |
| Legal pages | `src/app/{privacy,cookies,terms,email-policy,dpa,accessibility,privacy-choices}/page.tsx` |
| Form handling (validation, spam guard, Neon writes, email) | `src/app/actions.ts` |
| Consent banner / GPC / Consent Mode v2 | `src/components/consent/*`, `src/proxy.ts`, `src/lib/consent.ts` |
| Audience estimator model | `src/lib/estimator.ts` |
| Design tokens | `src/app/globals.css`, `DESIGN.md` |
| Old WordPress URL redirects | `next.config.ts` → `legacy` |

## Database (Neon project "BootSoc Web")
Tables: `leads` (contact, sample, estimator, newsletter, careers), `privacy_requests`, `suppression`, `consent_events`.
View submissions in the Neon console → SQL editor, e.g. `select * from leads order by created_at desc;`

## Sanity CMS (one-time, ~5 minutes)
1. `npx sanity login`, then `npx sanity projects create "BootSoc"` (or create at sanity.io/manage).
2. Set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET=production` in Vercel and `.env.local`.
3. In sanity.io/manage → API → CORS origins, add `http://localhost:3000`, your Vercel URL and `https://bootsoc.com` (allow credentials).
4. Open `/studio` to write articles, add job openings and case studies. Pages refresh within 5 minutes.

## Email notifications
Create a Resend account, verify the `bootsoc.com` domain, and set `RESEND_API_KEY`. Or use SMTP (for Google Workspace, create an app password). All submissions are stored in Neon, even if email isn't set up.

## Go-live checklist (DNS cutover)
1. Vercel → Project → Settings → Domains: add `bootsoc.com` and `www.bootsoc.com` (redirect www → apex).
2. At your DNS provider: `A @ 76.76.21.21` and `CNAME www cname.vercel-dns.com` (Vercel shows the exact values).
3. Set `NEXT_PUBLIC_SITE_URL=https://bootsoc.com` for Production, then redeploy.
4. Create `privacy@bootsoc.com` (used across the legal pages) and route it to whoever handles privacy requests.
5. Add GA4 / LinkedIn IDs if wanted; they only load after consent.
6. Submit `https://bootsoc.com/sitemap.xml` in Google Search Console and Bing Webmaster Tools.
7. Complete every item in `CONTENT-REVIEW.md`, especially the legal review.

## Tests
```bash
npm test            # unit tests (Vitest): consent regimes, estimator model, report tokens
npm run test:e2e    # browser tests (Playwright): forms, consent, interactions, axe accessibility in both themes
npm run test:all    # lint + typecheck + both suites
```
E2E tests build the site and run it with the database and email switched off, so they never write real leads.
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
