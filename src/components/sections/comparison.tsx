"use client";

import { motion, useReducedMotion } from "motion/react";
import { CheckIcon, MinusIcon } from "@phosphor-icons/react";
import { comparison } from "@/content/audiences";
import { ButtonLink } from "@/components/ui/button";
import { SplitHeading } from "@/components/motion/split-heading";

const ease = [0.16, 1, 0.3, 1] as const;

/** Side-by-side comparison. Rows cascade in once, and the BootSoc column checks tick in sequence. */
export function Comparison() {
  const reduce = useReducedMotion();
  return (
    <section aria-labelledby="compare-heading" className="shell py-20 md:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SplitHeading id="compare-heading" className="display max-w-[12ch] text-[clamp(2.5rem,5vw,4.5rem)]">
        Why teams switch to BootSoc.
      </SplitHeading>
          <p className="mt-6 max-w-[40ch] text-lg text-muted">
            Most lead vendors sell volume and leave quality control to you. Here&apos;s what changes when verification is the product.
          </p>
          <div className="mt-8">
            <ButtonLink href="/contact?intent=sample" variant="secondary">
              Get a sample lead file
            </ButtonLink>
          </div>
        </div>

        <div className="overflow-hidden rounded-[2rem] ring-1 ring-line">
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">BootSoc compared with a typical lead vendor</caption>
            <thead>
              <tr className="text-sm">
                <th scope="col" className="p-5 font-medium text-muted md:p-6">
                  What you get
                </th>
                <th scope="col" className="w-28 bg-signal p-5 text-center font-semibold text-on-signal md:w-36 md:p-6">
                  BootSoc
                </th>
                <th scope="col" className="w-28 p-5 text-center font-medium text-muted md:w-36 md:p-6">
                  Typical vendor
                </th>
              </tr>
            </thead>
            <motion.tbody
              initial={reduce ? false : "hidden"}
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
            >
              {comparison.map((row) => (
                <motion.tr
                  key={row.feature}
                  variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }}
                  className="border-t border-line transition-colors hover:bg-raise"
                >
                  <th scope="row" className="p-5 font-normal md:p-6">
                    {row.feature}
                  </th>
                  <td className="bg-signal/[0.08] p-5 text-center md:p-6 [[data-theme=light]_&]:bg-signal/40">
                    <motion.span
                      variants={{ hidden: { scale: 0 }, show: { scale: 1, transition: { type: "spring", stiffness: 420, damping: 18, delay: 0.15 } } }}
                      className="inline-grid size-7 place-items-center rounded-full bg-signal text-on-signal"
                    >
                      <CheckIcon size={14} weight="bold" aria-label="Yes" />
                    </motion.span>
                  </td>
                  <td className="p-5 text-center text-sm text-muted md:p-6">
                    {row.typical === false ? (
                      <MinusIcon size={18} aria-label="No" className="mx-auto" />
                    ) : (
                      row.typical
                    )}
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
