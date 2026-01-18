import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  images: { // <--- Add the 'images' object here
    domains: ['cdn.sanity.io'],
  },
};

export default nextConfig;