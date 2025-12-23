import { siteConfig } from "@/config/siteConfig";
import { Subscriber, SubscriberResponse } from "@/types/newsletter";

export const postSubscriber = async (email: string): Promise<Subscriber> => {
  // Convert data to URLSearchParams for form-encoded format
  const formData = new URLSearchParams();
  formData.append('email', email);

  const response = await fetch(`${siteConfig.backendUrl}/api/newsletter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to subscribe to newsletter");
  }

  return response.json();
};

export const getSubscribers = async (): Promise<SubscriberResponse> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/newsletter/`);

  if (!response.ok) {
    throw new Error("Failed to fetch subscribers");
  }

  return response.json();
};
