import { z } from "zod";

// Schema for individual images within a variant
export const VariantImageSchema = z.object({
  id: z.number().optional(),
  image: z
    .any()
    .refine(
      (val) =>
        (typeof val === "string" && val.length > 0) || val instanceof File,
      {
        message: "Image is required",
      }
    ),
  created_at: z.string().optional(),
  updated_at: z.string().optional(),
});

export type VariantImageType = z.infer<typeof VariantImageSchema>;

// Schema for a Product Variant
export const ProductVariantSchema = z.object({
  id: z.number().optional(),
  color_id: z.string().optional().nullable(),
  stock: z.string().optional().nullable(), // Form input is usually string
  images: z.array(VariantImageSchema).optional().default([]),
});

export type ProductVariantType = z.infer<typeof ProductVariantSchema>;

// Main Product Form Schema
export const productFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  collection_id: z.string().optional().nullable(),
  quality_id: z.string().optional().nullable(),
  pile_height_id: z.string().optional().nullable(),
  size_id: z.string().optional().nullable(),
  luxury_edition_id: z.string().optional().nullable(),
  affordable_edition_id: z.string().optional().nullable(),
  material_id: z.string().optional().nullable(),
  sale_price: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  thumbnail_image: z.any().nullable(),
  thumbnail_image_alt_description: z.string().optional().nullable(),
  is_new: z.boolean().default(false),
  is_best_seller: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  is_active: z.boolean().default(true),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  variants: z.array(ProductVariantSchema).optional().default([]),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;

export const productApiSchema = z.object({
  name: z.string(),
  code: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  collection_id: z.number().optional().nullable(),
  quality_id: z.number().optional().nullable(),
  pile_height_id: z.number().optional().nullable(),
  size_id: z.number().optional().nullable(),
  luxury_edition_id: z.number().optional().nullable(),
  affordable_edition_id: z.number().optional().nullable(),
  material_id: z.number().optional().nullable(),
  sale_price: z.number().optional().nullable(),
  price: z.number().optional().nullable(),
  thumbnail_image: z.any().nullable(),
  thumbnail_image_alt_description: z.string().optional().nullable(),
  is_new: z.boolean(),
  is_best_seller: z.boolean(),
  is_featured: z.boolean(),
  is_active: z.boolean(),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  variants: z.array(
    z.object({
      id: z.number().optional(),
      color_id: z.number().optional().nullable(),
      stock: z.number().optional().nullable(),
      images: z.array(z.any()).optional(),
    })
  ),
});

export type ProductApiValues = z.infer<typeof productApiSchema>;

export const transformFormToApi = (
  formData: ProductFormValues
): ProductApiValues => {
  return {
    ...formData,
    // Add default values for new fields if they are somehow missing at runtime, though Zod ensures logic
    collection_id: formData.collection_id
      ? parseInt(formData.collection_id, 10)
      : null,
    quality_id: formData.quality_id
      ? parseInt(formData.quality_id, 10)
      : null,
    pile_height_id: formData.pile_height_id
      ? parseInt(formData.pile_height_id, 10)
      : null,
    size_id: formData.size_id ? parseInt(formData.size_id, 10) : null,
    luxury_edition_id: formData.luxury_edition_id
      ? parseInt(formData.luxury_edition_id, 10)
      : null,
    affordable_edition_id: formData.affordable_edition_id
      ? parseInt(formData.affordable_edition_id, 10)
      : null,
    material_id: formData.material_id
      ? parseInt(formData.material_id, 10)
      : null,
    sale_price: formData.sale_price ? parseFloat(formData.sale_price) : null,
    price: formData.price ? parseFloat(formData.price) : null,
    variants:
      formData.variants?.map((v) => ({
        id: v.id,
        color_id: v.color_id ? parseInt(v.color_id, 10) : null,
        stock: v.stock ? parseInt(v.stock, 10) : null,
        images: v.images?.map((img) => img.image) || [],
      })) || [],
  };
};
