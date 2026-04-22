#!/usr/bin/env python3
from PIL import Image
import os

def generate_android_icon(size, output_filename):
    """Generate an Android Chrome icon at specified size"""
    logo_path = 'public/images/logo-color.png'
    output_path = f'public/{output_filename}'

    # Load logo
    logo = Image.open(logo_path)

    # Resize maintaining aspect ratio
    logo.thumbnail((size, size), Image.Resampling.LANCZOS)

    # Create white background
    background = Image.new('RGB', (size, size), (255, 255, 255))

    # Center logo
    x = (size - logo.width) // 2
    y = (size - logo.height) // 2

    # Paste logo (handle transparency)
    if logo.mode in ('RGBA', 'LA'):
        background.paste(logo, (x, y), logo)
    else:
        background.paste(logo, (x, y))

    # Save
    background.save(output_path, 'PNG', quality=95)

    # Report
    file_size = os.path.getsize(output_path)
    print(f"Created: {output_path}")
    print(f"   Size: {file_size / 1024:.1f} KB")
    print(f"   Dimensions: {size}x{size} pixels")

    return output_path

def main():
    print("Generating Android Chrome Icons...\n")

    # Generate both sizes
    generate_android_icon(192, 'android-chrome-192x192.png')
    print()
    generate_android_icon(512, 'android-chrome-512x512.png')

    print("\nAndroid icons generation complete!")

if __name__ == '__main__':
    main()
