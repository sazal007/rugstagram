import { siteConfig } from "@/config/siteConfig";
import { Style } from "@/types/style";

const API_BASE_URL = siteConfig.backendUrl;

export async function getStyles(): Promise<Style[]> {
  const response = await fetch(`${API_BASE_URL}/api/styles/`);
  if (!response.ok) {
    throw new Error("Failed to fetch styles");
  }
  return response.json();
}
