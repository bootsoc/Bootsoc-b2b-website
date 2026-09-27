"use server";

import { randomBytes } from "node:crypto";
import { z } from "zod";
import { sql } from "@/lib/db";
import { notifyTeam } from "@/lib/notify";
import { requestMeta } from "@/lib/request";
import { site } from "@/content/site";
import { report } from "@/content/report";
import { signReportToken } from "@/lib/report-token";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  reference?: string;
  downloadUrl?: string;
};

const MIN_FILL_MS = 2500;
const RATE_LIMIT = 6;

const text = (max: number) => z.string().trim().max(max);
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .optional()
    .transform((v) => (v ? v : undefined));

const email = z.string().trim().toLowerCase().email("Enter a valid work email, like name@company.com.").max(254);

function fieldErrors(error: z.ZodError): Record<string, string> {
  const out: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = String(issue.path[0] ?? "form");
    out[key] ??= issue.message;
  }
  return out;
}

type Guard = { ok: true; meta: Awaited<ReturnType<typeof requestMeta>> } | { ok: false; state: FormState };

/** Honeypot, fill-time, Turnstile (when configured) and per-IP rate limiting. */
async function guard(formData: FormData): Promise<Guard> {
  const meta = await requestMeta();
  const bot: FormState = { status: "success", message: "Thanks. We'll be in touch shortly." };

  if (formData.get("bs_hp_check")) return { ok: false, state: bot };
  const started = Number(formData.get("_t"));
  if (!started || Date.now() - started < MIN_FILL_MS) {
    return { ok: false, state: { status: "error", message: "That was quick. Wait a moment, then send the form again." } };
  }

  if (process.env.TURNSTILE_SECRET_KEY) {
    const token = String(formData.get("cf-turnstile-response") ?? "");
    // The widget loads when the visitor starts on the form, so a very fast submit can beat the token.
    if (!token) {
      return { ok: false, state: { status: "error", message: "Still checking you're human. Wait a second, then send the form again." } };
    }
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: new URLSearchParams({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
    }).then((r) => r.json() as Promise<{ success: boolean }>).catch(() => ({ success: false }));
    if (!res.success) {
      return { ok: false, state: { status: "error", message: "We couldn't verify you're human. Refresh the page and try again." } };
    }
  }

  const db = sql();
  if (db && meta.ipHash) {
    const rows = (await db`
      select count(*)::int as n from leads where ip_hash = ${meta.ipHash} and created_at > now() - interval '10 minutes'
    `) as { n: number }[];
    if ((rows[0]?.n ?? 0) >= RATE_LIMIT) {
      return { ok: false, state: { status: "error", message: "Too many submissions from your network. Try again in a few minutes." } };
    }
  }
  return { ok: true, meta };
}

function utmFrom(formData: FormData) {
  const raw = String(formData.get("_utm") ?? "");
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    return Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k.slice(0, 40), String(v).slice(0, 200)]));
  } catch {
    return null;
  }
}

const MARKETING_CONSENT_TEXT =
  "Yes, BootSoc may email me insights, event invitations and offers. I can unsubscribe at any time.";

const leadSchema = z.object({
  kind: z.enum(["contact", "sample"]),
  name: text(120).min(2, "Enter your full name."),
  email,
  company: text(160).min(2, "Enter your company name."),
  jobTitle: optionalText(160),
  country: z.enum(["US", "GB", "CA", "Other"], { message: "Choose your country." }),
  interest: optionalText(80),
  message: optionalText(4000),
  marketingConsent: z.boolean(),
});

export async function submitLead(_prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData);
  if (!g.ok) return g.state;

  const parsed = leadSchema.safeParse({
    kind: formData.get("kind") ?? "contact",
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    jobTitle: formData.get("jobTitle") ?? undefined,
    country: formData.get("country") ?? "",
    interest: formData.get("interest") ?? undefined,
    message: formData.get("message") ?? undefined,
    marketingConsent: formData.get("marketingConsent") === "on",
  });
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  }
  const d = parsed.data;
  const db = sql();
  if (db) {
    await db`
      insert into leads (kind, name, email, company, job_title, country, message, payload, marketing_consent, consent_text, policy_version, source_path, utm, ip_hash, geo_country, geo_region, user_agent)
      values (${d.kind}, ${d.name}, ${d.email}, ${d.company}, ${d.jobTitle ?? null}, ${d.country}, ${d.message ?? null},
        ${JSON.stringify({ interest: d.interest ?? null })}::jsonb, ${d.marketingConsent},
        ${d.marketingConsent ? MARKETING_CONSENT_TEXT : null}, ${site.policyVersion}, ${String(formData.get("_path") ?? "")},
        ${JSON.stringify(utmFrom(formData))}::jsonb, ${g.meta.ipHash}, ${g.meta.country}, ${g.meta.region}, ${g.meta.userAgent})
    `;
  }
  await notifyTeam({
    subject: `${d.kind === "sample" ? "Sample lead file request" : "New enquiry"}: ${d.company}`,
    replyTo: d.email,
    text: [
      `Name: ${d.name}`,
      `Email: ${d.email}`,
      `Company: ${d.company}`,
      `Title: ${d.jobTitle ?? "-"}`,
      `Country: ${d.country}`,
      `Interest: ${d.interest ?? "-"}`,
      `Marketing consent: ${d.marketingConsent ? "yes" : "no"}`,
      "",
      d.message ?? "",
    ].join("\n"),
  });

  return {
    status: "success",
    message:
      d.kind === "sample"
        ? "Request received. We'll email a sample file that matches your spec within one business day."
        : "Thanks. A strategist will reply within one business day to set up your call.",
  };
}

