export const getImageUrl = (imageUrl: string | null | undefined): string => {
  if (!imageUrl) return '/images/fallback.png'; 
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }
  return `${process.env.NEXT_PUBLIC_API_BASE_URL}${imageUrl}`;
};
