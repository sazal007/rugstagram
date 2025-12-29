import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadExcelFile, BulkUploadResponse, UploadFiles } from '@/services/bulk-upload';
import { toast } from 'sonner';
import { getErrorMessage } from '@/lib/error-utils';

interface UseBulkUploadOptions {
  onUploadSuccess?: () => void;
}

export const useBulkUpload = ({ onUploadSuccess }: UseBulkUploadOptions = {}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadExcelFile,
    onSuccess: (data: BulkUploadResponse) => {
      toast.success('Upload successful', {
        description: `${data.processed || 0} products processed successfully.`,
      });
      
      // Invalidate products query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['products'] });
      
      // Call success callback
      onUploadSuccess?.();
    },
    onError: (error: Error) => {
      toast.error('Upload failed', {
        description: getErrorMessage(error),
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