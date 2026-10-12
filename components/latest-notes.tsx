import { ArrowUpRight } from "lucide-react";
import { NOTES } from "@/lib/notes";
import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

export function LatestNotes() {
  const latest = NOTES.slice(0, 3);

  return (
    <section className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-[560px]">
              <span className={sectionLabel}>Notes</span>
              <h2 className={h2}>Latest from engineering</h2>
              <p className={sectionSub}>
                What we shipped most recently — the full log lives on the notes
                page.
              </p>
            </div>
            <a
              href="/notes"
              className="text-accent inline-flex items-center gap-1.5 pb-1 text-sm font-semibold hover:underline"
            >
              All notes
              <ArrowUpRight size={14} />
            </a>
          </div>
        </Reveal>
        <ol className="border-line border-t">
          {latest.map(({ date, system, slug, title, detail }, i) => (
            <li key={slug}>
              <Reveal delay={Math.min(i * 0.06, 0.2)}>
                <a
                  href={`/notes#${slug}`}
                  className="group border-line grid gap-1 border-b py-5 transition-colors md:grid-cols-[120px_110px_1fr] md:gap-6"
                >
                  <time
                    dateTime={date}
                    className="text-dim pt-0.5 font-mono text-[12.5px]"
                  >
                    {date}
                  </time>
                  <span className="text-accent pt-0.5 text-[12.5px] font-semibold tracking-[0.08em] uppercase">
                    {system}
                  </span>
                  <span>
                    <span className="group-hover:text-accent mb-1 block text-[15.5px] font-semibold tracking-[-0.01em] transition-colors">
                      {title}
                    </span>
                    <span className="text-muted block max-w-[62ch] text-sm leading-relaxed">
                      {detail}
                    </span>
                  </span>
                </a>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
