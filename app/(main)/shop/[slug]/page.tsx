import { notFound } from "next/navigation";
import { productApi } from "@/services/product";
import { ProductDetail } from "@/components/shop/details";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
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

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  
  let product;
  try {
    product = await productApi.getBySlug(slug);
  } catch {
    notFound();
  }

  return <ProductDetail product={product} />;
}
