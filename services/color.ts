import { siteConfig } from "@/config/siteConfig";
import { Color } from "@/types/colors";

const API_BASE_URL = siteConfig.backendUrl;

export async function getColors(): Promise<Color[]> {
  const response = await fetch(`${API_BASE_URL}/api/colors/`);

  if (!response.ok) {
    throw new Error("Failed to fetch colors");
  }

  const data: Color[] = await response.json();
  return data;
}