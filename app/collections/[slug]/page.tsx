import { Suspense } from "react";
import { Shop } from "@/components/shop";

interface CollectionPageProps {
  params: Promise<{ slug: string }>;
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  return (
    <Suspense fallback={<div className="pt-8 pb-24 max-w-[1400px] mx-auto px-6">Loading...</div>}>
      <Shop collectionId={slug} />
    </Suspense>
  );
}

