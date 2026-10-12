import type { Metadata } from "next";
import Image from "next/image";
import { Download } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Reveal } from "@/components/reveal";
import { container, h2, sectionLabel, sectionSub } from "@/components/ui";

export const metadata: Metadata = {
  title: "Brand & press — Shevris Technologies",
  description:
    "Official Shevris logos, brand colors, and usage guidelines for press, partners, and integrators.",
  alternates: { canonical: "/brand" },
};

type Asset = {
  name: string;
  desc: string;
  preview: string;
  previewBg: string;
  width: number;
  height: number;
  files: { label: string; href: string }[];
};

const ASSETS: Asset[] = [
  {
    name: "Cutline mark",
    desc: "The primary symbol. Use on light or dark surfaces where full color is supported.",
    preview: "/logo.svg",
    previewBg: "bg-panel",
    width: 96,
    height: 96,
    files: [
      { label: "SVG", href: "/logo.svg" },
      { label: "PNG 512", href: "/logo.png" },
    ],
  },
  {
    name: "Badge",
    desc: "Square badge for avatars, favicons, and app icons.",
    preview: "/favicon.svg",
    previewBg: "bg-panel",
    width: 96,
    height: 96,
    files: [
      { label: "SVG", href: "/favicon.svg" },
      { label: "PNG 180", href: "/apple-touch-icon.png" },
    ],
  },
  {
    name: "Social card",
    desc: "1200×630 sharing artwork for link previews and press thumbnails.",
    preview: "/og-image.png",
    previewBg: "bg-panel",
    width: 240,
    height: 126,
    files: [
      { label: "PNG", href: "/og-image.png" },
      { label: "SVG", href: "/og-image.svg" },
    ],
  },
  {
    name: "Tijarah mark",
    desc: "Product mark for Tijarah, our commerce marketplace.",
    preview: "/tijarah-mark.png",
    previewBg: "bg-panel",
    width: 96,
    height: 96,
    files: [{ label: "PNG", href: "/tijarah-mark.png" }],
  },
];

const COLORS = [
  { name: "Brand", hex: "#5143D9", note: "Primary accent and CTA" },
  { name: "Accent", hex: "#8F86FF", note: "Highlights on dark surfaces" },
  { name: "Canvas — dark", hex: "#11131D", note: "Dark theme background" },
  { name: "Canvas — light", hex: "#F4F3EF", note: "Light theme background" },
];

export default function BrandPage() {
  return (
    <PageShell>
      <section className="relative z-[1] py-16 md:py-[88px]">
        <div className={container}>
          <Reveal>
            <div className="mb-12 max-w-[640px]">
              <span className={sectionLabel}>Brand &amp; press</span>
              <h1 className={h2}>Shevris brand assets</h1>
              <p className={sectionSub}>
                Official logos, colors, and usage notes. For press, speaking, or
                integration requests, write to{" "}
                <a
                  href="mailto:hello@shevris.com"
                  className="text-accent hover:underline"
                >
                  hello@shevris.com
                </a>
                .
              </p>
            </div>
          </Reveal>

          <Reveal>
            <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em]">
              Logos &amp; marks
            </h2>
          </Reveal>
          <div className="mb-14 grid gap-4 sm:grid-cols-2">
            {ASSETS.map((a, i) => (
              <Reveal key={a.name} delay={Math.min(i * 0.05, 0.2)}>
                <div className="spotlight-card border-line bg-panel flex h-full flex-col rounded-2xl border p-6">
                  <div
                    className={`border-line mb-5 flex h-32 items-center justify-center overflow-hidden rounded-xl border ${a.previewBg}`}
                  >
                    <Image
                      src={a.preview}
                      alt={`${a.name} preview`}
                      width={a.width}
                      height={a.height}
                      className="max-h-[80%] w-auto object-contain"
                    />
                  </div>
                  <h3 className="mb-1 text-[15.5px] font-semibold">{a.name}</h3>
                  <p className="text-muted mb-4 text-sm leading-relaxed">
                    {a.desc}
                  </p>
                  <div className="mt-auto flex gap-2">
                    {a.files.map((f) => (
                      <a
                        key={f.href}
                        href={f.href}
                        download
                        className="border-line text-muted hover:border-accent hover:text-accent inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12.5px] font-semibold transition-colors"
                      >
                        <Download size={13} aria-hidden="true" />
                        {f.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em]">
              Colors
            </h2>
          </Reveal>
          <div className="mb-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {COLORS.map((c, i) => (
              <Reveal key={c.hex} delay={Math.min(i * 0.05, 0.2)}>
                <div className="border-line overflow-hidden rounded-xl border">
                  <div
                    className="border-line h-20 border-b"
                    style={{ background: c.hex }}
                  />
                  <div className="bg-panel px-4 py-3">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-dim font-mono text-[12px]">{c.hex}</p>
                    <p className="text-dim mt-1 text-[12px]">{c.note}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="mb-5 text-lg font-semibold tracking-[-0.01em]">
              Usage
            </h2>
          </Reveal>
          <Reveal>
            <ul className="text-muted max-w-[640px] list-none space-y-3 text-sm leading-relaxed">
              <li className="border-line border-l-2 pl-4">
                Write the company as{" "}
                <strong className="text-ink font-semibold">
                  Shevris Technologies
                </strong>{" "}
                on first mention,{" "}
                <strong className="text-ink font-semibold">Shevris</strong>{" "}
                after.
              </li>
              <li className="border-line border-l-2 pl-4">
                Keep clear space around the mark equal to the height of the
                cutline stroke; don&apos;t recolor, stretch, or place it on busy
                imagery.
              </li>
              <li className="border-line border-l-2 pl-4">
                The Tijarah mark represents the product, not the company — use
                it only when referring to the marketplace.
              </li>
            </ul>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
