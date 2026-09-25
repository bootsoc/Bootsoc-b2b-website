import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";

const regions = [
  {
    code: "US",
    name: "United States",
    laws: ["CCPA / CPRA", "20 state privacy laws", "CAN-SPAM", "TCPA", "Global Privacy Control"],
    body: "Consented opt-in on every lead, state-by-state opt-out handling and suppression synced before each delivery.",
  },
  {
    code: "UK",
    name: "United Kingdom",
    laws: ["UK GDPR", "Data (Use and Access) Act 2025", "PECR", "TPS / CTPS"],
    body: "Lawful basis recorded per record, PECR-compliant email to corporate subscribers, and screened calling lists.",
  },
  {
    code: "CA",
    name: "Canada",
    laws: ["PIPEDA", "Quebec Law 25", "CASL", "DNCL"],
    body: "Express consent captured for commercial messages, sender identification on every email, and Quebec opt-in rules.",
  },
];

export function Regions() {
  return (
    <section aria-labelledby="regions-heading" className="shell py-20 md:py-28">
      <SplitHeading id="regions-heading" className="display max-w-[15ch] text-[clamp(2.75rem,5.5vw,5rem)]">
        Built for the rules in every market we serve.
      </SplitHeading>
      <RevealGroup className="mt-12 divide-y divide-line border-y border-line">
        {regions.map((r) => (
          <RevealItem key={r.code} className="grid gap-6 py-8 md:grid-cols-[8rem_1fr_1.2fr] md:items-baseline md:gap-10">
            <p className="display text-6xl text-signal [[data-theme=light]_&]:text-fg" aria-hidden="true">
              {r.code}
            </p>
            <div>
              <h3 className="text-xl font-medium">{r.name}</h3>
              <p className="mt-2 max-w-[44ch] text-muted">{r.body}</p>
            </div>
            <ul className="flex flex-wrap gap-2" aria-label={`${r.name} regulations`}>
              {r.laws.map((l) => (
                <li key={l} className="rounded-full px-3.5 py-1.5 text-sm ring-1 ring-line">
                  {l}
                </li>
              ))}
            </ul>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
