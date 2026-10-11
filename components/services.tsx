import { Cloud, Code2, Layers, Smartphone } from "lucide-react";
import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

const SERVICES = [
  {
    Icon: Code2,
    title: "Custom software",
    desc: "Platforms, internal tools, and APIs designed around how your business actually runs.",
  },
  {
    Icon: Smartphone,
    title: "Web & mobile apps",
    desc: "Responsive web applications and mobile experiences built for reliability first.",
  },
  {
    Icon: Cloud,
    title: "Cloud & DevOps",
    desc: "AWS infrastructure, CI/CD pipelines, and monitoring that keeps software running.",
  },
  {
    Icon: Layers,
    title: "Product engineering",
    desc: "End-to-end product development — architecture, launch, and every iteration after.",
  },
];

export function Services() {
  return (
    <section id="services" className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="mb-12 max-w-[640px]">
            <span className={sectionLabel}>What we do</span>
            <h2 className={h2}>Engineering services</h2>
            <p className={sectionSub}>
              We take software from idea to production — and keep it healthy
              after launch.
            </p>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 0.08}>
              <div className="h-full rounded-2xl border border-line bg-panel p-6 transition-all hover:-translate-y-[3px] hover:border-accent hover:shadow-[0_12px_40px_rgba(81,67,217,0.12)]">
                <span className="mb-[18px] grid h-[42px] w-[42px] place-items-center rounded-[11px] bg-[#5143d91f] text-accent">
                  <Icon size={20} strokeWidth={2} />
                </span>
                <h3 className="mb-2 text-[16.5px] font-semibold tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="text-[13.5px] leading-relaxed text-muted">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
