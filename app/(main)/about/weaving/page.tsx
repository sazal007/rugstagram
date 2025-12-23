import { WeavingPageClient } from "./WeavingPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Art of Weaving",
  description: "Discover the traditional art of Himalayan rug weaving. Learn about our meticulous process from wool sorting to final finishing, preserving centuries-old techniques.",
  keywords: ["rug weaving", "Himalayan weaving techniques", "handcrafted rug process", "traditional rug making", "rug craftsmanship"],
};

export default function WeavingPage() {
  return <WeavingPageClient />;
}
