import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react/dist/ssr";
import { RevealGroup, RevealItem } from "@/components/motion/reveal";
import { SplitHeading } from "@/components/motion/split-heading";
import { SpotlightGroup } from "@/components/motion/spotlight";
import { getService } from "@/content/services";
import { cn } from "@/lib/utils";

type Cell = {
  slug?: string;
  href: string;
  title: string;
  body: string;
  className: string;
  tone: "signal" | "image" | "plain";
  image?: string;
  imageAlt?: string;
};

function cell(slug: string, className: string, tone: Cell["tone"], withImage = false): Cell {
  const s = getService(slug)!;
  return {
    slug,
    href: `/solutions/${slug}`,
    title: s.product ?? s.name,
    body: s.summary,
    className,
    tone,
    image: withImage ? s.image : undefined,
    imageAlt: withImage ? s.imageAlt : undefined,
  };
}

const cells: Cell[] = [
  cell("intent-data", "lg:col-span-4 lg:row-span-2 min-h-[26rem]", "signal"),
  cell("content-syndication", "lg:col-span-2", "plain"),
  cell("demand-generation", "lg:col-span-2", "plain"),
  cell("account-based-marketing", "lg:col-span-3 min-h-[22rem]", "image", true),
  cell("programmatic-display", "lg:col-span-3 min-h-[22rem]", "image", true),
  cell("event-registration", "lg:col-span-2", "plain"),
  cell("appointment-setting", "lg:col-span-2", "plain"),
  {
    href: "/audience-estimator",
    title: "Not sure where to start?",
    body: "Size your in-market audience across the US, UK and Canada in under a minute.",
    className: "lg:col-span-2",
    tone: "plain",
  },
];

export function SolutionsBento() {
  return (
    <section aria-labelledby="solutions-heading" className="shell py-20 md:py-28">
      <SplitHeading id="solutions-heading" className="display max-w-[16ch] text-[clamp(2.75rem,6vw,5.5rem)]">
        One team for the whole funnel.
      </SplitHeading>
      <p className="mt-5 max-w-[52ch] text-lg text-muted">
        Start with one program or run them together. Signal intent feeds every channel, so each touch builds on the last.
      </p>

      <SpotlightGroup>
      <RevealGroup className="mt-12 grid grid-cols-1 gap-3 md:grid-cols-2 lg:auto-rows-[minmax(13rem,auto)] lg:grid-cols-6">
        {cells.map((c) => (
          <RevealItem key={c.href} className={cn("md:col-span-1", c.className)}>
            <Link
              href={c.href}
              className={cn(
                "spotlight group relative flex h-full flex-col justify-between overflow-hidden rounded-[1.5rem] p-6 ring-1 transition-[box-shadow,transform] duration-500 ease-out-expo hover:-translate-y-0.5 md:p-7",
                c.tone === "signal" && "bg-signal text-on-signal ring-transparent",
                c.tone === "plain" && "bg-raise ring-line hover:ring-fg/25",
                c.tone === "image" && "bg-raise text-[#f4f4ef] ring-line",
              )}
            >
              {c.image && (
                <>
                  <Image
                    src={c.image}
                    alt={c.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out-expo group-hover:scale-[1.04]"
                  />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5" />
                </>
              )}
              <span className="relative flex items-start justify-between gap-6">
                <span className={cn("display-md", c.tone === "signal" ? "text-[clamp(2.5rem,5vw,4.5rem)]" : "text-3xl")}>
                  {c.title}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-out-expo group-hover:rotate-45",
                    c.tone === "signal" ? "bg-on-signal text-signal" : c.tone === "image" ? "bg-white/15" : "bg-fg/10",
                  )}
                >
                  <ArrowUpRightIcon size={18} weight="bold" />
                </span>
              </span>
              <span className={cn("relative mt-10 block max-w-[40ch]", c.tone === "signal" ? "text-lg text-on-signal/80" : c.tone === "image" ? "text-white/80" : "text-muted")}>
                {c.tone === "signal" && <span className="mb-3 block text-sm font-medium text-on-signal">Intent data, activated</span>}
                {c.body}
              </span>
            </Link>
          </RevealItem>
        ))}
      </RevealGroup>
      </SpotlightGroup>
    </section>
  );
}
