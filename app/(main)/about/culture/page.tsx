import { CulturePageClient } from "./CulturePageClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Culture",
  description: "Learn about Rugstagram's company culture, values, and commitment to preserving traditional Himalayan rug weaving techniques while embracing modern design.",
  keywords: ["rug company culture", "Himalayan rug tradition", "rug weaving heritage", "sustainable rug making"],
};

export default function CulturePage() {
  return <CulturePageClient />;
}
