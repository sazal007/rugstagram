import { Home } from "@/components/home";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "Welcome to Rugstagram - Discover exquisite handcrafted Himalayan rugs, custom bespoke designs, and premium quality collections. Shop our curated selection of traditional and contemporary rugs.",
  keywords: ["Himalayan rugs", "handcrafted rugs", "custom rugs", "rug collections", "premium rugs"],
};

export default function HomePage() {
  return <Home />;
}
