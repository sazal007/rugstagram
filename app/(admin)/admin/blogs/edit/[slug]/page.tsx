'use client';

import { useRouter, useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useBlog, useUpdateBlog } from '@/hooks/use-blogs';
import { BlogForm } from '@/components/admin/blogs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { UpdateBlogPost } from '@/types/blog';
interface BlogFormData {
  title: string;
  description: string;
  category_id: string;
  thumbnail_image?: File | null;
  thumbnail_image_alt_description?: string;
  meta_title?: string;
  meta_description?: string;
  tags_id?: number[];
}

const EditBlogPage = () => {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const slug = (Array.isArray(params.slug) ? params.slug[0] : params.slug) || '';

  const { data: blog, isLoading: isLoadingBlog, error } = useBlog(slug);
  const updateBlogMutation = useUpdateBlog();

  const handleUpdateBlog = async (data: BlogFormData) => {
    if (!blog) return;

    const blogData: Omit<UpdateBlogPost, "id"> = {
      title: data.title,
      description: data.description,
      category_id: Number(data.category_id),
      tags_id: data.tags_id,
      thumbnail_image: data.thumbnail_image,
      thumbnail_image_alt_description: data.thumbnail_image_alt_description,
      meta_title: data.meta_title,
      meta_description: data.meta_description,
    };

    updateBlogMutation.mutate(
      { 
        slug: blog.slug,
        blogData 
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Blog updated successfully!",
          });
          router.push('/admin/blogs');
        },
        onError: (error: Error) => {
          toast({
            title: "Error",
            description: error.message || 'Failed to update blog',
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleCancel = () => router.push('/admin/blogs');

  const renderContent = () => {
    if (isLoadingBlog) {
      return (
        <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md space-y-8">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      );
    }

    if (error || !blog) {
      return (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Blog Not Found</h2>
          <p className="mt-2 text-gray-600">{error?.message || "The blog post you're looking for doesn't exist."}</p>
        </div>
      );
    }
    
    return (
      <BlogForm
        blog={blog}
        onSubmit={handleUpdateBlog}
        onCancel={handleCancel}
        isLoading={updateBlogMutation.isPending}
      />
    );
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Button onClick={handleCancel} variant="outline">Back to Blogs</Button>
            </div>
          </div>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default EditBlogPage;