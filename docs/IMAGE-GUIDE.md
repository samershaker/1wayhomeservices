# Image Management Guide

## Overview

This project uses a custom image optimization system designed for static export. Since Next.js Image optimization requires a server, we use responsive images with multiple formats.

## Image Format Priority

The system automatically serves images in this order:

1. **AVIF** (.avif) - Best quality/size ratio, modern browsers
2. **WebP** (.webp) - Good compression, broad browser support
3. **PNG/JPG** - Universal fallback

## Directory Structure

```
public/
└── images/
    ├── logo-white.png
    ├── logo-color.png
    ├── hero-team.avif           # High-quality AVIF
    ├── hero-team-hq.webp        # High-quality WebP
    ├── hero-team-optimized.png  # Optimized PNG fallback
    └── team-photo.png
```

## Adding New Images

### Step 1: Prepare Source Image

Start with a high-quality source image (PNG or JPG).

### Step 2: Generate Optimized Versions

Use these recommended tools:

#### For WebP:
```bash
# Using cwebp (Google's WebP encoder)
cwebp -q 85 source.png -o image-hq.webp    # High quality
cwebp -q 70 source.png -o image.webp        # Standard quality
```

#### For AVIF:
```bash
# Using avif encoder (best compression)
avif --quality 80 source.png -o image.avif
```

#### For PNG optimization:
```bash
# Using pngquant
pngquant --quality=80-90 source.png -o image-optimized.png
```

### Online Tools (No Installation Required):

- **Squoosh.app** - https://squoosh.app (Google's image optimizer)
- **TinyPNG** - https://tinypng.com (PNG/JPG compression)
- **Cloudinary** - Free tier for image optimization

### Recommended Quality Settings:

| Format | Quality | Use Case |
|--------|---------|----------|
| AVIF | 75-85 | Hero images, large backgrounds |
| WebP HQ | 80-90 | Hero images, featured content |
| WebP Standard | 70-80 | General content images |
| PNG Optimized | 80-90 | Fallback, logos, graphics |

## Using Images in Components

### Option 1: Background Images (Recommended for Hero Sections)

```tsx
import { BackgroundImage } from '@/components/ui/ResponsiveImage';

function MySection() {
  return (
    <BackgroundImage
      basePath="/images/hero-team"
      alt="Description for screen readers"
      overlay="gradient"
      priority={true}  // Use for above-the-fold images
      className="min-h-screen"
    >
      <div>Your content here</div>
    </BackgroundImage>
  );
}
```

**Overlay Options:**
- `"gradient"` - Dark gradient overlay (default for hero)
- `"dark"` - Solid dark overlay (60% opacity)
- `"light"` - Light overlay (60% opacity)
- `"none"` - No overlay

### Option 2: Inline Responsive Images

```tsx
import { ResponsiveImage } from '@/components/ui/ResponsiveImage';

function MyComponent() {
  return (
    <ResponsiveImage
      basePath="/images/my-image"
      alt="Description"
      className="w-full rounded-lg"
      objectFit="cover"
      priority={false}  // Lazy load for below-the-fold
    />
  );
}
```

### Option 3: Manual Picture Element (Advanced)

```tsx
<picture>
  <source srcSet="/images/hero-team.avif" type="image/avif" />
  <source srcSet="/images/hero-team-hq.webp" type="image/webp" />
  <img
    src="/images/hero-team-optimized.png"
    alt="Description"
    loading="lazy"
  />
</picture>
```

## Naming Conventions

Use consistent naming for image variants:

```
base-name.avif           # AVIF version
base-name-hq.webp        # High-quality WebP
base-name.webp           # Standard WebP
base-name-optimized.png  # Optimized PNG fallback
base-name.png            # Original (optional, for reference)
```

**Examples:**
```
hero-team.avif
hero-team-hq.webp
hero-team-optimized.png

logo-white.png
team-photo.png
service-card-tax.avif
```

## Performance Tips

### 1. **Use Priority Loading for Above-the-Fold Images**
```tsx
<BackgroundImage priority={true} /> // Hero images
<ResponsiveImage priority={false} /> // Below fold
```

### 2. **Lazy Load Below-the-Fold Images**
```tsx
loading="lazy"  // Automatically done by ResponsiveImage
```

### 3. **Optimize for Mobile First**
- Test image quality on mobile screens
- Consider creating separate mobile versions for very large images
- Use responsive sizing with `sizes` attribute

### 4. **Check File Sizes**
Target file sizes:
- Hero images: 50-150KB (WebP), 30-100KB (AVIF)
- Content images: 20-80KB (WebP)
- Thumbnails: 10-30KB

### 5. **Use Proper Alt Text**
```tsx
alt="Sam Eram and Bakhan Kareem, tax advisors at 1Way Home Services"
// Not: alt="team photo"
```

## Image Optimization Workflow

### For Hero/Background Images:

1. Start with high-res source (1920x1080 or larger)
2. Create AVIF at 80% quality
3. Create WebP HQ at 85% quality
4. Create PNG optimized at 85% quality
5. Verify all three files exist with consistent naming
6. Use `BackgroundImage` component

### For Content Images:

1. Resize to actual display size (don't serve 2000px images for 500px containers)
2. Create WebP at 75% quality
3. Create optimized PNG/JPG fallback
4. Use `ResponsiveImage` component

### For Logos/Icons:

1. Use PNG or SVG
2. Optimize with pngquant or SVGO
3. Consider creating separate light/dark versions
4. Use standard `<img>` tag with proper sizing

## Current Image Inventory

| Image | Formats Available | Size | Usage |
|-------|------------------|------|-------|
| hero-team | AVIF, WebP HQ, PNG | 1920x1080 | Hero background |
| logo-white | PNG | 512x512 | Dark backgrounds |
| logo-color | PNG | 512x512 | Light backgrounds |
| team-photo | PNG | Small | Team member avatars |

## Troubleshooting

### Image not loading?
1. Check file exists in `public/images/`
2. Verify path starts with `/images/` (not `/public/images/`)
3. Check browser DevTools Network tab for 404 errors
4. Clear Next.js cache: `rm -rf .next`

### Image quality poor?
1. Increase quality setting when generating WebP/AVIF
2. Use `-hq` suffix for high-quality variants
3. Check source image quality
4. Verify browser is loading correct format (check DevTools)

### Image too large (slow loading)?
1. Reduce dimensions to match display size
2. Lower quality setting (try 70-75%)
3. Ensure AVIF/WebP formats are being generated
4. Use lazy loading for below-fold images

## Recommended Tools

### Command Line:
- **cwebp** - WebP encoder (Google)
- **avif-cli** - AVIF encoder
- **pngquant** - PNG optimizer
- **imagemagick** - General image processing

### GUI Applications:
- **Squoosh** (https://squoosh.app) - Web-based, all formats
- **XnConvert** - Batch image converter
- **GIMP** - Open-source image editor with export options

### NPM Packages (for automation):
```bash
npm install -D sharp imagemin imagemin-webp imagemin-avif
```

## Future Enhancements

Consider adding:
- [ ] Automated image optimization script
- [ ] Multiple size variants for responsive images
- [ ] Srcset with different resolutions (1x, 2x, 3x)
- [ ] Blur placeholder for lazy-loaded images
- [ ] Image CDN integration for production

---

**Questions?** Check the component documentation in `components/ui/ResponsiveImage.tsx`
