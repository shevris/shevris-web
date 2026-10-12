import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { container, h2, sectionLabel, sectionSub } from "@/components/ui";

export const metadata: Metadata = {
  title: "Engineering notes — Shevris Technologies",
  description:
    "A running log of what we ship — releases, fixes, and infrastructure changes across Shevris products, in plain language.",
  alternates: {
    canonical: "/notes",
    types: { "application/rss+xml": "/notes.xml" },
  },
};

type Note = {
  date: string;
  system: "shevris.com" | "Tijarah";
  type: "New" | "Improved" | "Fixed";
  slug: string;
  title: string;
  detail: string;
};

// Keep public/notes.xml (RSS) in sync when adding entries.
const NOTES: Note[] = [
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

const TYPE_STYLE: Record<Note["type"], string> = {
  New: "border-accent/40 bg-accent/10 text-accent",
  Improved: "border-line bg-panel text-muted",
  Fixed: "border-line bg-panel text-dim",
};

export default function NotesPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className={sectionLabel}>Engineering</span>
              <h1 className={h2}>Notes on what we ship</h1>
              <p className={sectionSub}>
                A running log of releases, fixes, and infrastructure changes —
                in plain language. If it affects what you see or rely on, it
                lands here.{" "}
                <a
                  href="/notes.xml"
                  className="text-accent hover:underline"
                  title="Subscribe via RSS"
                >
                  RSS
                </a>
              </p>
            </div>
          </Reveal>
          <ol className="border-line border-t">
            {NOTES.map(({ date, system, type, slug, title, detail }, i) => (
              <li key={slug} id={slug} className="scroll-mt-24">
                <Reveal delay={Math.min(i * 0.05, 0.3)}>
                  <div className="border-line grid gap-1 border-b py-6 md:grid-cols-[130px_120px_1fr] md:gap-6">
                    <time
                      dateTime={date}
                      className="text-dim pt-0.5 font-mono text-[12.5px]"
                    >
                      {date}
                    </time>
                    <div className="flex items-start gap-2 pt-0.5 md:flex-col md:gap-1.5">
                      <span className="text-accent text-[12.5px] font-semibold tracking-[0.08em] uppercase">
                        {system}
                      </span>
                      <span
                        className={`inline-flex w-fit rounded-full border px-2 py-px text-[10.5px] font-semibold tracking-[0.06em] uppercase ${TYPE_STYLE[type]}`}
                      >
                        {type}
                      </span>
                    </div>
                    <div>
                      <h2 className="mb-1.5 text-[16.5px] font-semibold tracking-[-0.01em]">
                        <a
                          href={`#${slug}`}
                          className="hover:text-accent transition-colors"
                        >
                          {title}
                        </a>
                      </h2>
                      <p className="text-muted max-w-[62ch] text-sm leading-relaxed">
                        {detail}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </PageShell>
  );
}
