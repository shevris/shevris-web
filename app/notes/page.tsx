import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { NOTES, type Note } from "@/lib/notes";
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
