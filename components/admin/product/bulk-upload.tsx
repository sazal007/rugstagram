'use client';

import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, FileArchive, X, Loader2 } from 'lucide-react';

import { useToast } from '@/hooks/use-toast';
import { useBulkUpload } from '@/hooks/use-bulk-products';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface BulkUploadComponentProps {
  onUploadSuccess?: () => void;
}

export default function BulkUploadComponent({ onUploadSuccess }: BulkUploadComponentProps) {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const { uploadFile, isUploading } = useBulkUpload({
    onUploadSuccess: () => {
      setUploadProgress(100);
      // Reset component state
      setExcelFile(null);
      setZipFile(null);
      setUploadProgress(0);
      // Call success callback
      onUploadSuccess?.();
    }
  });

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files) {
      Array.from(e.dataTransfer.files).forEach(file => handleFileSelection(file));
    }
  };

  const handleFileSelection = (file: File) => {
    const excelTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
    ];
    const zipTypes = [
      'application/zip', 
      'application/x-zip-compressed', 
      'application/x-zip'
    ];

    const isExcel = excelTypes.includes(file.type) || file.name.endsWith('.xlsx') || file.name.endsWith('.xls');
    const isZip = zipTypes.includes(file.type) || file.name.endsWith('.zip');

    if (!isExcel && !isZip) {
      toast({
        title: 'Invalid file type',
        description: 'Please select an Excel file (.xlsx, .xls) or Zip file (.zip)',
        variant: 'destructive'
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: 'File too large',
        description: `File ${file.name} is larger than 10MB`,
        variant: 'destructive'
      });
      return;
    }

    if (isExcel) {
      setExcelFile(file);
    } else if (isZip) {
      setZipFile(file);
    }
    setUploadProgress(0);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      Array.from(e.target.files).forEach(file => handleFileSelection(file));
      // Reset input so same file can be selected again if needed
      e.target.value = '';
    }
  };

  const handleUpload = () => {
    if (!excelFile) {
      toast({
        title: 'Excel file missing',
        description: 'Please upload an Excel file to proceed.',
        variant: 'destructive'
      });
      return;
    }
    
    setUploadProgress(10);
    uploadFile({ excelFile, zipFile });
  };

  const removeExcelFile = () => {
    setExcelFile(null);
    setUploadProgress(0);
  };

  const removeZipFile = () => {
    setZipFile(null);
    setUploadProgress(0);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Bulk Upload Products
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {(!excelFile || !zipFile) && (
          <div
            className={`
              border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
              ${dragActive 
                ? 'border-primary bg-gray-50' 
                : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
              }
            `}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Upload Files
            </h3>
            <p className="text-gray-600 mb-4">
              Drag and drop your Excel and Zip files here
            </p>
            <p className="text-sm text-gray-500">
              Supports .xlsx, .xls and .zip files up to 10MB
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls,.zip"
              multiple
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        )}

        <div className="space-y-2">
          {excelFile && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FileSpreadsheet className="h-8 w-8 text-green-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {excelFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(excelFile.size)}
                </p>
              </div>
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeExcelFile}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {zipFile && (
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
              <FileArchive className="h-8 w-8 text-blue-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">
                  {zipFile.name}
                </p>
                <p className="text-sm text-gray-500">
                  {formatFileSize(zipFile.size)}
                </p>
              </div>
              {!isUploading && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={removeZipFile}
                  className="shrink-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {(excelFile || zipFile) && (
          <div className="space-y-4 pt-4 border-t">
            {uploadProgress > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Upload progress</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={isUploading || !excelFile}
                className="flex-1"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload {zipFile ? 'Files' : 'Product Sheet'}
                  </>
                )}
              </Button>
              
              {!isUploading && (
                <Button
                  variant="outline"
                  onClick={() => {
                    removeExcelFile();
                    removeZipFile();
                  }}
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        )}

        <div className="text-xs text-gray-500 space-y-1">
          <p>• Make sure your Excel file follows the correct format</p>
          <p>• All required fields must be filled</p>
          <p>• Zip file is optional but recommended for product images (filenames in Excel must match files in Zip)</p>
        </div>
      </CardContent>
    </Card>
  );
}