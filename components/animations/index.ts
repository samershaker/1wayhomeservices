/**
 * Animation Components Export Index
 * Centralizes all animation components for easy importing throughout the Business website
 */

// Text Effects Components
export {
  default as HeroText,
  TypewriterText,
  AnimatedCounter,
  GlowText,
  SlidingReveal,
  WordReveal,
  PulsingText,
  GradientText
} from './text-effects';

// Scroll Animation Components
export {
  InViewAnimation,
  ParallaxElement,
  ScrollProgress,
  RevealOnScroll,
  StaggeredReveal,
  StaggerItem,
  EquipmentAnimation,
  ScrollCounter,
  ScrollRevealImage
} from './scroll-animations';

// Interactive Elements with Physics
export {
  SpringButton,
  SpringHoverCard,
  FloatingElement,
  SpringModal,
  SpringThermostat,
  ServiceCardsTrail,
  SpringInput
} from './interactive-elements';

// Page Transitions
export {
  PageTransition,
  RouteTransition,
  LoadingTransition,
  SectionTransition,
  LayoutTransition,
  StaggeredSections,
  ModalTransition,
  NavTransition,
  EquipmentShowcase
} from './page-transitions';

// Animation utilities and configurations
export * from '../../lib/animations';

// All components are individually exported above
// Use: import { HeroText, TypewriterText, etc. } from './animations'

// Animation presets for quick usage
export const AnimationPresets = {
  // Hero section animations
  heroTitle: {
    component: 'HeroText',
    props: { delay: 0.2, className: 'text-4xl md:text-6xl font-bold' }
  },
  
  heroSubtitle: {
    component: 'TypewriterText',
    props: { speed: 30, showCursor: false, startDelay: 1000 }
  },
  
  // Service section animations
  serviceCard: {
    component: 'SpringHoverCard',
    props: { hoverScale: 1.05, glowColor: 'cooling' }
  },
  
  serviceButton: {
    component: 'SpringButton',
    props: { variant: 'primary', size: 'lg' }
  },
  
  // Statistics animations
  statCounter: {
    component: 'ScrollCounter',
    props: { duration: 2000, decimals: 0 }
  },
  
  // Equipment showcase
  coolingEquipment: {
    component: 'EquipmentShowcase',
    props: { equipmentType: 'cooling' }
  },
  
  heatingEquipment: {
    component: 'EquipmentShowcase',
    props: { equipmentType: 'heating' }
  }
};

// Quick animation builders
export const createAnimation = {
  fadeInUp: (delay = 0) => ({
    component: 'InViewAnimation',
    props: { animation: 'fadeInUp', delay }
  }),
  
  slideInLeft: (delay = 0) => ({
    component: 'RevealOnScroll',
    props: { direction: 'left', delay }
  }),
  
  staggeredCards: (staggerDelay = 0.1) => ({
    component: 'StaggeredReveal',
    props: { staggerDelay }
  }),
  
  pulsingCTA: (intensity: 'subtle' | 'normal' | 'strong' = 'normal') => ({
    component: 'PulsingText',
    props: { intensity }
  })
};