import * as z from 'zod';

export const portfolioFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description is required.'),
  thumbnail: z.any().refine((val) => {
    if (!val) return false;
    if (val instanceof FileList) return val.length > 0;
    if (val instanceof File) return true;
    return false;
  }, 'Thumbnail image is required.'),
  thumbnail_alt_description: z.string().min(1, 'Alt description is required.'),
  images: z.any().optional(), // This will be handled as an array of files in the form
});

export type PortfolioFormValues = z.infer<typeof portfolioFormSchema>;
