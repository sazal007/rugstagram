"use client";

import { AboutHero, AboutNav, ArtOfWeaving } from "@/components/about";

export default function WeavingPage() {
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
