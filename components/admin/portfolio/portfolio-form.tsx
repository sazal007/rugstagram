import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Portfolio, PortfolioFormData } from '@/types/portfolio';
import { portfolioFormSchema, PortfolioFormValues } from '@/schemas/portfolio-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Plus, X, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import ReusableQuill from '@/components/ui/tip-tap';
import { getImageUrl } from '@/utils/image';

interface PortfolioFormProps {
  portfolio?: Portfolio | null;
  onSubmit: (data: PortfolioFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const PortfolioForm: React.FC<PortfolioFormProps> = ({ portfolio = null, onSubmit, onCancel, isLoading = false }) => {
  const isEditMode = Boolean(portfolio);
  const [galleryImages, setGalleryImages] = useState<{ file?: File; preview: string; altText: string; id?: number }[]>([]);

  const form = useForm<PortfolioFormValues>({
    resolver: zodResolver(portfolioFormSchema),
    defaultValues: {
      title: '',
      description: '',
      thumbnail: null,
      thumbnail_alt_description: '',
    },
  });

  const initializedRef = React.useRef(false);

  useEffect(() => {
    if (isEditMode && portfolio && !initializedRef.current) {
      form.reset({
        title: portfolio.title || '',
        description: portfolio.description || '',
        thumbnail_alt_description: portfolio.thumbnail_alt_description || '',
      });
      
      if (portfolio.images) {
        // Defer state update to avoid cascading render lint error
        setTimeout(() => {
          setGalleryImages(portfolio.images.map(img => ({
            id: img.id,
            preview: getImageUrl(img.image),
            altText: img.alt_description
          })));
        }, 0);
      }
      initializedRef.current = true;
    }
  }, [portfolio, isEditMode, form]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue('thumbnail', file);
    }
  };

  const addGalleryImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file),
        altText: ''
      }));
      setGalleryImages([...galleryImages, ...newImages]);
    }
  };

  const removeGalleryImage = (index: number) => {
    const newImages = [...galleryImages];
    const removed = newImages.splice(index, 1)[0];
    if (removed.preview.startsWith('blob:')) {
      URL.revokeObjectURL(removed.preview);
    }
    setGalleryImages(newImages);
  };

  const updateGalleryAltText = (index: number, text: string) => {
    const newImages = [...galleryImages];
    newImages[index].altText = text;
    setGalleryImages(newImages);
  };

  const handleSubmit = (data: PortfolioFormValues) => {
    const formData: PortfolioFormData = {
      ...data,
      gallery: galleryImages
    };
    onSubmit(formData);
  };

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter portfolio title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description *</FormLabel>
                <FormControl>
                  <ReusableQuill
                    value={field.value || ''}
                    onChange={field.onChange}
                    placeholder="Describe this portfolio project..."
                    minHeight="200px"
                    toolbar="standard"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="p-4 border rounded-md space-y-4">
            <h3 className="text-lg font-medium flex items-center gap-2">
              <ImageIcon className="w-5 h-5" /> Thumbnail
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field: { ...field } }) => (
                  <FormItem>
                    <FormLabel>Featured Image *</FormLabel>
                    <FormControl>
                      <Input 
                        type="file" 
                        accept="image/*"
                        onChange={handleThumbnailChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 font-medium">
                      {isEditMode ? "Upload a new image to replace the current thumbnail." : "Recommended size: 800x600px."}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {isEditMode && portfolio?.thumbnail && !form.getValues('thumbnail') && (
                <div className="mt-2 relative w-32 h-32">
                  <Image 
                    src={getImageUrl(portfolio.thumbnail)} 
                    alt="Current thumbnail" 
                    fill 
                    className="object-cover rounded-md border" 
                  />
                </div>
              )}
              {form.getValues('thumbnail') instanceof File && (
                 <div className="mt-2 relative w-32 h-32">
                    <Image 
                      src={URL.createObjectURL(form.getValues('thumbnail') as File)} 
                      alt="Thumbnail preview" 
                      fill 
                      className="object-cover rounded-md border" 
                    />
                 </div>
              )}
            </div>

              <FormField
                control={form.control}
                name="thumbnail_alt_description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail Alt Text *</FormLabel>
                  <FormControl>
                    <Input placeholder="Accessibility description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

          <div className="p-4 border rounded-md space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Gallery Images</h3>
              <div className="relative">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={addGalleryImage}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button type="button" variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-2" /> Add Images
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {galleryImages.map((img, index) => (
                <div key={index} className="p-3 border rounded-lg bg-gray-50 relative group w-fit">
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  >
                    <X className="w-3 h-3" />
                  </button>
                  <div className="relative w-64 h-64">
                    <Image
                      src={img.preview}
                      alt="Gallery item"
                      fill
                      className="object-cover rounded-md border"
                    />
                  </div>
                </div>
              ))}
              {galleryImages.length === 0 && (
                <div className="w-full py-8 text-center border-2 border-dashed rounded-lg text-gray-400 text-sm">
                  No gallery images added yet
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-6 space-x-4 border-t">
            <Button type="button" className='cursor-pointer' variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="bg-gray-900 text-white cursor-pointer hover:bg-gray-800"
            >
              {isLoading ? 'Saving...' : `${isEditMode ? 'Update' : 'Create'} Portfolio`}
            </Button>
          </div>
        </form>
      </Form>
    </div>

  );
};


export default PortfolioForm;
