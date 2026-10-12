import { PageShell } from "@/components/page-shell";
import { Hero } from "@/components/hero";
import { ProductSpotlight } from "@/components/product-spotlight";
import { Principles } from "@/components/principles";
import { CtaBand } from "@/components/cta-band";

export default function Home() {
  return (
    <PageShell>
      <Hero />
      <ProductSpotlight />
      <Principles />
      <CtaBand />
    </PageShell>
  );
}
