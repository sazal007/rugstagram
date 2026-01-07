'use client';

import React from 'react';
import Image from 'next/image';

import { BlogPost } from '@/types/blog';
import { sanitizeBlogContent } from '@/utils/htmlSanitizer';
import { BlogSidebar } from '../blog-sidebar';
import { Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';

interface BlogDetailsProps {
  blog: BlogPost;
}

export default function BlogDetails({ blog }: BlogDetailsProps) {
  const [blogUrl, setBlogUrl] = React.useState('');

  React.useEffect(() => {
    setBlogUrl(window.location.href);
  }, []);

  const shareLinks = [
    {
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`,
      label: 'Share on Facebook',
      color: 'hover:text-blue-600'
    },
    {
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(blogUrl)}`,
      label: 'Share on Twitter',
      color: 'hover:text-sky-500'
    },
    {
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(blogUrl)}`,
      label: 'Share on LinkedIn',
      color: 'hover:text-blue-700'
    }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(blogUrl);
    // You could add a toast here
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
       {/* 1. Featured Image (Full Width) */}
      {blog.thumbnail_image && (
          <div className="mb-10 w-full h-[400px] lg:h-[500px] relative rounded-3xl overflow-hidden shadow-sm">
            <Image
              src={blog.thumbnail_image}
              alt={blog.thumbnail_image_alt_description || blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

      {/* 2. Header Info (Full Width) */}
      <header className="mb-12">
         {/* Date & Read Time */}
          <div className="flex items-center gap-2 text-sm font-medium text-gray-500 mb-4 tracking-wide">
            <span>
              {new Date(blog.created_at).toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              })}
            </span>
            <span>•</span>
            <span>
             {Math.max(1, Math.ceil((blog.description?.replace(/<[^>]*>/g, '').split(/\s+/).length || 0) / 200))} min
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl  font-bold text-gray-900 mb-6 leading-tight">
            {blog.title}
          </h1>

           {/* Share Section - Horizontal */}
          <div className="flex items-center gap-4">
             <span className="text-[10px] font-bold uppercase tracking-widest">
                  SHARE
             </span>
            {shareLinks.map((link, i) => (
              <a
                key={i}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={` hover:scale-110 transition-all duration-300 ${link.color}`}
                aria-label={link.label}
              >
                <link.icon size={18} strokeWidth={1.5} />
              </a>
            ))}
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-gray-900 hover:scale-110 transition-all duration-300"
              aria-label="Copy link"
            >
              <LinkIcon size={18} strokeWidth={1.5} />
            </button>
          </div>
      </header>


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content (Description) */}
        <main className="lg:col-span-8">
          <article>
            {/* Content */}
              <div
                dangerouslySetInnerHTML={{
                  __html: sanitizeBlogContent(blog.description || "")
                }}
              />
            
            {/* Tags */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {blog.tags.map((tag) => (
                    <span 
                      key={tag.id} 
                      className="px-4 py-1.5 bg-gray-50 text-gray-600 text-sm rounded-full font-medium hover:bg-gray-100 transition-colors cursor-default"
                    >
                      #{tag.title}
                    </span>
                  ))}
                </div>
              </div>
            )}

          </article>
        </main>

        {/* Sidebar */}
        <aside className="lg:col-span-4 lg:pl-8">
           <div className="sticky top-24 space-y-10">
             
             {/* Author Widget */}
             {blog.author && (
               <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden bg-gray-100 shrink-0">
                     {blog.author.first_name ? (
                        <div className="flex items-center justify-center w-full h-full bg-primary text-white text-xl font-bold">
                          {blog.author.first_name[0]}
                        </div>
                     ) : (
                       <div className="w-full h-full bg-gray-200" />
                     )}
                  </div>
                  <div>
                    <h3 className=" font-bold text-lg text-gray-900 leading-none mb-1">
                      {blog.author.first_name} {blog.author.last_name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-1">
                      Author {/* Replace with dynamic role if available */}
                    </p>
                     {/* Placeholder Social for Author if data existed, using generic for now */}
                    <div className="flex gap-2">
                      <Linkedin size={16} className="text-blue-700" />
                    </div>
                  </div>
               </div>
             )}

             <BlogSidebar />
           </div>
        </aside>
      </div>
    </div>
  );
}
