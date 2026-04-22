/**
 * Custom image loader for static export
 * Optimizes HVAC images for maximum performance
 */

export default function imageLoader({ src, width, quality }) {
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