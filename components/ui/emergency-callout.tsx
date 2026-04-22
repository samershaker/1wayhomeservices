"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { EmergencyIcon, HeatingIcon, CoolingIcon } from './icons/hvac-icons';

interface EmergencyCalloutProps {
  phoneNumber?: string;
  emergencyText?: string;
  description?: string;
  availabilityText?: string;
  variant?: 'banner' | 'card' | 'floating';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onCall?: () => void;
}

const sizeVariants = {
  sm: {
    container: 'p-4',
    icon: 20,
    title: 'text-lg',
    phone: 'text-xl',
    description: 'text-sm'
  },
  md: {
    container: 'p-6',
    icon: 24,
    title: 'text-xl',
    phone: 'text-2xl',
    description: 'text-base'
  },
  lg: {
    container: 'p-8',
    icon: 32,
    title: 'text-2xl',
    phone: 'text-3xl',
    description: 'text-lg'
  }
};

const variantStyles = {
  banner: 'w-full',
  card: 'rounded-2xl shadow-2xl',
  floating: 'fixed bottom-6 right-6 z-50 rounded-2xl shadow-2xl max-w-sm'
};

const PulsingIcon = ({ 
  children, 
  intensity = 'normal' 
}: { 
  children: React.ReactNode; 
  intensity?: 'subtle' | 'normal' | 'strong' 
}) => {
  const pulseScale = {
    subtle: [1, 1.05, 1],
    normal: [1, 1.1, 1],
    strong: [1, 1.2, 1]
  }[intensity];

  return (
    <motion.div
      animate={{ 
        scale: pulseScale,
        opacity: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const GlowEffect = ({ isActive }: { isActive: boolean }) => {
  return (
    <motion.div
      animate={{
        opacity: isActive ? 0.6 : 0.2,
        scale: isActive ? 1.5 : 1
      }}
      transition={{ duration: 0.3 }}
      className="absolute inset-0 bg-gradient-to-r from-hvac-error to-heating-500 rounded-2xl blur-xl -z-10"
    />
  );
};

export const EmergencyCallout: React.FC<EmergencyCalloutProps> = ({
  phoneNumber = "619-555-0100",
  emergencyText = "24/7 Emergency Service",
  description = "HVAC emergency? We're here to help around the clock.",
  availabilityText = "Available Now",
  variant = 'card',
  size = 'md',
  className = '',
  onCall
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const [pulseIntensity, setPulseIntensity] = React.useState<'subtle' | 'normal' | 'strong'>('normal');
  
  const sizeConfig = sizeVariants[size];

  // Simulate emergency levels (you can connect this to real data)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const hour = new Date().getHours();
      if (hour >= 22 || hour <= 6) {
        setPulseIntensity('strong'); // Night time - more urgent
      } else if (hour >= 11 && hour <= 15) {
        setPulseIntensity('normal'); // Peak hours
      } else {
        setPulseIntensity('subtle'); // Normal hours
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleCall = () => {
    if (onCall) {
      onCall();
    } else {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative ${variantStyles[variant]} ${className}`}
    >
      <GlowEffect isActive={isHovered} />
      
      <motion.div
        animate={{
          background: isHovered 
            ? 'linear-gradient(135deg, #ef4444 0%, #dc2626 50%, #ea580c 100%)'
            : 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #d97706 100%)',
          scale: isHovered ? 1.02 : 1
        }}
        transition={{ duration: 0.3 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative text-white ${sizeConfig.container} overflow-hidden cursor-pointer rounded-2xl`}
        onClick={handleCall}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-4 right-4">
            <HeatingIcon size={48} />
          </div>
          <div className="absolute bottom-4 left-4">
            <CoolingIcon size={32} />
          </div>
        </div>

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <PulsingIcon intensity={pulseIntensity}>
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                <EmergencyIcon size={sizeConfig.icon} color="white" />
              </div>
            </PulsingIcon>
            
            <div>
              <h3 className={`font-bold ${sizeConfig.title} leading-tight`}>
                {emergencyText}
              </h3>
              <motion.span
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-sm text-white/90"
              >
                {availabilityText}
              </motion.span>
            </div>
          </div>

          {/* Description */}
          <p className={`text-white/90 mb-6 ${sizeConfig.description} leading-relaxed`}>
            {description}
          </p>

          {/* Phone Number */}
          <div className="text-center">
            <p className="text-white/80 text-sm mb-2">Call Now:</p>
            <motion.div
              animate={{
                scale: isHovered ? 1.05 : 1,
                color: isHovered ? '#ffffff' : '#fef2f2'
              }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`font-bold ${sizeConfig.phone} tracking-wider`}
              >
                {phoneNumber}
              </motion.div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <div className="mt-6 text-center">
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.2)' }}
              whileTap={{ scale: 0.95 }}
              className="btn bg-white/10 border-white/20 text-white hover:bg-white/20 hover:border-white/30 backdrop-blur-sm"
            >
              Call Now
            </motion.button>
          </div>
        </div>

        {/* Animated border */}
        <motion.div
          animate={{
            background: [
              'linear-gradient(0deg, transparent, rgba(255,255,255,0.3), transparent)',
              'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              'linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)',
              'linear-gradient(270deg, transparent, rgba(255,255,255,0.3), transparent)',
            ]
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute inset-0 rounded-2xl pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
};

// Emergency Banner for top of page
export const EmergencyBanner: React.FC<Omit<EmergencyCalloutProps, 'variant'>> = (props) => (
  <EmergencyCallout {...props} variant="banner" size="sm" />
);

// Emergency Floating Widget
export const EmergencyFloating: React.FC<Omit<EmergencyCalloutProps, 'variant'>> = (props) => (
  <EmergencyCallout {...props} variant="floating" size="sm" />
);

export default EmergencyCallout;
