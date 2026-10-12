"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

const LINK = 130;
const CURSOR_LINK = LINK * 1.5;
const REPEL_RADIUS = 90;

const PALETTES = {
  dark: { dot: "180,170,255", accent: "34,211,238", link: "148,140,255" },
  light: { dot: "81,67,217", accent: "8,145,178", link: "81,67,217" },
};

export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();
  const palette = useRef(PALETTES.dark);

  useEffect(() => {
    palette.current =
      resolvedTheme === "light" ? PALETTES.light : PALETTES.dark;
  }, [resolvedTheme]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    let nodes: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      c: string;
      a: number;
    }[] = [];
    const mouse = { x: -9999, y: -9999 };
    let touchId: number | null = null;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const cursorLink = CURSOR_LINK;
    const repelRadiusSq = REPEL_RADIUS * REPEL_RADIUS;

    const seed = () => {
      const count = Math.min(90, Math.max(30, Math.floor((w * h) / 24000)));
      nodes = Array.from({ length: count }, () => {
        const accent = Math.random() < 0.28;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          r: 1 + Math.random() * 1.4,
          c: accent ? "a" : "d",
          a: 0.25 + Math.random() * 0.35,
        };
      });
    };

    const resize = () => {
      const ow = w;
      const oh = h;
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (!ow || !oh || !nodes.length) {
        seed();
        return;
      }
      const sx = w / ow;
      const sy = h / oh;
      for (const n of nodes) {
        n.x = Math.min(w, Math.max(0, n.x * sx));
        n.y = Math.min(h, Math.max(0, n.y * sy));
      }
    };

    let lastTick = performance.now();
    let scrolling = false;
    let scrollTimer: ReturnType<typeof setTimeout>;
    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      if ((scrolling && !coarse) || (coarse && t - lastTick < 33)) return;
      const k = Math.min((t - lastTick) / 16.67, 3);
      lastTick = t;
      ctx.clearRect(0, 0, w, h);
      const pal = palette.current;
      for (const n of nodes) {
        n.x += n.vx * k;
        n.y += n.vy * k;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
        const dx = n.x - mouse.x;
        const dy = n.y - mouse.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < repelRadiusSq && d2 > 0.01) {
          const d = Math.sqrt(d2);
          const f = ((REPEL_RADIUS - d) / REPEL_RADIUS) * 1.1;
          n.x += (dx / d) * f * k;
          n.y += (dy / d) * f * k;
        }
        ctx.fillStyle = `rgba(${n.c === "a" ? pal.accent : pal.dot},${n.a})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < LINK) {
            ctx.strokeStyle = `rgba(${pal.link},${(1 - d / LINK) * 0.1})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
        const mdx = nodes[i].x - mouse.x;
        const mdy = nodes[i].y - mouse.y;
        const md = Math.hypot(mdx, mdy);
        if (md < cursorLink) {
          ctx.strokeStyle = `rgba(${pal.accent},${(1 - md / cursorLink) * 0.22})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const onVis = () => (document.hidden ? stop() : start());
    const onMove = (e: PointerEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    let parkTimer: ReturnType<typeof setTimeout>;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      if (!t || touchId !== null) return;
      touchId = t.identifier;
      clearTimeout(parkTimer);
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      for (let i = 0; i < e.touches.length; i++) {
        const t = e.touches[i];
        if (t.identifier === touchId) {
          clearTimeout(parkTimer);
          mouse.x = t.clientX;
          mouse.y = t.clientY;
          return;
        }
      }
      if (touchId === null) {
        const t = e.touches[0];
        if (!t) return;
        clearTimeout(parkTimer);
        mouse.x = t.clientX;
        mouse.y = t.clientY;
      }
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (touchId !== null) {
        let ended = false;
        for (let i = 0; i < e.changedTouches.length; i++) {
          if (e.changedTouches[i].identifier === touchId) ended = true;
        }
        if (!ended) return;
      }
      touchId = null;
      clearTimeout(parkTimer);
      parkTimer = setTimeout(
        () => {
          mouse.x = -9999;
          mouse.y = -9999;
        },
        coarse ? 800 : 400,
      );
    };
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    };
    const onScroll = () => {
      scrolling = true;
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        scrolling = false;
      }, 150);
    };

    resize();
    start();
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onMove, { passive: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("touchend", onTouchEnd);
    window.addEventListener("touchcancel", onTouchEnd);
    document.documentElement.addEventListener("pointerleave", onLeave);
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      stop();
      clearTimeout(resizeTimer);
      clearTimeout(parkTimer);
      clearTimeout(scrollTimer);
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onMove);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("touchcancel", onTouchEnd);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
