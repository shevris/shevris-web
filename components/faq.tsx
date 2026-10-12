import { Plus } from "lucide-react";
import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

const FAQS = [
  {
    q: "What is Tijarah?",
    a: "Our flagship product — a B2B & B2C marketplace for Pakistan with wholesale trade, live market prices, and AI-powered shopping. Currently in pre-launch.",
  },
  {
    q: "When does Tijarah launch?",
    a: "We ship when it's right rather than racing a date. Waitlist members get first access and launch updates as milestones land.",
  },
  {
    q: "Does Shevris take on client projects?",
    a: "No. Shevris is a product company — we design, build, and operate our own subscription software. We don't build apps on request.",
  },
  {
    q: "How do I get early access?",
    a: "Join the waitlist at tijarah.pk — it's the only door in right now, and the first one opened at launch.",
  },
  {
    q: "Where is Shevris based?",
    a: "Lahore, Pakistan — an independent company building for Pakistan's commerce and markets beyond it.",
  },
];

const FAQ_JSONLD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
};

export function Faq() {
  return (
    <section id="faq" className={sectionWrap}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSONLD) }}
      />
      <div className={container}>
        <Reveal>
          <div className="mb-10 max-w-[640px]">
            <span className={sectionLabel}>FAQ</span>
            <h2 className={h2}>Questions, answered</h2>
            <p className={sectionSub}>
              The short version of who we are and what Tijarah is becoming.
            </p>
          </div>
        </Reveal>
        <div className="border-line border-t">
          {FAQS.map(({ q, a }, i) => (
            <Reveal key={q} delay={Math.min(i * 0.05, 0.25)}>
              <details className="group border-line border-b">
                <summary className="hover:text-accent flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15.5px] font-semibold tracking-[-0.01em] transition-colors [&::-webkit-details-marker]:hidden">
                  {q}
                  <Plus
                    size={16}
                    strokeWidth={2.2}
                    aria-hidden="true"
                    className="text-dim group-open:text-accent shrink-0 transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="text-muted max-w-[62ch] pb-5 text-sm leading-relaxed">
                  {a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
