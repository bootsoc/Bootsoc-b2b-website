import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));
const { signReportToken, verifyReportToken } = await import("@/lib/report-token");

describe("report download tokens", () => {
  it("accepts a fresh token", () => {
    expect(verifyReportToken(signReportToken())).toBe(true);
  });
  it("rejects expired, tampered and missing tokens", () => {
    const old = signReportToken(Date.now() - 8 * 24 * 60 * 60 * 1000);
    expect(verifyReportToken(old)).toBe(false);
    const [exp, mac] = signReportToken().split(".");
    expect(verifyReportToken(`${Number(exp) + 1000}.${mac}`)).toBe(false);
    expect(verifyReportToken(null)).toBe(false);
    expect(verifyReportToken("garbage")).toBe(false);
  });
});
