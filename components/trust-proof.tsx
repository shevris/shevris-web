import { Quote } from "lucide-react";
import { SHOW_PROOF } from "@/lib/flags";
import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

/**
 * Customer-proof band — logo wall + testimonial row + live counters.
 * Launch-gated via SHOW_PROOF: pre-launch there is no honest proof to show,
 * and fabricating it is the one unforgivable sin of a pre-launch page.
 * Drop real logos/quotes into these slots the day beta users exist.
 */
export function TrustProof() {
  if (!SHOW_PROOF) return null;
  return (
    <section className={sectionWrap} aria-label="Early traction">
      <div className={container}>
        <Reveal>
          <div className="mb-10 max-w-[640px]">
            <span className={sectionLabel}>Early traction</span>
            <h2 className={h2}>Shops already trading on Tijarah</h2>
            <p className={sectionSub}>
              Real merchants, real parcels, real numbers — published as they
              happen.
            </p>
          </div>
        </Reveal>
        {/* TODO at launch: real supplier logos, real quotes, real counters */}
        <div className="grid gap-4 sm:grid-cols-3">
          {["Shops onboarded", "Parcels protected", "Wholesale orders"].map(
            (label) => (
              <div
                key={label}
                className="border-line bg-panel rounded-2xl border p-6"
              >
                <span className="text-ink block text-3xl font-bold tracking-tight">
                  —
                </span>
                <span className="text-dim mt-1 block text-[12.5px]">
                  {label}
                </span>
              </div>
            ),
          )}
        </div>
        <figure className="border-line bg-panel mt-4 rounded-2xl border p-6">
          <Quote size={18} aria-hidden="true" className="text-accent" />
          <blockquote className="text-ink mt-3 text-[15px] leading-relaxed font-medium">
            {/* first real merchant quote goes here */}
          </blockquote>
          <figcaption className="text-dim mt-3 text-[12.5px]">
            {/* shop name · city */}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
