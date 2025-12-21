"use client";

import {
  ContactHeader,
  ContactGrid,
  FAQSection,
} from "@/components/assistance";

export default function AssistancePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <ContactHeader />
      <ContactGrid />
      <FAQSection />
    </div>
  );
}
