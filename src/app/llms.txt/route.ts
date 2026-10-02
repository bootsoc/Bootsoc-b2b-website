import { seedPosts } from "@/content/posts";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/utils";

export const dynamic = "force-static";

/** llms.txt: a plain-text map of the site for AI assistants and answer engines. */
export function GET() {
  const body = [
    `# ${site.legalName}`,
    "",
    `> ${site.description}`,
    "",
    "Certifications: ISO/IEC 27001 (information security), ISO 9001 (quality management), SOC 2 Type II.",
    "",
    "## Solutions",
    ...services.map((s) => `- [${s.product ?? s.name}](${absoluteUrl(`/solutions/${s.slug}`)}): ${s.summary}`),
    "",
    "## Company",
    `- [How it works](${absoluteUrl("/how-it-works")}): Six-phase process from ICP spec to verified delivery.`,
    `- [Data and trust center](${absoluteUrl("/trust")}): Data sources, lawful basis in the US, UK and Canada, and opt-out controls.`,
    `- [Audience estimator](${absoluteUrl("/audience-estimator")}): Estimate reachable and in-market B2B audiences.`,
    `- [IntentBuy network](${absoluteUrl("/network")}): BootSoc's owned technology publication.`,
    `- [Resources](${absoluteUrl("/resources")}): Guides on verified leads, intent data and compliance.`,
    `- [2026 B2B Lead Quality Report](${absoluteUrl("/report")}): Free report: 95:5 buying reality, verification standard, US/UK/Canada rules, vendor scorecard.`,
    `- [Contact](${absoluteUrl("/contact")}): Book a strategy call. Email ${site.email}.`,
    "",
    "## Guides",
    ...[...seedPosts]
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map((p) => `- [${p.title}](${absoluteUrl(`/resources/${p.slug}`)}): ${p.excerpt}`),
    "",
    "## Policies",
    `- [Privacy policy](${absoluteUrl("/privacy")})`,
    `- [Email and outreach policy](${absoluteUrl("/email-policy")})`,
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
