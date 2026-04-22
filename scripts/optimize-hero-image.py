#!/usr/bin/env python3
"""
Hero Image Optimization Script
Converts the 1.8MB hero-team.png to optimized WebP, AVIF-compatible WebP, and PNG formats
"""

import os
from pathlib import Path
from PIL import Image
import sys

def optimize_images():
    print("Optimizing hero image...\n")

    # Paths
    script_dir = Path(__file__).parent
    input_path = script_dir / '../public/images/hero-team.png'
    output_dir = script_dir / '../public/images'

    if not input_path.exists():
        print(f"❌ Error: hero-team.png not found at {input_path}")
        sys.exit(1)

    # Get original size
    original_size = input_path.stat().st_size
    print(f"Original: {original_size / (1024 * 1024):.2f} MB\n")

    try:
        # Load image
        img = Image.open(input_path)

        # Resize to 1920x1280 (maintaining aspect ratio with crop)
        target_width, target_height = 1920, 1280

        # Calculate crop box to maintain center
        aspect_ratio = target_width / target_height
        img_width, img_height = img.size
        img_aspect = img_width / img_height

        if img_aspect > aspect_ratio:
            # Image is wider, crop width
            new_width = int(img_height * aspect_ratio)
            left = (img_width - new_width) // 2
            img_cropped = img.crop((left, 0, left + new_width, img_height))
        else:
            # Image is taller, crop height
            new_height = int(img_width / aspect_ratio)
            top = (img_height - new_height) // 2
            img_cropped = img.crop((0, top, img_width, top + new_height))

        # Resize to target dimensions
        img_resized = img_cropped.resize((target_width, target_height), Image.Resampling.LANCZOS)

        # Generate WebP (target 80-150KB)
        print("Generating WebP...")
        webp_path = output_dir / 'hero-team.webp'
        img_resized.save(webp_path, 'WebP', quality=80, method=6)
        webp_size = webp_path.stat().st_size
        print(f"OK: WebP: {webp_size / 1024:.2f} KB\n")

        # Generate high-quality WebP (as AVIF alternative, target 70-120KB)
        # Note: Pillow doesn't support AVIF directly, so we create a higher-quality WebP
        # that can serve as a modern format alternative
        print("Generating high-quality WebP (AVIF alternative)...")
        avif_alt_path = output_dir / 'hero-team-hq.webp'
        img_resized.save(avif_alt_path, 'WebP', quality=85, method=6)
        avif_alt_size = avif_alt_path.stat().st_size
        print(f"OK: High-Quality WebP: {avif_alt_size / 1024:.2f} KB\n")

        # Generate optimized PNG fallback (target 400-600KB)
        print("Generating optimized PNG...")
        png_path = output_dir / 'hero-team-optimized.png'
        img_resized.save(png_path, 'PNG', optimize=True, compress_level=9)
        png_size = png_path.stat().st_size
        print(f"OK: Optimized PNG: {png_size / 1024:.2f} KB\n")

        # Summary
        print("=" * 60)
        print("Optimization complete!\n")
        print("File Size Comparison:")
        print(f"  Original:          {original_size / 1024:.2f} KB ({original_size / (1024 * 1024):.2f} MB)")
        print(f"  WebP:              {webp_size / 1024:.2f} KB ({(1 - webp_size/original_size) * 100:.1f}% smaller)")
        print(f"  High-Quality WebP: {avif_alt_size / 1024:.2f} KB ({(1 - avif_alt_size/original_size) * 100:.1f}% smaller)")
        print(f"  Optimized PNG:     {png_size / 1024:.2f} KB ({(1 - png_size/original_size) * 100:.1f}% smaller)")
        print("=" * 60 + "\n")

        print("Note: Since Pillow doesn't support AVIF natively, we created a")
        print("   high-quality WebP as an alternative. For true AVIF support, you can:")
        print("   - Use an online converter (e.g., squoosh.app)")
        print("   - Install pillow-avif-plugin")
        print("   - Use Sharp on a native Linux/macOS environment\n")

    except Exception as e:
        print(f"❌ Error during optimization: {e}")
        sys.exit(1)

if __name__ == "__main__":
    optimize_images()
