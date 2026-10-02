// Writes src/generated/lastmod.json: for each sitemap route, the last git commit date of the files that make
// up that page. Runs before `next build`. Dates are floored at the launch date, because earlier commits were
// pre-launch work Google never saw. Falls back to the launch date when git history is unavailable or shallow.
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";

const LAUNCH = "2026-09-30T00:00:00.000Z";

const legal = ["src/components/legal/legal-page.tsx"];
const routes = {
  "/": ["src/app/page.tsx", "src/components/sections", "src/content/faqs.ts"],
  "/solutions": ["src/app/solutions/page.tsx", "src/content/services.ts", "src/content/audiences.ts"],
  "/solutions/[slug]": ["src/app/solutions/[slug]/page.tsx", "src/content/services.ts"],
  "/how-it-works": ["src/app/how-it-works"],
  "/trust": ["src/app/trust", "src/components/sections/certifications.tsx", "src/components/sections/regions.tsx"],
  "/audience-estimator": ["src/app/audience-estimator", "src/components/estimator"],
  "/network": ["src/app/network"],
  "/resources": ["src/app/resources/page.tsx", "src/content/posts.ts"],
  "/glossary": ["src/app/glossary", "src/content/glossary.ts"],
  "/report": ["src/app/report", "src/content/report.ts"],
  "/case-studies": ["src/app/case-studies/page.tsx"],
  "/about": ["src/app/about"],
  "/careers": ["src/app/careers"],
  "/contact": ["src/app/contact"],
  "/privacy": ["src/app/privacy", ...legal],
  "/cookies": ["src/app/cookies", ...legal],
  "/terms": ["src/app/terms", ...legal],
  "/privacy-choices": ["src/app/privacy-choices"],
  "/privacy-request": ["src/app/privacy-request"],
  "/email-policy": ["src/app/email-policy", ...legal],
  "/accessibility": ["src/app/accessibility", ...legal],
  "/dpa": ["src/app/dpa", ...legal],
};

function lastCommit(paths) {
  try {
    const out = execFileSync("git", ["log", "-1", "--format=%cI", "--", ...paths], { encoding: "utf8" }).trim();
    return out ? new Date(out).toISOString() : null;
  } catch {
    return null;
  }
}

const result = {};
for (const [route, paths] of Object.entries(routes)) {
  // Only the page's own source and content count; site-wide chrome (header, footer) changes are not page edits.
  const date = lastCommit(paths);
  result[route] = date && date > LAUNCH ? date : LAUNCH;
}

mkdirSync("src/generated", { recursive: true });
writeFileSync("src/generated/lastmod.json", JSON.stringify(result, null, 2) + "\n");
console.log(`lastmod: wrote ${Object.keys(result).length} routes`);
