"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "@/types/product";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDeleteProduct } from "@/hooks/use-product-admin";

const DeleteConfirmationDialog = ({ slug }: { slug: string }) => {
  const deleteProductMutation = useDeleteProduct();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product and all of its associated data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteProductMutation.mutate(slug)}
            className="bg-red-600 hover:bg-red-700"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail_image",
    header: "Image",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="w-16 h-16 flex items-center justify-center">
          <Image
            src={product.thumbnail_image || "/placeholder.png"}
            alt={product.name}
            width={60}
            height={60}
            className="rounded-md object-cover"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="h-auto p-0 font-medium text-left justify-start"
      >
        Product
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const product = row.original;
      return (
        <Link href={`/admin/products/edit/${product.slug}`}>
          <div className="font-medium hover:text-primary cursor-pointer transition-colors max-w-xs">
            {product.name}
          </div>
        </Link>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => {
      const product = row.original;
      const isActive = product.is_active;
      return (
        <div className="flex justify-center text-gray-500 text-xs  bg-white border border-gray-300 rounded-full ">
          {isActive ? "Active" : "Inactive"}
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: () => <div className="text-center">Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "stock",
    header: () => <div className="text-center">Stock</div>,
    cell: ({ row }) => {
      const stock = row.getValue("stock") as number;
      return <div className="text-center">{stock}</div>;
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/admin/products/edit/${product.slug}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <Link href={`/product/${product.slug}`} target="_blank">
              <Eye className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteConfirmationDialog slug={product.slug} />
        </div>
      );
    },
  },
];
