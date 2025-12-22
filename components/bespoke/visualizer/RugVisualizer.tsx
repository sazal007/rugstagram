"use client";

import { useState } from "react";
import { VisualizerHeader } from "./VisualizerHeader";
import { ModeTabs } from "./ModeTabs";
import { TemplateUpload } from "./TemplateUpload";
import { ThemeSelector } from "./ThemeSelector";
import { LayerCustomizer } from "./LayerCustomizer";
import { RoomSelector } from "./RoomSelector";
import { PreviewArea } from "./PreviewArea";
import { ActionFooter } from "./ActionFooter";
import {
  LAYERS,
  THEMES,
  getRoomTypes,
  ALL_COLORS,
  MATERIALS,
  DEMO_TEMPLATE,
} from "./constants";
import { LayerConfig, Theme, RoomType, Color } from "./types";

export const RugVisualizer: React.FC = () => {
  // --- State ---
  const [mode, setMode] = useState<"design" | "room">("design");
  const [templateImage, setTemplateImage] = useState<string | null>(null);

  // Layer Config State
  const [layerConfig, setLayerConfig] = useState<Record<string, LayerConfig>>(
    () => {
      const initial: Record<string, LayerConfig> = {};
      LAYERS.forEach((l) => {
        const color =
          ALL_COLORS.find((c) => c.name === l.defaultColorName) ||
          ALL_COLORS[0];
        initial[l.id] = {
          color: color,
          material: MATERIALS[0],
        };
      });
      return initial;
    }
  );

  const [selectedRoom, setSelectedRoom] = useState<RoomType>(getRoomTypes()[0]);
  const [generatedRugImage, setGeneratedRugImage] = useState<string | null>(
    null
  );
  const [generatedRoomImage, setGeneratedRoomImage] = useState<string | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setTemplateImage(e.target?.result as string);
        setGeneratedRugImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateLayer = (
    layerId: string,
    field: "color" | "material",
    value: Color | string
  ) => {
    setLayerConfig((prev) => ({
      ...prev,
      [layerId]: {
        ...prev[layerId],
        [field]: value,
      },
    }));
  };

  const applyTheme = (theme: Theme) => {
    const newConfig: Record<string, LayerConfig> = {};
    LAYERS.forEach((l) => {
      const colorName = theme.colors[l.id];
      const materialName = theme.materials[l.id];
      const color =
        ALL_COLORS.find((c) => c.name === colorName) || ALL_COLORS[0];
      newConfig[l.id] = {
        color: color,
        material: materialName || MATERIALS[0],
      };
    });
    setLayerConfig(newConfig);
  };

  const handleGenerateRug = async () => {
    const baseImage = templateImage || DEMO_TEMPLATE;

    setIsLoading(true);
    setError(null);
    setGeneratedRugImage(null);
    setGeneratedRoomImage(null);

    try {
      // Note: You'll need to install @google/genai package
      // npm install @google/genai
      // Also set NEXT_PUBLIC_GOOGLE_GENAI_API_KEY in your .env.local

      // Dynamic import to avoid SSR issues
      const { GoogleGenAI } = await import("@google/genai");

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Google GenAI API key not configured. Please set NEXT_PUBLIC_GOOGLE_GENAI_API_KEY in your .env.local file."
        );
      }

      const ai = new GoogleGenAI({ apiKey });
      const base64Data = baseImage.split(",")[1];

      // Constructing a detailed prompt for 3D Texturing
      const prompt = `
        You are a master 3D texture artist and carpet weaver.
        Input: A reference image of a rug pattern (top-down view).
        Task: Render a realistic, high-resolution, 3D visualization of this rug.
        
        CRITICAL TEXTURE REQUIREMENTS (Make it look 3D):
        - **Carved/Embossed Effect**: The pattern should look hand-carved with visible depth between layers.
        - **Pile Height**: Show the thickness of the knots. The rug should look plush and tactile.
        - **Lighting & Shadows**: Use realistic lighting to create small shadows within the pattern crevices (Ambient Occlusion).
        - **Material Physics**:
            - **Silk**: Must have a visible sheen/luster, reflecting light on the raised parts.
            - **Wool**: Must appear matte, soft, and fuzzy, absorbing light.
            - **Hemp/Allo**: Must look coarse, fibrous, and slightly irregular.

        Layer Specifications:
        1. ${LAYERS[0].label}: Color ${layerConfig["field"].color.name} (${layerConfig["field"].color.hex}), Material: ${layerConfig["field"].material}.
        2. ${LAYERS[1].label}: Color ${layerConfig["pattern"].color.name} (${layerConfig["pattern"].color.hex}), Material: ${layerConfig["pattern"].material}.
        3. ${LAYERS[2].label}: Color ${layerConfig["border"].color.name} (${layerConfig["border"].color.hex}), Material: ${layerConfig["border"].material}.
        4. ${LAYERS[3].label}: Color ${layerConfig["accents"].color.name} (${layerConfig["accents"].color.hex}), Material: ${layerConfig["accents"].material}.

        Final Output:
        - Maintain the EXACT geometry of the input pattern.
        - Apply the colors strictly to the specified areas.
        - The final image should look like a photograph of a real physical rug, not a flat vector.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: "image/png" } },
            { text: prompt },
          ],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            setGeneratedRugImage(
              `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
            );
            break;
          }
        }
      } else {
        throw new Error("No image generated");
      }
    } catch (err: unknown) {
      console.error("Rug Gen Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to generate design. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateRoom = async () => {
    if (!generatedRugImage) return;
    setIsLoading(true);
    setError(null);
    setGeneratedRoomImage(null);

    try {
      // Dynamic import to avoid SSR issues
      const { GoogleGenAI } = await import("@google/genai");

      const apiKey = process.env.NEXT_PUBLIC_GOOGLE_GENAI_API_KEY;
      if (!apiKey) {
        throw new Error(
          "Google GenAI API key not configured. Please set NEXT_PUBLIC_GOOGLE_GENAI_API_KEY in your .env.local file."
        );
      }

      const ai = new GoogleGenAI({ apiKey });
      const rugBase64 = generatedRugImage.split(",")[1];

      const prompt = `
        Compose a photorealistic interior design image.
        Context: ${selectedRoom.prompt}
        Task: Place the provided rug image on the floor of this room.
        Constraint: The rug pattern, colors, and 3D texture must match the provided image exactly. The rug should be positioned naturally on the floor with correct perspective, scaling, and lighting shadows casting onto the floor.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash-image",
        contents: {
          parts: [
            { inlineData: { data: rugBase64, mimeType: "image/png" } },
            { text: prompt },
          ],
        },
      });

      const parts = response.candidates?.[0]?.content?.parts;
      if (parts) {
        for (const part of parts) {
          if (part.inlineData) {
            setGeneratedRoomImage(
              `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`
            );
            break;
          }
        }
      }
    } catch (err: unknown) {
      console.error("Room Gen Error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to visualize in room. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <VisualizerHeader />

      <div className="max-w-7xl mx-auto px-6 py-8 h-[calc(100vh-64px)] grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls Sidebar */}
        <div className="lg:col-span-5 flex flex-col h-full bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xl">
          <ModeTabs
            mode={mode}
            onModeChange={setMode}
            canSwitchToRoom={!!generatedRugImage}
          />

          <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
            {mode === "design" ? (
              <>
                <TemplateUpload
                  templateImage={templateImage}
                  onFileUpload={handleFileUpload}
                />

                <ThemeSelector themes={THEMES} onThemeSelect={applyTheme} />

                <LayerCustomizer
                  layers={LAYERS}
                  layerConfig={layerConfig}
                  onLayerUpdate={updateLayer}
                />
              </>
            ) : (
              <>
                <RoomSelector
                  rooms={getRoomTypes()}
                  selectedRoom={selectedRoom}
                  onRoomSelect={setSelectedRoom}
                />
              </>
            )}
          </div>

          <ActionFooter
            mode={mode}
            isLoading={isLoading}
            error={error}
            onGenerateRug={handleGenerateRug}
            onGenerateRoom={handleGenerateRoom}
          />
        </div>

        {/* Preview Area */}
        <PreviewArea
          mode={mode}
          isLoading={isLoading}
          templateImage={templateImage}
          generatedRugImage={generatedRugImage}
          generatedRoomImage={generatedRoomImage}
          selectedRoomName={selectedRoom.name}
          onSwitchToRoom={() => setMode("room")}
        />
      </div>
    </div>
  );
};
