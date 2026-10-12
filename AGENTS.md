# Shevris Website

- Next.js (App Router) + TypeScript + Tailwind v4 + next-themes + framer-motion + lucide-react. Static export via `output: "export"` in `next.config.ts`.
- GitHub Pages publishes the `out/` build via `.github/workflows/deploy.yml` on push to `main` (Pages source = GitHub Actions). `public/CNAME` carries the custom domain.
- Branch feature work from `development`, squash PRs into `development`, then promote `development` to `main` with a merge commit. Do not push directly to `main`.
- Verify before release: `npm run typecheck`, `npm test` (`verify-site.test.cjs`), `npm run build`. Check `out/` contains `index.html`, CNAME, and all public assets.
- Sections live in `components/`; brand tokens are CSS vars in `app/globals.css` mapped into Tailwind via `@theme inline` (`bg-canvas`, `bg-panel`, `border-line`, `text-ink`, `text-muted`, `text-dim`, `text-accent`, `bg-brand`).
- Motion rules: entrance animations only, finite, no looping/pulsing. `Reveal` wraps section entrances (`whileInView`, once). `LogoMark` does the one-time clip-path reveal. Both honor `useReducedMotion()`; `data-reveal` + the `<noscript>` rule in `app/page.tsx` keep content visible without JS.
- Production Cutline assets live in `public/`: `logo.svg` is the transparent symbol; `favicon.svg` its square badge; `og-image.svg` the editable sharing artwork. Keep their path geometry aligned with `CUTLINE_PATH` in `components/logo-mark.tsx`.
- PNG raster sizes: `favicon-32.png` 32x32, `apple-touch-icon.png` 180x180, `logo.png` 512x512, `og-image.png` 1200x630.
- `tijarah-mark.png` is the official Tijarah product mark (navy badge, copied from Tijarah-Landing `logo.png`). Used via `next/image` in the hero card and product spotlight — keep it in sync if the Tijarah logo changes.
- `brand-concepts.html`, `shevris-concept-*.svg`, `shevris-cutline-lockup.svg`, `shevris-concepts-*.png` are local design studies (gitignored). Do not stage or publish them unless explicitly requested.
- **Maintenance**: `public/notes.xml` (RSS) is hand-synced to the `NOTES` array in `app/notes/page.tsx` — update both when adding entries. When the list grows past ~20 entries, generate the feed at build time instead (e.g. a script rendering `notes.xml` from `NOTES` before `next build`); premature before then.

## Toolchain

- ESLint 9 flat config (`eslint.config.mjs`): `eslint-config-next/core-web-vitals` + `/typescript` + `eslint-config-prettier`. Stay on ESLint 9 — `eslint-config-next`'s transitive plugins cap there. `next lint` does not exist in Next 16; use `npm run lint`.
- Prettier (`prettier.config.mjs`) with `prettier-plugin-tailwindcss` — it reorders `className` strings on format; that churn is expected.
- Husky v9 hooks: `.husky/pre-commit` → `lint-staged` (eslint --fix + prettier on staged files), `.husky/commit-msg` → `commitlint` (Conventional Commits). `prepare: "husky"` installs hooks on `npm install`.
- Commit style is enforced: `feat|fix|chore|docs|refactor|test|ci|build|perf|style|revert`. Squash-merge PR titles must also be conventional (`semantic-pr.yml` checks them).
- `.editorconfig` + `.gitattributes` (`eol=lf`) keep line endings stable on Windows. `.nvmrc`/`engines` pin Node 20+; CI uses 22.
- Dependabot targets `development` weekly with 7-day cooldown (14 days for majors), grouped into `next-stack` and `toolchain`.
- **Accepted risk**: `braces`/`micromatch`/`fast-glob` inside `eslint-config-next` are flagged by GHSA-vfj7-8cjw-p6xm (`braces <=3.0.3`, dev-only DoS via crafted globs). No patched release exists yet; `overrides` in `package.json` pin `^` ranges so the fix auto-lands. Re-check on the next `npm audit`.
- **Dependabot ignores**: `eslint >=10` (eslint-config-next plugin chain caps at 9) and `typescript >=6` (typescript-eslint doesn't support it). Periodically retry — remove the ignore when the ecosystem catches up.
- `unrs-resolver`'s postinstall stays blocked (npm default-deny); ESLint works without it. Only approve it in `allowScripts` if lint ever fails for a missing native binary.
