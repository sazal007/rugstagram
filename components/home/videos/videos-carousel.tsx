import React, { useState } from "react";
import {
  Play,
  Youtube,
  Instagram,
  Facebook,
  Video,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Video as VideoType } from "@/types/video";
import Image from "next/image";

interface VideosCarouselProps {
  videos: VideoType[];
}

// Simple utility to extract video info
const extractVideoInfo = (url: string) => {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return { platform: "youtube", id: match?.[1] || null };
  }
  if (url.includes("instagram.com")) {
    const match = url.match(/instagram\.com\/(?:p|reel)\/([^\/\?]+)/);
    return { platform: "instagram", id: match?.[1] || null };
  }
  if (url.includes("facebook.com")) {
    return { platform: "facebook", id: url };
  }
  if (url.includes("tiktok.com")) {
    const match = url.match(/tiktok\.com\/.*\/video\/(\d+)/);
    return { platform: "tiktok", id: match?.[1] || null };
  }
  return { platform: "other", id: null };
};

const getPlatformConfig = (platform: string) => {
  const configs = {
    youtube: {
      icon: Youtube,
      color: "bg-red-600",
      name: "YouTube",
      textColor: "text-red-400",
    },
    instagram: {
      icon: Instagram,
      color: "bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500",
      name: "Instagram",
      textColor: "text-pink-400",
    },
    facebook: {
      icon: Facebook,
      color: "bg-blue-600",
      name: "Facebook",
      textColor: "text-blue-400",
    },
    tiktok: {
      icon: Video,
      color: "bg-black",
      name: "TikTok",
      textColor: "text-gray-400",
    },
    other: {
      icon: Video,
      color: "bg-gray-600",
      name: "Video",
      textColor: "text-gray-400",
    },
  };
  return configs[platform as keyof typeof configs] || configs.other;
};

const getVideoThumbnail = (platform: string, id: string | null) => {
  if (!id) return null;
  if (platform === "youtube") {
    return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
  }
  return null;
};

const getEmbedUrl = (platform: string, id: string | null, url: string) => {
  if (!id) return null;

  switch (platform) {
    case "youtube":
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    case "instagram":
      return `${url}embed`;
    case "facebook":
      return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        url
      )}&autoplay=1`;
    default:
      return null;
  }
};

const shouldAutoEmbed = (platform: string) => {
  return ["instagram", "facebook", "tiktok"].includes(platform);
};

// Video Card Component
const VideoCard: React.FC<{
  video: VideoType;
  isPlaying: boolean;
  onPlay: () => void;
}> = ({ video, isPlaying, onPlay }) => {
  const { platform, id } = extractVideoInfo(video.url);
  if (!id) return null;

  const thumbnail = getVideoThumbnail(platform, id);
  const embedUrl = getEmbedUrl(platform, id, video.url);
  const platformInfo = getPlatformConfig(platform);
  const PlatformIcon = platformInfo.icon;
  const autoEmbed = shouldAutoEmbed(platform);

  // Show embed directly for platforms that need it, or when user clicks play
  const showEmbed = autoEmbed || isPlaying;

  return (
    <div className="shrink-0 group">
      <div className=" ">
        <div className="relative overflow-hidden rounded-2xl bg-black/90 w-72 h-120">
          {showEmbed && embedUrl ? (
            <div className="relative w-full h-full">
              <iframe
                src={embedUrl}
                title={video.title || "Video"}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              />
            </div>
          ) : (
            <div className="relative w-full h-full">
              {thumbnail ? (
                <Image
                  src={thumbnail}
                  alt={video.title || "Video thumbnail"}
                  width={1000}
                  height={1000}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full p-8 text-center bg-linear-to-br from-gray-900/20 to-gray-800/5">
                  <div
                    className={`mb-4 rounded-full ${platformInfo.color} p-6 shadow-xl`}
                  >
                    <PlatformIcon className="w-10 h-10 text-white" />
                  </div>
                  <span className="text-xl font-bold text-white mb-3">
                    {platformInfo.name}
                  </span>
                  {video.title && (
                    <span className="text-sm font-medium text-gray-200 mb-3 line-clamp-2">
                      {video.title}
                    </span>
                  )}
                </div>
              )}

              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

              <div className="absolute top-3 left-3 z-10">
                <div
                  className={`flex items-center gap-1.5 rounded-full ${platformInfo.color} px-3 py-1.5 text-xs font-semibold text-white shadow-lg backdrop-blur-sm`}
                >
                  <PlatformIcon className="w-3.5 h-3.5" />
                  <span>{platformInfo.name}</span>
                </div>
              </div>

              <button
                onClick={onPlay}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 backdrop-blur-md p-6 transition-all duration-300 hover:scale-110 hover:bg-white shadow-2xl"
                aria-label="Play video"
              >
                <Play
                  className="w-12 h-12 text-red-600 drop-shadow-lg"
                  fill="currentColor"
                />
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                {video.title && (
                  <h3 className="text-base font-bold text-white drop-shadow-lg mb-1 line-clamp-2">
                    {video.title}
                  </h3>
                )}

              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Main Carousel Component
export const VideosCarousel: React.FC<VideosCarouselProps> = ({ videos }) => {
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const scrollAmount = direction === "left" ? -288 : 288;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative py-8">
      {videos.length > 1 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/95 p-3 transition-all hover:scale-110 hover:bg-white shadow-lg"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-6 h-6 text-gray-800" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/95 p-3 transition-all hover:scale-110 hover:bg-white shadow-lg"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-6 h-6 text-gray-800" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto px-4 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {videos.map((video) => {
          const { platform, id } = extractVideoInfo(video.url);
          const uniqueId = `${platform}-${id}`;
          const isPlaying = playingVideo === uniqueId;

          return (
            <VideoCard
              key={video.id}
              video={video}
              isPlaying={isPlaying}
              onPlay={() => setPlayingVideo(uniqueId)}
            />
          );
        })}
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};
