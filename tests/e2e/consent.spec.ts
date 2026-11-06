import { expect, test } from "@playwright/test";

test.describe("cookie consent", () => {
  test("opt-in regions see a banner where rejecting is as easy as accepting, and the choice persists", async ({ page, context }) => {
    await page.goto("/");
    const banner = page.getByRole("region", { name: "Cookie choices" });
    await expect(banner).toBeVisible();
    await expect(banner.getByRole("button", { name: "Reject all" })).toBeVisible();
    await expect(banner.getByRole("button", { name: "Accept all" })).toBeVisible();

    await banner.getByRole("button", { name: "Reject all" }).click();
    await expect(banner).toBeHidden();

    const cookie = (await context.cookies()).find((c) => c.name === "bs_consent");
    expect(JSON.parse(decodeURIComponent(cookie!.value))).toMatchObject({ analytics: false, advertising: false });

    await page.reload();
    await expect(page.getByRole("region", { name: "Cookie choices" })).toBeHidden();
  });

  test("no analytics or ad scripts load before consent", async ({ page }) => {
    const thirdParty: string[] = [];
    page.on("request", (r) => {
      if (/googletagmanager|google-analytics|snap\.licdn|linkedin/.test(r.url())) thirdParty.push(r.url());
    });
    await page.goto("/");
    await page.waitForLoadState("networkidle");
    expect(thirdParty).toEqual([]);
  });

  test("US visitors get an opt-out notice instead of a blocking banner", async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "bs_geo", value: "optout.US-CA", url: baseURL! }]);
    await page.goto("/");
    const notice = page.getByRole("region", { name: "Cookie choices" });
    await expect(notice).toContainText("opt out of the sale or sharing");
    await expect(notice.getByRole("button", { name: "Manage choices" })).toBeVisible();
  });

  test("Global Privacy Control switches advertising off and is disclosed", async ({ page, context, baseURL }) => {
    await context.addCookies([{ name: "bs_geo", value: "optout.US-CA", url: baseURL! }]);
    await page.addInitScript(() => Object.defineProperty(navigator, "globalPrivacyControl", { value: true }));
    await page.goto("/");
    await expect(page.getByRole("region", { name: "Cookie choices" })).toContainText("Global Privacy Control");
    await page.getByRole("button", { name: "Manage choices" }).click();
    const dialog = page.getByRole("dialog", { name: "Privacy choices" });
    const ads = dialog.getByRole("switch").nth(2);
    await expect(ads).not.toBeChecked();
    await expect(ads).toBeDisabled();
  });

  test("the footer privacy choices control reopens preferences", async ({ page }) => {
    await page.goto("/privacy-choices");
    await page.getByRole("region", { name: "Cookie choices" }).getByRole("button", { name: "Accept all" }).click();
    await page.getByRole("button", { name: "Your privacy choices" }).click();
    await expect(page.getByRole("dialog", { name: "Privacy choices" })).toBeVisible();
  });
});
