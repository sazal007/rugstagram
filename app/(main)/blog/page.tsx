'use client';
import { BlogCard } from '@/components/blog/blog-card';
import { useBlogs } from '@/hooks/use-blogs';

export default function BlogPage() {
  const { data, isLoading, isError, error } = useBlogs();

  if (isLoading) {
    return <div className="text-center py-10">Loading posts...</div>;
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16">
        {data?.results.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      {data && (data.next || data.previous) && (
        <div className="flex justify-center mt-12 space-x-4">
          {data.previous && (
            <button className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
              Previous
            </button>
          )}
          {data.next && (
            <button className="px-6 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded hover:bg-gray-50 transition-colors duration-200">
              Next
            </button>
          )}
        </div>
      )}
    </main>
  );
}