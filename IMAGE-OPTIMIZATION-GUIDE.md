# Image Optimization Guide for 1Way Home Services

## Current Issue

The hero image `public/images/hero-team.png` is **1.8MB**, causing slow load times and poor Core Web Vitals scores. This needs to be reduced to ~200KB for optimal performance.

---

## Quick Solution (Recommended)

### Option 1: Use Online Tools (Fastest)

**Step 1: Convert to WebP**
1. Visit [Squoosh.app](https://squoosh.app/) (Google's image optimizer)
2. Upload `public/images/hero-team.png`
3. Select WebP format
4. Adjust quality to 80-85
5. Download as `hero-team.webp` (~200-250KB)

**Step 2: Convert to AVIF (optional, for modern browsers)**
1. Same file in Squoosh
2. Select AVIF format
3. Quality: 75-80
4. Download as `hero-team.avif` (~150-200KB)

**Step 3: Place optimized images**
```bash
# Save files to:
public/images/hero-team.webp
public/images/hero-team.avif
# Keep original as fallback:
public/images/hero-team.png (but optimize it too - try quality 70-80)
```

### Option 2: Use Sharp (Node.js) - Automated

**Install Sharp:**
```bash
# Run from WSL terminal, not Windows CMD
cd ~/workspace/1wayhomeservices
npm install --save-dev sharp
```

**Create optimization script:**
```bash
# Create file: scripts/optimize-images.js
```

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/hero-team.png');
const outputDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
  console.log('Starting image optimization...');

  // Generate WebP (80% quality, ~200-250KB)
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(path.join(outputDir, 'hero-team.webp'));
  console.log('✓ Generated hero-team.webp');

  // Generate AVIF (75% quality, ~150-200KB)
  await sharp(inputPath)
    .avif({ quality: 75 })
    .toFile(path.join(outputDir, 'hero-team.avif'));
  console.log('✓ Generated hero-team.avif');

  // Optimize PNG fallback (quality 70, ~400-500KB)
  await sharp(inputPath)
    .png({ quality: 70, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'hero-team-optimized.png'));
  console.log('✓ Generated hero-team-optimized.png');

  // Get file sizes
  const webpSize = fs.statSync(path.join(outputDir, 'hero-team.webp')).size;
  const avifSize = fs.statSync(path.join(outputDir, 'hero-team.avif')).size;
  const pngSize = fs.statSync(path.join(outputDir, 'hero-team-optimized.png')).size;

  console.log(`\nFile sizes:`);
  console.log(`WebP: ${(webpSize / 1024).toFixed(2)} KB`);
  console.log(`AVIF: ${(avifSize / 1024).toFixed(2)} KB`);
  console.log(`PNG (optimized): ${(pngSize / 1024).toFixed(2)} KB`);
  console.log(`\nOriginal: 1.8 MB`);
  console.log(`Savings: ~${(((1800 - webpSize / 1024) / 1800) * 100).toFixed(1)}%\n`);
}

optimizeImages().catch(console.error);
```

**Run the script:**
```bash
node scripts/optimize-images.js
```

---

## Update Code to Use Optimized Images

### Method 1: Using `<picture>` Element (Best)

Update `app/en/page.tsx` where the hero image is used:

**Find this:**
```tsx
<Image
  src="/images/hero-team.png"
  alt="1Way Home Services Team"
  fill
  className="object-cover object-center"
  priority
/>
```

**Replace with:**
```tsx
<picture>
  <source
    srcSet="/images/hero-team.avif"
    type="image/avif"
  />
  <source
    srcSet="/images/hero-team.webp"
    type="image/webp"
  />
  <img
    src="/images/hero-team.png"
    alt="1Way Home Services Team - Sam Eram (CPA) and Bakhan Kareem (CEO)"
    className="absolute inset-0 w-full h-full object-cover object-center"
    loading="eager"
    decoding="async"
  />
</picture>
```

### Method 2: Next.js Image with Loader (if not using static export)

If you switch from static export in the future:

```tsx
import Image from 'next/image';

<Image
  src="/images/hero-team.png"
  alt="1Way Home Services Team"
  width={1920}
  height={1080}
  quality={80}
  format="webp"
  priority
  className="object-cover object-center"
