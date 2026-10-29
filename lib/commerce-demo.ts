export const PRODUCTS = [
  {
    id: "rice",
    category: "Food & staples",
    name: "Basmati rice",
    detail: "1 kg pack · Super Basmati",
    unit: "pack",
    plural: "packs",
    weightKg: 1,
    quantities: [50, 100, 200],
    rates: [380, 365, 350],
    premium: 25,
    record: "BR-001",
    caption: "From the harvest to your shelves.",
    question: "Please confirm the pack size and delivery charge.",
    market: {
      low: 340,
      high: 370,
      per: "kg",
      source: "Akbari Mandi, Lahore — Super Basmati (new crop)",
      asOf: "Jun 2026",
    },
  },
  {
    id: "apparel",
    category: "Apparel",
    name: "Cotton T-shirt",
    detail: "Unisex · sample size M",
    unit: "piece",
    plural: "pieces",
    weightKg: 0.25,
    quantities: [25, 50, 100],
    rates: [850, 800, 750],
    premium: 15,
    record: "CT-002",
    caption: "Good essentials. Thoughtfully sourced.",
    question: "Please confirm the size breakdown before dispatch.",
    market: {
      low: 700,
      high: 900,
      per: "piece",
      source: "Indicative range — plain combed-cotton tees",
      asOf: "2026",
    },
  },
  {
    id: "home",
    category: "Home essentials",
    name: "Ceramic mug",
    detail: "350 ml · warm ivory",
    unit: "piece",
    plural: "pieces",
    weightKg: 0.45,
    quantities: [24, 48, 96],
    rates: [580, 550, 520],
    premium: 20,
    record: "CM-003",
    caption: "Everyday objects. Lasting connections.",
    question: "Please confirm protective packaging and delivery charges.",
    market: {
      low: 450,
      high: 650,
      per: "piece",
      source: "Indicative range — 350 ml stoneware mugs",
      asOf: "2026",
    },
  },
] as const;

/** Illustrative freight tariffs: a base booking fee plus a per-kg rate, the
 *  way Pakistani couriers actually bill bulk consignments (see PostEx /
 *  Leopards economy slabs). Rounded to the nearest PKR 50. */
export const COURIERS = {
  intercity: { base: 300, perKg: 18, route: "Lahore → Karachi · economy" },
  overland: { base: 200, perKg: 24, route: "Sheikhupura → Karachi · overland" },
} as const;

/** How long the courier holds collected COD before remitting it onward.
 *  Leopards (the first carrier) remits in about a week. */
export const COD_REMITTANCE_DAYS = "≈7 working days";

/** Everyday-shopping catalogue (B2C) — single units, retail prices. Same
 *  scene skeleton as wholesale; the trade-off scene becomes seller
 *  comparison and the negotiation becomes escrow-protected checkout. */
export const B2C_PRODUCTS = [
  {
    id: "earbuds",
    category: "Electronics",
    name: "Wireless earbuds",
    detail: "Bluetooth 5.3 · charging case",
    unit: "piece",
    plural: "pieces",
    weightKg: 0.1,
    quantities: [1],
    rates: [2800],
    premium: 300,
    record: "WE-101",
    caption: "Small tech, honestly listed.",
    question: "Is this the sealed original with warranty?",
    market: {
      low: 2400,
      high: 3200,
      per: "piece",
      source: "Indicative range — budget TWS earbuds",
      asOf: "2026",
    },
  },
  {
    id: "sneakers",
    category: "Footwear",
    name: "Running shoes",
    detail: "Unisex · breathable knit",
    unit: "pair",
    plural: "pairs",
    weightKg: 0.8,
    quantities: [1],
    rates: [4500],
    premium: 500,
    record: "RS-102",
    caption: "Everyday wear, verified sellers.",
    question: "Please confirm the size and original box.",
    market: {
      low: 3800,
      high: 5500,
      per: "pair",
      source: "Indicative range — knit running shoes",
      asOf: "2026",
    },
  },
  {
    id: "kettle",
    category: "Home appliances",
    name: "Electric kettle",
    detail: "1.7 L · stainless steel",
    unit: "piece",
    plural: "pieces",
    weightKg: 1.2,
    quantities: [1],
    rates: [3900],
    premium: 350,
    record: "EK-103",
    caption: "Household essentials, protected checkout.",
    question: "Please confirm the plug type and warranty card.",
    market: {
      low: 3300,
      high: 4600,
      per: "piece",
      source: "Indicative range — 1.7 L steel kettles",
      asOf: "2026",
    },
  },
] as const;

