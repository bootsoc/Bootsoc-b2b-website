import Link from "next/link";
import { site } from "@/content/site";

export type LegalSection = { id: string; title: string; body: React.ReactNode };

const effective = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" }).format(new Date(`${site.policyVersion}T12:00:00Z`));

export function LegalPage({
  title,
  intro,
  sections,
  children,
}: {
  title: string;
  intro?: React.ReactNode;
  sections: LegalSection[];
  children?: React.ReactNode;
}) {
  return (
    <div className="shell pb-8 pt-32 md:pt-40">
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <Link href="/trust" className="hover:text-fg">
          Data and trust
        </Link>
        <span aria-hidden="true"> / </span>
        <span className="text-fg">{title}</span>
      </nav>
      <h1 className="display mt-6 max-w-[18ch] animate-fade-up text-[clamp(2.75rem,6vw,5.5rem)]">{title}</h1>
      <p className="mt-5 text-sm text-muted">
        Effective and last updated <time dateTime={site.policyVersion}>{effective}</time>
      </p>
      <div className="mt-12 grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-20">
        {sections.length > 3 && (
          <nav aria-label="On this page" className="hidden lg:block">
            <div className="sticky top-32">
              <p className="text-sm font-medium">On this page</p>
              <ol className="mt-4 grid gap-2.5 border-l border-line pl-4 text-sm">
                {sections.map((s) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="text-muted hover:text-fg">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        )}
        <div className="prose-bs min-w-0">
          {intro}
          {children}
          {sections.map((s) => (
            <section key={s.id} aria-labelledby={s.id}>
              <h2 id={s.id}>{s.title}</h2>
              {s.body}
            </section>
          ))}
          <p className="mt-16 text-sm text-muted">
            Questions about this page? Email <a href={`mailto:${site.privacyEmail}`}>{site.privacyEmail}</a> or write to {site.legalName},{" "}
            {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}, USA.
          </p>
        </div>
      </div>
    </div>
  );
}
