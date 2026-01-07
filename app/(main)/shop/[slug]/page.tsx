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
    
    // Construct enhanced keywords
    const keywords = [
      product.name, 
      "handcrafted rug", 
      "Himalayan rug", 
      "Nepalese rug",
      "luxury rug"
    ];
    
    if (product.collection?.name) keywords.push(product.collection.name);
    if (product.material?.name) keywords.push(product.material.name);
    if (product.quality?.name) keywords.push(product.quality.name);
    if (product.pile_height?.name) keywords.push(product.pile_height.name);
    
    // Construct images array for OpenGraph
    const images = [];
    if (product.thumbnail_image) {
      images.push(product.thumbnail_image);
    }
    
    // Add first variant image if available and different from thumbnail
    const firstVariantImage = product.variants?.[0]?.product_images?.[0]?.image;
    if (firstVariantImage && firstVariantImage !== product.thumbnail_image) {
      images.push(firstVariantImage);
    }

    return {
      title: product.meta_title || product.name,
      description: product.meta_description || product.description || undefined,
      keywords,
      openGraph: {
        title: product.meta_title || product.name,
        description: product.meta_description || product.description || undefined,
        images: images,
        type: 'website',
      },
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
