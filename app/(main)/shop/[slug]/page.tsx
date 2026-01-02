import { ProductListItem } from "@/types/product";
import { productApi } from "@/services/product";
import { ProductDetail } from "@/components/shop/details";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ color?: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  
  try {
    const product = await productApi.getBySlug(slug);
    
    // Mock keywords or use available data
    const keywords = [product.name, "handcrafted rug", "Himalayan rug"];
    if (product.collection?.name) keywords.push(product.collection.name);

    return {
      title: product.name,
      description: `Discover ${product.name}${product.collection?.name ? ` - A handcrafted ${product.collection.name} rug` : ''}.`,
      keywords,
    };
  } catch {
    return {
      title: "Product Not Found",
    };
  }
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const { color } = await searchParams;
  
  let product;
  let similarProducts: ProductListItem[] = [];
  
  try {
    product = await productApi.getBySlug(slug);
    
    // Get color slug from search params or fallback to first variant's color if available
    const colorSlug = color || product.variants[0]?.color_name?.toLowerCase().replace(/\s+/g, '-');
    
    if (colorSlug) {
      try {
        similarProducts = await productApi.getSimilar(colorSlug);
      } catch (err) {
        console.error("Failed to fetch similar products:", err);
      }
    }
  } catch {
    notFound();
  }

  return <ProductDetail product={product} similarProducts={similarProducts} />;
}
