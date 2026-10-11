"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useCoarsePointer } from "./use-coarse-pointer";

const EASE = [0.22, 0.8, 0.3, 1] as const;

const WORDS = [
  { text: "Software,", accent: false },
  { text: "built", accent: false },
  { text: "deliberately.", accent: true },
];

export function StaggeredHeadline() {
  const reduce = useReducedMotion();
  const coarse = useCoarsePointer();
  const hidden = coarse
    ? { opacity: 0, y: 20 }
    : { opacity: 0, y: 20, filter: "blur(8px)" };
  const shown = coarse
    ? { opacity: 1, y: 0 }
    : { opacity: 1, y: 0, filter: "blur(0px)" };

  return (
    <h1
      data-reveal
      className="mb-[22px] text-[40px] leading-[1.06] font-extrabold tracking-[-0.035em] md:text-6xl"
    >
      {WORDS.map((w, i) => (
        <motion.span
          key={w.text}
          className="inline-block"
          initial={reduce ? false : hidden}
          animate={shown}
          transition={{ duration: 0.8, delay: 0.1 + i * 0.09, ease: EASE }}
        >
          <span className={w.accent ? "text-gradient" : undefined}>
            {w.text}
          </span>
          {i < WORDS.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </h1>
  );
}
