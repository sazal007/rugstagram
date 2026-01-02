import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Portfolio } from "@/types/portfolio";
import { Briefcase, Edit, Trash2 } from "lucide-react";
import { getImageUrl } from "@/utils/image";
import Link from "next/link";

interface PortfolioTableProps {
  portfolios: Portfolio[];
  onEdit: (portfolio: Portfolio) => void;
  onDelete: (portfolio: Portfolio) => void;
  isLoading: boolean;
}

const PortfolioTable: React.FC<PortfolioTableProps> = ({
  portfolios,
  onEdit,
  onDelete,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <>
        {/* Desktop Loading State */}
        <div className="hidden sm:block border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Skeleton className="h-10 w-full" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="w-24 h-5" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Skeleton className="w-24 h-8 ml-auto" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Loading State */}
        <div className="sm:hidden space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border rounded-lg p-4 bg-white">
              <div className="flex items-center gap-3 mb-3">
                <Skeleton className="w-12 h-12 rounded-md shrink-0" />
                <div className="flex-1 min-w-0">
                  <Skeleton className="h-5 w-full mb-2" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Skeleton className="w-20 h-4" />
                <div className="flex gap-2">
                  <Skeleton className="w-8 h-8 rounded" />
                  <Skeleton className="w-8 h-8 rounded" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }

  if (portfolios.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-center bg-white rounded-lg shadow-sm border">
        <Briefcase className="w-12 h-12 text-gray-400" />
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No portfolios found
        </h3>
        <p className="mt-1 text-sm text-gray-500 px-4">
          Get started by creating your first portfolio item.
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table View */}
      <div className="hidden sm:block border rounded-lg overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="min-w-[200px]">Title</TableHead>
              <TableHead className="min-w-[100px]">Created</TableHead>
              <TableHead className="text-right min-w-[100px]">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {portfolios.map((portfolio) => (
              <TableRow key={portfolio.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="relative shrink-0 w-10 h-10">
                      <Image
                        src={getImageUrl(portfolio.thumbnail)}
                        alt={portfolio.thumbnail_alt_description || portfolio.title}
                        fill
                        sizes="40px"
                        className="object-cover rounded-md"
                      />
                    </div>
                    <Link href={`/admin/portfolio/${portfolio.slug}`}>
                      <span className="font-medium text-gray-900 line-clamp-2">
                        {portfolio.title}
                      </span>
                    </Link>
                  </div>
                </TableCell>
                <TableCell className="text-sm">
                  {new Date(portfolio.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(portfolio)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-600"
                      onClick={() => onDelete(portfolio)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile Card View */}
      <div className="sm:hidden space-y-3">
        {portfolios.map((portfolio) => (
          <div key={portfolio.id} className="border rounded-lg p-4 bg-white">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative shrink-0 w-12 h-12">
                <Image
                  src={getImageUrl(portfolio.thumbnail)}
                  alt={portfolio.thumbnail_alt_description || portfolio.title}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="flex-1 min-w-0 text-sm">
                <h3 className="font-medium text-gray-900 leading-tight line-clamp-2">
                  {portfolio.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <span className="text-xs text-gray-500">
                {new Date(portfolio.created_at).toLocaleDateString()}
              </span>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(portfolio)}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600 h-8 w-8 p-0"
                  onClick={() => onDelete(portfolio)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default PortfolioTable;
