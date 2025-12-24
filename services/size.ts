import { siteConfig } from "@/config/siteConfig";
import { Size } from "@/types/size";

const API_BASE_URL = siteConfig.backendUrl;

export async function getSizes(): Promise<Size[]> {
  const response = await fetch(`${API_BASE_URL}/api/sizes/`);

  if (!response.ok) {
    throw new Error("Failed to fetch sizes");
  }

  const data: Size[] = await response.json();
  return data;
}
