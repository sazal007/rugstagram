"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { productFormSchema, ProductFormValues } from "@/schemas/product-form";
import { Button } from "@/components/ui/button";
import { ProductImageManager } from "./product-image-manager";
import { ProductDescriptionFields } from "./product-descrption-field";
import { ProductBasicInfo } from "./product-basic-info";
import { ProductAttributes } from "./product-attributes";
import { Product } from "@/types/product";
import { useColors } from "@/hooks/use-colors";
import { useSizes } from "@/hooks/use-sizes";
import { useTextures } from "@/hooks/use-textures";
import { useStyles } from "@/hooks/use-styles";
import { useCollaborations } from "@/hooks/use-collaborations";
import { useRooms } from "@/hooks/use-rooms";
import { useCreateProduct, useUpdateProduct } from "@/hooks/use-product-admin";
import { Form } from "@/components/ui/form";
import { ProductColor } from "@/types/product";
import Link from "next/link";

interface ProductFormProps {
  initialData?: Product;
}

export const ProductForm: React.FC<ProductFormProps> = ({ initialData }) => {
  const router = useRouter();

  const getDefaultValues = (): ProductFormValues => {
    if (initialData) {
      return {
        name: initialData.name,
        slug: initialData.slug,
        designer: initialData.designer,
        brand_name: initialData.brand_name,
        description: initialData.description,
        highlight_description: initialData.highlight_description,
        extra_description: initialData.extra_description,
        about_this_design_description:
          initialData.about_this_design_description,
        specifications: initialData.specifications,
        market_price: String(initialData.market_price),
        price: String(initialData.price),
        stock: String(initialData.stock),
        discount: initialData.discount
          ? String(initialData.discount)
          : undefined,
        thumbnail_image: null,
        thumbnail_image_alt_description:
          initialData.thumbnail_image_alt_description,
        hover_thumbnail_image: null,
        hover_thumbnail_image_alt_description:
          initialData.hover_thumbnail_image_alt_description,

        is_active: initialData.is_active ?? true,
        is_featured: initialData.is_featured ?? false,
        is_clearance: initialData.is_clearance ?? false,
        is_popular: initialData.is_popular ?? false,
        meta_title: initialData.meta_title,
        meta_description: initialData.meta_description,
        size_ids: initialData.size?.map((s) => String(s.id)) || [],
        color_ids: initialData.color?.map((c) => String(c.id)) || [],
        texture_ids: initialData.texture?.map((t) => String(t.id)) || [],
        style_ids: initialData.style?.map((s) => String(s.id)) || [],
        collaboration_ids:
          initialData.collaboration?.map((c) => String(c.id)) || [],
        room_type: initialData.room_type,
        images:
          initialData.images?.map((img) => ({
            id: img.id,
            image: img.image,
            image_alt_description: img.image_alt_description,
            color_id: img.color ? String(img.color.id) : null,
            stock: img.stock ? String(img.stock) : null,
            size_ids: img.size?.map((s) => String(s.id)) || [],
          })) || [],
      };
    } else {
      return {
        name: "",
        market_price: "",
        price: "",
        stock: "",
        is_active: true,
        is_featured: false,
        is_clearance: false,
        is_popular: false,
        images: [],
        size_ids: [],
        color_ids: [],
        texture_ids: [],
        style_ids: [],
        collaboration_ids: [],
        thumbnail_image: null,
        hover_thumbnail_image: null,
      };
    }
  };

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productFormSchema),
    defaultValues: getDefaultValues(),
  });

  const { data: colors, isLoading: isLoadingColors } = useColors();
  const { data: sizes, isLoading: isLoadingSizes } = useSizes();
  const { data: textures, isLoading: isLoadingTextures } = useTextures();
  const { data: styles, isLoading: isLoadingStyles } = useStyles();
  const { data: collaborations, isLoading: isLoadingCollaborations } =
    useCollaborations();
  const { data: rooms, isLoading: isLoadingRooms } = useRooms();

  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct(initialData?.slug || "");

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    try {
      const formData: ProductFormValues = {
        ...data,
        thumbnail_image:
          data.thumbnail_image instanceof FileList
            ? data.thumbnail_image[0]
            : data.thumbnail_image,
        hover_thumbnail_image:
          data.hover_thumbnail_image instanceof FileList
            ? data.hover_thumbnail_image[0]
            : data.hover_thumbnail_image,
      };

      if (initialData) {
        await updateProductMutation.mutateAsync(formData);
      } else {
        await createProductMutation.mutateAsync(formData);
      }

      router.push("/admin/products");
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  const isLoading =
    createProductMutation.isPending || updateProductMutation.isPending;
  const transformedColors: ProductColor[] = (colors || []).map((color) => ({
    id: color.id,
    name: color.name,
    slug: color.slug,
    description: color.description || undefined,
    image: color.image,
  }));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <ProductBasicInfo
          control={form.control}
          rooms={rooms}
          isLoadingRooms={isLoadingRooms}
          initialData={initialData}
        />

        <ProductAttributes
          control={form.control}
          sizes={sizes}
          colors={colors}
          textures={textures}
          styles={styles}
          collaborations={collaborations}
          isLoadingSizes={isLoadingSizes}
          isLoadingColors={isLoadingColors}
          isLoadingTextures={isLoadingTextures}
          isLoadingStyles={isLoadingStyles}
          isLoadingCollaborations={isLoadingCollaborations}
        />

        <ProductDescriptionFields control={form.control} />

        {colors && sizes && (
          <ProductImageManager
            control={form.control}
            register={form.register}
            colors={transformedColors}
            sizes={sizes}
            setValue={form.setValue}
            watch={form.watch}
          />
        )}

        <div className="flex justify-end gap-4">
          <Link href="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isLoading}
            className="text-white bg-gray-500 hover:bg-gray-600"
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
