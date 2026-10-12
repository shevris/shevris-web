import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { container, h2, sectionLabel, sectionSub } from "@/components/ui";

export const metadata: Metadata = {
  title: "Security — Shevris Technologies",
  description:
    "How to report a vulnerability to Shevris, and the practices behind how we build and deploy.",
  alternates: { canonical: "/security" },
};

const PRACTICES = [
  {
    title: "No long-lived cloud credentials",
    detail:
      "CI authenticates to AWS through short-lived OIDC tokens. No access keys are stored in pipelines or repositories.",
  },
  {
    title: "Secrets live in a secrets manager",
    detail:
      "Application and database credentials are fetched from AWS Secrets Manager at boot — never committed, never in images.",
  },
  {
    title: "Health-gated blue/green deploys",
    detail:
      "Every release deploys alongside the running version, passes health checks, then switches — with automatic rollback on failure.",
  },
  {
    title: "Dependency quarantine",
    detail:
      "Updates ship through Dependabot on a release-age cooldown, so brand-new compromised versions can't land before they're vetted.",
  },
  {
    title: "Minimal attack surface",
    detail:
      "shevris.com is a fully static export — no server-side runtime, no database, nothing to inject into on the marketing site.",
  },
];

export default function SecurityPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className={sectionLabel}>Security</span>
              <h1 className={h2}>Security at Shevris</h1>
              <p className={sectionSub}>
                We build subscription software, so we treat security as part of
                the product — not an afterthought.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div className="spotlight-card border-line bg-panel mb-14 rounded-2xl border p-7 md:p-9">
              <h2 className="mb-3 text-lg font-semibold tracking-[-0.01em]">
                Report a vulnerability
              </h2>
              <p className="text-muted mb-5 max-w-[62ch] text-sm leading-relaxed">
                If you&apos;ve found a security issue in shevris.com,
                tijarah.pk, or any Shevris system, email{" "}
                <a
                  href="mailto:hello@shevris.com"
                  className="text-accent hover:underline"
                >
                  hello@shevris.com
                </a>{" "}
                with steps to reproduce. We acknowledge reports within three
                business days and keep you updated through triage and fix.
              </p>
              <ul className="text-muted list-none space-y-2.5 text-sm leading-relaxed">
                <li className="border-line border-l-2 pl-4">
                  Don&apos;t access, modify, or delete data that isn&apos;t
                  yours, and don&apos;t degrade service for others.
                </li>
                <li className="border-line border-l-2 pl-4">
                  Give us reasonable time to fix before any public disclosure —
                  we&apos;ll tell you when it&apos;s resolved.
                </li>
                <li className="border-line border-l-2 pl-4">
                  Machine-readable contact and expiry:{" "}
                  <a
                    href="/.well-known/security.txt"
                    className="text-accent hover:underline"
                  >
                    /.well-known/security.txt
                  </a>{" "}
                  (RFC 9116).
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em]">
              How we build
            </h2>
          </Reveal>
          <div className="border-line border-t">
            {PRACTICES.map((p, i) => (
              <Reveal key={p.title} delay={Math.min(i * 0.05, 0.3)}>
                <div className="border-line grid gap-1 border-b py-6 md:grid-cols-[260px_1fr] md:gap-6">
                  <h3 className="text-[15.5px] font-semibold tracking-[-0.01em]">
                    {p.title}
                  </h3>
                  <p className="text-muted max-w-[62ch] text-sm leading-relaxed">
                    {p.detail}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
