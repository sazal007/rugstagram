import * as z from 'zod';

export const videoFormSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Must be a valid URL'),
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;
