'use client';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost as Blog } from '@/types/blog';

interface BlogCardProps {
  blog: Blog;
}

export function BlogCard({ blog }: BlogCardProps) {
  const date = new Date(blog.created_at);
  const month = date.toLocaleString('en-US', { month: 'short' });
  const day = date.getDate();

  const authorName = blog.author 
    ? `${blog.author.first_name || ''} ${blog.author.last_name || ''}`.trim() || blog.author.username
    : 'Anonymous';

  const imageUrl = blog.thumbnail_image?.startsWith('http')
    ? blog.thumbnail_image
    : `${process.env.NEXT_PUBLIC_BACKEND_URL}${blog.thumbnail_image}`;

  return (
    

    <Link 
      href={`/blog/${blog.slug}`} 
      className="group flex flex-col bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
    >
      {/* Featured Image */}
      

      <div className="relative overflow-hidden aspect-4/3">
        <Image
          src={imageUrl || '/placeholder-blog.jpg'}
          alt={blog.thumbnail_image_alt_description || blog.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-col flex-1 p-4">
        <div className="flex items-start gap-3">
          {/* Date Column */}
          <div className="flex flex-col items-center text-center min-w-[40px]">
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary">
              {month}
            </span>
            <span className="text-xl font-bold font-serif text-primary leading-none mt-1">
              {day}
            </span>
          </div>

          {/* Title and Excerpt */}
          <div className="flex-1 space-y-1.5">
            <h3 className="text-lg font-serif font-bold text-primary  transition-colors duration-300 line-clamp-2 leading-tight">
              {blog.title}
            </h3>
            {blog.description && (
              <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                {blog.description}
              </p>
            )}
          </div>
        </div>

      </div>
    </Link>
  );
}