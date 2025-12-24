import { z } from "zod";

export const ProductImageSchema = z.object({
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
  image_alt_description: z.string().optional().nullable(),
  color_id: z.string().optional().nullable(),
  stock: z.string().optional().nullable(),
  size_ids: z.array(z.string()).optional(),
});

export type ProductImageType = z.infer<typeof ProductImageSchema>;

export const productFormSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  slug: z.string().optional(),
  designer: z.string().optional().nullable(),
  brand_name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  highlight_description: z.string().optional().nullable(),
  extra_description: z.string().optional().nullable(),
  about_this_design_description: z.string().optional().nullable(),
  specifications: z.string().optional().nullable(),
  market_price: z.string().min(1, "Market price is required"),
  price: z.string().min(1, "Price is required"),
  stock: z.string().min(1, "Stock is required"),
  discount: z.string().optional().nullable(),
  thumbnail_image: z.any().nullable(),
  thumbnail_image_alt_description: z.string().optional().nullable(),
  hover_thumbnail_image: z.any().nullable(),
  hover_thumbnail_image_alt_description: z.string().optional().nullable(),
  is_popular: z.boolean(),
  is_featured: z.boolean(),
  is_clearance: z.boolean(),
  is_active: z.boolean(),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  size_ids: z.array(z.string()).optional(),
  color_ids: z.array(z.string()).optional(),
  texture_ids: z.array(z.string()).optional(),
  style_ids: z.array(z.string()).optional(),
  collaboration_ids: z.array(z.string()).optional(),
  room_type: z.string().optional().nullable(),
  images: z.array(ProductImageSchema).optional(),
});

export const productApiSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters long"),
  slug: z.string().optional(),
  designer: z.string().optional().nullable(),
  brand_name: z.string().optional().nullable(),
  description: z.string().optional().nullable(),
  highlight_description: z.string().optional().nullable(),
  extra_description: z.string().optional().nullable(),
  about_this_design_description: z.string().optional().nullable(),
  specifications: z.string().optional().nullable(),
  market_price: z.number(),
  price: z.number(),
  stock: z.number(),
  discount: z.number().optional().nullable(),
  thumbnail_image: z.any().nullable(),
  thumbnail_image_alt_description: z.string().optional().nullable(),
  hover_thumbnail_image: z.any().nullable(),
  hover_thumbnail_image_alt_description: z.string().optional().nullable(),
  is_popular: z.boolean().default(false),
  is_featured: z.boolean().default(false),
  is_clearance: z.boolean().default(false),
  is_active: z.boolean().default(true),
  meta_title: z.string().optional().nullable(),
  meta_description: z.string().optional().nullable(),
  size_ids: z.array(z.number()).optional(),
  color_ids: z.array(z.number()).optional(),
  texture_ids: z.array(z.number()).optional(),
  style_ids: z.array(z.number()).optional(),
  collaboration_ids: z.array(z.number()).optional(),
  room_type: z.string().optional().nullable(),
  images: z
    .array(
      z.object({
        id: z.number().optional(),
        image: z.any(),
        image_alt_description: z.string().optional().nullable(),
        color_id: z.number().optional().nullable(),
        stock: z.number().optional().nullable(),
        size_ids: z.array(z.number()).optional(),
      })
    )
    .optional(),
});

export type ProductFormValues = z.infer<typeof productFormSchema>;
export type ProductApiValues = z.infer<typeof productApiSchema>;

export const transformFormToApi = (
  formData: ProductFormValues
): ProductApiValues => {
  return {
    ...formData,
    market_price: parseFloat(formData.market_price),
    price: parseFloat(formData.price),
    stock: parseInt(formData.stock, 10),
    discount: formData.discount ? parseFloat(formData.discount) : null,
    size_ids: formData.size_ids?.map((id) => parseInt(id, 10)) || [],
    color_ids: formData.color_ids?.map((id) => parseInt(id, 10)) || [],
    texture_ids: formData.texture_ids?.map((id) => parseInt(id, 10)) || [],
    style_ids: formData.style_ids?.map((id) => parseInt(id, 10)) || [],
    collaboration_ids:
      formData.collaboration_ids?.map((id) => parseInt(id, 10)) || [],
    images:
      formData.images?.map((img) => ({
        ...img,
        color_id: img.color_id ? parseInt(img.color_id, 10) : null,
        stock: img.stock ? parseInt(img.stock, 10) : null,
        size_ids: img.size_ids?.map((id) => parseInt(id, 10)) || [],
      })) || [],
  };
};
