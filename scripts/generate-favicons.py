#!/usr/bin/env python3
"""
Favicon Generation Script
Creates all required favicon files from logo-color.png
"""

import os
import json
from pathlib import Path
from PIL import Image
import sys

def generate_favicons():
    print("Generating favicon set...\n")

    # Paths
    script_dir = Path(__file__).parent
    input_path = script_dir / '../public/images/logo-color.png'
    output_dir = script_dir / '../public'

    if not input_path.exists():
        print(f"❌ Error: logo-color.png not found at {input_path}")
        sys.exit(1)

    try:
        # Load image
        img = Image.open(input_path).convert('RGBA')

        # Generate favicon.ico (32x32)
        print("Generating favicon.ico (32x32)...")
        favicon_img = img.copy()
        favicon_img.thumbnail((32, 32), Image.Resampling.LANCZOS)

        # Create a white background for ICO
        favicon_bg = Image.new('RGBA', (32, 32), (255, 255, 255, 255))
        # Center the logo
        offset = ((32 - favicon_img.size[0]) // 2, (32 - favicon_img.size[1]) // 2)
        favicon_bg.paste(favicon_img, offset, favicon_img)

        favicon_path = output_dir / 'favicon.ico'
        favicon_bg.save(favicon_path, format='ICO', sizes=[(32, 32)])
        print("OK: favicon.ico created\n")

        # Generate apple-touch-icon.png (180x180)
        print("Generating apple-touch-icon.png (180x180)...")
        apple_img = img.copy()
        apple_img.thumbnail((180, 180), Image.Resampling.LANCZOS)

        # Create white background
        apple_bg = Image.new('RGBA', (180, 180), (255, 255, 255, 255))
        offset = ((180 - apple_img.size[0]) // 2, (180 - apple_img.size[1]) // 2)
        apple_bg.paste(apple_img, offset, apple_img)

        apple_path = output_dir / 'apple-touch-icon.png'
        apple_bg.convert('RGB').save(apple_path, 'PNG', optimize=True)
        print("OK: apple-touch-icon.png created\n")

        # Generate android-chrome-192x192.png
        print("Generating android-chrome-192x192.png...")
        android_192_img = img.copy()
        android_192_img.thumbnail((192, 192), Image.Resampling.LANCZOS)

        android_192_bg = Image.new('RGBA', (192, 192), (255, 255, 255, 255))
        offset = ((192 - android_192_img.size[0]) // 2, (192 - android_192_img.size[1]) // 2)
        android_192_bg.paste(android_192_img, offset, android_192_img)

        android_192_path = output_dir / 'android-chrome-192x192.png'
        android_192_bg.convert('RGB').save(android_192_path, 'PNG', optimize=True)
        print("OK: android-chrome-192x192.png created\n")

        # Generate android-chrome-512x512.png
        print("Generating android-chrome-512x512.png...")
        android_512_img = img.copy()
        android_512_img.thumbnail((512, 512), Image.Resampling.LANCZOS)

        android_512_bg = Image.new('RGBA', (512, 512), (255, 255, 255, 255))
        offset = ((512 - android_512_img.size[0]) // 2, (512 - android_512_img.size[1]) // 2)
        android_512_bg.paste(android_512_img, offset, android_512_img)

        android_512_path = output_dir / 'android-chrome-512x512.png'
        android_512_bg.convert('RGB').save(android_512_path, 'PNG', optimize=True)
        print("OK: android-chrome-512x512.png created\n")

        # Create site.webmanifest
        print("Creating site.webmanifest...")
        manifest = {
            "name": "1Way Home Services",
            "short_name": "1Way Home",
            "description": "Professional Tax Preparation & Real Estate Services in El Cajon, San Diego",
            "icons": [
                {
                    "src": "/android-chrome-192x192.png",
                    "sizes": "192x192",
                    "type": "image/png"
                },
                {
                    "src": "/android-chrome-512x512.png",
                    "sizes": "512x512",
                    "type": "image/png"
                }
            ],
            "theme_color": "#2251A3",
            "background_color": "#ffffff",
            "display": "standalone",
            "start_url": "/",
            "scope": "/"
        }

        manifest_path = output_dir / 'site.webmanifest'
        with open(manifest_path, 'w') as f:
            json.dump(manifest, f, indent=2)
        print("OK: site.webmanifest created\n")

        print("=" * 60)
        print("All favicons generated successfully!\n")
        print("Files created:")
        print("  - favicon.ico (32x32)")
        print("  - apple-touch-icon.png (180x180)")
        print("  - android-chrome-192x192.png")
        print("  - android-chrome-512x512.png")
        print("  - site.webmanifest")
        print("=" * 60 + "\n")

    except Exception as e:
        print(f"❌ Error during favicon generation: {e}")
        sys.exit(1)

if __name__ == "__main__":
    generate_favicons()
