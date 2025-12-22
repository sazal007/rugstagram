"use client";

import { Layers, Sparkles, Check } from "lucide-react";
import { LayerDefinition, ColorGroup, LayerConfig, Color } from "./types";
import { MATERIALS, COLOR_GROUPS } from "./constants";

interface LayerCustomizerProps {
  layers: LayerDefinition[];
  layerConfig: Record<string, LayerConfig>;
  onLayerUpdate: (layerId: string, field: 'color' | 'material', value: Color | string) => void;
}

export const LayerCustomizer: React.FC<LayerCustomizerProps> = ({ 
  layers, 
  layerConfig, 
  onLayerUpdate 
}) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shadow-md">3</span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">Customize Layers</h3>
      </div>
      
      <div className="space-y-4">
        {layers.map((layer) => (
          <div key={layer.id} className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
            <div className="flex items-center gap-2 mb-4">
              <Layers className="w-4 h-4 text-muted" />
              <span className="text-sm font-bold text-primary">{layer.label}</span>
            </div>
            
            {/* Color Groups */}
            <div className="mb-5 space-y-4">
              {COLOR_GROUPS.map((group) => (
                <div key={group.name}>
                  <span className="text-[10px] text-muted uppercase tracking-widest mb-2 block">{group.name}</span>
                  <div className="flex flex-wrap gap-2">
                    {group.colors.map(c => (
                      <button
                        key={c.name}
                        onClick={() => onLayerUpdate(layer.id, 'color', c)}
                        className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 shadow-sm ${
                          layerConfig[layer.id].color.name === c.name 
                            ? 'ring-2 ring-offset-2 ring-primary scale-110 border-white' 
                            : 'border-transparent'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      >
                        {layerConfig[layer.id].color.name === c.name && (
                          <Check className={`w-4 h-4 mx-auto ${['Ivory', 'Cream'].includes(c.name) ? 'text-black' : 'text-white'}`} />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              <div className="mt-2 text-xs font-medium bg-white inline-block px-2 py-1 rounded border border-gray-100">
                Selected: {layerConfig[layer.id].color.name}
              </div>
            </div>

            {/* Material Picker */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3 h-3 text-muted" />
                <span className="text-xs text-muted uppercase tracking-wider">Material & Texture</span>
              </div>
              <select 
                value={layerConfig[layer.id].material}
                onChange={(e) => onLayerUpdate(layer.id, 'material', e.target.value)}
                className="w-full text-sm p-2.5 border border-gray-200 rounded bg-white focus:outline-none focus:border-accent shadow-sm"
              >
                {MATERIALS.map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

