import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { StatusBoard } from "@/components/status-board";
import { container, h2, sectionLabel, sectionSub } from "@/components/ui";

export const metadata: Metadata = {
  title: "Status — Shevris Technologies",
  description:
    "Operational status for Shevris systems — shevris.com and Tijarah services.",
  alternates: { canonical: "/status" },
};

export default function StatusPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className={sectionLabel}>Status</span>
              <h1 className={h2}>Systems status</h1>
              <p className={sectionSub}>
                Live reachability of Shevris services, checked in your browser.
                Full uptime history comes online alongside the Tijarah launch.
              </p>
            </div>
          </Reveal>
          <StatusBoard />
        </div>
      </section>
    </PageShell>
  );
}
