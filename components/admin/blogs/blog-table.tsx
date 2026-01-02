import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { BlogPost } from "@/types/blog";
import { FileText, Edit, Trash2 } from "lucide-react";
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
      <>
        {/* Desktop Loading State */}
        <div className="hidden sm:block border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-24 h-5" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-24 h-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Loading State */}
        <div className="sm:hidden space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-12 h-12 rounded-md flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-5 w-full mb-2" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="w-20 h-4" />
                <div className="flex gap-2">
                  <Skeleton className="w-8 h-8 rounded" />
                  <Skeleton className="w-8 h-8 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-lg shadow-sm">
        <FileText className="w-12 h-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No blogs found
        </h3>
        <p className="mt-1 text-sm text-gray-500 px-4">
          Get started by creating your first blog post.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden sm:block border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead className="min-w-[120px]">Category</TableHead>
              <TableHead className="min-w-[100px]">Created</TableHead>
              <TableHead className="text-right min-w-[100px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0 w-10 h-10">
                      <Image
                        src={getImageUrl(blog.thumbnail_image)}
                        alt={blog.thumbnail_image_alt_description || blog.title}
                        fill
                        sizes="40px"
                        className="object-cover rounded-md"
                      />
                    </div>
                    <Link href={`/admin/blogs/edit/${blog.slug}`}>
                      <span className="font-medium text-gray-900 line-clamp-2">
                        {blog.title}
                      </span>
                    </Link>
                  </div>
                </TableCell>
                <TableCell>
                  {blog.category ? (
                    <Badge className="text-xs bg-white hover:bg-white font-normal text-black ">
                      {blog.category.title}
                    </Badge>
                  ) : (
                    <span className="text-gray-400 text-sm">N/A</span>
                  )}
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(blog.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(blog)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => onDelete(blog)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {blogs.map((blog) => (
          <div key={blog.id} className="border rounded-lg p-4 bg-white">
            {/* Header with image and title */}
            <div className="flex items-center gap-3 mb-3">
              <div className="relative flex-shrink-0 w-12 h-12">
                <Image
                  src={blog.thumbnail_image || "/images/fallback.png"}
                  alt={blog.thumbnail_image_alt_description || blog.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 mb-1">
                  {blog.title}
                </h3>
                {blog.category ? (
                  <Badge className="text-xs bg-gray-500 text-white hover:bg-gray-500">
                    {blog.category.title}
                  </Badge>
                ) : (
                  <span className="text-gray-400 text-xs">No category</span>
                )}
              </div>
            </div>

            {/* Footer with date and actions */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {new Date(blog.created_at).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(blog)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 h-8 w-8 p-0"
                  onClick={() => onDelete(blog)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogsTable;
