import {
  ArrowDown,
  BadgeCheck,
  Landmark,
  LockKeyhole,
  PackageX,
  PhoneOff,
  Receipt,
  Scale,
  Store,
  Timer,
  TrendingUp,
  Truck,
  Wallet,
} from "lucide-react";
import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

type Problem = {
  icon: typeof PackageX;
  complaint: string;
  fix: string;
  detail: string;
  demo?: string;
};

const BUYER_PROBLEMS: Problem[] = [
  {
    icon: PackageX,
    complaint:
      "\u201COrdered a branded item. Opened the box — cheap fake.\u201D",
    fix: "Every parcel is platform-booked",
    detail:
      "Sellers can't ship you a mystery box off-record. Every Tijarah order moves as a tracked consignment booked by the platform — so what arrives is tied to what you ordered.",
    demo: "#delivery-title",
  },
  {
    icon: PhoneOff,
    complaint:
      "\u201CThe seller got my address, then sent a fake COD parcel. My family paid cash for junk.\u201D",
    fix: "Your contact details stay masked",
    detail:
      "Sellers see your city, not your phone. The courier label is generated server-side from order data — nobody can weaponise your address to bypass the platform.",
    demo: "#delivery-title",
  },
  {
    icon: Timer,
    complaint:
      "\u201CMarked \u2018delivered\u2019, never arrived. Refund took three months of begging.\u201D",
    fix: "Money releases only on real delivery",
    detail:
      "Your payment sits in escrow until verified courier milestones confirm delivery — a seller's word is never the trigger. Dispute a missing parcel and the funds stay frozen.",
    demo: "#delivery-title",
  },
  {
    icon: Wallet,
    complaint:
      "\u201CPaid cash at the door. Where it went after that, nobody could tell me.\u201D",
    fix: "COD cash, traced parcel-by-parcel",
    detail:
      "The courier collects your cash and remits it to Tijarah, not the seller. Every consignment number is reconciled against what actually landed — cash can't evaporate in the middle.",
    demo: "#delivery-title",
  },
];

const SELLER_PROBLEMS: Problem[] = [
  {
    icon: Store,
    complaint:
      "\u201CI close my shop for half a day just to run to the wholesale market.\u201D",
    fix: "The market comes to your screen",
    detail:
      "Enquire, negotiate, and counter-offer inside the app — quantity-tier quotes from real suppliers without leaving your counter. The Shah Alam run becomes optional.",
    demo: "#studio-title",
  },
  {
    icon: Scale,
    complaint:
      "\u201CBig distributors set the price. I can't even tell if it's fair.\u201D",
    fix: "True landed cost, side by side",
    detail:
      "Compare supplier offers on the whole figure — goods plus delivery — not the headline rate designed to look cheap. Opaque pricing dies when comparisons are one tap apart.",
    demo: "#comparison-title",
  },
  {
    icon: Landmark,
    complaint:
      "\u201CPaid a supplier in advance. Goods arrived short — or never did.\u201D",
    fix: "Escrow on every wholesale order",
    detail:
      "Bulk payments hold in escrow and release only when delivery and quantity are confirmed. Advance-payment risk is structural, not a leap of faith.",
    demo: "#delivery-title",
  },
  {
    icon: Truck,
    complaint:
      "\u201CCourier collected COD weeks ago. The payout still hasn't shown up.\u201D",
    fix: "Settlement you can audit",
    detail:
      "Every collected parcel sits on a reconciliation ledger until the courier's remittance is confirmed — then your payout books automatically, minus a transparent commission. No more 'where did my money go'.",
    demo: "#delivery-title",
  },
  {
    icon: TrendingUp,
    complaint:
      "\u201CNo bank will lend to a small shop. Suppliers want cash upfront.\u201D",
    fix: "Credit that grows with your history",
    detail:
      "Every completed order builds your on-platform record. Tijarah's credit line rewards shops that actually transact — informal udhaar becomes a real credit footprint.",
  },
];

