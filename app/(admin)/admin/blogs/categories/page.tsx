"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import {
  useBlogCategories,
  useCreateBlogCategory,
  useUpdateBlogCategory,
  useDeleteBlogCategory,
} from "@/hooks/use-blogs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Edit2, Plus, Loader2, Search, ArrowLeft } from "lucide-react";
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
import { BlogCategory } from "@/types/blog";
import Link from "next/link";

const CategoryManagementPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const [categoryName, setCategoryName] = useState("");
  const [deleteDialog, setDeleteDialog] = useState<{
    isOpen: boolean;
    category: BlogCategory | null;
  }>({ isOpen: false, category: null });

  const { data: categories, isLoading } = useBlogCategories();
  const createMutation = useCreateBlogCategory();
  const updateMutation = useUpdateBlogCategory();
  const deleteMutation = useDeleteBlogCategory();

  const filteredCategories = useMemo(() => {
    if (!categories) return [];
    return categories.filter((cat: BlogCategory) =>
      cat.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [categories, searchTerm]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryName.trim()) return;

    if (editingCategory) {
      updateMutation.mutate(
        { slug: editingCategory.slug, title: categoryName },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Category updated successfully" });
            handleCloseModal();
          },
          onError: (error: Error) => {
            toast({
              title: "Error",
              description: error.message || "Failed to update category",
              variant: "destructive",
            });
          },
        }
      );
    } else {
      createMutation.mutate(
        { title: categoryName },
        {
          onSuccess: () => {
            toast({ title: "Success", description: "Category created successfully" });
            handleCloseModal();
          },
          onError: (error: Error) => {
            toast({
              title: "Error",
              description: error.message || "Failed to create category",
              variant: "destructive",
            });
          },
        }
      );
    }
  };

  const handleEdit = (category: BlogCategory) => {
    setEditingCategory(category);
    setCategoryName(category.title);
    setIsModalOpen(true);
  };

  const handleDelete = (category: BlogCategory) => {
    setDeleteDialog({ isOpen: true, category });
  };

  const confirmDelete = () => {
    if (!deleteDialog.category) return;
    deleteMutation.mutate(deleteDialog.category.slug, {
      onSuccess: () => {
        toast({ title: "Success", description: "Category deleted successfully" });
        setDeleteDialog({ isOpen: false, category: null });
      },
      onError: (error: Error) => {
        toast({
          title: "Error",
          description: error.message || "Failed to delete category",
          variant: "destructive",
        });
        setDeleteDialog({ isOpen: false, category: null });
      },
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setCategoryName("");
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin/blogs">
              <Button variant="ghost" size="sm" className="cursor-pointer">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Button>
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Blog Categories</h1>
          </div>
          
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative">
              <Input
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full sm:w-64"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="cursor-pointer bg-gray-900 hover:bg-gray-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Slug
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto text-blue-600" />
                  </td>
                </tr>
              ) : filteredCategories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500 text-sm">
                    No categories found.
                  </td>
                </tr>
              ) : (
                filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {category.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer text-gray-600 hover:text-blue-600"
                        onClick={() => handleEdit(category)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(category)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Name</label>
              <Input
                placeholder="Enter category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleCloseModal}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
                disabled={createMutation.isPending || updateMutation.isPending}
              >
                {(createMutation.isPending || updateMutation.isPending) && (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                )}
                {editingCategory ? "Update Category" : "Add Category"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog
        open={deleteDialog.isOpen}
        onOpenChange={(open) => !open && setDeleteDialog({ isOpen: false, category: null })}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete &quot;{deleteDialog.category?.title}&quot;? 
              This action cannot be undone and may affect blogs assigned to this category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CategoryManagementPage;
