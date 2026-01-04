'use client';
import { useBlog } from '@/hooks/use-blogs';
import Image from 'next/image';
import { sanitizeBlogContent } from '@/utils/htmlSanitizer';
import { use } from 'react';

interface BlogDetailPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = use(params);
  const { data: blog, isLoading, isError, error } = useBlog(slug);

  if (isLoading) {
    return <div className="text-center py-10">Loading post...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  if (!blog) {
    return <div className="text-center py-10">Post not found.</div>;
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8 text-center">
        {blog.category && (
          <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase">
            {blog.category.title}
          </p>
        )}
        <h1 className="text-4xl md:text-5xl font-bold font-serif mt-2 text-gray-900">
          {blog.title}
        </h1>
        <p className="mt-4 text-gray-600">
          Published on {new Date(blog.created_at).toLocaleDateString()}
        </p>
      </header>
      
      {blog.thumbnail_image && (
        <div className="my-8">
          <Image
            src={blog.thumbnail_image}
            alt={blog.thumbnail_image_alt_description || blog.title}
            width={1200}
            height={800}
            className="w-full h-auto rounded-lg object-cover"
            priority
          />
        </div>
      )}
      
      <div className="prose prose-lg max-w-none">
        <div
          dangerouslySetInnerHTML={{
            __html: sanitizeBlogContent(blog.description || "")
          }}
        />
      </div>
    </article>
  );
}