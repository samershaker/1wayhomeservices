const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/hero-team.png');
const outputDir = path.join(__dirname, '../public/images');

async function optimizeImages() {
  console.log('🖼️  Optimizing hero image...\n');

  if (!fs.existsSync(inputPath)) {
    console.error('❌ Error: hero-team.png not found at', inputPath);
    process.exit(1);
  }

  const inputSize = fs.statSync(inputPath).size;
  console.log(`Original: ${(inputSize / (1024 * 1024)).toFixed(2)} MB\n`);

  try {
    // Generate WebP (target 80-150KB)
    console.log('Generating WebP...');
    const webpPath = path.join(outputDir, 'hero-team.webp');
    await sharp(inputPath)
      .resize(1920, 1280, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 6 })
      .toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;
    console.log(`✅ WebP: ${(webpSize / 1024).toFixed(2)} KB\n`);

    // Generate AVIF (target 70-120KB)
    console.log('Generating AVIF...');
    const avifPath = path.join(outputDir, 'hero-team.avif');
    await sharp(inputPath)
      .resize(1920, 1280, { fit: 'cover', position: 'center' })
      .avif({ quality: 75, effort: 6 })
      .toFile(avifPath);
    const avifSize = fs.statSync(avifPath).size;
    console.log(`✅ AVIF: ${(avifSize / 1024).toFixed(2)} KB\n`);

    // Optimized PNG fallback (target 400-600KB)
    console.log('Generating optimized PNG...');
    const pngPath = path.join(outputDir, 'hero-team-optimized.png');
    await sharp(inputPath)
      .resize(1920, 1280, { fit: 'cover', position: 'center' })
      .png({ quality: 70, compressionLevel: 9, effort: 10 })
      .toFile(pngPath);
    const pngSize = fs.statSync(pngPath).size;
    console.log(`✅ Optimized PNG: ${(pngSize / 1024).toFixed(2)} KB\n`);

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ Optimization complete!\n');
    console.log('File Size Comparison:');
    console.log(`  Original:      ${(inputSize / 1024).toFixed(2)} KB (${(inputSize / (1024 * 1024)).toFixed(2)} MB)`);
    console.log(`  AVIF:          ${(avifSize / 1024).toFixed(2)} KB (${((1 - avifSize/inputSize) * 100).toFixed(1)}% smaller)`);
    console.log(`  WebP:          ${(webpSize / 1024).toFixed(2)} KB (${((1 - webpSize/inputSize) * 100).toFixed(1)}% smaller)`);
    console.log(`  Optimized PNG: ${(pngSize / 1024).toFixed(2)} KB (${((1 - pngSize/inputSize) * 100).toFixed(1)}% smaller)`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

optimizeImages().catch(console.error);
