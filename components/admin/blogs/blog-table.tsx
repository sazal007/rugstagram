import React from "react";
import Image from "next/image";
import { BlogPost } from "@/types/blog";
import { Edit, Trash2, FileText } from "lucide-react";
import { getImageUrl } from "@/utils/image";
import Link from "next/link";

interface BlogsTableProps {
  blogs: BlogPost[];
  onEdit: (blog: BlogPost) => void;
  onDelete: (blog: BlogPost) => void;
  onTogglePublish: (blog: BlogPost) => void;
  isLoading: boolean;
}

const BlogsTable: React.FC<BlogsTableProps> = ({
  blogs,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-lg shadow-sm border border-gray-200">
        <FileText className="w-12 h-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">No blogs found</h3>
        <p className="mt-1 text-sm text-gray-500 px-4">
          Get started by creating your first blog post.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
      {/* Mobile view - card layout */}
      <div className="p-2 space-y-3 sm:hidden">
        {blogs.map((blog) => (
          <div
            key={blog.id}
            className="p-3 border border-gray-200 bg-white rounded-lg transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="relative shrink-0 w-12 h-12">
                  <Image
                    src={getImageUrl(blog.thumbnail_image) || "/images/fallback.png"}
                    alt={blog.thumbnail_image_alt_description || blog.title}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 line-clamp-2">
                    {blog.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {blog.category?.title || "No category"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <p className="text-xs text-gray-500">
                {new Date(blog.created_at).toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onEdit(blog)}
                  className="p-1 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onDelete(blog)}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view - table layout */}
      <div className="hidden overflow-x-auto sm:block">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Blog Info
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Category
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created Date
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {blogs.map((blog) => (
              <tr key={blog.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="shrink-0 h-10 w-10 relative">
                      <Image
                        className="rounded-md object-cover"
                        src={getImageUrl(blog.thumbnail_image) || "/images/fallback.png"}
                        alt={blog.title}
                        fill
                      />
                    </div>
                    <div className="ml-4">
                      <Link href={`/admin/blogs/edit/${blog.slug}`}>
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate cursor-pointer hover:underline">
                          {blog.title}
                        </div>
                      </Link>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                    {blog.category?.title || "N/A"}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(blog.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => onEdit(blog)}
                      className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(blog)}
                      className="text-red-400 hover:text-red-600 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BlogsTable;
