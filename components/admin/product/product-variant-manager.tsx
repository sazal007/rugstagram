import React, { useCallback, useRef, useState } from "react";
import {
  Control,
  useFieldArray,
  UseFormRegister, // Keep if used or remove if unused in props
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { ProductFormValues } from "@/schemas/product-form";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import { Color, Size, Quality } from "@/types/product";

interface ProductVariantManagerProps {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
  watch: UseFormWatch<ProductFormValues>;
  colors: Color[] | undefined;
  sizes: Size[] | undefined;
  qualities: Quality[] | undefined;
}

const VariantImages = ({
  nestIndex,
  control,
}: {
  nestIndex: number;
  control: Control<ProductFormValues>;
  setValue: UseFormSetValue<ProductFormValues>;
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `variants.${nestIndex}.images`,
  });

  const [previewUrls, setPreviewUrls] = useState<{ [key: string]: string }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback(
    (files: FileList | null) => {
      if (files) {
        Array.from(files).forEach((file) => {
          if (file.type.startsWith("image/")) {
            // Create preview
            const url = URL.createObjectURL(file);
            setPreviewUrls((prev) => ({ ...prev, [file.name]: url }));

            append({
              image: file,
            });
          }
        });
      }
    },
    [append]
  );

  const getPreview = (fileOrUrl: File | string) => {
    if (fileOrUrl instanceof File) {
      return previewUrls[fileOrUrl.name] || URL.createObjectURL(fileOrUrl);
    }
    return fileOrUrl;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {fields.map((field, index) => {
            const imageVal = field.image;
            return (
          <div key={field.id} className="relative group aspect-square">
            <div className="w-full h-full relative rounded-lg overflow-hidden border bg-muted">
              <Image
                src={getPreview(imageVal)}
                alt="Variant image"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          </div>
        )})}

        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-muted/50 transition-colors aspect-square"
        >
          <Upload className="h-6 w-6 text-muted-foreground mb-2" />
          <span className="text-xs text-muted-foreground text-center">
            Upload Images
          </span>
          <input
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => handleFileChange(e.target.files)}
          />
        </div>
      </div>
    </div>
  );
};

export const ProductVariantManager: React.FC<ProductVariantManagerProps> = ({
  control,
  setValue,
  colors,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const addVariant = () => {
    append({
      color_id: null,
      stock: "0",
      images: [],
    });
  };

  return (
    <Card className="shadow-lg">
      <CardHeader className="p-6">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            Product Variants
            <Badge variant="secondary" className="ml-2">
              {fields.length} {fields.length === 1 ? "variant" : "variants"}
            </Badge>
          </div>
          <Button onClick={addVariant} type="button" className="gap-2">
            <Plus size={16} /> Add Variant
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.map((field, index) => (
          <Card key={field.id} className="border-2 border-gray-100 dark:border-gray-800">
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Variant {index + 1}</Badge>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  type="button"
                >
                  <Trash2 size={16} />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={control}
                  name={`variants.${index}.color_id`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Color</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select Color" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {colors?.map((c) => (
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
                  control={control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Stock</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} value={field.value || ""} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-4 border-t">
                 <FormLabel className="block mb-3">Variant Images</FormLabel>
                 <VariantImages nestIndex={index} control={control} setValue={setValue} />
              </div>
            </CardContent>
          </Card>
        ))}
        {fields.length === 0 && (
          <div className="text-center py-12 bg-muted/30 cursor-pointer rounded-lg border-2 border-dashed">
             <div className="flex flex-col items-center">
               <ImageIcon className="h-10 w-10 text-muted-foreground mb-3" />
               <h3 className="text-lg font-medium">No Variants Added</h3>
               <p className="text-sm text-muted-foreground mb-4">Add variants to manage stock and images.</p>
               <Button onClick={addVariant} type="button">Add First Variant</Button>
             </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
