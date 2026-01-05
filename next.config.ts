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
        hostname: "curious-quick-food-yen.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "admin.rugkala.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "ui-avatars.com",
      }
    ],
  },
};

export default nextConfig;
