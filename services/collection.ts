import { siteConfig } from "@/config/siteConfig";
import { Collection } from "@/types/product";

const getHeaders = (token?: string) => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  } else if (typeof window !== "undefined") {
    const savedToken = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (savedToken) {
      headers["Authorization"] = `Bearer ${savedToken}`;
    }
  }

  return headers;
};

export const getCollections = async (): Promise<Collection[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/collections/`);

  if (!response.ok) {
    throw new Error("Failed to fetch collections");
  }

  return response.json();
};

export const getCollectionBySlug = async (slug: string): Promise<Collection> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/collections/${slug}/`);

  if (!response.ok) {
    throw new Error(`Failed to fetch collection with slug: ${slug}`);
  }

  return response.json();
};

export const createCollection = async (collection: Omit<Collection, "id"> | FormData): Promise<Collection> => {
  const isFormData = collection instanceof FormData;
  const headers = getHeaders();
  
  if (isFormData) {
    // Let browser set Content-Type for FormData
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (headers as any)["Content-Type"];
  }

  const response = await fetch(`${siteConfig.backendUrl}/api/collections/`, {
    method: "POST",
    headers,
    body: isFormData ? collection : JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Failed to create collection");
  }

  return response.json();
};

export const updateCollection = async (id: number, collection: Partial<Collection> | FormData): Promise<Collection> => {
  const isFormData = collection instanceof FormData;
  const headers = getHeaders();
  
  if (isFormData) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    delete (headers as any)["Content-Type"];
  }

  const response = await fetch(`${siteConfig.backendUrl}/api/collections/${id}/`, {
    method: "PATCH",
    headers,
    body: isFormData ? collection : JSON.stringify(collection),
  });

  if (!response.ok) {
    throw new Error("Failed to update collection");
  }

  return response.json();
};

export const deleteCollection = async (id: number): Promise<void> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/collections/${id}/`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || errorData.message || "Failed to delete collection");
  }
};
