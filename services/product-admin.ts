import { ProductFormValues } from "@/schemas/product-form";
import { siteConfig } from "@/config/siteConfig";
import { Product } from "@/types/product";

const API_BASE_URL = siteConfig.backendUrl;

function appendField(
  formData: FormData,
  key: string,
  value: string | number | boolean | File | FileList | null | undefined
) {
  if (value !== null && value !== undefined) {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof FileList && value.length > 0) {
      formData.append(key, value[0]);
    } else if (!(value instanceof FileList)) {
      formData.append(key, String(value));
    }
  }
}

function buildProductFormData(data: ProductFormValues): FormData {
  const formData = new FormData();

  // Basic product fields
  appendField(formData, "name", data.name);
  appendField(formData, "code", data.code);
  appendField(formData, "description", data.description);
  appendField(formData, "collection_id", data.collection_id);
  appendField(formData, "quality_id", data.quality_id);
  appendField(formData, "pile_height_id", data.pile_height_id);
  appendField(formData, "size_id", data.size_id);
  appendField(formData, "luxury_edition_id", data.luxury_edition_id);
  appendField(formData, "affordable_edition_id", data.affordable_edition_id);
  appendField(formData, "material_id", data.material_id);
  appendField(formData, "sale_price", data.sale_price);
  appendField(formData, "price", data.price);
  appendField(formData, "thumbnail_image", data.thumbnail_image);
  appendField(formData, "thumbnail_image_alt_description", data.thumbnail_image_alt_description);
  appendField(formData, "is_new", data.is_new);
  appendField(formData, "is_best_seller", data.is_best_seller);
  appendField(formData, "is_featured", data.is_featured);
  appendField(formData, "is_active", data.is_active);
  appendField(formData, "meta_title", data.meta_title);
  appendField(formData, "meta_description", data.meta_description);
  appendField(formData, "weaving", data.weaving);

  // Variant handling
  if (data.variants && data.variants.length > 0) {
    data.variants.forEach((variant, index) => {
      // Append simple variant fields
      if (variant.id) {
        appendField(formData, `variants[${index}]id`, variant.id);
      }
      appendField(formData, `variants[${index}]color_id`, variant.color_id);
      appendField(formData, `variants[${index}]stock`, variant.stock);

      // Handle variant images
      if (variant.images && variant.images.length > 0) {
        variant.images.forEach((imgObj) => {
           if (imgObj.image instanceof File) {
             formData.append(`variants[${index}]images`, imgObj.image);
           }
        });
      }
    });
  }

  return formData;
}

const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  const tokens = localStorage.getItem("authTokens");
  return tokens ? JSON.parse(tokens).access_token : null;
};

export const productAdminApi = {
  createProduct: async (data: ProductFormValues): Promise<Product> => {
    const formData = buildProductFormData(data);
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/products/`, {
      method: "POST",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  },

  updateProduct: async (
    slug: string,
    data: ProductFormValues
  ): Promise<Product> => {
    const formData = buildProductFormData(data);
    const token = getAuthToken();

    const response = await fetch(`${API_BASE_URL}/api/products/${slug}/`, {
      method: "PATCH",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  },

  deleteProductImage: async (imageId: number): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/images/${imageId}/`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete product image");
    }
  },

  deleteProduct: async (slug: string): Promise<void> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}/`, {
      method: "DELETE",
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    if (!response.ok) {
      throw new Error("Failed to delete the product.");
    }
  },

  updateProductStatus: async (
    slug: string,
    data: Partial<{
      is_active: boolean;
      is_new: boolean;
      is_best_seller: boolean;
      is_featured: boolean;
    }>
  ): Promise<Product> => {
    const token = getAuthToken();
    const response = await fetch(`${API_BASE_URL}/api/products/${slug}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    return await response.json();
  },
};