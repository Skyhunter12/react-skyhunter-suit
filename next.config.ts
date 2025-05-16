import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  trailingSlash: false,
  eslint:{
    ignoreDuringBuilds:true
  },
  distDir:"next",
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/:path*", // Ensure all routes are correctly rewritten
      },
    ];
  },
};

export default nextConfig;
