import { siteConfig } from "@/config/siteConfig";
import { Contact, ContactResponse } from "@/types/contact";

export const postContact = async (data: Partial<Contact>): Promise<Contact> => {
  // Convert data to URLSearchParams for form-encoded format
  const formData = new URLSearchParams();
  if (data.full_name) formData.append('full_name', data.full_name);
  if (data.email) formData.append('email', data.email);
  if (data.phone_number) formData.append('phone_number', data.phone_number);
  if (data.message) formData.append('message', data.message);

  const response = await fetch(`${siteConfig.backendUrl}/api/contact/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData.toString(),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Failed to submit contact form");
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
export const getContactById = async (id: string | number): Promise<Contact> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/contact/${id}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch contact details");
  }

  return response.json();
};
