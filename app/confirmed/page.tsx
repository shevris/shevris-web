import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { container, h2, sectionLabel, sectionSub } from "@/components/ui";

export const metadata: Metadata = {
  title: "Confirmed — Shevris Technologies",
  description: "Your Shevris Technologies updates subscription is confirmed.",
  alternates: { canonical: "/confirmed" },
  robots: { index: false },
};

export default function ConfirmedPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className={sectionLabel}>Confirmed</span>
              <h1 className={h2}>You&apos;re on the list</h1>
              <p className={sectionSub}>
                Your subscription is confirmed. You&apos;ll get launch updates
                and building-in-public notes — nothing else. Unsubscribe anytime
                from any email we send.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
