"use client";

import { AboutHero, AboutNav, CompanyCulture } from "@/components/about";

export default function CulturePage() {
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
