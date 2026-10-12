import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { container, h2, sectionLabel, sectionSub } from "@/components/ui";

export const metadata: Metadata = {
  title: "Status — Shevris Technologies",
  description:
    "Operational status for Shevris systems — shevris.com and Tijarah services.",
  alternates: { canonical: "/status" },
};

type State = "operational" | "prelaunch";

const STATE_STYLE: Record<State, { dot: string; label: string }> = {
  operational: { dot: "bg-emerald-500", label: "Operational" },
  prelaunch: { dot: "bg-amber-400", label: "Pre-launch" },
};

const SYSTEMS: { name: string; desc: string; state: State }[] = [
  {
    name: "shevris.com",
    desc: "Corporate website — served from GitHub Pages edge cache.",
    state: "operational",
  },
  {
    name: "tijarah.pk",
    desc: "Tijarah waitlist — accepting early signups.",
    state: "operational",
  },
  {
    name: "Tijarah API",
    desc: "Marketplace backend — in waitlist phase ahead of public launch.",
    state: "prelaunch",
  },
];

export default function StatusPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className={sectionLabel}>Status</span>
              <h1 className={h2}>Systems status</h1>
              <p className={sectionSub}>
                Current state of Shevris services. Live uptime reporting and
                incident history come online alongside the Tijarah launch.
              </p>
            </div>
          </Reveal>
          <div className="border-line bg-panel rounded-2xl border">
            {SYSTEMS.map(({ name, desc, state }, i) => (
              <Reveal key={name} delay={i * 0.06}>
                <div
                  className={`flex flex-wrap items-center justify-between gap-3 px-6 py-5 ${
                    i > 0 ? "border-line border-t" : ""
                  }`}
                >
                  <div>
                    <h2 className="text-[15.5px] font-semibold tracking-[-0.01em]">
                      {name}
                    </h2>
                    <p className="text-muted text-[13.5px] leading-relaxed">
                      {desc}
                    </p>
                  </div>
                  <span className="flex items-center gap-2 text-[13px] font-medium">
                    <span
                      className={`h-2 w-2 rounded-full ${STATE_STYLE[state].dot}`}
                      aria-hidden="true"
                    />
                    {STATE_STYLE[state].label}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <p className="text-dim mt-6 text-[13.5px] leading-relaxed">
              Something looks wrong?{" "}
              <a
                href="mailto:hello@shevris.com"
                className="text-accent hover:underline"
              >
                hello@shevris.com
              </a>{" "}
              reaches a human, not a queue.
            </p>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
