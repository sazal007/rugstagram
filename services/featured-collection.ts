import { siteConfig } from "@/config/siteConfig";
import { FeaturedCollection } from "@/types/featured-collection";

export const getFeaturedCollections = async (): Promise<FeaturedCollection[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/featured-collections/`, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch featured collections");
  }

  return response.json();
};
