/**
 * Optimize Team Headshots
 * Converts PNG headshots to WebP format with proper sizing
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, '../public/images');

const headshots = [
  { input: 'Sam_Eram_Headshot.PNG', output: 'Sam_Eram_Headshot.webp' },
  { input: 'Bakhan_Kareem_Headshot.PNG', output: 'Bakhan_Kareem_Headshot.webp' }
];

async function optimizeHeadshots() {
  console.log('🖼️  Optimizing team headshots...\n');

  for (const { input, output } of headshots) {
    const inputPath = path.join(imagesDir, input);
    const outputPath = path.join(imagesDir, output);

    // Check if input exists
    if (!fs.existsSync(inputPath)) {
      console.log(`⚠️  Skipping ${input} (file not found)`);
      continue;
    }

    try {
      // Get original file size
      const originalStats = fs.statSync(inputPath);
      const originalSize = Math.round(originalStats.size / 1024);

      // Optimize and convert to WebP
      await sharp(inputPath)
        .resize(400, 400, {
          fit: 'cover',
          position: 'center'
        })
        .webp({ quality: 85 })
        .toFile(outputPath);

      // Get optimized file size
      const optimizedStats = fs.statSync(outputPath);
      const optimizedSize = Math.round(optimizedStats.size / 1024);
      const savings = Math.round(((originalSize - optimizedSize) / originalSize) * 100);

      console.log(`✓ ${input}`);
      console.log(`  → ${output}`);
      console.log(`  Original: ${originalSize}KB → Optimized: ${optimizedSize}KB (${savings}% smaller)\n`);
    } catch (error) {
      console.error(`✗ Error processing ${input}:`, error.message);
    }
  }

  console.log('✅ Done!');
}

// Run the optimization
optimizeHeadshots().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
