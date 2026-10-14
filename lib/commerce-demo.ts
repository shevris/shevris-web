export const PRODUCTS = [
  {
    id: "rice",
    category: "Food & staples",
    name: "Basmati rice",
    detail: "1 kg pack",
    unit: "pack",
    plural: "packs",
    quantities: [50, 100, 200],
    rates: [440, 420, 400],
    delivery: 600,
    alternativeDelivery: 400,
    premium: 5,
    record: "BR-001",
    caption: "From the harvest to your shelves.",
    question: "Please confirm the pack size and delivery charge.",
  },
  {
    id: "apparel",
    category: "Apparel",
    name: "Cotton T-shirt",
    detail: "Unisex · sample size M",
    unit: "piece",
    plural: "pieces",
    quantities: [25, 50, 100],
    rates: [850, 800, 750],
    delivery: 500,
    alternativeDelivery: 350,
    premium: 15,
    record: "CT-002",
    caption: "Good essentials. Thoughtfully sourced.",
    question: "Please confirm the size breakdown before dispatch.",
  },
  {
    id: "home",
    category: "Home essentials",
    name: "Ceramic mug",
    detail: "350 ml · warm ivory",
    unit: "piece",
    plural: "pieces",
    quantities: [24, 48, 96],
    rates: [580, 550, 520],
    delivery: 800,
    alternativeDelivery: 600,
    premium: 20,
    record: "CM-003",
    caption: "Everyday objects. Lasting connections.",
    question: "Please confirm protective packaging and delivery charges.",
  },
] as const;

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

export function getDemo(state: DemoState) {
  const product = PRODUCTS[state.productIndex];
  const quantity = product.quantities[state.quantityIndex];
  const listedUnit = product.rates[state.quantityIndex];
  const counterUnit = Math.round(listedUnit * 0.98);
  const unit = state.step === 5 ? counterUnit : listedUnit;
  const offers = [
    {
      name: "Supplier A",
      unit,
      delivery: state.step >= 2 ? product.delivery : null,
      note:
        state.step === 5 ? "Demo negotiated terms" : "Featured conversation",
    },
    {
      name: "Supplier B",
      unit: listedUnit + product.premium,
      delivery: 0,
      note: "Delivery included",
    },
    {
      name: "Supplier C",
      unit: listedUnit + product.premium * 3,
      delivery: product.alternativeDelivery,
      note: "Alternative sample offer",
    },
  ].map((offer) => ({
    ...offer,
    total:
      offer.delivery === null ? null : offer.unit * quantity + offer.delivery,
  }));
  const draft = `Would ${money(counterUnit)} per ${product.unit} work for ${quantity} ${product.plural}, with payment on delivery? ${product.question}`;
  const messages = [
    {
      step: 1,
      speaker: "Buyer",
      text: `I'm interested in ${quantity} ${product.plural} of ${product.name.toLowerCase()}. What price can you offer, including delivery?`,
    },
    {
      step: 2,
      speaker: "Supplier A",
      text: `For ${quantity} ${product.plural}, our quantity-tier price is ${money(listedUnit)} per ${product.unit}. Delivery is ${money(product.delivery)} extra, dispatched within 2 working days.`,
    },
    { step: 4, speaker: "Buyer", text: draft },
    {
      step: 5,
      speaker: "Supplier A",
      text: `We can agree to ${money(counterUnit)} per ${product.unit}, plus ${money(product.delivery)} delivery — dispatched within 2 working days, payment on delivery. Please review the terms before placing an order.`,
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
    listedUnit,
    counterUnit,
    unit,
    subtotal: unit * quantity,
    offers,
    draft,
    messages,
  };
}
