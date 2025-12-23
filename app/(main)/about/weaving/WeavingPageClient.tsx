"use client";

import { AboutHero, AboutNav, ArtOfWeaving } from "@/components/about";

export function WeavingPageClient() {
  return (
    <div>
      <AboutHero />
      <AboutNav />
      <div className="min-h-[60vh]">
        <ArtOfWeaving />
      </div>
    </div>
  );
}

