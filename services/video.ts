import { siteConfig } from "@/config/siteConfig";
import { Video, PaginatedVideoResponse, CreateVideo } from "@/types/video";

const API_BASE_URL = siteConfig.backendUrl;

class VideoApi {
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

  async getVideos(page: number = 1): Promise<PaginatedVideoResponse> {
    const response = await fetch(`${API_BASE_URL}/api/videos/?page=${page}`);
    if (!response.ok) {
      throw new Error("Failed to fetch videos");
    }
    return response.json();
  }

  async getVideoById(id: number): Promise<Video> {
    const response = await fetch(`${API_BASE_URL}/api/videos/${id}/`);
    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }
    return response.json();
  }

  async create(videoData: CreateVideo): Promise<Video> {
    const response = await fetch(`${API_BASE_URL}/api/videos/`, {
      method: "POST",
      headers: {
        ...this.getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to create video");
    }
    return response.json();
  }

  async update(id: number, videoData: Partial<CreateVideo>): Promise<Video> {
    const response = await fetch(`${API_BASE_URL}/api/videos/${id}/`, {
      method: "PATCH",
      headers: {
        ...this.getAuthHeaders(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videoData),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || "Failed to update video");
    }
    return response.json();
  }

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/api/videos/${id}/`, {
      method: "DELETE",
      headers: this.getAuthHeaders(),
    });

    if (!response.ok && response.status !== 204) {
      throw new Error("Failed to delete video");
    }
  }
}

export const videoApi = new VideoApi();
