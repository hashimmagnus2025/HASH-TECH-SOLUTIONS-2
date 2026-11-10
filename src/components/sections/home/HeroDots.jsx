"use client";

import { forwardRef, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
// Deterministic PRNG (mulberry32) so the scatter is identical on server and
// client render — Math.random() here would cause a hydration mismatch.
function mulberry32(seed) {
  let a = seed;
  return function () {
    a |= 0;
    a = a + 0x6d2b79f5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(42);
const DOTS = Array.from({
  length: 70
}, () => ({
  x: Math.round(rand() * 1000) / 10,
  y: Math.round(rand() * 1000) / 10,
  size: Math.round((1.2 + rand() * 2.2) * 10) / 10
}));

/**
 * A scatter of small signal-amber dots behind the hero's typography — not
 * the hero's main visual (that's still the headline), just ambient motion.
 * Opacity is owned by Hero.jsx's entrance timeline (via `[data-dot]`);
 * this component only ever animates `x`/`y` position for the continuous
 * drift, so the two effects never fight for control of the same tween.
 */
const HeroDots = forwardRef(function HeroDots(_props, ref) {
  const innerRef = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const container = innerRef.current;
    if (!container || reducedMotion) return;
    const dots = Array.from(container.querySelectorAll("[data-dot]"));
    const ctx = gsap.context(() => {
      dots.forEach((dot, index) => {
        gsap.to(dot, {
          y: index % 2 === 0 ? -(18 + index % 5 * 4) : 18 + index % 5 * 4,
          x: index % 3 === 0 ? 10 : index % 3 === 1 ? -10 : 0,
          duration: 4 + index % 5,
          delay: index * 0.07,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true
        });
      });
    });
    return () => ctx.revert();
  }, [reducedMotion]);
  return <div ref={node => {
    innerRef.current = node;
    if (typeof ref === "function") ref(node);else if (ref) ref.current = node;
  }} aria-hidden className="pointer-events-none absolute inset-0">
      {DOTS.map((dot, index) => <span key={index} data-dot className="absolute rounded-full bg-accent" style={{
      left: `${dot.x}%`,
      top: `${dot.y}%`,
      width: dot.size * 1.6,
      height: dot.size * 1.6,
      opacity: 0.6,
      boxShadow: "0 0 8px 1.5px rgba(53,181,209,0.5)"
    }} />)}
    </div>;
});
export default HeroDots;
