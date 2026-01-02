import { siteConfig } from "@/config/siteConfig";
import { Wishlist } from "@/types/wishlist";

const API_BASE_URL = siteConfig.backendUrl;

export async function getWishlist(accessToken?: string): Promise<Wishlist[]> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/wishlists/`, {
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to fetch wishlist");
  }
  return response.json();
}

export async function addToWishlist(productId: number, accessToken?: string): Promise<Wishlist> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/wishlists/`, {
    method: "POST",
    headers,
    body: JSON.stringify({ product: productId }),
  });
  if (!response.ok) {
    throw new Error("Failed to add to wishlist");
  }
  return response.json();
}

export async function removeFromWishlist(wishlistItemId: number, accessToken?: string): Promise<void> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_BASE_URL}/api/wishlists/${wishlistItemId}/`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) {
    throw new Error("Failed to remove from wishlist");
  }
}
