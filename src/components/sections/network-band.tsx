import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export function NetworkBand() {
  return (
    <section aria-labelledby="network-heading" className="shell py-12 md:py-16">
      <Reveal className="relative isolate overflow-hidden rounded-[2rem] ring-1 ring-line">
        <Image
          src="/images/publisher-reading.jpg"
          alt=""
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-black/90 via-black/70 to-black/20" />
        <div className="grid gap-8 p-8 text-[#f4f4ef] md:p-14 lg:max-w-[46rem] lg:p-20">
          <h2 id="network-heading" className="display text-[clamp(2.5rem,5vw,4.5rem)]">
            Our own audience, not a rented one.
          </h2>
          <p className="max-w-[48ch] text-lg text-white/80">
            IntentBuy, our technology publication, covers AI, cybersecurity, hardware and policy for readers deciding what to buy next.
            Its first-party engagement powers BootSoc Signal and gives your content a trusted home.
          </p>
          <div>
            <ButtonLink href="/network" icon>
              Explore the network
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
