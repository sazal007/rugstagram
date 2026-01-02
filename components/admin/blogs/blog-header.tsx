import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface BlogsHeaderProps {
  onCreateNew: () => void;
  onRefresh: () => void;
  blogsCount?: number;
  isRefreshing?: boolean;
}

const BlogsHeader: React.FC<BlogsHeaderProps> = ({
  onCreateNew,
  blogsCount,
}) => {
  return (
    <div className="mb-6 sm:mb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
            Blog Management
          </h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 leading-relaxed">
            Manage your blog posts, categories, and content.
            {blogsCount !== undefined && (
              <span className="block sm:inline sm:ml-2 text-xs sm:text-sm font-medium text-primary mt-1 sm:mt-0">
                {blogsCount} total blog{blogsCount !== 1 ? "s" : ""}
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Button
            onClick={onCreateNew}
            size="sm"
            className="h-9 px-3 sm:h-10 sm:px-4 bg-gray-600 text-white hover:bg-gray-600"
          >
            <Plus className="w-4 h-4 sm:mr-2" />
            <span className="hidden xs:inline sm:inline ">Create New</span>
            <span className="xs:hidden sm:hidden">New</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogsHeader;
