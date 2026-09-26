import { describe, expect, it } from "vitest";
import { CONSENT_VERSION, defaultConsent, parseConsent, regimeFor } from "@/lib/consent";

describe("regimeFor", () => {
  it("requires opt-in in the UK, EU and Switzerland", () => {
    for (const c of ["GB", "IE", "DE", "FR", "CH", "NO"]) expect(regimeFor(c, null)).toBe("optin");
  });
  it("requires opt-in in Quebec but not elsewhere in Canada", () => {
    expect(regimeFor("CA", "QC")).toBe("optin");
    expect(regimeFor("CA", "ON")).toBe("optout");
  });
  it("uses opt-out in the US", () => {
    expect(regimeFor("US", "CA")).toBe("optout");
  });
  it("falls back to the stricter opt-in regime when location is unknown", () => {
    expect(regimeFor(null, null)).toBe("optin");
  });
});

describe("defaultConsent", () => {
  it("loads nothing optional by default under opt-in", () => {
    expect(defaultConsent("optin", false)).toMatchObject({ analytics: false, advertising: false, decidedAt: null });
  });
  it("defaults to on under opt-out, but GPC switches advertising off", () => {
    expect(defaultConsent("optout", false)).toMatchObject({ analytics: true, advertising: true });
    expect(defaultConsent("optout", true)).toMatchObject({ analytics: true, advertising: false, gpc: true });
  });
});

describe("parseConsent", () => {
  it("round-trips a stored choice", () => {
    const v = { analytics: true, advertising: false, gpc: false, decidedAt: "2026-09-26T00:00:00Z", version: CONSENT_VERSION };
    expect(parseConsent(encodeURIComponent(JSON.stringify(v)))).toEqual(v);
  });
  it("discards choices recorded under an older policy version, forcing a re-prompt", () => {
    const v = { analytics: true, advertising: true, gpc: false, decidedAt: "2025-01-01T00:00:00Z", version: "2025-01-01" };
    expect(parseConsent(JSON.stringify(v))).toBeNull();
  });
  it("ignores malformed cookies", () => {
    expect(parseConsent("%%%not-json")).toBeNull();
    expect(parseConsent(undefined)).toBeNull();
  });
});
