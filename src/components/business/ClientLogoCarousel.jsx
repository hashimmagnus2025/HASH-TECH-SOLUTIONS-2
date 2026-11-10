"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ClientLogoCard from "@/components/business/ClientLogoCard";

/**
 * Single-row, swipeable version of the client-logo grid — used wherever
 * the row needs to stay compact (home page) instead of wrapping into a
 * full grid (the dedicated /projects page still uses the grid).
 */
export default function ClientLogoCarousel({ projects }) {
  const scrollRef = useRef(null);

  const scrollNext = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
    el.scrollBy({
      left: atEnd ? -el.scrollLeft : el.clientWidth * 0.9,
      behavior: "smooth"
    });
  };

  return <div className="flex flex-col gap-4">
      <div ref={scrollRef} className="flex gap-5 overflow-x-auto pb-1 [scrollbar-width:none] snap-x snap-mandatory [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {projects.map(project => <div key={project.id} className="w-44 shrink-0 snap-start sm:w-52">
            <ClientLogoCard project={project} />
          </div>)}
      </div>
      <div className="flex justify-end">
        <button type="button" onClick={scrollNext} aria-label="Show next clients" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-fg-on-dark transition-transform hover:-translate-y-0.5 hover:bg-primary-dim">
          <ArrowRight className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </div>;
}
