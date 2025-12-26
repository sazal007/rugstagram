import { siteConfig } from "@/config/siteConfig";
import { AffordableEdition } from "@/types/product";

export const getAffordableEditions = async (): Promise<AffordableEdition[]> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/affordable-editions/`);
  if (!response.ok) {
    throw new Error("Failed to fetch affordable editions");
  }
  return response.json();
};
