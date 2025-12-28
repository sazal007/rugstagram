"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ShopHeader } from "./ShopHeader";
import { FilterToggle } from "./FilterToggle";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";
import { useProducts } from "@/hooks/use-product";
import { ProductFilters } from "@/services/product";

interface ShopProps {
  collectionId?: string;
}

function ShopContent({ collectionId }: ShopProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filterParam = searchParams.get("filter");
  const colorParam = searchParams.get("color");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // The collectionId comes from the URL slug via dynamic routing
  // and serves as our "selectedCategory"
  const selectedCategory = collectionId || null;

  const toggleCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (collectionId === slug) {
      router.push(`/shop${params.toString() ? `?${params.toString()}` : ""}`);
    } else {
      router.push(`/collections/${slug}${params.toString() ? `?${params.toString()}` : ""}`);
    }
  };

  const toggleColor = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (params.get("color") === slug) {
      params.delete("color");
    } else {
      params.set("color", slug);
    }
    
    router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ""}`);
  };

  const clearFilters = () => {
    router.push("/shop");
  };


  const filters: ProductFilters = useMemo(() => {
    const f: ProductFilters = {};
    
    // Handle Collection (directly from URL via collectionId prop)
    if (collectionId) {
      f.collection = collectionId;
    }

    // Handle Color from URL (dynamic navbar link or sidebar)
    if (colorParam) {
      f.color = colorParam;
    }
    
    if (filterParam === "new") {
      f.is_featured = true;
    }
    
    return f;
  }, [collectionId, colorParam, filterParam]);

  const { data, isLoading, error } = useProducts(filters);
  const products = data?.results || [];

  const pageTitle = useMemo(() => {
    if (collectionId) {
      return `${collectionId.charAt(0).toUpperCase() + collectionId.slice(1)} Collection`;
    }
    if (colorParam) {
      return `${colorParam.charAt(0).toUpperCase() + colorParam.slice(1)} Rugs`;
    }
    if (filterParam === "new") {
      return "New Arrivals";
    }
    return "All Rugs";
  }, [collectionId, colorParam, filterParam]);

  const subtitle =
    "Discover our curated selection of hand-knotted masterpieces, crafted with precision and passion in the heart of the Himalayas.";

  if (error) {
    return (
      <div className="pt-24 pb-24 text-center">
        <h2 className="text-2xl font-serif mb-4">Connection Error</h2>
        <p className="text-muted mb-8">Failed to load rugs. Please check your backend connection.</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-8 py-3 text-sm uppercase tracking-widest font-bold hover:bg-accent transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="pt-8 pb-24 max-w-[1400px] mx-auto px-6">
      <ShopHeader title={pageTitle} subtitle={subtitle} />

      <FilterToggle
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
        productCount={data?.count || 0}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        <FilterSidebar
          isOpen={isFilterOpen}
          selectedCategory={selectedCategory}
          onToggleCategory={toggleCategory}
          selectedColor={colorParam}
          onToggleColor={toggleColor}
        />

        {isLoading ? (
          <div className="grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <div className="aspect-3/4 bg-gray-100 animate-pulse rounded-sm" />
                <div className="h-4 bg-gray-100 animate-pulse w-3/4" />
                <div className="h-4 bg-gray-100 animate-pulse w-1/2" />
              </div>
            ))}
          </div>
        ) : products.length > 0 ? (
          <ProductGrid
            key={`products-${selectedCategory || "all"}-${filterParam || ""}`}
            products={products}
          />
        ) : (
          <div className="grow">
            <EmptyState onClearFilters={clearFilters} />
          </div>
        )}
      </div>
    </div>
  );
}

export const Shop: React.FC<ShopProps> = ({ collectionId }) => {
  // Use key to reset component state when collectionId changes
  return (
    <ShopContent key={collectionId || "all"} collectionId={collectionId} />
  );
};
