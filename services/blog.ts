import { siteConfig } from "@/config/siteConfig";
import {
  BlogPost,
  PaginatedBlogResponse,
  BlogCategory,
  CreateBlogPost,
  UpdateBlogPost,
  BlogTag,
  BlogFilters
} from "@/types/blog";

const API_BASE_URL = siteConfig.backendUrl;

class BlogApi {
  private getAuthToken(): string {
    return (
      localStorage.getItem("authToken") ||
      localStorage.getItem("access_token") ||
      ""
    );
  }

  private getAuthHeaders(): HeadersInit {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

 async getBlogs(filters?: BlogFilters): Promise<PaginatedBlogResponse> {
  const queryParams = new URLSearchParams();
  
  if (filters) {
    if (filters.page) queryParams.append('page', filters.page.toString());
    if (filters.page_size) queryParams.append('page_size', filters.page_size.toString());
    if (filters.search) queryParams.append('search', filters.search);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.is_published !== undefined) queryParams.append('is_published', filters.is_published.toString());
    if (filters.ordering) queryParams.append('ordering', filters.ordering);
    if (filters.author) queryParams.append('author', filters.author);
    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach(tag => queryParams.append('tags', tag));
    }
  }

  const url = `${API_BASE_URL}/api/blogs/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error("Failed to fetch blogs");
  }
  return response.json();
}
  async getBlogBySlug(slug: string): Promise<BlogPost> {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}/`);
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Blog post with slug "${slug}" not found.`);
      }
      throw new Error(`Failed to fetch blog post: ${response.statusText}`);
    }
    return response.json();
  }

  async getCategoryBySlug(slug: string): Promise<BlogCategory> {
    const response = await fetch(
      `${API_BASE_URL}/api/blog/categories/${slug}/`
    );
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Category with slug "${slug}" not found.`);
      }
      throw new Error(`Failed to fetch category: ${response.statusText}`);
    }
    return response.json();
  }

  async getBlogsByCategory(
    categorySlug: string
  ): Promise<PaginatedBlogResponse> {
    const response = await fetch(
      `${API_BASE_URL}/api/blogs/?category=${categorySlug}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch blogs for category: ${categorySlug}`);
    }
    return response.json();
  }

  async getCategories(): Promise<BlogCategory[]> {
    const response = await fetch(`${API_BASE_URL}/api/blog/categories/`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    return response.json();
  }


async getTags(): Promise<BlogTag[]> { 
  const response = await fetch(`${API_BASE_URL}/api/blog/tags/`);
  if (!response.ok) {
    throw new Error("Failed to fetch tags");
  }
  return response.json();
}

  async create(blogData: CreateBlogPost): Promise<BlogPost> {
    const formData = new FormData();
    Object.entries(blogData).forEach(([key, value]) => {
      if (key === "tags_id" && Array.isArray(value)) {
        value.forEach((id: number) =>
          formData.append("tags_id", id.toString())
        );
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/blogs/`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `Failed to create blog: ${response.statusText}`
      );
    }
    return response.json();
  }

  async update(
    slug: string,
    blogData: Omit<UpdateBlogPost, "id">
  ): Promise<BlogPost> {
    const formData = new FormData();

    Object.entries(blogData).forEach(([key, value]) => {
      if (key === "tags_id" && Array.isArray(value)) {
        value.forEach((id: number) =>
          formData.append("tags_id", id.toString())
        );
      } else if (value !== null && value !== undefined) {
        formData.append(key, value as string | Blob);
      }
    });

    const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}/`, {
      method: "PATCH",
      headers: this.getAuthHeaders(),
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.detail || `Failed to update blog: ${response.statusText}`
      );
    }
    return response.json();
  }

  async delete(slug: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/blogs/${slug}/`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok && response.status !== 204) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.detail || `Failed to delete blog: ${response.statusText}`
      );
    }
  }
}

export const blogApi = new BlogApi();
