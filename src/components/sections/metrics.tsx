import { Counter } from "@/components/motion/counter";
import { metrics } from "@/content/site";

export function Metrics() {
  return (
    <section aria-label="BootSoc in numbers" className="shell py-20 md:py-28">
      <dl className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[auto_1fr_1fr_1fr] lg:gap-x-14">
        {metrics.map((m, i) => (
          <div key={m.label} className={i === 0 ? "col-span-2 lg:col-span-1" : ""}>
            <dt className="sr-only">{m.label}</dt>
            <dd>
              <Counter
                value={m.value}
                prefix={"prefix" in m ? m.prefix : ""}
                suffix={m.suffix}
                className={`display tabular block ${i === 0 ? "text-[clamp(5rem,10vw,9rem)] text-signal [[data-theme=light]_&]:text-fg" : "text-[clamp(3.5rem,6vw,5.5rem)]"}`}
              />
              <span aria-hidden="true" className="mt-3 block max-w-[16rem] text-muted">
                {m.label}
              </span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
