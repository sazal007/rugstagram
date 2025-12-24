import React from "react";
import { Control } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProductFormValues } from "@/schemas/product-form";

interface BaseAttribute {
  id: string | number;
  name: string;
}

interface ProductAttributesProps {
  control: Control<ProductFormValues>;
  sizes: BaseAttribute[] | undefined;
  colors: BaseAttribute[] | undefined;
  textures: BaseAttribute[] | undefined;
  styles: BaseAttribute[] | undefined;
  collaborations: BaseAttribute[] | undefined;
  isLoadingSizes: boolean;
  isLoadingColors: boolean;
  isLoadingTextures: boolean;
  isLoadingStyles: boolean;
  isLoadingCollaborations: boolean;
}

const AttributeSection: React.FC<{
  title: string;
  fieldName: keyof ProductFormValues;
  control: Control<ProductFormValues>;
  attributes: BaseAttribute[] | undefined;
  isLoading: boolean;
}> = ({ title, fieldName, control, attributes, isLoading }) => {
  return (
    <FormField
      name={fieldName}
      control={control}
      render={({ field }) => (
        <FormItem className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <FormLabel className="text-lg font-semibold text-foreground">
                {title}
              </FormLabel>
              
            </div>
            {field.value && field.value.length > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {field.value.length} selected
              </Badge>
            )}
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="w-4 h-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 bg-muted animate-pulse rounded flex-1" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
              {attributes?.map((attribute) => (
                <div
                  key={attribute.id}
                  className={`group relative flex items-center space-x-3 p-3 border rounded-lg transition-all duration-200 hover:border-primary/50 hover:shadow-sm cursor-pointer ${
                    field.value?.includes(String(attribute.id))
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-background"
                  }`}
                >
                  <Checkbox
                    id={`${fieldName}-${attribute.id}`}
                    checked={field.value?.includes(String(attribute.id))}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        field.onChange([...(field.value || []), String(attribute.id)]);
                      } else {
                        field.onChange(
                          field.value?.filter((id: string) => id !== String(attribute.id))
                        );
                      }
                    }}
                    className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                  />
                  <Label
                    htmlFor={`${fieldName}-${attribute.id}`}
                    className="text-sm font-medium text-foreground cursor-pointer flex-1 group-hover:text-primary transition-colors"
                  >
                    {attribute.name}
                  </Label>
                  {field.value?.includes(String(attribute.id)) && (
                    <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && (!attributes || attributes.length === 0) && (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-4xl mb-2 opacity-50">📦</div>
              <p className="text-sm">No {title.toLowerCase()} available</p>
            </div>
          )}
          
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export const ProductAttributes: React.FC<ProductAttributesProps> = ({
  control,
  sizes,
  colors,
  textures,
  styles,
  collaborations,
  isLoadingSizes,
  isLoadingColors,
  isLoadingTextures,
  isLoadingStyles,
  isLoadingCollaborations,
}) => {
  const attributeSections = [
    {
      title: "Sizes",
      fieldName: "size_ids" as keyof ProductFormValues,
      attributes: sizes,
      isLoading: isLoadingSizes,
    },
    {
      title: "Colors",
      fieldName: "color_ids" as keyof ProductFormValues,
      attributes: colors,
      isLoading: isLoadingColors,
    },
    {
      title: "Textures",
      fieldName: "texture_ids" as keyof ProductFormValues,
      attributes: textures,
      isLoading: isLoadingTextures,
    },
    {
      title: "Styles",
      fieldName: "style_ids" as keyof ProductFormValues,
      attributes: styles,
      isLoading: isLoadingStyles,
    },
    {
      title: "Collaborations",
      fieldName: "collaboration_ids" as keyof ProductFormValues,
      attributes: collaborations,
      isLoading: isLoadingCollaborations,
    },
  ];

  return (
    <Card className="shadow-sm border-border/50">
      <CardHeader className="pb-6">
        <div className="flex items-center gap-3">
          <div>
            <CardTitle className="text-xl font-bold">Product Attributes</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your product&quot;s characteristics and features
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-8">
        {attributeSections.map((section, index) => (
          <React.Fragment key={section.fieldName}>
            <AttributeSection
              title={section.title}
              fieldName={section.fieldName}
              control={control}
              attributes={section.attributes}
              isLoading={section.isLoading}
            />
            {index < attributeSections.length - 1 && (
              <Separator className="my-8" />
            )}
          </React.Fragment>
        ))}
      </CardContent>
    </Card>
  );
};