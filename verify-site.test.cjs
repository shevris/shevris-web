const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const read = (name) => fs.readFileSync(path.join(__dirname, name), "utf8");
const layout = read("app/layout.tsx");
const sources = fs
  .readdirSync(path.join(__dirname, "components"))
  .filter((f) => f.endsWith(".tsx") || f.endsWith(".ts"))
  .map((f) => read(path.join("components", f)))
  .concat([layout, read("app/page.tsx"), read("app/globals.css")])
  .join("\n");

test("layout references existing public assets and production metadata", () => {
  for (const match of layout.matchAll(/["'`](\/[^"'`\s]+)["'`]/g)) {
    const rel = match[1];
    if (rel === "/") continue;
    assert.ok(
      fs.existsSync(path.join(__dirname, "public", rel.slice(1))),
      `missing public asset: ${rel}`,
    );
  }
  assert.match(layout, /https:\/\/shevris\.com\/og-image\.png/);
  assert.match(layout, /canonical:\s*"\/"/);
  assert.doesNotMatch(sources, /brand-concepts|shevris-concept-/);
});

test("all Cutline symbols use the same vector geometry", () => {
  const geometry = read("public/logo.svg").match(/<path[^>]+ d="([^"]+)"/)[1];
  for (const source of [
    read("public/favicon.svg"),
    read("public/og-image.svg"),
    read("components/logo-mark.tsx"),
  ]) {
    assert.ok(source.includes(geometry), "Cutline geometry mismatch");
  }
});

test("generated PNGs have the intended dimensions", () => {
  for (const [name, width, height] of [
    ["favicon-32.png", 32, 32],
    ["apple-touch-icon.png", 180, 180],
    ["logo.png", 512, 512],
    ["og-image.png", 1200, 630],
  ]) {
    const data = fs.readFileSync(path.join(__dirname, "public", name));
    assert.equal(data.subarray(0, 8).toString("hex"), "89504e470d0a1a0a", name);
    assert.equal(data.readUInt32BE(16), width, name);
    assert.equal(data.readUInt32BE(20), height, name);
  }
});

test("attention animations are finite and reduced motion is respected", () => {
  // .text-gradient's 7s gradient-sweep on the hero accent word is the one
  // intentional looping animation (still reduced-motion aware).
  const ambientFree = sources
    .replace(/\.orb-[ab]\s*\{[^}]*\}/g, "")
    .replace(/\.text-gradient\s*\{[^}]*\}/g, "");
  assert.doesNotMatch(ambientFree, /\binfinite\b|repeat:\s*Infinity/);
  assert.match(read("components/logo-mark.tsx"), /useReducedMotion/);
  assert.match(read("components/reveal.tsx"), /useReducedMotion/);
  assert.match(read("components/magnetic.tsx"), /useReducedMotion/);
  assert.match(read("components/tilt.tsx"), /useReducedMotion/);
  assert.match(read("components/particle-field.tsx"), /prefers-reduced-motion/);
  assert.match(read("app/globals.css"), /prefers-reduced-motion:\s*reduce/);
  assert.match(read("components/page-shell.tsx"), /data-reveal/);
});

test("commerce showcase labels sample data and keeps motion finite", () => {
  const showcase = read("components/tijarah-features.tsx");
  assert.match(showcase, /Product concept/);
  assert.match(showcase, /Illustrative data/);
  assert.match(showcase, /useReducedMotion/);
  assert.match(showcase, /aria-pressed/);
  assert.match(showcase, /aria-live="polite"/);
  assert.doesNotMatch(
    showcase,
    /repeatCount="indefinite"|repeat:\s*Infinity|setInterval/,
  );
  assert.doesNotMatch(
    showcase,
    /trained on real marketplace data|proof that products are genuine/,
  );
});

function commerceModel() {
  const ts = require("typescript");
  const output = ts.transpileModule(read("lib/commerce-demo.ts"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
  });
  const context = { exports: {} };
  require("node:vm").runInNewContext(output.outputText, context);
  return context.exports;
}

test("negotiation requires a reviewed draft and explicit demo send", () => {
  const { INITIAL_DEMO, demoReducer, getDemo } = commerceModel();
  let state = { ...INITIAL_DEMO };
  assert.equal(getDemo(state).offers[0].delivery, null);
  assert.equal(demoReducer(state, { type: "use-draft" }).step, 0);
  state = demoReducer(state, { type: "advance" });
  state = demoReducer(state, { type: "advance" });
  assert.equal(state.step, 2);
  assert.equal(getDemo(state).offers[0].delivery, 600);
  assert.equal(demoReducer(state, { type: "advance" }).step, 2);
  state = demoReducer(state, { type: "use-draft" });
  assert.equal(state.step, 3);
  assert.equal(getDemo(state).unit, 420);
  state = demoReducer(state, { type: "advance" });
  assert.equal(state.step, 4);
  assert.equal(getDemo(state).unit, 420);
  state = demoReducer(state, { type: "advance" });
  assert.equal(state.step, 5);
  assert.equal(getDemo(state).unit, 412);
  assert.equal(getDemo(state).subtotal, 41200);
  assert.equal(getDemo(state).offers[0].total, 41800);
});

test("all category and quantity scenarios maintain prices and reset dependent state", () => {
  const { PRODUCTS, INITIAL_DEMO, demoReducer, getDemo } = commerceModel();
  for (let productIndex = 0; productIndex < PRODUCTS.length; productIndex++) {
    for (let quantityIndex = 0; quantityIndex < 3; quantityIndex++) {
      let state = demoReducer(INITIAL_DEMO, {
        type: "product",
        index: productIndex,
      });
      state = demoReducer(state, { type: "quantity", index: quantityIndex });
      const model = getDemo(state);
      assert.equal(
        model.quantity,
        PRODUCTS[productIndex].quantities[quantityIndex],
      );
      assert.equal(model.subtotal, model.quantity * model.listedUnit);
      assert.equal(model.offers[0].total, null);
      for (const offer of model.offers.slice(1)) {
        assert.equal(offer.total, model.quantity * offer.unit + offer.delivery);
      }
      state = {
        ...state,
        step: 5,
        deliveryStep: 2,
        offerIndex: 2,
        assistant: "draft",
      };
      const reset = demoReducer(state, {
        type: "quantity",
        index: (quantityIndex + 1) % 3,
      });
      assert.equal(reset.step, 0);
      assert.equal(reset.deliveryStep, 0);
      assert.equal(reset.offerIndex, 0);
      assert.equal(reset.assistant, "explain");
      const next = demoReducer(state, {
        type: "product",
        index: productIndex + 1,
      });
      assert.equal(next.step, 0);
      assert.equal(next.productIndex, (productIndex + 1) % PRODUCTS.length);
    }
  }
  assert.equal(
    demoReducer(INITIAL_DEMO, { type: "product", index: -1 }).productIndex,
    PRODUCTS.length - 1,
  );
});

test("required files and deployment config exist", () => {
  for (const f of [
    "public/CNAME",
    "public/tijarah-mark.png",
    "next.config.ts",
    "app/layout.tsx",
    "app/page.tsx",
    ".github/workflows/deploy.yml",
  ]) {
    assert.ok(fs.existsSync(path.join(__dirname, f)), `missing ${f}`);
  }
  assert.match(read("next.config.ts"), /output:\s*"export"/);
});
