
import { siteConfig } from "@/config/siteConfig";
import { Material } from "@/types/product";

export const getMaterials = async (): Promise<Material[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/materials/`);
  if (!response.ok) {
    throw new Error("Failed to fetch materials");
  }
  return response.json();
};
