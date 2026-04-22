'use client';

/**
 * Page Transitions Component for Business Website
 * Provides smooth page transitions and layout animations using Motion Primitives
 */

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
// Animation configurations will be defined locally as needed

// TypeScript interfaces
interface PageTransitionProps {
  children: ReactNode;
  className?: string;
  transition?: 'fade' | 'slide' | 'scale' | 'cool-blue' | 'warm-orange';
}

interface RouteTransitionProps {
  children: ReactNode;
  className?: string;
}

interface LoadingTransitionProps {
  isLoading: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
  className?: string;
}

interface SectionTransitionProps {
  children: ReactNode;
  id: string;
  className?: string;
}

// Custom transition variants
const transitionVariants = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.4 }
  },
  
  slide: {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.5 }
  },
  
  scale: {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
    transition: { duration: 0.4 }
  },
  
  'cool-blue': {
    initial: {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(10px) hue-rotate(180deg)'
    },
    animate: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px) hue-rotate(0deg)'
    },
    exit: {
      scale: 1.1,
      opacity: 0,
      filter: 'blur(5px) hue-rotate(-180deg)'
    },
    transition: { duration: 0.6 }
  },

  'warm-orange': {
    initial: {
      scale: 1.1,
      opacity: 0,
      filter: 'blur(10px) brightness(1.5)'
    },
    animate: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px) brightness(1)'
    },
    exit: {
      scale: 0.9,
      opacity: 0,
      filter: 'blur(5px) brightness(0.5)'
    },
    transition: { duration: 0.6 }
  }
};

// Main page transition wrapper
export const PageTransition: React.FC<PageTransitionProps> = ({
  children,
  className = '',
  transition = 'fade'
}) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        initial={transitionVariants[transition].initial}
        animate={transitionVariants[transition].animate}
        exit={transitionVariants[transition].exit}
        transition={transitionVariants[transition].transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Route-specific transitions with different effects for different pages
export const RouteTransition: React.FC<RouteTransitionProps> = ({
  children,
  className = ''
}) => {
  const pathname = usePathname();
  
  // Determine transition type based on route
  const getTransitionType = (path: string): keyof typeof transitionVariants => {
    if (path.includes('/cooling') || path.includes('/air-conditioning')) {
      return 'cool-blue';
    }
    if (path.includes('/heating') || path.includes('/furnace')) {
      return 'warm-orange';
    }
    if (path.includes('/services')) {
      return 'slide';
    }
    if (path.includes('/about') || path.includes('/contact')) {
      return 'scale';
    }
    return 'fade';
  };

  const transitionType = getTransitionType(pathname);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        className={className}
        initial={transitionVariants[transitionType].initial}
        animate={transitionVariants[transitionType].animate}
        exit={transitionVariants[transitionType].exit}
        transition={transitionVariants[transitionType].transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Loading state transition
export const LoadingTransition: React.FC<LoadingTransitionProps> = ({
  isLoading,
  children,
  loadingComponent,
  className = ''
}) => {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          className={className}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {loadingComponent || <DefaultLoadingComponent />}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          className={className}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Default loading component with Business theme
const DefaultLoadingComponent: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="relative">
        {/* Cooling animation */}
        <motion.div
          className="w-12 h-12 border-4 border-cooling-200 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Heating animation */}
        <motion.div
          className="absolute inset-1 w-10 h-10 border-4 border-heating-400 border-t-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute inset-4 w-4 h-4 bg-accent rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
    </div>
  );
};

// Section transitions for within-page navigation
export const SectionTransition: React.FC<SectionTransitionProps> = ({
  children,
  id,
  className = ''
}) => {
  return (
    <motion.section
      id={id}
      className={className}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
};

// Layout transition for shared elements
export const LayoutTransition: React.FC<{
  children: ReactNode;
  layoutId: string;
  className?: string;
}> = ({ children, layoutId, className = '' }) => {
  return (
    <motion.div
      layoutId={layoutId}
      className={className}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
};

// Staggered page sections
export const StaggeredSections: React.FC<{
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}> = ({ children, className = '', staggerDelay = 0.1 }) => {
  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.2
          }
        }
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 0.6 }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

// Modal transitions
export const ModalTransition: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}> = ({ isOpen, onClose, children, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            key="modal"
            className={`fixed inset-0 z-50 flex items-center justify-center p-4 ${className}`}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// Navigation transition
export const NavTransition: React.FC<{
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}> = ({ children, isOpen, className = '' }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.nav
          className={className}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            exit={{ y: -20 }}
            transition={{ duration: 0.2, delay: 0.1 }}
          >
            {children}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

// Business Equipment showcase transition
export const EquipmentShowcase: React.FC<{
  children: ReactNode;
  className?: string;
  equipmentType?: 'cooling' | 'heating' | 'ventilation';
}> = ({ children, className = '', equipmentType = 'cooling' }) => {
  const equipmentVariants = {
    cooling: {
      initial: { 
        opacity: 0, 
        scale: 0.8, 
        filter: 'blur(10px) brightness(0.5)' 
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px) brightness(1)',
        boxShadow: '0 0 30px rgba(37, 99, 235, 0.3)'
      }
    },
    heating: {
      initial: { 
        opacity: 0, 
        scale: 1.2, 
        filter: 'blur(10px) saturate(2)' 
      },
      animate: { 
        opacity: 1, 
        scale: 1, 
        filter: 'blur(0px) saturate(1)',
        boxShadow: '0 0 30px rgba(234, 88, 12, 0.3)'
      }
    },
    ventilation: {
      initial: { 
        opacity: 0, 
        rotate: -180, 
        scale: 0.5 
      },
      animate: { 
        opacity: 1, 
        rotate: 0, 
        scale: 1,
        boxShadow: '0 0 30px rgba(16, 185, 129, 0.3)'
      }
    }
  };

  return (
    <motion.div
      className={className}
      variants={equipmentVariants[equipmentType]}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

// All components are individually exported above