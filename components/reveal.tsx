"use client";

import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";
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
  const controls = useAnimationControls();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight - 40 && r.bottom > 0) return;
    controls.set(HIDDEN);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start(SHOWN);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -40px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, controls]);

  return (
    <motion.div
      ref={ref}
      className={className}
      data-reveal
      initial={false}
      animate={controls}
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
