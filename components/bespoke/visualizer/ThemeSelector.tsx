"use client";

import { Theme } from "./types";
import { ALL_COLORS } from "./constants";

interface ThemeSelectorProps {
  themes: Theme[];
  onThemeSelect: (theme: Theme) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  themes,
  onThemeSelect,
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold shadow-md">
          2
        </span>
        <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
          Curated Themes (Optional)
        </h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {themes.map((theme) => (
          <button
            key={theme.id}
            onClick={() => onThemeSelect(theme)}
            className="flex items-center gap-3 p-3 rounded border border-gray-100 hover:border-accent hover:bg-sand/5 transition-all text-left"
          >
            <div className="flex -space-x-1">
              <div
                className="w-4 h-4 rounded-full border border-white"
                style={{
                  backgroundColor: ALL_COLORS.find(
                    (c) => c.name === theme.colors.field
                  )?.hex,
                }}
              />
              <div
                className="w-4 h-4 rounded-full border border-white"
                style={{
                  backgroundColor: ALL_COLORS.find(
                    (c) => c.name === theme.colors.pattern
                  )?.hex,
                }}
              />
            </div>
            <span className="text-xs font-medium">{theme.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};
