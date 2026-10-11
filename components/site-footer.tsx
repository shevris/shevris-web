"use client";

import Link from "next/link";
import { LogoMark, Wordmark } from "./logo-mark";

const EXPLORE = [
  { href: "#services", label: "Services" },
  { href: "#product", label: "Product" },
  { href: "#company", label: "Company" },
];

const PRODUCT = [
  { href: "https://tijarah.pk", label: "Tijarah" },
  { href: "https://tijarah.pk", label: "Join the waitlist" },
];

export function SiteFooter() {
  return (
    <footer className="border-line relative z-[1] border-t pt-14 pb-8">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <Link
              href="/"
              aria-label="Shevris Technologies — home"
              className="mb-3.5 flex items-center gap-2.5"
            >
              <LogoMark size={28} animate={false} />
              <Wordmark />
            </Link>
            <p className="text-dim max-w-[260px] text-[13.5px] leading-relaxed">
              Independent software company. Software, built deliberately.
            </p>
          </div>

          <nav aria-label="Explore">
            <h4 className="text-dim mb-4 text-xs font-bold tracking-[0.16em] uppercase">
              Explore
            </h4>
            <ul>
              {EXPLORE.map((item) => (
                <li key={item.href} className="mb-2.5">
                  <a
                    href={item.href}
                    className="text-muted hover:text-accent text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product">
            <h4 className="text-dim mb-4 text-xs font-bold tracking-[0.16em] uppercase">
              Product
            </h4>
            <ul>
              {PRODUCT.map((item) => (
                <li key={item.label} className="mb-2.5">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="text-muted hover:text-accent text-sm transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="text-dim mb-4 text-xs font-bold tracking-[0.16em] uppercase">
              Contact
            </h4>
            <ul>
              <li className="mb-2.5">
                <a
                  href="mailto:hello@shevris.com"
                  className="text-muted hover:text-accent text-sm transition-colors"
                >
                  hello@shevris.com
                </a>
              </li>
            </ul>
            <span className="text-dim block text-[13.5px] leading-relaxed">
              433 Iqbal, Ravi Block Town
              <br />
              Lahore 54000, Pakistan
            </span>
          </div>
        </div>

        <div className="border-line text-dim flex flex-wrap justify-between gap-2.5 border-t pt-6 text-[12.5px]">
          <span>
            &copy; {new Date().getFullYear()} Shevris Technologies. All rights
            reserved.
          </span>
          <span>shevris.com</span>
        </div>
      </div>
    </footer>
  );
}
