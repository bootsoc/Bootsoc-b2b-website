import { expect, test } from "@playwright/test";
import { acceptedConsent } from "./helpers";

test.beforeEach(async ({ context, baseURL }) => acceptedConsent(context, baseURL!));

test("audience estimator updates and syncs the URL", async ({ page }) => {
  await page.goto("/audience-estimator");
  const reachable = page.getByText("Reachable decision makers").locator("..");
  const before = await reachable.textContent();
  await page.getByRole("button", { name: "Healthcare", exact: true }).click();
  await expect(reachable).not.toHaveText(before!);
  await expect(page).toHaveURL(/industries=tech%2Chealth/);
});

test("pipeline calculator responds to the sliders", async ({ page }) => {
  await page.goto("/audience-estimator");
  const leads = page.getByLabel("Verified leads per month");
  await leads.fill("1000");
  await expect(page.getByText("Opportunities").locator("..")).toContainText("80");
});

test("role tabs support arrow keys", async ({ page }) => {
  await page.goto("/");
  const first = page.getByRole("tab", { name: "Demand gen leaders" });
  await first.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "ABM and field marketing" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("tabpanel")).toContainText("Reach every stakeholder");
});

test("glossary search filters terms", async ({ page }) => {
  await page.goto("/glossary");
  await page.getByLabel("Search terms").fill("CASL");
  await expect(page.getByText(/^1 of \d+ terms$/)).toBeVisible();
});

test("legacy WordPress URLs redirect permanently", async ({ request }) => {
  const res = await request.get("/about-us", { maxRedirects: 0 });
  expect(res.status()).toBe(308);
  expect(res.headers().location).toBe("/about");
});

test("mobile menu opens and closes @mobile", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open menu" }).click();
  const menu = page.getByRole("dialog", { name: "Site menu" });
  await expect(menu).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
});

test("no horizontal scroll on key pages @mobile", async ({ page }) => {
  for (const path of ["/", "/solutions/intent-data", "/audience-estimator", "/trust", "/glossary"]) {
    await page.goto(path);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    expect(overflow, path).toBeLessThanOrEqual(0);
  }
});
