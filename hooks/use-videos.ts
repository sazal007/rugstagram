import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { videoApi } from "@/services/video";
import { CreateVideo } from "@/types/video";

export const useVideos = (page: number = 1) => {
  return useQuery({
    queryKey: ["videos", page],
    queryFn: () => videoApi.getVideos(page),
  });
};

export const useVideo = (id: number) => {
  return useQuery({
    queryKey: ["video", id],
    queryFn: () => videoApi.getVideoById(id),
    enabled: !!id,
  });
};

export const useCreateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateVideo) => videoApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};

export const useUpdateVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreateVideo> }) =>
      videoApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
      queryClient.invalidateQueries({ queryKey: ["video", id] });
    },
  });
};

export const useDeleteVideo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => videoApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videos"] });
    },
  });
};
