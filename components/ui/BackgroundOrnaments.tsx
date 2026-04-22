"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface OrnamentProps {
  children: React.ReactNode;
  delay?: number;
  direction?: number;
  className?: string;
}

// Floating animation component for background ornaments
const FloatingOrnament: React.FC<OrnamentProps> = ({ 
  children, 
  delay = 0, 
  direction = 1,
  className = "" 
}) => {
  return (
    <motion.div
      initial={{ y: 0, rotate: 0 }}
      animate={{ 
        y: [-20 * direction, 10 * direction, 0],
        rotate: [2, -1, 0]
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay / 1000,
        times: [0, 0.5, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Static ornament component for non-animated decorations
const StaticOrnament: React.FC<{ children: React.ReactNode; className?: string }> = ({ 
  children, 
  className = "" 
}) => {
  return (
    <div className={className}>
      {children}
    </div>
  );
};

interface BackgroundOrnamentsProps {
  variant?: 'hero' | 'card' | 'section' | 'minimal';
  icons?: React.ReactNode[];
  animated?: boolean;
  opacity?: 'low' | 'medium' | 'high';
  className?: string;
}

/**
 * BackgroundOrnaments - Centralized component for decorative background elements
 * 
 * Features:
 * - Consistent z-index management (-z-10)
 * - Pointer events disabled for interaction safety
 * - Multiple preset variants for different contexts
 * - Optional floating animations
 * - Configurable opacity levels
 */
export const BackgroundOrnaments: React.FC<BackgroundOrnamentsProps> = ({
  variant = 'hero',
  icons = [],
  animated = true,
  opacity = 'medium',
  className = ""
}) => {
  const opacityClasses = {
    low: 'opacity-10',
    medium: 'opacity-30',
    high: 'opacity-50'
  };

  const containerClass = `absolute inset-0 overflow-hidden -z-10 pointer-events-none ${className}`;
  const opacityClass = opacityClasses[opacity];

  // Preset positioning for different variants
  const getVariantPositions = () => {
    switch (variant) {
      case 'hero':
        return [
          'absolute top-20 left-20',
          'absolute top-40 right-32', 
          'absolute bottom-32 left-32',
          'absolute bottom-20 right-20'
        ];
      case 'card':
        return [
          'absolute top-4 right-4',
          'absolute bottom-4 left-4'
        ];
      case 'section':
        return [
          'absolute top-8 left-8',
          'absolute top-12 right-12',
          'absolute bottom-8 right-8',
          'absolute bottom-12 left-12'
        ];
      case 'minimal':
        return [
          'absolute top-6 right-6'
        ];
      default:
        return [];
    }
  };

  const positions = getVariantPositions();
  const OrnamentsComponent = animated ? FloatingOrnament : StaticOrnament;

  return (
    <div className={containerClass} aria-hidden="true">
      {icons.map((icon, index) => {
        const position = positions[index % positions.length];
        return (
          <div key={index} className={`${position} ${opacityClass}`}>
            <OrnamentsComponent 
              delay={index * 1000} 
              direction={index % 2 === 0 ? 1 : -1}
            >
              {icon}
            </OrnamentsComponent>
          </div>
        );
      })}
    </div>
  );
};

// Predefined ornament sets for common service contexts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponents = Record<string, React.ComponentType<{ size?: number }>>;

export const ServiceOrnamentSets = {
  heating: (iconComponents: IconComponents) => [
    <iconComponents.Thermostat key="thermostat-1" size={60} />,
    <iconComponents.Heating key="heating-1" size={80} />,
    <iconComponents.Furnace key="furnace-1" size={40} />
  ],
  cooling: (iconComponents: IconComponents) => [
    <iconComponents.AirConditioning key="ac-1" size={60} />,
    <iconComponents.Cooling key="cooling-1" size={80} />,
    <iconComponents.Snowflake key="snowflake-1" size={40} />
  ],
  mixed: (iconComponents: IconComponents) => [
    <iconComponents.AirConditioning key="ac-mixed" size={60} />,
    <iconComponents.Thermostat key="thermostat-mixed" size={80} />,
    <iconComponents.Tool key="tool-mixed" size={40} />,
    <iconComponents.Diagnosis key="diagnosis-mixed" size={50} />
  ]
};

export default BackgroundOrnaments;
