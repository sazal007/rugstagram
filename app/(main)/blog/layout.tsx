'use client';
import { useBlogs } from '@/hooks/use-blogs';

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
        {children}
      </header>
    </div>
  );
}