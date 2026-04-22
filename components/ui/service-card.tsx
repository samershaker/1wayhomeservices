"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { IconProps } from './icons/hvac-icons';

export interface ServiceCardProps {
  title: string;
  description: string;
  price?: string;
  priceNote?: string;
  features?: string[];
  icon: React.ComponentType<IconProps>;
  primaryColor?: 'cooling' | 'heating' | 'neutral';
  onLearnMore?: () => void;
  onBookNow?: () => void;
  className?: string;
  featured?: boolean;
}

const colorVariants = {
  cooling: {
    gradient: 'from-blue-50 to-cyan-50',
    cardBg: 'bg-gradient-to-br from-blue-50 via-white to-cyan-50',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    accent: 'text-blue-700',
    button: 'bg-blue-600 hover:bg-blue-700 text-white',
    featuredRing: 'ring-blue-500',
    border: 'border-blue-200'
  },
  heating: {
    gradient: 'from-orange-50 to-red-50',
    cardBg: 'bg-gradient-to-br from-orange-50 via-white to-red-50',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
    accent: 'text-orange-700',
    button: 'bg-orange-600 hover:bg-orange-700 text-white',
    featuredRing: 'ring-orange-500',
    border: 'border-orange-200'
  },
  neutral: {
    gradient: 'from-gray-50 to-slate-50',
    cardBg: 'bg-gradient-to-br from-gray-50 via-white to-slate-50',
    iconBg: 'bg-gray-100',
    iconColor: 'text-gray-600',
    accent: 'text-gray-700',
    button: 'bg-gray-600 hover:bg-gray-700 text-white',
    featuredRing: 'ring-gray-500',
    border: 'border-gray-200'
  }
};

export const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  price,
  priceNote,
  features = [],
  icon: Icon,
  primaryColor = 'cooling',
  onLearnMore,
  onBookNow,
  className = '',
  featured = false
}) => {
  const colors = colorVariants[primaryColor];
  
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      <motion.div
        animate={{
          y: isHovered ? -12 : 0,
          scale: isHovered ? 1.03 : 1,
          boxShadow: isHovered 
            ? '0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}
        transition={{ type: "spring", stiffness: 280, damping: 25 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`
          relative overflow-hidden cursor-pointer rounded-2xl border-2 transition-colors duration-300
          ${colors.cardBg} ${colors.border}
          ${featured ? `ring-2 ${colors.featuredRing} ring-opacity-30` : ''}
        `}
      >
        {/* Featured Badge */}
        {featured && (
          <div className={`absolute top-6 right-6 px-3 py-1 ${colors.button} rounded-full text-sm font-semibold shadow-lg`}>
            ⭐ Popular
          </div>
        )}

        {/* Background Glow Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.05 : 0,
            scale: isHovered ? 1.2 : 1
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient}`}
        />

        <div className="p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className={`p-5 rounded-3xl ${colors.iconBg} relative shadow-lg`}>
              <motion.div
                animate={{
                  scale: isHovered ? 1.1 : 1,
                  rotate: isHovered ? 5 : 0
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Icon size={40} className={colors.iconColor} />
              </motion.div>
            </div>
          </div>

          {/* Title */}
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-3">
            {title}
          </h3>

          {/* Price */}
          {price && (
            <div className="text-center mb-6">
              <div className={`text-4xl font-bold ${colors.accent} mb-2`}>
                {price}
              </div>
              {priceNote && (
                <div className="text-sm text-gray-600 leading-tight px-3 bg-gray-50 rounded-lg py-2">
                  {priceNote}
                </div>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-700 text-center mb-8 leading-relaxed text-lg">
            {description}
          </p>

          {/* Features */}
          {features.length > 0 && (
            <div className="mb-6">
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-2 text-sm text-gray-700"
                  >
                    <svg
                      className={`w-4 h-4 ${colors.iconColor} flex-shrink-0`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            {onBookNow && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onBookNow}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl ${colors.button}`}
              >
                Book Service Now
              </motion.button>
            )}
            
            {onLearnMore && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLearnMore}
                className="px-6 py-2 rounded-lg font-medium text-gray-700 hover:text-gray-900 border-2 border-gray-200 hover:border-gray-300 transition-all duration-200"
              >
                Learn More
              </motion.button>
            )}
          </div>
        </div>

        {/* Hover Border Effect */}
        <motion.div
          animate={{
            opacity: isHovered ? 0.2 : 0,
            scale: isHovered ? 1 : 0.95
          }}
          transition={{ duration: 0.3 }}
          className={`absolute inset-0 border-2 ${colors.featuredRing} rounded-2xl pointer-events-none`}
        />
      </motion.div>
    </motion.div>
  );
};

// Service Cards Grid Component
interface ServiceCardsGridProps {
  services: Omit<ServiceCardProps, 'className'>[];
  className?: string;
}

export const ServiceCardsGrid: React.FC<ServiceCardsGridProps> = ({
  services,
  className = ''
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 ${className}`}>
      {services.map((service, index) => (
        <ServiceCard
          key={index}
          {...service}
          className="h-full"
        />
      ))}
    </div>
  );
};

export default ServiceCard;
