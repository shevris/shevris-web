import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

const PRINCIPLES = [
  {
    num: "01",
    title: "Deliberate by default",
    desc: "We plan before we build and ship when it's right — not when a demo date forces it.",
  },
  {
    num: "02",
    title: "Full-stack ownership",
    desc: "Design, code, infrastructure, and monitoring under one roof — no handoffs to lose context in.",
  },
  {
    num: "03",
    title: "Built in Lahore",
    desc: "An independent company engineering products for Pakistan's commerce — and markets beyond it.",
  },
];

export function Principles() {
  return (
    <section id="company" className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="mb-12 max-w-[640px]">
            <span className={sectionLabel}>Company</span>
            <h2 className={h2}>How we work</h2>
            <p className={sectionSub}>
              Small team, senior hands, and a bias for doing fewer things
              properly.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-4 md:grid-cols-3">
          {PRINCIPLES.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 0.08}>
              <div className="border-line hover:border-accent border-t-2 px-1 py-7 transition-colors md:px-2">
                <span className="text-accent mb-3.5 block text-[13px] font-bold tracking-[0.12em]">
                  {num}
                </span>
                <h3 className="mb-2.5 text-[17px] font-semibold tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
