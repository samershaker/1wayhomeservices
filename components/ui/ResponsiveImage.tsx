/**
 * ResponsiveImage Component
 *
 * A responsive image component optimized for static export.
 * Handles multiple image formats (AVIF, WebP, PNG/JPG) and responsive sizing.
 *
 * Usage:
 * <ResponsiveImage
 *   basePath="/images/hero-team"
 *   alt="Team photo"
 *   className="w-full h-full object-cover"
 *   priority={true}
 * />
 */

import React from 'react';

interface ResponsiveImageProps {
  /** Base path without extension (e.g., "/images/hero-team") */
  basePath: string;
  /** Alt text for accessibility */
  alt: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to load eagerly (for above-the-fold images) */
  priority?: boolean;
  /** Object-fit CSS property */
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  /** Object-position CSS property */
  objectPosition?: string;
  /** Optional sizes attribute for responsive images */
  sizes?: string;
  /** Optional suffix for different quality versions (e.g., "-hq", "-optimized") */
  qualitySuffix?: string;
}

/**
 * ResponsiveImage - Displays images with multiple format support
 *
 * Automatically serves:
 * 1. AVIF (best compression, modern browsers)
 * 2. WebP (good compression, broad support)
 * 3. PNG/JPG fallback (universal support)
 */
export function ResponsiveImage({
  basePath,
  alt,
  className = '',
  priority = false,
  objectFit = 'cover',
  objectPosition = 'center',
  sizes,
  qualitySuffix = '-hq',
}: ResponsiveImageProps) {
  const loading = priority ? 'eager' : 'lazy';
  const fetchPriority = priority ? 'high' : 'auto';

  // Build image paths with quality suffix for modern formats
  const avifPath = `${basePath}.avif`;
  const webpPath = qualitySuffix ? `${basePath}${qualitySuffix}.webp` : `${basePath}.webp`;
  const fallbackPath = `${basePath}-optimized.png`;

  return (
    <picture>
      {/* AVIF - Best quality/size ratio for modern browsers */}
      <source srcSet={avifPath} type="image/avif" sizes={sizes} />

      {/* WebP - High quality with good browser support */}
      <source srcSet={webpPath} type="image/webp" sizes={sizes} />

      {/* PNG/JPG Fallback - Universal support */}
      <img
        src={fallbackPath}
        alt={alt}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority as 'high' | 'low' | 'auto'}
        style={{
          objectFit,
          objectPosition,
        }}
      />
    </picture>
  );
}

/**
 * BackgroundImage - Full-screen background image with overlay support
 *
 * Usage:
 * <BackgroundImage
 *   basePath="/images/hero-team"
 *   alt="Office background"
 *   overlay="dark"
 * >
 *   <div>Your content here</div>
 * </BackgroundImage>
 */

interface BackgroundImageProps extends ResponsiveImageProps {
  children?: React.ReactNode;
  /** Overlay style: 'dark', 'light', 'gradient', or 'none' */
  overlay?: 'dark' | 'light' | 'gradient' | 'none';
  /** Custom overlay className for advanced styling */
  overlayClassName?: string;
}

export function BackgroundImage({
  children,
  overlay = 'gradient',
  overlayClassName,
  className = '',
  ...imageProps
}: BackgroundImageProps) {
  const overlayClasses = {
    dark: 'bg-black/60',
    light: 'bg-white/60',
    gradient: 'bg-gradient-to-br from-black/90 via-black/80 to-black/60',
    none: '',
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ResponsiveImage
          {...imageProps}
          className="absolute inset-0 w-full h-full"
          objectFit="cover"
        />

        {/* Overlay */}
        {overlay !== 'none' && (
          <>
            <div className={`absolute inset-0 ${overlayClassName || overlayClasses[overlay]}`} />
            {overlay === 'gradient' && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
            )}
          </>
        )}
      </div>

      {/* Content */}
      <div className={`relative z-10 ${className}`}>
        {children}
      </div>
    </div>
  );
}

export default ResponsiveImage;
