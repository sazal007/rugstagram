"use client";

import * as React from "react";
import { Collection } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Trash2, Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Image from "next/image";

interface CategoryListProps {
  data: Collection[];
  onEdit: (category: Collection) => void;
  onDelete: (category: Collection) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState({
    image: true,
    name: true,
    slug: true,
    actions: true,
  });

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery) return data;
    
    const query = searchQuery.toLowerCase();
    return data.filter((category) => 
      category.name.toLowerCase().includes(query) ||
      category.slug.toLowerCase().includes(query)
    );
  }, [data, searchQuery]);

  return (
    <div className="w-full space-y-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(event.target.value)
            }
            className="pl-9 bg-white border-gray-200 focus:border-gray-300 focus:ring-0"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="border-gray-200 text-gray-600">
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Columns
              <ChevronDown className="ml-2 h-3.5 w-3.5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuCheckboxItem
              className="capitalize text-sm"
              checked={columnVisibility.image}
              onCheckedChange={(value) =>
                setColumnVisibility((prev) => ({ ...prev, image: !!value }))
              }
            >
              Image
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="capitalize text-sm"
              checked={columnVisibility.name}
              onCheckedChange={(value) =>
                setColumnVisibility((prev) => ({ ...prev, name: !!value }))
              }
            >
              Name
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="capitalize text-sm"
              checked={columnVisibility.slug}
              onCheckedChange={(value) =>
                setColumnVisibility((prev) => ({ ...prev, slug: !!value }))
              }
            >
              Slug
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/80 border-b border-gray-200">
              {columnVisibility.image && (
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-4">
                  Image
                </TableHead>
              )}
              {columnVisibility.name && (
                <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-4">
                  Name
                </TableHead>
              )}
              <TableHead className="text-xs font-semibold text-gray-500 uppercase tracking-wide py-3 px-4 text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? (
              filteredData.map((category, index) => (
                <TableRow
                  key={category.id}
                  className={`border-b border-gray-100 transition-colors hover:bg-gray-50/50 ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  }`}
                >
                  {columnVisibility.image && (
                    <TableCell className="py-3 px-4 align-middle">
                      {category.image && (
                        <div className="relative h-10 w-10">
                          <Image
                            src={category.image}
                            alt={category.name}
                            fill
                            className="rounded-md object-cover"
                          />
                        </div>
                      )}
                    </TableCell>
                  )}
                  {columnVisibility.name && (
                    <TableCell className="py-3 px-4 align-middle font-medium">
                      {category.name}
                    </TableCell>
                  )}
                  <TableCell className="py-3 px-4 align-middle text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEdit(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          if (
                            confirm(
                              "Are you sure you want to delete this category?"
                            )
                          ) {
                            onDelete(category);
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-32 text-center text-gray-400"
                >
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg">No categories found</span>
                    <span className="text-sm">
                      Try adjusting your search or filters
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          Showing {filteredData.length} of {data.length} results
        </div>
      </div>
    </div>
  );
};
