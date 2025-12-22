"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const VisualizerHeader: React.FC = () => {
  return (
    <div className="border-b border-gray-200 bg-white sticky top-0 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          href="/bespoke" 
          className="flex items-center gap-2 text-sm font-medium text-muted hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        <span className="font-serif text-xl tracking-wide font-medium">Bespoke Studio</span>
        <div className="w-20" />
      </div>
    </div>
  );
};

