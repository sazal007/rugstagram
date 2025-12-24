import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { ProductFormValues } from "@/schemas/product-form";
import { productAdminApi } from "@/services/product-admin";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ProductFormValues) => {
      return productAdminApi.createProduct(data);
    },
    onSuccess: (data) => {
      toast({
        title: "Success!",
        description: "Product created successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push(`/admin/products/edit/${data.slug}`);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to create product: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useUpdateProduct(slug: string) {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ProductFormValues) => {
      return productAdminApi.updateProduct(slug, data);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Product updated successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", slug] });
      router.refresh();
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to update product: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteProductImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (imageId: number) => {
      return productAdminApi.deleteProductImage(imageId);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Image deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to delete image: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (slug: string) => {
      return productAdminApi.deleteProduct(slug);
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "Product deleted successfully!",
        variant: "default",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast({
        title: "Error",
        description: `Failed to delete product: ${error.message}`,
        variant: "destructive",
      });
    },
  });
}