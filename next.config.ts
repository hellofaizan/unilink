import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bsmk6elczr.ufs.sh",
        pathname: "/f/*",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
    minimumCacheTTL: 60,
    formats: ["image/webp", "image/avif"],
  },
};

export default nextConfig;
