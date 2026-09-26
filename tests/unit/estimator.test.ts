import { describe, expect, it } from "vitest";
import { IN_MARKET_SHARE, defaultSelection, estimate, recommend, roundSig } from "@/lib/estimator";

describe("roundSig", () => {
  it("rounds to two significant figures", () => {
    expect(roundSig(12_345)).toBe(12_000);
    expect(roundSig(987)).toBe(990);
    expect(roundSig(0)).toBe(0);
  });
});

describe("estimate", () => {
  it("returns an ordered low/high range with in-market at about 5% of reachable", () => {
    const r = estimate(defaultSelection);
    expect(r.reachable.low).toBeLessThan(r.reachable.high);
    expect(r.inMarket.high).toBeLessThanOrEqual(r.reachable.high);
    expect(r.inMarket.high / r.reachable.high).toBeCloseTo(IN_MARKET_SHARE, 1);
  });
  it("treats an empty filter group as all options", () => {
    const narrow = estimate({ ...defaultSelection, industries: ["tech"] }).raw;
    const all = estimate({ ...defaultSelection, industries: [] }).raw;
    expect(all).toBeGreaterThan(narrow);
  });
  it("grows when more regions are added", () => {
    const us = estimate({ ...defaultSelection, regions: ["us"] }).raw;
    const three = estimate({ ...defaultSelection, regions: ["us", "uk", "ca"] }).raw;
    expect(three).toBeGreaterThan(us);
  });
});

describe("recommend", () => {
  it("suggests ABM for small in-market audiences and syndication for large ones", () => {
    expect(recommend(defaultSelection, 1_000).map((r) => r.slug)).toContain("account-based-marketing");
    expect(recommend(defaultSelection, 50_000).map((r) => r.slug)).toContain("content-syndication");
  });
  it("adds appointment setting when senior buyers are targeted", () => {
    expect(recommend({ ...defaultSelection, seniority: ["c"] }, 10_000).map((r) => r.slug)).toContain("appointment-setting");
  });
});
