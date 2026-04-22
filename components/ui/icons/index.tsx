/**
 * Business Service Icons Collection
 * Professional icons for general service businesses
 */

import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// Thermometer Icon
export const ThermometerIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" stroke={color} strokeWidth="2"/>
    <path d="M12 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" fill={color}/>
    <path d="M12 8v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

// Wrench/Tool Icon
export const WrenchIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={color} strokeWidth="2"/>
  </svg>
);

// Emergency/24-7 Icon
export const EmergencyIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2"/>
    <path d="M12 8v4l3 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M8 2l2 2-2 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 2l-2 2 2 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 2v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill={color}/>
  </svg>
);

// Diagnostic/Search Icon
export const DiagnosticIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="8" stroke={color} strokeWidth="2"/>
    <path d="m21 21-4.35-4.35" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 11h6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M11 8v6" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="9" cy="9" r="1" fill={color}/>
    <circle cx="13" cy="13" r="1" fill={color}/>
  </svg>
);

// Phone/Contact Icon
export const PhoneIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke={color} strokeWidth="2"/>
  </svg>
);

// Location/Map Icon
export const LocationIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={color} strokeWidth="2"/>
    <circle cx="12" cy="10" r="3" stroke={color} strokeWidth="2"/>
  </svg>
);

// Export all icons
export const ServiceIcons = {
  Thermometer: ThermometerIcon,
  Wrench: WrenchIcon,
  Emergency: EmergencyIcon,
  Diagnostic: DiagnosticIcon,
  Phone: PhoneIcon,
  Location: LocationIcon,
} as const;

export type ServiceIconName = keyof typeof ServiceIcons;