import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./reveal";
import { Magnetic } from "./magnetic";
import { btnPrimary, container, h2, sectionWrap } from "./ui";

export function CtaBand() {
  return (
    <section id="contact" className={`${sectionWrap} overflow-hidden`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid place-items-center"
      >
        <div className="orb orb-b h-[380px] w-[560px] [--orb-a:0.15] [--orb-rgb:81_67_217]" />
      </div>
      <div className={`${container} relative`}>
        <Reveal>
          <div className="border-line rounded-3xl border bg-[radial-gradient(600px_240px_at_50%_0%,rgba(81,67,217,0.16),transparent_70%),var(--panel)] px-6 py-14 text-center md:py-[72px]">
            <h2 className={h2}>Have something to build?</h2>
            <p className="text-muted mx-auto mb-8 max-w-[480px] text-[16.5px] leading-relaxed">
              Tell us about the product, platform, or problem — we answer every
              serious inquiry.
            </p>
            <Magnetic>
              <a className={btnPrimary} href="mailto:hello@shevris.com">
                hello@shevris.com
                <ArrowUpRight size={15} />
              </a>
            </Magnetic>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
