"use client";

import { useState } from "react";
import { useProducts } from "@/hooks/use-product";
import { columns } from "@/components/admin/product/products-table-columns";
import { ProductsDataTable } from "@/components/admin/product/products-data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
import { PlusCircle, Upload } from "lucide-react";
import DownloadTemplateButton from "@/components/admin/product/download-template-button";
import BulkUploadComponent from "@/components/admin/product/bulk-upload";

export default function AdminProductsPage() {
  const { data: productResponse, isLoading, isError } = useProducts();
  const [bulkUploadOpen, setBulkUploadOpen] = useState(false);

  const handleUploadSuccess = () => {
    setBulkUploadOpen(false);
    // Products will be refetched automatically due to query invalidation in the hook
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-between items-center mb-6">
          <Skeleton className="h-10 w-1/4" />
          <Skeleton className="h-10 w-36" />
        </div>
        <Skeleton className="h-[500px] w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        Failed to load products. Please try again.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl px-10 mt-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Manage Products</h1>
            <p className="text-muted-foreground">
              View, edit, and manage all products in your store.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              className="text-white bg-gray-500 hover:bg-gray-600"
            >
              <Link href="/admin/products/add">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Product
              </Link>
            </Button>

            <Dialog open={bulkUploadOpen} onOpenChange={setBulkUploadOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className=" text-white bg-gray-500 hover:bg-gray-600 hover:text-white">
                  <Upload className="mr-2 h-4 w-4" />
                  Bulk Upload
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Bulk Upload Products</DialogTitle>
                </DialogHeader>
                <BulkUploadComponent onUploadSuccess={handleUploadSuccess} />
              </DialogContent>
            </Dialog>

            <DownloadTemplateButton />
          </div>
        </div>
        <ProductsDataTable
          columns={columns}
          data={productResponse?.results || []}
        />
      </div>
    </div>
  );
}
