import type { NextConfig } from "next";

// next.config.ts
const nextConfig: NextConfig = {
  // output: 'export',   ← remove this line
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
