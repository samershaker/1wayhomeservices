# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**This is a prospective client project.** We are building a modern website for 1Way Home Services to win them as a client. The site showcases tax preparation and real estate services for the El Cajon and San Diego areas, offering tax planning, filing, bookkeeping, IRS support, real estate tax guidance, and mortgage consulting.

**Status:** In Development (Prospective Client)
**Preview Site:** https://1wayhomeservices.vercel.app
**GitHub Repo:** https://github.com/samershaker/1wayhomeservices
**Client's Current Site:** https://1wayhomeservices.com (for reference only)

## Tech Stack

- **Framework:** Next.js 16 with App Router
- **Build Mode:** Static export (`output: 'export'`)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + custom CSS variables
- **Animations:** Framer Motion + React Spring
- **Deployment:** Vercel
- **Analytics:** Vercel Analytics + Speed Insights

## Development Commands

```bash
# Development
npm run dev              # Start dev server (Next.js 16 with Turbopack)

# Build & Deploy
npm run build            # Build static site to /out directory
npm start                # Serve production build

# Quality Checks
npm run lint             # Run ESLint
npm run typecheck        # Run TypeScript compiler without emitting files
```

## Architecture & Key Patterns

### Static Export Configuration

This site uses Next.js static export mode (`output: 'export'` in next.config.mjs). This means:
- **No server-side features:** No API routes, no ISR, no dynamic routes, no middleware
- **No redirects/headers in next.config.mjs:** These are not supported with static export
- **Images:** Set to `unoptimized: true` with custom loader (lib/imageLoader.js)
- **Build output:** Generates static HTML/CSS/JS in `/out` directory
- **Trailing slashes:** Configured with `trailingSlash: true` for consistent routing

### Directory Structure

```
app/
  ├── layout.tsx           # Root layout with metadata, fonts
  ├── page.tsx             # Redirect to /en/
  ├── globals.css          # Global styles, CSS variables, Tailwind
  └── en/
      └── page.tsx         # Main landing page (all sections in one file)

brand/
  ├── colors.ts            # TypeScript brand color constants & types
  └── README.md            # Brand color documentation & usage guide

components/
  ├── animations/          # Animation utilities and demos
  ├── cinematic/           # Premium animation components (glassmorphic cards, parallax, smooth scroll)
  ├── layout/              # ClientLayout with SmoothScroll wrapper
  ├── navigation/          # Header component
  └── ui/                  # UI components (service cards, hero, reviews, etc.)

lib/
  ├── constants.ts         # All business data (services, testimonials, FAQ, team, contact)
  ├── animations.ts        # Animation configs for Framer Motion & React Spring
  ├── seo.ts              # SEO utilities
  ├── page-generation.ts  # Page generation utilities
  └── imageLoader.js      # Custom image loader for static export

public/
  ├── images/             # Static images (logos, team photos, hero images)
  └── videos/             # Video assets
```

### Design System & Styling

