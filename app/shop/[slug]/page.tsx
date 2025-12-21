import { notFound } from "next/navigation";
import { PRODUCTS } from "@/constants";
import { ProductDetail } from "@/components/shop/details";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.id === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