const estimatorSchema = z.object({
  name: text(120).min(2, "Enter your full name."),
  email,
  company: text(160).min(2, "Enter your company name."),
  selection: z.string().max(4000),
  marketingConsent: z.boolean(),
});

export async function submitEstimator(_prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData);
  if (!g.ok) return g.state;
  const parsed = estimatorSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    selection: formData.get("selection") ?? "{}",
    marketingConsent: formData.get("marketingConsent") === "on",
  });
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  }
  const d = parsed.data;
  let selection: unknown = {};
  try {
    selection = JSON.parse(d.selection);
  } catch {}
  const db = sql();
  if (db) {
    await db`
      insert into leads (kind, name, email, company, payload, marketing_consent, consent_text, policy_version, source_path, utm, ip_hash, geo_country, geo_region, user_agent)
      values ('estimator', ${d.name}, ${d.email}, ${d.company}, ${JSON.stringify(selection)}::jsonb, ${d.marketingConsent},
        ${d.marketingConsent ? MARKETING_CONSENT_TEXT : null}, ${site.policyVersion}, '/audience-estimator',
        ${JSON.stringify(utmFrom(formData))}::jsonb, ${g.meta.ipHash}, ${g.meta.country}, ${g.meta.region}, ${g.meta.userAgent})
    `;
  }
  await notifyTeam({
    subject: `Audience estimate request: ${d.company}`,
    replyTo: d.email,
    text: `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company}\n\nSelection:\n${JSON.stringify(selection, null, 2)}`,
  });
  return {
    status: "success",
    message: "Your audience report is on its way. A strategist will confirm exact counts within one business day.",
  };
}

const newsletterSchema = z.object({
  email,
  consent: z.literal(true, { message: "Tick the box to confirm you'd like to subscribe." }),
});

export async function subscribeNewsletter(_prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData);
  if (!g.ok) return g.state;
  const parsed = newsletterSchema.safeParse({
    email: formData.get("email") ?? "",
    consent: formData.get("consent") === "on",
  });
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  }
  const db = sql();
  if (db) {
    await db`
      insert into leads (kind, email, marketing_consent, consent_text, policy_version, source_path, ip_hash, geo_country, geo_region, user_agent)
      values ('newsletter', ${parsed.data.email}, true, 'Subscribe me to BootSoc monthly demand-gen notes.', ${site.policyVersion},
        ${String(formData.get("_path") ?? "")}, ${g.meta.ipHash}, ${g.meta.country}, ${g.meta.region}, ${g.meta.userAgent})
    `;
  }
  return { status: "success", message: "You're subscribed. Look out for the next issue." };
}

const careersSchema = z.object({
  name: text(120).min(2, "Enter your full name."),
  email,
  role: text(120).min(2, "Tell us which role you're interested in."),
  location: text(120).min(2, "Enter your city and country."),
  profileUrl: z.string().trim().url("Enter a full URL, like https://linkedin.com/in/you.").max(300),
  message: optionalText(3000),
});

export async function submitApplication(_prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData);
  if (!g.ok) return g.state;
  const parsed = careersSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    role: formData.get("role") ?? "",
    location: formData.get("location") ?? "",
    profileUrl: formData.get("profileUrl") ?? "",
    message: formData.get("message") ?? undefined,
  });
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  }
  const d = parsed.data;
  const db = sql();
  if (db) {
    await db`
      insert into leads (kind, name, email, message, payload, policy_version, source_path, ip_hash, geo_country, geo_region, user_agent)
      values ('careers', ${d.name}, ${d.email}, ${d.message ?? null}, ${JSON.stringify({ role: d.role, location: d.location, profileUrl: d.profileUrl })}::jsonb,
        ${site.policyVersion}, '/careers', ${g.meta.ipHash}, ${g.meta.country}, ${g.meta.region}, ${g.meta.userAgent})
    `;
  }
  await notifyTeam({
    subject: `Job application: ${d.role} (${d.name})`,
    replyTo: d.email,
    text: `Name: ${d.name}\nEmail: ${d.email}\nRole: ${d.role}\nLocation: ${d.location}\nProfile: ${d.profileUrl}\n\n${d.message ?? ""}`,
  });
  return { status: "success", message: "Application received. If there's a fit, our team will reach out within two weeks." };
}

