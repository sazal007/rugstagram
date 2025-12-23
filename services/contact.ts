import { siteConfig } from "@/config/siteConfig";
import { Contact, ContactResponse } from "@/types/contact";

export const postContact = async (data: Partial<Contact>): Promise<Contact> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to submit contact form");
  }

  return response.json();
};

export const getContacts = async (): Promise<ContactResponse> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/contact/`);

  if (!response.ok) {
    throw new Error("Failed to fetch contacts");
  }

  return response.json();
};
