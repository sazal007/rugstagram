"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Product } from "@/types";

interface BreadcrumbProps {
  product: Product;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ product }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-muted hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back
      </button>
      <div className="text-xs text-muted uppercase tracking-widest hidden sm:block">
        Home / Shop / {product.category} /{" "}
        <span className="text-primary">{product.name}</span>
      </div>
    </div>
  );
};

