import { PrivacyPolicy } from "@/components/privacy/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Rugkala",
  description: "Read our Privacy Policy to understand how we collect, use, and protect your information at Rugkala.",
  openGraph: {
    title: "Privacy Policy | Rugkala",
    description: "Read our Privacy Policy to understand how we collect, use, and protect your information.",
    url: "https://www.rugkala.com/privacy-policy",
    siteName: "Rugkala",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Rugkala",
    description: "Read our Privacy Policy to understand how we collect, use, and protect your information.",
  },
  alternates: {
    canonical: "https://www.rugkala.com/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
