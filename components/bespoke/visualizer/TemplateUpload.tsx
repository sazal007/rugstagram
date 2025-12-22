"use client";

import { useRef } from "react";
import { Upload, Check } from "lucide-react";

interface TemplateUploadProps {
  templateImage: string | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TemplateUpload: React.FC<TemplateUploadProps> = ({ templateImage, onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shadow-md">1</span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Base Template</h3>
      </div>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className="relative border-2 border-dashed border-gray-200 rounded-lg p-6 text-center cursor-pointer hover:border-accent hover:bg-sand/5 transition-all group overflow-hidden"
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={onFileUpload}
        />
        {templateImage ? (
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 rounded border border-gray-200 overflow-hidden shadow-sm">
              <img src={templateImage} alt="Uploaded" className="w-full h-full object-cover" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-primary">Custom Pattern</p>
              <p className="text-xs text-muted">Click to replace</p>
            </div>
            <Check className="w-5 h-5 text-green-500 ml-auto" />
          </div>
        ) : (
          <div className="space-y-2 relative z-10">
            <Upload className="w-8 h-8 mx-auto text-gray-300 group-hover:text-accent transition-colors" />
            <p className="text-sm font-medium">Upload Pattern Image</p>
            <p className="text-xs text-muted">or use default demo template</p>
          </div>
        )}
      </div>
    </div>
  );
};

