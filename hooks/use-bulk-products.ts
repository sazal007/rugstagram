import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadExcelFile, BulkUploadResponse, UploadFiles } from '@/services/bulk-upload';
import { useToast } from '@/hooks/use-toast';

interface UseBulkUploadOptions {
  onUploadSuccess?: () => void;
}

export const useBulkUpload = ({ onUploadSuccess }: UseBulkUploadOptions = {}) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const mutation = useMutation({
    mutationFn: uploadExcelFile,
    onSuccess: (data: BulkUploadResponse) => {
      toast({
        title: 'Upload successful',
        description: `${data.processed || 0} products processed successfully.`,
        className: 'bg-emerald-50 border-emerald-200 text-emerald-900'
      });
      
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      // Call success callback
      onUploadSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: 'Upload failed',
        description: error.message,
        variant: 'destructive'
      });
    }
  });

  return {
    uploadFile: (files: UploadFiles) => mutation.mutate(files),
    isUploading: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset
  };
};