/**
 * Custom image loader for static export
 * Optimizes images for maximum performance
 */

interface ImageLoaderProps {
  src: string;
  width?: number;
  quality?: number;
}

export default function imageLoader({ src, width, quality }: ImageLoaderProps): string {
  // For static export, return the src as-is with optional transformations
  const params = new URLSearchParams();

  if (width) {
    params.append('w', width.toString());
  }

  if (quality) {
    params.append('q', quality.toString());
  }

  // Return the image source with parameters for future CDN integration
  return params.toString() ? `${src}?${params.toString()}` : src;
}
