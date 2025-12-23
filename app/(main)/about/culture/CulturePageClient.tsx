"use client";

import { AboutHero, AboutNav, CompanyCulture } from "@/components/about";

export function CulturePageClient() {
  return (
    <div>
      <AboutHero />
      <AboutNav />
      <div className="min-h-[60vh]">
        <CompanyCulture />
      </div>
    </div>
  );
}

