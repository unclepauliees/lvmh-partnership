"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/** Animates a numeric prefix inside `display` (e.g. "$58M" -> counts 0..58).
 * Respects prefers-reduced-motion and only plays once, on first view. */
export function CountUp({
  display,
  duration = 1200,
}: {
  display: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20% 0px" });
  const [text, setText] = useState(display);

  useEffect(() => {
    if (!inView) return;
    // `text` already initialized to `display`, so reduced-motion / no-match
    // just leave it as-is — nothing to animate.
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const match = display.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match) {
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
    const start = performance.now();

    let raf: number;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const value = target * eased;
      setText(`${prefix}${value.toFixed(decimals)}${suffix}`);
      if (t < 1) raf = requestAnimationFrame(tick);
      else setText(display);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, display, duration]);

  return <span ref={ref}>{text}</span>;
}
