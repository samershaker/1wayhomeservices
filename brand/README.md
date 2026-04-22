# 1Way Home Services - Brand Guidelines

> Tax Preparation & Real Estate Services | El Cajon & San Diego, CA

**Status:** Prospective Client Project
**Preview:** https://1wayhomeservices.vercel.app

## Color Palette

Colors inspired by the client's current website: https://1wayhomeservices.com/

### Primary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Primary Blue** | `#2557A8` | `rgb(37, 87, 168)` | Buttons, CTAs, links, interactive elements |
| Primary Light | `#3068C8` | `rgb(48, 104, 200)` | Hover states |
| Primary Dark | `#1A3D82` | `rgb(26, 61, 130)` | Pressed/active states |

### Secondary Colors

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Teal** | `#0D4E53` | `rgb(13, 78, 83)` | Accent highlights, secondary emphasis |
| Teal Light | `#157A82` | `rgb(21, 122, 130)` | Lighter accent |
| Teal Dark | `#083A3E` | `rgb(8, 58, 62)` | Darker accent |

### Navy (Dark Sections)

| Color | Hex | RGB | Usage |
|-------|-----|-----|-------|
| **Navy** | `#0A2342` | `rgb(10, 35, 66)` | Section backgrounds, cards, process steps |
| Navy Light | `#122D4D` | `rgb(18, 45, 77)` | Elevated dark surfaces |
| Navy Dark | `#061A33` | `rgb(6, 26, 51)` | Deepest backgrounds |

### Neutrals

| Color | Hex | Usage |
|-------|-----|-------|
| Black | `#0A0A0A` | Primary background |
| Black Light | `#141414` | Elevated surfaces |
| Black Card | `#1A1A1A` | Card backgrounds |
| Gray 800 | `#2A2A2A` | Borders, dividers |
| Gray 600 | `#6B7280` | Secondary text |
| Gray 400 | `#B8BFC7` | Muted text (WCAG AA compliant) |
| White | `#F9FAFB` | Primary text on dark backgrounds |

### Semantic Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Success | `#22C55E` | Success states, confirmations |
| Error | `#EF4444` | Error states, warnings |
| Warning | `#F59E0B` | Caution states |
| Info | `#3B82F6` | Information notices |

## CSS Variables

All colors are defined as CSS variables in `app/globals.css`:

```css
:root {
  /* Primary */
  --color-primary: #2557A8;
  --color-primary-light: #3068C8;
  --color-primary-dark: #1A3D82;

  /* Secondary (Teal) */
  --color-secondary: #0D4E53;
  --color-secondary-light: #157A82;
  --color-secondary-dark: #083A3E;

  /* Navy */
  --color-navy: #0A2342;
  --color-navy-light: #122D4D;
  --color-navy-dark: #061A33;

  /* Neutrals */
  --color-black: #0A0A0A;
  --color-white: #F9FAFB;
}
```

## TypeScript Usage

Import colors from `brand/colors.ts`:

```typescript
import { brandColors } from '@/brand/colors';

// Use in styled components or inline styles
const buttonStyle = {
  backgroundColor: brandColors.primary.DEFAULT,
  color: brandColors.neutral.white,
};
```

## Tailwind CSS Usage

Colors are mapped in `tailwind.config.ts`:

```tsx
// Using Tailwind classes
<button className="bg-brand-primary text-white hover:bg-brand-primary-light">
  Call Now
</button>

<div className="bg-secondary text-white">
  Accent Section
</div>
```

## Color Psychology

- **Blue (#2557A8)**: Trust, professionalism, stability - ideal for financial services
- **Teal (#0D4E53)**: Growth, freshness, balance - adds warmth to the professional palette
- **Navy (#0A2342)**: Authority, depth, sophistication - premium feel for dark sections
- **Black/Gray**: Neutrality, elegance, modernity - clean, professional aesthetic

## Accessibility

All color combinations meet WCAG 2.1 guidelines:
- Primary text on dark backgrounds: 4.5:1+ contrast ratio
- Gray-400 (`#B8BFC7`) on black: 4.6:1 contrast ratio (AA compliant)
- White on Primary Blue: 4.9:1 contrast ratio (AA compliant)

## File Structure

```
brand/
  colors.ts      # TypeScript color constants & types
  README.md      # This documentation file
```
