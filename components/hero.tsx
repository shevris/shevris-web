import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "./reveal";
import { btnPrimary, btnSecondary, container } from "./ui";

const POINTS = [
  "Design through deployment",
  "Client work & own products",
  "Lahore, Pakistan",
];

const CHIPS = ["B2B & B2C", "Live prices", "AI-powered"];

export function Hero() {
  return (
    <section className="relative z-[1] py-16 md:py-24">
      <div
        className={`${container} grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14`}
      >
        <div>
          <Reveal>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-line bg-panel px-3.5 py-[7px] text-xs font-semibold uppercase tracking-[0.08em] text-muted">
              <span className="h-[7px] w-[7px] shrink-0 rounded-full bg-brand" />
              Independent software company
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="mb-[22px] text-[40px] font-extrabold leading-[1.06] tracking-[-0.035em] md:text-6xl">
              Software, built <span className="text-accent">deliberately.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mb-8 max-w-[520px] text-[16.5px] leading-relaxed text-muted md:text-lg">
              Shevris Technologies designs and engineers software for commerce —
              custom platforms for clients, and Tijarah, our own marketplace for
              Pakistan.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="mb-7 flex flex-wrap gap-3">
              <a className={btnPrimary} href="mailto:hello@shevris.com">
                Start a project
                <ArrowUpRight size={15} />
              </a>
              <a
                className={btnSecondary}
                href="https://tijarah.pk"
                target="_blank"
                rel="noopener"
              >
                Explore Tijarah
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.4}>
            <ul className="flex flex-wrap gap-x-[22px] gap-y-2.5 text-[13.5px] text-dim">
              {POINTS.map((point) => (
                <li key={point} className="flex items-center gap-[7px]">
                  <Check size={14} strokeWidth={2.4} className="shrink-0 text-accent" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.45} className="relative">
          <div className="pointer-events-none absolute -inset-6 bg-[radial-gradient(400px_280px_at_60%_40%,rgba(81,67,217,0.16),transparent_70%)]" />
          <a
            href="https://tijarah.pk"
            target="_blank"
            rel="noopener"
            className="relative block rounded-[20px] border border-line bg-panel p-6 shadow-[0_24px_64px_rgba(0,0,0,0.22)] transition-all hover:-translate-y-1 hover:border-accent hover:shadow-[0_28px_72px_rgba(81,67,217,0.2)] md:p-[30px]"
          >
            <div className="mb-[18px] flex items-center gap-4">
              <span className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] bg-[#01411c] text-2xl font-extrabold text-slate-50">
                T
              </span>
              <div>
                <span className="block text-[19px] font-bold tracking-[-0.02em]">
                  Tijarah
                </span>
                <span className="mt-[3px] block text-xs font-semibold uppercase tracking-[0.06em] text-muted">
                  Flagship product
                </span>
              </div>
            </div>
            <p className="mb-5 text-[14.5px] leading-relaxed text-muted">
              Pakistan&apos;s upcoming B2B &amp; B2C marketplace — wholesale
              trade, live market prices, and AI-powered shopping.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {CHIPS.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-line bg-canvas px-3 py-[5px] text-xs font-medium text-muted"
                >
                  {chip}
                </span>
              ))}
              <span className="rounded-full border border-[#4ade804d] bg-canvas px-3 py-[5px] text-xs font-medium text-[#4ade80]">
                Waitlist open
              </span>
            </div>
            <span className="inline-flex items-center gap-[7px] text-sm font-semibold text-accent">
              tijarah.pk
              <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
