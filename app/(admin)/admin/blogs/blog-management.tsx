"use client";

import  { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  useBlogs,
  useBlogCategories,
  useDeleteBlog,
  useUpdateBlog,
} from "@/hooks/use-blogs";
import { BlogsTable, BlogsSearch } from "@/components/admin/blogs";
import { TableSkeleton } from "@/components/admin/shared/table-skeleton";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BlogPost, BlogFilters } from "@/types/blog";
import Pagination from "@/components/ui/pagination";

const BlogsManagement = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    blog: BlogPost | null;
  }>({ isOpen: false, blog: null });

  const [filters, setFilters] = useState({
    page: 1,
    search: "",
    category: "",
    status: "",
    pageSize: 10,
  });

  const queryFilters = useMemo(() => {
    const qf: BlogFilters = { 
      page: filters.page, 
      search: filters.search,
      page_size: filters.pageSize 
    };
    if (filters.category) qf.category = filters.category;
    if (filters.status) qf.is_published = filters.status === "published";
    return qf;
  }, [filters]);

  const {
    data: blogData,
    isLoading: isLoadingBlogs,
    error,
  } = useBlogs(queryFilters);
  const { data: categories, isLoading: isLoadingCategories } =
    useBlogCategories();

  const deleteBlogMutation = useDeleteBlog();
  const updateBlogMutation = useUpdateBlog();

  const handleCreateNew = () => router.push("/admin/blogs/add");
  const handleEditBlog = (blog: BlogPost) =>
    router.push(`/admin/blogs/edit/${blog.slug}`);

  const handleDeleteBlog = (blog: BlogPost) => {
    setDeleteDialog({ isOpen: true, blog });
  };

  const confirmDelete = async () => {
    if (!deleteDialog.blog) return;

    deleteBlogMutation.mutate(
      { slug: deleteDialog.blog.slug },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Blog deleted successfully!",
          });
          setDeleteDialog({ isOpen: false, blog: null });
        },
        onError: (error: Error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to delete blog",
            variant: "destructive",
          });
          setDeleteDialog({ isOpen: false, blog: null });
        },
      }
    );
  };

  const cancelDelete = () => {
    setDeleteDialog({ isOpen: false, blog: null });
  };

  const handleTogglePublish = (blog: BlogPost) => {
    const updatedData = { is_published: !blog.is_published };
    updateBlogMutation.mutate(
      { slug: blog.slug, blogData: updatedData },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: `Blog ${
              blog.is_published ? "unpublished" : "published"
            } successfully!`,
          });
        },
        onError: (error: Error) => {
          toast({
            title: "Error",
            description: error.message || "Failed to update blog status",
            variant: "destructive",
          });
        },
      }
    );
  };

  const handleSearch = (term: string) =>
    setFilters((prev) => ({ ...prev, search: term, page: 1 }));

  const handleFilter = (newFilters: { category: string }) =>
    setFilters((prev) => ({ ...prev, category: newFilters.category, page: 1 }));

  const handlePageChange = (page: number) =>
    setFilters((prev) => ({ ...prev, page }));

  const handlePageSizeChange = (pageSize: number) =>
    setFilters((prev) => ({ ...prev, pageSize, page: 1 }));

  if (error) {
    toast({
      title: "Error",
      description: error.message || "Failed to fetch blogs",
      variant: "destructive",
    });
  }

  const blogs = blogData?.results || [];
  const totalBlogs = blogData?.count || 0;
  const totalPages = Math.ceil(totalBlogs / filters.pageSize);
  const hasNext = !!blogData?.next;
  const hasPrevious = !!blogData?.previous;

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <BlogsSearch
          searchQuery={filters.search}
          selectedCategory={filters.category}
          onSearchChange={handleSearch}
          onFilterChange={(category) => handleFilter({ category })}
          onCreateNew={handleCreateNew}
          onManageCategories={() => router.push("/admin/blogs/categories")}
          categories={categories || []}
        />
        {isLoadingBlogs || isLoadingCategories ? (
          <TableSkeleton />
        ) : (
          <BlogsTable
            blogs={blogs}
            onEdit={handleEditBlog}
            onDelete={handleDeleteBlog}
            onTogglePublish={handleTogglePublish}
            isLoading={false}
          />
        )}
        
        {/* Advanced Pagination Component */}
        {totalPages > 1 && (
          <Pagination
            count={totalBlogs}
            pageSize={filters.pageSize}
            hasNext={hasNext}
            hasPrevious={hasPrevious}
            onPageSizeChange={handlePageSizeChange}
            currentPage={filters.page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            showFirstLast={true}
            maxVisiblePages={7}
          />
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open: boolean) => !open && cancelDelete()}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Blog Post</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteDialog.blog?.title}&quot;? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete} className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BlogsManagement;