import { siteConfig } from "@/config/siteConfig";
import { Bespoke, CreateBespokePayload, BespokeResponse } from "@/types/bespoke";

export const postBespoke = async (data: CreateBespokePayload): Promise<Bespoke> => {
  const formData = new FormData();
  formData.append('full_name', data.full_name);
  formData.append('email', data.email);
  formData.append('phone_number', data.phone_number);
  formData.append('message', data.message);
  
  if (data.image) {
    formData.append('image', data.image);
  }

  const response = await fetch(`${siteConfig.backendUrl}/api/bespoke/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    let errorMessage = "Failed to submit bespoke design";
    try {
      const errorData = await response.json();
      errorMessage = JSON.stringify(errorData);
    } catch {
      // Fallback if not JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export const getBespokes = async (): Promise<BespokeResponse> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/bespoke/`);

  if (!response.ok) {
    throw new Error("Failed to fetch bespoke designs");
  }

  return response.json();
};
export const getBespokeById = async (id: string | number): Promise<Bespoke> => {
  const response = await fetch(`${siteConfig.backendUrl}/api/bespoke/${id}/`);

  if (!response.ok) {
    throw new Error("Failed to fetch bespoke design details");
  }

  return response.json();
};
