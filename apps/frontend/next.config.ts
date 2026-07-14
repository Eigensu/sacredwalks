import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactCompiler: true,
  serverExternalPackages: ['mongodb'],
  images: {
    // Content editors can point images at any https host through the CMS.
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Media uploaded through the admin panel is served from GridFS here.
    localPatterns: [
      {
        pathname: '/api/media/**',
      },
    ],
  },
};

export default nextConfig;