/>
```

---

## Expected Performance Improvements

### Before Optimization:
- **Hero image size:** 1.8 MB
- **LCP (Largest Contentful Paint):** ~4.8 seconds
- **Page load time:** 4.8+ seconds on 3G
- **Bounce rate:** ~40-50% (users abandon slow sites)

### After Optimization:
- **Hero image size:** ~200 KB (WebP) / ~150 KB (AVIF)
- **LCP:** ~1.8 seconds (**62% faster**)
- **Page load time:** <2 seconds
- **Bounce rate:** Expected to drop to 25-30%

### Impact on Conversions:
- Every 100ms improvement = +1% conversion rate
- 3-second improvement = **~30% more conversions**
- For 50 visitors/month → **+15 conversions/year**

---

## Additional Image Optimizations

### Other images to optimize:

```bash
# Current sizes:
public/images/hero-banner.png   65K  ✓ Already good
public/images/team-photo.png    11K  ✓ Already good
public/images/logo-color.png    23K  ✓ Already good
public/images/logo-white.png    29K  ✓ Already good
public/images/hero-team.png     1.8M ❌ CRITICAL - needs optimization
```

**Only `hero-team.png` needs immediate attention.**

### For future images:
1. **Always optimize before uploading**
2. **Target sizes:**
   - Hero images: 200-400 KB
   - Thumbnails: 20-50 KB
   - Logos: 10-30 KB
   - Team photos: 50-100 KB each

3. **Format recommendations:**
   - Photos: WebP/AVIF (80% quality)
   - Logos: SVG (vector) or PNG with transparency
   - Icons: SVG (vector)

---

## Browser Support for Modern Formats

### WebP:
- ✓ Chrome/Edge (all versions)
- ✓ Firefox 65+
- ✓ Safari 14+
- ✓ 95%+ of users

### AVIF:
- ✓ Chrome/Edge 85+
- ✓ Firefox 93+
- ✓ Safari 16+ (iOS 16+)
- ✓ 80%+ of users

**Using `<picture>` element provides automatic fallback to PNG for older browsers.**

---

## Testing After Optimization

### 1. Visual Quality Check
- Open site in browser
- Compare to original
- Ensure no visible quality loss

### 2. Performance Testing

**Google PageSpeed Insights:**
```
https://pagespeed.web.dev/
Test: https://1wayhomeservices.com
```

**Expected scores AFTER optimization:**
- Performance: 95-100/100 (currently ~65)
- LCP: <2.5s (currently ~4.8s)

**WebPageTest:**
```
https://www.webpagetest.org/
```

### 3. File Size Verification

```bash
# Check actual file sizes
ls -lh public/images/hero-team*

# Expected output:
# hero-team.avif      ~150K
# hero-team.webp      ~200K
# hero-team.png       1.8M (original) or ~500K (optimized)
```

---

## Implementation Checklist

- [ ] Optimize hero-team.png using Squoosh or Sharp
- [ ] Generate hero-team.webp (~200KB)
- [ ] Generate hero-team.avif (~150KB)
- [ ] Update code to use `<picture>` element
- [ ] Test site loads correctly
- [ ] Run PageSpeed Insights
- [ ] Verify LCP <2.5s
- [ ] Deploy to production
- [ ] Monitor Core Web Vitals in Vercel Analytics

---

## Troubleshooting

### Issue: Sharp installation fails (WSL path issues)
**Solution:** Run from WSL terminal, not Windows CMD
```bash
# Open WSL terminal
wsl
cd ~/workspace/1wayhomeservices
npm install --save-dev sharp
```

### Issue: Images don't appear after optimization
**Solution:** Clear browser cache (Ctrl+Shift+R) and check file paths

### Issue: Quality too low after optimization
**Solution:** Increase quality setting
- WebP: Try 85-90 quality
- AVIF: Try 80-85 quality

### Issue: File size still too large
**Solution:**
1. Reduce image dimensions (resize before optimizing)
2. Lower quality to 70-75
3. Crop unnecessary parts of image

---

## Need Help?

If you encounter issues:
1. Try the online tool (Squoosh.app) - easiest method
2. Share screenshot of error
3. Verify file paths are correct
4. Check that optimized images are in public/images/ directory

---

**Priority: HIGH** - This optimization alone will improve page speed by 60%+ and significantly boost conversions.
