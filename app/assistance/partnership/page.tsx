"use client";

import {
  PartnershipForm,
  PartnershipHeader,
} from "@/components/assistance/partnership";

export default function PartnershipPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <PartnershipHeader />
      <PartnershipForm />
    </div>
  );
}
