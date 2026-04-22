# Optimize Team Headshots

## Current Files
- `Sam_Eram_Headshot.PNG` (108KB)
- `Bakhan_Kareem_Headshot.PNG` (112KB)

## Optimization Options

### Option 1: Online Tool (Easiest - No Installation)

1. Go to **https://squoosh.app**
2. Upload each PNG file
3. Select **WebP** format on the right panel
4. Set quality to **85**
5. Download with these names:
   - `Sam_Eram_Headshot.webp`
   - `Bakhan_Kareem_Headshot.webp`
6. Save to `public/images/`

### Option 2: Use NPM Sharp (Best Quality)

```bash
# Install sharp
npm install -D sharp

# Create optimization script
node scripts/optimize-headshots.js
```

Create this file as `scripts/optimize-headshots.js`:

```javascript
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

const headshots = [
  'Sam_Eram_Headshot.PNG',
  'Bakhan_Kareem_Headshot.PNG'
];

async function optimizeHeadshots() {
  for (const filename of headshots) {
    const inputPath = path.join(imagesDir, filename);
    const outputPath = path.join(imagesDir, filename.replace('.PNG', '.webp'));

    try {
      await sharp(inputPath)
        .resize(400, 400, { // Resize to 400x400 (2x for retina)
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      const stats = fs.statSync(outputPath);
      console.log(`✓ Created ${path.basename(outputPath)} (${Math.round(stats.size / 1024)}KB)`);
    } catch (error) {
      console.error(`✗ Error processing ${filename}:`, error.message);
    }
  }
}

optimizeHeadshots();
```

Then run:
```bash
node scripts/optimize-headshots.js
```

### Option 3: Windows Photo Editor

1. Open each PNG in Windows Photo app
2. Click "Resize" → enter 400 pixels
3. Save as new file
4. Use online converter to create WebP versions

## Expected Results

After optimization:
- **WebP files**: ~20-30KB each (70% smaller)
- **Better quality**: Sharper at displayed size (96x96px)
- **Faster loading**: Quicker page load times

## Update Code (Optional - After Creating WebP)

Once you have `.webp` versions, update `app/en/page.tsx` to use them:

```tsx
<picture>
  <source srcSet={member.image.replace('.PNG', '.webp')} type="image/webp" />
  <img
    src={member.image}
    alt={`${member.name}, ${member.title}`}
    className="w-full h-full object-cover"
    loading="lazy"
  />
</picture>
```
