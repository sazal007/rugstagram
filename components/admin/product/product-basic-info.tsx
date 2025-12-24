import React, { useState, useRef } from "react";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ProductFormValues } from "@/schemas/product-form";
import { Room } from "@/types/room";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

import { Product } from "@/types/product"; // Add this import

interface ProductBasicInfoProps {
  control: Control<ProductFormValues>;
  rooms: Room[] | undefined;
  isLoadingRooms: boolean;
  initialData?: Product; // Add this prop
}

interface ImageDropzoneProps {
  onFileSelect: (files: FileList | null) => void;
  currentFiles: FileList | null;
  existingImageUrl?: string; 
  label: string;
  accept?: string;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({
  onFileSelect,
  currentFiles,
  existingImageUrl, 
  accept = "image/*",
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (currentFiles && currentFiles.length > 0) {
      const file = currentFiles[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    } else if (existingImageUrl) {
      setPreviewUrl(existingImageUrl);
    } else {
      setPreviewUrl(null);
    }
  }, [currentFiles, existingImageUrl]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      // Create a new FileList-like object
      const fileList = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      if (fileList.length > 0) {
        const dt = new DataTransfer();
        fileList.forEach((file) => dt.items.add(file));
        onFileSelect(dt.files);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFileSelect(e.target.files);
  };

  const handleRemoveImage = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  // Determine if we're showing a new file or existing image
  const isNewFile = currentFiles && currentFiles.length > 0;
  const fileName = isNewFile ? currentFiles[0].name : null;
  const fileSize = isNewFile ? currentFiles[0].size : null;

  return (
    <div className="space-y-2">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors cursor-pointer ${
          isDragOver
            ? "border-blue-500 bg-blue-50"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileSelect}
          className="hidden"
        />

        {previewUrl ? (
          <div className="relative">
            <Image
              src={previewUrl||`${process.env.NEXT_PUBLIC_API_URL}${existingImageUrl}`}
              alt="Preview"
              width={500}
              height={128}
              className="w-full h-32 object-cover rounded-lg"
              unoptimized
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveImage();
              }}
              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 text-gray-500">
            <Upload size={40} className="mb-2" />
            <p className="text-sm font-medium">
              Drop image here or click to upload
            </p>
            <p className="text-xs text-gray-400 mt-1">
              PNG, JPG, GIF up to 10MB
            </p>
          </div>
        )}
      </div>

      {currentFiles && currentFiles.length > 0 && (
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <ImageIcon size={16} />
          <span>{fileName}</span>
          {fileSize && (
            <span className="text-gray-400">
              ({(fileSize / 1024 / 1024).toFixed(2)} MB)
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  control,
  rooms,
  isLoadingRooms,
  initialData, // Add this prop
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FormField
          name="name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="brand_name"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Brand Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="designer"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Designer</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="market_price"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="price"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="stock"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Stock</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="discount"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  {...field}
                  value={field.value || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="room_type"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Room" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {!isLoadingRooms &&
                    rooms?.map((r) => (
                      <SelectItem key={r.id} value={r.slug}>
                        {r.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Toggle Switches in a compact row */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            name="is_featured"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel className="text-sm">Is Featured?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="is_clearance"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel className="text-sm">Is Clearance?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="is_popular"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel className="text-sm">Is Popular?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="is_active"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel className="text-sm">Is Active?</FormLabel>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Image Upload Fields */}
        <FormField
          name="thumbnail_image"
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-1 lg:col-span-1">
              <FormLabel>Thumbnail Image</FormLabel>
              <FormControl>
                <ImageDropzone
                  onFileSelect={field.onChange}
                  currentFiles={field.value}
                  existingImageUrl={initialData?.thumbnail_image}
                  label="Thumbnail Image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="hover_thumbnail_image"
          control={control}
          render={({ field }) => (
            <FormItem className="col-span-1 md:col-span-1 lg:col-span-1">
              <FormLabel>Hover Thumbnail Image</FormLabel>
              <FormControl>
                <ImageDropzone
                  onFileSelect={field.onChange}
                  currentFiles={field.value}
                  existingImageUrl={initialData?.hover_thumbnail_image} // Pass existing image URL
                  label="Hover Thumbnail Image"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};
