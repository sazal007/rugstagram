"use client";
import { useState } from "react";
import { Plus } from "lucide-react";
import { useCollections, useCreateCollection, useUpdateCollection, useDeleteCollection } from "@/hooks/use-collections";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CategoryList } from "@/components/admin/collections/category-list";
import { CategoryForm } from "@/components/admin/collections/category-form";
import { Collection } from "@/types/product";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";
import { TableSkeleton } from "@/components/admin/shared/table-skeleton";

export const CategoryClient = () => {
  const { data: categories = [], isLoading } = useCollections();
  const createCategory = useCreateCollection();
  const updateCategory = useUpdateCollection();
  const deleteCategory = useDeleteCollection();

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Collection | null>(null);

  const onOpen = (category: Collection | null = null) => {
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
        toast.success("Success", {
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
        toast.success("Success", {
          description: "Category created successfully.",
        });
      }
      onClose();
    } catch (error) {
        console.error(error);
      toast.error("Error", {
        description: getErrorMessage(error),
      });
    }
  };

  const onDelete = async (category: Collection) => {
    try {
      await deleteCategory.mutateAsync(category.id);
      toast.success("Success", {
        description: "Category deleted successfully.",
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.error(error);
      toast.error("Error", {
        description: getErrorMessage(error),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <TableSkeleton />
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Collections</h2>
          <p className="text-sm text-muted-foreground">Manage collections (categories) for your store</p>
        </div>
        <Button onClick={() => onOpen(null)} className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4 " />
          Add New
        </Button>
      </div>
      <Separator className="my-4" />
      <CategoryList
        data={categories}
        onEdit={(category: Collection) => onOpen(category)}
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
