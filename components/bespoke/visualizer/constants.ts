import React from "react";
import { ColorGroup, LayerDefinition, RoomType, Theme } from "./types";
import { Sofa, BedDouble, UtensilsCrossed, ArrowRight } from "lucide-react";

export const MATERIALS = [
  'Himalayan Wool (Matte/Plush)', 
  'Pure Silk (High Sheen)', 
  'Bamboo Silk (Soft Sheen)', 
  'Hemp (Coarse/Rustic)', 
  'Allo (Nettle Fiber)', 
  'Pashmina (Ultra Soft)'
];

export const LAYERS: LayerDefinition[] = [
  { id: 'field', label: 'Primary Field (Background)', defaultColorName: 'Ivory' },
  { id: 'pattern', label: 'Main Pattern', defaultColorName: 'Saffron Gold' },
  { id: 'border', label: 'Border Base', defaultColorName: 'Slate Grey' },
  { id: 'accents', label: 'Detail Accents', defaultColorName: 'Tibetan Red' },
];

export const COLOR_GROUPS: ColorGroup[] = [
  {
    name: "Neutrals",
    colors: [
      { name: "Ivory", hex: "#FFFFF0" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Taupe", hex: "#483C32" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Black", hex: "#000000" },
      { name: "Slate Grey", hex: "#708090" },
    ]
  },
  {
    name: "Warm Tones",
    colors: [
      { name: "Tibetan Red", hex: "#8B0000" },
      { name: "Saffron Gold", hex: "#F4C430" },
      { name: "Burnt Orange", hex: "#CC5500" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Rose", hex: "#FF007F" },
    ]
  },
  {
    name: "Cool Tones",
    colors: [
      { name: "Midnight Blue", hex: "#191970" },
      { name: "Teal", hex: "#008080" },
      { name: "Sage", hex: "#9DC183" },
      { name: "Emerald", hex: "#005e38" },
      { name: "Sky", hex: "#87CEEB" },
    ]
  }
];

// Flattened colors for easy lookup
export const ALL_COLORS = COLOR_GROUPS.flatMap(g => g.colors);

export const THEMES: Theme[] = [
  {
    id: 'golden-age',
    name: 'Golden Age',
    colors: { field: 'Saffron Gold', pattern: 'Ivory', border: 'Tibetan Red', accents: 'Black' },
    materials: { field: 'Pure Silk (High Sheen)', pattern: 'Himalayan Wool (Matte/Plush)', border: 'Himalayan Wool (Matte/Plush)', accents: 'Pure Silk (High Sheen)' }
  },
  {
    id: 'midnight-luxe',
    name: 'Midnight Luxe',
    colors: { field: 'Midnight Blue', pattern: 'Ivory', border: 'Charcoal', accents: 'Saffron Gold' },
    materials: { field: 'Himalayan Wool (Matte/Plush)', pattern: 'Pure Silk (High Sheen)', border: 'Himalayan Wool (Matte/Plush)', accents: 'Pure Silk (High Sheen)' }
  },
  {
    id: 'natural-earth',
    name: 'Natural Earth',
    colors: { field: 'Cream', pattern: 'Taupe', border: 'Sage', accents: 'Terracotta' },
    materials: { field: 'Hemp (Coarse/Rustic)', pattern: 'Himalayan Wool (Matte/Plush)', border: 'Allo (Nettle Fiber)', accents: 'Himalayan Wool (Matte/Plush)' }
  },
  {
    id: 'monochrome',
    name: 'Modern Mono',
    colors: { field: 'Black', pattern: 'Slate Grey', border: 'Charcoal', accents: 'Ivory' },
    materials: { field: 'Bamboo Silk (Soft Sheen)', pattern: 'Bamboo Silk (Soft Sheen)', border: 'Himalayan Wool (Matte/Plush)', accents: 'Pure Silk (High Sheen)' }
  }
];

export const getRoomTypes = (): RoomType[] => [
  { id: 'living', name: 'Living Room', icon: React.createElement(Sofa, { className: "w-5 h-5" }), prompt: "A modern luxury living room with a beige sofa, wooden coffee table, and large windows." },
  { id: 'bedroom', name: 'Bedroom', icon: React.createElement(BedDouble, { className: "w-5 h-5" }), prompt: "A cozy master bedroom with soft lighting, a king-sized bed, and oak flooring." },
  { id: 'hallway', name: 'Hallway', icon: React.createElement(ArrowRight, { className: "w-5 h-5" }), prompt: "A long, elegant hallway gallery with white walls and warm lighting." },
  { id: 'dining', name: 'Dining Room', icon: React.createElement(UtensilsCrossed, { className: "w-5 h-5" }), prompt: "A formal dining room with a mahogany table and crystal chandelier." },
];

export const DEMO_TEMPLATE = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTUwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjE1MCIgZmlsbD0id2hpdGUiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0xMCAxMCBIMTAgVjE0MCBIMTAgWiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIi8+PHJlY3QgeD0iMTUiIHk9IjE1IiB3aWR0aD0iNzAiIGhlaWdodD0iMTIwIiBmaWxsPSJub25lIiBzdHJva2U9ImJsYWNrIiBzdHJva2Utd2lkdGg9IjEiLz48Y2lyY2xlIGN4PSI1MCIgY3k9Ijc1IiByPSIyMCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTUwIDU1IEw1MCA5NSIgc3Ryb2tlPSJibGFjayIvPjxwYXRoIGQ9Ik0zMCA3NSBMNzAgNzUiIHN0cm9rZT0iYmxhY2siLz48L3N2Zz4=";

