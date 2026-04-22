# Component Usage Examples

## Generic Theming System

All components use **semantic color naming** for maximum reusability.

## Animation Components

### GlowText
Animated text with glow effect.

```typescript
import { GlowText } from '@/components/animations/text-effects';

// Primary brand color glow (blue)
<GlowText glowColor="primary" intensity="medium">
  Professional Tax Services
</GlowText>

// Accent color glow (amber)
<GlowText glowColor="accent" intensity="high">
  Call Now for Free Consultation
</GlowText>

// Neutral gray glow
<GlowText glowColor="neutral" intensity="low">
  Serving San Diego Since 2019
</GlowText>
```

**Props:**
- `glowColor`: `'primary' | 'accent' | 'neutral'` (default: `'primary'`)
- `intensity`: `'low' | 'medium' | 'high'` (default: `'medium'`)
- `delay`: number (animation delay in seconds)
- `disabled`: boolean (disable animation)

---

### GradientText
Text with animated gradient.

```typescript
import { GradientText } from '@/components/animations/text-effects';

// Primary brand gradient (blue)
<GradientText gradient="primary" animated={true}>
  1Way Home Services
</GradientText>

// Accent gradient (amber)
<GradientText gradient="accent">
  Expert Tax Preparation
</GradientText>

// Vibrant multi-color gradient
<GradientText gradient="vibrant">
  Full-Service Financial Support
</GradientText>
```

**Props:**
- `gradient`: `'primary' | 'accent' | 'vibrant'` (default: `'primary'`)
- `animated`: boolean (enable background animation, default: `true`)

---

### SpringHoverCard
Interactive card with physics-based hover effects.

```typescript
import { SpringHoverCard } from '@/components/animations/interactive-elements';

<SpringHoverCard
  glowColor="primary"
  hoverScale={1.05}
  hoverRotation={2}
>
  <div className="p-6">
    <h3>Tax Planning & Advisory</h3>
    <p>Strategic tax advice for maximum savings</p>
  </div>
</SpringHoverCard>

<SpringHoverCard glowColor="accent" hoverScale={1.08}>
  <div className="p-6">
    <h3>Real Estate Tax Support</h3>
    <p>Expert guidance for property transactions</p>
  </div>
</SpringHoverCard>
```

**Props:**
- `glowColor`: `'primary' | 'accent' | 'neutral'` (default: `'primary'`)
- `hoverScale`: number (scale on hover, default: `1.05`)
- `hoverRotation`: number (rotation in degrees, default: `2`)

---

## UI Components

### ServiceCard
Professional service card with theming support.

```typescript
import { ServiceCard } from '@/components/ui/service-card';
import { ClockIcon } from '@/components/ui/icons/page-icons';

// Primary theme (blue)
<ServiceCard
  title="Tax Planning & Advisory"
  description="Strategic tax advice to maximize your deductions and minimize liability"
  icon={ClockIcon}
  primaryColor="primary"
  featured={true}
  onLearnMore={() => console.log('Learn more clicked')}
  onBookNow={() => console.log('Book now clicked')}
/>

// Accent theme (amber)
<ServiceCard
  title="Mortgage Consulting"
  description="Expert loan guidance for home purchases"
  icon={BuildingIcon}
  primaryColor="accent"
  price="$299"
  priceNote="One-time fee"
  features={[
    'Pre-approval assistance',
    'Rate comparison',
    'Lender negotiation'
  ]}
/>

// Neutral theme (gray)
<ServiceCard
  title="IRS Help & Audit Support"
  description="Professional representation for IRS matters"
  icon={ShieldIcon}
  primaryColor="neutral"
/>
```

**Props:**
- `title`: string (required)
- `description`: string (required)
- `icon`: React.ComponentType (required)
- `primaryColor`: `'primary' | 'accent' | 'neutral'` (default: `'primary'`)
- `featured`: boolean (highlight card)
- `price`: string (optional pricing)
- `priceNote`: string (pricing details)
- `features`: string[] (feature list)
- `onLearnMore`: () => void (callback)
- `onBookNow`: () => void (callback)

---

## Page Icons

Generic, reusable icons from `components/ui/icons/page-icons.tsx`:

