import React from "react";

export interface Color {
  name: string;
  hex: string;
}

export interface ColorGroup {
  name: string;
  colors: Color[];
}

export interface RoomType {
  id: string;
  name: string;
  icon: React.ReactNode;
  prompt: string;
}

export interface LayerDefinition {
  id: string;
  label: string;
  defaultColorName: string;
}

export interface Theme {
  id: string;
  name: string;
  colors: Record<string, string>; // layerId -> colorName
  materials: Record<string, string>; // layerId -> materialName
}

export interface LayerConfig {
  color: Color;
  material: string;
}

