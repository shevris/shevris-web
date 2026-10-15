import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

const PARAGRAPHS = [
  "Ask anyone who buys or sells online in Pakistan and you'll hear the same stories. A shop in Shah Alam spends half a day travelling to a wholesale market to learn the price was already decided against them. A small brand watches a courier collect cash on delivery and then waits weeks to see the money again. A customer opens a parcel and finds a cheap fake where a genuine product should be.",
  "These aren't edge cases — they're the default experience of commerce in Pakistan. And they all share one root cause: the moment a deal leaves a structured system, trust has to be taken on faith.",
  "Tijarah is our answer. We keep the order, the payment, the tracking, and the settlement inside one system — so a buyer's money sits in escrow until delivery is verified, a seller's COD remittance is reconciled parcel by parcel, and contact details stay masked so deals can't slip off-platform where none of the protections apply.",
  "We're building it in public, carefully, from Lahore. The engineering notes on this site are real — the actual decisions, trade-offs, and postmortems as they happen. If you're a buyer, a seller, or a wholesaler who's lived any of these problems, the waitlist is open. I'd rather earn your trust slowly than promise you the moon tonight.",
];

export function FounderNote() {
  return (
    <section id="founder-note" className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="mb-12 max-w-[640px]">
            <span className={sectionLabel}>From the founder</span>
            <h2 className={h2}>Why we&apos;re building Tijarah</h2>
            <p className={sectionSub}>
              A letter on the problems that convinced us this needed to exist.
            </p>
          </div>
        </Reveal>
        <Reveal>
          <div className="border-line bg-panel/40 max-w-[760px] rounded-2xl border p-8 md:p-12">
            <div className="space-y-6">
              {PARAGRAPHS.map((text, i) => (
                <p
                  key={i}
                  className={`leading-relaxed ${
                    i === 0 ? "text-ink text-[17px]" : "text-muted text-[15px]"
                  }`}
                >
                  {text}
                </p>
              ))}
            </div>
            <div className="border-line mt-10 flex items-center gap-4 border-t pt-7">
              <div className="bg-brand/15 text-accent flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold">
                S
              </div>
              <div>
                <div className="text-ink text-sm font-semibold">Founder</div>
                <div className="text-dim text-[13px]">
                  Shevris Technologies · Lahore, Pakistan
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
