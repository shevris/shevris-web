"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "./reveal";
import { container, h2, sectionLabel, sectionSub, sectionWrap } from "./ui";

const CX = 380;
const CY = 230;
const NODE_W = 148;
const NODE_H = 40;

const NODES = [
  { label: "Shoppers", x: 150, y: 64 },
  { label: "Shops & POS", x: 128, y: 400 },
  { label: "Wholesale", x: 624, y: 64 },
  { label: "Payments", x: 626, y: 400 },
  { label: "Delivery", x: 380, y: 36 },
  { label: "AI engine", x: 380, y: 428 },
];

// Slightly bowed connectors — organic feel, not a flowchart grid.
const PATHS = NODES.map((n, i) => {
  const mx = (CX + n.x) / 2;
  const my = (CY + n.y) / 2;
  const dx = n.x - CX;
  const dy = n.y - CY;
  const len = Math.hypot(dx, dy) || 1;
  const bend = 26 * (i % 2 === 0 ? 1 : -1);
  return `M ${CX} ${CY} Q ${mx - (dy / len) * bend} ${my + (dx / len) * bend} ${n.x} ${n.y}`;
});

export function MarketMap() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  return (
    <section className={sectionWrap}>
      <div className={container}>
        <Reveal>
          <div className="mb-12 max-w-[640px]">
            <span className={sectionLabel}>Blueprint</span>
            <h2 className={h2}>One marketplace, every side of commerce</h2>
            <p className={sectionSub}>
              Tijarah sits between the people who buy, the businesses who sell,
              and the systems that make trade work — payments, delivery, and
              intelligence flowing through one spine.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div
            ref={ref}
            className="spotlight-card border-line bg-panel rounded-3xl border p-4 md:p-8"
          >
            <svg
              viewBox="0 0 760 460"
              className="h-auto w-full"
              role="img"
              aria-label="Diagram: Tijarah at the center connected to shoppers, shops and POS, wholesale suppliers, payments, delivery, and the AI engine"
            >
              <defs>
                <clipPath id="mm-clip">
                  <rect
                    x={CX - 30}
                    y={CY - 30}
                    width="60"
                    height="60"
                    rx="16"
                  />
                </clipPath>
              </defs>

              {PATHS.map((d, i) => (
                <g key={d}>
                  <motion.path
                    id={`mm-p${i}`}
                    d={d}
                    fill="none"
                    stroke="var(--line)"
                    strokeWidth="1.4"
                    initial={reduce ? false : { pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : undefined}
                    transition={{
                      duration: reduce ? 0 : 0.9,
                      delay: 0.15 + i * 0.12,
                      ease: "easeOut",
                    }}
                  />
                  {!reduce && inView && (
                    <circle r="3" fill="var(--accent)" opacity="0.9">
                      <animateMotion
                        dur={`${6 + i * 0.7}s`}
                        begin={`${0.6 + i * 0.9}s`}
                        repeatCount="indefinite"
                      >
                        <mpath href={`#mm-p${i}`} />
                      </animateMotion>
                    </circle>
                  )}
                </g>
              ))}

              {NODES.map((n, i) => (
                <motion.g
                  key={n.label}
                  initial={reduce ? false : { opacity: 0, scale: 0.9 }}
                  animate={inView ? { opacity: 1, scale: 1 } : undefined}
                  transition={{
                    duration: 0.45,
                    delay: 0.5 + i * 0.1,
                    ease: "easeOut",
                  }}
                  style={{ transformOrigin: `${n.x}px ${n.y}px` }}
                >
                  <rect
                    x={n.x - NODE_W / 2}
                    y={n.y - NODE_H / 2}
                    width={NODE_W}
                    height={NODE_H}
                    rx="11"
                    fill="var(--panel)"
                    stroke="var(--line)"
                    strokeWidth="1.4"
                  />
                  <text
                    x={n.x}
                    y={n.y + 5}
                    textAnchor="middle"
                    fill="var(--text)"
                    fontSize="15"
                    fontWeight="600"
                  >
                    {n.label}
                  </text>
                </motion.g>
              ))}

              <motion.g
                initial={reduce ? false : { opacity: 0, scale: 0.85 }}
                animate={inView ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
              >
                <image
                  href="/tijarah-mark.png"
                  x={CX - 30}
                  y={CY - 30}
                  width="60"
                  height="60"
                  clipPath="url(#mm-clip)"
                />
                <text
                  x={CX}
                  y={CY + 52}
                  textAnchor="middle"
                  fill="var(--dim)"
                  fontSize="12"
                  fontWeight="700"
                  letterSpacing="0.14em"
                >
                  TIJARAH
                </text>
              </motion.g>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
