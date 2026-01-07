"use client";
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Video } from '@/types/video';
import { videoFormSchema, VideoFormValues } from '@/schemas/video-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

interface VideoFormProps {
  video?: Video | null;
  onSubmit: (data: VideoFormValues) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const VideoForm: React.FC<VideoFormProps> = ({ video = null, onSubmit, onCancel, isLoading = false }) => {
  const isEditMode = Boolean(video);

  const form = useForm<VideoFormValues>({
    resolver: zodResolver(videoFormSchema),
    defaultValues: {
      title: '',
      url: '',
    },
  });

  useEffect(() => {
    if (isEditMode && video) {
      form.reset({
        title: video.title || '',
        url: video.url || '',
      });
    }
  }, [video, isEditMode, form]);

  const handleSubmit = (data: VideoFormValues) => {
    onSubmit(data);
  };

  return (
    <div className="max-w-2xl p-6 mx-auto bg-white rounded-lg shadow-md border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title *</FormLabel>
                <FormControl>
                  <Input placeholder="Enter video title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Video URL *</FormLabel>
                <FormControl>
                  <Input placeholder="https://example.com/video" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end pt-6 space-x-4 border-t">
            <Button type="button" className='cursor-pointer' variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="bg-gray-900 text-white cursor-pointer hover:bg-gray-800"
            >
              {isLoading ? 'Saving...' : `${isEditMode ? 'Update' : 'Create'} Video`}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default VideoForm;
