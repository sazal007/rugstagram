import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "www.logicalposition.com",
      },
      {
        protocol: "https",
        hostname: "rugkala.nepdora.com",
      },
      {
        protocol: "https",
        hostname: "testimonials-golden-joan-hotel.trycloudflare.com",
      }
    ],
  },
};

export default nextConfig;
