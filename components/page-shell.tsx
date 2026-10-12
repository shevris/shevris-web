import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { ParticleField } from "./particle-field";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="bg-brand absolute -top-12 left-4 z-[100] rounded-lg px-[18px] py-2.5 text-sm font-semibold text-white transition-[top] focus:top-3"
      >
        Skip to content
      </a>
      <ParticleField />
      <div className="grain" aria-hidden="true" />
      <div
        className="pointer-events-none fixed inset-0 opacity-65"
        style={{
          background: `radial-gradient(600px 300px at 50% 0%, rgba(81, 67, 217, var(--glow-alpha)), transparent 70%)`,
        }}
      />
      <SiteHeader />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter />
      <noscript>
        <style>{`[data-reveal]{opacity:1 !important;transform:none !important;clip-path:none !important;filter:none !important}`}</style>
      </noscript>
    </>
  );
}
