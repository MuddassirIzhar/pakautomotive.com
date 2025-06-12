import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disabled to prevent double-rendering in development
  // distDir: '.next',
  // For production deployments
  // assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    // domains: ['localhost'],
    remotePatterns: [
      {
        protocol: (process.env.NEXT_PUBLIC_API_PROTOCOL as 'http' | 'https') || 'http',
        hostname: process.env.NEXT_PUBLIC_API_HOST || 'localhost',
        port: process.env.NEXT_PUBLIC_API_PORT || '8888',
        pathname: process.env.NEXT_PUBLIC_UPLOAD_PATH || '/uploads/photo/*',
      },
      {
        protocol: (process.env.NEXT_PUBLIC_API_PROTOCOL as 'http' | 'https') || 'http',
        hostname: process.env.NEXT_PUBLIC_API_HOST || 'localhost',
        port: process.env.NEXT_PUBLIC_API_PORT || '8888',
        pathname: process.env.NEXT_PUBLIC_UPLOAD_PUBLIC_PATH || '/uploads/photo/*',
      },
    ],
  },
  // Additional optimizations
  // swcMinify: true, // Enable SWC minification for better performance
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // Remove console.log in production
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint during builds (if using separate CI)
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during builds (if needed)
  },
};

export default nextConfig;