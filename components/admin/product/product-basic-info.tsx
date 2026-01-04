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
import {
  Collection,
  Product,
  Quality,
  PileHeight,
  Size,
  LuxuryEdition,
  AffordableEdition,
  Material,
} from "@/types/product";
import { X, Upload, ImageIcon } from "lucide-react";
import Image from "next/image";

interface ImageDropzoneProps {
  onFileSelect: (files: FileList | null) => void;
  currentFiles: FileList | null;
  existingImageUrl?: string | null;
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
              src={previewUrl}
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

interface ProductBasicInfoProps {
  control: Control<ProductFormValues>;
  collections: Collection[] | undefined;
  isLoadingCollections: boolean;
  qualities: Quality[] | undefined;
  isLoadingQualities: boolean;
  pileHeights: PileHeight[] | undefined;
  isLoadingPileHeights: boolean;
  sizes: Size[] | undefined;
  isLoadingSizes: boolean;
  luxuryEditions: LuxuryEdition[] | undefined;
  isLoadingLuxuryEditions: boolean;
  affordableEditions: AffordableEdition[] | undefined;
  isLoadingAffordableEditions: boolean;
  materials: Material[] | undefined;
  isLoadingMaterials: boolean;
  initialData?: Product;
}
// ...
export const ProductBasicInfo: React.FC<ProductBasicInfoProps> = ({
  control,
  collections,
  isLoadingCollections,
  qualities,
  isLoadingQualities,
  pileHeights,
  isLoadingPileHeights,
  sizes,
  isLoadingSizes,
  luxuryEditions,
  isLoadingLuxuryEditions,
  affordableEditions,
  isLoadingAffordableEditions,
  materials,
  isLoadingMaterials,
  initialData,
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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          name="code"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
           name="description"
           control={control}
           render={({ field }) => (
            <FormItem className="col-span-full">
             <FormLabel>Description</FormLabel>
              <FormControl>
               <Input {...field} value={field.value || ""} />
              </FormControl>
             <FormMessage />
            </FormItem>
           )}
        />

         <FormField
          name="collection_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer [&_svg]:text-gray-500 [&_svg]:opacity-100">
                    <SelectValue placeholder={isLoadingCollections ? "Loading..." : "Select Collection"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {collections?.map((c) => (
                    <SelectItem key={c.id} value={String(c.id)}>
                      {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="quality_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quality</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer [&_svg]:text-gray-500 [&_svg]:opacity-100">
                    <SelectValue placeholder={isLoadingQualities ? "Loading..." : "Select Quality"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {qualities?.map((q) => (
                    <SelectItem key={q.id} value={String(q.id)}>
                      {q.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="pile_height_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pile Height</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer [&_svg]:text-gray-500 [&_svg]:opacity-100">
                    <SelectValue placeholder={isLoadingPileHeights ? "Loading..." : "Select Pile Height"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {pileHeights?.map((ph) => (
                    <SelectItem key={ph.id} value={String(ph.id)}>
                      {ph.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="luxury_edition_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Luxury Edition</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer [&_svg]:text-gray-500 [&_svg]:opacity-100">
                    <SelectValue placeholder={isLoadingLuxuryEditions ? "Loading..." : "Select Luxury Edition"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {luxuryEditions?.map((e) => (
                    <SelectItem key={e.id} value={String(e.id)}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="affordable_edition_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Affordable Edition</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer [&_svg]:text-gray-500 [&_svg]:opacity-100">
                    <SelectValue placeholder={isLoadingAffordableEditions ? "Loading..." : "Select Affordable Edition"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {affordableEditions?.map((e) => (
                    <SelectItem key={e.id} value={String(e.id)}>
                      {e.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="material_id"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || ""}
              >
                <FormControl>
                  <SelectTrigger className="w-full cursor-pointer [&_svg]:text-gray-500 [&_svg]:opacity-100">
                    <SelectValue placeholder={isLoadingMaterials ? "Loading..." : "Select Material"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {materials?.map((m) => (
                    <SelectItem key={m.id} value={String(m.id)}>
                      {m.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                <Input type="number" step="0.01" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="sale_price"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sale Price</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} value={field.value || ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
            name="is_new"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel className="text-sm">Is New?</FormLabel>
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
            name="is_best_seller"
            control={control}
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <FormLabel className="text-sm">Is Best Seller?</FormLabel>
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
           name="thumbnail_image_alt_description"
           control={control}
           render={({ field }) => (
            <FormItem>
             <FormLabel>Thumbnail Alt Text</FormLabel>
              <FormControl>
               <Input {...field} value={field.value || ""} />
              </FormControl>
             <FormMessage />
            </FormItem>
           )}
        />
        
        <FormField
           name="meta_title"
           control={control}
           render={({ field }) => (
            <FormItem>
             <FormLabel>Meta Title</FormLabel>
              <FormControl>
               <Input {...field} value={field.value || ""} />
              </FormControl>
             <FormMessage />
            </FormItem>
           )}
        />
        
         <FormField
           name="meta_description"
           control={control}
           render={({ field }) => (
            <FormItem className="col-span-full">
             <FormLabel>Meta Description</FormLabel>
              <FormControl>
               <Input {...field} value={field.value || ""} />
              </FormControl>
             <FormMessage />
            </FormItem>
           )}
        />

      </CardContent>
    </Card>
  );
};
