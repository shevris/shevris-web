# Shevris Website

- Static HTML/CSS/JavaScript site; no package install or bundler is required.
- GitHub Pages publishes the repository root from `main`. Preserve `CNAME` and HTTPS configuration.
- Branch feature work from `development`, squash PRs into `development`, then promote `development` to `main` with a merge commit. Do not push directly to `main`.
- Run `node --test --test-reporter=tap verify-site.test.cjs` and `git diff --check` before release.
- Verify the homepage in a real browser at narrow and desktop widths, in light/dark/system themes, and with reduced motion enabled. Check theme persistence, keyboard focus, no horizontal overflow, and a fully visible logo after the one-time animation ends.
- Use actual elapsed browser time for animation checks. Chrome CLI virtual-time screenshots alone did not reliably advance compositor animations in this Windows environment.
- Production Cutline assets: `logo.svg` is the transparent symbol; `favicon.svg` is its square badge; `og-image.svg` is the editable sharing artwork. Keep their Cutline path geometry aligned with the inline homepage symbol.
- PNG raster sizes: `favicon-32.png` 32x32, `apple-touch-icon.png` 180x180, `logo.png` 512x512, and `og-image.png` 1200x630. Generate from the corresponding SVG at device scale 1; Apple/profile exports use a square background without pre-rounded corners.
- `brand-concepts.html`, `shevris-concept-*.svg`, `shevris-cutline-lockup.svg`, and `shevris-concepts-*.png` are local design studies, not production assets. Do not stage or publish them unless explicitly requested.
