'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useBlogCategories, useBlogs } from '@/hooks/use-blogs';
import { Separator } from '@/components/ui/separator';

export function BlogSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState(searchParams.get('search') || '');
  
  const { data: categories } = useBlogCategories();
  const { data: recentPosts } = useBlogs({ page_size: 4, ordering: '-created_at' });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchValue.trim())}`);
    } else {
      router.push('/blog');
    }
  };

  return (
    <aside className="space-y-10">
      {/* Search Bar */}
      <div className="relative">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <input
              type="text"
              id="blog-search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-foreground bg-transparent rounded-base border border-border appearance-none focus:outline-none focus:ring-0 focus:border-primary peer"
              placeholder=" "
            />
            <label
              htmlFor="blog-search"
              className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left  px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1 pointer-events-none"
            >
              Search articles...
            </label>
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
          </div>
        </form>
      </div>




      {/* Recent Posts */}
      <div className="space-y-6">
        <h3 className="text-xl font-serif font-bold text-primary">Recent posts</h3>
        <div className="space-y-6">
          {recentPosts?.results.map((post) => {
            const monthDay = new Date(post.created_at).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });

            const imageUrl = post.thumbnail_image?.startsWith('http')
              ? post.thumbnail_image
              : `${process.env.NEXT_PUBLIC_BACKEND_URL}${post.thumbnail_image}`;

            return (
              <Link key={post.id} href={`/blog/${post.slug}`} className="flex gap-4 group">
                <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 border border-gray-100">
                  <Image
                    src={imageUrl || '/placeholder-blog.jpg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center gap-1">
                  <h4 className="text-sm font-bold text-primary line-clamp-2 leading-tight group-hover:text-accent transition-colors">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-medium">
                    <span>{monthDay}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>8 min read</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
