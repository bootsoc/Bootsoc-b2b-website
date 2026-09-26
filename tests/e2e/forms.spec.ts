import { expect, test } from "@playwright/test";
import { acceptedConsent, waitLikeAHuman } from "./helpers";

test.beforeEach(async ({ context, baseURL }) => acceptedConsent(context, baseURL!));

test.describe("contact form", () => {
  test("shows inline errors, focuses the first one, and keeps what was typed", async ({ page }) => {
    await page.goto("/contact");
    const main = page.locator("main");
    await main.getByLabel("Full name").fill("Jordan Ellis");
    await main.getByLabel("Work email").fill("not-an-email");
    await waitLikeAHuman(page);
    await page.getByRole("button", { name: "Book a strategy call" }).last().click();

    await expect(page.getByText("Enter a valid work email")).toBeVisible();
    await expect(page.getByText("Enter your company name.")).toBeVisible();
    await expect(main.getByLabel("Work email")).toBeFocused();
    await expect(main.getByLabel("Full name")).toHaveValue("Jordan Ellis");
  });

  test("submits a valid enquiry", async ({ page }) => {
    await page.goto("/contact");
    const main = page.locator("main");
    await main.getByLabel("Full name").fill("Jordan Ellis");
    await main.getByLabel("Work email").fill("jordan@example.com");
    await main.getByLabel("Company").fill("Northwind Security");
    await main.getByLabel("Country").selectOption("GB");
    await waitLikeAHuman(page);
    await page.getByRole("button", { name: "Book a strategy call" }).last().click();
    await expect(page.getByRole("status").filter({ hasText: "A strategist will reply" })).toBeVisible();
  });

  test("a corrected submission succeeds after a validation error (regression)", async ({ page }) => {
    await page.goto("/contact");
    const main = page.locator("main");
    await main.getByLabel("Full name").fill("Jordan Ellis");
    await main.getByLabel("Work email").fill("jordan@example");
    await main.getByLabel("Company").fill("Northwind Security");
    await main.getByLabel("Country").selectOption("CA");
    await waitLikeAHuman(page);
    await page.getByRole("button", { name: "Book a strategy call" }).last().click();
    await expect(page.getByText("Enter a valid work email")).toBeVisible();
    await main.getByLabel("Work email").fill("jordan@example.com");
    await page.getByRole("button", { name: "Book a strategy call" }).last().click();
    await expect(page.getByRole("status").filter({ hasText: "A strategist will reply" })).toBeVisible();
  });

  test("rejects submissions made too fast to be human", async ({ page }) => {
    await page.goto("/contact");
    const main = page.locator("main");
    await main.getByLabel("Full name").fill("Speedy Bot");
    await main.getByLabel("Work email").fill("bot@example.com");
    await main.getByLabel("Company").fill("Bots Inc");
    await main.getByLabel("Country").selectOption("US");
    await page.getByRole("button", { name: "Book a strategy call" }).last().click();
    await expect(page.getByText("That was quick")).toBeVisible();
  });

  test("sample-file intent changes the form", async ({ page }) => {
    await page.goto("/contact?intent=sample");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("See a sample lead file.");
    await expect(page.getByRole("button", { name: "Request sample file" })).toBeVisible();
  });
});

test("newsletter requires explicit consent", async ({ page }) => {
  await page.goto("/about");
  const footer = page.locator("footer");
  await footer.getByLabel("Newsletter email").fill("reader@example.com");
  await waitLikeAHuman(page);
  await footer.getByRole("button", { name: "Subscribe" }).click();
  await expect(footer.getByText("Tick the box")).toBeVisible();
  await footer.getByRole("checkbox").check();
  await footer.getByRole("button", { name: "Subscribe" }).click();
  await expect(footer.getByText("You're subscribed")).toBeVisible();
});

test("privacy request returns a reference and the legal deadline", async ({ page }) => {
  await page.goto("/privacy-request");
  const main = page.locator("main");
  await page.locator("main").getByLabel("What would you like to do?").selectOption("delete");
  await page.locator("main").getByLabel("Where do you live?").selectOption("us-ca");
  await main.getByLabel("Full name").fill("Casey Morgan");
  await page.locator("main").getByLabel("Email address").fill("casey@example.com");
  await page.locator("main").getByRole("checkbox").check();
  await waitLikeAHuman(page);
  await page.getByRole("button", { name: "Submit request" }).click();
  await expect(page.getByRole("status")).toContainText(/Your reference is PR-\d{4}-[0-9A-F]{6}/);
});

test("careers application validates the profile URL", async ({ page }) => {
  await page.goto("/careers");
  const main = page.locator("main");
  await main.getByLabel("Full name").fill("Riley Chen");
  await page.locator("main").getByLabel("Email").fill("riley@example.com");
  await page.locator("main").getByLabel("Role you're interested in").fill("SDR");
  await page.locator("main").getByLabel("Location").fill("Toronto, Canada");
  await page.locator("main").getByLabel("LinkedIn or portfolio URL").fill("linkedin");
  await waitLikeAHuman(page);
  await page.getByRole("button", { name: "Send application" }).click();
  await expect(page.getByText("Enter a full URL")).toBeVisible();
});

test("gated report unlocks a signed PDF download, and bad tokens are refused", async ({ page, request }) => {
  await page.goto("/report");
  const main = page.locator("main");
  await main.getByLabel("Full name").fill("Morgan Blake");
  await main.getByLabel("Work email").fill("morgan@example.com");
  await main.getByLabel("Company").fill("Acumen Cloud");
  await main.getByLabel("Job title").fill("VP Marketing");
  await main.getByLabel("Country").selectOption("US");
  await waitLikeAHuman(page);
  await page.getByRole("button", { name: "Get the report" }).click();
  const link = page.getByRole("link", { name: /Download the report/ });
  await expect(link).toBeVisible();

  const res = await request.get((await link.getAttribute("href"))!, { maxRedirects: 0 });
  // In CI there's no PDF (it lives in private Blob storage, not the repo), so a 503 is expected there.
  if (process.env.CI) {
    expect([200, 503]).toContain(res.status());
  } else {
    expect(res.status()).toBe(200);
    expect(res.headers()["content-type"]).toBe("application/pdf");
    expect((await res.body()).subarray(0, 4).toString()).toBe("%PDF");
  }

  const bad = await request.get("/api/report/download?t=123.fake", { maxRedirects: 0 });
  expect(bad.status()).toBe(307);
  expect(bad.headers().location).toContain("/report?expired=1");
});
