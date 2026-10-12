import {
  Activity,
  KeyRound,
  Lock,
  Rss,
  ShieldCheck,
  ArrowUpRight,
} from "lucide-react";
import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

const TILE =
  "spotlight-card border-line bg-panel hover:border-accent group flex h-full flex-col rounded-2xl border p-6 transition-colors";

const TILES = [
  {
    icon: KeyRound,
    title: "No stored credentials",
    desc: "CI authenticates to AWS through short-lived OIDC tokens. No access keys in pipelines, ever.",
    href: "/security",
  },
  {
    icon: Lock,
    title: "Secrets stay in the vault",
    desc: "App and database credentials load from AWS Secrets Manager at boot — never in images or repos.",
    href: "/security",
  },
  {
    icon: ShieldCheck,
    title: "Supply-chain quarantine",
    desc: "Dependency updates ride a release-age cooldown, so freshly compromised versions can't land unvetted.",
    href: "/security",
  },
  {
    icon: Activity,
    title: "Live status",
    desc: "Reachability of shevris.com and Tijarah, checked in your browser.",
    href: "/status",
    cta: "Open status",
  },
  {
    icon: Rss,
    title: "Built in public",
    desc: "A running log of everything we ship — releases, fixes, infrastructure.",
    href: "/notes",
    cta: "Read the notes",
  },
];

const DEPLOY_LINES = [
  { text: "$ tijarah deploy --env production", cls: "text-[#e6e8f0]" },
  { text: "✓ image built & pushed to registry", cls: "text-[#4ade80]" },
  {
    text: "✓ migrations applied in ephemeral container",
    cls: "text-[#4ade80]",
  },
  {
    text: "✓ new version healthy — running alongside current",
    cls: "text-[#4ade80]",
  },
  {
    text: "→ nginx upstream flipped · old version on standby",
    cls: "text-[#8f86ff]",
  },
];

export function EngineeringGrid() {
  return (
    <section className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="mb-12 max-w-[640px]">
            <span className={sectionLabel}>Engineering</span>
            <h2 className={h2}>Built like it matters</h2>
            <p className={sectionSub}>
              The discipline behind Tijarah is the same discipline running this
              site — documented, verifiable, and boring in all the right ways.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-12">
          <Reveal className="md:col-span-7 md:row-span-2">
            <div className="spotlight-card flex h-full flex-col overflow-hidden rounded-2xl border border-[#2a2d3f] bg-[#0d0f18]">
              <div className="flex items-center gap-2 border-b border-[#2a2d3f] px-5 py-3.5">
                <span className="h-[10px] w-[10px] rounded-full bg-[#3d4054]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#3d4054]" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#3d4054]" />
                <span className="ml-2 font-mono text-[11.5px] text-[#5f6377]">
                  deploy — blue/green
                </span>
              </div>
              <div className="flex flex-1 flex-col justify-center gap-3 p-6 font-mono text-[13px] leading-relaxed md:p-8 md:text-sm">
                {DEPLOY_LINES.map((line) => (
                  <p key={line.text} className={line.cls}>
                    {line.text}
                  </p>
                ))}
              </div>
              <p className="border-t border-[#2a2d3f] px-6 py-4 text-[13px] leading-relaxed text-[#8b8ea3] md:px-8">
                Every release deploys beside the running version, proves itself
                healthy, then takes traffic — rollback is an upstream flip, not
                a rebuild.
              </p>
            </div>
          </Reveal>

          {TILES.slice(0, 2).map(({ icon: Icon, title, desc, href }, i) => (
            <Reveal
              key={title}
              delay={0.08 + i * 0.06}
              className="md:col-span-5"
            >
              <a href={href} className={TILE}>
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className="text-accent mb-4"
                  aria-hidden="true"
                />
                <h3 className="mb-1.5 text-[15.5px] font-semibold tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">{desc}</p>
              </a>
            </Reveal>
          ))}

          {TILES.slice(2).map(({ icon: Icon, title, desc, href, cta }, i) => (
            <Reveal
              key={title}
              delay={0.1 + i * 0.06}
              className="md:col-span-4"
            >
              <a href={href} className={TILE}>
                <Icon
                  size={20}
                  strokeWidth={1.8}
                  className="text-accent mb-4"
                  aria-hidden="true"
                />
                <h3 className="mb-1.5 text-[15.5px] font-semibold tracking-[-0.01em]">
                  {title}
                </h3>
                <p className="text-muted mb-4 text-sm leading-relaxed">
                  {desc}
                </p>
                {cta && (
                  <span className="text-accent mt-auto inline-flex items-center gap-1.5 text-[13px] font-semibold">
                    {cta}
                    <ArrowUpRight
                      size={13}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                )}
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
