import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/error-utils";
import { ProductFormValues } from "@/schemas/product-form";
import { productAdminApi } from "@/services/product-admin";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: ProductFormValues) => {
      return productAdminApi.createProduct(data);
    },
    onSuccess: () => {
      toast.success("Success!", {
        description: "Product created successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Redirect to list instead of specific edit page since we might not have slug easily or it might be numeric ID now
      router.push("/admin/products");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error("Error", {
        description: `Failed to create product: ${getErrorMessage(error)}`,
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
      toast.success("Success!", {
        description: "Product updated successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
      // Invalidate specific product query by ID if used, or by slug if we can map it
      queryClient.invalidateQueries({ queryKey: ["product", slug] }); 
      router.push("/admin/products");
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error("Error", {
        description: `Failed to update product: ${getErrorMessage(error)}`,
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
      toast.success("Success!", {
        description: "Image deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error("Error", {
        description: `Failed to delete image: ${getErrorMessage(error)}`,
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
      toast.success("Success!", {
        description: "Product deleted successfully!",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error("Error", {
        description: `Failed to delete product: ${getErrorMessage(error)}`,
      });
    },
  });
}

export function useUpdateProductStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      slug,
      data,
    }: {
      slug: string;
      data: Partial<{
        is_active: boolean;
        is_new: boolean;
        is_best_seller: boolean;
        is_featured: boolean;
      }>;
    }) => {
      return productAdminApi.updateProductStatus(slug, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      toast.error("Error", {
        description: `Failed to update: ${getErrorMessage(error)}`,
      });
    },
  });
}