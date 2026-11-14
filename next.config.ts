import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Whitelist only explicit origins to prevent SSRF through the Next.js image proxy
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.telegram.org",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
    ],
  },
};

export default nextConfig;
