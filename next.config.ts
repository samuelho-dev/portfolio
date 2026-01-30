import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  webpack(config) {
    config.module.rules.push({
      test: /\.(mp3)$/i,
      type: 'asset/resource',
      generator: {
        filename: 'static/sounds/[name].[hash][ext]',
      },
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/ddhal4lbv/**',
      },
    ],
  },
};

export default nextConfig;
