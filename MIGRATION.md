# Component Theming Migration Guide

## Overview
This codebase was refactored from an HVAC template to use **generic, reusable components** with semantic naming. All business-specific terminology has been replaced with generic, professional component APIs.

## Breaking Changes

### 1. Animation Components

**GlowText, SpringHoverCard, GradientText**

**Before:**
```typescript
<GlowText glowColor="cooling">Text</GlowText>
<GlowText glowColor="heating">Text</GlowText>
<GradientText gradient="heating">Text</GradientText>
<SpringHoverCard glowColor="heating">...</SpringHoverCard>
```

**After:**
```typescript
<GlowText glowColor="primary">Text</GlowText>
<GlowText glowColor="accent">Text</GlowText>
<GradientText gradient="primary">Text</GradientText>
<SpringHoverCard glowColor="primary">...</SpringHoverCard>
```

### 2. Service Cards

**ServiceCard component**

**Before:**
```typescript
<ServiceCard primaryColor="cooling" ... />
<ServiceCard primaryColor="heating" ... />
```

**After:**
```typescript
<ServiceCard primaryColor="primary" ... />
<ServiceCard primaryColor="accent" ... />
```

### 3. Removed Components

The following HVAC-specific components have been **completely removed**:

- `SpringThermostat` - HVAC thermostat control (unused)
- `EquipmentAnimation` - HVAC equipment animations (unused)
- `EquipmentShowcase` - HVAC showcase transitions (unused)
- `ServiceOrnamentSets` - Business-specific icon sets (should be defined locally)

**If you need these:** They were template-specific. Create generic versions or use existing animation components.

### 4. Removed Icons

The following HVAC-specific icons have been **deleted**:
- `AirConditionerIcon`
- `FurnaceIcon`
- `SnowflakeIcon`
- `DuctworkIcon`
- `MiniSplitIcon`

**Kept Generic Icons:**
- `ThermometerIcon` (can represent metrics/data)
- `WrenchIcon` (service/tools)
- `EmergencyIcon` (24/7 support)
- `DiagnosticIcon` (analysis/inspection)
- `PhoneIcon`, `LocationIcon` (contact)

**Use instead:** Generic icons from `components/ui/icons/page-icons.tsx`:
- `HomeIcon`, `BuildingIcon` (business/property)
- `ShieldIcon` (protection/warranty)
- `DocumentIcon` (paperwork/filing)
- `CalendarIcon` (scheduling)

### 5. Color System Changes

**Old Tailwind Classes (REMOVED):**
- `text-cooling-*` / `bg-cooling-*`
- `text-heating-*` / `bg-heating-*`
- `text-everglade-*` / `bg-everglade-*` (old brand name)

**New Tailwind Classes:**
- `text-blue-*` / `bg-blue-*` (primary brand color)
- `text-amber-*` / `bg-amber-*` (accent color)
- `text-brand-primary` / `bg-brand-primary` (maps to CSS variables)

**CSS Variables (defined in `app/globals.css`):**
```css
--color-primary: #2251A3;
--color-accent: #D4A853;
```

### 6. Animation Presets

**Before (in `components/animations/index.ts`):**
```typescript
serviceCard: {
  component: 'SpringHoverCard',
  props: { hoverScale: 1.05, glowColor: 'cooling' }
},
coolingEquipment: { component: 'EquipmentShowcase', props: { equipmentType: 'cooling' } }
```

**After:**
```typescript
serviceCard: {
  component: 'SpringHoverCard',
  props: { hoverScale: 1.05, glowColor: 'primary' }
}
// Equipment presets removed
```

## Testing Your Migration

Run this command to find any remaining old references:
```bash
# Should return ZERO results
grep -r "cooling\|heating\|everglade" --include="*.tsx" --include="*.ts" --exclude-dir=node_modules
```

## Type System

**New Generic Types (in `lib/types.ts`):**
```typescript
export type BrandColorVariant = 'primary' | 'secondary' | 'accent' | 'neutral';
export type IntensityLevel = 'low' | 'medium' | 'high';
export type AnimationMode = 'subtle' | 'normal' | 'energetic';
```

## Customizing for Your Business

To adapt this template for a different business:

1. **Update CSS Variables** (`app/globals.css`):
```css
:root {
  --color-primary: #YOUR_PRIMARY_COLOR;
  --color-accent: #YOUR_ACCENT_COLOR;
}
```

2. **Update Business Data** (`lib/constants.ts`):
   - Change `SERVICES` array
   - Update `CONTACT_INFO`
   - Replace `TESTIMONIALS`
   - Modify `TEAM_MEMBERS`

3. **Replace Icons** (if needed):
   - Add business-specific icons to `components/ui/icons/page-icons.tsx`
   - Use existing generic icons where possible

4. **No component code changes needed!** All components use CSS variables and generic props.

## Migration Checklist

- [ ] Replace all `glowColor="cooling"` with `glowColor="primary"`
- [ ] Replace all `glowColor="heating"` with `glowColor="accent"`
- [ ] Replace all `primaryColor="cooling"` with `primaryColor="primary"`
- [ ] Replace all `primaryColor="heating"` with `primaryColor="accent"`
- [ ] Remove imports of deleted components (SpringThermostat, EquipmentAnimation, etc.)
- [ ] Remove imports of deleted icons (AirConditionerIcon, FurnaceIcon, etc.)
- [ ] Replace `everglade-*` color classes with standard Tailwind colors
- [ ] Update `lib/constants.ts` with your business data
- [ ] Update CSS variables in `app/globals.css` with your brand colors
- [ ] Run build: `npm run build`
- [ ] Verify: `grep -r "cooling\|heating\|everglade" --include="*.tsx"` returns 0 results
