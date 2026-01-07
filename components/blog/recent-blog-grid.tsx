'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useBlogs } from '@/hooks/use-blogs';
import { BlogPost } from '@/types/blog';

function RecentBlogCard({ 
  blog, 
  isLarge = false 
}: { 
  blog: BlogPost; 
  isLarge?: boolean 
}) {

  const date = new Date(blog.created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const imageUrl = blog.thumbnail_image?.startsWith('http')
    ? blog.thumbnail_image
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.thumbnail_image}`;

  return (
    <Link 
      href={`/blog/${blog.slug}`}
      className={`relative group overflow-hidden rounded-2xl bg-gray-900 flex flex-col justify-end p-6 ${
        isLarge ? 'h-[500px] md:h-full min-h-[400px]' : 'h-[240px]'
      }`}
    >
      <Image
        src={imageUrl || '/placeholder-blog.jpg'}
        alt={blog.title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-50"
      />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
      
      <div className="relative z-10 space-y-3">
        <div className="flex items-center gap-3 text-white/80 text-[10px] uppercase tracking-widest font-bold">
          <span>{date}</span>
        </div>
        
        <h3 className={`font-bold text-white leading-tight ${
          isLarge ? 'text-2xl md:text-3xl' : 'text-lg line-clamp-2'
        }`}>
          {blog.title}
        </h3>

        {isLarge && blog.description && (
          <p className="text-white/70 text-sm line-clamp-2 max-w-xl font-light leading-relaxed">
            {blog.description}
          </p>
        )}
      </div>
    </Link>
  );
}

export function RecentBlogGrid() {
  const { data, isLoading } = useBlogs({ page_size: 5, ordering: '-created_at' });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px] animate-pulse">
        <div className="md:col-span-6 lg:col-span-7 bg-gray-100 rounded-2xl h-[400px] md:h-full" />
        <div className="md:col-span-6 lg:col-span-5 grid grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-2xl h-[240px]" />
          ))}
        </div>
      </div>
    );
  }

  const blogs = data?.results || [];
  if (blogs.length === 0) return null;

  const featured = blogs[0];
  const others = blogs.slice(1, 5);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px] mb-40 px-1">
      {/* Featured Big Card */}
      <div className="md:col-span-6 lg:col-span-7">
        <RecentBlogCard blog={featured} isLarge />
      </div>

      {/* 2x2 Small Grid */}
      <div className="md:col-span-6 lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {others.map((blog) => (
          <RecentBlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
}
