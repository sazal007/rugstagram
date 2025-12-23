"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
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
  const filterParam = searchParams.get("filter");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Derive initial categories from collectionId (slug)
  const initialCategory = useMemo(() => {
    return collectionId || "";
  }, [collectionId]);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);

  const toggleCategory = (slug: string) => {
    setSelectedCategories((prev) => {
      const isSelected = prev.includes(slug);
      if (isSelected) {
        return prev.filter((c) => c !== slug);
      } else {
        return [...prev, slug];
      }
    });
    // Optional: Clear sub-categories when category changes if they are dependent
    // setSelectedSubCategories([]); 
  };

  const toggleSubCategory = (slug: string) => {
    setSelectedSubCategories((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
  };

  // Prepare backend filters
  const filters: ProductFilters = useMemo(() => {
    const f: ProductFilters = {};
    
    // For now, if multiple categories are selected, we might need a different API approach 
    // or just take the first one if the backend only supports one category slug at a time.
    // Based on service, it takes a single string.
    if (selectedCategories.length > 0) {
      f.category = selectedCategories[0];
    }

    if (selectedSubCategories.length > 0) {
      // Backend might expect 'sub_category__slug' or just 'sub_category' depending on service.
      // Service says: if (filters.sub_category) params.append("sub_category__slug", filters.sub_category);
      // It currently joins multiple params? No, standard URLSearchParams with same key?
      // The service implementation: if (filters.sub_category) params.append("sub_category__slug", filters.sub_category);
      // It looks like it only supports ONE sub_category based on the service signature `sub_category?: string;`.
      // If we want multiple, we might need to update service or just pick first.
      // Let's assume we pick the first one for now or if the user selects multiple we might need an array in service.
      // Looking at service, it's string. Let's pass the first one for now or comma separate if backend supports 'in'.
      // Usually Django filters use multiple keys.
      // Ideally we update service to accept array, but let's stick to simple first item or simple param.
      // Let's just take the first one for now.
      f.sub_category = selectedSubCategories[0];
    }
    
    if (filterParam === "new") {
      f.is_featured = true; // Mapping 'new' arrivals to 'featured' for now
    }
    
    return f;
  }, [selectedCategories, selectedSubCategories, filterParam]);

  const { data, isLoading, error } = useProducts(filters);
  const products = data?.results || [];

  // Determine page title
  const pageTitle = collectionId
    ? `${collectionId} Collection`
    : filterParam === "new"
    ? "New Arrivals"
    : "All Rugs";

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
        productCount={products.length}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        <FilterSidebar
          isOpen={isFilterOpen}
          selectedCategories={selectedCategories}
          selectedSubCategories={selectedSubCategories}
          onToggleCategory={toggleCategory}
          onToggleSubCategory={toggleSubCategory}
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
            key={`products-${selectedCategories.join(",")}-${filterParam || ""}`}
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
