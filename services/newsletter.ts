import { siteConfig } from "@/config/siteConfig";
import { Subscriber, SubscriberResponse } from "@/types/newsletter";

export const postSubscriber = async (email: string): Promise<Subscriber> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/newsletter/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to subscribe to newsletter");
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
