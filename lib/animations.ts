/**
 * Animation Utilities for HVAC Website
 * Provides reusable animation configurations and utilities for Motion Primitives and React Spring
 */

// Spring configuration types for React Spring v10 compatibility
interface SpringConfig {
  tension: number;
  friction: number;
  mass: number;
}

// Motion Primitives Animation Presets
export const motionPresets = {
  // Text animations for HVAC terminology
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
  },
  
  // HVAC equipment simulation effects
  hvacRotate: {
    initial: { rotate: 0 },
    animate: { rotate: 360 },
    transition: { duration: 10, repeat: Infinity }
  },
  
  temperatureGlow: {
    initial: { boxShadow: '0 0 0px rgba(37, 99, 235, 0)' },
    animate: { boxShadow: '0 0 20px rgba(37, 99, 235, 0.6)' },
    transition: { duration: 2, repeat: Infinity, repeatType: 'reverse' as const }
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
  
  // Physics simulation for HVAC equipment
  equipment: {
    tension: 200,
    friction: 15,
    mass: 2
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
export const getAnimationProps = (animationKey: keyof typeof motionPresets) => {
  // Check for reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
  if (prefersReducedMotion) {
    return {
      initial: motionPresets[animationKey].initial,
      animate: motionPresets[animationKey].animate,
      transition: { duration: 0.01 } // Almost instant for accessibility
    };
  }
  
  return motionPresets[animationKey];
};

// HVAC-specific animation utilities
export const hvacAnimations = {
  // Cooling effect - blue glow and gentle movement
  cooling: {
    boxShadow: [
      '0 0 0px rgba(37, 99, 235, 0)',
      '0 0 20px rgba(37, 99, 235, 0.4)',
      '0 0 30px rgba(37, 99, 235, 0.6)',
      '0 0 20px rgba(37, 99, 235, 0.4)',
      '0 0 0px rgba(37, 99, 235, 0)'
    ],
    y: [0, -2, 0, 2, 0]
  },
  
  // Heating effect - orange glow and warm movement
  heating: {
    boxShadow: [
      '0 0 0px rgba(234, 88, 12, 0)',
      '0 0 20px rgba(234, 88, 12, 0.4)',
      '0 0 30px rgba(234, 88, 12, 0.6)',
      '0 0 20px rgba(234, 88, 12, 0.4)',
      '0 0 0px rgba(234, 88, 12, 0)'
    ],
    scale: [1, 1.02, 1, 1.01, 1]
  },
  
  // Ventilation effect - subtle rotation and movement
  ventilation: {
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
  
  // HVAC service card animations
  serviceCard: {
    idle: 'transition-all duration-300 ease-in-out',
    hover: 'transform hover:scale-105 hover:shadow-lg hover:shadow-hvac-primary/20',
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
  hvacAnimations,
  animationUtils,
  animationClasses,
  timing
};

export default animationsConfig;