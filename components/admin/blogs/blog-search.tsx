import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { BlogCategory } from '@/types/blog';
import { Search } from 'lucide-react';

interface BlogsSearchProps {
  onSearch: (term: string) => void;
  onFilter: (filters: { category: string }) => void;
  categories: BlogCategory[];
}

const BlogsSearch: React.FC<BlogsSearchProps> = ({ onSearch, onFilter, categories = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    onFilter({ category: value });
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    onSearch('');
    onFilter({ category: '' });
  };

  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-md">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1 min-w-0">
          <Label htmlFor="search" className="block text-sm font-medium text-gray-700">
            Search Blogs
          </Label>
          <div className="relative mt-1">
            <Search className="absolute w-4 h-4 text-gray-500 left-3 top-1/2 -translate-y-1/2" />
            <Input
              type="text"
              id="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by title, content..."
              className="pl-10 w-full"
            />
          </div>
        </div>
        
        <div className="w-full sm:w-48">
          <Label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </Label>
          <Select value={selectedCategory} onValueChange={handleCategoryChange}>
            <SelectTrigger id="category" className="mt-1 w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={String(category.slug)}>
                  {category.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full sm:w-auto">
          <Button 
            onClick={clearFilters} 
            variant="outline" 
            className="w-full sm:w-auto sm:mt-6"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogsSearch;