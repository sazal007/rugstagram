import { siteConfig } from "@/config/siteConfig";
import { Address} from "@/types/partnership";

export const postPartnership = async (data: Partial<Address>): Promise<Address> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/partnership/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to post partnership");
  }

  return response.json();
};
