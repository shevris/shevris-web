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

export const COD_REMITTANCE_DAYS = "7–14 working days";

export type Product = (typeof PRODUCTS)[number];
export type AssistantMode = "explain" | "counter" | "draft";
export type DemoState = {
  productIndex: number;
  quantityIndex: number;
  step: number;
  offerIndex: number;
  deliveryStep: number;
  assistant: AssistantMode;
};
export type DemoAction =
  | { type: "product" | "quantity" | "offer"; index: number }
  | { type: "assistant"; mode: AssistantMode }
  | {
      type: "advance" | "use-draft" | "discard-draft" | "restart" | "delivery";
    };

export const INITIAL_DEMO: DemoState = {
  productIndex: 0,
  quantityIndex: 1,
  step: 0,
  offerIndex: 0,
  deliveryStep: 0,
  assistant: "explain",
};

export function demoReducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case "product":
      return {
        ...INITIAL_DEMO,
        productIndex:
          ((action.index % PRODUCTS.length) + PRODUCTS.length) %
          PRODUCTS.length,
      };
    case "quantity":
      return {
        ...INITIAL_DEMO,
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
        productIndex: state.productIndex,
        quantityIndex: state.quantityIndex,
      };
    case "delivery":
      return { ...state, deliveryStep: (state.deliveryStep + 1) % 3 };
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
  const product = PRODUCTS[state.productIndex];
  const quantity = product.quantities[state.quantityIndex];
  const listedUnit = product.rates[state.quantityIndex];
  const counterUnit = Math.round(listedUnit * 0.98);
  const unit = state.step === 5 ? counterUnit : listedUnit;
  const delivery = freight(product, quantity, "intercity");
  const totalKg = product.weightKg * quantity;
  const offers = [
    {
      name: "Supplier A",
      unit,
      delivery: state.step >= 2 ? delivery : null,
      note:
        state.step === 5
          ? "Demo negotiated terms"
          : `Featured conversation · ${COURIERS.intercity.route}`,
    },
    {
      name: "Supplier B",
      unit: listedUnit + product.premium,
      delivery: 0,
      note: "Delivery included in price",
    },
    {
      name: "Supplier C",
      unit: listedUnit - Math.round(product.premium * 0.4),
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
  const draft = `Would ${money(counterUnit)} per ${product.unit} work for ${quantity} ${product.plural}, with payment on delivery? ${product.question}`;
  const messages = [
    {
      step: 1,
      speaker: "Buyer",
      text: `I'm interested in ${quantity} ${product.plural} of ${product.name.toLowerCase()}. What price can you offer, including delivery to Karachi?`,
    },
    {
      step: 2,
      speaker: "Supplier A",
      text: `For ${quantity} ${product.plural}, our quantity-tier price is ${money(listedUnit)} per ${product.unit}. Delivery is ${money(delivery)} extra for roughly ${totalKg} kg, dispatched within 2 working days.`,
    },
    { step: 4, speaker: "Buyer", text: draft },
    {
      step: 5,
      speaker: "Supplier A",
      text: `We can agree to ${money(counterUnit)} per ${product.unit}, plus ${money(delivery)} delivery — dispatched within 2 working days, payment on delivery. Please review the terms before placing an order.`,
    },
    {
      step: 5,
      speaker: "system",
      text: "Tijarah keeps this example on record — agreed terms, a proper invoice, coordinated delivery and support for both sides. Contact details stay private until an order is placed.",
    },
  ].filter((message) => message.step <= state.step);
  return {
    product,
    quantity,
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
    messages,
  };
}
