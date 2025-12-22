"use client";

import { LayoutTemplate, Sofa } from "lucide-react";

interface ModeTabsProps {
  mode: 'design' | 'room';
  onModeChange: (mode: 'design' | 'room') => void;
  canSwitchToRoom: boolean;
}

export const ModeTabs: React.FC<ModeTabsProps> = ({ mode, onModeChange, canSwitchToRoom }) => {
  return (
    <div className="flex border-b border-gray-100 bg-gray-50">
      <button 
        onClick={() => onModeChange('design')}
        className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
          mode === 'design' 
            ? 'text-primary bg-white border-b-2 border-primary shadow-sm' 
            : 'text-muted hover:text-primary'
        }`}
      >
        <LayoutTemplate className="w-4 h-4" /> Studio
      </button>
      <button 
        onClick={() => { if(canSwitchToRoom) onModeChange('room'); }}
        disabled={!canSwitchToRoom}
        className={`flex-1 py-4 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all ${
          mode === 'room' 
            ? 'text-primary bg-white border-b-2 border-primary shadow-sm' 
            : 'text-muted'
        } ${!canSwitchToRoom ? 'opacity-50 cursor-not-allowed' : 'hover:text-primary'}`}
      >
        <Sofa className="w-4 h-4" /> Room View
      </button>
    </div>
  );
};

