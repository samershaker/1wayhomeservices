"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AirConditioningIcon, ThermostatIcon, EmergencyIcon } from './icons/hvac-icons';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryAction?: {
    text: string;
    onClick: () => void;
  };
  secondaryAction?: {
    text: string;
    onClick: () => void;
  };
  emergencyNumber?: string;
  className?: string;
}

const TextEffect = ({ children, delay = 0 }: { children: string; delay?: number }) => {
  return (
    <motion.span
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className="inline-block"
    >
      {children}
    </motion.span>
  );
};

const FloatingIcon = ({ 
  children, 
  delay = 0, 
  direction = 1 
}: { 
  children: React.ReactNode; 
  delay?: number; 
  direction?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 0, rotate: 0 }}
      animate={{ 
        opacity: 1,
        y: [0, -10 * direction, 10 * direction, 0],
        rotate: [0, 5 * direction, -5 * direction, 0]
      }}
      transition={{
        opacity: { duration: 0.5, delay: delay / 1000 },
        y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay / 1000 },
        rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: delay / 1000 }
      }}
    >
      {children}
    </motion.div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Professional HVAC Services",
  subtitle = "Expert AC installation, repair, and maintenance for your comfort",
  primaryAction = { text: "Get Quote", onClick: () => {} },
  secondaryAction = { text: "View Services", onClick: () => {} },
  emergencyNumber = "619-555-0100",
  className = ""
}) => {
  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}>
      {/* Animated Background */}
      <motion.div
        initial={{ backgroundPosition: '0% 0%' }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage: 'linear-gradient(45deg, #eff6ff 0%, #dbeafe 25%, #fff7ed 75%, #ffedd5 100%)',
          backgroundSize: '400% 400%'
        }}
        className="absolute inset-0 -z-10"
      />
      
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-5">
        <div className="absolute top-20 left-20 text-cooling-200 opacity-30">
          <FloatingIcon delay={0} direction={1}>
            <AirConditioningIcon size={60} />
          </FloatingIcon>
        </div>
        <div className="absolute top-40 right-32 text-heating-200 opacity-30">
          <FloatingIcon delay={1000} direction={-1}>
            <ThermostatIcon size={80} />
          </FloatingIcon>
        </div>
        <div className="absolute bottom-32 left-32 text-cooling-300 opacity-40">
          <FloatingIcon delay={2000} direction={1}>
            <AirConditioningIcon size={40} />
          </FloatingIcon>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        {/* Emergency Badge */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="inline-flex items-center gap-2 bg-hvac-error/10 text-hvac-error border border-hvac-error/20 rounded-full px-4 py-2 mb-8 backdrop-blur-sm"
        >
          <EmergencyIcon size={16} />
          <span className="text-sm font-semibold">24/7 Emergency Service</span>
        </motion.div>

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          <TextEffect delay={0.1}>{title}</TextEffect>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed"
        >
          {subtitle}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 10px 25px rgba(37, 99, 235, 0.3)' }}
            whileTap={{ scale: 0.95 }}
            onClick={primaryAction.onClick}
            className="btn btn-primary btn-lg min-w-48 bg-gradient-to-r from-cooling-600 to-cooling-700 hover:from-cooling-700 hover:to-cooling-800 border-0 text-white shadow-lg"
          >
            {primaryAction.text}
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={secondaryAction.onClick}
            className="btn btn-outline btn-lg min-w-48 border-cooling-600 text-cooling-700 hover:bg-cooling-600 hover:text-white"
          >
            {secondaryAction.text}
          </motion.button>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-2">Emergency Service Available</p>
          <motion.a
            href={`tel:${emergencyNumber}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 text-2xl md:text-3xl font-bold text-heating-600 hover:text-heating-700 transition-colors duration-200"
          >
            <EmergencyIcon size={24} />
            {emergencyNumber}
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ height: ['20%', '80%', '20%'] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 bg-gray-400 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