function ProblemCard({ problem }: { problem: Problem }) {
  const Icon = problem.icon;
  return (
    <li className="border-line bg-panel group hover:border-accent/40 relative flex flex-col gap-3 rounded-2xl border p-6 transition-colors duration-200">
      <span className="text-accent">
        <Icon size={20} aria-hidden="true" />
      </span>
      <blockquote className="text-ink text-[14.5px] leading-relaxed font-medium italic">
        {problem.complaint}
      </blockquote>
      <div className="mt-auto">
        <p className="text-accent text-[13.5px] font-semibold">
          <BadgeCheck
            size={14}
            aria-hidden="true"
            className="-mt-0.5 mr-1.5 inline-block"
          />
          {problem.fix}
        </p>
        <p className="text-muted mt-2 text-[13px] leading-relaxed">
          {problem.detail}
        </p>
        {problem.demo && (
          <a
            href={problem.demo}
            className="text-accent mt-3 inline-flex items-center gap-1.5 text-[12px] font-semibold underline-offset-4 hover:underline"
          >
            See it in the demo
            <ArrowDown size={12} aria-hidden="true" />
          </a>
        )}
      </div>
    </li>
  );
}

function Track({
  id,
  label,
  heading,
  sub,
  problems,
  icon: Icon,
}: {
  id: string;
  label: string;
  heading: string;
  sub: string;
  problems: Problem[];
  icon: typeof PackageX;
}) {
  return (
    <div>
      <Reveal>
        <div className="mb-6 flex items-start gap-4">
          <span className="border-line bg-panel text-accent mt-1 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border">
            <Icon size={19} aria-hidden="true" />
          </span>
          <div>
            <span className="text-accent font-mono text-[11px] font-bold tracking-[0.18em] uppercase">
              {label}
            </span>
            <h3 className="mt-1 text-[21px] font-bold tracking-tight">
              {heading}
            </h3>
            <p className="text-muted mt-1 text-[14px]">{sub}</p>
          </div>
        </div>
      </Reveal>
      <ul
        id={id}
        className={`grid gap-4 ${
          problems.length > 4
            ? "sm:grid-cols-2 lg:grid-cols-5"
            : "sm:grid-cols-2 lg:grid-cols-4"
        }`}
      >
        {problems.map((problem) => (
          <Reveal key={problem.fix} className="h-full">
            <ProblemCard problem={problem} />
          </Reveal>
        ))}
      </ul>
    </div>
  );
}

/**
 * The "why" section — real, documented marketplace complaints mapped to the
 * concrete Tijarah mechanism that prevents each one. Research-backed: fake
 * COD parcels, masked-contact scams, delivery-scan fraud, remittance
 * opacity, market-run overhead, and credit exclusion are the top recurring
 * complaints in Pakistani e-commerce reviews and founder post-mortems.
 */
export function RealProblems() {
  return (
    <section id="why-tijarah" className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="mx-auto mb-14 max-w-[760px] text-center">
            <span className={sectionLabel}>The problems are real</span>
            <h2 className={h2}>
              Everyone who shops or sells online in Pakistan has lived this.
            </h2>
            <p className={sectionSub}>
              These aren&apos;t edge cases — they&apos;re the complaints that
              fill review pages and shut down funded startups. Tijarah was built
              so each of them is structurally impossible, not just
              policy-against.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-14">
          <Track
            id="buyer-problems"
            label="For buyers"
            heading="When the parcel betrays you"
            sub="The scams and disappointments that made people distrust online shopping in the first place."
            problems={BUYER_PROBLEMS}
            icon={Receipt}
          />
          <Track
            id="seller-problems"
            label="For shops & suppliers"
            heading="When the system works against your shop"
            sub="The overhead, opacity, and cash-flow traps that keep small retailers locked out."
            problems={SELLER_PROBLEMS}
            icon={LockKeyhole}
          />
        </div>
      </div>
    </section>
  );
}
