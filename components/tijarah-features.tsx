import { BadgeCheck, Gift, Scale, Sparkles, Store, Truck } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal } from "./reveal";

/* ---------- themed card art (decorative SVG scenes) ---------- */

function ArtWholesale() {
  return (
    <svg
      viewBox="0 0 560 190"
      className="mt-auto w-full pt-6"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="170"
        x2="560"
        y2="170"
        stroke="var(--line)"
        strokeWidth="1.2"
        strokeDasharray="4 6"
      />
      <g transform="translate(-42 -38) scale(1.2)">
        {/* crates */}
        <g stroke="var(--line)" strokeWidth="1.4" fill="var(--elev)">
          <rect x="36" y="120" width="58" height="50" rx="7" />
          <rect x="98" y="120" width="58" height="50" rx="7" />
          <rect x="67" y="72" width="58" height="48" rx="7" />
        </g>
        <path
          d="M67 84 h58 M67 132 h29 M98 132 h29"
          stroke="var(--line)"
          strokeWidth="1.2"
          fill="none"
        />
        {/* video negotiation tiles */}
        <g>
          <rect
            x="330"
            y="46"
            width="150"
            height="96"
            rx="12"
            fill="var(--bg)"
            stroke="var(--line)"
            strokeWidth="1.4"
          />
          <rect
            x="346"
            y="62"
            width="52"
            height="52"
            rx="9"
            fill="rgba(81,67,217,0.22)"
          />
          <circle cx="372" cy="81" r="9" fill="var(--accent)" opacity="0.9" />
          <path
            d="M357 114 q15 -12 30 0"
            stroke="var(--accent)"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <rect
            x="410"
            y="62"
            width="52"
            height="52"
            rx="9"
            fill="rgba(52,211,153,0.16)"
          />
          <circle cx="436" cy="81" r="9" fill="#34d399" opacity="0.9" />
          <path
            d="M421 114 q15 -12 30 0"
            stroke="#34d399"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx="470" cy="55" r="4" fill="#4ade80" />
          <text
            x="386"
            y="134"
            fill="var(--dim)"
            fontSize="10.5"
            fontWeight="700"
            letterSpacing="0.12em"
          >
            LIVE NEGOTIATION
          </text>
        </g>
        {/* price tag */}
        <g>
          <path
            d="M196 96 l34 -34 h30 v30 l-34 34 z"
            fill="var(--bg)"
            stroke="var(--line)"
            strokeWidth="1.4"
          />
          <circle cx="248" cy="74" r="4" fill="var(--accent)" />
          <text
            x="202"
            y="110"
            fill="var(--dim)"
            fontSize="11"
            fontWeight="600"
          >
            bulk
          </text>
        </g>
      </g>
    </svg>
  );
}

function ArtSparkline() {
  return (
    <svg
      viewBox="0 0 240 84"
      className="mt-auto w-full pt-5"
      aria-hidden="true"
    >
      <polyline
        points="0,66 40,54 80,60 120,38 160,44 200,22 240,28"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <polyline
        points="0,50 40,58 80,46 120,52 160,62 200,54 240,60"
        fill="none"
        stroke="var(--dim)"
        strokeWidth="1.8"
        strokeDasharray="3 5"
        strokeLinecap="round"
      />
      <circle cx="200" cy="22" r="4" fill="var(--accent)" />
      <circle cx="240" cy="28" r="3" fill="var(--accent)" opacity="0.5" />
      <text
        x="8"
        y="20"
        fill="var(--dim)"
        fontSize="10"
        fontWeight="700"
        letterSpacing="0.1em"
      >
        MARKET A — MARKET B
      </text>
    </svg>
  );
}

function ArtSeal() {
  return (
    <svg
      viewBox="0 0 240 84"
      className="mt-auto w-full pt-5"
      aria-hidden="true"
    >
      <circle
        cx="70"
        cy="42"
        r="30"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1.4"
      />
      <circle
        cx="70"
        cy="42"
        r="21"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="1.4"
        strokeDasharray="4 4"
      />
      <path
        d="M60 42 l7 7 l14 -14"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x="118"
        y="24"
        width="112"
        height="12"
        rx="6"
        fill="var(--line)"
        opacity="0.5"
      />
      <rect
        x="118"
        y="46"
        width="76"
        height="12"
        rx="6"
        fill="var(--line)"
        opacity="0.3"
      />
    </svg>
  );
}

function ArtRoute() {
  return (
    <svg
      viewBox="0 0 240 84"
      className="mt-auto w-full pt-5"
      aria-hidden="true"
    >
      <path
        id="route-path"
        d="M16 64 C 60 12, 96 76, 140 40 S 210 30, 226 18"
        fill="none"
        stroke="var(--line)"
        strokeWidth="1.6"
        strokeDasharray="5 6"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="64"
        r="5"
        fill="var(--panel)"
        stroke="var(--dim)"
        strokeWidth="1.6"
      />
      <path
        d="M226 8 a7 7 0 0 1 7 7 c0 5 -7 11 -7 11 s-7 -6 -7 -11 a7 7 0 0 1 7 -7z"
        fill="var(--accent)"
      />
      <circle r="4" fill="var(--accent)" className="route-dot">
        <animateMotion dur="6s" repeatCount="indefinite">
          <mpath href="#route-path" />
        </animateMotion>
      </circle>
    </svg>
  );
}

