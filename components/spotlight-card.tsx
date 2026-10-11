"use client";

import { useCallback, type MouseEvent, type ReactNode } from "react";

/**
 * Cursor-tracked radial glow (Linear-style). Writes the pointer position into
 * CSS vars on the element; the ::before overlay in globals.css does the rest.
 * No state, no re-renders, hidden on touch devices via the hover media query.
 */
export function SpotlightCard({
  children,
  className = "",
  href,
  external = false,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
}) {
  const onMove = useCallback((e: MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
  }, []);

  const cls = `spotlight-card ${className}`;
  if (href) {
    return (
      <a
        href={href}
        onMouseMove={onMove}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <div onMouseMove={onMove} className={cls}>
      {children}
    </div>
  );
}