```typescript
import {
  ClockIcon,
  DollarIcon,
  StarFilledIcon,
  ShieldIcon,
  PhoneIcon,
  CheckCircleIcon,
  MapPinIcon,
  ArrowRightIcon,
  CalendarIcon,
  DocumentIcon,
  UserIcon,
  HomeIcon,
  BuildingIcon,
} from '@/components/ui/icons/page-icons';

// Usage
<ClockIcon size={24} className="text-blue-500" />
<ShieldIcon size={32} className="text-amber-500" />
<PhoneIcon size={20} />
```

**Common Icons:**
- `ClockIcon` - Time, hours, availability
- `DollarIcon` - Pricing, payments
- `StarFilledIcon` - Ratings, featured items
- `ShieldIcon` - Protection, security, warranty
- `PhoneIcon` - Contact, call-to-action
- `DocumentIcon` - Paperwork, filing, forms
- `CalendarIcon` - Scheduling, appointments
- `HomeIcon` - Property, residential services
- `BuildingIcon` - Commercial, business services

---

## Theming Best Practices

### 1. Use Semantic Colors
```typescript
// ✅ GOOD - Semantic naming
<GlowText glowColor="primary">Headline</GlowText>
<ServiceCard primaryColor="accent" />

// ❌ BAD - Business-specific naming
<GlowText glowColor="cooling">Headline</GlowText>
<ServiceCard primaryColor="heating" />
```

### 2. Leverage CSS Variables
```typescript
// ✅ GOOD - CSS variable (changes with theme)
className="text-brand-primary"
className="bg-brand-primary"

// ✅ ALSO GOOD - Standard Tailwind (for primary brand)
className="text-blue-600"
className="bg-amber-500"

// ❌ BAD - Non-existent custom class
className="text-cooling-400"
className="bg-heating-500"
```

### 3. Component Composition
```typescript
// Combine components for rich experiences
<SpringHoverCard glowColor="primary">
  <div className="p-8">
    <GlowText glowColor="accent" intensity="high">
      Featured Service
    </GlowText>
    <GradientText gradient="primary">
      Tax Planning & Advisory
    </GradientText>
    <p className="mt-4 text-gray-600">
      Strategic guidance for maximum savings
    </p>
  </div>
</SpringHoverCard>
```

---

## Customizing for Your Business

### Update Brand Colors

**Step 1:** Edit `app/globals.css`
```css
:root {
  /* Primary brand color */
  --color-primary: #YOUR_PRIMARY;
  --color-primary-light: #YOUR_PRIMARY_LIGHT;
  --color-primary-dark: #YOUR_PRIMARY_DARK;

  /* Accent color */
  --color-accent: #YOUR_ACCENT;
  --color-accent-light: #YOUR_ACCENT_LIGHT;
  --color-accent-dark: #YOUR_ACCENT_DARK;
}
```

**Step 2:** Components automatically update (no code changes needed!)

```typescript
// This component will use YOUR colors automatically
<GlowText glowColor="primary">Your Business Name</GlowText>
<ServiceCard primaryColor="accent" title="Your Service" />
```

---

## Animation Library Reference

Import from `@/components/animations`:

**Text Effects:**
- `HeroText` - Staggered letter animation
- `TypewriterText` - Typing animation
- `AnimatedCounter` - Number counting
- `GlowText` - Glowing text
- `GradientText` - Gradient text
- `SlidingReveal` - Sliding reveal
- `WordReveal` - Word-by-word reveal
- `PulsingText` - Pulsing animation

**Scroll Animations:**
- `InViewAnimation` - Trigger on scroll into view
- `ParallaxElement` - Parallax scrolling
- `ScrollProgress` - Scroll progress indicator
- `RevealOnScroll` - Reveal animation on scroll
- `StaggeredReveal` - Stagger child animations
- `ScrollCounter` - Count up on scroll

**Interactive:**
- `SpringButton` - Physics-based button
- `SpringHoverCard` - Hoverable card
- `FloatingElement` - Floating animation
- `SpringModal` - Animated modal
- `ServiceCardsTrail` - Trail animation
- `SpringInput` - Animated input

**Page Transitions:**
- `PageTransition` - Full page transitions
- `RouteTransition` - Route change transitions
- `LoadingTransition` - Loading states
- `SectionTransition` - Section transitions
- `ModalTransition` - Modal animations