**Brand Colors** (inspired by client's current site https://1wayhomeservices.com/):
- Primary: `#2557A8` (royal blue — trust, professionalism)
- Secondary: `#7E57C2` (deep purple — distinction, warmth)
- Navy: `#0A2342` (dark blue — authority, depth) - used for dark sections
- Neutrals: Black (`#0A0A0A`), white (`#F9FAFB`), grays

See `brand/` folder for complete color documentation and TypeScript exports.

**CSS Architecture:**
- All design tokens defined in `app/globals.css` using CSS variables
- Brand colors documented in `brand/colors.ts` with TypeScript types
- Custom utility classes for glass effects, gradients, animations
- Tailwind configured with extended color palette
- Font setup: Syne (display) + DM Sans (body) via Google Fonts

**Key CSS Classes (defined in globals.css):**
- `.glass-card` / `.glass-card-premium` — Glassmorphic containers
- `.btn-primary` / `.btn-secondary` / `.btn-teal` — Button styles
- `.text-gradient-blue` / `.text-gradient-teal` — Gradient text effects
- `.hover-lift` — Hover elevation effect
- `.section-gradient-navy` / `.section-gradient-subtle` — Section backgrounds
- `.stat-number` / `.stat-number-teal` — Stats with gradient animation

### Data Management

**All business content is centralized in `lib/constants.ts`:**
- `SERVICES` — 7 service offerings (tax planning, filing, payroll, bookkeeping, IRS help, real estate tax, mortgage)
- `CONTACT_INFO` — Phone, email, address, hours
- `TEAM_MEMBERS` — Sam Eram (CFO/CPA), Bakhan Kareem (CEO/Real Estate)
- `PROCESS_STEPS` — 4-step process for clients
- `TESTIMONIALS` — Client reviews
- `FAQ_ITEMS` — Common questions
- `STATS` — Business metrics (100+ customers, 6 years, 100% satisfaction)
- `ANIMATION_CONFIG` — Animation timing and spring configurations

**To update content:** Edit `lib/constants.ts` — do not hardcode content in components.

### Page Structure

The main landing page (`app/en/page.tsx`) is a single-file component with all sections:
1. Navigation (fixed header)
2. HeroSection (full-screen hero with team photo)
3. StatsBand (3 stats in a row)
4. ServicesSection (7 service cards in grid)
5. AboutSection (team bios)
6. ProcessSection (4-step process)
7. TestimonialSection (client review)
8. FAQSection (accordion-style FAQ)
9. CTABanner (call-to-action with phone number)
10. Footer

Each section uses Framer Motion's `AnimateOnScroll` component for scroll-triggered animations.

### Component Theming System

The website uses a generic, semantic theming system that makes components reusable across different businesses:

**Color Semantics:**
- `primary` - Main brand color (blue #2557A8 for 1Way Home Services)
- `secondary` - Secondary accent color (deep purple #7E57C2)
- `navy` - Dark section backgrounds (#0A2342)
- `neutral` - Grayscale for neutral elements

**Usage:**
- Animation components accept `glowColor="primary"` or `"secondary"` or `"neutral"`
- Service cards accept `primaryColor="primary"` or `"secondary"` or `"neutral"`
- **Never use business-specific terms** (like "cooling", "heating") in component props
- All components use generic, semantic naming

**To Change Brand Colors:**
1. Update CSS variables in `app/globals.css` (`:root` section)
2. Update color constants in `brand/colors.ts`
3. Update Tailwind color mapping in `tailwind.config.ts`
4. No component code changes needed - everything uses CSS variables

**Type Definitions:**
- Generic types defined in `lib/types.ts`
- Brand color types in `brand/colors.ts`
- `BrandColorVariant`, `IntensityLevel`, `AnimationMode`, etc.

### Animation Patterns

**Framer Motion (primary):**
- `fadeUp` variant: opacity + y-axis translation
- `stagger` variant: Sequential child animations
- `AnimateOnScroll` component: Wraps sections for scroll-triggered reveals
- `useInView` hook: Detects when elements enter viewport

**React Spring (secondary):**
- Configurations in `lib/animations.ts` (gentle, bouncy, slow, snappy, wobbly)
- Used for more physics-based animations

**Performance:**
- Animations trigger once on scroll (not on every scroll)
- `once: true` in `useInView` to prevent re-triggering
- Reduced motion support via `prefers-reduced-motion` media query

### TypeScript Configuration

- **Strict mode enabled**
- **Path alias:** `@/*` maps to root directory
- **Target:** ES2017
- **Module resolution:** bundler (Next.js 16)
- **JSX:** react-jsx (Next.js 16 no longer needs React imports)

### ESLint

Uses Next.js recommended config (`next/core-web-vitals`, `next/typescript`).

## Common Tasks

### Adding a New Service

1. Add service object to `SERVICES` array in `lib/constants.ts`
2. Service card will automatically appear in ServicesSection
3. Update icon mapping in `app/en/page.tsx` if using new icon

### Updating Contact Info

Edit `CONTACT_INFO` object in `lib/constants.ts`. Phone number appears in:
- Navigation "Call Now" button
- Hero CTA button
- CTA Banner
- Footer

### Adding New Animations

1. Define animation variants in `lib/animations.ts`
2. Import and use in component via `motionPresets` or `springConfigs`
3. Consider reduced motion preferences

### Modifying Brand Colors

1. Update TypeScript constants in `brand/colors.ts`
2. Update CSS variables in `app/globals.css` (`:root` section)
3. Update Tailwind mappings in `tailwind.config.ts` if adding new colors
4. Colors are referenced via `var(--color-name)` in CSS
5. See `brand/README.md` for complete color documentation

### Building for Production

```bash
npm run build
# Output: /out directory with static files
# Deploy: Upload /out to static hosting or Vercel
```

**Vercel deployment is automatic on push to main branch.**

## Important Constraints

1. **No dynamic routes:** Static export doesn't support dynamic routing
2. **No API routes:** All data must be in constants or fetched client-side
3. **No server components with data fetching:** Use client components with `'use client'`
4. **Images must be unoptimized:** Next.js image optimization requires a server
5. **Redirects/rewrites in code only:** next.config.mjs can't define redirects with static export

## Browser Support

Modern browsers with ES2017+ support. Animations gracefully degrade with `prefers-reduced-motion`.
