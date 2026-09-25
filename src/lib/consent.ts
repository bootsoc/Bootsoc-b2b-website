export type ConsentState = {
  analytics: boolean;
  advertising: boolean;
  /** Global Privacy Control signal was present when the choice was recorded. */
  gpc: boolean;
  /** When the visitor made an explicit choice; null means defaults are in effect. */
  decidedAt: string | null;
  version: string;
};

export type ConsentRegime = "optin" | "optout";

export const CONSENT_COOKIE = "bs_consent";
export const GEO_COOKIE = "bs_geo";
export const VISITOR_COOKIE = "bs_vid";
export const CONSENT_VERSION = "2026-09-25";

// UK, EU/EEA and Switzerland require prior opt-in for non-essential cookies (UK GDPR/PECR, ePrivacy, revFADP).
const OPT_IN_COUNTRIES = new Set([
  "GB", "UK", "IE", "FR", "DE", "ES", "IT", "PT", "NL", "BE", "LU", "AT", "DK", "SE", "FI", "NO", "IS", "LI",
  "PL", "CZ", "SK", "HU", "SI", "HR", "RO", "BG", "GR", "CY", "MT", "EE", "LV", "LT", "CH",
]);

/** Decide the cookie regime from Vercel's geo headers. Unknown locations get the stricter opt-in regime. */
export function regimeFor(country: string | null, region: string | null): ConsentRegime {
  if (!country) return "optin";
  if (OPT_IN_COUNTRIES.has(country)) return "optin";
  // Quebec's Law 25 requires opt-in for tracking technologies.
  if (country === "CA" && region === "QC") return "optin";
  return "optout";
}

export function defaultConsent(regime: ConsentRegime, gpc: boolean): ConsentState {
  const optOutDefault = regime === "optout";
  return {
    analytics: optOutDefault,
    advertising: optOutDefault && !gpc,
    gpc,
    decidedAt: null,
    version: CONSENT_VERSION,
  };
}

export function parseConsent(raw: string | undefined | null): ConsentState | null {
  if (!raw) return null;
  try {
    const v = JSON.parse(decodeURIComponent(raw)) as ConsentState;
    if (v.version !== CONSENT_VERSION) return null;
    return v;
  } catch {
    return null;
  }
}
