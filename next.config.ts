import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
      // TODO: Add other image domains if needed (e.g., from your actual card image CDN)
    ],
  },
};

export default nextConfig;
