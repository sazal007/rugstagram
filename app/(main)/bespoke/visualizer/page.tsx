import { RugVisualizer } from "@/components/bespoke/visualizer";
import { CommingSoon } from "@/components/layout/comming-soon";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rug Visualizer",
  description:
    "Visualize and design your custom rug with our interactive AI-powered rug visualizer. Choose colors, patterns, sizes, and see your design come to life.",
  keywords: [
    "rug visualizer",
    "custom rug designer",
    "AI rug design",
    "rug design tool",
    "visualize rug",
    "rug customization tool",
  ],
};

export default function BespokeVisualizerPage() {
  return <CommingSoon />;
}
