import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="shell flex min-h-[70dvh] flex-col justify-center pb-16 pt-32">
      <p className="display text-[clamp(6rem,20vw,16rem)] text-signal [[data-theme=light]_&]:text-fg">404</p>
      <h1 className="display-md mt-2 text-4xl">This page isn&apos;t in our spec.</h1>
      <p className="mt-4 max-w-[44ch] text-lg text-muted">It may have moved when we rebuilt the site. Try the homepage or our solutions.</p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/">Go to the homepage</ButtonLink>
        <ButtonLink href="/solutions" variant="secondary">
          Browse solutions
        </ButtonLink>
      </div>
    </section>
  );
}
