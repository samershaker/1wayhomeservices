/**
 * 1Way Home Services - Brand Color System
 *
 * These colors are extracted from the live website at https://1wayhomeservices.com/
 * Last updated: 2025-04-22
 *
 * Color palette focuses on trust and professionalism for tax & real estate services.
 */

export const brandColors = {
  // ═══════════════════════════════════════════════════════════════
  // PRIMARY - Royal Blue (Trust, Professionalism, Stability)
  // ═══════════════════════════════════════════════════════════════
  primary: {
    DEFAULT: '#2557A8',     // Main brand blue - buttons, CTAs, links
    light: '#3068C8',       // Lighter variant for hover states
    dark: '#1A3D82',        // Darker variant for pressed states
    glow: 'rgba(37, 87, 168, 0.25)', // Glow/shadow effect
  },

  // ═══════════════════════════════════════════════════════════════
  // SECONDARY - Collapses into the Primary blue family (monochromatic brand)
  // ═══════════════════════════════════════════════════════════════
  secondary: {
    DEFAULT: '#2557A8',     // Same hex as primary — one brand color
    light: '#6B9FE8',       // Brighter blue for text accents (AA on dark)
    dark: '#1A3D82',        // Same as primary-dark
  },

  // ═══════════════════════════════════════════════════════════════
  // NAVY - Dark Blue (Authority, Depth, Trust)
  // ═══════════════════════════════════════════════════════════════
  navy: {
    DEFAULT: '#0A2342',     // Dark navy for section backgrounds, cards
    light: '#122D4D',       // Lighter navy
    dark: '#061A33',        // Darker navy
  },

  // ═══════════════════════════════════════════════════════════════
  // NEUTRALS - Black, White, Grays
  // ═══════════════════════════════════════════════════════════════
  neutral: {
    black: '#0A0A0A',       // Primary background
    blackLight: '#141414',  // Elevated surfaces
    blackCard: '#1A1A1A',   // Card backgrounds
    gray800: '#2A2A2A',     // Borders, dividers
    gray600: '#6B7280',     // Secondary text
    gray500: '#9CA3AF',     // Muted text
    gray400: '#B8BFC7',     // WCAG AA compliant on black (4.6:1)
    gray300: '#D1D5DB',     // Light borders
    gray200: '#E5E7EB',     // Very light backgrounds
    white: '#F9FAFB',       // Primary text on dark
  },

  // ═══════════════════════════════════════════════════════════════
  // SEMANTIC - Status & Feedback Colors
  // ═══════════════════════════════════════════════════════════════
  semantic: {
    success: '#22C55E',     // Green - Success states
    error: '#EF4444',       // Red - Error states
    warning: '#F59E0B',     // Amber - Warning states
    info: '#3B82F6',        // Blue - Information
  },

  // ═══════════════════════════════════════════════════════════════
  // LINK COLORS
  // ═══════════════════════════════════════════════════════════════
  link: {
    DEFAULT: '#1A4DBD',     // Standard link color
    hover: '#2563EB',       // Link hover state
    visited: '#4338CA',     // Visited link color
  },
} as const;

// Type exports for TypeScript consumers
export type BrandColor = keyof typeof brandColors;
export type PrimaryColor = keyof typeof brandColors.primary;
export type SecondaryColor = keyof typeof brandColors.secondary;
export type NavyColor = keyof typeof brandColors.navy;
export type NeutralColor = keyof typeof brandColors.neutral;
export type SemanticColor = keyof typeof brandColors.semantic;
export type LinkColor = keyof typeof brandColors.link;

// CSS Variable mapping for easy reference
export const cssVariables = {
  '--color-primary': brandColors.primary.DEFAULT,
  '--color-primary-light': brandColors.primary.light,
  '--color-primary-dark': brandColors.primary.dark,
  '--color-primary-glow': brandColors.primary.glow,

  '--color-secondary': brandColors.secondary.DEFAULT,
  '--color-secondary-light': brandColors.secondary.light,
  '--color-secondary-dark': brandColors.secondary.dark,

  '--color-navy': brandColors.navy.DEFAULT,
  '--color-navy-light': brandColors.navy.light,
  '--color-navy-dark': brandColors.navy.dark,

  '--color-black': brandColors.neutral.black,
  '--color-black-light': brandColors.neutral.blackLight,
  '--color-black-card': brandColors.neutral.blackCard,
  '--color-gray-800': brandColors.neutral.gray800,
  '--color-gray-600': brandColors.neutral.gray600,
  '--color-gray-500': brandColors.neutral.gray500,
  '--color-gray-400': brandColors.neutral.gray400,
  '--color-gray-300': brandColors.neutral.gray300,
  '--color-gray-200': brandColors.neutral.gray200,
  '--color-white': brandColors.neutral.white,

  '--color-success': brandColors.semantic.success,
  '--color-error': brandColors.semantic.error,
  '--color-warning': brandColors.semantic.warning,
  '--color-info': brandColors.semantic.info,

  '--color-link': brandColors.link.DEFAULT,
  '--color-link-hover': brandColors.link.hover,
} as const;
