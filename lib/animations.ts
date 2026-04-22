/**
 * Animation Utilities for Business Website
 * Provides reusable animation configurations and utilities for Motion Primitives and React Spring
 */

// Spring configuration types for React Spring v10 compatibility
interface SpringConfig {
  tension: number;
  friction: number;
  mass: number;
}

// Shared motion constants used across the site
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;
export const SCROLL_VIEWPORT = { once: true, margin: "-80px" as const };

// Motion Primitives Animation Presets
export const motionPresets = {
  // Fade up animation for sections (using hidden/visible for variants)
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } },
  } as const,

  // Stagger animation for containers
  stagger: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  } as const,

  // Text animations
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  
  fadeInDown: {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  
  slideInLeft: {
    initial: { opacity: 0, x: -30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7 }
  },
  
  slideInRight: {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.7 }
  },
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  }
};

// React Spring Configuration Presets
export const springConfigs: Record<string, SpringConfig> = {
  // Gentle animations for text and UI elements
  gentle: {
    tension: 120,
    friction: 14,
    mass: 1
  },
  
  // Bouncy animations for interactive elements
  bouncy: {
    tension: 300,
    friction: 10,
    mass: 1
  },
  
  // Slow and smooth for large elements
  slow: {
    tension: 80,
    friction: 20,
    mass: 1.5
  },
  
  // Fast and snappy for buttons and small interactions
  snappy: {
    tension: 400,
    friction: 25,
    mass: 0.8
  },

  // Wobbly effect for attention-grabbing elements
  wobbly: {
    tension: 180,
    friction: 12,
    mass: 1
  }
};

// Stagger animation utilities
export const staggerConfig = {
  container: {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  },
  
  item: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  }
};

// Viewport-based animation triggers
export const inViewConfig = {
  threshold: 0.1,
  triggerOnce: true,
  rootMargin: '-50px 0px'
};

// Reduced motion support
export const getAnimationProps = (animationKey: 'fadeInUp' | 'fadeInDown' | 'slideInLeft' | 'slideInRight' | 'scaleIn') => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const preset = motionPresets[animationKey];

  if (prefersReducedMotion && 'initial' in preset && 'animate' in preset) {
    return {
      initial: preset.initial,
      animate: preset.animate,
      transition: { duration: 0.01 } // Almost instant for accessibility
    };
  }

  return preset;
};

// Generic service animation utilities
export const serviceAnimations = {
  // Primary brand color effect - blue glow (#2251A3)
  primary: {
    boxShadow: [
      '0 0 0px rgba(34, 81, 163, 0)',
      '0 0 20px rgba(34, 81, 163, 0.4)',
      '0 0 30px rgba(34, 81, 163, 0.6)',
      '0 0 20px rgba(34, 81, 163, 0.4)',
      '0 0 0px rgba(34, 81, 163, 0)'
    ],
    y: [0, -2, 0, 2, 0]
  },

  // Accent color effect - amber glow (#D4A853)
  accent: {
    boxShadow: [
      '0 0 0px rgba(212, 168, 83, 0)',
      '0 0 20px rgba(212, 168, 83, 0.4)',
      '0 0 30px rgba(212, 168, 83, 0.6)',
      '0 0 20px rgba(212, 168, 83, 0.4)',
      '0 0 0px rgba(212, 168, 83, 0)'
    ],
    scale: [1, 1.02, 1, 1.01, 1]
  },

  // Subtle animation - minimal movement
  subtle: {
    rotate: [0, 2, -2, 1, 0],
    scale: [1, 1.01, 0.99, 1.005, 1]
  }
};

// Performance optimization utilities
export const animationUtils = {
  // Debounce scroll animations
  debounce: <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function executedFunction(...args: T) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },
  
  // Check if element is in viewport
  isInViewport: (element: Element) => {
    const rect = element.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;
    
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= windowHeight &&
      rect.right <= windowWidth
    );
  },
  
  // Calculate animation delay based on element index
  calculateDelay: (index: number, baseDelay = 0.1) => index * baseDelay,
  
  // Generate random animation variations
  randomVariation: (base: number, variation = 0.2) => {
    const min = base * (1 - variation);
    const max = base * (1 + variation);
    return Math.random() * (max - min) + min;
  }
};

// CSS class utilities for animation states
export const animationClasses = {
  // Base classes for different animation states
  entering: 'opacity-0 transform translate-y-4 scale-95',
  entered: 'opacity-100 transform translate-y-0 scale-100 transition-all duration-500 ease-out',
  exiting: 'opacity-0 transform translate-y-2 scale-98 transition-all duration-300 ease-in',
  
  // Service card animations
  serviceCard: {
    idle: 'transition-all duration-300 ease-in-out',
    hover: 'transform hover:scale-105 hover:shadow-lg hover:shadow-primary/20',
    active: 'transform scale-98'
  },
  
  // Button animations
  button: {
    primary: 'transition-all duration-200 ease-in-out hover:scale-105 active:scale-95 hover:shadow-md',
    secondary: 'transition-all duration-200 ease-in-out hover:scale-102 active:scale-98',
    ghost: 'transition-all duration-200 ease-in-out hover:bg-opacity-10 hover:scale-102'
  }
};

// Animation timing constants
export const timing = {
  // Standard durations in milliseconds
  instant: 150,
  fast: 300,
  normal: 500,
  slow: 750,
  slower: 1000,
  
  // Stagger delays
  stagger: {
    fast: 50,
    normal: 100,
    slow: 200
  }
};

const animationsConfig = {
  motionPresets,
  springConfigs,
  staggerConfig,
  inViewConfig,
  getAnimationProps,
  serviceAnimations,
  animationUtils,
  animationClasses,
  timing
};

export default animationsConfig;