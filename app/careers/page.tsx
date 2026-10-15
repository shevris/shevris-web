import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import {
  btnPrimary,
  container,
  h2,
  sectionLabel,
  sectionSub,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "Careers — Shevris Technologies",
  description:
    "Shevris is a small product team in Lahore building Tijarah. We hire rarely and deliberately — exceptional people can always write to us.",
  alternates: { canonical: "/careers" },
};

const PRINCIPLES = [
  {
    title: "Product-only",
    body: "No client work, no agency distractions. Everyone here builds Tijarah — and whatever comes after it.",
  },
  {
    title: "Small on purpose",
    body: "We stay small until the work genuinely demands more hands. Every hire changes the company, so we hire like it.",
  },
  {
    title: "Craft over ceremony",
    body: "Few meetings, real ownership, honest code review. The work speaks; process follows.",
  },
  {
    title: "In Lahore, for Pakistan",
    body: "We build for the markets we can walk to. Deep local context is a feature, not a limitation.",
  },
];

export default function CareersPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[680px]">
              <span className={sectionLabel}>Careers</span>
              <h1 className={h2}>A small team, hired carefully.</h1>
              <p className={sectionSub}>
                Shevris is a product company, not an agency. We&apos;re
                deliberately small while Tijarah is pre-launch — no open roles
                today, but exceptional engineers and designers can always reach
                us. If the problems on our homepage make you think &ldquo;I know
                how to solve that,&rdquo; we want to hear it.
              </p>
            </div>
          </Reveal>
          <div className="mb-12 grid gap-4 sm:grid-cols-2">
            {PRINCIPLES.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.05, 0.2)}>
                <div className="border-line bg-panel h-full rounded-2xl border p-6">
                  <h2 className="text-ink text-[16px] font-semibold tracking-tight">
                    {p.title}
                  </h2>
                  <p className="text-muted mt-2 text-[14px] leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <a
              className={btnPrimary}
              href="mailto:hello@shevris.com?subject=Working%20at%20Shevris"
            >
              Write to us — tell us what you&apos;d build
            </a>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
