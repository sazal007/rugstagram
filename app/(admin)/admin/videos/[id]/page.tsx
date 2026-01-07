"use client";

import React from "react";
import { VideoForm } from "@/components/admin/videos";
import { useVideo, useUpdateVideo } from "@/hooks/use-videos";
import { VideoFormValues } from "@/schemas/video-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter, useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

const EditVideoPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const id = Number(params?.id);

  const { data: video, isLoading: isFetching } = useVideo(id);
  const updateVideoMutation = useUpdateVideo();

  const handleSubmit = async (data: VideoFormValues) => {
    if (!video) return;

    try {
      await updateVideoMutation.mutateAsync({
        id: video.id,
        data,
      });
      toast({
        title: "Success",
        description: "Video updated successfully",
      });
      router.push("/admin/videos");
    } catch (error) {
      console.error("Update failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update video",
      });
    }
  };

  if (isFetching) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Edit Video</h1>
      <VideoForm
        video={video}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/videos")}
        isLoading={updateVideoMutation.isPending}
      />
    </div>
  );
};

export default EditVideoPage;
