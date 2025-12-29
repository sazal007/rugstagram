import { Suspense } from "react";
import { Shop } from "@/components/shop";
import type { Metadata } from "next";

interface CollectionsPageProps {
  searchParams: Promise<{ collection?: string }>;
}

export async function generateMetadata({ searchParams }: CollectionsPageProps): Promise<Metadata> {
  const { collection } = await searchParams;
  
  if (!collection) {
    return {
      title: "Collections",
      description: "Explore our handcrafted Himalayan rug collections. Discover unique designs, premium materials, and traditional craftsmanship.",
      keywords: ["rug collection", "Himalayan rugs", "handcrafted rugs"],
    };
  }

  const collectionName = collection.charAt(0).toUpperCase() + collection.slice(1);

  return {
    title: `${collectionName} Collection`,
    description: `Explore our ${collectionName} collection of handcrafted Himalayan rugs. Discover unique designs, premium materials, and traditional craftsmanship.`,
    keywords: [collectionName, "rug collection", "Himalayan rugs", "handcrafted rugs", `${collectionName.toLowerCase()} rugs`],
  };
}

export default async function CollectionsPage({ searchParams }: CollectionsPageProps) {
  const { collection } = await searchParams;
  return (
    <Suspense fallback={<div className="pt-8 pb-24 max-w-[1400px] mx-auto px-6">Loading...</div>}>
      <Shop collectionId={collection} />
    </Suspense>
  );
}
