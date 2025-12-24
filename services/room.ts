import { siteConfig } from "@/config/siteConfig";
import { Room } from "@/types/room";

const API_BASE_URL = siteConfig.backendUrl;

export async function getRooms(): Promise<Room[]> {
  const response = await fetch(`${API_BASE_URL}/api/rooms/`);
  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }
  const data: Room[] = await response.json();
  return data;
}