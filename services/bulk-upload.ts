import { siteConfig } from '@/config/siteConfig';

const API_BASE_URL = siteConfig.backendUrl;

export interface BulkUploadResponse {
  success: boolean;
  message: string;
  processed?: number;
  errors?: string[];
}

export const uploadExcelFile = async (file: File): Promise<BulkUploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/product/bulk-upload/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Upload failed' }));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};