const privacySchema = z.object({
  requestType: z.enum(["access", "delete", "correct", "opt_out", "limit", "appeal", "unsubscribe"], {
    message: "Choose a request type.",
  }),
  jurisdiction: z.enum(["us-ca", "us-other", "uk", "eu", "ca-qc", "ca-other", "other"], { message: "Choose where you live." }),
  fullName: text(120).min(2, "Enter your full name."),
  email,
  company: optionalText(160),
  details: optionalText(4000),
  attest: z.literal(true, { message: "Confirm the information is accurate." }),
});

/** Statutory response windows: CCPA/US states 45 days, UK/EU GDPR one month, PIPEDA and Law 25 30 days. */
function dueDate(jurisdiction: string) {
  const d = new Date();
  if (jurisdiction.startsWith("us")) d.setDate(d.getDate() + 45);
  else if (jurisdiction === "uk" || jurisdiction === "eu") d.setMonth(d.getMonth() + 1);
  else d.setDate(d.getDate() + 30);
  return d;
}

export async function submitPrivacyRequest(_prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData);
  if (!g.ok) return g.state;
  const parsed = privacySchema.safeParse({
    requestType: formData.get("requestType") ?? "",
    jurisdiction: formData.get("jurisdiction") ?? "",
    fullName: formData.get("fullName") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? undefined,
    details: formData.get("details") ?? undefined,
    attest: formData.get("attest") === "on",
  });
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  }
  const d = parsed.data;
  const reference = `PR-${new Date().getFullYear()}-${randomBytes(3).toString("hex").toUpperCase()}`;
  const due = dueDate(d.jurisdiction);
  const db = sql();
  if (db) {
    await db`
      insert into privacy_requests (reference, request_type, jurisdiction, full_name, email, company, details, due_at, ip_hash)
      values (${reference}, ${d.requestType}, ${d.jurisdiction}, ${d.fullName}, ${d.email}, ${d.company ?? null}, ${d.details ?? null}, ${due.toISOString()}, ${g.meta.ipHash})
    `;
    if (d.requestType === "unsubscribe" || d.requestType === "opt_out" || d.requestType === "delete") {
      await db`
        insert into suppression (email, reason, source) values (${d.email}, ${d.requestType}, ${reference})
        on conflict (email) do nothing
      `;
    }
  }
  await notifyTeam({
    subject: `Privacy request ${reference}: ${d.requestType} (${d.jurisdiction})`,
    replyTo: d.email,
    text: `Reference: ${reference}\nType: ${d.requestType}\nJurisdiction: ${d.jurisdiction}\nName: ${d.fullName}\nEmail: ${d.email}\nCompany: ${d.company ?? "-"}\nRespond by: ${due.toDateString()}\n\n${d.details ?? ""}`,
  });
  return {
    status: "success",
    reference,
    message: `Request received. Your reference is ${reference}. We'll verify your identity by email and respond by ${due.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}.`,
  };
}

const reportSchema = z.object({
  name: text(120).min(2, "Enter your full name."),
  email,
  company: text(160).min(2, "Enter your company name."),
  jobTitle: text(160).min(2, "Enter your job title."),
  country: z.enum(["US", "GB", "CA", "Other"], { message: "Choose your country." }),
  marketingConsent: z.boolean(),
});

/** Gated report: records the lead, then returns a signed, expiring download link. */
export async function requestReport(_prev: FormState, formData: FormData): Promise<FormState> {
  const g = await guard(formData);
  if (!g.ok) return g.state;
  const parsed = reportSchema.safeParse({
    name: formData.get("name") ?? "",
    email: formData.get("email") ?? "",
    company: formData.get("company") ?? "",
    jobTitle: formData.get("jobTitle") ?? "",
    country: formData.get("country") ?? "",
    marketingConsent: formData.get("marketingConsent") === "on",
  });
  if (!parsed.success) {
    return { status: "error", message: "Check the highlighted fields.", fieldErrors: fieldErrors(parsed.error) };
  }
  const d = parsed.data;
  const db = sql();
  if (db) {
    await db`
      insert into leads (kind, name, email, company, job_title, country, payload, marketing_consent, consent_text, policy_version, source_path, utm, ip_hash, geo_country, geo_region, user_agent)
      values ('report', ${d.name}, ${d.email}, ${d.company}, ${d.jobTitle}, ${d.country}, ${JSON.stringify({ report: report.slug })}::jsonb,
        ${d.marketingConsent}, ${d.marketingConsent ? MARKETING_CONSENT_TEXT : null}, ${site.policyVersion}, ${String(formData.get("_path") ?? "")},
        ${JSON.stringify(utmFrom(formData))}::jsonb, ${g.meta.ipHash}, ${g.meta.country}, ${g.meta.region}, ${g.meta.userAgent})
    `;
  }
  await notifyTeam({
    subject: `Report download: ${d.company} (${d.jobTitle})`,
    replyTo: d.email,
    text: `Name: ${d.name}\nEmail: ${d.email}\nCompany: ${d.company}\nTitle: ${d.jobTitle}\nCountry: ${d.country}\nMarketing consent: ${d.marketingConsent ? "yes" : "no"}`,
  });
  return {
    status: "success",
    message: "Your report is ready. The download link below works for the next 7 days.",
    downloadUrl: `/api/report/download?t=${signReportToken()}`,
  };
}
