"use client";

import { useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Collection } from "@/types/product";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  image: z.any().optional(),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

interface CategoryFormProps {
  initialData: Collection | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CategoryFormValues) => void;
  isLoading: boolean;
}

export const CategoryForm: React.FC<CategoryFormProps> = ({
  initialData,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      image: "",
      description: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        slug: initialData.slug || "",
        image: initialData.image || "",
        description: initialData.description || "",
      });
    } else {
      form.reset({
        name: "",
        slug: "",
        image: "",
        description: "",
      });
    }
  }, [initialData, form]);

  const handleSubmit = (values: CategoryFormValues) => {
    onSubmit(values);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Create Category"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Category name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Slug</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="category-slug"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-4">
                       <Input
                        type="file"
                        accept="image/*"
                         disabled={isLoading}
                         onChange={(e) => {
                           const file = e.target.files?.[0];
                           if (file) {
                             field.onChange(file);
                           }
                         }}
                        />
                        {field.value && (
                          <div className="relative h-40 w-full overflow-hidden rounded-md border">
                            {typeof field.value === 'string' ? (
                               <Image
                                  src={field.value}
                                  alt="Preview"
                                  fill
                                  className="h-full w-full object-cover"
                                />
                            ) : (
                                <Image
                                  src={URL.createObjectURL(field.value)}
                                  alt="Preview"
                                  fill
                                  className="h-full w-full object-cover"
                                />
                            )}
                          </div>
                        )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                disabled={isLoading}
                type="button"
                variant="outline"
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button disabled={isLoading} type="submit">
                {initialData ? "Save changes" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