function ArtConstellation() {
  const nodes = [
    [40, 56],
    [92, 24],
    [140, 58],
    [188, 30],
    [216, 62],
  ] as const;
  const links = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [1, 3],
  ] as const;
  return (
    <svg
      viewBox="0 0 240 84"
      className="mt-auto w-full pt-5"
      aria-hidden="true"
    >
      {links.map(([a, b]) => (
        <line
          key={`${a}-${b}`}
          x1={nodes[a][0]}
          y1={nodes[a][1]}
          x2={nodes[b][0]}
          y2={nodes[b][1]}
          stroke="var(--line)"
          strokeWidth="1.2"
        />
      ))}
      {nodes.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i === 2 ? 6 : 4}
          fill={i === 2 ? "var(--accent)" : "var(--panel)"}
          stroke="var(--accent)"
          strokeWidth="1.4"
        />
      ))}
    </svg>
  );
}

function ArtTiers() {
  return (
    <svg
      viewBox="0 0 240 84"
      className="mt-auto w-full pt-5"
      aria-hidden="true"
    >
      <rect
        x="20"
        y="54"
        width="56"
        height="26"
        rx="6"
        fill="var(--elev)"
        stroke="var(--line)"
      />
      <rect
        x="84"
        y="38"
        width="56"
        height="42"
        rx="6"
        fill="var(--elev)"
        stroke="var(--line)"
      />
      <rect
        x="148"
        y="18"
        width="56"
        height="62"
        rx="6"
        fill="rgba(81,67,217,0.18)"
        stroke="var(--accent)"
      />
      <path
        d="M176 32 l4.4 8.9 9.8 1.4 -7.1 6.9 1.7 9.8 -8.8 -4.6 -8.8 4.6 1.7 -9.8 -7.1 -6.9 9.8 -1.4 z"
        fill="var(--accent)"
      />
    </svg>
  );
}

/* ---------- data ---------- */

type Feature = {
  icon: typeof Store;
  title: string;
  desc: string;
  span: string;
  wash: string;
  art: ReactNode;
  extra?: ReactNode;
};

const FEATURES: Feature[] = [
  {
    icon: Store,
    title: "Wholesale marketplace",
    desc: "Bulk buying for businesses — including live video negotiation rooms between buyers and suppliers.",
    span: "md:col-span-7 md:row-span-2",
    wash: "radial-gradient(560px 260px at 82% 100%, rgba(81,67,217,0.15), transparent 70%)",
    art: <ArtWholesale />,
    extra: (
      <div className="relative my-7 flex max-w-[430px] flex-col gap-2.5">
        <span className="border-line bg-canvas text-muted w-fit rounded-xl rounded-bl-sm border px-3.5 py-2 text-[13px]">
          Price per 100 units?
        </span>
        <span className="border-accent/30 bg-accent/10 text-ink w-fit self-end rounded-xl rounded-br-sm border px-3.5 py-2 text-[13px]">
          ₨4,150 — deal. Dispatch on Friday.
        </span>
      </div>
    ),
  },
  {
    icon: Scale,
    title: "Live price comparison",
    desc: "Real-time prices across markets, side by side before you commit.",
    span: "md:col-span-5",
    wash: "radial-gradient(300px 160px at 85% 100%, rgba(34,211,238,0.10), transparent 70%)",
    art: <ArtSparkline />,
  },
  {
    icon: BadgeCheck,
    title: "Verified authenticity",
    desc: "Certificate-backed proof that products are genuine — verified, not claimed.",
    span: "md:col-span-5",
    wash: "radial-gradient(300px 160px at 85% 100%, rgba(52,211,153,0.10), transparent 70%)",
    art: <ArtSeal />,
  },
  {
    icon: Truck,
    title: "Smart delivery",
    desc: "Route-optimized logistics with live tracking and time slots you choose.",
    span: "md:col-span-4",
    wash: "radial-gradient(300px 160px at 85% 100%, rgba(251,191,36,0.09), transparent 70%)",
    art: <ArtRoute />,
  },
  {
    icon: Sparkles,
    title: "AI-assisted shopping",
    desc: "Recommendations and an assistant trained on real marketplace data.",
    span: "md:col-span-4",
    wash: "radial-gradient(300px 160px at 85% 100%, rgba(167,139,250,0.13), transparent 70%)",
    art: <ArtConstellation />,
  },
  {
    icon: Gift,
    title: "Rewards & tiers",
    desc: "Earn on every purchase and unlock tiers the more you shop.",
    span: "md:col-span-4",
    wash: "radial-gradient(300px 160px at 85% 100%, rgba(251,113,133,0.09), transparent 70%)",
    art: <ArtTiers />,
  },
];

export function InsideTijarah() {
  return (
    <>
      <Reveal>
        <div className="mt-14 mb-8 flex flex-wrap items-end justify-between gap-4">
          <h3 className="text-xl font-bold tracking-[-0.02em]">
            Inside Tijarah
          </h3>
          <span className="text-dim text-[13px]">
            Six systems, one marketplace — plus seller tools and a POS layer for
            shops.
          </span>
        </div>
      </Reveal>
      <div className="grid gap-4 md:grid-cols-12">
        {FEATURES.map(
          ({ icon: Icon, title, desc, span, wash, art, extra }, i) => (
            <Reveal
              key={title}
              delay={Math.min(i * 0.06, 0.3)}
              className={span}
            >
              <div className="spotlight-card border-line bg-panel hover:border-accent relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ background: wash }}
                />
                <div className="bg-accent/10 border-line relative mb-4 flex h-10 w-10 items-center justify-center rounded-xl border">
                  <Icon
                    size={19}
                    strokeWidth={1.8}
                    className="text-accent"
                    aria-hidden="true"
                  />
                </div>
                <h4 className="relative mb-1.5 text-[15.5px] font-semibold tracking-[-0.01em]">
                  {title}
                </h4>
                <p className="text-muted relative text-sm leading-relaxed">
                  {desc}
                </p>
                {extra}
                <div className="relative flex flex-1">{art}</div>
              </div>
            </Reveal>
          ),
        )}
      </div>
    </>
  );
}
