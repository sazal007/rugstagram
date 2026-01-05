import React from 'react';
import { Search, Plus, List } from 'lucide-react';
import { BlogCategory } from '@/types/blog';

interface BlogsSearchProps {
  searchQuery: string;
  selectedCategory: string;
  onSearchChange: (query: string) => void;
  onFilterChange: (category: string) => void;
  onCreateNew: () => void;
  onManageCategories: () => void;
  categories: BlogCategory[];
}

const BlogsSearch: React.FC<BlogsSearchProps> = ({
  searchQuery,
  selectedCategory,
  onSearchChange,
  onFilterChange,
  onCreateNew,
  onManageCategories,
  categories = [],
}) => (
  <div className="mb-6 sm:flex sm:items-center sm:justify-between">
    <h2 className="text-2xl font-bold text-gray-900">Blog Management</h2>
    <div className="flex flex-col gap-3 mt-3 sm:mt-0 sm:flex-row">
      <div className="relative">
        <input
          type="text"
          placeholder="Search blogs..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full py-2 pl-10 pr-3 text-base border border-gray-300 rounded-md focus:outline-none sm:text-sm"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      <div className="relative">
        <select
          className="block w-full py-2 pl-3 pr-10 text-base border border-gray-300 rounded-md focus:outline-none sm:text-sm"
          value={selectedCategory}
          onChange={(e) => onFilterChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      
      <button
        onClick={onManageCategories}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 cursor-pointer"
      >
        <List className="mr-2 h-4 w-4" />
        Categories
      </button>

      <button
        onClick={onCreateNew}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-900 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 cursor-pointer"
      >
        <Plus className="mr-2 h-4 w-4" />
        Create New
      </button>
    </div>
  </div>
);

export default BlogsSearch;