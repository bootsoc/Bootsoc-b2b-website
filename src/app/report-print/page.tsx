import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Wordmark, Mark } from "@/components/brand/logo";
import { report, reportSections, reportSources } from "@/content/report";
import { site, certifications } from "@/content/site";

export const metadata: Metadata = { title: "Report print", robots: { index: false, follow: false } };

/** Print layout for generating the gated report PDF (`npm run report:pdf`). Not served in production. */
export default function ReportPrint() {
  if (process.env.NODE_ENV === "production" && !process.env.REPORT_PRINT) notFound();
  const published = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(new Date(`${report.published}T12:00:00Z`));

  return (
    <div id="report" className="report">
      <style>{`
        @page { size: Letter; margin: 0.75in 0.8in 0.8in; }
        @page :first { margin: 0; }
        html, body { background: #fff !important; }
        header, footer, [aria-label="Cookie choices"], .grain::after { display: none !important; }
        body.grain::after { display: none !important; }
        .report { color: #0b0b0a; font-family: var(--font-sans); }
        .rcover { width: 8.5in; height: 11in; padding: 0.75in 0.8in; box-sizing: border-box; break-after: page; }
        .rpage { break-inside: auto; margin-bottom: 34px; }
        .rpage.newpage { break-before: page; }
        .rpage h2 { font-family: var(--font-display); font-weight: 600; font-size: 28px; letter-spacing: -0.01em; word-spacing: 0.12em; line-height: 1.1; margin: 0 0 16px; break-after: avoid; }
        .rpage table, .rpage li { break-inside: avoid; }
        .rpage p { font-size: 12.5px; line-height: 1.65; margin: 0 0 12px; color: #2a2a26; }
        .rpage ul { margin: 6px 0 14px; padding: 0; list-style: none; }
        .rpage li { font-size: 12.5px; line-height: 1.55; padding: 7px 0 7px 22px; position: relative; border-top: 1px solid #e6e6e1; color: #2a2a26; }
        .rpage li::before { content: ""; position: absolute; left: 0; top: 13px; width: 10px; height: 10px; border-radius: 99px; background: #fff100; box-shadow: inset 0 0 0 1.5px #0b0b0a; }
        .rpage table { width: 100%; border-collapse: collapse; margin: 10px 0 16px; font-size: 11px; }
        .rpage th { text-align: left; background: #0b0b0a; color: #fff100; padding: 8px 10px; font-weight: 600; }
        .rpage td { padding: 9px 10px; border-bottom: 1px solid #e6e6e1; vertical-align: top; line-height: 1.5; color: #2a2a26; }
        .rpage tr:nth-child(even) td { background: #f7f7f3; }
        .ord { counter-reset: q; }
        .ord li { counter-increment: q; padding-left: 30px; }
        .ord li::before { content: counter(q); width: 20px; height: 20px; top: 6px; font-size: 10px; font-weight: 700; display: grid; place-items: center; box-shadow: none; }
      `}</style>

      {/* Cover */}
      <section className="rcover" style={{ background: "#0b0b0a", color: "#f4f4ef", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div style={{ color: "#fff100" }}>
          <Wordmark className="h-8" />
        </div>
        <div>
          <p style={{ color: "#fff100", fontSize: 14, fontWeight: 600, margin: "0 0 18px" }}>{published}</p>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 64, lineHeight: 1.02, letterSpacing: "-0.01em", wordSpacing: "0.12em", margin: 0, color: "#f4f4ef" }}>
            The 2026 B2B <span style={{ color: "#fff100" }}>Lead Quality</span> Report
          </h1>
          <p style={{ color: "#c9c9c0", fontSize: 17, lineHeight: 1.5, marginTop: 24, maxWidth: "30em" }}>{report.subtitle}</p>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <p style={{ color: "#a1a197", fontSize: 11, margin: 0, maxWidth: "28em" }}>
            Includes: the 95:5 buying reality, a five-check verification standard, US/UK/Canada rules on one page, intent plays, a vendor scorecard and pipeline KPIs.
          </p>
          <div style={{ width: 120, height: 120, borderRadius: 999, background: "#fff100", color: "#0b0b0a", display: "grid", placeItems: "center" }}>
            <Mark className="size-16" />
          </div>
        </div>
      </section>

      {/* Contents + method */}
      <section className="rpage">
        <h2>Contents</h2>
        <ul>
          {reportSections.map((s) => (
            <li key={s.id}>{s.title}</li>
          ))}
          <li>Sources</li>
        </ul>
        <h2 style={{ marginTop: 36 }}>About this report</h2>
        <p>
          This report synthesises published research on B2B buying behaviour with primary legal sources for the United States, United Kingdom and
          Canada, current as of {published}. It reflects the operating standards BootSoc applies to its own programs. It does not contain survey data,
          and it is not legal advice.
        </p>
      </section>

      {reportSections.map((s) => (
        <section key={s.id} className={["summary", "rules", "scorecard"].includes(s.id) ? "rpage newpage" : "rpage"}>
          <h2>{s.title}</h2>
          {s.paragraphs?.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          {s.table && (
            <table>
              <thead>
                <tr>{s.table.head.map((h) => <th key={h}>{h}</th>)}</tr>
              </thead>
              <tbody>
                {s.table.rows.map((r) => (
                  <tr key={r[0]}>{r.map((c) => <td key={c.slice(0, 30)}>{c}</td>)}</tr>
                ))}
              </tbody>
            </table>
          )}
          {s.bullets && <ul className={s.id === "scorecard" ? "ord" : undefined}>{s.bullets.map((b) => <li key={b.slice(0, 30)}>{b}</li>)}</ul>}
        </section>
      ))}

      {/* Sources + about */}
      <section className="rpage newpage">
        <h2>Sources</h2>
        <ul>{reportSources.map((s) => <li key={s.slice(0, 30)}>{s}</li>)}</ul>
        <div style={{ marginTop: 40, background: "#0b0b0a", color: "#f4f4ef", borderRadius: 24, padding: 32 }}>
          <div style={{ color: "#fff100" }}><Wordmark className="h-6" /></div>
          <p style={{ color: "#c9c9c0", marginTop: 16 }}>
            BootSoc runs intent-led content syndication, demand generation and ABM programs for B2B technology companies across the US, UK and
            Canada. Every lead is consented, human-verified and delivered to your spec. {certifications.map((c) => c.name).join(", ")} certified.
          </p>
          <p style={{ color: "#fff100", fontWeight: 600, margin: 0 }}>Book a strategy call: bootsoc.com/contact · {site.email}</p>
        </div>
        <p style={{ marginTop: 24, fontSize: 10, color: "#77776f" }}>© {new Date().getFullYear()} {site.legalName}. You may share this report internally with attribution.</p>
      </section>
    </div>
  );
}
