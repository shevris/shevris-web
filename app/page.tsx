import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/hero";
import { LaunchFilm } from "@/components/launch-film";
import { StatsStrip } from "@/components/stats-strip";
import { ProductSpotlight } from "@/components/product-spotlight";
import { RealProblems } from "@/components/real-problems";
import { MarketMap } from "@/components/market-map";
import { TrustProof } from "@/components/trust-proof";
import { EngineeringGrid } from "@/components/engineering-grid";
import { Principles } from "@/components/principles";
import { LatestNotes } from "@/components/latest-notes";
import { FounderNote } from "@/components/founder-note";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <LaunchFilm />
      <StatsStrip />
      <ProductSpotlight />
      <RealProblems />
      <MarketMap />
      <TrustProof />
      <EngineeringGrid />
      <Principles />
      <LatestNotes />
      <FounderNote />
      <Faq />
      <CtaBand />
    </PageShell>
  );
}
