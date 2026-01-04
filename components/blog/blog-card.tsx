'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost as Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col">
      <div className="overflow-hidden">
        <Image
          src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.thumbnail_image}`}
          alt={blog.thumbnail_image_alt_description || blog.title}
          width={600}
          height={400}
          className="w-full h-auto object-cover aspect-[3/2] transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col pt-4">
        <p className="text-xs font-poppins tracking-widest text-black uppercase">
          {blog.category?.title}
        </p>
        <div className="text-3xl font-unna mt-2 text-gray-800 group-hover:text-black">
          {blog.title}
        </div>
        <p className="mt-4 text-sm font-medium text-gray-600 underline underline-offset-2">
          Read More...
        </p>
      </div>
    </Link>
  );
}