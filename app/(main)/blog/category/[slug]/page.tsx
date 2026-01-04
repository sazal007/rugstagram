'use client';

import { BlogCard } from '@/components/blog/blog-card';
import { useCategory, useBlogsByCategory } from '@/hooks/use-blogs';
import { notFound } from 'next/navigation';
import { use } from 'react';

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = use(params);

  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useCategory(slug);

  const {
    data: blogsData,
    isLoading: blogsLoading,
    error: blogsError,
  } = useBlogsByCategory(slug);

  if (categoryError && categoryError.message.includes('not found')) {
    notFound();
  }

  if (categoryLoading || blogsLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (categoryError || blogsError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p className="text-gray-600">
            {categoryError?.message || blogsError?.message || 'Something went wrong'}
          </p>
        </div>
      </div>
    );
  }

  const blogs = blogsData?.results || [];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold font-serif text-gray-900 mb-4">
          {category?.title}
        </h1>
        <p className="text-lg text-gray-600">
          {blogs.length} {blogs.length === 1 ? 'article' : 'articles'} in this category
        </p>
      </div>

      {blogs.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No articles found
          </h2>
          <p className="text-gray-500">
            There are no articles in this category yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
}