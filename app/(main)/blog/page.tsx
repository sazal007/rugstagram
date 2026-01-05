'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogSidebar } from '@/components/blog/blog-sidebar';
import { RecentBlogGrid } from '@/components/blog/recent-blog-grid';
import { useBlogs } from '@/hooks/use-blogs';

function BlogList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || undefined;
  const category = searchParams.get('category') || undefined;
  
  const { data, isLoading, isError, error } = useBlogs({ 
    search, 
    category,
    page_size: 10 
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse flex flex-col gap-4">
            <div className="bg-gray-200 aspect-4/3 rounded-xl" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-8 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return <div className="text-center py-10 text-red-500">Error: {error.message}</div>;
  }

  if (!data?.results || data.results.length === 0) {
    return (
      <div className="text-center py-2 rounded-2xl">
        <p className="text-lg text-muted font-serif">No articles found matching your criteria.</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
        {data.results.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
      
      {data && (data.next || data.previous) && (
        <div className="flex justify-center mt-12 space-x-4">
          {data.previous && (
            <button className="px-6 py-2 text-sm font-bold uppercase tracking-widest text-primary border border-gray-200 rounded-full hover:bg-gray-50 transition-all active:scale-95">
              Previous
            </button>
          )}
          {data.next && (
            <button className="px-6 py-2 text-sm font-bold uppercase tracking-widest text-primary border border-gray-200 rounded-full hover:bg-gray-50 transition-all active:scale-95">
              Next
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default function BlogPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      {/* Recent Blogs Grid - Full Width */}
      <Suspense fallback={<div className="h-[500px] bg-gray-50 rounded-2xl animate-pulse mb-12" />}>
        <RecentBlogGrid />
      </Suspense>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Left Content: Blog List */}
        <div className="flex-1">
          <Suspense fallback={<div>Loading articles...</div>}>
            <BlogList />
          </Suspense>
        </div>

        {/* Right Content: Sidebar */}
        <div className="w-full lg:w-[320px] shrink-0">
          <Suspense fallback={<div>Loading sidebar...</div>}>
            <BlogSidebar />
          </Suspense>
        </div>
      </div>
    </main>
  );
}