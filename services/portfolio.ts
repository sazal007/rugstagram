import { siteConfig } from "@/config/siteConfig";
import { Portfolio, PortfolioListResponse, PortfolioFormData } from "@/types/portfolio";

const API_BASE_URL = siteConfig.backendUrl;

export async function getPortfolios(params?: Record<string, string>): Promise<PortfolioListResponse> {
  const queryParams = params ? "?" + new URLSearchParams(params).toString() : "";
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${queryParams}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch portfolios");
  }
  return response.json();
}

export async function getPortfolio(slug: string): Promise<Portfolio> {
  const response = await fetch(`${API_BASE_URL}/api/portfolio/${slug}/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch portfolio");
  }
  return response.json();
}

export async function createPortfolio(data: PortfolioFormData, accessToken?: string): Promise<Portfolio> {
  const formData = new FormData();
  
  // Append basic fields
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('thumbnail_alt_description', data.thumbnail_alt_description);
  
  // Append thumbnail if it's a file
  if (data.thumbnail instanceof File) {
    formData.append('thumbnail', data.thumbnail);
  } else if (typeof data.thumbnail === 'string') {
    // If it's already a URL (e.g. during update), we might not want to append it as a file
    // But this depends on backend logic
  }

  // Append gallery images
  if (data.gallery && Array.isArray(data.gallery)) {
    data.gallery.forEach((item, index: number) => {
      if (item.file instanceof File) {
        formData.append(`images[${index}]image`, item.file);
        formData.append(`images[${index}]alt_description`, item.altText || '');
      } else if (item.id) {
        // For existing images during update
        formData.append(`images[${index}]id`, item.id.toString());
        formData.append(`images[${index}]alt_description`, item.altText || '');
      }
    });
  }

  const headers: HeadersInit = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/portfolio/`, {
    method: "POST",
    headers,
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to create portfolio");
  }
  return response.json();
}

export async function updatePortfolio(id: number, data: PortfolioFormData, accessToken?: string): Promise<Portfolio> {
  const formData = new FormData();
  
  if (data.title) formData.append('title', data.title);
  if (data.description) formData.append('description', data.description);
  if (data.thumbnail_alt_description) formData.append('thumbnail_alt_description', data.thumbnail_alt_description);
  
  if (data.thumbnail instanceof File) {
    formData.append('thumbnail', data.thumbnail);
  }

  if (data.gallery && Array.isArray(data.gallery)) {
    data.gallery.forEach((item, index: number) => {
      if (item.file instanceof File) {
        formData.append(`images[${index}]image`, item.file);
        formData.append(`images[${index}]alt_description`, item.altText || '');
      } else if (item.id) {
        formData.append(`images[${index}]id`, item.id.toString());
        formData.append(`images[${index}]alt_description`, item.altText || '');
      }
    });
  }

  const headers: HeadersInit = {};
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}/`, {
    method: "PATCH",
    headers,
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.detail || "Failed to update portfolio");
  }
  return response.json();
}

export async function deletePortfolio(id: number, accessToken?: string): Promise<void> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/portfolio/${id}/`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to delete portfolio");
  }
}
