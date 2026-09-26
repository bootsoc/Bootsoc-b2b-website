import Image from "next/image";
import { ViewTransition } from "react";
import Link from "next/link";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/lib/utils";

type Crumb = { label: string; href: string };

export function PageHero({
  title,
  lede,
  crumbs = [],
  image,
  imageAlt = "",
  imageTransitionName,
  eyebrow,
  children,
}: {
  title: string;
  lede?: string;
  crumbs?: Crumb[];
  image?: string;
  imageAlt?: string;
  /** Shared-element name so a matching thumbnail can morph into this image during navigation. */
  imageTransitionName?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}) {
  const trail = [{ label: "Home", href: "/" }, ...crumbs];
  return (
    <section className="pb-12 pt-32 md:pb-16 md:pt-40">
      {crumbs.length > 0 && (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: trail.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.label, item: absoluteUrl(c.href) })),
          }}
        />
      )}
      <div className="shell">
        {crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="animate-fade-up">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
              {trail.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true">/</span>}
                  {i === trail.length - 1 ? (
                    <span aria-current="page" className="text-fg">
                      {c.label}
                    </span>
                  ) : (
                    <Link href={c.href} className="hover:text-fg">
                      {c.label}
                    </Link>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        <div className={image ? "mt-8 grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16" : "mt-8"}>
          <div>
            {eyebrow && (
              <p className="animate-fade-up text-sm font-medium text-signal [[data-theme=light]_&]:text-fg">{eyebrow}</p>
            )}
            <h1
              className="display mt-3 max-w-[16ch] animate-lift text-[clamp(3rem,7.5vw,7rem)]"
              style={{ animationDelay: "60ms" }}
            >
              {title}
            </h1>
            {lede && (
              <p
                className="mt-7 max-w-[40rem] animate-fade-up text-lg leading-relaxed text-muted md:text-xl"
                style={{ animationDelay: "160ms" }}
              >
                {lede}
              </p>
            )}
            {children && (
              <div className="mt-9 animate-fade-up" style={{ animationDelay: "240ms" }}>
                {children}
              </div>
            )}
          </div>
          {image && (
            <div className="animate-unclip rounded-[2rem] bg-fg/5 p-1.5 ring-1 ring-line" style={{ animationDelay: "120ms" }}>
              {imageTransitionName ? (
                <ViewTransition name={imageTransitionName} share="morph" default="none">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-6px)]">
                    <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  </div>
                </ViewTransition>
              ) : (
                <div className="relative aspect-[4/3] overflow-hidden rounded-[calc(2rem-6px)]">
                  <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
