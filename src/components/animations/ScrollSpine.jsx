"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
/**
 * A vertical line that grows downward (scaleY, transform-origin top) as its
 * parent container scrolls through the viewport — used behind timeline /
 * process steps so progress reads as "the line is reaching each step" as
 * you scroll, without pinning anything. Measures its own parentElement as
 * the ScrollTrigger target, so it just needs to sit inside the container
 * it should track.
 */
export default function ScrollSpine({
  className,
  orientation = "vertical"
}) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    const container = el?.parentElement;
    if (!el || !container) return;
    const scaleProp = orientation === "horizontal" ? "scaleX" : "scaleY";
    const transformOrigin = orientation === "horizontal" ? "left" : "top";
    if (reducedMotion) {
      gsap.set(el, {
        [scaleProp]: 1
      });
      return;
    }
    gsap.set(el, {
      [scaleProp]: 0,
      transformOrigin
    });
    const ctx = gsap.context(() => {
      gsap.to(el, {
        [scaleProp]: 1,
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top 75%",
          end: "bottom 65%",
          scrub: true
        }
      });
    });
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) trigger.kill();
      });
    };
  }, [reducedMotion, orientation]);
  return <div ref={ref} className={className} />;
}
