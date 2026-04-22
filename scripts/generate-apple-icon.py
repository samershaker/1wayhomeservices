#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate Apple Touch Icon (180x180) from company logo
For iOS home screen display
"""
from PIL import Image
import os
import sys

# Set UTF-8 encoding for Windows compatibility
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

def generate_apple_icon():
    print("Generating Apple Touch Icon...")

    # Paths
    logo_path = 'public/images/logo-color.png'
    output_path = 'public/apple-touch-icon.png'

    # Load logo
    print(f"   Loading logo from: {logo_path}")
    logo = Image.open(logo_path)
    print(f"   Original size: {logo.size[0]}x{logo.size[1]}")

    # Resize to fit within 180x180 maintaining aspect ratio
    logo.thumbnail((180, 180), Image.Resampling.LANCZOS)
    print(f"   Resized to: {logo.size[0]}x{logo.size[1]}")

    # Create white background (180x180)
    background = Image.new('RGB', (180, 180), (255, 255, 255))

    # Calculate centering position
    x = (180 - logo.width) // 2
    y = (180 - logo.height) // 2

    # Paste logo on background (handles transparency)
    if logo.mode in ('RGBA', 'LA'):
        background.paste(logo, (x, y), logo)
    else:
        background.paste(logo, (x, y))

    # Save with high quality
    background.save(output_path, 'PNG', quality=95, optimize=True)

    # Report results
    size = os.path.getsize(output_path)
    print(f"\nApple Touch Icon created successfully!")
    print(f"   Output: {output_path}")
    print(f"   Dimensions: 180x180 pixels")
    print(f"   File size: {size / 1024:.1f} KB")
    print(f"\nReady for iOS home screen display")

if __name__ == '__main__':
    generate_apple_icon()
