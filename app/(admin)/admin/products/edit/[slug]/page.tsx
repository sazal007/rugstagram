"use client";
import { ProductForm } from "@/components/admin/product/product-form";
import { useProduct } from "@/hooks/use-product";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { use } from "react";
interface EditProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function EditProductPage({ params }: EditProductPageProps) {
  const { slug } = use(params);
  const { data: product, isLoading, isError } = useProduct(slug);

  if (isLoading) {
    return (
      <div className="container mx-auto bg-white py-8 space-y-6">
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-12 w-1/2" />
        <div className="space-y-8">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-96 w-full" />
          <Skeleton className="h-80 w-full" />
        </div>
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="text-center py-10 bg-white">
        Failed to load product data. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-7xl px-10 mt-10 bg-white">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin/products">Products</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit: {product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="text-3xl font-bold my-6">Edit Product</h1>
      <ProductForm initialData={product} />
    </div>
  );
}
