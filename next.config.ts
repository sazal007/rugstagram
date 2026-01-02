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
        hostname: "doing-constitutes-ant-justin.trycloudflare.com",
      },
      {
        protocol: "https",
        hostname: "admin.rugkala.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      }
    ],
  },
};

export default nextConfig;
