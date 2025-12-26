"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCategories, useCreateCategory, useUpdateCategory, useDeleteCategory } from "@/hooks/use-category";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryList } from "@/components/admin/collections/category-list";
import { CategoryForm } from "@/components/admin/collections/category-form";
import { Category } from "@/types/category";
import { useToast } from "@/hooks/use-toast";

export const CategoryClient = () => {
  const { data: categories = [], isLoading } = useCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  const onOpen = (category: Category | null = null) => {
    setSelectedCategory(category);
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
    setSelectedCategory(null);
  };

  type CategoryFormData = {
    name: string;
    slug: string;
    image?: string | File | null;
    description?: string;
  };

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      if (data.description) formData.append("description", data.description);
      
      if (data.image instanceof File) {
        formData.append("image", data.image);
      } else if (typeof data.image === 'string') {
         // If it's a string, it's an existing URL, likely not needing re-upload unless backend api expects it differently.
         // But usually PATCH with partial data is better. 
         // For now, if it's existing string, we might not send it if the backend ignores strings in 'image' field for FormData, or we handle it.
         // Often backends expect the file only if changed.
      }


      if (selectedCategory) {
        // For update, we can send FormData if image changed (is File), otherwise JSON is cleaner?
        // But our service now handles both. Let's strictly use FormData if Image is a File.
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let payload: any = {
           name: data.name,
           slug: data.slug,
           description: data.description || "",
        };

        if (data.image instanceof File) {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("slug", data.slug);
            formData.append("description", data.description || "");
            formData.append("image", data.image);
            payload = formData;
        } else {
             // Retain existing image if not changed (passed as string or null)
             // We generally just don't send 'image' field if it's not a new file, 
             // relying on backend to keep existing.
             // But if user cleared it? We'd set image to null.
             if (data.image === null && selectedCategory.image) {
                payload.image = null; 
             }
        }
        
        await updateCategory.mutateAsync({ id: selectedCategory.id, data: payload });
        toast({
          title: "Success",
          description: "Category updated successfully.",
        });
      } else {
        // Create case
        const formData = new FormData();
         formData.append("name", data.name);
         formData.append("slug", data.slug);
         if (data.description) formData.append("description", data.description);
         if (data.image instanceof File) {
            formData.append("image", data.image);
         }
        
        await createCategory.mutateAsync(formData);
        toast({
          title: "Success",
          description: "Category created successfully.",
        });
      }
      onClose();
    } catch (error) {
        console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong.",
        variant: "destructive",
      });
    }
  };

  const onDelete = async (category: Category) => {
    try {
      await deleteCategory.mutateAsync(category.id);
      toast({
        title: "Success",
        description: "Category deleted successfully.",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
      toast({
        title: "Error",
        description: error.message || "Make sure you removed all products using this category first.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center">Loading...</div>;
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Collections ({categories.length})</h2>
          <p className="text-sm text-muted-foreground">Manage collections (categories) for your store</p>
        </div>
        <Button onClick={() => onOpen(null)}>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <CategoryList
        data={categories}
        onEdit={(category: Category) => onOpen(category)}
        onDelete={onDelete}
      />
      <CategoryForm
        initialData={selectedCategory}
        isOpen={open}
        onClose={onClose}
        onSubmit={onSubmit}
        isLoading={createCategory.isPending || updateCategory.isPending}
      />
    </>
  );
};
