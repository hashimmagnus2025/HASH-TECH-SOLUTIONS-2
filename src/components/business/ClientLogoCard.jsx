"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageOff } from "lucide-react";

/**
 * A logo-wall tile — unlike ProjectCard (built for case-study photos with
 * object-cover crop), this never crops the image: logos get object-contain
 * inside a neutral padded box so wide/transparent brand marks stay intact.
 * Falls back to a "No Image" placeholder instead of a broken-image icon
 * when the logo file hasn't been added yet.
 */
export default function ClientLogoCard({ project }) {
  const [failed, setFailed] = useState(false);
  return <div className="flex flex-col items-center gap-4 rounded-2xl border border-line bg-surface p-6 transition-colors hover:border-accent/50">
      <div className="relative flex h-32 w-full items-center justify-center">
        {failed ? <span className="flex flex-col items-center gap-1.5 text-fg-subtle">
            <ImageOff className="h-7 w-7" aria-hidden />
            <span className="text-[0.65rem] uppercase tracking-widest">No Image</span>
          </span> : <Image src={project.image} alt={project.title} fill sizes="280px" className="object-contain" onError={() => setFailed(true)} />}
      </div>
      <span className="text-center text-sm font-medium text-fg">{project.title}</span>
    </div>;
}
