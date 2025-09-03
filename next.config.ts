import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  skipMiddlewareUrlNormalize: true,
  
  // Redirect German pages to root during build
  async rewrites() {
    return process.env.NODE_ENV === 'production' ? [] : [
      {
        source: '/',
        destination: '/de',
      },
    ];
  },
  
  // Generate static pages properly
  generateBuildId: async () => {
    return 'static-build';
  },
};

export default nextConfig;