import { FounderPageClient } from "./FounderPageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Founder",
  description: "Meet the founder of Rugstagram and learn about the passion, vision, and dedication behind our handcrafted Himalayan rug collections.",
  keywords: ["rug founder", "Himalayan rug artisan", "rug business founder", "rug entrepreneur"],
};

export default function FounderPage() {
  return <FounderPageClient />;
}
