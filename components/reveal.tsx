"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { useCoarsePointer } from "./use-coarse-pointer";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const hidden = coarse
    ? { opacity: 0, y: 18 }
    : { opacity: 0, y: 18, filter: "blur(8px)" };
  const shown = coarse
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <motion.div
      className={className}
      data-reveal
      initial={reduce ? false : hidden}
      whileInView={shown}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 0.8, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
