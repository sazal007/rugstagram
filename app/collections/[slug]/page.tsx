import { Suspense } from "react";
import { Shop } from "@/components/shop";
import type { Metadata } from "next";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collectionName = slug.charAt(0).toUpperCase() + slug.slice(1);

  return {
    title: `${collectionName} Collection`,
    description: `Explore our ${collectionName} collection of handcrafted Himalayan rugs. Discover unique designs, premium materials, and traditional craftsmanship.`,
    keywords: [collectionName, "rug collection", "Himalayan rugs", "handcrafted rugs", `${collectionName.toLowerCase()} rugs`],
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="pt-8 pb-24 max-w-[1400px] mx-auto px-6">Loading...</div>}>
      <Shop collectionId={slug} />
    </Suspense>
  );
}

