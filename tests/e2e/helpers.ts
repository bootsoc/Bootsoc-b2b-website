import type { BrowserContext, Page } from "@playwright/test";

/** Pretend the visitor already answered the cookie banner, so it doesn't cover the page. */
export async function acceptedConsent(context: BrowserContext, baseURL: string) {
  const value = encodeURIComponent(
    JSON.stringify({ analytics: false, advertising: false, gpc: false, decidedAt: "2026-09-26T00:00:00Z", version: "2026-09-25" }),
  );
  await context.addCookies([{ name: "bs_consent", value, url: baseURL }]);
}

/** Forms reject submissions made faster than a human could type (anti-bot fill-time check). */
export async function waitLikeAHuman(page: Page) {
  await page.waitForTimeout(2700);
}
