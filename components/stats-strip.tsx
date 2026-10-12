import { Reveal } from "./reveal";
import { container } from "./ui";

const STATS = [
  { value: "0", label: "Long-lived cloud credentials — deploys run on OIDC" },
  {
    value: "100%",
    label: "Deploys health-gated before traffic switches",
  },
  { value: "2", label: "Isolated blue/green environments — dev and prod" },
  { value: "4", label: "Verification stages per release — lint to build" },
];

export function StatsStrip() {
  return (
    <section className="border-line relative z-[1] border-t">
      <div
        className={`${container} grid gap-6 py-10 sm:grid-cols-2 lg:grid-cols-4`}
      >
        {STATS.map(({ value, label }, i) => (
          <Reveal key={label} delay={i * 0.06}>
            <div>
              <span className="text-gradient mb-1 block text-[34px] leading-none font-extrabold tracking-[-0.03em]">
                {value}
              </span>
              <span className="text-dim block max-w-[220px] text-[13px] leading-snug">
                {label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
