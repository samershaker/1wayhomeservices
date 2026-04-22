# Everglade Heating & Air — Website

Professional HVAC service website for **Everglade Heating and Air**, serving the greater San Diego area.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + DaisyUI
- **Animations:** Framer Motion, React Spring
- **Testing:** Vitest + React Testing Library + Playwright
- **Deployment:** Vercel (auto-deploy from `main`)

## Project Structure

```
app/                    # Next.js App Router pages
  en/                   # English locale
    services/[service]/ # Dynamic service pages
    services/[service]/[location]/ # Service × location pages
    locations/[location]/ # Location pages
    contact/            # Contact page
  layout.tsx            # Root layout with metadata
  sitemap.ts            # Dynamic XML sitemap
  robots.ts             # Robots.txt with AI crawler rules
components/             # React components
  navigation/           # Header, nav
  cinematic/            # Premium animation components
  ui/                   # UI primitives
  animations/           # Animation components
  layout/               # Layout wrappers
lib/                    # Utilities
  constants.ts          # Services, locations, contact info
  seo.ts                # SEO metadata & schema generation
  page-generation.ts    # Static params, sitemap, internal linking
  animations.ts         # Animation configs & utilities
__tests__/              # Test suite
  lib/                  # Unit tests for lib utilities
  components/           # Component tests
  seo/                  # SEO audit tests
  build/                # Build verification tests
```

## Getting Started

```bash
npm install
npm run dev          # http://localhost:3000
```

## Build & Deploy

```bash
npm run build        # Production build
npm run start        # Serve production build
```

Pushes to `main` auto-deploy to Vercel.

## Testing

```bash
npm test             # Run all tests
npm run test:watch   # Watch mode
npm run test:coverage # With coverage report
npm run typecheck    # TypeScript check
```

## SEO Features

- **127 statically generated pages** (7 services × 14 locations + service pages + location pages + home + contact)
- Dynamic XML sitemap with priority weighting
- Schema.org structured data (LocalBusiness, Service, FAQ)
- AI crawler optimization in robots.txt (GPTBot, Claude, etc.)
- Canonical URLs, Open Graph, Twitter Cards

## Key Pages

| Route | Description |
|-------|-------------|
| `/en` | Homepage |
| `/en/services/[service]` | Service detail (7 services) |
| `/en/services/[service]/[location]` | Service × location (98 combos) |
| `/en/locations/[location]` | Location landing (14 locations) |
| `/en/contact` | Contact page |
