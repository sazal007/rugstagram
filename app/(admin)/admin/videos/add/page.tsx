"use client";

import React from "react";
import { VideoForm } from "@/components/admin/videos";
import { useCreateVideo } from "@/hooks/use-videos";
import { VideoFormValues } from "@/schemas/video-form";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const AddVideoPage: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const createVideoMutation = useCreateVideo();

  const handleSubmit = async (data: VideoFormValues) => {
    try {
      await createVideoMutation.mutateAsync(data);
      toast({
        title: "Success",
        description: "Video created successfully",
      });
      router.push("/admin/videos");
    } catch (error) {
      console.error("Creation failed:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create video",
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Add New Video</h1>
      <VideoForm
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/videos")}
        isLoading={createVideoMutation.isPending}
      />
    </div>
  );
};

export default AddVideoPage;
