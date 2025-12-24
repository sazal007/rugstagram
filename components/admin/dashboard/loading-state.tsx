

"use client";

import { RefreshCw } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center">
        <RefreshCw className="w-12 h-12 text-primary animate-spin" />
        <p className="mt-4 text-lg text-gray-600">Loading dashboard data...</p>
      </div>
    </div>
  );
}