export type DemoMode = "b2b" | "b2c";
export type Product = (typeof PRODUCTS)[number] | (typeof B2C_PRODUCTS)[number];
export type AssistantMode = "explain" | "counter" | "draft";
export type DemoState = {
  mode: DemoMode;
  productIndex: number;
  quantityIndex: number;
  step: number;
  offerIndex: number;
  deliveryStep: number;
  assistant: AssistantMode;
  customMessages: { speaker: string; text: string }[];
  customPrice: number | null;
  courier: keyof typeof COURIERS;
  payment: "cod" | "prepaid";
  trackingView: "standard" | "detailed";
};
export type DemoAction =
  | { type: "product" | "quantity" | "offer"; index: number }
  | { type: "assistant"; mode: AssistantMode }
  | { type: "mode"; mode: DemoMode }
  | { type: "send"; text: string }
  | { type: "price"; value: number | null }
  | { type: "courier"; value: keyof typeof COURIERS }
  | { type: "payment"; value: "cod" | "prepaid" }
  | { type: "trackview"; value: "standard" | "detailed" }
  | {
      type: "advance" | "use-draft" | "discard-draft" | "restart" | "delivery";
    };

export const INITIAL_DEMO: DemoState = {
  mode: "b2b",
  productIndex: 0,
  quantityIndex: 1,
  step: 0,
  offerIndex: 0,
  deliveryStep: 0,
  assistant: "explain",
  customMessages: [],
  customPrice: null,
  courier: "intercity",
  payment: "prepaid",
  trackingView: "standard",
};

export const catalogFor = (mode: DemoMode) =>
  mode === "b2c" ? B2C_PRODUCTS : PRODUCTS;

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "mode":
      return { ...INITIAL_DEMO, mode: action.mode };
    case "product":
      return {
        ...INITIAL_DEMO,
        mode: state.mode,
        productIndex:
          ((action.index % catalogFor(state.mode).length) +
            catalogFor(state.mode).length) %
          catalogFor(state.mode).length,
      };
    case "quantity":
      return {
        ...INITIAL_DEMO,
        mode: state.mode,
        productIndex: state.productIndex,
        quantityIndex: Math.max(0, Math.min(2, action.index)),
      };
    case "offer":
      return {
        ...state,
        offerIndex: Math.max(0, Math.min(2, action.index)),
        deliveryStep: 0,
      };
    case "assistant":
      return { ...state, assistant: action.mode };
    case "price":
      return { ...state, customPrice: action.value };
    case "courier":
      return { ...state, courier: action.value };
    case "payment":
      return { ...state, payment: action.value };
    case "send":
      return action.text.trim()
        ? {
            ...state,
            customMessages: [
              ...state.customMessages,
              { speaker: "Buyer", text: action.text.trim() },
            ],
          }
        : state;
    case "use-draft":
      return state.step === 2
        ? { ...state, step: 3, assistant: "draft" }
        : state;
    case "discard-draft":
      return state.step === 3 ? { ...state, step: 2 } : state;
    case "advance":
      return [0, 1, 3, 4].includes(state.step)
        ? { ...state, step: state.step + 1, deliveryStep: 0 }
        : state;
    case "restart":
      return {
        ...INITIAL_DEMO,
        mode: state.mode,
        productIndex: state.productIndex,
        quantityIndex: state.quantityIndex,
      };
    case "delivery":
      return { ...state, deliveryStep: (state.deliveryStep + 1) % 5 };
    case "trackview":
      return { ...state, trackingView: action.value };
  }
}

