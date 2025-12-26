"use client";

import { motion } from "motion/react";
import { Download, Image as ImageIcon, Sofa, ArrowRight } from "lucide-react";

interface PreviewAreaProps {
  mode: 'design' | 'room';
  isLoading: boolean;
  templateImage: string | null;
  generatedRugImage: string | null;
  generatedRoomImage: string | null;
  selectedRoomName: string;
  onSwitchToRoom: () => void;
}

export const PreviewArea: React.FC<PreviewAreaProps> = ({
  mode,
  isLoading,
  templateImage,
  generatedRugImage,
  generatedRoomImage,
  selectedRoomName,
  onSwitchToRoom,
}) => {
  return (
    <div className="lg:col-span-7 bg-gray-100 rounded-xl border border-gray-200 flex items-center justify-center relative overflow-hidden p-8">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative w-full max-w-xl bg-white shadow-2xl rounded-sm overflow-hidden min-h-[500px] flex items-center justify-center">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="w-20 h-20 border-4 border-gray-100 border-t-accent rounded-full animate-spin" />
            <div className="text-center space-y-2">
              <p className="text-lg font-serif italic text-primary animate-pulse">
                {mode === 'design' ? "Weaving your masterpiece..." : "Designing your room..."}
              </p>
              <p className="text-xs text-muted">Calculating pile depth & light reflections...</p>
            </div>
          </div>
        ) : mode === 'design' ? (
          generatedRugImage ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="relative group w-full h-full"
            >
              <img 
                src={generatedRugImage} 
                alt="AI Generated Rug" 
                className="w-full h-full object-contain max-h-[70vh]" 
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  href={generatedRugImage} 
                  download="my-custom-rug.png" 
                  className="bg-white/90 p-2 rounded-full shadow-lg hover:text-accent"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
              {/* Floating CTA to move to next step */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <button 
                  onClick={onSwitchToRoom}
                  className="bg-accent text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:bg-primary transition-all hover:scale-105"
                >
                  Visualize in Room <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="text-center opacity-40 p-12">
              {templateImage ? (
                <img 
                  src={templateImage} 
                  alt="Base" 
                  className="w-64 h-auto mx-auto mb-4 grayscale opacity-50 shadow-lg rounded" 
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 mx-auto mb-4 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <p className="font-serif text-lg">3D Design Studio</p>
              <p className="text-sm mt-2">Upload a flat image to generate a textured rug</p>
            </div>
          )
        ) : (
          // Room Mode Preview
          generatedRoomImage ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="relative group w-full h-full"
            >
              <img 
                src={generatedRoomImage} 
                alt="Room Visualization" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  href={generatedRoomImage} 
                  download={`my-rug-in-${selectedRoomName.toLowerCase().replace(' ', '-')}.png`} 
                  className="bg-white/90 p-2 rounded-full shadow-lg hover:text-accent"
                >
                  <Download className="w-5 h-5" />
                </a>
              </div>
              <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">
                {selectedRoomName}
              </div>
            </motion.div>
          ) : (
            <div className="text-center opacity-40 p-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Sofa className="w-10 h-10 text-muted" />
              </div>
              <p className="font-serif text-lg mb-2">Room Visualization</p>
              <p className="text-sm max-w-xs mx-auto">
                Click &quot;Visualize in Room&quot; to see your design placed in a {selectedRoomName}.
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

