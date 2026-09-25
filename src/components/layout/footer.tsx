import Link from "next/link";
import { LinkedinLogoIcon } from "@phosphor-icons/react/dist/ssr";
import { Wordmark } from "@/components/brand/logo";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { PrivacyChoicesLink } from "@/components/consent/privacy-choices-link";
import { footerNav, site } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-line bg-bg pb-10 pt-16 md:mt-32">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-sm">
            <Link href="/" aria-label="BootSoc home" className="inline-block text-signal [[data-theme=light]_&]:text-fg">
              <Wordmark className="h-8" />
            </Link>
            <p className="mt-5 text-muted">
              Verified B2B pipeline for technology companies selling into the US, UK and Canada.
            </p>
            <div className="mt-8">
              <h2 className="text-sm font-medium">Monthly demand-gen notes</h2>
              <p className="mt-1 text-sm text-muted">Benchmarks and playbooks. No spam, unsubscribe any time.</p>
              <NewsletterForm />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            {footerNav.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h2 className="text-sm font-medium">{col.title}</h2>
                <ul className="mt-4 grid gap-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-sm text-muted transition-colors hover:text-fg">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                  {col.title === "Trust & legal" && (
                    <li>
                      <PrivacyChoicesLink />
                    </li>
                  )}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-16 grid gap-6 border-t border-line pt-8 text-sm text-muted md:grid-cols-[1fr_auto] md:items-end">
          <address className="not-italic leading-relaxed">
            {site.legalName}
            <br />
            {site.address.street}, {site.address.city}, {site.address.region} {site.address.postalCode}, USA
            <br />
            <a href={`mailto:${site.email}`} className="hover:text-fg">
              {site.email}
            </a>
          </address>
          <div className="flex items-center gap-5">
            <a
              href={site.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="BootSoc on LinkedIn"
              className="grid size-11 place-items-center rounded-full ring-1 ring-line hover:text-fg"
            >
              <LinkedinLogoIcon size={18} aria-hidden="true" />
            </a>
            <p>
              © {new Date().getFullYear()} {site.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
