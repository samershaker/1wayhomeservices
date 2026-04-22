'use client';

/**
 * Interactive Elements Component for Business Website
 * Provides physics-based animations using React Spring for interactive UI elements
 */

import { useSpring, animated, useTrail } from '@react-spring/web';
import { useState, ReactNode } from 'react';
import { springConfigs } from '@/lib/animations';

// TypeScript interfaces
interface InteractiveButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverRotation?: number;
  glowColor?: 'primary' | 'accent' | 'neutral';
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  speed?: number;
  delay?: number;
}

interface SpringModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

// Physics-based interactive button
export const SpringButton: React.FC<InteractiveButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  loading = false
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const spring = useSpring({
    scale: isPressed ? 0.95 : isHovered ? 1.05 : 1,
    rotate: isHovered ? 1 : 0,
    boxShadow: isHovered 
      ? '0 10px 25px rgba(0, 0, 0, 0.15)' 
      : '0 2px 10px rgba(0, 0, 0, 0.1)',
    config: springConfigs.bouncy
  });

  const loadingSpring = useSpring({
    rotate: loading ? 360 : 0,
    config: { tension: 300, friction: 10 },
    loop: loading
  });

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-primary hover:bg-primary/10'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <animated.button
      style={spring}
      className={`
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${className}
        rounded-lg font-medium transition-colors duration-200 
        focus:outline-none focus:ring-2 focus:ring-primary/50
        disabled:opacity-50 disabled:cursor-not-allowed
        relative overflow-hidden
      `}
      disabled={disabled || loading}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      {loading && (
        <animated.div 
          style={loadingSpring}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full" />
        </animated.div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </animated.button>
  );
};

// Interactive hover card with physics
export const SpringHoverCard: React.FC<HoverCardProps> = ({
  children,
  className = '',
  hoverScale = 1.05,
  hoverRotation = 2,
  glowColor = 'primary'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const spring = useSpring({
    scale: isHovered ? hoverScale : 1,
    rotate: isHovered ? hoverRotation : 0,
    boxShadow: isHovered
      ? `0 20px 40px rgba(${glowColor === 'primary' ? '34, 81, 163' : glowColor === 'accent' ? '212, 168, 83' : '107, 114, 128'}, 0.15)`
      : '0 5px 15px rgba(0, 0, 0, 0.1)',
    borderColor: isHovered
      ? glowColor === 'primary' ? '#2251A3' : glowColor === 'accent' ? '#D4A853' : '#6B7280'
      : 'transparent',
    config: springConfigs.bouncy
  });

  return (
    <animated.div
      style={spring}
      className={`
        ${className}
        cursor-pointer transition-all duration-200 border-2
        rounded-lg overflow-hidden
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
    </animated.div>
  );
};

// Floating animation element
export const FloatingElement: React.FC<FloatingElementProps> = ({
  children,
  className = '',
  amplitude = 10,
  speed = 2000,
  delay = 0
}) => {
  const spring = useSpring({
    from: { transform: `translateY(0px)` },
    to: async (next) => {
      while (true) {
        await next({ transform: `translateY(-${amplitude}px)` });
        await next({ transform: `translateY(${amplitude}px)` });
      }
    },
    config: { duration: speed },
    delay
  });

  return (
    <animated.div style={spring} className={className}>
      {children}
    </animated.div>
  );
};

// Physics-based modal
export const SpringModal: React.FC<SpringModalProps> = ({
  isOpen,
  onClose,
  children,
  className = ''
}) => {
  const backdropSpring = useSpring({
    opacity: isOpen ? 1 : 0,
    config: springConfigs.gentle
  });

  const modalSpring = useSpring({
    scale: isOpen ? 1 : 0.8,
    opacity: isOpen ? 1 : 0,
    transform: isOpen ? 'translateY(0%)' : 'translateY(-50%)',
    config: springConfigs.bouncy
  });

  if (!isOpen && modalSpring.opacity.get() === 0) return null;

  return (
    <animated.div
      style={backdropSpring}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <animated.div
        style={modalSpring}
        className={`
          ${className}
          bg-white rounded-xl shadow-2xl max-w-lg w-full mx-4
          max-h-[90vh] overflow-auto
        `}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </animated.div>
    </animated.div>
  );
};

// Service cards with trail animation
export const ServiceCardsTrail: React.FC<{
  items: Array<{ id: string; title: string; description: string; icon?: ReactNode }>;
  className?: string;
}> = ({ items, className = '' }) => {

  const trail = useTrail(items.length, {
    opacity: 1,
    transform: 'translateY(0px)',
    from: { opacity: 0, transform: 'translateY(20px)' },
    config: springConfigs.gentle
  });

  return (
    <div className={`grid gap-6 ${className}`}>
      {trail.map((style, index) => {
        const item = items[index];

        return (
          <animated.div
            key={item.id}
            style={style}
            className="relative"
          >
            <SpringHoverCard
              className="p-6 bg-white border"
              hoverScale={1.02}
              hoverRotation={1}
            >
              <div className="flex items-start space-x-4">
                {item.icon && (
                  <div className="flex-shrink-0 text-primary">
                    {item.icon}
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </SpringHoverCard>
          </animated.div>
        );
      })}
    </div>
  );
};

// Animated form inputs
export const SpringInput: React.FC<{
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
  placeholder?: string;
}> = ({
  label,
  type = 'text',
  value,
  onChange,
  error,
  className = '',
  placeholder
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const labelSpring = useSpring({
    transform: isFocused || hasValue 
      ? 'translateY(-20px) scale(0.85)' 
      : 'translateY(0px) scale(1)',
    color: isFocused 
      ? '#2563eb' 
      : error 
        ? '#ef4444' 
        : '#6b7280',
    config: springConfigs.snappy
  });

  const inputSpring = useSpring({
    borderColor: isFocused 
      ? '#2563eb' 
      : error 
        ? '#ef4444' 
        : '#d1d5db',
    boxShadow: isFocused 
      ? '0 0 0 3px rgba(37, 99, 235, 0.1)' 
      : '0 0 0 0px rgba(37, 99, 235, 0)',
    config: springConfigs.snappy
  });

  return (
    <div className={`relative ${className}`}>
      <animated.input
        type={type}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setHasValue(e.target.value.length > 0);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        style={inputSpring}
        className="w-full px-3 py-3 border-2 rounded-lg bg-white text-gray-900 placeholder-transparent focus:outline-none transition-colors"
      />
      
      <animated.label
        style={labelSpring}
        className="absolute left-3 top-3 pointer-events-none font-medium origin-left"
      >
        {label}
      </animated.label>

      {error && (
        <div className="mt-1 text-sm text-red-600">
          {error}
        </div>
      )}
    </div>
  );
};

// All components are individually exported above