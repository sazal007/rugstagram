"use client";

import { AboutHero, AboutNav, MeetFounder } from "@/components/about";

export function FounderPageClient() {
  return (
    <div>
      <AboutHero />
      <AboutNav />
      <div className="min-h-[60vh]">
        <MeetFounder />
      </div>
    </div>
  );
}

