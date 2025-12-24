import { siteConfig } from "@/config/siteConfig";
import { Texture } from "@/types/texture";

const API_BASE_URL = siteConfig.backendUrl;

export async function getTextures(): Promise<Texture[]> {
  const response = await fetch(`${API_BASE_URL}/api/textures/`);
  if (!response.ok) {
    throw new Error("Failed to fetch textures");
  }
  return response.json();
}
