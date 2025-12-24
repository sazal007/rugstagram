import React, { useState, useCallback, useRef, useEffect } from "react";
import Image from "next/image";
import {
  Control,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
  useFieldArray,
} from "react-hook-form";
import { ProductFormValues, ProductImageType } from "@/schemas/product-form";
import { ProductColor, ProductSize } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Trash2, Image as ImageIcon, Eye } from "lucide-react";
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

interface ProductImageManagerProps {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  colors: ProductColor[];
  sizes: ProductSize[];
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
}

export const ProductImageManager: React.FC<ProductImageManagerProps> = ({
  control,
  colors,
  sizes,
  setValue,
  watch,
}) => {
  const [dragActive, setDragActive] = useState<number | null>(null);
  const [previewUrls, setPreviewUrls] = useState<{ [key: number]: string }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  // Use useFieldArray for better form state management
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const images = watch("images") || [];

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [previewUrls]);

  const addNewImage = () => {
    const newImage: ProductImageType = {
      image: null,
      image_alt_description: "",
      color_id: "",
      stock: "",
      size_ids: [],
    };
    append(newImage);
  };

  const removeImage = (index: number) => {
    remove(index);

    // Clean up preview URL
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
      const newPreviewUrls = { ...previewUrls };
      delete newPreviewUrls[index];
      setPreviewUrls(newPreviewUrls);
    }
  };

  const updateImageSizes = (imageIndex: number, sizeIds: string[]) => {
    setValue(`images.${imageIndex}.size_ids`, sizeIds);
  };

  const addSizeToImage = (imageIndex: number, sizeId: string) => {
    const currentSizes = images[imageIndex]?.size_ids || [];
    if (!currentSizes.includes(sizeId)) {
      updateImageSizes(imageIndex, [...currentSizes, sizeId]);
    }
  };

  const removeSizeFromImage = (imageIndex: number, sizeId: string) => {
    const currentSizes = images[imageIndex]?.size_ids || [];
    updateImageSizes(
      imageIndex,
      currentSizes.filter((id) => id !== sizeId)
    );
  };

  const getSizeName = (sizeId: string) => {
    const size = sizes.find((s) => s.id.toString() === sizeId);
    return size ? size.name : sizeId;
  };

  const handleFileChange = useCallback(
    (index: number, file: File | null) => {
      if (file) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          console.error("Invalid file type. Please select an image file.");
          return;
        }

        // Clean up previous preview URL
        if (previewUrls[index]) {
          URL.revokeObjectURL(previewUrls[index]);
        }

        // Create new preview URL
        const url = URL.createObjectURL(file);
        setPreviewUrls((prev) => ({ ...prev, [index]: url }));

        // Set the file in form state
        setValue(`images.${index}.image`, file);
      } else {
        // Clean up preview URL
        if (previewUrls[index]) {
          URL.revokeObjectURL(previewUrls[index]);
          const newPreviewUrls = { ...previewUrls };
          delete newPreviewUrls[index];
          setPreviewUrls(newPreviewUrls);
        }

        // Clear the file in form state
        setValue(`images.${index}.image`, null);
      }
    },
    [setValue, previewUrls]
  );

  const handleDrag = useCallback((e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(index);
    } else if (e.type === "dragleave") {
      setDragActive(null);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent, index: number) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(null);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const file = e.dataTransfer.files[0];
        if (file.type.startsWith("image/")) {
          handleFileChange(index, file);
        }
      }
    },
    [handleFileChange]
  );

  const getImagePreview = (index: number, fieldValue: File | string | null) => {
    // First check if we have a preview URL (for newly uploaded files)
    if (previewUrls[index]) {
      return previewUrls[index];
    }

    // Then check if fieldValue is a File object
    if (fieldValue instanceof File) {
      const url = URL.createObjectURL(fieldValue);
      setPreviewUrls((prev) => ({ ...prev, [index]: url }));
      return url;
    }

    // Finally check if fieldValue is a string URL (existing image)
    if (typeof fieldValue === "string" && fieldValue) {
      return fieldValue;
    }

    return null;
  };



  return (
    <Card className="shadow-lg">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center justify-between text-gray-800">
          <div className="flex items-center gap-2">
            Product Images
            <Badge variant="secondary" className="ml-2">
              {fields.length} {fields.length === 1 ? "image" : "images"}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button
              type="button"
              onClick={addNewImage}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white shadow-sm"
            >
              <Plus size={16} />
              Add Image
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 p-6">
        {fields.map((field, index) => (
          <Card
            key={field.id}
            className="border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200 shadow-sm"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Eye size={18} className="text-gray-600" />
                  <h4 className="font-semibold text-gray-800">
                    Image {index + 1}
                  </h4>
                </div>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => removeImage(index)}
                  className="flex items-center gap-1 hover:bg-red-600"
                >
                  <Trash2 size={14} />
                  Remove
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Image Upload with Preview */}
                <div className="lg:col-span-1">
                  <FormField
                    name={`images.${index}.image`}
                    control={control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-gray-700">
                          Image File
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-3">
                            {/* Hidden file input */}
                            <input
                              ref={(el) => {
                                fileInputRefs.current[index] = el;
                              }}
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files?.[0] || null;
                                handleFileChange(index, file);
                              }}
                              className="hidden"
                            />

                            {/* Drag & Drop Area */}
                            <div
                              className={`relative border-2 border-dashed rounded-lg p-4 text-center transition-colors duration-200 cursor-pointer ${
                                dragActive === index
                                  ? "border-primary bg-primary/5"
                                  : "border-gray-300 hover:border-gray-400"
                              }`}
                              onDragEnter={(e) => handleDrag(e, index)}
                              onDragLeave={(e) => handleDrag(e, index)}
                              onDragOver={(e) => handleDrag(e, index)}
                              onDrop={(e) => handleDrop(e, index)}
                              onClick={() =>
                                fileInputRefs.current[index]?.click()
                              }
                            >
                              {getImagePreview(index, field.value) ? (
                                <div className="space-y-2">
                                  <div className="relative w-full h-32">
                                    <Image
                                      src={getImagePreview(index, field.value)!}
                                      alt="Preview"
                                      fill
                                      className="object-cover rounded-md"
                                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                  </div>
                                  <div className="text-xs text-gray-600 space-y-1">
                                    <p>Click or drag to replace</p>
                                    {field.value instanceof File && (
                                      <p className="font-medium">
                                        {field.value.name} (
                                        {Math.round(field.value.size / 1024)}KB)
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                <div className="py-4">
                                  <Upload
                                    size={32}
                                    className="mx-auto mb-2 text-gray-400"
                                  />
                                  <p className="text-sm text-gray-600">
                                    Drag & drop an image here, or click to
                                    select
                                  </p>
                                  <p className="text-xs text-gray-500 mt-1">
                                    Supported formats: JPG, PNG, GIF, WebP
                                  </p>
                                </div>
                              )}
                            </div>

                            {/* Existing image indicator */}
                            {typeof field.value === "string" && field.value && (
                              <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
                                Current: {field.value.split("/").pop()}
                              </div>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Form Fields */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Alt Description */}
                    <FormField
                      name={`images.${index}.image_alt_description`}
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Alt Description
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              value={field.value || ""}
                              className="focus:ring-2 focus:ring-primary focus:border-primary"
                              placeholder="Describe the image..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Color Selection */}
                    <FormField
                      name={`images.${index}.color_id`}
                      control={control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Color
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value || ""}
                          >
                            <FormControl>
                              <SelectTrigger className="focus:ring-2 focus:ring-primary focus:border-primary">
                                <SelectValue placeholder="Select a color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem
                                  key={color.id}
                                  value={color.id.toString()}
                                >
                                  {color.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Stock */}
                    <FormField
                      name={`images.${index}.stock`}
                      control={control}
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-sm font-medium text-gray-700">
                            Stock for this variant
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              {...field}
                              value={field.value || ""}
                              className="focus:ring-2 focus:ring-primary focus:border-primary"
                              placeholder="Enter stock quantity..."
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Size Selection */}
                  <div className="space-y-3">
                    <FormLabel className="text-sm font-medium text-gray-700">
                      Available Sizes
                    </FormLabel>
                    <div className="flex flex-wrap gap-2 min-h-[2rem]">
                      {(images[index]?.size_ids || []).length > 0 ? (
                        (images[index]?.size_ids || []).map((sizeId) => (
                          <Badge
                            key={sizeId}
                            variant="secondary"
                            className="flex items-center gap-1 bg-white text-gray-600"
                          >
                            {getSizeName(sizeId)}
                            <button
                              type="button"
                              onClick={() => removeSizeFromImage(index, sizeId)}
                              className="ml-1 hover:text-red-600 transition-colors"
                            >
                              <X size={12} />
                            </button>
                          </Badge>
                        ))
                      ) : (
                        <div className="text-sm text-gray-500 italic">
                          No sizes selected
                        </div>
                      )}
                    </div>
                    <Select
                      onValueChange={(sizeId) => addSizeToImage(index, sizeId)}
                      value=""
                    >
                      <SelectTrigger className="focus:ring-2 focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Add a size" />
                      </SelectTrigger>
                      <SelectContent>
                        {sizes
                          .filter(
                            (size) =>
                              !(images[index]?.size_ids || []).includes(
                                size.id.toString()
                              )
                          )
                          .map((size) => (
                            <SelectItem
                              key={size.id}
                              value={size.id.toString()}
                            >
                              {size.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {/* Add Image button after all images */}
        {fields.length > 0 && (
          <div className="flex justify-center pt-4">
            <Button
              type="button"
              onClick={addNewImage}
              className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white shadow-sm px-6 py-3"
            >
              <Plus size={16} />
              Add Another Image
            </Button>
          </div>
        )}

        {/* Empty state */}
        {fields.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <ImageIcon size={32} className="text-gray-600" />
              </div>
              <div className="text-lg font-medium text-gray-700 mb-2">
                No images added yet
              </div>
              <p className="text-gray-500 mb-4">
                Upload product images to showcase different colors and variants
              </p>
              <Button
                type="button"
                onClick={addNewImage}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                <Plus size={16} className="mr-2" />
                Add Your First Image
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
