import { TermsOfService } from "@/components/terms/TermsOfService";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Rugkala",
  description: "Read our Terms and Conditions, Copyright, and Privacy Policies to understand your rights and obligations when using Rugkala's services.",
  openGraph: {
    title: "Terms of Service | Rugkala",
    description: "Read our Terms and Conditions, Copyright, and Privacy Policies.",
    url: "https://www.rugkala.com/terms-of-service",
    siteName: "Rugkala",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | Rugkala",
    description: "Read our Terms and Conditions, Copyright, and Privacy Policies.",
  },
  alternates: {
    canonical: "https://www.rugkala.com/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  return <TermsOfService />;
}
