"use client";

import { useEffect, useRef, useState } from "react";

// Animates the numeric part of a value (e.g. "10+", "24/7", "17") counting up
// when it scrolls into view. Non-numeric prefix/suffix are preserved.
export default function CountUp({ value, duration = 1500 }) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const str = String(value);
    const m = str.match(/^(\D*)(\d+)(.*)$/);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!m || reduce) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = m;
    const target = parseInt(numStr, 10);
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let done = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !done) {
            done = true;
            io.disconnect();
            const start = performance.now();
            const step = (now) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(prefix + Math.round(eased * target) + suffix);
              if (p < 1) raf = requestAnimationFrame(step);
            };
            setDisplay(prefix + "0" + suffix);
            raf = requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return <span ref={ref}>{display}</span>;
}
