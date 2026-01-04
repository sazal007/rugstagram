'use client';
import { useBlogs } from '@/hooks/use-blogs';
import Link from 'next/link';

interface BlogLayoutProps {
  children: React.ReactNode;
}

export default function BlogLayout({ children }: BlogLayoutProps) {
  const { data } = useBlogs();
  
  const categories = data?.results.reduce((acc, blog) => {
    const category = blog.category;
    if (category && !acc.find(cat => cat.id === category.id)) {
      acc.push(category);
    }
    return acc;
  }, [] as NonNullable<typeof data.results[0]['category']>[]) || [];

  return (
    <div className="min-h-screen bg-white">
      <header className=" border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 tracking-wide">
              Into the Wash
            </h1>
          </div>
          <nav className="py-3 border-b border-t ">
            <ul className="flex justify-center space-x-8 text-sm font-medium text-gray-600 uppercase tracking-wider">
              <li>
                <Link
                  href="/blog"
                  className="hover:text-gray-900 transition-colors duration-200"
                >
                  All Posts
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/blog/category/${category.slug}`}
                    className="hover:text-gray-900 transition-colors duration-200"
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>
      {children}
    </div>
  );
}