import {
  PartnershipForm,
  PartnershipHeader,
} from "@/components/assistance/partnership";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnership",
  description:
    "Partner with Rugstagram. Explore partnership opportunities, wholesale options, and collaboration possibilities for retailers and interior designers.",
  keywords: [
    "rug partnership",
    "wholesale rugs",
    "rug retailer",
    "interior designer partnership",
    "rug collaboration",
  ],
};

export default function PartnershipPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <PartnershipHeader />
      <PartnershipForm />
    </div>
  );
}
