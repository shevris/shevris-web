"use client";

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
    <footer className="relative z-[1] border-t border-line pb-8 pt-14">
      <div className="mx-auto w-full max-w-[1120px] px-6">
        <div className="mb-12 grid gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-10">
          <div>
            <a
              href="/"
              aria-label="Shevris Technologies — home"
              className="mb-3.5 flex items-center gap-2.5"
            >
              <LogoMark size={28} animate={false} />
              <Wordmark />
            </a>
            <p className="max-w-[260px] text-[13.5px] leading-relaxed text-dim">
              Independent software company. Software, built deliberately.
            </p>
          </div>

          <nav aria-label="Explore">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-dim">
              Explore
            </h4>
            <ul>
              {EXPLORE.map((item) => (
                <li key={item.href} className="mb-2.5">
                  <a
                    href={item.href}
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Product">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-dim">
              Product
            </h4>
            <ul>
              {PRODUCT.map((item) => (
                <li key={item.label} className="mb-2.5">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener"
                    className="text-sm text-muted transition-colors hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-dim">
              Contact
            </h4>
            <ul>
              <li className="mb-2.5">
                <a
                  href="mailto:hello@shevris.com"
                  className="text-sm text-muted transition-colors hover:text-accent"
                >
                  hello@shevris.com
                </a>
              </li>
            </ul>
            <span className="block text-[13.5px] leading-relaxed text-dim">
              433 Iqbal, Ravi Block Town
              <br />
              Lahore 54000, Pakistan
            </span>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 border-t border-line pt-6 text-[12.5px] text-dim">
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
