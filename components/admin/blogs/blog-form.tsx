import React, { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BlogPost, BlogTag } from '@/types/blog';
import { useBlogCategories, useBlogTags } from '@/hooks/use-blogs';
import { blogFormSchema, BlogFormValues } from '@/schemas/blog-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Badge } from '@/components/ui/badge';
import { Check, ChevronsUpDown, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import ReusableQuill from '@/components/ui/tip-tap';

interface BlogFormProps {
  blog?: BlogPost | null;
  onSubmit: (data: BlogFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog = null, onSubmit, onCancel, isLoading = false }) => {
  const isEditMode = Boolean(blog);
  const { data: categories, isLoading: isLoadingCategories } = useBlogCategories();
  const { data: allTags, isLoading: isLoadingTags } = useBlogTags();
  
  const initializedRef = React.useRef(false);

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: '',
      description: '',
      meta_title: '',
      meta_description: '',
      thumbnail_image: null,
      thumbnail_image_alt_description: '',
      category_id: '',
      tags_id: [],
    },
  });

  const watchedTagIds = useWatch({
    control: form.control,
    name: 'tags_id',
    defaultValue: [],
  });

  const selectedTags = allTags?.filter(tag => watchedTagIds?.includes(tag.id)) || [];

  useEffect(() => {
    if (isEditMode && blog && categories && !initializedRef.current) {
      const blogTags = blog.tags || [];
      const categoryExists = categories.some(cat => cat.id === blog.category?.id);
      
      form.reset({
        title: blog.title || '',
        description: blog.description || '',
        meta_title: blog.meta_title || '',
        meta_description: blog.meta_description || '',
        thumbnail_image_alt_description: blog.thumbnail_image_alt_description || '',
        category_id: categoryExists ? String(blog.category?.id || '') : '',
        tags_id: blogTags.map(tag => tag.id),
      });
      
      initializedRef.current = true;
    }
  }, [blog, categories, isEditMode, form]);

  const handleTagToggle = (tag: BlogTag) => {
    const currentTagIds = form.getValues('tags_id') || [];
    let newTagIds: number[];
    if (currentTagIds.includes(tag.id)) {
      newTagIds = currentTagIds.filter(id => id !== tag.id);
    } else {
      newTagIds = [...currentTagIds, tag.id];
    }
    form.setValue('tags_id', newTagIds, { shouldValidate: true });
  };

  const handleSubmit = (data: BlogFormValues) => {
    let thumbnailImage: File | null = null;

    if (data.thumbnail_image instanceof FileList && data.thumbnail_image.length > 0) {
      thumbnailImage = data.thumbnail_image[0];
    } else if (data.thumbnail_image instanceof File) {
      thumbnailImage = data.thumbnail_image;
    }

    const transformedData = {
      ...data,
      thumbnail_image: thumbnailImage,
      tags_id: data.tags_id && Array.isArray(data.tags_id) ? data.tags_id : [],
      category_id: data.category_id ? String(data.category_id) : '',
    };
    
    console.log('Submitting transformed data:', transformedData);
    onSubmit(transformedData);
  };

  const fileRef = form.register('thumbnail_image');

  return (
    <div className="max-w-4xl p-6 mx-auto bg-white rounded-lg shadow-md">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter blog title" {...field} />
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
                    placeholder="Write your blog description here..."
                    height="250px"
                    toolbar="advanced"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="p-4 border rounded-md space-y-4">
             <h3 className="text-lg font-medium">SEO Information</h3>
            <FormField
                control={form.control}
                name="meta_title"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Meta Title</FormLabel>
                    <FormControl>
                    <Input placeholder="SEO friendly title" {...field} />
                    </FormControl>
                    <FormDescription>{field.value?.length || 0}/60 characters</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="meta_description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Meta Description</FormLabel>
                    <FormControl>
                    <Textarea placeholder="SEO friendly description" rows={3} {...field} />
                    </FormControl>
                    <FormDescription>{field.value?.length || 0}/160 characters</FormDescription>
                    <FormMessage />
                </FormItem>
                )}
            />
          </div>

          <div className="p-4 border rounded-md space-y-4">
            <h3 className="text-lg font-medium">Media & Taxonomies</h3>
             <FormField
                control={form.control}
                name="thumbnail_image"
                render={() => (
                    <FormItem>
                        <FormLabel>Thumbnail Image</FormLabel>
                        <FormControl>
                            <Input type="file" {...fileRef} />
                        </FormControl>
                        <FormDescription>
                            {isEditMode && "Leave empty to keep current image."}
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            {isEditMode && blog?.thumbnail_image && (
                <div className="mt-2">
                    <p className="text-sm text-gray-600">Current image:</p>
                    <Image src={blog.thumbnail_image} alt="Current thumbnail" width={128} height={128} className="object-cover mt-1 rounded-md" />
                </div>
            )}
             <FormField
                control={form.control}
                name="thumbnail_image_alt_description"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Alt Description</FormLabel>
                    <FormControl>
                    <Input placeholder="Image alt description for accessibility" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="category_id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Category *</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value} 
                          disabled={isLoadingCategories}
                        >
                            <FormControl>
                                <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {categories?.map(category => (
                                <SelectItem key={category.id} value={String(category.id)}>
                                    {category.title}
                                </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="tags_id"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value?.length && "text-muted-foreground"
                                    )}
                                    disabled={isLoadingTags}
                                >
                                    <span className="truncate">Select tags</span>
                                    <ChevronsUpDown className="w-4 h-4 ml-2 opacity-50 shrink-0" />
                                </Button>
                                </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
                                <Command>
                                    <CommandInput placeholder="Search tags..." />
                                    <CommandList>
                                    <CommandEmpty>No tags found.</CommandEmpty>
                                    <CommandGroup>
                                        {allTags?.map(tag => (
                                        <CommandItem
                                            value={tag.title}
                                            key={tag.id}
                                            onSelect={() => handleTagToggle(tag)}
                                        >
                                            <Check
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                field.value?.includes(tag.id) ? "opacity-100" : "opacity-0"
                                            )}
                                            />
                                            {tag.title}
                                        </CommandItem>
                                        ))}
                                    </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                         <div className="flex flex-wrap gap-2 pt-2">
                            {selectedTags.map(tag => (
                                <Badge key={tag.id} variant="outline">
                                    {tag.title}
                                    <button type="button" onClick={() => handleTagToggle(tag)} className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                        <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            ))}
                        </div>
                        <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <div className="flex justify-end pt-6 space-x-4 border-t ">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading} className="bg-gray-600 cursor-pointer text-white hover:bg-gray-700">
              {isLoading ? 'Saving...' : `${isEditMode ? 'Update' : 'Create'} Blog`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default BlogForm;