/**
 * Audience model for the estimator. Figures are deliberately rounded, modeled from public labor-force
 * statistics (BLS, ONS, Statistics Canada) for professional roles at companies with 10+ employees.
 * The in-market share applies the 95:5 rule (Ehrenberg-Bass / LinkedIn B2B Institute): roughly 5% of
 * B2B buyers are in-market in any given quarter. Exact counts come from the audience report, not this model.
 */

export type Option = { id: string; label: string; share: number };
export type Group = { id: keyof Selection; label: string; options: Option[] };

export type Selection = {
  regions: string[];
  industries: string[];
  functions: string[];
  seniority: string[];
  sizes: string[];
};

export const regions: Option[] = [
  { id: "us", label: "United States", share: 48_000_000 },
  { id: "uk", label: "United Kingdom", share: 9_500_000 },
  { id: "ca", label: "Canada", share: 5_600_000 },
];

export const groups: Group[] = [
  {
    id: "industries",
    label: "Industry",
    options: [
      { id: "tech", label: "Software and IT", share: 0.09 },
      { id: "fin", label: "Financial services", share: 0.08 },
      { id: "health", label: "Healthcare", share: 0.14 },
      { id: "mfg", label: "Manufacturing", share: 0.1 },
      { id: "retail", label: "Retail and e-commerce", share: 0.08 },
      { id: "prof", label: "Professional services", share: 0.11 },
      { id: "telco", label: "Telecoms and media", share: 0.03 },
      { id: "edu", label: "Education", share: 0.07 },
      { id: "gov", label: "Public sector", share: 0.06 },
      { id: "energy", label: "Energy and utilities", share: 0.02 },
    ],
  },
  {
    id: "functions",
    label: "Job function",
    options: [
      { id: "it", label: "IT", share: 0.06 },
      { id: "sec", label: "Security", share: 0.012 },
      { id: "eng", label: "Engineering", share: 0.07 },
      { id: "mkt", label: "Marketing", share: 0.05 },
      { id: "sales", label: "Sales", share: 0.09 },
      { id: "fin", label: "Finance", share: 0.06 },
      { id: "hr", label: "HR", share: 0.035 },
      { id: "ops", label: "Operations", share: 0.1 },
      { id: "proc", label: "Procurement", share: 0.02 },
      { id: "exec", label: "Executive leadership", share: 0.03 },
    ],
  },
  {
    id: "seniority",
    label: "Seniority",
    options: [
      { id: "c", label: "C-suite", share: 0.04 },
      { id: "vp", label: "VP", share: 0.05 },
      { id: "dir", label: "Director", share: 0.1 },
      { id: "mgr", label: "Manager", share: 0.22 },
      { id: "ic", label: "Individual contributor", share: 0.59 },
    ],
  },
  {
    id: "sizes",
    label: "Company size",
    options: [
      { id: "s", label: "10 to 199", share: 0.35 },
      { id: "m", label: "200 to 999", share: 0.18 },
      { id: "l", label: "1,000 to 4,999", share: 0.15 },
      { id: "xl", label: "5,000+", share: 0.32 },
    ],
  },
];

export const IN_MARKET_SHARE = 0.05;

export const defaultSelection: Selection = {
  regions: ["us", "uk", "ca"],
  industries: ["tech"],
  functions: ["it", "sec"],
  seniority: ["dir", "vp", "c"],
  sizes: ["l", "xl"],
};

function shareOf(options: Option[], ids: string[]) {
  if (ids.length === 0) return 1;
  return options.filter((o) => ids.includes(o.id)).reduce((sum, o) => sum + o.share, 0);
}

/** Rounds to two significant figures so the output never implies false precision. */
export function roundSig(n: number) {
  if (n <= 0) return 0;
  const p = Math.pow(10, Math.floor(Math.log10(n)) - 1);
  return Math.round(n / p) * p;
}

export function estimate(sel: Selection) {
  const base = regions.filter((r) => sel.regions.includes(r.id)).reduce((s, r) => s + r.share, 0);
  const g = Object.fromEntries(groups.map((grp) => [grp.id, grp.options]));
  const reachable =
    base *
    shareOf(g.industries, sel.industries) *
    shareOf(g.functions, sel.functions) *
    shareOf(g.seniority, sel.seniority) *
    shareOf(g.sizes, sel.sizes);
  const inMarket = reachable * IN_MARKET_SHARE;
  return {
    reachable: { low: roundSig(reachable * 0.85), high: roundSig(reachable * 1.15) },
    inMarket: { low: roundSig(inMarket * 0.85), high: roundSig(inMarket * 1.15) },
    raw: reachable,
  };
}

export function recommend(sel: Selection, inMarket: number) {
  const recs: { slug: string; label: string; why: string }[] = [];
  if (inMarket < 2_500) {
    recs.push({ slug: "account-based-marketing", label: "Account-based marketing", why: "A focused audience rewards committee-level personalisation." });
    recs.push({ slug: "programmatic-display", label: "BootSoc Reach", why: "Keep every target account warm between touches." });
  } else {
    recs.push({ slug: "content-syndication", label: "Content syndication", why: "Enough in-market buyers to scale verified leads quickly." });
    recs.push({ slug: "intent-data", label: "BootSoc Signal", why: "Prioritise the surging accounts inside a broad audience." });
  }
  if (sel.seniority.some((s) => s === "c" || s === "vp")) {
    recs.push({ slug: "appointment-setting", label: "Appointment setting", why: "Senior buyers respond best to a direct, well-briefed conversation." });
  } else {
    recs.push({ slug: "demand-generation", label: "Demand generation", why: "Nurture practitioners from first read to qualified conversation." });
  }
  return recs;
}

export const compact = (n: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", maximumFractionDigits: 1 }).format(n);
