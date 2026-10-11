import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { btnPrimary, container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

export function ProductSpotlight() {
  return (
    <section id="product" className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="relative grid items-center gap-9 overflow-hidden rounded-3xl border border-line bg-panel p-8 md:p-[52px] lg:grid-cols-2 lg:gap-12">
            <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 bg-[radial-gradient(closest-side,rgba(81,67,217,0.14),transparent)]" />
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
              className="relative grid min-h-[240px] place-items-center rounded-[18px] border border-line bg-canvas bg-[linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] bg-[size:36px_36px]"
            >
              <span className="grid h-24 w-24 place-items-center rounded-3xl bg-[#01411c] text-[46px] font-extrabold text-slate-50 shadow-[0_16px_48px_rgba(1,65,28,0.45)]">
                T
              </span>
              <span className="absolute bottom-[18px] right-[18px] inline-flex items-center gap-[7px] rounded-full border border-line bg-panel px-[13px] py-1.5 text-xs font-semibold text-[#4ade80]">
                <span className="h-[7px] w-[7px] rounded-full bg-[#4ade80]" />
                Waitlist open
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
