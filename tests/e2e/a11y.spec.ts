import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { acceptedConsent } from "./helpers";

const pages = [
  "/",
  "/solutions",
  "/solutions/content-syndication",
  "/how-it-works",
  "/trust",
  "/audience-estimator",
  "/contact",
  "/privacy",
  "/privacy-request",
  "/glossary",
  "/report",
  "/resources",
  "/about",
];

// Reduced motion renders content in its final state, so contrast checks see real colours, not mid-fade.
test.use({ reducedMotion: "reduce" });

for (const theme of ["dark", "light"] as const) {
  for (const path of pages) {
    test(`${path} has no serious accessibility violations (${theme})`, async ({ page, context, baseURL }) => {
      await acceptedConsent(context, baseURL!);
      await page.addInitScript((t) => localStorage.setItem("bs-theme", t), theme);
      await page.goto(path);
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"]).analyze();
      const serious = results.violations.filter((v) => v.impact === "serious" || v.impact === "critical");
      expect(
        serious.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(" ")).slice(0, 3).join(" | ")}`),
      ).toEqual([]);
    });
  }
}
