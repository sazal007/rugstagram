import { siteConfig } from "@/config/siteConfig";
import { Collaboration } from "@/types/collaboration";

const API_BASE_URL = siteConfig.backendUrl;

export async function getCollaborations(): Promise<Collaboration[]> {
  const response = await fetch(`${API_BASE_URL}/api/collaboration/`);
  if (!response.ok) {
    throw new Error("Failed to fetch collaborations");
  }
  const data: Collaboration[] = await response.json();
  return data;
}