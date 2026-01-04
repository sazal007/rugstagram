'use client';

import { useState, useRef } from 'react';
import { Upload, FileSpreadsheet, FileArchive, X, Loader2, CheckCircle2 } from 'lucide-react';

import { toast } from 'sonner';
import { useBulkUpload } from '@/hooks/use-bulk-products';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface BulkUploadComponentProps {
  onUploadSuccess?: () => void;
}

interface FileUploaderProps {
  label: string;
  description: string;
  accept: string;
  icon: React.ReactNode;
  file: File | null;
  onFileSelect: (file: File) => void;
  onRemove: () => void;
  isUploading: boolean;
  required?: boolean;
}

function FileUploader({ 
  label, 
  description, 
  accept, 
  icon, 
  file, 
  onFileSelect, 
  onRemove, 
  isUploading,
  required = false
}: FileUploaderProps) {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

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

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
      e.target.value = '';
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-semibold flex items-center justify-between">
        <span className="flex items-center gap-2">
          {label}
          {required && <span className="text-red-500">*</span>}
        </span>
        {!required && <span className="text-[10px] text-muted-foreground uppercase tracking-widest">Optional</span>}
      </label>
      
      {!file ? (
        <div
          className={cn(
            "relative border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer group",
            dragActive 
              ? "border-primary bg-primary/5 ring-4 ring-primary/5" 
              : "border-border hover:border-primary/50 hover:bg-gray-50/50"
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="p-3 rounded-full bg-gray-50 group-hover:bg-primary/10 transition-colors">
              {icon}
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{description}</p>
              <p className="text-xs text-muted-foreground mt-1">Drag and drop or click to upload</p>
            </div>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center gap-3 p-4 bg-gray-50 border border-gray-100 rounded-xl">
          <div className="p-2 rounded-lg bg-white border border-gray-100">
            {icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm text-gray-900 truncate">
              {file.name}
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
              {(file.size / (1024 * 1024)).toFixed(2)} MB
            </p>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            {!isUploading && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onRemove}
                className="h-8 w-8 hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function BulkUploadComponent({ onUploadSuccess }: BulkUploadComponentProps) {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const { uploadFile, isUploading } = useBulkUpload({
    onUploadSuccess: () => {
      setUploadProgress(100);
      setExcelFile(null);
      setZipFile(null);
      setTimeout(() => setUploadProgress(0), 1000);
      onUploadSuccess?.();
    }
  });

  const handleExcelSelect = (file: File) => {
    const isExcel = file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || 
                  ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'].includes(file.type);
    
    if (!isExcel) {
      toast.error('Invalid file type', { description: 'Please select an Excel file (.xlsx or .xls)' });
      return;
    }
    setExcelFile(file);
    setUploadProgress(0);
  };

  const handleZipSelect = (file: File) => {
    const isZip = file.name.endsWith('.zip') || 
                ['application/zip', 'application/x-zip-compressed', 'application/x-zip'].includes(file.type);
    
    if (!isZip) {
      toast.error('Invalid file type', { description: 'Please select a Zip file (.zip)' });
      return;
    }
    setZipFile(file);
    setUploadProgress(0);
  };

  const handleUpload = () => {
    if (!excelFile) {
      toast.error('Excel file required', { description: 'Please select an Excel file to upload products.' });
      return;
    }
    setUploadProgress(10);
    uploadFile({ excelFile, zipFile });
  };

  return (
    <Card className="w-full border-none shadow-none bg-transparent">
      <CardContent className="space-y-8 px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FileUploader
            label="Product Sheet"
            description="Excel data file"
            accept=".xlsx,.xls"
            icon={<FileSpreadsheet className="h-6 w-6 text-green-600" />}
            file={excelFile}
            onFileSelect={handleExcelSelect}
            onRemove={() => setExcelFile(null)}
            isUploading={isUploading}
            required
          />
          
          <FileUploader
            label="Product Images"
            description="Zip (images)"
            accept=".zip"
            icon={<FileArchive className="h-6 w-6 text-blue-600" />}
            file={zipFile}
            onFileSelect={handleZipSelect}
            onRemove={() => setZipFile(null)}
            isUploading={isUploading}
          />
        </div>

        {uploadProgress > 0 && (
          <div className="space-y-2 py-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
              <span>{uploadProgress === 100 ? 'Upload Complete' : 'Processing Upload...'}</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} className="h-1.5" />
          </div>
        )}

        <div className="flex flex-col gap-4">
          <Button
            onClick={handleUpload}
            disabled={isUploading || !excelFile}
            size="lg"
            className="w-full h-12 rounded-xl text-md font-semibold"
          >
            {isUploading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processing Upload...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-5 w-5" />
                Upload All Products
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}