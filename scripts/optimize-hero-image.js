const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/hero-team.png');
const outputDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
  console.log('🖼️  Starting image optimization...\n');

  const inputSize = fs.statSync(inputPath).size;
  console.log(`Original size: ${(inputSize / (1024 * 1024)).toFixed(2)} MB\n`);

  // Generate WebP (80% quality, ~200-250KB)
  await sharp(inputPath)
    .webp({ quality: 80 })
    .toFile(path.join(outputDir, 'hero-team.webp'));
  const webpSize = fs.statSync(path.join(outputDir, 'hero-team.webp')).size;
  console.log(`✓ Generated hero-team.webp: ${(webpSize / 1024).toFixed(2)} KB`);

  // Generate AVIF (75% quality, ~150-200KB)
  await sharp(inputPath)
    .avif({ quality: 75 })
    .toFile(path.join(outputDir, 'hero-team.avif'));
  const avifSize = fs.statSync(path.join(outputDir, 'hero-team.avif')).size;
  console.log(`✓ Generated hero-team.avif: ${(avifSize / 1024).toFixed(2)} KB`);

  // Optimize PNG fallback (quality 70, ~400-500KB)
  await sharp(inputPath)
    .png({ quality: 70, compressionLevel: 9 })
    .toFile(path.join(outputDir, 'hero-team-optimized.png'));
  const pngSize = fs.statSync(path.join(outputDir, 'hero-team-optimized.png')).size;
  console.log(`✓ Generated hero-team-optimized.png: ${(pngSize / 1024).toFixed(2)} KB`);

  console.log(`\n📊 Results:`);
  console.log(`   Original PNG: ${(inputSize / 1024).toFixed(2)} KB`);
  console.log(`   WebP: ${(webpSize / 1024).toFixed(2)} KB (${(((inputSize - webpSize) / inputSize) * 100).toFixed(1)}% smaller)`);
  console.log(`   AVIF: ${(avifSize / 1024).toFixed(2)} KB (${(((inputSize - avifSize) / inputSize) * 100).toFixed(1)}% smaller)`);
  console.log(`   Optimized PNG: ${(pngSize / 1024).toFixed(2)} KB (${(((inputSize - pngSize) / inputSize) * 100).toFixed(1)}% smaller)\n`);

  console.log('✅ Image optimization complete!');
  console.log('\n📝 Next step: Update app/en/page.tsx to use optimized images');
}

optimizeImages().catch(console.error);
