
import { siteConfig } from "@/config/siteConfig";
import { PileHeight } from "@/types/product";

export const getPileHeights = async (): Promise<PileHeight[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/pile-heights/`);
  if (!response.ok) {
    throw new Error("Failed to fetch pile heights");
  }
  return response.json();
};
