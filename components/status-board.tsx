"use client";

import { useEffect, useState } from "react";
import { Reveal } from "./reveal";

type State = "checking" | "operational" | "unreachable" | "prelaunch";

const STATE_STYLE: Record<State, { dot: string; label: string }> = {
  checking: { dot: "bg-dim", label: "Checking…" },
  operational: { dot: "bg-emerald-500", label: "Operational" },
  unreachable: { dot: "bg-red-500", label: "Unreachable" },
  prelaunch: { dot: "bg-amber-400", label: "Pre-launch" },
};

const SYSTEMS: {
  name: string;
  desc: string;
  probe: string | null;
  fallback?: State;
}[] = [
  {
    name: "shevris.com",
    desc: "Corporate website — served from GitHub Pages edge cache.",
    probe: "self",
  },
  {
    name: "tijarah.pk",
    desc: "Tijarah waitlist — accepting early signups.",
    probe: "https://tijarah.pk",
  },
  {
    name: "Tijarah API",
    desc: "Marketplace backend — pre-launch. The environment scales to zero between releases, so it is intentionally offline.",
    probe: null,
    fallback: "prelaunch",
  },
];

async function reachable(url: string): Promise<boolean> {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 6000);
    await fetch(url, { mode: "no-cors", signal: ctrl.signal });
    clearTimeout(t);
    return true;
  } catch {
    return false;
  }
}

export function StatusBoard() {
  const [states, setStates] = useState<State[]>(
    SYSTEMS.map((s) => s.fallback ?? "checking"),
  );
  const [checkedAt, setCheckedAt] = useState<Date | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const results = await Promise.all(
        SYSTEMS.map(async (s) => {
          if (s.fallback) return s.fallback;
          if (s.probe === "self" || !s.probe) return "operational" as const;
          return (await reachable(s.probe))
            ? ("operational" as const)
            : ("unreachable" as const);
        }),
      );
      if (alive) {
        setStates(results);
        setCheckedAt(new Date());
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <>
      <div className="border-line bg-panel rounded-2xl border">
        {SYSTEMS.map(({ name, desc }, i) => {
          const state = states[i];
          return (
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
                  <p className="text-muted max-w-[52ch] text-[13.5px] leading-relaxed">
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
          );
        })}
      </div>
      <Reveal delay={0.2}>
        <p className="text-dim mt-6 text-[13.5px] leading-relaxed">
          {checkedAt
            ? `Checked just now from your browser, ${checkedAt.toLocaleTimeString()}.`
            : "Running live reachability checks…"}{" "}
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
    </>
  );
}
