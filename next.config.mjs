/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export configuration for maximum build efficiency
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  
  // Image optimization for static export
  images: {
    unoptimized: true,
    loader: 'custom',
    loaderFile: './lib/imageLoader.js',
  },
  
  // ISR and build optimization
  experimental: {
    optimizePackageImports: ['@react-spring/web', 'motion', 'daisyui'],
  },
  
  // Build optimization
  generateBuildId: async () => {
    return '1wayhomeservices-static-build'
  },
  
  // Turbopack configuration (Next.js 16)
  turbopack: {},
  
  // Note: redirects() and headers() removed — not supported with output: 'export'
};

export default nextConfig;
