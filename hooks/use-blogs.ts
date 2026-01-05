"use client";

import { blogApi } from "@/services/blog";
import {
  BlogPost,
  PaginatedBlogResponse,
  BlogCategory,
  BlogFilters,
  CreateBlogPost,
  UpdateBlogPost,
  BlogTag,
  CreateBlogCategory,
  UpdateBlogCategory
} from "@/types/blog";
import {
  useQuery,
  UseQueryOptions,
  useQueryClient,
  useMutation,
} from "@tanstack/react-query";

export const blogKeys = {
  all: ["blogs"] as const,
  lists: () => [...blogKeys.all, "list"] as const,
  list: (filters: BlogFilters) => [...blogKeys.lists(), filters] as const,
  details: () => [...blogKeys.all, "detail"] as const,
  detail: (slug: string) => [...blogKeys.details(), slug] as const,
  similars: () => [...blogKeys.all, "similar"] as const,
  similar: (slug: string) => [...blogKeys.similars(), slug] as const,
  categories: () => [...blogKeys.all, "categories"] as const,
  tags: () => [...blogKeys.all, "tags"] as const,
};

export const useBlogs = (
  filters?: BlogFilters,
  options?: Omit<
    UseQueryOptions<PaginatedBlogResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<PaginatedBlogResponse, Error>({
    queryKey: blogKeys.list(filters || {}),
    queryFn: () => blogApi.getBlogs(filters),
    ...options,
  });
};

export const useBlog = (
  slug: string,
  options?: Omit<UseQueryOptions<BlogPost, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<BlogPost, Error>({
    queryKey: ["blog", slug],
    queryFn: () => blogApi.getBlogBySlug(slug),
    enabled: !!slug,
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,
    ...options,
  });
};

export const useCategory = (
  slug: string,
  options?: Omit<UseQueryOptions<BlogCategory, Error>, "queryKey" | "queryFn">
) => {
  return useQuery<BlogCategory, Error>({
    queryKey: ["category", slug],
    queryFn: () => blogApi.getCategoryBySlug(slug),
    enabled: !!slug,
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,
    ...options,
  });
};

export const useBlogsByCategory = (
  categorySlug: string,
  options?: Omit<
    UseQueryOptions<PaginatedBlogResponse, Error>,
    "queryKey" | "queryFn"
  >
) => {
  return useQuery<PaginatedBlogResponse, Error>({
    queryKey: ["blogs", "category", categorySlug],
    queryFn: () => blogApi.getBlogsByCategory(categorySlug),
    enabled: !!categorySlug,
    staleTime: 6 * 60 * 60 * 1000,
    gcTime: 6 * 60 * 60 * 1000,
    ...options,
  });
};

export function useBlogCategories() {
  return useQuery({
    queryKey: blogKeys.categories(),
    queryFn: blogApi.getCategories,
    staleTime: 15 * 60 * 1000,
  });
}

export function useBlogTags() {
  return useQuery<BlogTag[]>({
    queryKey: blogKeys.tags(),
    queryFn: blogApi.getTags,
    staleTime: 15 * 60 * 1000,
  });
}

export function useCreateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ blogData }: { blogData: CreateBlogPost }) =>
      blogApi.create(blogData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}

export function useUpdateBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      slug,
      blogData,
    }: {
      slug: string;
      blogData: Omit<UpdateBlogPost, "id">;
    }) => blogApi.update(slug, blogData),
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(blogKeys.detail(updatedBlog.slug), updatedBlog);
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}

export function useDeleteBlog() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ slug }: { slug: string }) => blogApi.delete(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.all });
    },
  });
}

export function useCreateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (categoryData: CreateBlogCategory) =>
      blogApi.createCategory(categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.categories() });
    },
  });
}

export function useUpdateBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      slug,
      ...categoryData
    }: UpdateBlogCategory) => blogApi.updateCategory(slug, categoryData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.categories() });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}

export function useDeleteBlogCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (slug: string) => blogApi.deleteCategory(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: blogKeys.categories() });
      queryClient.invalidateQueries({ queryKey: blogKeys.lists() });
    },
  });
}
