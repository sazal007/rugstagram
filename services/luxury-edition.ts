import { siteConfig } from "@/config/siteConfig";
import { LuxuryEdition } from "@/types/product";

export const getLuxuryEditions = async (): Promise<LuxuryEdition[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/luxury-editions/`);
  if (!response.ok) {
    throw new Error("Failed to fetch luxury editions");
  }
  return response.json();
};
