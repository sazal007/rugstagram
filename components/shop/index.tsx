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
import Pagination from "@/components/ui/pagination";

interface ShopProps {
  collectionId?: string;
}

function ShopContent({ collectionId }: ShopProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const filterParam = searchParams.get("filter");
  const colorParam = searchParams.get("color");
  const collectionParam = searchParams.get("collection");

  const selectedColors = useMemo(() => colorParam ? colorParam.split(",") : [], [colorParam]);
  const selectedCollections = useMemo(() => {
    const fromParams = collectionParam ? collectionParam.split(",") : [];
    if (collectionId && !fromParams.includes(collectionId)) {
      return [collectionId, ...fromParams];
    }
    return fromParams;
  }, [collectionParam, collectionId]);

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // The collectionId comes from the URL slug via dynamic routing
  // and serves as our "selectedCategory"
  const selectedCategory = collectionId || null;

  const toggleCategory = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let currentCollections = params.get("collection")?.split(",").filter(Boolean) || [];
    
    if (currentCollections.includes(slug)) {
      currentCollections = currentCollections.filter(c => c !== slug);
    } else {
      currentCollections.push(slug);
    }

    if (currentCollections.length > 0) {
      params.set("collection", currentCollections.join(","));
    } else {
      params.delete("collection");
    }

    // If we were on a specific collection route, moving to /shop for multi-select
    const targetPath = collectionId ? "/shop" : pathname;
    router.push(`${targetPath}?${params.toString()}`, { scroll: false });
  };

  const toggleColor = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    let currentColors = params.get("color")?.split(",").filter(Boolean) || [];

    if (currentColors.includes(slug)) {
      currentColors = currentColors.filter(c => c !== slug);
    } else {
      currentColors.push(slug);
    }

    if (currentColors.length > 0) {
      params.set("color", currentColors.join(","));
    } else {
      params.delete("color");
    }
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    router.push("/shop");
  };


  /* import Pagination */
  const PAGE_SIZE = 12;

  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;

  const filters: ProductFilters = useMemo(() => {
    const f: ProductFilters = {
      page: currentPage,
      page_size: PAGE_SIZE,
    };
    
    if (selectedCollections.length > 0) {
      f.collection = selectedCollections.join(",");
    }

    if (selectedColors.length > 0) {
      f.color = selectedColors.join(",");
    }
    
    if (filterParam === "new") {
      f.is_featured = true;
    }
    
    return f;
  }, [selectedCollections, selectedColors, filterParam, currentPage]);

  const { data, isLoading, error } = useProducts(filters);
  const products = data?.results || [];
  const totalCount = data?.count || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  const pageTitle = useMemo(() => {
    if (selectedCollections.length === 1) {
      return `${selectedCollections[0].charAt(0).toUpperCase() + selectedCollections[0].slice(1)} Collection`;
    }
    if (selectedCollections.length > 1) {
      return "Selected Collections";
    }
    if (selectedColors.length === 1) {
      return `${selectedColors[0].charAt(0).toUpperCase() + selectedColors[0].slice(1)} Rugs`;
    }
    if (selectedColors.length > 1) {
      return "Selected Colors";
    }
    if (filterParam === "new") {
      return "New Arrivals";
    }
    return "All Rugs";
  }, [selectedCollections, selectedColors, filterParam]);

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
        productCount={totalCount}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        <FilterSidebar
          isOpen={isFilterOpen}
          selectedCategories={selectedCollections}
          onToggleCategory={toggleCategory}
          selectedColors={selectedColors}
          onToggleColor={toggleColor}
        />

        <div className="grow">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <div className="aspect-3/4 bg-gray-100 animate-pulse rounded-sm" />
                  <div className="h-4 bg-gray-100 animate-pulse w-3/4" />
                  <div className="h-4 bg-gray-100 animate-pulse w-1/2" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
            <>
              <ProductGrid
                key={`products-${selectedCategory || "all"}-${filterParam || ""}-${currentPage}`}
                products={products}
                fetchWishlist={false}
              />
              <div className="mt-12">
                 {/* Pagination Component */}
              </div>
            </>
          ) : (
             <EmptyState onClearFilters={clearFilters} />
          )}

           {/* Pagination */}
           {!isLoading && totalPages > 1 && products.length > 0 && (
             <Pagination 
               currentPage={currentPage}
               totalPages={totalPages}
               onPageChange={handlePageChange}
             />
           )}
        </div>
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
