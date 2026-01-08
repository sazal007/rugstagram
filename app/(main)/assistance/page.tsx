import { ContactHeader } from "@/components/assistance/contact/ContactHeader";
import { ContactGrid } from "@/components/assistance/contact/ContactGrid";
import { FAQSection } from "@/components/assistance/faq/FAQSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Rugstagram. Find answers to frequently asked questions, contact information, and customer support for your rug inquiries.",
  keywords: [
    "rug contact",
    "customer support",
    "rug FAQ",
    "contact rugstagram",
    "rug inquiries",
  ],
};

export default function AssistancePage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24 space-y-24">
      <ContactHeader />
      <ContactGrid />
      <FAQSection />
    </div>
  );
}
