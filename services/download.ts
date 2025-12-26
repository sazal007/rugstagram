

import { siteConfig } from '@/config/siteConfig';

const API_BASE_URL = siteConfig.backendUrl;

export const fetchProductTemplate = async () => {
  const response = await fetch(`${API_BASE_URL}/api/products/download-template/`);
  if (!response.ok) {
    throw new Error('Failed to download product template');
  }
  const blob = await response.blob();
  return blob;
};


