'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost as Blog } from '@/types/blog';
import { User } from 'lucide-react';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const date = new Date(blog.created_at).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  const authorName = blog.author 
    ? `${blog.author.first_name || ''} ${blog.author.last_name || ''}`.trim() || blog.author.username
    : 'Anonymous';

  const imageUrl = blog.thumbnail_image?.startsWith('http')
    ? blog.thumbnail_image
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.thumbnail_image}`;

  // Hardcoded for design fidelity as per request
  const readTime = "7 min";

  return (
    <Link 
      href={`/blog/${blog.slug}`} 
      className="group flex flex-col bg-transparent gap-4"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-[32px] aspect-4/3 w-full bg-gray-100">
        <Image
          src={imageUrl || '/placeholder-blog.jpg'}
          alt={blog.thumbnail_image_alt_description || blog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />

      </div>

      {/* Content */}
      <div className="flex flex-col space-y-3">
        {/* Meta Row */}
        <div className="flex items-center gap-2 text-muted text-xs font-medium">
          <span>{date}</span>
          <span>•</span>
          <span>{readTime}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl  font-bold text-primary leading-tight line-clamp-2 group-hover:text-accent transition-colors">
          {blog.title}
        </h3>
      </div>
    </Link>
  );
}