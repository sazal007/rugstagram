import { ProductFormValues } from "@/schemas/product-form";
import { siteConfig } from "@/config/siteConfig";
import { Product } from "@/types/product";

const API_BASE_URL = siteConfig.backendUrl;

function appendField(
  formData: FormData,
  key: string,
  value: string | number | boolean | File | null | undefined
) {
  if (value !== null && value !== undefined) {
    formData.append(key, String(value));
  }
}

function buildProductFormData(data: ProductFormValues): FormData {
  const formData = new FormData();

  // Basic product fields
  appendField(formData, "name", data.name);
  appendField(formData, "designer", data.designer);
  appendField(formData, "brand_name", data.brand_name);
  appendField(formData, "description", data.description);
  appendField(formData, "highlight_description", data.highlight_description);
  appendField(formData, "extra_description", data.extra_description);
  appendField(
    formData,
    "about_this_design_description",
    data.about_this_design_description
  );
  appendField(formData, "specifications", data.specifications);
  appendField(formData, "market_price", data.market_price);
  appendField(formData, "price", data.price);
  appendField(formData, "stock", data.stock);
  appendField(formData, "discount", data.discount);
  appendField(formData, "is_popular", data.is_popular);
  appendField(formData, "is_featured", data.is_featured);
  appendField(formData, "is_clearance", data.is_clearance);
  appendField(formData, "is_active", data.is_active);
  appendField(formData, "meta_title", data.meta_title);
  appendField(formData, "meta_description", data.meta_description);
  appendField(formData, "room_type", data.room_type);
  appendField(
    formData,
    "thumbnail_image_alt_description",
    data.thumbnail_image_alt_description
  );
  appendField(
    formData,
    "hover_thumbnail_image_alt_description",
    data.hover_thumbnail_image_alt_description
  );

  // Handle thumbnail images
  if (data.thumbnail_image instanceof File) {
    formData.append("thumbnail_image", data.thumbnail_image);
  }
  if (data.hover_thumbnail_image instanceof File) {
    formData.append("hover_thumbnail_image", data.hover_thumbnail_image);
  }

  // Handle array fields - Convert string IDs to integers
  data.size_ids?.forEach((id) => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      formData.append("size_ids", String(numericId));
    }
  });

  data.style_ids?.forEach((id) => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      formData.append("style_ids", String(numericId));
    }
  });

  data.texture_ids?.forEach((id) => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      formData.append("texture_ids", String(numericId));
    }
  });

  data.collaboration_ids?.forEach((id) => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      formData.append("collaboration_ids", String(numericId));
    }
  });

  data.color_ids?.forEach((id) => {
    const numericId = parseInt(id, 10);
    if (!isNaN(numericId)) {
      formData.append("color_ids", String(numericId));
    }
  });

  // Handle image data
  data.images?.forEach((img, index) => {
    // Add image ID if it exists (for updates)
    if (img.id) {
      formData.append(`image_data[${index}][id]`, String(img.id));
    }

    // Add image file - Only add File objects
    if (img.image instanceof File) {
      formData.append(`image_data[${index}][image]`, img.image);
    }

    // Add color ID
    if (img.color_id) {
      const numericColorId = parseInt(img.color_id, 10);
      if (!isNaN(numericColorId)) {
        formData.append(`image_data[${index}][color]`, String(numericColorId));
      }
    }

    // Add stock
    if (img.stock) {
      formData.append(`image_data[${index}][image_stock]`, String(img.stock));
    }

    // Add alt description
    if (img.image_alt_description) {
      formData.append(
        `image_data[${index}][image_alt_description]`,
        img.image_alt_description
      );
    }

    // Handle size_ids for images
    img.size_ids?.forEach((sizeId) => {
      const numericSizeId = parseInt(sizeId, 10);
      if (!isNaN(numericSizeId)) {
        formData.append(
          `image_data[${index}][size_ids]`,
          String(numericSizeId)
        );
      }
    });
  });

  return formData;
}

export const productAdminApi = {
  createProduct: async (data: ProductFormValues): Promise<Product> => {
    const formData = buildProductFormData(data);

    const response = await fetch(`${API_BASE_URL}/api/products/`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const result = await response.json();
    return result;
  },

  updateProduct: async (
    slug: string,
    data: ProductFormValues
  ): Promise<Product> => {
    const formData = buildProductFormData(data);

    const response = await fetch(`${API_BASE_URL}/api/products/${slug}/`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    const result = await response.json();
    return result;
  },

  deleteProductImage: async (imageId: number): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/images/${imageId}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete product image");
    }
  },

  deleteProduct: async (slug: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}/`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete the product.");
    }
  },
};