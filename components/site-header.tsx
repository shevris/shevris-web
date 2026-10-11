"use client";

import { useEffect, useRef, useState } from "react";
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

const HIDE_DELAY_MS = 400;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const lastY = useRef(0);
  const accDelta = useRef(0);
  const suppressHide = useRef(false);
  const suppressDeadline = useRef(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const cancelHide = () => {
    clearTimeout(hideTimer.current);
    hideTimer.current = undefined;
  };

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        const delta = y - lastY.current;
        lastY.current = y;
        setScrolled(y > 8);

        if (suppressHide.current) {
          accDelta.current = 0;
          cancelHide();
          if (Date.now() >= suppressDeadline.current) {
            suppressHide.current = false;
          } else {
            clearTimeout(settleTimer.current);
            settleTimer.current = setTimeout(
              () => (suppressHide.current = false),
              180,
            );
          }
          return;
        }

        if (delta === 0) return;
        if (Math.sign(delta) !== Math.sign(accDelta.current))
          accDelta.current = 0;
        if (delta < 0) cancelHide();
        accDelta.current += delta;
        if (y <= 80) {
          setHidden(false);
          accDelta.current = 0;
          cancelHide();
        } else if (accDelta.current > 10) {
          accDelta.current = 0;
          if (!hideTimer.current) {
            hideTimer.current = setTimeout(() => {
              hideTimer.current = undefined;
              setHidden(true);
            }, HIDE_DELAY_MS);
          }
        } else if (accDelta.current < -6) {
          setHidden(false);
          accDelta.current = 0;
          cancelHide();
        }
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(settleTimer.current);
      cancelHide();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const onNavClick = () => {
    setOpen(false);
    setHidden(false);
    cancelHide();
    suppressHide.current = true;
    suppressDeadline.current = Date.now() + 1600;
    accDelta.current = 0;
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => (suppressHide.current = false), 180);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.href.slice(1));
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={`sticky top-0 z-20 border-b backdrop-blur-xl transition-[transform,border-color,background-color] duration-300 ${
        hidden && !open ? "-translate-y-full" : "translate-y-0"
      } ${scrolled ? "border-line" : "border-transparent"}`}
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
          {NAV.map((item) => {
            const isActive = active === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={onNavClick}
                aria-current={isActive ? "true" : undefined}
                className={`hover:bg-panel hover:text-ink md:hover:bg-panel relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? "text-ink" : "text-muted"
                }`}
              >
                {item.label}
                <span
                  className={`bg-accent absolute inset-x-3 -bottom-px hidden h-px transition-opacity md:block ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <ThemeToggle />
          <a
            href="mailto:hello@shevris.com"
            className="bg-brand hidden rounded-[10px] px-4 py-2.5 text-[13.5px] font-semibold text-white shadow-[0_8px_24px_rgba(81,67,217,0.28)] transition-all hover:-translate-y-0.5 active:scale-[0.97] md:inline-flex"
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
