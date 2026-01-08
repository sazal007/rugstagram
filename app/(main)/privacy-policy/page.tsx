import { PrivacyPolicy } from "@/components/privacy/PrivacyPolicy";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Rugkala",
  description: "Read our Privacy Policy to understand how we collect, use, and protect your information.",
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicy />;
}
