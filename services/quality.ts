
import { siteConfig } from "@/config/siteConfig";
import { Quality } from "@/types/product";

export const getQualities = async (): Promise<Quality[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/qualities/`);
  if (!response.ok) {
    throw new Error("Failed to fetch qualities");
  }
  return response.json();
};
