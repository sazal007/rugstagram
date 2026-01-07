'use client';
import { useBlog } from '@/hooks/use-blogs';
import { use } from 'react';
import BlogDetails from '@/components/blog/blog-details/blog-details';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const { data: blog, isLoading, isError, error } = useBlog(slug);

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Error: {error.message}</div>;
  }

  if (!blog) {
    return <div className="text-center py-20 text-gray-500">Post not found.</div>;
  }

  return <BlogDetails blog={blog} />;
}