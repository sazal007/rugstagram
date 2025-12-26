"use client";

import {
  AboutHero,
  AboutNav,
  WeavingProcessAnimation,
  ArtOfWeaving,
} from "@/components/about";

export function WeavingPageClient() {
  return (
    <div>
      <AboutHero />
      <AboutNav />
      <div className="min-h-[60vh] py-12 px-6">
        <ArtOfWeaving />
        <WeavingProcessAnimation />
      </div>
    </div>
  );
}
