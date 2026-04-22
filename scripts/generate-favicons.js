const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputPath = path.join(__dirname, '../public/images/logo-color.png');
const outputDir = path.join(__dirname, '../public');

async function generateFavicons() {
  console.log('🎨 Generating favicon set...\n');

  if (!fs.existsSync(inputPath)) {
    console.error('❌ Error: logo-color.png not found at', inputPath);
    process.exit(1);
  }

  try {
    // Generate favicon.ico (32x32)
    console.log('Generating favicon.ico (32x32)...');
    await sharp(inputPath)
      .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .toFile(path.join(outputDir, 'favicon.ico'));
    console.log('✅ favicon.ico created\n');

    // Generate apple-touch-icon.png (180x180)
    console.log('Generating apple-touch-icon.png (180x180)...');
    await sharp(inputPath)
      .resize(180, 180, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'apple-touch-icon.png'));
    console.log('✅ apple-touch-icon.png created\n');

    // Generate android-chrome-192x192.png
    console.log('Generating android-chrome-192x192.png...');
    await sharp(inputPath)
      .resize(192, 192, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'android-chrome-192x192.png'));
    console.log('✅ android-chrome-192x192.png created\n');

    // Generate android-chrome-512x512.png
    console.log('Generating android-chrome-512x512.png...');
    await sharp(inputPath)
      .resize(512, 512, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 1 } })
      .png()
      .toFile(path.join(outputDir, 'android-chrome-512x512.png'));
    console.log('✅ android-chrome-512x512.png created\n');

    // Create site.webmanifest
    console.log('Creating site.webmanifest...');
    const manifest = {
      name: "1Way Home Services",
      short_name: "1Way Home",
      description: "Professional Tax Preparation & Real Estate Services in El Cajon, San Diego",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      theme_color: "#2251A3",
      background_color: "#ffffff",
      display: "standalone",
      start_url: "/",
      scope: "/"
    };

    fs.writeFileSync(
      path.join(outputDir, 'site.webmanifest'),
      JSON.stringify(manifest, null, 2)
    );
    console.log('✅ site.webmanifest created\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ All favicons generated successfully!\n');
    console.log('Files created:');
    console.log('  • favicon.ico (32x32)');
    console.log('  • apple-touch-icon.png (180x180)');
    console.log('  • android-chrome-192x192.png');
    console.log('  • android-chrome-512x512.png');
    console.log('  • site.webmanifest');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('❌ Error during favicon generation:', error);
    process.exit(1);
  }
}

generateFavicons().catch(console.error);
