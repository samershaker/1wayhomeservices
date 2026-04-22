'use client';

/**
 * Scroll Animations Component for Business Website
 * Provides scroll-triggered animations using Motion Primitives with intersection observer
 */

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { useRef, ReactNode, useEffect, useState } from 'react';
import Image from 'next/image';
import { motionPresets } from '@/lib/animations';

// TypeScript interfaces
interface ScrollAnimationProps {
  children: ReactNode;
  className?: string;
  animation?: 'fadeInUp' | 'fadeInDown' | 'slideInLeft' | 'slideInRight' | 'scaleIn';
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  disabled?: boolean;
}

interface ScrollProgressProps {
  children: ReactNode;
  className?: string;
  offset?: [string, string];
}

interface ParallaxProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

interface RevealOnScrollProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
  distance?: number;
  delay?: number;
  threshold?: number;
}

// Basic scroll-triggered animation wrapper
export const InViewAnimation: React.FC<ScrollAnimationProps> = ({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  disabled = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    amount: threshold, 
    once: triggerOnce,
    margin: '-50px 0px'
  });

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  const animationProps = motionPresets[animation];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={animationProps.initial}
      animate={isInView ? animationProps.animate : animationProps.initial}
      transition={{ 
        ...animationProps.transition, 
        delay: delay 
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax scrolling component
export const ParallaxElement: React.FC<ParallaxProps> = ({
  children,
  className = '',
  offset = 50
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y }}
    >
      {children}
    </motion.div>
  );
};

// Scroll progress indicator
export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  children,
  className = '',
  offset = ['start end', 'end start']
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ opacity, scale }}
    >
      {children}
    </motion.div>
  );
};

// Advanced reveal animation with direction control
export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  className = '',
  direction = 'up',
  distance = 50,
  delay = 0,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });

  const directionMap = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { y: 0, x: distance },
    right: { y: 0, x: -distance }
  };

  const initialTransform = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ 
        opacity: 0, 
        ...initialTransform
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : { 
        opacity: 0, 
        ...initialTransform 
      }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut" 
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered children animation on scroll
export const StaggeredReveal: React.FC<{
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  threshold?: number;
}> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  threshold = 0.1
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: threshold, once: true });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="initial"
      animate={isInView ? "animate" : "initial"}
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.1
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
};

// Individual stagger item
export const StaggerItem: React.FC<{
  children: ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  return (
    <motion.div
      className={className}
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 }
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

// Equipment Animation - Simulates equipment/feature operation
export const EquipmentAnimation: React.FC<{
  children: ReactNode;
  className?: string;
  type?: 'cooling' | 'heating' | 'ventilation';
  intensity?: 'low' | 'medium' | 'high';
}> = ({
  children,
  className = '',
  type = 'cooling',
  intensity = 'medium'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: false });

  const animationVariants = {
    cooling: {
      low: {
        scale: [1, 1.02, 1],
        rotate: [0, 1, 0],
        filter: ['brightness(1) hue-rotate(0deg)', 'brightness(1.1) hue-rotate(5deg)', 'brightness(1) hue-rotate(0deg)']
      },
      medium: {
        scale: [1, 1.05, 1],
        rotate: [0, 2, 0],
        filter: ['brightness(1) hue-rotate(0deg)', 'brightness(1.2) hue-rotate(10deg)', 'brightness(1) hue-rotate(0deg)']
      },
      high: {
        scale: [1, 1.08, 1],
        rotate: [0, 3, 0],
        filter: ['brightness(1) hue-rotate(0deg)', 'brightness(1.3) hue-rotate(15deg)', 'brightness(1) hue-rotate(0deg)']
      }
    },
    heating: {
      low: {
        scale: [1, 1.01, 1.02, 1],
        y: [0, -1, 0],
        filter: ['brightness(1) sepia(0)', 'brightness(1.1) sepia(0.1)', 'brightness(1) sepia(0)']
      },
      medium: {
        scale: [1, 1.03, 1.05, 1],
        y: [0, -2, 0],
        filter: ['brightness(1) sepia(0)', 'brightness(1.2) sepia(0.2)', 'brightness(1) sepia(0)']
      },
      high: {
        scale: [1, 1.05, 1.08, 1],
        y: [0, -3, 0],
        filter: ['brightness(1) sepia(0)', 'brightness(1.3) sepia(0.3)', 'brightness(1) sepia(0)']
      }
    },
    ventilation: {
      low: {
        rotate: [0, 360],
        scale: [1, 1.02, 1]
      },
      medium: {
        rotate: [0, 360],
        scale: [1, 1.05, 1]
      },
      high: {
        rotate: [0, 360],
        scale: [1, 1.08, 1]
      }
    }
  };

  const animation = animationVariants[type][intensity];
  const duration = type === 'ventilation' ? 4 : 3;

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={isInView ? animation : {}}
      transition={{
        duration,
        repeat: isInView ? Infinity : 0,
        ease: type === 'ventilation' ? "linear" : "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered counter animation
export const ScrollCounter: React.FC<{
  from: number;
  to: number;
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}> = ({
  from,
  to,
  duration = 2000,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3, once: true });
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      
      if (now >= endTime) {
        setCount(to);
        return;
      }

      const progress = (now - startTime) / duration;
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = from + (to - from) * easeOutQuart;
      
      setCount(currentCount);
      requestAnimationFrame(updateCount);
    };

    requestAnimationFrame(updateCount);
  }, [isInView, from, to, duration]);

  return (
    <motion.span
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{count.toFixed(decimals)}{suffix}
    </motion.span>
  );
};

// Progressive image loading with scroll
export const ScrollRevealImage: React.FC<{
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  blurDataURL?: string;
  priority?: boolean;
}> = ({
  src,
  alt,
  width = 800,
  height = 600,
  className = '',
  blurDataURL,
  priority = false
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once: true });
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <motion.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      initial={{ opacity: 0, scale: 1.1 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div
        initial={{ filter: 'blur(10px)' }}
        animate={{ filter: imageLoaded ? 'blur(0px)' : 'blur(10px)' }}
        transition={{ duration: 0.5 }}
        className="w-full h-full"
      >
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-full object-cover"
          priority={priority}
          placeholder={blurDataURL ? 'blur' : undefined}
          blurDataURL={blurDataURL}
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>
    </motion.div>
  );
};

// All components are individually exported above