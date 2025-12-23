import type { Category } from "./category";

export type SubCategory = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string | null;
  category: Category;
};
