"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useCoarsePointer } from "./use-coarse-pointer";

const HIDDEN = { opacity: 0, y: 18, filter: "blur(8px)" };
const SHOWN = { opacity: 1, y: 0, filter: "blur(0px)" };

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
  const ref = useRef<HTMLDivElement>(null);
  const [armHidden, setArmHidden] = useState(false);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top >= window.innerHeight - 40 || r.bottom <= 0) setArmHidden(true);
  }, [reduce]);

  return (
    <motion.div
      ref={ref}
      className={className}
      data-reveal
      initial={false}
      whileInView={reduce ? undefined : SHOWN}
      viewport={{ once: true, margin: "-40px" }}
      style={armHidden ? HIDDEN : undefined}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 0.8, 0.3, 1],
        filter: coarse ? { duration: 0 } : undefined,
      }}
    >
      {children}
    </motion.div>
  );
}
