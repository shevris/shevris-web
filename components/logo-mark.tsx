"use client";

import { motion, useReducedMotion } from "framer-motion";

export const CUTLINE_PATH =
  "M108 20H44L20 44V56L84 88H32L20 108H84L108 84V72L44 40H96Z";

export function LogoMark({
  size = 34,
  animate = true,
}: {
  size?: number;
  animate?: boolean;
}) {
  const reduce = useReducedMotion();
  const hidden = "polygon(0 0, 0 0, 0 0, 0 0)";
  const shown = "polygon(0 0, 200% 0, 0 200%, 0 0)";

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 128 128"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      data-reveal
      className="text-accent block shrink-0"
      initial={animate && !reduce ? { clipPath: hidden } : { clipPath: shown }}
      animate={{ clipPath: shown }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 0.8, 0.3, 1] }}
    >
      <path fill="currentColor" d={CUTLINE_PATH} />
    </motion.svg>
  );
}

export function Wordmark() {
  return (
    <span className="text-ink text-[19px] leading-none font-bold tracking-[-0.045em]">
      shevris
      <span className="text-muted mt-[3px] ml-px block text-[8px] font-semibold tracking-[0.25em] uppercase">
        Technologies
      </span>
    </span>
  );
}
