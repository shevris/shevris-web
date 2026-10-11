"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { LogoMark, Wordmark } from "./logo-mark";
import { ThemeToggle } from "./theme-toggle";

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#product", label: "Product" },
  { href: "#company", label: "Company" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur-xl transition-colors ${
        scrolled ? "border-line" : "border-transparent"
      }`}
      style={{ backgroundColor: "var(--nav-bg)" }}
    >
      <div className="relative mx-auto flex h-[68px] w-full max-w-[1120px] items-center gap-6 px-6">
        <Link
          href="/"
          aria-label="Shevris Technologies — home"
          className="flex shrink-0 items-center gap-2.5"
        >
          <LogoMark size={34} />
          <Wordmark />
        </Link>

        <nav
          id="nav-links"
          aria-label="Primary"
          className={`ml-auto ${open ? "" : "hidden"} border-line bg-panel absolute inset-x-0 top-[68px] flex-col items-stretch gap-0.5 rounded-2xl border p-2.5 shadow-2xl md:static md:flex md:flex-row md:items-center md:gap-1 md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-muted hover:bg-panel hover:text-ink md:hover:bg-panel rounded-lg px-3 py-2 text-sm font-medium transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <ThemeToggle />
          <a
            href="mailto:hello@shevris.com"
            className="bg-brand hidden rounded-[10px] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_24px_rgba(81,67,217,0.28)] transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Start a project
          </a>
          <button
            type="button"
            aria-expanded={open}
            aria-controls="nav-links"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
            className="border-line bg-panel text-muted grid h-[34px] w-9 place-items-center rounded-lg border md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>
    </header>
  );
}
