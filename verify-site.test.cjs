const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const read = (name) => fs.readFileSync(path.join(__dirname, name), 'utf8');
const html = read('index.html');

test('homepage references existing local assets and production sharing image', () => {
  for (const match of html.matchAll(/(?:src|href)="(\/[^"]+)"/g)) {
    assert.ok(fs.existsSync(path.join(__dirname, match[1].slice(1))), match[1]);
  }
  assert.match(html, /property="og:image" content="https:\/\/shevris.com\/og-image.png"/);
  assert.match(html, /rel="canonical" href="https:\/\/shevris.com\/"/);
  assert.doesNotMatch(html, /brand-concepts|shevris-concept-/);
});

test('all Cutline symbols use the same vector geometry', () => {
  const geometry = read('logo.svg').match(/<path[^>]+ d="([^"]+)"/)[1];
  for (const source of [html, read('favicon.svg'), read('og-image.svg')]) {
    assert.ok(source.includes(`d="${geometry}"`));
  }
});

test('generated PNGs have the intended dimensions', () => {
  for (const [name, width, height] of [
    ['favicon-32.png', 32, 32],
    ['apple-touch-icon.png', 180, 180],
    ['logo.png', 512, 512],
    ['og-image.png', 1200, 630],
  ]) {
    const data = fs.readFileSync(path.join(__dirname, name));
    assert.equal(data.subarray(0, 8).toString('hex'), '89504e470d0a1a0a', name);
    assert.equal(data.readUInt32BE(16), width, name);
    assert.equal(data.readUInt32BE(20), height, name);
  }
});

test('logo reveal is finite and reduced motion shows static content', () => {
  assert.match(html, /animation: cutline-reveal 800ms/);
  assert.doesNotMatch(html, /animation[^;]*\binfinite\b/);
  const reduced = html.slice(html.indexOf('@media (prefers-reduced-motion: reduce)'));
  assert.match(reduced, /\.brand-symbol\s*\{\s*animation: none !important; clip-path: none;/);
  assert.match(reduced, /\.rise, \.theme-bar, footer\s*\{\s*animation: none !important; opacity: 1; transform: none;/);
});

test('JavaScript parses and no undefined CSS tokens remain', () => {
  for (const match of html.matchAll(/<script>([\s\S]*?)<\/script>/g)) {
    new vm.Script(match[1]);
  }
  const defined = new Set([...html.matchAll(/(--[\w-]+)\s*:/g)].map((match) => match[1]));
  for (const match of html.matchAll(/var\((--[\w-]+)[,)]/g)) {
    assert.ok(defined.has(match[1]), match[1]);
  }
});