export const money = (value: number) =>
  `PKR ${value.toLocaleString("en-PK", { maximumFractionDigits: 2 })}`;

export function freight(
  product: Product,
  quantity: number,
  courier: keyof typeof COURIERS,
) {
  const { base, perKg } = COURIERS[courier];
  return Math.round((base + perKg * product.weightKg * quantity) / 50) * 50;
}

/** Signed % of the quoted unit price against the mid-point of the reference
 *  range. Positive = above market. */
export function marketDelta(product: Product, unit: number) {
  const mid = (product.market.low + product.market.high) / 2;
  return Math.round(((unit - mid) / mid) * 100);
}

export function getDemo(state: DemoState) {
  const isB2c = state.mode === "b2c";
  const catalog = catalogFor(state.mode);
  const product = catalog[state.productIndex];
  const quantityIndex = Math.min(
    state.quantityIndex,
    product.quantities.length - 1,
  );
  const quantity = product.quantities[quantityIndex];
  const listedUnit = product.rates[quantityIndex];
  const counterUnit = Math.round(listedUnit * 0.98);
  // B2C never negotiates — the confirmed price stays the listed price.
  const unit = state.step === 5 && !isB2c ? counterUnit : listedUnit;
  const delivery = freight(product, quantity, state.courier);
  const totalKg = product.weightKg * quantity;
  const sellerLabel = isB2c ? "Seller" : "Supplier";
  const customUnit = state.customPrice;
  // Deterministic per-product market noise — sellers don't price identically.
  const jitterPct =
    ((product.id.charCodeAt(product.id.length - 1) % 5) - 2) / 100;
  const offers = [
    {
      name: `${sellerLabel} A`,
      unit: customUnit ?? unit,
      delivery: state.step >= 2 ? delivery : null,
      note:
        state.step === 5
          ? isB2c
            ? "Escrow checkout · paid into Tijarah"
            : "Demo negotiated terms"
          : `Featured conversation · ${COURIERS[state.courier].route}`,
    },
    {
      name: `${sellerLabel} B`,
      unit: Math.round((listedUnit + product.premium) * (1 + jitterPct)),
      delivery: 0,
      note: "Delivery included in price",
    },
    {
      name: `${sellerLabel} C`,
      unit: Math.round(
        (listedUnit - Math.round(product.premium * 0.4)) * (1 - jitterPct / 2),
      ),
      delivery: freight(product, quantity, "overland"),
      note: `Lower unit price · ${COURIERS.overland.route}`,
    },
  ].map((offer) => ({
    ...offer,
    total:
      offer.delivery === null ? null : offer.unit * quantity + offer.delivery,
  }));
  const knownTotals = offers
    .map((offer) => offer.total)
    .filter((total): total is number => total !== null);
  const bestTotal = knownTotals.length ? Math.min(...knownTotals) : null;
  // B2C doesn't negotiate — the same step becomes the escrow checkout.
  const isCod = state.payment === "cod";
  const draft = isB2c
    ? isCod
      ? `I'd like to order this — I'll pay the courier at my door. ${product.question}`
      : `I'd like to order this — pay into Tijarah's escrow now, release to the seller when it arrives? ${product.question}`
    : `Would ${money(counterUnit)} per ${product.unit} work for ${quantity} ${product.plural}, with payment on delivery? ${product.question}`;
  const messages = isB2c
    ? [
        {
          step: 1,
          speaker: "Buyer",
          text: `I'd like the ${product.name.toLowerCase()} — ${product.detail}. Is it in stock, and how much is delivery to Karachi?`,
        },
        {
          step: 2,
          speaker: `${sellerLabel} A`,
          text: isCod
            ? `In stock — ${money(listedUnit)} plus ${money(delivery)} delivery, dispatched tomorrow. The courier collects the payment at your door.`
            : `In stock — ${money(listedUnit)} plus ${money(delivery)} delivery, dispatched tomorrow. Tijarah holds your payment in escrow until you confirm it arrived as described.`,
        },
        { step: 4, speaker: "Buyer", text: draft },
        {
          step: 5,
          speaker: `${sellerLabel} A`,
          text: isCod
            ? `Confirmed at ${money(listedUnit)} plus ${money(delivery)} delivery — cash on delivery. We'll dispatch tomorrow.`
            : `Confirmed at ${money(listedUnit)} plus ${money(delivery)} delivery — the escrow hold is noted. We'll dispatch tomorrow; funds release to us only after you confirm receipt.`,
        },
        {
          step: 5,
          speaker: "system",
          text: isCod
            ? "Tijarah keeps this order on record — the courier collects cash at your door and remits it for the seller's payout. The courier is booked by Tijarah, so contact details stay private."
            : "Tijarah keeps this order on record — payment stays in escrow until delivery is confirmed. The courier is booked by Tijarah, so contact details stay private.",
        },
      ].filter((message) => message.step <= state.step)
    : [
        {
          step: 1,
          speaker: "Buyer",
          text: `I'm interested in ${quantity} ${product.plural} of ${product.name.toLowerCase()}. What price can you offer, including delivery to Karachi?`,
        },
        {
          step: 2,
          speaker: `${sellerLabel} A`,
          text: `For ${quantity} ${product.plural}, our quantity-tier price is ${money(listedUnit)} per ${product.unit}. Delivery is ${money(delivery)} extra for roughly ${totalKg} kg, dispatched within 2 working days.`,
        },
        { step: 4, speaker: "Buyer", text: draft },
        {
          step: 5,
          speaker: `${sellerLabel} A`,
          text: `We can agree to ${money(counterUnit)} per ${product.unit}, plus ${money(delivery)} delivery — dispatched within 2 working days, payment on delivery. Please review the terms before placing an order.`,
        },
        {
          step: 5,
          speaker: "system",
          text: "Tijarah keeps this example on record — agreed terms, a proper invoice, coordinated delivery and support for both sides. The courier is booked by Tijarah, so contact details stay private.",
        },
      ].filter((message) => message.step <= state.step);
  // Every free-text buyer message gets a reply from the seller's AI agent —
  // labeled, bounds-referenced, never committing to final terms (that stays
  // on the deterministic checkout screen, per agentic-commerce guardrails).
  const agentReplies = state.customMessages.map(() => ({
    step: state.step,
    speaker: `${sellerLabel} A · AI agent`,
    text: isB2c
      ? `Noted — my seller's bounds keep this item at ${money(listedUnit)}; I can adjust delivery timing or answer questions instantly for every buyer at once. Final terms always confirm on the checkout screen before payment.`
      : `Noted — my supplier's bounds put the floor near ${money(Math.round(listedUnit * 0.95))} per ${product.unit}; I'm negotiating within them instantly for every buyer at once. The supplier personally confirms final terms before dispatch.`,
  }));
  const allMessages = [
    ...messages,
    ...state.customMessages.flatMap((m, i) => [
      { ...m, step: state.step },
      agentReplies[i],
    ]),
  ];
  return {
    product,
    quantity,
    quantityIndex,
    totalKg,
    listedUnit,
    counterUnit,
    unit,
    delivery,
    subtotal: unit * quantity,
    marketDelta: marketDelta(product, unit),
    offers,
    bestTotal,
    draft,
    messages: allMessages,
    courier: state.courier,
    payment: state.payment,
    viewers: 2 + (state.productIndex % 3),
    weekDelta: ((product.id.charCodeAt(0) % 7) - 3) * 0.8,
  };
}
