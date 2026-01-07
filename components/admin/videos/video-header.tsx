import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface VideoHeaderProps {
  title: string;
  showAddButton?: boolean;
}

const VideoHeader: React.FC<VideoHeaderProps> = ({ title, showAddButton = true }) => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500">
          Manage your videos gallery.
        </p>
      </div>
      {showAddButton && (
        <Link href="/admin/videos/add">
          <Button className="w-full sm:w-auto cursor-pointer bg-gray-900 text-white hover:bg-gray-800">
            <Plus className="w-4 h-4 mr-2" />
            Add Video
          </Button>
        </Link>
      )}
    </div>
  );
};

export default VideoHeader;
