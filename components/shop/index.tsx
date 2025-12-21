"use client";

import React, { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { ShopHeader } from "./ShopHeader";
import { FilterToggle } from "./FilterToggle";
import { FilterSidebar } from "./FilterSidebar";
import { ProductGrid } from "./ProductGrid";
import { EmptyState } from "./EmptyState";
import { PRODUCTS } from "@/constants";
import { Category } from "@/types";

interface ShopProps {
  collectionId?: string;
}

function ShopContent({ collectionId }: ShopProps) {
  const searchParams = useSearchParams();
  const filterParam = searchParams.get("filter");

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Derive initial categories from collectionId
  const initialCategories = useMemo(() => {
    if (collectionId) {
      const match = Object.values(Category).find(
        (c) => c.toLowerCase() === collectionId.toLowerCase()
      );
      return match ? [match] : [];
    }
    return [];
  }, [collectionId]);

  const [selectedCategories, setSelectedCategories] =
    useState<Category[]>(initialCategories);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) => {
      const category = cat as Category;
      const isSelected = prev.includes(category);
      if (isSelected) {
        return prev.filter((c) => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const toggleMaterial = (mat: string) => {
    setSelectedMaterials((prev) =>
      prev.includes(mat) ? prev.filter((m) => m !== mat) : [...prev, mat]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedMaterials([]);
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Collection/Category Filter
      if (selectedCategories.length > 0) {
        if (!selectedCategories.includes(product.category)) {
          return false;
        }
      }
      // Material Filter
      if (selectedMaterials.length > 0) {
        const hasMaterial = product.materials.some((m) =>
          selectedMaterials.includes(m)
        );
        if (!hasMaterial) return false;
      }
      // New Arrivals param
      if (filterParam === "new" && !product.isNew) {
        return false;
      }
      return true;
    });
  }, [selectedCategories, selectedMaterials, filterParam]);

  // Determine page title
  const pageTitle = collectionId
    ? `${collectionId} Collection`
    : filterParam === "new"
    ? "New Arrivals"
    : "All Rugs";

  const subtitle =
    "Discover our curated selection of hand-knotted masterpieces, crafted with precision and passion in the heart of the Himalayas.";

  return (
    <div className="pt-8 pb-24 max-w-[1400px] mx-auto px-6">
      <ShopHeader title={pageTitle} subtitle={subtitle} />

      <FilterToggle
        isOpen={isFilterOpen}
        onToggle={() => setIsFilterOpen(!isFilterOpen)}
        productCount={filteredProducts.length}
      />

      <div className="flex flex-col lg:flex-row gap-12">
        <FilterSidebar
          isOpen={isFilterOpen}
          selectedCategories={selectedCategories}
          selectedMaterials={selectedMaterials}
          onToggleCategory={toggleCategory}
          onToggleMaterial={toggleMaterial}
        />

        {filteredProducts.length > 0 ? (
          <ProductGrid
            key={`products-${selectedCategories.join(
              ","
            )}-${selectedMaterials.join(",")}-${filterParam || ""}`}
            products={filteredProducts}
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
