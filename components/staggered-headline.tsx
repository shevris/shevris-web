"use client";

import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 0.8, 0.3, 1] as const;

const WORDS = [
  { text: "Software,", accent: false },
  { text: "built", accent: false },
  { text: "deliberately.", accent: true },
];

export function StaggeredHeadline() {
  const reduce = useReducedMotion();

  return (
    <h1
      data-reveal
      className="mb-[22px] text-[40px] leading-[1.06] font-extrabold tracking-[-0.035em] md:text-6xl"
    >
      {WORDS.map((w, i) => (
        <motion.span
          key={w.text}
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
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
