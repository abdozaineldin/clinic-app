"use client";

import { useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type AnimatedCounterProps = {
  value: string | number;
  duration?: number;
  className?: string;
};

export default function AnimatedCounter({
  value,
  duration = 2,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const raw = String(value);
    const match = raw.match(/[\d.]+/);

    if (!match) {
      el.textContent = raw;
      return;
    }

    const numericValue = parseFloat(match[0]);
    const startIndex = match.index ?? 0;
    const prefix = raw.slice(0, startIndex);
    const suffix = raw.slice(startIndex + match[0].length);
    const isDecimal = match[0].includes(".");

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      el.textContent = raw;
      return;
    }

    el.textContent = prefix + (isDecimal ? "0.0" : "0") + suffix;

    const counter = { val: 0 };
    const ctx = gsap.context(() => {
      gsap.to(counter, {
        val: numericValue,
        duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
        onUpdate: () => {
          el.textContent =
            prefix +
            (isDecimal ? counter.val.toFixed(1) : Math.round(counter.val)) +
            suffix;
        },
      });
    }, ref);

    return () => ctx.revert();
  }, [value, duration]);

  return (
    <span ref={ref} className={className}>
      0
    </span>
  );
}