"use client";

import { useVideos } from "@/hooks/use-videos";
import { VideosCarousel } from "./videos-carousel";
import { Skeleton } from "@/components/ui/skeleton";

export default function Videos() {
  const { data: videosData, isLoading, error } = useVideos();


  const videos = Array.isArray(videosData) ? videosData : videosData?.results || [];

  if (isLoading) {
    return (
      <div className="py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="space-y-6">
            {/* Section header skeleton */}
            <div className="flex items-center justify-between mb-8">
              <Skeleton className="h-10 w-48" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-10 w-10 rounded-full" />
              </div>
            </div>

            {/* Video cards skeleton */}
            <div className="flex gap-6 overflow-hidden">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="shrink-0 w-72">
                  <div className="space-y-3">
                    {/* Thumbnail skeleton */}
                    <Skeleton className="h-96 w-full rounded-2xl" />

                    {/* Title skeleton */}
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>

                    {/* Platform badge skeleton */}
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !videos || videos.length === 0) {
    return null; // Don't show section if no videos
  }

  return (
    <div className="py-4 ">
      <div className="max-w-7xl mx-auto px-4">
        <VideosCarousel videos={videos} />
      </div>
    </div>
  );
}
