import { TermsOfService } from "@/components/terms/TermsOfService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Rugkala",
  description: "Read our Terms and Conditions, Copyright, and Privacy Policies.",
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
