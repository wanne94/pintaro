import type { NextConfig } from "next";

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipMiddlewareUrlNormalize: true,
  
  
  // Generate static pages properly
  generateBuildId: async () => {
    return 'static-build';
  },
};

export default withBundleAnalyzer(nextConfig);