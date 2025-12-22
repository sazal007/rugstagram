import { notFound } from "next/navigation";
import { PRODUCTS } from "@/constants";
import { ProductDetail } from "@/components/shop/details";
import type { Metadata } from "next";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: product.name,
    description: `Discover ${product.name} - A handcrafted ${product.category.toLowerCase()} rug made from ${product.materials.join(" and ")}. Available in ${product.colors.join(" and ")} colors and multiple sizes.`,
    keywords: [product.name, product.category, ...product.materials, ...product.colors, "handcrafted rug", "Himalayan rug"],
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
