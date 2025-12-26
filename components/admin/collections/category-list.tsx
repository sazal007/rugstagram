"use client";

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
import { Edit, Trash2 } from "lucide-react";
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
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Start</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((category) => (
            <TableRow key={category.id}>
              <TableCell>{category.id}</TableCell>
              <TableCell>
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
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell>{category.slug}</TableCell>
              <TableCell className="max-w-[300px] truncate">
                {category.description}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon" onClick={() => onEdit(category)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {
                        if (confirm("Are you sure you want to delete this category?")) {
                            onDelete(category);
                        }
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
