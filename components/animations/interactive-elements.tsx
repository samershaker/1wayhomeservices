'use client';

/**
 * Interactive Elements Component for HVAC Website
 * Provides physics-based animations using React Spring for interactive UI elements
 */

import { useSpring, animated, useTrail } from '@react-spring/web';
import { useState, ReactNode, useCallback } from 'react';
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
  glowColor?: 'cooling' | 'heating' | 'accent';
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

interface ThermostatControlProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  mode?: 'heating' | 'cooling';
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
    primary: 'bg-hvac-primary text-white hover:bg-hvac-primary/90',
    secondary: 'bg-hvac-secondary text-white hover:bg-hvac-secondary/90',
    outline: 'border-2 border-hvac-primary text-hvac-primary hover:bg-hvac-primary hover:text-white',
    ghost: 'text-hvac-primary hover:bg-hvac-primary/10'
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
        focus:outline-none focus:ring-2 focus:ring-hvac-primary/50
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
  glowColor = 'cooling'
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const spring = useSpring({
    scale: isHovered ? hoverScale : 1,
    rotate: isHovered ? hoverRotation : 0,
    boxShadow: isHovered 
      ? `0 20px 40px rgba(${glowColor === 'cooling' ? '37, 99, 235' : glowColor === 'heating' ? '234, 88, 12' : '16, 185, 129'}, 0.15)`
      : '0 5px 15px rgba(0, 0, 0, 0.1)',
    borderColor: isHovered 
      ? glowColor === 'cooling' ? '#2563eb' : glowColor === 'heating' ? '#ea580c' : '#10b981'
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

// Thermostat control with physics
export const SpringThermostat: React.FC<ThermostatControlProps> = ({
  value,
  onChange,
  min = 60,
  max = 85,
  className = '',
  mode = 'cooling'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [localValue, setLocalValue] = useState(value);

  const spring = useSpring({
    scale: isDragging ? 1.1 : 1,
    rotate: ((localValue - min) / (max - min)) * 270 - 135,
    config: springConfigs.bouncy
  });

  const backgroundSpring = useSpring({
    background: mode === 'heating' 
      ? `linear-gradient(${((localValue - min) / (max - min)) * 180}deg, #ea580c, #f97316)`
      : `linear-gradient(${((localValue - min) / (max - min)) * 180}deg, #2563eb, #3b82f6)`,
    config: springConfigs.gentle
  });

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    onChange(localValue);
  }, [localValue, onChange]);

  const handleValueChange = useCallback((newValue: number) => {
    const clampedValue = Math.max(min, Math.min(max, newValue));
    setLocalValue(clampedValue);
  }, [min, max]);

  return (
    <div className={`relative w-32 h-32 ${className}`}>
      <animated.div
        style={backgroundSpring}
        className="absolute inset-0 rounded-full shadow-lg"
      />
      
      <div className="absolute inset-4 bg-white rounded-full shadow-inner flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-800">
            {Math.round(localValue)}°
          </div>
          <div className="text-xs text-gray-500 uppercase">
            {mode}
          </div>
        </div>
      </div>

      <animated.div
        style={spring}
        className="absolute top-1 left-1/2 w-1 h-8 bg-white rounded-full shadow-md origin-bottom -translate-x-1/2 cursor-pointer"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
      />

      <input
        type="range"
        min={min}
        max={max}
        value={localValue}
        onChange={(e) => handleValueChange(Number(e.target.value))}
        className="absolute inset-0 opacity-0 cursor-pointer"
      />
    </div>
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
                  <div className="flex-shrink-0 text-hvac-primary">
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