export type Note = {
  date: string;
  system: "shevris.com" | "Tijarah";
  type: "New" | "Improved" | "Fixed";
  slug: string;
  title: string;
  detail: string;
};

// Keep public/notes.xml (RSS) in sync when adding entries.
export const NOTES: Note[] = [
  {
    date: "2026-02-08",
    system: "shevris.com",
    type: "New",
    slug: "prelaunch-surfaces",
    title: "Pre-launch surfaces: Urdu, careers, updates capture",
    detail:
      "A full Urdu RTL landing at /ur, a careers page, on-site launch-updates capture in the footer, hreflang alternates, sitemap lastmod, and launch-gated proof/video components ready to flip on day one.",
  },
  {
    date: "2026-02-08",
    system: "shevris.com",
    type: "New",
    slug: "real-problems-section",
    title: "Real problems, mapped to mechanisms",
    detail:
      "New homepage section naming the documented failures of Pakistani e-commerce — fake parcels, COD scams, stuck remittances — each mapped to the structural fix and linked to the live demo that proves it.",
  },
  {
    date: "2026-10-12",
    system: "shevris.com",
    type: "New",
    slug: "credibility-surfaces",
    title: "Credibility surfaces shipped",
    detail:
      "Brand & press kit with logo downloads, a security page with responsible-disclosure policy, an RSS feed for these notes, and per-entry permalinks.",
  },
  {
    date: "2026-10-12",
    system: "shevris.com",
    type: "Improved",
    slug: "product-company-positioning",
    title: "Repositioned as a product company",
    detail:
      "Shevris is product-only: the services section is gone, and every call to action now points at Tijarah and the waitlist. We build our own subscription software — not apps on request.",
  },
  {
    date: "2026-10-12",
    system: "shevris.com",
    type: "Improved",
    slug: "touch-cursor-parity",
    title: "Touch reaches parity with the cursor",
    detail:
      "The constellation now treats a finger exactly like a mouse — same 90px repel radius, same link distance. Push a strayed fragment with your thumb and it merges into a neighbouring web by proximity.",
  },
  {
    date: "2026-10-12",
    system: "shevris.com",
    type: "Fixed",
    slug: "no-blank-frames-mobile",
    title: "Zero blank frames on cold mobile loads",
    detail:
      "Section reveals now render fully visible in server HTML and only hide below the fold after their observer attaches — the documented-safe pattern for scroll animations. First paint no longer depends on hydration.",
  },
  {
    date: "2026-10-12",
    system: "shevris.com",
    type: "Improved",
    slug: "scroll-jank-touch-devices",
    title: "Scroll jank eliminated on touch devices",
    detail:
      "Blur reveals snap instantly on coarse pointers, the constellation caps at 30fps with delta-time scaling, and ambient orbs moved from blur filters to radial gradients — removing the three largest per-frame raster costs we could measure.",
  },
  {
    date: "2026-10-11",
    system: "shevris.com",
    type: "New",
    slug: "interactive-constellation",
    title: "Interactive constellation shipped",
    detail:
      "A canvas particle field with pointer repel, magnetic CTAs, 3D card tilt, and ambient gradient orbs — all disabled under prefers-reduced-motion, all off the compositor-critical path.",
  },
  {
    date: "2026-10-11",
    system: "shevris.com",
    type: "New",
    slug: "shevris-com-live",
    title: "shevris.com is live",
    detail:
      "Cutline identity on a Next.js static export, deployed to GitHub Pages through a development → main Git Flow with semantic PR gates, lint/typecheck/test CI, and Dependabot on a release-age cooldown.",
  },
  {
    date: "2026-10-01",
    system: "Tijarah",
    type: "Improved",
    slug: "tijarah-blue-green-deploys",
    title: "Blue/green deploys for tijarah-api",
    detail:
      "Production and dev environments now deploy behind nginx upstream flips with health-gated rollback — no shared-state outages between releases.",
  },
  {
    date: "2026-10-01",
    system: "Tijarah",
    type: "Improved",
    slug: "oidc-deployments",
    title: "OIDC deployments, no stored credentials",
    detail:
      "GitHub Actions authenticates to AWS via short-lived OIDC tokens. Long-lived access keys removed from the pipeline entirely.",
  },
  {
    date: "2026-10-01",
    system: "Tijarah",
    type: "New",
    slug: "tijarah-waitlist-live",
    title: "Waitlist live at tijarah.pk",
    detail:
      "Independent GitHub Pages site accepting early signups ahead of the marketplace launch.",
  },
];
