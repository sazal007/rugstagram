"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productFormSchema, ProductFormValues } from "@/schemas/product-form";
import { Button } from "@/components/ui/button";
import { ProductVariantManager } from "./product-variant-manager";
import { ProductBasicInfo } from "./product-basic-info";
import { Product } from "@/types/product";
import { useColors } from "@/hooks/use-colors";
import { useCollections } from "@/hooks/use-collections";
import { useQualities } from "@/hooks/use-qualities";
import { usePileHeights } from "@/hooks/use-pile-heights";
import { useSizes } from "@/hooks/use-sizes";
import { useLuxuryEditions } from "@/hooks/use-luxury-editions";
import { useAffordableEditions } from "@/hooks/use-affordable-editions";
import { useMaterials } from "@/hooks/use-materials";
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-product-admin";
import { Form } from "@/components/ui/form";
import Link from "next/link";

interface ProductFormProps {
  initialData?: Product;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  // const router = useRouter(); // Unused

  const getDefaultValues = (): ProductFormValues => {
    if (initialData) {
      return {
        name: initialData.name,
        code: initialData.code || "",
        description: initialData.description || "",
        collection_id: initialData.collection ? String(initialData.collection.id) : null,
        quality_id: initialData.quality ? String(initialData.quality.id) : null,
        pile_height_id: initialData.pile_height ? String(initialData.pile_height.id) : null,
        size_id: initialData.size ? String(initialData.size.id) : null,
        luxury_edition_id: initialData.luxury_edition ? String(initialData.luxury_edition.id) : null,
        affordable_edition_id: initialData.affordable_edition ? String(initialData.affordable_edition.id) : null,
        material_id: initialData.material ? String(initialData.material.id) : null,
        sale_price: initialData.sale_price ? String(initialData.sale_price) : null,
        price: initialData.price ? String(initialData.price) : null,
        thumbnail_image: null,
        thumbnail_image_alt_description: initialData.thumbnail_image_alt_description,
        is_active: initialData.is_active ?? true,
        is_featured: initialData.is_featured ?? false,
        is_new: initialData.is_new ?? false,
        is_best_seller: initialData.is_best_seller ?? false,
        meta_title: initialData.meta_title,
        meta_description: initialData.meta_description,
        variants: initialData.variants?.map((v) => ({
          id: v.id,
          color_id: v.color_id ? String(v.color_id) : null,
          stock: v.stock ? String(v.stock) : "0",
          images: v.product_images?.map((img) => ({
             image: img.image,
             id: img.id,
             // eslint-disable-next-line @typescript-eslint/no-unused-vars
             created_at: img.created_at,
             // eslint-disable-next-line @typescript-eslint/no-unused-vars
             updated_at: img.updated_at
          })) || []
        })) || [],
      };
    } else {
      return {
        name: "",
        code: "",
        description: "",
        collection_id: null,
        quality_id: null,
        pile_height_id: null,
        size_id: null,
        luxury_edition_id: null,
        affordable_edition_id: null,
        material_id: null,
        sale_price: "",
        price: "",
        thumbnail_image: null,
        thumbnail_image_alt_description: "",
        is_active: true,
        is_featured: false,
        is_new: false,
        is_best_seller: false,
        meta_title: "",
        meta_description: "",
        variants: [],
      };
    }
  };

  const form = useForm<ProductFormValues>({
    // @ts-expect-error - Zod inference depth issue with recursive/nested types causes Resolver mismatch
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(),
  });

  const { data: colors } = useColors();
  const { data: collections, isLoading: isLoadingCollections } = useCollections();
  const { data: qualities, isLoading: isLoadingQualities } = useQualities();
  const { data: pileHeights, isLoading: isLoadingPileHeights } = usePileHeights();
  const { data: sizes, isLoading: isLoadingSizes } = useSizes();
  const { data: luxuryEditions, isLoading: isLoadingLuxuryEditions } = useLuxuryEditions();
  const { data: affordableEditions, isLoading: isLoadingAffordableEditions } = useAffordableEditions();
  const { data: materials, isLoading: isLoadingMaterials } = useMaterials();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct(initialData?.slug || "");

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      if (initialData) {
        await updateProductMutation.mutateAsync(data);
      } else {
        await createProductMutation.mutateAsync(data);
      }
      
      // router.push() is handled in the hooks now
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isLoading =
    createProductMutation.isPending || updateProductMutation.isPending;

  return (
    <Form {...form}>
      {/* @ts-expect-error - SubmitHandler type mismatch with FieldValues constraint */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ProductBasicInfo
          // @ts-expect-error - Control type mismatch due to strict typing of nested fields
          control={form.control}
          collections={collections}
          isLoadingCollections={isLoadingCollections}
          qualities={qualities}
          isLoadingQualities={isLoadingQualities}
          pileHeights={pileHeights}
          isLoadingPileHeights={isLoadingPileHeights}
          sizes={sizes}
          isLoadingSizes={isLoadingSizes}
          luxuryEditions={luxuryEditions}
          isLoadingLuxuryEditions={isLoadingLuxuryEditions}
          affordableEditions={affordableEditions}
          isLoadingAffordableEditions={isLoadingAffordableEditions}
          materials={materials}
          isLoadingMaterials={isLoadingMaterials}
          initialData={initialData}
        />

        <ProductVariantManager
           // @ts-expect-error - Control type mismatch due to strict typing of nested fields
           control={form.control}
           register={form.register}
           setValue={form.setValue}
           watch={form.watch}
           colors={colors}
        />

        <div className="flex justify-end gap-4">
          <Link href="/admin/products">
            <Button type="button" variant="outline" className="cursor-pointer">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="text-white cursor-pointer bg-gray-500 hover:bg-gray-600"
          >
            {isLoading
              ? "Saving..."
              : initialData
              ? "Save Changes"
              : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
