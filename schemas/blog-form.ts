import * as z from 'zod';

export const blogFormSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters long.'),
  description: z.string().min(10, 'Description is required.'),
  meta_title: z.string().max(60, 'Meta title should be under 60 characters.').optional(),
  meta_description: z.string().max(160, 'Meta description should be under 160 characters.').optional(),
  thumbnail_image: z.any().refine((val) => {
    if (!val) return false;
    if (val instanceof FileList) return val.length > 0;
    if (val instanceof File) return true;
    return false;
  }, 'Thumbnail image is required.'),
  thumbnail_image_alt_description: z.string().optional(),
  category_id: z.string().min(1, 'Category is required.'),
  tags_id: z.array(z.number()).optional(),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;