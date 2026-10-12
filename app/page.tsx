import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/hero";
import { StatsStrip } from "@/components/stats-strip";
import { ProductSpotlight } from "@/components/product-spotlight";
import { MarketMap } from "@/components/market-map";
import { EngineeringGrid } from "@/components/engineering-grid";
import { Principles } from "@/components/principles";
import { LatestNotes } from "@/components/latest-notes";
import { Faq } from "@/components/faq";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <StatsStrip />
      <ProductSpotlight />
      <MarketMap />
      <EngineeringGrid />
      <Principles />
      <LatestNotes />
      <Faq />
      <CtaBand />
    </PageShell>
  );
}
