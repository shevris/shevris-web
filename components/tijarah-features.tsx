"use client";

import {
  useCallback,
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  type Dispatch,
} from "react";
import {
  AnimatePresence,
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Coffee,
  CookingPot,
  Footprints,
  Headphones,
  MessageSquare,
  Shirt,
  Check,
  ChevronRight,
  Leaf,
  LockKeyhole,
  MapPin,
  PackageCheck,
  RotateCcw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Sprout,
  Timer,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";
import {
  catalogFor,
  INITIAL_DEMO,
  COD_REMITTANCE_DAYS,
  demoReducer,
  getDemo,
  money,
  type DemoState,
  type DemoAction,
  type Product,
  type AssistantMode,
} from "@/lib/commerce-demo";
import { Reveal } from "./reveal";

/* ---------- motion helpers ---------- */

const TYPING_MS = 1100;
/** Steps where the other party replies — the only moments a typing indicator
 *  is honest (a scripted human reply, not generated text). */
const REPLY_STEPS = new Set([2, 5]);

/** `true` for TYPING_MS after `step` becomes a reply step. Derived in render
 *  from the last step whose reply has "landed"; the only state write happens
 *  inside the timeout, so there is one timer per transition and no loop. */
function useTypingDelay(step: number, enabled: boolean) {
  const [settled, setSettled] = useState(step);
  const typing = enabled && REPLY_STEPS.has(step) && settled !== step;
  useEffect(() => {
    if (!typing) return;
    const id = window.setTimeout(() => setSettled(step), TYPING_MS);
    return () => window.clearTimeout(id);
  }, [typing, step]);
  return typing;
}

/** Reveals `text` word-by-word. Progress is keyed to the text, so a new draft
 *  restarts and a re-opened one stays complete. Finite by construction. */
function useTypewriter(text: string, enabled: boolean) {
  const [typed, setTyped] = useState({ text, n: 0 });
  const words = text.split(" ");
  const n = typed.text === text ? typed.n : 0;
  const done = !enabled || n >= words.length;
  useEffect(() => {
    if (done) return;
    const id = window.setTimeout(
      () => setTyped({ text, n: n + 1 }),
      n === 0 ? 60 : 28,
    );
    return () => window.clearTimeout(id);
  }, [done, text, n]);
  return enabled ? words.slice(0, n).join(" ") : text;
}

const bubble = {
  initial: { opacity: 0, y: 8, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -4, transition: { duration: 0.12 } },
  transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
};

/* ---------- themed card art (decorative SVG scenes) ---------- */

function RicePack({ compact = false }: { compact?: boolean }) {
  const id = useId();
  return (
    <svg
      viewBox="0 0 240 310"
      className={
        compact ? "commerce-pack commerce-pack-small" : "commerce-pack"
      }
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-paper`} x1="0" x2="1" y2="0.3">
          <stop stopColor="#c9b995" />
          <stop offset="0.18" stopColor="#f3ead7" />
          <stop offset="0.75" stopColor="#e7d9bc" />
          <stop offset="1" stopColor="#baa986" />
        </linearGradient>
        <linearGradient id={`${id}-label`} x2="1" y2="1">
          <stop stopColor="#325a48" />
          <stop offset="1" stopColor="#183c30" />
        </linearGradient>
      </defs>
      <ellipse
        cx="120"
        cy="291"
        rx="83"
        ry="10"
        fill="#20392c"
        opacity="0.12"
      />
      <path
        d="M59 30 Q120 20 181 30 L191 62 L204 271 Q122 293 36 271 L49 62Z"
        fill={`url(#${id}-paper)`}
        stroke="#b7a888"
      />
      <path
        d="M59 30 L66 49 Q120 56 174 49 L181 30 M49 62 L63 77 L50 266 M191 62 L177 77 L190 266"
        fill="none"
        stroke="#b09e7a"
        opacity="0.5"
      />
      <path
        d="M54 87 Q120 96 186 87 L195 249 Q120 263 45 249Z"
        fill={`url(#${id}-label)`}
      />
      <path
        d="M64 102 Q120 109 176 102 M56 236 Q120 247 184 236"
        fill="none"
        stroke="#d2c08e"
        opacity="0.6"
      />
      <g stroke="#dfce9a" strokeWidth="1.6" fill="none" strokeLinecap="round">
        <path d="M119 168 Q115 144 129 124 M120 155 Q103 149 100 138 M121 146 Q137 143 140 132 M124 136 Q113 129 115 120" />
        <ellipse
          cx="130"
          cy="123"
          rx="3"
          ry="7"
          transform="rotate(28 130 123)"
          fill="#dfce9a"
        />
        <ellipse
          cx="100"
          cy="137"
          rx="3"
          ry="6"
          transform="rotate(-32 100 137)"
          fill="#dfce9a"
        />
        <ellipse
          cx="140"
          cy="131"
          rx="3"
          ry="6"
          transform="rotate(30 140 131)"
          fill="#dfce9a"
        />
      </g>
      <text
        x="120"
        y="190"
        textAnchor="middle"
        fill="#f9f2df"
        fontFamily="Georgia, serif"
        fontSize="23"
      >
        Basmati
      </text>
      <text
        x="120"
        y="209"
        textAnchor="middle"
        fill="#dfce9a"
        fontSize="8"
        letterSpacing="3"
      >
        LONG GRAIN RICE
      </text>
      <text x="120" y="229" textAnchor="middle" fill="#f9f2df" fontSize="10">
        1 kg
      </text>
      <path d="M68 37 L172 37 M71 42 L169 42" stroke="#b5a37c" opacity="0.7" />
    </svg>
  );
}

function ProductArt({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const id = useId();
  if (product.id === "rice") return <RicePack compact={compact} />;
  if (["earbuds", "sneakers", "kettle"].includes(product.id))
    return <RetailArt id={id} product={product} compact={compact} />;
  const shirt = product.id === "apparel";
  return (
    <svg
      viewBox="0 0 240 310"
      className={
        compact ? "commerce-pack commerce-pack-small" : "commerce-pack"
      }
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-material`} x1="0" x2="1" y2="0.2">
          <stop stopColor={shirt ? "#596c99" : "#c7ac91"} />
          <stop offset="0.35" stopColor={shirt ? "#a0aecb" : "#fff6e7"} />
          <stop offset="0.72" stopColor={shirt ? "#8395ba" : "#eeddc5"} />
          <stop offset="1" stopColor={shirt ? "#4b5e8a" : "#b69478"} />
        </linearGradient>
      </defs>
      <ellipse
        cx="120"
        cy="282"
        rx="82"
        ry="10"
        fill="#253247"
        opacity="0.12"
      />
      {shirt ? (
        <>
          <path
            d="M79 43 L39 63 L10 127 L48 145 L64 118 L58 271 Q120 282 182 271 L176 118 L192 145 L230 127 L201 63 L161 43 Q120 67 79 43Z"
            fill={`url(#${id}-material)`}
            stroke="#53668f"
          />
          <path
            d="M79 43 Q120 114 161 43 L152 42 Q120 87 88 42Z"
            fill="#4c5e85"
          />
          <path
            d="M40 65 L64 118 M200 65 L176 118 M16 119 L47 134 M193 134 L224 119 M64 262 Q120 271 176 262"
            fill="none"
            stroke="#d3ddef"
            opacity="0.5"
          />
          <path
            d="M76 103 Q62 173 78 243 M165 91 Q179 174 165 233"
            fill="none"
            stroke="#526893"
            opacity="0.3"
          />
          <rect x="112" y="61" width="16" height="9" rx="2" fill="#efece2" />
          <path
            d="M142 116 h22 v26 q-11 9 -22 0Z"
            fill="none"
            stroke="#d3ddef"
            opacity="0.7"
          />
        </>
      ) : (
        <>
          <path
            d="M181 103 C251 82 251 207 184 204"
            fill="none"
            stroke="#b6967b"
            strokeWidth="20"
          />
          <path
            d="M184 107 C235 93 237 191 186 194"
            fill="none"
            stroke="#ecdbc5"
            strokeWidth="10"
          />
          <path
            d="M42 96 Q113 73 188 96 L179 241 Q113 276 51 241Z"
            fill={`url(#${id}-material)`}
            stroke="#baa087"
          />
          <ellipse
            cx="115"
            cy="96"
            rx="73"
            ry="19"
            fill="#f9ecd8"
            stroke="#b89d80"
            strokeWidth="2"
          />
          <ellipse cx="115" cy="96" rx="62" ry="12" fill="#ab8f76" />
          <path
            d="M61 121 L68 231"
            stroke="#fffdf6"
            strokeWidth="7"
            opacity="0.6"
            strokeLinecap="round"
          />
          <path
            d="M94 177 Q112 153 137 177 Q117 203 94 177Z M116 162 v39"
            fill="none"
            stroke="#536f56"
            strokeWidth="2"
          />
          <path
            d="M55 240 Q116 265 176 240"
            fill="none"
            stroke="#c8ad8d"
            strokeWidth="3"
          />
        </>
      )}
    </svg>
  );
}

/** Distinct retail-product artwork — case+buds, a shoe profile, a kettle —
 *  so B2C items stop borrowing the wholesale mug. Same frame and shadow. */
function RetailArt({
  id,
  product,
  compact = false,
}: {
  id: string;
  product: Product;
  compact?: boolean;
}) {
  const tones =
    product.id === "earbuds"
      ? ["#3e4a63", "#93a3c4", "#5c6c92", "#2c3852"]
      : product.id === "sneakers"
        ? ["#7a4a3a", "#e8b98f", "#a3614a", "#5e3a2e"]
        : ["#6a7076", "#cdd3d8", "#8d949b", "#51565c"];
  return (
    <svg
      viewBox="0 0 240 310"
      className={
        compact ? "commerce-pack commerce-pack-small" : "commerce-pack"
      }
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-material`} x1="0" x2="1" y2="0.2">
          <stop stopColor={tones[0]} />
          <stop offset="0.35" stopColor={tones[1]} />
          <stop offset="0.72" stopColor={tones[2]} />
          <stop offset="1" stopColor={tones[3]} />
        </linearGradient>
      </defs>
      <ellipse
        cx="120"
        cy="282"
        rx="82"
        ry="10"
        fill="#253247"
        opacity="0.12"
      />
      {product.id === "earbuds" && (
        <>
          <rect
            x="62"
            y="150"
            width="116"
            height="104"
            rx="24"
            fill={`url(#${id}-material)`}
            stroke={tones[3]}
          />
          <rect
            x="62"
            y="176"
            width="116"
            height="4"
            fill={tones[3]}
            opacity="0.4"
          />
          <circle cx="120" cy="216" r="7" fill="#f4f7fb" opacity="0.8" />
          <g stroke={tones[3]}>
            <circle cx="95" cy="92" r="17" fill={`url(#${id}-material)`} />
            <path d="M95 106 v34" strokeWidth="9" strokeLinecap="round" />
            <circle cx="149" cy="104" r="15" fill={`url(#${id}-material)`} />
            <path d="M149 116 v30" strokeWidth="8" strokeLinecap="round" />
          </g>
          <ellipse
            cx="95"
            cy="141"
            rx="10"
            ry="6"
            fill={tones[1]}
            opacity="0.6"
          />
          <ellipse
            cx="149"
            cy="147"
            rx="9"
            ry="5"
            fill={tones[1]}
            opacity="0.6"
          />
        </>
      )}
      {product.id === "sneakers" && (
        <>
          <path
            d="M46 214 Q44 150 96 138 Q132 132 152 158 Q178 188 212 196 Q226 200 224 216 L222 232 Q120 250 50 238Z"
            fill={`url(#${id}-material)`}
            stroke={tones[3]}
          />
          <path
            d="M46 226 Q120 246 222 224 L222 234 Q120 254 50 240Z"
            fill="#f2f0ea"
            stroke={tones[3]}
            strokeWidth="1.5"
          />
          <path
            d="M100 152 l26 -14 M104 168 l30 -16 M110 184 l32 -16"
            stroke="#f4eee4"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M52 160 Q90 142 128 150"
            fill="none"
            stroke="#f4eee4"
            strokeWidth="4"
            opacity="0.5"
          />
        </>
      )}
      {product.id === "kettle" && (
        <>
          <path
            d="M74 128 Q70 218 88 244 Q120 258 152 244 Q170 218 166 128Z"
            fill={`url(#${id}-material)`}
            stroke={tones[3]}
          />
          <path
            d="M166 132 Q200 118 206 96 L184 96 Q178 114 160 122"
            fill={tones[2]}
            stroke={tones[3]}
          />
          <rect x="98" y="96" width="46" height="18" rx="8" fill={tones[3]} />
          <rect x="66" y="238" width="110" height="16" rx="7" fill={tones[0]} />
          <path
            d="M94 140 Q90 200 100 230"
            stroke="#f4f6f8"
            strokeWidth="6"
            opacity="0.5"
            strokeLinecap="round"
            fill="none"
          />
          <rect
            x="150"
            y="150"
            width="10"
            height="52"
            rx="4"
            fill={tones[1]}
            opacity="0.7"
          />
        </>
      )}
    </svg>
  );
}

function Fieldscape() {
  return (
    <svg
      className="commerce-fieldscape"
      viewBox="0 0 760 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <rect width="760" height="500" fill="#e7e8d9" />
      <circle cx="185" cy="95" r="60" fill="#f6f0d8" />
      <path d="M0 205 Q165 125 350 211 T760 167 V500 H0Z" fill="#becdb9" />
      <path d="M0 288 Q240 156 500 292 T760 236 V500 H0Z" fill="#93af93" />
      <path d="M0 358 Q210 225 490 369 T760 296 V500 H0Z" fill="#718f75" />
      <path d="M0 440 Q210 290 470 420 T760 371 V500 H0Z" fill="#4c725f" />
      <g fill="none" stroke="#dce2c3" strokeWidth="1.5" opacity="0.45">
        <path d="M-30 341 Q200 184 510 332 T800 259 M-30 358 Q200 201 510 349 T800 276 M-30 375 Q200 218 510 366 T800 293" />
        <path d="M-30 465 Q210 315 470 448 T800 385 M-30 484 Q210 334 470 467 T800 404" />
      </g>
      {/* crates */}
      <g
        transform="translate(48 384)"
        fill="#b69b71"
        stroke="#d6c09b"
        strokeWidth="1.5"
      >
        <path d="M0 0 H36 V27 H0Z M40 0 H76 V27 H40Z M20 -31 H56 V-4 H20Z" />
        <path d="M0 9 H36 M40 9 H76 M20 -21 H56" />
      </g>
    </svg>
  );
}

/** Scene backdrop per retail product — the same "template image" treatment
 *  the rice Fieldscape gives wholesale, so B2C cards don't sit on a blank
 *  panel. Flat shapes, one palette per product, clipped by the artwork
 *  frame (positioned like .commerce-fieldscape). */
function RetailScene({ product }: { product: Product }) {
  return (
    <svg
      className="commerce-fieldscape"
      viewBox="0 0 760 500"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      {product.id === "earbuds" && (
        <>
          <rect width="760" height="500" fill="#2a3350" />
          <circle cx="575" cy="110" r="150" fill="#46538a" opacity="0.55" />
          <circle cx="575" cy="110" r="88" fill="#6879b8" opacity="0.45" />
          <path d="M0 330 H760 V500 H0Z" fill="#1d2440" />
          <path d="M0 330 H760" stroke="#3d4a77" strokeWidth="3" />
          {/* desk silhouettes */}
          <rect x="88" y="252" width="150" height="78" rx="10" fill="#39446e" />
          <rect x="98" y="262" width="130" height="10" rx="5" fill="#57669c" />
          <rect x="98" y="280" width="96" height="10" rx="5" fill="#57669c" />
          <rect x="560" y="240" width="96" height="90" rx="14" fill="#39446e" />
          <circle cx="608" cy="285" r="26" fill="#57669c" />
          <g fill="#93a3c4" opacity="0.5">
            {Array.from({ length: 7 }).map((_, i) => (
              <circle key={i} cx={330 + i * 34} cy="470" r="3" />
            ))}
          </g>
          <path
            d="M60 380 Q160 356 260 380 T460 380 T660 380"
            fill="none"
            stroke="#57669c"
            strokeWidth="3"
            opacity="0.5"
          />
        </>
      )}
      {product.id === "sneakers" && (
        <>
          <rect width="760" height="500" fill="#e8b98f" />
          <circle cx="610" cy="88" r="64" fill="#f6dcc0" />
          {/* track lanes */}
          <path d="M0 250 Q380 190 760 240 V500 H0Z" fill="#b0714f" />
          <path
            d="M0 300 Q380 246 760 292"
            fill="none"
            stroke="#f2e4d4"
            strokeWidth="10"
          />
          <path
            d="M0 352 Q380 302 760 344"
            fill="none"
            stroke="#f2e4d4"
            strokeWidth="10"
          />
          <path
            d="M0 404 Q380 358 760 396"
            fill="none"
            stroke="#f2e4d4"
            strokeWidth="10"
          />
          <path
            d="M0 456 Q380 414 760 448"
            fill="none"
            stroke="#f2e4d4"
            strokeWidth="10"
          />
          {/* lane ticks */}
          <g stroke="#8c5238" strokeWidth="8" opacity="0.5">
            <path d="M120 262 l-14 44 M320 236 l-10 46 M520 236 l-8 48 M690 258 l-6 46" />
          </g>
        </>
      )}
      {product.id === "kettle" && (
        <>
          <rect width="760" height="500" fill="#e3e7ea" />
          {/* tile wall */}
          <g stroke="#c3ccd2" strokeWidth="3">
            <path d="M0 90 H760 M0 170 H760 M0 250 H760" />
            <path d="M120 10 V250 M300 10 V250 M480 10 V250 M660 10 V250" />
          </g>
          {/* counter */}
          <path d="M0 330 H760 V500 H0Z" fill="#9aa4ab" />
          <path d="M0 330 H760" stroke="#7d878f" strokeWidth="6" />
          <rect
            x="70"
            y="360"
            width="130"
            height="90"
            rx="8"
            fill="#7d878f"
            opacity="0.55"
          />
          <rect
            x="560"
            y="360"
            width="130"
            height="90"
            rx="8"
            fill="#7d878f"
            opacity="0.55"
          />
          {/* window light */}
          <rect
            x="540"
            y="30"
            width="150"
            height="210"
            rx="10"
            fill="#f4f7f9"
            opacity="0.8"
          />
          <path
            d="M615 30 V240 M540 135 H690"
            stroke="#c3ccd2"
            strokeWidth="4"
          />
        </>
      )}
    </svg>
  );
}

/* ---------- data ---------- */

const STAGES = ["Preparing", "On the way", "Delivered"];
const NEGOTIATION_STEPS = [
  "Ready to explore",
  "Buyer enquiry",
  "Supplier quote",
  "Draft for review",
  "Counter-offer sent in demo",
  "Example terms agreed",
];
/** Mode-aware chrome for the demo — the scenes are shared; what differs is
 *  who the counterparty is and what the middle step means. Every string a
 *  visitor reads in B2C comes from here so wholesale vocabulary can't leak
 *  into the retail story. */
const MODE_COPY = {
  b2b: {
    label: "Wholesale (B2B)",
    steps: NEGOTIATION_STEPS,
    other: "Supplier A",
    pairLabel: "Buyer + Supplier A",
    conversationTitle: "At the negotiation table",
    conversationAria: "Example buyer and supplier conversation",
    emptyLead: "You’re the buyer.",
    emptyHint: "Ask for a price.",
    emptyBody:
      "Five short steps: enquire, get a quote, counter, agree — with a helper beside you.",
    draftChip: "YOUR DRAFT · NOT SENT",
    discard: "Discard draft",
    draftAdvice:
      "Review before using. This sample asks for terms; it does not accept a deal for you.",
    useAfterQuote: "Available after supplier quote",
    reviewDraft: "Review suggested reply",
    useDraft: "Use this draft in the demo",
    disclaimer: "Illustrative negotiation",
    resetNote: "Changing product or quantity resets the example.",
    guide: ["Negotiate", "Compare", "Deliver"],
    escrow: {
      held: "COD — pay the courier at your door",
      released: "Delivered — courier remits COD to Tijarah",
      pre: `Courier collects COD · remits to Tijarah in ${COD_REMITTANCE_DAYS}`,
      post: "Seller paid from the remitted COD — courier cycle applies",
    },
  },
  b2c: {
    label: "Everyday shopping (B2C)",
    steps: [
      "Ready to explore",
      "Your enquiry",
      "Seller's answer",
      "Protected checkout",
      "Order placed to escrow",
      "Escrow holds until delivery",
    ],
    other: "Seller A",
    pairLabel: "You + Seller A",
    conversationTitle: "Your order conversation",
    conversationAria: "Example buyer and seller conversation",
    emptyLead: "You’re the shopper.",
    emptyHint: "Pick what you need.",
    emptyBody:
      "Five short steps: pick a product, ask the seller, place the order into escrow — with a helper beside you.",
    draftChip: "YOUR ORDER · NOT PLACED",
    discard: "Discard order",
    draftAdvice:
      "Review before ordering. This sample places the order into escrow — nothing is charged.",
    useAfterQuote: "Available after the seller answers",
    reviewDraft: "Review your order",
    useDraft: "Place this order in the demo",
    disclaimer: "Illustrative order",
    resetNote: "Changing product resets the example.",
    guide: ["Order", "Compare", "Deliver"],
    escrow: {
      held: "Payment held in escrow",
      released: "Payment released — delivery confirmed",
      pre: `vs. a courier COD wait: ${COD_REMITTANCE_DAYS}`,
      post: "Seller paid on confirmation — no courier remittance cycle",
    },
  },
} as const;
const ASSISTANT_MODES: {
  id: AssistantMode;
  label: string;
  wholesaleOnly?: boolean;
}[] = [
  { id: "explain", label: "Explain" },
  // Retail buyers don't counter-offer — retail prices are fixed.
  { id: "counter", label: "Counter-offer", wholesaleOnly: true },
  { id: "draft", label: "Draft reply" },
];
/** Icon per catalogue product — keyed by id so B2C rows stop borrowing
 *  the wholesale mug/shirt artwork. */
const PRODUCT_ICONS: Record<string, typeof Leaf> = {
  rice: Leaf,
  apparel: Shirt,
  home: Coffee,
  earbuds: Headphones,
  sneakers: Footprints,
  kettle: CookingPot,
};
type SceneProps = { state: DemoState; dispatch: Dispatch<DemoAction> };
type GuideFlow = "negotiate" | "compare" | "deliver";
const GUIDE: { id: GuideFlow; n: string; target: string }[] = [
  { id: "negotiate", n: "01", target: "studio-title" },
  { id: "compare", n: "02", target: "comparison-title" },
  { id: "deliver", n: "03", target: "delivery-title" },
];

function WholesaleScene({
  state,
  dispatch,
  beacon,
}: SceneProps & { beacon: boolean }) {
  const {
    product,
    quantity,
    totalKg,
    unit,
    listedUnit,
    counterUnit,
    subtotal,
    delivery,
    marketDelta,
    draft,
    messages,
    quantityIndex: selectedQuantity,
  } = getDemo(state);
  const reduce = useReducedMotion();
  const typing = useTypingDelay(state.step, !reduce);
  const typedDraft = useTypewriter(
    draft,
    !reduce && state.assistant === "draft" && state.step >= 2,
  );
  const log = useRef<HTMLOListElement>(null);
  const assistantHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [state.step, typing]);
  const visible = typing
    ? messages.filter((message) => message.step !== state.step)
    : messages;
  const copy = MODE_COPY[state.mode];
  const catalog = catalogFor(state.mode);
  const actions =
    state.mode === "b2c"
      ? [
          "Start example",
          "Show seller's answer",
          "Review protected checkout",
          "Place order into escrow",
          "Show seller confirmation",
          "Replay order",
        ]
      : [
          "Start example",
          "Show supplier quote",
          "Review assistant draft",
          "Send reply in demo",
          "Show supplier response",
          "Replay conversation",
        ];
  const next = () => {
    if (state.step === 5) dispatch({ type: "restart" });
    else if (state.step === 2 && state.assistant !== "draft") {
      dispatch({ type: "assistant", mode: "draft" });
      assistantHeading.current?.focus();
    } else if (state.step === 2) dispatch({ type: "use-draft" });
    else dispatch({ type: "advance" });
  };
  const above = marketDelta > 0;
  const DeltaIcon = above ? TrendingUp : TrendingDown;
  return (
    <article
      className="commerce-card commerce-studio"
      role="region"
      aria-roledescription="carousel"
      aria-labelledby="studio-title"
    >
      <div className="studio-heading">
        <div>
          <span className="commerce-eyebrow">
            <span>01</span> Interactive commerce studio
          </span>
          <h4 id="studio-title">Different products. Human connections.</h4>
        </div>
        <p>
          Choose a product. Explore a conversation.
          <br />
          See where an assistant could help.
        </p>
      </div>
      <div className="studio-navigation">
        <div
          className="studio-categories"
          role="group"
          aria-label="Choose a product story"
        >
          {catalog.map((item, i) => {
            const Icon = PRODUCT_ICONS[item.id] ?? PackageCheck;
            return (
              <button
                type="button"
                key={item.id}
                aria-pressed={state.productIndex === i}
                aria-controls="studio-story"
                onClick={() => dispatch({ type: "product", index: i })}
              >
                <Icon size={16} aria-hidden="true" />
                <span>{item.category}</span>
              </button>
            );
          })}
        </div>
        <div className="studio-arrows">
          <button
            type="button"
            aria-label="Previous product story"
            aria-controls="studio-story"
            onClick={() =>
              dispatch({ type: "product", index: state.productIndex - 1 })
            }
          >
            <ArrowLeft size={17} aria-hidden="true" />
          </button>
          <span aria-hidden="true">
            0{state.productIndex + 1} / 0{catalog.length}
          </span>
          <button
            type="button"
            aria-label="Next product story"
            aria-controls="studio-story"
            onClick={() =>
              dispatch({ type: "product", index: state.productIndex + 1 })
            }
          >
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
      <p className="sr-only" role="status">
        {product.category}, {state.productIndex + 1} of {catalog.length}.{" "}
        {quantity} {product.plural}. {copy.steps[state.step]}.
      </p>
      <div
        id="studio-story"
        className="studio-panels"
        role="group"
        aria-roledescription="slide"
        aria-label={`${product.category}: ${product.name}, ${state.productIndex + 1} of ${catalog.length}`}
      >
        <div className={`studio-product studio-product-${product.id}`}>
          <div className="studio-artwork">
            {product.id === "rice" && <Fieldscape />}
            {["earbuds", "sneakers", "kettle"].includes(product.id) && (
              <RetailScene product={product} />
            )}
            <span className="studio-artwork-label">
              THE EVERYDAY COLLECTION <span>0{state.productIndex + 1}</span>
            </span>
            <motion.div
              initial={false}
              animate={{
                rotate: reduce ? 0 : [-6, 3, -3][state.productIndex],
                y: reduce || state.step < 5 ? 0 : -5,
              }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              <ProductArt product={product} />
            </motion.div>
            <span className="studio-artwork-caption">{product.caption}</span>
          </div>
          <div className="studio-order">
            <span className="commerce-eyebrow">Illustrative product</span>
            <h5>{product.name}</h5>
            <p>{product.detail}</p>
            {product.quantities.length > 1 ? (
              <fieldset className="studio-quantity">
                <legend>Order size · {product.plural}</legend>
                <div>
                  {product.quantities.map((value, i) => (
                    <button
                      type="button"
                      key={value}
                      aria-pressed={selectedQuantity === i}
                      onClick={() => dispatch({ type: "quantity", index: i })}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </fieldset>
            ) : (
              <p className="studio-quantity-static">
                <span>{quantity}</span> {product.unit} · per order
              </p>
            )}
            {/* price tag */}
            <dl className="studio-figures">
              <div>
                <dt>
                  {state.mode === "b2c"
                    ? "Listed price"
                    : state.step === 5
                      ? "Demo agreed price"
                      : "Quantity-tier price"}
                </dt>
                <dd>
                  {money(unit)}
                  <small> / {product.unit}</small>
                </dd>
              </div>
              <div>
                <dt>Goods subtotal</dt>
                <dd>{money(subtotal)}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>{state.step >= 2 ? money(delivery) : "Not confirmed"}</dd>
              </div>
            </dl>
          </div>
        </div>
        {/* video negotiation tiles */}
        <div className="studio-conversation">
          <div className="studio-panel-heading">
            <MessageSquare size={17} aria-hidden="true" />
            <div>
              <h5>{copy.conversationTitle}</h5>
              <span>
                {copy.pairLabel} · Scripted example
                {state.mode === "b2c"
                  ? " · Seller's AI agent answers every buyer at once"
                  : ""}
              </span>
            </div>
          </div>
          <div className="studio-progress">
            <span>{copy.steps[state.step]}</span>
            <span>{state.step} / 5</span>
          </div>
          <ol
            ref={log}
            className="studio-messages"
            aria-label={copy.conversationAria}
            aria-live="polite"
            aria-relevant="additions text"
          >
            {state.step === 0 && (
              <li className="studio-empty">
                <span className="studio-empty-mark">
                  <MessageSquare size={26} aria-hidden="true" />
                </span>
                <h6>
                  {copy.emptyLead}
                  <br />
                  {copy.emptyHint}
                </h6>
                <p>{copy.emptyBody}</p>
                <span>Nothing is sent outside this preview.</span>
              </li>
            )}
            <AnimatePresence initial={false}>
              {visible.map((message) =>
                message.speaker === "system" ? (
                  <motion.li
                    key={`${product.id}-system`}
                    className="studio-message-system"
                    {...(reduce ? {} : bubble)}
                  >
                    <ShieldCheck size={14} aria-hidden="true" />
                    <p>{message.text}</p>
                  </motion.li>
                ) : (
                  <motion.li
                    key={`${product.id}-${message.step}`}
                    className={
                      message.speaker === "Buyer"
                        ? "studio-message studio-message-buyer"
                        : "studio-message"
                    }
                    {...(reduce ? {} : bubble)}
                  >
                    <span>{message.speaker}</span>
                    <p>{message.text}</p>
                  </motion.li>
                ),
              )}
              {typing && (
                <motion.li
                  key="typing"
                  className="studio-message studio-typing"
                  aria-label={`${copy.other} is typing`}
                  {...bubble}
                >
                  <span>{copy.other}</span>
                  <p aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </p>
                </motion.li>
              )}
            </AnimatePresence>
          </ol>
          {state.step === 3 && (
            <div className="studio-draft">
              <span>{copy.draftChip}</span>
              <p>{draft}</p>
              <button
                type="button"
                onClick={() => dispatch({ type: "discard-draft" })}
              >
                {copy.discard}
              </button>
            </div>
          )}
          {state.step >= 1 && state.step < 5 && (
            <form
              className="studio-ask"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.querySelector("input");
                if (input?.value.trim()) {
                  dispatch({ type: "send", text: input.value });
                  input.value = "";
                }
              }}
            >
              <input
                type="text"
                placeholder={
                  state.mode === "b2c"
                    ? "Ask the seller anything…"
                    : "Ask the supplier anything…"
                }
                aria-label={
                  state.mode === "b2c"
                    ? "Ask the seller a question"
                    : "Ask the supplier a question"
                }
                maxLength={200}
              />
              <button type="submit" aria-label="Send message">
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </form>
          )}
          <div className="studio-conversation-actions">
            <button
              type="button"
              className={
                beacon && state.step === 0
                  ? "studio-primary is-beacon"
                  : "studio-primary"
              }
              onClick={next}
              disabled={typing}
              aria-disabled={typing}
            >
              {actions[state.step]}
              {state.step === 5 ? (
                <RotateCcw size={15} aria-hidden="true" />
              ) : (
                <ArrowRight size={15} aria-hidden="true" />
              )}
            </button>
            <span>
              {state.step === 3
                ? state.mode === "b2c"
                  ? "Review the order, then place it only in this demo."
                  : "Review the draft, then send it only in this demo."
                : state.step === 5
                  ? "Illustrative agreement. No order has been placed."
                  : "You control each step. No real messages or orders."}
            </span>
          </div>
        </div>
        <aside className="studio-assistant" aria-labelledby="assistant-title">
          <div className="studio-panel-heading">
            <Sparkles size={18} aria-hidden="true" />
            <div>
              <h5 ref={assistantHeading} tabIndex={-1} id="assistant-title">
                A little help, beside you.
              </h5>
              <span>
                Assistant concept · Scripted, not live AI · Based on general
                market data — turn on AI learning to personalise
              </span>
            </div>
          </div>
          <div
            className="studio-assistant-modes"
            role="group"
            aria-label="Assistant guidance"
          >
            {ASSISTANT_MODES.filter(
              (mode) => !mode.wholesaleOnly || state.mode === "b2b",
            ).map((mode) => (
              <button
                type="button"
                key={mode.id}
                aria-pressed={state.assistant === mode.id}
                onClick={() => dispatch({ type: "assistant", mode: mode.id })}
              >
                {mode.id === "draft" && state.mode === "b2c"
                  ? "Draft order"
                  : mode.label}
              </button>
            ))}
          </div>
          <div className="studio-advice" aria-live="polite" aria-atomic="true">
            {state.step >= 2 && (
              <span className="studio-attribution">
                Based on general market data — personalises after 3 completed
                trades
              </span>
            )}
            {state.step < 2 ? (
              <>
                <span className="studio-advice-label">CONTEXT FIRST</span>
                <h6>
                  Understand the offer
                  <br />
                  before the next move.
                </h6>
                <p>
                  {state.mode === "b2c"
                    ? "Start the example and reveal the seller's price. Then explore the explanation or a suggested order."
                    : "Start the example and reveal the supplier quote. Then explore the explanation, a sample counter-offer, or a suggested reply."}
                </p>
              </>
            ) : state.assistant === "explain" ? (
              <>
                <span className="studio-advice-label">THE OFFER, UNPACKED</span>
                <h6>{money(unit * quantity + delivery)}</h6>
                <p>
                  {quantity} {product.plural} × {money(unit)}, plus{" "}
                  {money(delivery)} delivery for about {totalKg} kg.{" "}
                  {state.step === 5
                    ? "This reflects the demo agreement."
                    : state.mode === "b2c"
                      ? "This is the listed price — retail orders don't negotiate."
                      : "This is the supplier’s quantity-tier quote, not a negotiated discount."}
                </p>
                <div
                  className={
                    above
                      ? "studio-market studio-market-above"
                      : "studio-market"
                  }
                >
                  <DeltaIcon size={14} aria-hidden="true" />
                  <span>
                    <strong>
                      {marketDelta === 0
                        ? "In line with"
                        : `${Math.abs(marketDelta)}% ${above ? "above" : "below"}`}{" "}
                      the reference range
                    </strong>
                    {money(product.market.low)}–{money(product.market.high)} per{" "}
                    {product.market.per} · {product.market.source} ·{" "}
                    {product.market.asOf}
                  </span>
                </div>
                <div className="studio-insight">
                  <Check size={14} aria-hidden="true" />
                  <span>
                    {state.step === 5
                      ? "Terms recorded in Tijarah — invoice, coordinated delivery and support stay with the order for both sides."
                      : product.question}
                  </span>
                </div>
              </>
            ) : state.assistant === "counter" ? (
              <>
                <span className="studio-advice-label">
                  ONE POSSIBLE NEXT STEP
                </span>
                <h6>
                  Explore {money(counterUnit)}
                  <small> per {product.unit}</small>
                </h6>
                <p>
                  This scripted example rounds a 2% reduction from{" "}
                  {money(listedUnit)}. It is not a market prediction or a
                  guaranteed price.
                </p>
                <div className="studio-insight">
                  <span>
                    Difference in goods subtotal:{" "}
                    <strong>
                      {money((listedUnit - counterUnit) * quantity)}
                    </strong>
                    . Delivery stays separate.
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="studio-advice-label">SUGGESTED WORDING</span>
                <h6>
                  Your voice.
                  <br />A starting point.
                </h6>
                <blockquote aria-label={draft}>
                  <span aria-hidden="true">
                    {typedDraft}
                    {typedDraft.length < draft.length && (
                      <i className="studio-caret" />
                    )}
                  </span>
                </blockquote>
                <p>{copy.draftAdvice}</p>
              </>
            )}
          </div>
          <button
            type="button"
            className="studio-use-draft"
            disabled={state.step !== 2}
            onClick={() =>
              dispatch(
                state.assistant === "draft"
                  ? { type: "use-draft" }
                  : { type: "assistant", mode: "draft" },
              )
            }
          >
            {state.step < 2
              ? copy.useAfterQuote
              : state.step === 3
                ? state.mode === "b2c"
                  ? "Order ready for your review"
                  : "Draft ready for your review"
                : state.step > 3
                  ? state.mode === "b2c"
                    ? "Order placed in this example"
                    : "Draft used in this example"
                  : state.assistant !== "draft"
                    ? copy.reviewDraft
                    : copy.useDraft}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
          <p className="studio-assistant-note">
            Assistance, not autopilot. You decide what to send.
          </p>
        </aside>
      </div>
      <div className="studio-disclaimer">
        <span>
          {copy.disclaimer} · Sample assistant suggestions · No order is placed
        </span>
        <span>{copy.resetNote}</span>
      </div>
    </article>
  );
}

function ComparisonScene({ state, dispatch }: SceneProps) {
  const { product, quantity, offers, bestTotal } = getDemo(state);
  const selected = state.offerIndex;
  const offer = offers[selected];
  const reduce = useReducedMotion();
  const maxTotal = Math.max(
    ...offers.map((item) => item.total ?? 0),
    bestTotal ?? 0,
    1,
  );
  return (
    <article
      className="commerce-card commerce-comparison"
      aria-labelledby="comparison-title"
    >
      <div className="commerce-card-heading">
        <span className="commerce-eyebrow">
          <span>02</span> Price comparison
        </span>
        <h4 id="comparison-title">A clearer view. A better decision.</h4>
        <p>Compare the whole offer, not just the headline price.</p>
      </div>
      <div className="commerce-comparison-stage">
        <div className="commerce-table-product">
          <span className="commerce-product-icon">
            {(() => {
              const ProductIcon = PRODUCT_ICONS[product.id] ?? Leaf;
              return <ProductIcon size={20} aria-hidden="true" />;
            })()}
          </span>
          <span>
            <strong>
              {product.name} · {product.detail}
            </strong>
            <small>
              {quantity} {product.plural} · Sample offers
            </small>
          </span>
          <span className="commerce-sample-tag">DEMO</span>
        </div>
        <div className="commerce-table-label">
          <span>
            {state.mode === "b2c" ? "Example seller" : "Example supplier"}
          </span>
          <span>Per {product.unit} · landed</span>
        </div>
        <div
          className="commerce-offers"
          role="group"
          aria-label={
            state.mode === "b2c"
              ? "Compare sample seller offers"
              : "Compare sample supplier offers"
          }
        >
          {offers.map((item, i) => {
            const best = item.total !== null && item.total === bestTotal;
            return (
              <button
                type="button"
                key={item.name}
                aria-pressed={selected === i}
                onClick={() => dispatch({ type: "offer", index: i })}
              >
                <span className="commerce-radio" aria-hidden="true">
                  {selected === i && <Check size={12} />}
                </span>
                <span className="commerce-offer-body">
                  <strong>
                    {item.name}
                    {best && (
                      <em className="commerce-best">Lowest landed cost</em>
                    )}
                  </strong>
                  <small>{item.note}</small>
                  <span className="commerce-bar" aria-hidden="true">
                    <motion.i
                      initial={false}
                      animate={{
                        scaleX: item.total === null ? 0 : item.total / maxTotal,
                      }}
                      transition={{
                        duration: reduce ? 0 : 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </span>
                </span>
                <span className="commerce-unit">
                  {money(item.unit)}
                  <small>
                    {item.total === null ? "awaiting quote" : money(item.total)}
                  </small>
                </span>
              </button>
            );
          })}
        </div>
        <div
          className="commerce-comparison-total"
          aria-live="polite"
          aria-atomic="true"
        >
          <span>
            <small>
              {quantity} {product.plural} ·{" "}
              {offer.delivery === null
                ? "Delivery not confirmed"
                : `${money(offer.delivery)} delivery`}
            </small>
            <strong>
              {offer.total === null
                ? "Awaiting delivery quote"
                : money(offer.total)}
            </strong>
          </span>
          <span className="commerce-total-label">
            Example
            <br />
            landed cost
          </span>
        </div>
      </div>
      <p className="commerce-card-caption">
        Sample offers for your selected product and quantity.{" "}
        {MODE_COPY[state.mode].other} follows the conversation above — the
        cheapest unit price isn’t always the cheapest delivered order.
      </p>
    </article>
  );
}

const ROUTE =
  "M80 162 L177 162 Q190 162 190 148 L190 103 Q190 89 205 89 L289 89 Q303 89 303 74 L303 52 L410 52";
const ROUTE_PROGRESS = [0.04, 0.53, 1];

function DeliveryScene({ state, dispatch }: SceneProps) {
  const { product, quantity } = getDemo(state);
  const stage = state.deliveryStep;
  const escrow = MODE_COPY[state.mode].escrow;
  const reduce = useReducedMotion();
  const routeRef = useRef<SVGPathElement>(null);
  const progress = useMotionValue(ROUTE_PROGRESS[0]);
  const pointAt = useCallback((p: number, axis: "x" | "y") => {
    const path = routeRef.current;
    if (!path) return axis === "x" ? 80 : 162;
    return path.getPointAtLength(p * path.getTotalLength())[axis];
  }, []);
  const cx = useTransform(progress, (p) => pointAt(p, "x"));
  const cy = useTransform(progress, (p) => pointAt(p, "y"));
  useEffect(() => {
    const controls = animate(progress, ROUTE_PROGRESS[stage], {
      duration: reduce ? 0 : 0.85,
      ease: "easeInOut",
    });
    return () => controls.stop();
  }, [stage, reduce, progress]);
  return (
    <article
      className="commerce-card commerce-delivery"
      aria-labelledby="delivery-title"
    >
      <div className="commerce-card-heading">
        <span className="commerce-eyebrow">
          <span>03</span> Protected delivery
        </span>
        <h4 id="delivery-title">Booked, tracked, and paid — on-platform.</h4>
        <p>
          Tijarah books the courier itself, so the seller never needs your phone
          — and your payment releases only when the parcel actually lands.
        </p>
      </div>
      <div className="commerce-map-stage">
        <svg
          viewBox="0 0 500 240"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <rect width="500" height="240" fill="var(--commerce-map)" />
          <g
            fill="var(--commerce-block)"
            stroke="var(--commerce-road)"
            strokeWidth="7"
            transform="rotate(-15 250 120)"
          >
            {[0, 1, 2, 3, 4, 5].map((x) =>
              [0, 1, 2, 3].map((y) => (
                <rect
                  key={`${x}-${y}`}
                  x={x * 98 - 50}
                  y={y * 80 - 65}
                  width="82"
                  height="65"
                  rx="10"
                />
              )),
            )}
          </g>
          <path
            d="M340 -20 Q270 50 360 105 T342 260"
            fill="none"
            stroke="var(--commerce-water)"
            strokeWidth="32"
          />
          <path
            ref={routeRef}
            d={ROUTE}
            fill="none"
            stroke="var(--commerce-route-track)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.path
            initial={false}
            animate={{ pathLength: ROUTE_PROGRESS[stage] }}
            transition={{ duration: reduce ? 0 : 0.85, ease: "easeInOut" }}
            d={ROUTE}
            fill="none"
            stroke="#5143d9"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <circle
            cx="80"
            cy="162"
            r="8"
            fill="#fff"
            stroke="#5143d9"
            strokeWidth="3"
          />
          <circle
            cx="410"
            cy="52"
            r="8"
            fill={stage === 2 ? "#5143d9" : "#fff"}
            stroke="#5143d9"
            strokeWidth="3"
          />
          <motion.g style={{ x: cx, y: cy }}>
            <circle r="13" fill="#5143d9" opacity="0.18" />
            <circle r="9" fill="#fff" stroke="#5143d9" strokeWidth="2.5" />
            <Truck
              x={-6}
              y={-6}
              width={12}
              height={12}
              color="#5143d9"
              strokeWidth={2.4}
            />
          </motion.g>
        </svg>
        <span className="commerce-map-label">
          <MapPin size={13} aria-hidden="true" /> Illustrative route
        </span>
        <div
          className="commerce-delivery-status"
          aria-live="polite"
          aria-atomic="true"
        >
          <span className="commerce-delivery-icon">
            {stage === 2 ? (
              <PackageCheck size={21} aria-hidden="true" />
            ) : (
              <Truck size={21} aria-hidden="true" />
            )}
          </span>
          <span>
            <small>
              Delivery concept · Courier booked by Tijarah · {product.name} ·{" "}
              {quantity} {product.plural}
            </small>
            <strong>{STAGES[stage]}</strong>
          </span>
          <span className="commerce-step-count">0{stage + 1} / 03</span>
        </div>
      </div>
      <div className="commerce-delivery-escrow" aria-live="polite">
        <span className="commerce-escrow-chip">
          <LockKeyhole size={13} aria-hidden="true" />
          {stage === 2 ? escrow.released : escrow.held}
        </span>
        <span className="commerce-remit-chip">
          <Timer size={13} aria-hidden="true" />
          {stage === 2 ? escrow.post : escrow.pre}
        </span>
      </div>
      <div className="commerce-delivery-controls">
        <ol aria-label="Delivery stages">
          {STAGES.map((name, i) => (
            <li key={name} aria-current={stage === i ? "step" : undefined}>
              <span className={i <= stage ? "is-complete" : ""} />
              {name}
            </li>
          ))}
        </ol>
        <button
          type="button"
          className="commerce-text-button"
          onClick={() => dispatch({ type: "delivery" })}
        >
          {stage === 2 ? "Replay journey" : "Next step"}
          {stage === 2 ? (
            <RotateCcw size={14} aria-hidden="true" />
          ) : (
            <ArrowRight size={14} aria-hidden="true" />
          )}
        </button>
      </div>
    </article>
  );
}

function SupportingScenes({ state }: { state: DemoState }) {
  const { product, quantity } = getDemo(state);
  const [preference, setPreference] = useState(false);
  return (
    <div className="commerce-support-grid">
      <Reveal>
        <article className="commerce-card commerce-support commerce-provenance">
          <div className="commerce-card-heading">
            <span className="commerce-eyebrow">
              <span>04</span> Product provenance
            </span>
            <h4>
              Know more.
              <br />
              Buy with confidence.
            </h4>
            <p>
              Explore a concept for product records that make the details easier
              to inspect.
            </p>
          </div>
          <div className="commerce-certificate">
            <span className="commerce-certificate-top">
              <ScanLine size={19} aria-hidden="true" />
              <span>PRODUCT RECORD</span>
            </span>
            <strong>{product.name}</strong>
            <span className="commerce-record-id">
              EXAMPLE / {product.record}
            </span>
            <dl>
              <div>
                <dt>Details</dt>
                <dd>{product.detail}</dd>
              </div>
              <div>
                <dt>Record type</dt>
                <dd>Sample certificate</dd>
              </div>
            </dl>
            <details>
              <summary>
                Inspect sample record
                <ChevronRight size={14} aria-hidden="true" />
              </summary>
              <p>
                Illustrative batch {product.record}. A real record would need
                issuer and source checks; a certificate alone does not guarantee
                authenticity.
              </p>
            </details>
          </div>
        </article>
      </Reveal>
      <Reveal delay={0.06}>
        <article className="commerce-card commerce-support commerce-discovery">
          <div className="commerce-card-heading">
            <span className="commerce-eyebrow">
              <span>05</span> Assisted discovery
            </span>
            <h4>
              Less searching.
              <br />
              More finding.
            </h4>
            <p>
              A direction for recommendations shaped around what you are looking
              for.
            </p>
          </div>
          <div className="commerce-discovery-stage">
            <span className="commerce-discovery-prompt">
              <Sparkles size={16} aria-hidden="true" /> What matters to you?
            </span>
            <button
              type="button"
              className="commerce-preference"
              aria-pressed={preference}
              onClick={() => setPreference(!preference)}
            >
              {preference ? (
                <Check size={14} aria-hidden="true" />
              ) : (
                <Leaf size={14} aria-hidden="true" />
              )}
              Prefer bulk quantities
            </button>
            <div className="commerce-recommendation">
              <ProductArt product={product} compact />
              <span aria-live="polite">
                <small>Example suggestion</small>
                <strong>
                  {preference ? "Stock the shelves" : "Start with a staple"}
                </strong>
                <span>
                  {product.name} ·{" "}
                  {preference
                    ? `${quantity} ${product.plural}`
                    : product.detail}
                </span>
              </span>
            </div>
          </div>
        </article>
      </Reveal>
      <Reveal delay={0.12}>
        <article className="commerce-card commerce-support commerce-rewards">
          <div className="commerce-card-heading">
            <span className="commerce-eyebrow">
              <span>06</span> Rewards & tiers
            </span>
            <h4>
              Everyday shopping.
              <br />
              Something extra.
            </h4>
            <p>
              A preview of how shopping milestones could become meaningful
              rewards.
            </p>
          </div>
          <div className="commerce-membership">
            <div>
              <span>TIJARAH</span>
              <Sprout size={24} aria-hidden="true" />
            </div>
            <small>A little closer to your next milestone</small>
            <strong>Grow as you go.</strong>
            <div
              className="commerce-membership-progress"
              role="img"
              aria-label="Illustrative rewards progress: 3 of 5 milestones"
            >
              <i />
              <i />
              <i />
              <i />
              <i />
            </div>
            <span className="commerce-membership-foot">
              <span>03 / 05 milestones</span>
              <span>Concept only</span>
            </span>
          </div>
        </article>
      </Reveal>
    </div>
  );
}

function DemoGuide({
  done,
  active,
  mode,
}: {
  done: Record<GuideFlow, boolean>;
  active: GuideFlow;
  mode: DemoState["mode"];
}) {
  const count = Object.values(done).filter(Boolean).length;
  const jump = (target: string) => {
    const el = document.getElementById(target);
    el?.closest("article")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
    el?.focus?.();
  };
  return (
    <nav className="commerce-guide" aria-label="Demo flows">
      <span className="commerce-guide-lead">
        <strong>Take the tour</strong>
        <small>3 short flows · about 2 minutes · nothing is real</small>
      </span>
      <ol>
        {GUIDE.map((flow, i) => (
          <li key={flow.id}>
            <button
              type="button"
              onClick={() => jump(flow.target)}
              aria-current={active === flow.id ? "step" : undefined}
              data-done={done[flow.id] || undefined}
            >
              <span aria-hidden="true">
                {done[flow.id] ? <Check size={11} /> : flow.n}
              </span>
              {MODE_COPY[mode].guide[i]}
            </button>
          </li>
        ))}
      </ol>
      <span className="commerce-guide-count" aria-live="polite">
        {count} / 3 done
      </span>
    </nav>
  );
}

type Shell = {
  demo: DemoState;
  done: Record<GuideFlow, boolean>;
  interacted: boolean;
};
const INITIAL_SHELL: Shell = {
  demo: INITIAL_DEMO,
  done: { negotiate: false, compare: false, deliver: false },
  interacted: false,
};
/** Wraps the demo reducer so tour progress is derived from the same
 *  transition — no effects watching state after the fact. */
function shellReducer(shell: Shell, action: DemoAction): Shell {
  const demo = demoReducer(shell.demo, action);
  return {
    demo,
    interacted: true,
    done: {
      negotiate: shell.done.negotiate || demo.step === 5,
      compare: shell.done.compare || action.type === "offer",
      deliver: shell.done.deliver || demo.deliveryStep === 2,
    },
  };
}

export function InsideTijarah() {
  const [{ demo: state, done, interacted }, dispatch] = useReducer(
    shellReducer,
    INITIAL_SHELL,
  );
  const active: GuideFlow = !done.negotiate
    ? "negotiate"
    : !done.compare
      ? "compare"
      : "deliver";
  return (
    <div id="inside-tijarah" className="commerce-showcase">
      <Reveal>
        <div className="commerce-intro">
          <div>
            <span className="commerce-eyebrow">Inside Tijarah</span>
            <h3>
              Real people.
              <br />A more connected marketplace.
            </h3>
          </div>
          <div>
            <p>
              From the first conversation to the final delivery — with the
              order, payment, delivery and support kept inside Tijarah.
            </p>
            <span className="commerce-concept-label">
              Product concept · Illustrative data
            </span>
            {/* Not a tablist — there are no tab panels. A pressed-state
                toggle group is the correct pattern. */}
            <div
              className="commerce-mode"
              role="group"
              aria-label="Demo audience"
            >
              {(["b2b", "b2c"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  aria-pressed={state.mode === m}
                  className={state.mode === m ? "is-active" : ""}
                  onClick={() => dispatch({ type: "mode", mode: m })}
                >
                  {MODE_COPY[m].label}
                </button>
              ))}
            </div>
            <small>In development. Features and availability may change.</small>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <DemoGuide done={done} active={active} mode={state.mode} />
      </Reveal>
      <Reveal>
        <WholesaleScene
          state={state}
          dispatch={dispatch}
          beacon={!interacted}
        />
      </Reveal>
      <div className="commerce-main-grid">
        <Reveal>
          <ComparisonScene state={state} dispatch={dispatch} />
        </Reveal>
        <Reveal delay={0.08}>
          <DeliveryScene state={state} dispatch={dispatch} />
        </Reveal>
      </div>
      <SupportingScenes
        key={`${state.productIndex}-${state.quantityIndex}`}
        state={state}
      />
      <Reveal>
        <div className="commerce-card ai-receipt" role="note">
          <div className="ai-receipt-head">
            <span className="commerce-eyebrow">Tijarah AI — learning</span>
            <strong>Learns prices, not people.</strong>
            <span dir="rtl" lang="ur" className="ai-receipt-ur">
              AI صرف بازار کا حساب سیکھتا ہے — آپ کی باتیں، نام یا ادائیگی نہیں۔
            </span>
          </div>
          <div className="ai-receipt-grid" aria-label="What Tijarah AI sees">
            <span>
              📈 Market patterns <em>yes</em>
            </span>
            <span>
              💬 Your messages <em>never</em>
            </span>
            <span>
              🪪 Your name <em>never</em>
            </span>
            <span>
              💳 Payment details <em>never</em>
            </span>
          </div>
          <div className="ai-receipt-attrib">
            <span>Every suggestion carries its source:</span>
            <div>
              <em>“Based on general market data”</em>
              <em>“Sharpened by your trade patterns”</em>
              <em>“Sharpened by both sides’ trade patterns”</em>
              <em>“Sharpened by the counterparty’s trade patterns”</em>
            </div>
          </div>
          <small>
            Founding Members teach it first — with locked launch pricing and
            Tijarah Protection on their first orders. Every member gets a
            receipt page showing exactly what the AI holds about them.
          </small>
        </div>
      </Reveal>
      <Reveal>
        <div className="commerce-closing">
          <span>
            This is a preview of the vision. Be part of what comes next.
          </span>
          <a
            href="https://tijarah.pk"
            target="_blank"
            rel="noopener noreferrer"
          >
            Join the Tijarah waitlist
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </div>
  );
}
