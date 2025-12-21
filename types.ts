export enum Category {
  CONTEMPORARY = 'Contemporary',
  SHADED = 'Shaded',
  FLOWER = 'Flower',
  BORDER = 'Border',
  STRIPES = 'Stripes',
  ABSTRACT = 'Abstract',
}

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  salePrice?: number;
  materials: string[];
  colors: string[];
  sizes: string[];
  image: string;
  isNew: boolean;
  knotDensity: number;
}

export interface FilterState {
  category: Category[];
  priceRange: [number, number];
  materials: string[];
  sizes: string[];
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}