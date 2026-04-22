/**
 * Generic theming types for any business
 *
 * These types provide semantic naming for component props and theming,
 * replacing business-specific types (e.g., 'cooling', 'heating') with
 * generic, reusable variants.
 */

// Generic color semantic types
export type BrandColorVariant = 'primary' | 'secondary' | 'accent' | 'neutral';

// Generic intensity levels for effects
export type IntensityLevel = 'low' | 'medium' | 'high';

// Generic animation modes
export type AnimationMode = 'subtle' | 'normal' | 'energetic';

// Component size variants
export type ComponentSize = 'sm' | 'md' | 'lg';

// Button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
