import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { container, h2, sectionLabel, sectionSub } from "@/components/ui";

export const metadata: Metadata = {
  title: "Unsubscribed — Shevris Technologies",
  description: "You have been unsubscribed from Shevris Technologies updates.",
  alternates: { canonical: "/unsubscribed" },
  robots: { index: false },
};

export default function UnsubscribedPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className={sectionLabel}>Unsubscribed</span>
              <h1 className={h2}>You&apos;re off the list</h1>
              <p className={sectionSub}>
                You won&apos;t get any more update emails from us. If this was a
                mistake, sign up again from the footer of any page — the form is
                always there.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
