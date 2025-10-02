import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Production build optimizations
  // output: 'standalone', // Removed - not needed for Vercel deployment
  
  // Image optimization settings
  images: {
    // Enable modern image formats for better compression
    formats: ['image/webp', 'image/avif'],
    
    // Responsive image sizes for different devices
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Optimized quality for web delivery (removed as it's not supported in this Next.js version)
    
    // Enable placeholder blur to reduce layout shift (removed as not supported in this Next.js version)
    
    // Allowed domains for external images
    domains: [
      'localhost',
      'hyperstone.co.kr',
      'images.unsplash.com', // For demo images
      'via.placeholder.com', // For placeholder images
    ],
    
    // Remote patterns for more flexible image sources
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.placeholder.com',
      },
    ],
    
    // Long cache TTL for better performance
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  
  // Performance optimizations
  experimental: {
    // Optimize package imports for smaller bundles
    optimizePackageImports: ['framer-motion', '@heroicons/react'],
  },
  
  // Compiler optimizations for production
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
    
    // Enable React compiler optimizations
    reactRemoveProperties: process.env.NODE_ENV === 'production',
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev) {
      // Enable tree shaking
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
      };
      
      // Optimize bundle splitting
      config.optimization.splitChunks = {
        ...config.optimization.splitChunks,
        cacheGroups: {
          ...config.optimization.splitChunks?.cacheGroups,
          // Separate vendor chunks for better caching
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // Separate common chunks
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers for caching and security
  async headers() {
    return [
      {
        // Cache static assets aggressively
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        // Long cache for static assets
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache uploaded files
        source: '/uploads/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400', // 1 day
          },
        ],
      },
    ];
  },
  
  // Compression and optimization
  compress: true,
  
  // Enable static optimization
  trailingSlash: false,
  
  // PoweredBy header removal for security
  poweredByHeader: false,
};

export default withNextIntl(nextConfig);