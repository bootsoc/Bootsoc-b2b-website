import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { certifications } from "@/content/site";
import { CertSeal } from "@/components/sections/certifications";
import { SplitHeading } from "@/components/motion/split-heading";

const markets = [
  { code: "US", laws: "CCPA / CPRA, CAN-SPAM, TCPA, GPC" },
  { code: "UK", laws: "UK GDPR, PECR, TPS / CTPS" },
  { code: "CA", laws: "CASL, PIPEDA, Quebec Law 25" },
];

/** Home-page summary of certifications and market coverage. The full detail lives on /trust. */
export function TrustStrip() {
  return (
    <section aria-labelledby="trust-strip-heading" className="shell py-20 md:py-28">
      <div className="rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line">
        <div className="grid gap-10 rounded-[calc(2rem-6px)] bg-raise p-6 md:p-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col justify-between gap-8">
            <div>
              <SplitHeading id="trust-strip-heading" className="display max-w-[14ch] text-[clamp(2.25rem,4.5vw,3.75rem)]">
                Audited security, built for three markets.
              </SplitHeading>
              <p className="mt-5 max-w-[44ch] text-lg text-muted">
                Your prospect data sits inside an independently audited program, with separate playbooks for US, UK and
                Canadian law.
              </p>
            </div>
            <Link
              href="/trust"
              className="group inline-flex min-h-11 w-fit items-center gap-2 font-medium underline decoration-line underline-offset-4 transition-colors hover:decoration-signal"
            >
              Visit the trust center
              <ArrowUpRightIcon size={16} weight="bold" aria-hidden="true" className="transition-transform duration-300 group-hover:rotate-45" />
            </Link>
          </div>

          <div className="grid content-start gap-8">
            <ul aria-label="Certifications" className="grid grid-cols-3 gap-3">
              {certifications.map((c) => (
                <li key={c.id} className="grid justify-items-start gap-3">
                  <CertSeal top={c.top} code={c.code} size="sm" />
                  <span className="text-sm font-medium leading-snug">{c.name}</span>
                </li>
              ))}
            </ul>
            <ul aria-label="Markets covered" className="grid gap-2">
              {markets.map((m) => (
                <li key={m.code} className="grid grid-cols-[3.5rem_1fr] items-baseline gap-4 rounded-2xl bg-bg/60 px-5 py-4">
                  <span className="display-md text-2xl text-signal [[data-theme=light]_&]:text-fg">{m.code}</span>
                  <span className="text-sm text-muted">{m.laws}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
