// Renders /report-print to a Letter-size PDF (kept outside /public, served only via signed links)
// and a cover image for the landing page. Usage: npm run dev, then `npm run report:pdf`.
import { chromium } from "@playwright/test";

const base = process.env.REPORT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 2 });
await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
await page.context().addCookies([
  { name: "bs_consent", value: encodeURIComponent(JSON.stringify({ analytics: false, advertising: false, gpc: false, decidedAt: "2026-09-26T00:00:00Z", version: "2026-09-25" })), url: base },
]);
await page.goto(`${base}/report-print`, { waitUntil: "networkidle" });
await page.evaluate(async () => {
  document.documentElement.dataset.theme = "light";
  document.documentElement.style.background = "#ffffff";
  document.body.style.background = "#ffffff";
  await document.fonts.ready;
});
await page.pdf({
  path: "private/bootsoc-b2b-lead-quality-report-2026.pdf",
  format: "Letter",
  printBackground: true,
  preferCSSPageSize: true,
  displayHeaderFooter: true,
  headerTemplate: "<span></span>",
  footerTemplate:
    '<div style="width:100%;font-size:8px;color:#77776f;padding:0 0.8in;display:flex;justify-content:space-between;font-family:Arial"><span>The 2026 B2B Lead Quality Report</span><span class="pageNumber"></span></div>',
});
await page.locator(".rcover").screenshot({ path: "public/images/report-cover.png" });
await browser.close();
console.log("Report PDF and cover written.");
