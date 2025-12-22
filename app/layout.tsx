import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CartProvider } from "@/context/CartContext";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Rugstagram - Handcrafted Himalayan Rugs & Custom Designs",
    template: "%s | Rugstagram",
  },
  description: "Discover exquisite handcrafted Himalayan rugs and custom bespoke designs. Premium quality wool, silk, and traditional weaving techniques. Shop our collections or design your own unique rug.",
  keywords: ["Himalayan rugs", "handcrafted rugs", "custom rugs", "bespoke rugs", "wool rugs", "silk rugs", "traditional rugs", "rug design"],
  authors: [{ name: "Rugstagram" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Rugstagram",
    title: "Rugstagram - Handcrafted Himalayan Rugs & Custom Designs",
    description: "Discover exquisite handcrafted Himalayan rugs and custom bespoke designs.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rugstagram - Handcrafted Himalayan Rugs",
    description: "Discover exquisite handcrafted Himalayan rugs and custom bespoke designs.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} antialiased`}
      >
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
