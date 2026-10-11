# Shevris Website

- Next.js (App Router) + TypeScript + Tailwind v4 + next-themes + framer-motion + lucide-react. Static export via `output: "export"` in `next.config.ts`.
- GitHub Pages publishes the `out/` build via `.github/workflows/deploy.yml` on push to `main` (Pages source = GitHub Actions). `public/CNAME` carries the custom domain.
- Branch feature work from `development`, squash PRs into `development`, then promote `development` to `main` with a merge commit. Do not push directly to `main`.
- Verify before release: `npm run typecheck`, `npm test` (`verify-site.test.cjs`), `npm run build`. Check `out/` contains `index.html`, CNAME, and all public assets.
- Sections live in `components/`; brand tokens are CSS vars in `app/globals.css` mapped into Tailwind via `@theme inline` (`bg-canvas`, `bg-panel`, `border-line`, `text-ink`, `text-muted`, `text-dim`, `text-accent`, `bg-brand`).
- Motion rules: entrance animations only, finite, no looping/pulsing. `Reveal` wraps section entrances (`whileInView`, once). `LogoMark` does the one-time clip-path reveal. Both honor `useReducedMotion()`; `data-reveal` + the `<noscript>` rule in `app/page.tsx` keep content visible without JS.
- Production Cutline assets live in `public/`: `logo.svg` is the transparent symbol; `favicon.svg` its square badge; `og-image.svg` the editable sharing artwork. Keep their path geometry aligned with `CUTLINE_PATH` in `components/logo-mark.tsx`.
- PNG raster sizes: `favicon-32.png` 32x32, `apple-touch-icon.png` 180x180, `logo.png` 512x512, `og-image.png` 1200x630.
- `brand-concepts.html`, `shevris-concept-*.svg`, `shevris-cutline-lockup.svg`, `shevris-concepts-*.png` are local design studies (gitignored). Do not stage or publish them unless explicitly requested.
