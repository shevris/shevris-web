import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { Services } from "@/components/services";
import { ProductSpotlight } from "@/components/product-spotlight";
import { Principles } from "@/components/principles";
import { CtaBand } from "@/components/cta-band";
import { SiteFooter } from "@/components/site-footer";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="bg-brand absolute -top-12 left-4 z-[100] rounded-lg px-[18px] py-2.5 text-sm font-semibold text-white transition-[top] focus:top-3"
      >
        Skip to content
      </a>
      <div
        className="pointer-events-none fixed inset-0 opacity-65"
        style={{
          background: `radial-gradient(600px 300px at 50% 0%, rgba(81, 67, 217, var(--glow-alpha)), transparent 70%)`,
        }}
      />
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Services />
        <ProductSpotlight />
        <Principles />
        <CtaBand />
      </main>
      <SiteFooter />
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important;clip-path:none !important}`}</style>
      </noscript>
    </>
  );
}
