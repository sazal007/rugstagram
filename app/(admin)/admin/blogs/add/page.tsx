'use client';

import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { useCreateBlog } from '@/hooks/use-blogs';
import { BlogForm } from '@/components/admin/blogs';
import { Button } from '@/components/ui/button';
import { CreateBlogPost } from '@/types/blog';
interface BlogFormData extends Omit<CreateBlogPost, 'category_id' | 'thumbnail_image'> {
  category_id: string;
  thumbnail_image?: FileList; 
}

const AddBlogPage = () => {
  const router = useRouter();
  const { toast } = useToast();
  const createBlogMutation = useCreateBlog();

  const handleCreateBlog = async (data: BlogFormData) => {
    const blogData: CreateBlogPost = {
      ...data,
      category_id: Number(data.category_id),
      thumbnail_image: data.thumbnail_image?.[0] || null,
    };
    
    createBlogMutation.mutate(
      { blogData },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Blog created successfully!",
          });
          router.push('/admin/blogs');
        },
        onError: (error: Error) => {
          toast({
            title: "Error",
            description: error.message || 'Failed to create blog',
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleCancel = () => router.push('/admin/blogs');

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Button onClick={handleCancel} variant="outline">Back to Blogs</Button>
          </div>
        </div>
        <BlogForm
          onSubmit={handleCreateBlog}
          onCancel={handleCancel}
          isLoading={createBlogMutation.isPending}
        />
      </div>
    </div>
  );
};

export default AddBlogPage;