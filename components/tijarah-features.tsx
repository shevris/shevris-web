"use client";

import {
  useEffect,
  useId,
  useReducer,
  useRef,
  useState,
  type Dispatch,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Coffee,
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
  Truck,
} from "lucide-react";
import {
  PRODUCTS,
  INITIAL_DEMO,
  demoReducer,
  getDemo,
  money,
  type DemoState,
  type DemoAction,
  type Product,
  type AssistantMode,
} from "@/lib/commerce-demo";
import { Reveal } from "./reveal";

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
const ASSISTANT_MODES: { id: AssistantMode; label: string }[] = [
  { id: "explain", label: "Explain" },
  { id: "counter", label: "Counter-offer" },
  { id: "draft", label: "Draft reply" },
];
type SceneProps = { state: DemoState; dispatch: Dispatch<DemoAction> };

function WholesaleScene({ state, dispatch }: SceneProps) {
  const {
    product,
    quantity,
    unit,
    listedUnit,
    counterUnit,
    subtotal,
    draft,
    messages,
  } = getDemo(state);
  const reduce = useReducedMotion();
  const log = useRef<HTMLOListElement>(null);
  const assistantHeading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (log.current) log.current.scrollTop = log.current.scrollHeight;
  }, [state.step]);
  const actions = [
    "Start example",
    "Show supplier quote",
    "Review assistant draft",
    "Send reply in demo",
    "Show supplier response",
    "Replay conversation",
  ];
  const next = () => {
    if (state.step === 5) dispatch({ type: "restart" });
    else if (state.step === 2) {
      dispatch({ type: "assistant", mode: "draft" });
      assistantHeading.current?.focus();
    } else dispatch({ type: "advance" });
  };
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
          {PRODUCTS.map((item, i) => {
            const Icon = i === 0 ? Leaf : i === 1 ? Shirt : Coffee;
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
          <span aria-hidden="true">0{state.productIndex + 1} / 03</span>
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
        {product.category}, {state.productIndex + 1} of {PRODUCTS.length}.{" "}
        {quantity} {product.plural}. {NEGOTIATION_STEPS[state.step]}.
      </p>
      <div
        id="studio-story"
        className="studio-panels"
        role="group"
        aria-roledescription="slide"
        aria-label={`${product.category}: ${product.name}, ${state.productIndex + 1} of ${PRODUCTS.length}`}
      >
        <div className={`studio-product studio-product-${product.id}`}>
          <div className="studio-artwork">
            {product.id === "rice" && <Fieldscape />}
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
            <fieldset className="studio-quantity">
              <legend>Order size · {product.plural}</legend>
              <div>
                {product.quantities.map((value, i) => (
                  <button
                    type="button"
                    key={value}
                    aria-pressed={state.quantityIndex === i}
                    onClick={() => dispatch({ type: "quantity", index: i })}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </fieldset>
            {/* price tag */}
            <dl className="studio-figures">
              <div>
                <dt>
                  {state.step === 5
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
                <dd>
                  {state.step >= 2 ? money(product.delivery) : "Not confirmed"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        {/* video negotiation tiles */}
        <div className="studio-conversation">
          <div className="studio-panel-heading">
            <MessageSquare size={17} aria-hidden="true" />
            <div>
              <h5>At the negotiation table</h5>
              <span>Buyer + Supplier A · Scripted example</span>
            </div>
          </div>
          <div className="studio-progress">
            <span>{NEGOTIATION_STEPS[state.step]}</span>
            <span>{state.step} / 5</span>
          </div>
          <ol
            ref={log}
            className="studio-messages"
            aria-label="Example buyer and supplier conversation"
            aria-live="polite"
            aria-relevant="additions text"
          >
            {state.step === 0 && (
              <li className="studio-empty">
                <span className="studio-empty-mark">
                  <MessageSquare size={26} aria-hidden="true" />
                </span>
                <h6>
                  A good deal starts
                  <br />
                  with a conversation.
                </h6>
                <p>
                  Walk through a buyer enquiry, supplier quote, and a
                  counter-offer you choose to send.
                </p>
                <span>Nothing is sent outside this preview.</span>
              </li>
            )}
            {messages.map((message) =>
              message.speaker === "system" ? (
                <li
                  key={`${product.id}-system`}
                  className="studio-message-system"
                >
                  <ShieldCheck size={14} aria-hidden="true" />
                  <p>{message.text}</p>
                </li>
              ) : (
                <li
                  key={`${product.id}-${message.step}`}
                  className={
                    message.speaker === "Buyer"
                      ? "studio-message studio-message-buyer"
                      : "studio-message"
                  }
                >
                  <span>{message.speaker}</span>
                  <p>{message.text}</p>
                </li>
              ),
            )}
          </ol>
          {state.step === 3 && (
            <div className="studio-draft">
              <span>YOUR DRAFT · NOT SENT</span>
              <p>{draft}</p>
              <button
                type="button"
                onClick={() => dispatch({ type: "discard-draft" })}
              >
                Discard draft
              </button>
            </div>
          )}
          <div className="studio-conversation-actions">
            <button type="button" className="studio-primary" onClick={next}>
              {actions[state.step]}
              {state.step === 5 ? (
                <RotateCcw size={15} aria-hidden="true" />
              ) : (
                <ArrowRight size={15} aria-hidden="true" />
              )}
            </button>
            <span>
              {state.step === 3
                ? "Review the draft, then send it only in this demo."
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
              <span>Assistant concept · Scripted, not live AI</span>
            </div>
          </div>
          <div
            className="studio-assistant-modes"
            role="group"
            aria-label="Assistant guidance"
          >
            {ASSISTANT_MODES.map((mode) => (
              <button
                type="button"
                key={mode.id}
                aria-pressed={state.assistant === mode.id}
                onClick={() => dispatch({ type: "assistant", mode: mode.id })}
              >
                {mode.label}
              </button>
            ))}
          </div>
          <div className="studio-advice" aria-live="polite" aria-atomic="true">
            {state.step < 2 ? (
              <>
                <span className="studio-advice-label">CONTEXT FIRST</span>
                <h6>
                  Understand the offer
                  <br />
                  before the next move.
                </h6>
                <p>
                  Start the example and reveal the supplier quote. Then explore
                  the explanation, a sample counter-offer, or a suggested reply.
                </p>
              </>
            ) : state.assistant === "explain" ? (
              <>
                <span className="studio-advice-label">THE OFFER, UNPACKED</span>
                <h6>{money(unit * quantity + product.delivery)}</h6>
                <p>
                  {quantity} {product.plural} × {money(unit)}, plus{" "}
                  {money(product.delivery)} delivery.{" "}
                  {state.step === 5
                    ? "This reflects the demo agreement."
                    : "This is the supplier’s quantity-tier quote, not a negotiated discount."}
                </p>
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
                <blockquote>{draft}</blockquote>
                <p>
                  Review before using. This sample asks for terms; it does not
                  accept a deal for you.
                </p>
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
              ? "Available after supplier quote"
              : state.step === 3
                ? "Draft ready for your review"
                : state.step > 3
                  ? "Draft used in this example"
                  : state.assistant !== "draft"
                    ? "Review suggested reply"
                    : "Use this draft in the demo"}
            <ArrowRight size={14} aria-hidden="true" />
          </button>
          <p className="studio-assistant-note">
            Assistance, not autopilot. You decide what to send.
          </p>
        </aside>
      </div>
      <div className="studio-disclaimer">
        <span>
          Illustrative negotiation · Sample assistant suggestions · No order is
          placed
        </span>
        <span>Changing product or quantity resets the example.</span>
      </div>
    </article>
  );
}

function ComparisonScene({ state, dispatch }: SceneProps) {
  const { product, quantity, offers } = getDemo(state);
  const selected = state.offerIndex;
  const offer = offers[selected];
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
            <Leaf size={20} aria-hidden="true" />
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
          <span>Example supplier</span>
          <span>Per {product.unit}</span>
        </div>
        <div
          className="commerce-offers"
          role="group"
          aria-label="Compare sample supplier offers"
        >
          {offers.map((item, i) => (
            <button
              type="button"
              key={item.name}
              aria-pressed={selected === i}
              onClick={() => dispatch({ type: "offer", index: i })}
            >
              <span className="commerce-radio" aria-hidden="true">
                {selected === i && <Check size={12} />}
              </span>
              <span>
                <strong>{item.name}</strong>
                <small>{item.note}</small>
              </span>
              <span className="commerce-unit">{money(item.unit)}</span>
            </button>
          ))}
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
        Sample offers for your selected product and quantity. Supplier A follows
        the conversation above.
      </p>
    </article>
  );
}

function DeliveryScene({ state, dispatch }: SceneProps) {
  const { product, quantity } = getDemo(state);
  const stage = state.deliveryStep;
  const reduce = useReducedMotion();
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
            d="M80 162 L177 162 Q190 162 190 148 L190 103 Q190 89 205 89 L289 89 Q303 89 303 74 L303 52 L410 52"
            fill="none"
            stroke="var(--commerce-route-track)"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <motion.path
            initial={false}
            animate={{ pathLength: [0.04, 0.53, 1][stage] }}
            transition={{ duration: reduce ? 0 : 0.85, ease: "easeInOut" }}
            d="M80 162 L177 162 Q190 162 190 148 L190 103 Q190 89 205 89 L289 89 Q303 89 303 74 L303 52 L410 52"
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
          {stage === 2
            ? "Payment released — delivery confirmed"
            : "Payment held in escrow"}
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

export function InsideTijarah() {
  const [state, dispatch] = useReducer(demoReducer, INITIAL_DEMO);
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
            <small>In development. Features and availability may change.</small>
          </div>
        </div>
      </Reveal>
      <Reveal>
        <WholesaleScene state={state} dispatch={dispatch} />
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
