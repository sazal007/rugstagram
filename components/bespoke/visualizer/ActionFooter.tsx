"use client";

import { AlertCircle, RefreshCw, Wand2, Sofa } from "lucide-react";

interface ActionFooterProps {
  mode: 'design' | 'room';
  isLoading: boolean;
  error: string | null;
  onGenerateRug: () => void;
  onGenerateRoom: () => void;
}

export const ActionFooter: React.FC<ActionFooterProps> = ({
  mode,
  isLoading,
  error,
  onGenerateRug,
  onGenerateRoom,
}) => {
  return (
    <div className="p-6 border-t border-gray-100 bg-gray-50">
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 text-xs rounded flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          {error}
        </div>
      )}

      {mode === 'design' ? (
        <button
          onClick={onGenerateRug}
          disabled={isLoading}
          className={`w-full py-4 text-sm uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all rounded-lg ${
            isLoading 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-accent shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin"/> Weaving...
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4"/> Generate 3D Design
            </>
          )}
        </button>
      ) : (
        <button
          onClick={onGenerateRoom}
          disabled={isLoading}
          className={`w-full py-4 text-sm uppercase font-bold tracking-widest flex items-center justify-center gap-2 transition-all rounded-lg ${
            isLoading 
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
              : 'bg-primary text-white hover:bg-accent shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin"/> Rendering Room...
            </>
          ) : (
            <>
              <Sofa className="w-4 h-4"/> Visualize in Room
            </>
          )}
        </button>
      )}
    </div>
  );
};

