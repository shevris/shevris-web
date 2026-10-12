import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  Gift,
  Scale,
  Sparkles,
  Store,
  Truck,
} from "lucide-react";
import { SpotlightCard } from "./spotlight-card";
import { Reveal } from "./reveal";
import {
  btnPrimary,
  container,
  h2,
  sectionLabel,
  sectionSub,
  sectionWrap,
} from "./ui";

const FEATURES = [
  {
    icon: Store,
    title: "Wholesale marketplace",
    desc: "Bulk buying for businesses — including live video negotiation rooms between buyers and suppliers.",
  },
  {
    icon: Scale,
    title: "Live price comparison",
    desc: "Real-time prices across markets, compared side by side before you commit to a purchase.",
  },
  {
    icon: BadgeCheck,
    title: "Verified authenticity",
    desc: "Certificate-backed proof that products are genuine — verified, not just claimed by the seller.",
  },
  {
    icon: Truck,
    title: "Smart delivery",
    desc: "Route-optimized logistics with live tracking and delivery time slots you choose.",
  },
  {
    icon: Sparkles,
    title: "AI-assisted shopping",
    desc: "Recommendations and a shopping assistant trained on real marketplace data, not generic guesses.",
  },
  {
    icon: Gift,
    title: "Rewards & tiers",
    desc: "Earn on every purchase and unlock tiers the more you shop.",
  },
];

const LAUNCH_PATH = [
  { step: "01", label: "Waitlist", state: "Open now" },
  { step: "02", label: "Private beta", state: "Waitlist members first" },
  { step: "03", label: "Public launch", state: "Pakistan first, then beyond" },
];

export function ProductSpotlight() {
  return (
    <section id="product" className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <SpotlightCard className="border-line bg-panel relative grid items-center gap-9 rounded-3xl border p-8 md:p-[52px] lg:grid-cols-2 lg:gap-12">
            <div className="pointer-events-none absolute -top-20 -right-20 h-80 w-80 bg-[radial-gradient(closest-side,rgba(81,67,217,0.14),transparent)]" />
            <div>
              <span className={sectionLabel}>Our product</span>
              <h2 className={h2}>Tijarah — commerce, rebuilt for Pakistan.</h2>
              <p className={`${sectionSub} mb-6`}>
                A B2B &amp; B2C marketplace connecting retailers, wholesalers,
                and buyers — with live market prices and AI-assisted shopping
                built in from day one.
              </p>
              <a
                className={btnPrimary}
                href="https://tijarah.pk"
                target="_blank"
                rel="noopener"
              >
                Join the waitlist
                <ArrowUpRight size={15} />
              </a>
            </div>
            <div
              aria-hidden="true"
              className="border-line bg-canvas relative grid min-h-[240px] place-items-center rounded-[18px] border bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:36px_36px]"
            >
              <Image
                src="/tijarah-mark.png"
                alt=""
                width={96}
                height={96}
                className="h-24 w-24 rounded-3xl shadow-[0_16px_48px_rgba(20,20,66,0.5)]"
              />
              <span className="border-line bg-panel absolute right-[18px] bottom-[18px] inline-flex items-center gap-[7px] rounded-full border px-[13px] py-1.5 text-xs font-semibold text-[#4ade80]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#4ade80]" />
                Waitlist open
              </span>
            </div>
          </SpotlightCard>
        </Reveal>

        <Reveal>
          <div className="mt-14 mb-8 flex flex-wrap items-end justify-between gap-4">
            <h3 className="text-xl font-bold tracking-[-0.02em]">
              Inside Tijarah
            </h3>
            <span className="text-dim text-[13px]">
              Six systems, one marketplace — plus seller tools and a POS layer
              for shops.
            </span>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, desc }, i) => (
            <Reveal key={title} delay={Math.min(i * 0.06, 0.3)}>
              <div className="spotlight-card border-line bg-panel hover:border-accent flex h-full flex-col rounded-2xl border p-6 transition-colors">
                <div className="bg-accent/10 border-line mb-4 flex h-10 w-10 items-center justify-center rounded-xl border">
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                    className="text-accent"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="mb-1.5 text-[15.5px] font-semibold tracking-[-0.01em]">
                  {title}
                </h4>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15}>
          <ol className="border-line mt-10 grid gap-4 rounded-2xl border p-6 sm:grid-cols-3 md:p-7">
            {LAUNCH_PATH.map(({ step, label, state }, i) => (
              <li key={step} className="flex items-start gap-3.5">
                <span className="text-accent font-mono text-[13px] font-bold">
                  {step}
                </span>
                <span>
                  <span className="block text-[14.5px] font-semibold">
                    {label}
                  </span>
                  <span
                    className={`text-[12.5px] ${i === 0 ? "font-semibold text-[#4ade80]" : "text-dim"}`}
                  >
                    {state}
                  </span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
