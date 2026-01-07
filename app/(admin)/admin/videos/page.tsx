"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { VideoHeader, VideoTable } from "@/components/admin/videos";
import { useVideos, useDeleteVideo } from "@/hooks/use-videos";
import { Video } from "@/types/video";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function VideosPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [page] = useState(1);
  const [videoToDelete, setVideoToDelete] = useState<Video | null>(null);

  const { data: videosData, isLoading } = useVideos(page);
  const deleteVideo = useDeleteVideo();

  // Handle both paginated and non-paginated API responses
  const videos = Array.isArray(videosData) ? videosData : videosData?.results || [];

  const handleEdit = (video: Video) => {
    router.push(`/admin/videos/${video.id}`);
  };

  const handleDelete = async () => {
    if (!videoToDelete) return;

    try {
      await deleteVideo.mutateAsync(videoToDelete.id);
      toast({
        title: "Success",
        description: "Video deleted successfully",
      });
      setVideoToDelete(null);
    } catch {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete video",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <VideoHeader title="Videos" />
      <VideoTable
        videos={videos}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={setVideoToDelete}
      />
      
      <AlertDialog
        open={!!videoToDelete}
        onOpenChange={(open) => !open && setVideoToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              video {videoToDelete?.title}.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-600 hover:bg-red-700"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}