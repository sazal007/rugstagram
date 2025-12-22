import { CustomRugs } from "@/components/bespoke";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bespoke Rugs",
  description: "Create your own custom handcrafted rug with Rugstagram's bespoke service. Customize existing designs or design your own unique rug from scratch.",
  keywords: ["custom rugs", "bespoke rugs", "design your own rug", "custom rug design", "personalized rugs", "made-to-order rugs"],
};

export default function BespokePage() {
  return <CustomRugs />;
}
