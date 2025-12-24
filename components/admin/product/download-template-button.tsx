import { Download } from 'lucide-react';
import { useState } from 'react';
import { fetchProductTemplate } from '@/services/download';
import { Button } from '@/components/ui/button';

const DownloadTemplateButton = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default behavior and stop propagation
    e.preventDefault();
    e.stopPropagation();
    
    if (isDownloading) return; // Prevent multiple clicks
    
    setIsDownloading(true);
    
    try {
      // Direct API call without React Query
      const data = await fetchProductTemplate();
      
      if (data) {
        // Create blob URL and trigger download
        const url = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'product-template.xlsx');
        link.style.display = 'none'; // Hide the link
        document.body.appendChild(link);
        link.click();
        
        // Cleanup
        setTimeout(() => {
          link.remove();
          window.URL.revokeObjectURL(url);
        }, 100);
      }
    } catch (error) {
      console.error('Download error:', error);
      // Optionally show a simple alert instead of toast
      // alert('Download failed. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <Button
      type="button" // Explicitly set button type
      variant="outline"
      onClick={handleDownload}
      disabled={isDownloading}
      size="sm"
      className="text-white bg-gray-500 hover:bg-gray-600 hover:text-white"
    >
      <Download className={`h-4 w-4 sm:mr-2 ${isDownloading ? 'animate-pulse' : ''}`} />
      <span className="hidden sm:inline">
        {isDownloading ? 'Downloading...' : 'Download Template'}
      </span>
    </Button>
  );
};

export default DownloadTemplateButton;