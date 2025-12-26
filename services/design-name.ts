
import { siteConfig } from "@/config/siteConfig";
import { DesignName } from "@/types/product";

export const getDesignNames = async (): Promise<DesignName[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/designs/`);
  if (!response.ok) {
    throw new Error("Failed to fetch design names");
  }
  return response.json();
};
