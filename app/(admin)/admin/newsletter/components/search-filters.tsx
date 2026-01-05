import React from 'react';
import { RefreshCw, Search, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onRefresh: () => void;
  isLoading: boolean;
  totalSubscribers: number;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  searchQuery,
  onSearchChange,
  onRefresh,
  isLoading,
  totalSubscribers,
}) => (
    <div className="mb-6 sm:flex sm:items-center sm:justify-between">
    <div className="flex items-center gap-4">
      <h2 className="text-2xl font-bold text-gray-900">Newsletter Management</h2>
      <Badge className="bg-gray-500 text-white hover:bg-gray-600">
        <Users className="w-3 h-3 mr-1" />
        {totalSubscribers} Subscribers
      </Badge>
    </div>
    <div className="flex flex-col gap-3 mt-3 sm:mt-0 sm:flex-row">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="block w-full py-2 pl-10 pr-3 text-base border border-gray-300 rounded-md focus:outline-none sm:text-sm"
        />
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <Search className="w-4 h-4 text-gray-400" />
        </div>
      </div>
      
      <button
        onClick={onRefresh}
        disabled={isLoading}
        className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 border border-transparent rounded-md shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
        Refresh
      </button>
    </div>
  </div>
);

export default SearchFilters;
