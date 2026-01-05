"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ProductListItem } from "@/types/product";
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
import { Switch } from "@/components/ui/switch";
import { ArrowUpDown, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useDeleteProduct, useUpdateProductStatus } from "@/hooks/use-product-admin";

const DeleteConfirmationDialog = ({ slug }: { slug: string }) => {
  const deleteProductMutation = useDeleteProduct();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this product?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            product and all of its associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteProductMutation.mutate(slug)}
            className="bg-red-600 hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

// Status toggle for Active/Inactive
const StatusToggle = ({ slug, is_active }: { slug: string; is_active: boolean }) => {
  const updateStatusMutation = useUpdateProductStatus();

  const handleToggle = (checked: boolean) => {
    updateStatusMutation.mutate({ slug, data: { is_active: checked } });
  };

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={is_active}
        onCheckedChange={handleToggle}
        disabled={updateStatusMutation.isPending}
        className="data-[state=checked]:bg-emerald-500"
      />
      <span
        className={`text-sm font-medium ${
          is_active ? "text-emerald-600" : "text-gray-400"
        }`}
      >
        {is_active ? "Active" : "Inactive"}
      </span>
    </div>
  );
};

// Flag toggle component
const FlagToggle = ({
  slug,
  label,
  field,
  checked,
  activeColor,
}: {
  slug: string;
  label: string;
  field: "is_new" | "is_best_seller" | "is_featured";
  checked: boolean;
  activeColor: string;
}) => {
  const updateStatusMutation = useUpdateProductStatus();

  const handleToggle = (value: boolean) => {
    updateStatusMutation.mutate({ slug, data: { [field]: value } });
  };

  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={checked}
        onCheckedChange={handleToggle}
        disabled={updateStatusMutation.isPending}
        className={`scale-90 ${checked ? activeColor : ""}`}
      />
      <span
        className={`text-sm font-medium whitespace-nowrap ${
          checked ? "text-gray-800" : "text-gray-400"
        }`}
      >
        {label}
      </span>
    </div>
  );
};

// Flags column component
const FlagsColumn = ({
  slug,
  is_new,
  is_best_seller,
  is_featured,
}: {
  slug: string;
  is_new: boolean;
  is_best_seller: boolean;
  is_featured: boolean;
}) => {
  return (
    <div className="flex flex-col gap-2">
      <FlagToggle
        slug={slug}
        label="New"
        field="is_new"
        checked={is_new}
        activeColor="data-[state=checked]:bg-blue-500"
      />
      <FlagToggle
        slug={slug}
        label="Best Seller"
        field="is_best_seller"
        checked={is_best_seller}
        activeColor="data-[state=checked]:bg-amber-500"
      />
      <FlagToggle
        slug={slug}
        label="Featured"
        field="is_featured"
        checked={is_featured}
        activeColor="data-[state=checked]:bg-purple-500"
      />
    </div>
  );
};

export const columns: ColumnDef<ProductListItem>[] = [
  {
    accessorKey: "thumbnail_image",
    header: "Image",
    size: 90,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="w-16 h-16 flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
          {product.thumbnail_image ? (
            <Image
              src={product.thumbnail_image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <span className="text-xs text-gray-400">No Image</span>
          )}
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
        className="h-auto p-0 text-sm font-semibold text-left justify-start hover:bg-transparent"
      >
        Design Name
        <ArrowUpDown className="ml-2 h-4 w-4 text-gray-400" />
      </Button>
    ),
    size: 240,
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex flex-col gap-1">
          <Link
            href={`/admin/products/edit/${product.slug}`}
            className="text-base font-medium text-gray-900 hover:text-blue-600 transition-colors line-clamp-2"
          >
            {product.name}
          </Link>
          <span className="text-sm text-gray-500">{product.code}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "collection_name",
    header: "Collection",
    size: 160,
    cell: ({ row }) => (
      <span className="text-sm text-gray-700">
        {row.original.collection_name || "—"}
      </span>
    ),
  },
  {
    accessorKey: "quality_name",
    header: "Quality",
    size: 140,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.quality_name || "—"}
      </span>
    ),
  },
  {
    accessorKey: "size_name",
    header: "Size",
    size: 120,
    cell: ({ row }) => (
      <span className="text-sm text-gray-600">
        {row.original.size_name || "—"}
      </span>
    ),
  },
  {
    accessorKey: "price",
    header: "Price",
    size: 150,
    cell: ({ row }) => {
      const priceVal = row.original.price ? parseFloat(row.original.price) : 0;
      const salePriceVal = row.original.sale_price
        ? parseFloat(row.original.sale_price)
        : null;

      const formatCurrency = (amount: number) =>
        new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "USD",
        }).format(amount);

      if (!row.original.price && !row.original.sale_price) {
        return <span className="text-sm text-gray-400">—</span>;
      }

      return (
        <div className="flex flex-col items-start gap-1">
          {salePriceVal && salePriceVal > 0 ? (
            <>
              <span className="text-base font-semibold text-emerald-600">
                {formatCurrency(salePriceVal)}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {formatCurrency(priceVal)}
              </span>
            </>
          ) : (
            <span className="text-base font-semibold text-gray-900">
              {formatCurrency(priceVal)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "is_active",
    header: "Status",
    size: 140,
    cell: ({ row }) => {
      const { slug, is_active } = row.original;
      return <StatusToggle slug={slug} is_active={is_active} />;
    },
  },
  {
    accessorKey: "flags",
    header: "Flags",
    size: 160,
    cell: ({ row }) => {
      const { slug, is_new, is_best_seller, is_featured } = row.original;
      return (
        <FlagsColumn
          slug={slug}
          is_new={is_new}
          is_best_seller={is_best_seller}
          is_featured={is_featured}
        />
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center text-sm text-gray-500">Actions</div>,
    size: 130,
    cell: ({ row }) => {
      const product = row.original;

      return (
        <div className="flex items-center justify-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 hover:text-blue-600 hover:bg-blue-50"
            asChild
          >
            <Link href={`/admin/products/edit/${product.slug}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            asChild
          >
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
