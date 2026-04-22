'use client';

/**
 * Text Effects Component for HVAC Website
 * Provides animated text components using Motion Primitives with HVAC-themed animations
 */

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { staggerConfig } from '@/lib/animations';

// TypeScript interfaces
interface BaseTextProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  disabled?: boolean;
}

interface TypewriterProps extends BaseTextProps {
  speed?: number;
  showCursor?: boolean;
  cursorChar?: string;
  startDelay?: number;
}

interface GlowTextProps extends BaseTextProps {
  glowColor?: 'cooling' | 'heating' | 'accent';
  intensity?: 'low' | 'medium' | 'high';
}

interface CounterProps {
  from: number;
  to: number;
  duration?: number;
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

// Hero Text Animation - Main headline with staggered letters
export const HeroText: React.FC<BaseTextProps> = ({ 
  children, 
  className = '', 
  delay = 0,
  disabled = false 
}) => {
  const text = children?.toString() || '';
  const letters = text.split('');
  
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div 
      className={`inline-block ${className}`}
      variants={staggerConfig.container}
      initial="initial"
      animate="animate"
      style={{ translateY: 0 }}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={{
            initial: { opacity: 0, y: 50, rotateX: -90 },
            animate: { 
              opacity: 1, 
              y: 0, 
              rotateX: 0,
              transition: {
                duration: 0.6,
                delay: delay + index * 0.05,
                ease: [0.6, 0.01, -0.05, 0.95]
              }
            }
          }}
          className="inline-block"
          style={{ transformOrigin: 'center bottom' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Typewriter Effect - Perfect for HVAC service descriptions
export const TypewriterText: React.FC<TypewriterProps> = ({
  children,
  className = '',
  speed = 50,
  showCursor = true,
  cursorChar = '|',
  startDelay = 0,
  disabled = false
}) => {
  const [displayText, setDisplayText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const text = children?.toString() || '';
  
  useEffect(() => {
    if (disabled) {
      setDisplayText(text);
      return;
    }

    const startTyping = () => {
      setIsTyping(true);
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          if (prevIndex < text.length) {
            setDisplayText(text.slice(0, prevIndex + 1));
            return prevIndex + 1;
          } else {
            setIsTyping(false);
            clearInterval(timer);
            return prevIndex;
          }
        });
      }, speed);

      return () => clearInterval(timer);
    };

    const delayTimer = setTimeout(startTyping, startDelay);
    return () => clearTimeout(delayTimer);
  }, [text, speed, startDelay, disabled]);

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <span className={`inline-block ${className}`}>
      {displayText}
      {showCursor && (
        <motion.span
          animate={{ opacity: isTyping ? [1, 1] : [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
          className="inline-block ml-1"
        >
          {cursorChar}
        </motion.span>
      )}
    </span>
  );
};

// Animated Counter - For statistics and metrics
export const AnimatedCounter: React.FC<CounterProps> = ({
  from,
  to,
  duration = 2000,
  delay = 0,
  className = '',
  prefix = '',
  suffix = '',
  decimals = 0
}) => {
  const [count, setCount] = useState(from);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const startTime = Date.now() + delay;
    const endTime = startTime + duration;

    const updateCount = () => {
      const now = Date.now();
      
      if (now < startTime) {
        requestAnimationFrame(updateCount);
        return;
      }

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
  }, [from, to, duration, delay]);

  return (
    <span ref={countRef} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  );
};

// Glow Text - For highlighting important HVAC terms
export const GlowText: React.FC<GlowTextProps> = ({
  children,
  className = '',
  glowColor = 'cooling',
  intensity = 'medium',
  delay = 0,
  disabled = false
}) => {
  const glowStyles = {
    cooling: {
      low: 'text-cooling-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]',
      medium: 'text-cooling-300 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]',
      high: 'text-cooling-200 drop-shadow-[0_0_25px_rgba(59,130,246,0.7)]'
    },
    heating: {
      low: 'text-heating-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.3)]',
      medium: 'text-heating-300 drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]',
      high: 'text-heating-200 drop-shadow-[0_0_25px_rgba(249,115,22,0.7)]'
    },
    accent: {
      low: 'text-green-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]',
      medium: 'text-green-300 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]',
      high: 'text-green-200 drop-shadow-[0_0_25px_rgba(16,185,129,0.7)]'
    }
  };

  const glowClass = glowStyles[glowColor][intensity];

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`${glowClass} ${className}`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }}
      whileHover={{ 
        scale: 1.05,
        transition: { duration: 0.2 }
      }}
    >
      {children}
    </motion.span>
  );
};

// Sliding Text Reveal - Text slides in with mask effect
export const SlidingReveal: React.FC<BaseTextProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.8,
  disabled = false
}) => {
  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div 
      className={`overflow-hidden ${className}`}
      initial={{ width: 0 }}
      animate={{ width: 'auto' }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ duration: duration * 0.8, delay: delay + 0.1, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

// Word-by-word reveal animation
export const WordReveal: React.FC<BaseTextProps> = ({
  children,
  className = '',
  delay = 0,
  disabled = false
}) => {
  const text = children?.toString() || '';
  const words = text.split(' ');

  if (disabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div 
      className={`${className}`}
      variants={staggerConfig.container}
      initial="initial"
      animate="animate"
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={{
            initial: { opacity: 0, y: 20 },
            animate: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.5,
                delay: delay + index * 0.1,
                ease: 'easeOut'
              }
            }
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Pulsing Text for call-to-action elements
export const PulsingText: React.FC<BaseTextProps & { intensity?: 'subtle' | 'normal' | 'strong' }> = ({
  children,
  className = '',
  intensity = 'normal',
  disabled = false
}) => {
  const intensityMap = {
    subtle: { scale: [1, 1.02, 1], duration: 3 },
    normal: { scale: [1, 1.05, 1], duration: 2 },
    strong: { scale: [1, 1.1, 1], duration: 1.5 }
  };

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={className}
      animate={{ scale: intensityMap[intensity].scale }}
      transition={{
        duration: intensityMap[intensity].duration,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      {children}
    </motion.span>
  );
};

// Text with gradient animation
export const GradientText: React.FC<BaseTextProps & { 
  gradient?: 'cooling' | 'heating' | 'full-spectrum';
  animated?: boolean;
}> = ({
  children,
  className = '',
  gradient = 'cooling',
  animated = true,
  disabled = false
}) => {
  const gradients = {
    cooling: 'bg-gradient-to-r from-cooling-400 via-cooling-500 to-cooling-600',
    heating: 'bg-gradient-to-r from-heating-400 via-heating-500 to-heating-600',
    'full-spectrum': 'bg-gradient-to-r from-heating-400 via-green-500 to-cooling-500'
  };

  const gradientClass = gradients[gradient];

  if (disabled) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`${gradientClass} bg-clip-text text-transparent ${className} ${
        animated ? 'bg-[length:200%_100%]' : ''
      }`}
      initial={animated ? { backgroundPosition: '200% 0%' } : {}}
      animate={animated ? { backgroundPosition: '-200% 0%' } : {}}
      transition={animated ? {
        duration: 3,
        repeat: Infinity,
        ease: 'linear'
      } : {}}
    >
      {children}
    </motion.span>
  );
};

// All components are already individually exported above
// Default export for HeroText
export default HeroText;