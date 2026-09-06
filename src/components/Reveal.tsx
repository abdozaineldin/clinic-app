"use client";

import { useRef, useLayoutEffect, ReactNode, ElementType } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type RevealVariant = "fade" | "rise" | "scale" | "slide-right" | "slide-left";

type RevealProps = {
  children: ReactNode;
  /** HTML tag to render the wrapper as (div, section, ul, ...) */
  as?: ElementType;
  /** Animation style — pick per-section so not everything looks identical */
  variant?: RevealVariant;
  /** Animate each direct child individually (grids, lists, cards) */
  staggerChildren?: boolean;
  stagger?: number;
  duration?: number;
  delay?: number;
  /** ScrollTrigger start position */
  start?: string;
  className?: string;
};

const VARIANTS: Record<RevealVariant, gsap.TweenVars> = {
  fade: { opacity: 0 },
  rise: { opacity: 0, y: 36 },
  scale: { opacity: 0, scale: 0.92 },
  "slide-right": { opacity: 0, x: -48 },
  "slide-left": { opacity: 0, x: 48 },
};

export default function Reveal({
  children,
  as: Tag = "div",
  variant = "rise",
  staggerChildren = false,
  stagger = 0.12,
  duration = 0.9,
  delay = 0,
  start = "top 85%",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const targets = staggerChildren ? Array.from(el.children) : el;
    const from = VARIANTS[variant];

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0, x: 0, scale: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        from,
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          stagger: staggerChildren ? stagger : 0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            once: true,
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [variant, staggerChildren, stagger, duration, delay, start]);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}