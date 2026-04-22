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

// Air Conditioning Unit Icon
export const AirConditionerIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="6" width="20" height="12" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M6 10h12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 14h12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M10 6V4a1 1 0 011-1h2a1 1 0 011 1v2" stroke={color} strokeWidth="2"/>
    <circle cx="8" cy="12" r="1" fill={color}/>
    <circle cx="16" cy="12" r="1" fill={color}/>
    <path d="M2 18v2a2 2 0 002 2h16a2 2 0 002-2v-2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

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

// Furnace/Heating Icon
export const FurnaceIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="4" y="4" width="16" height="16" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M8 8v8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 8v8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 8v8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M4 20h16" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="6" cy="6" r="1" fill={color}/>
    <circle cx="18" cy="6" r="1" fill={color}/>
    <path d="M10 12h4v2h-4z" fill={color}/>
  </svg>
);

// Snowflake Icon (Cooling)
export const SnowflakeIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2v20" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="m5 7 14 10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="m5 17 14-10" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="m9 4 3-2 3 2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m9 20 3 2 3-2" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m20 9-2 3 2 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m4 9-2 3 2 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m16 5-2 3 2 3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="m8 19-2-3 2-3" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Ductwork Icon
export const DuctworkIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="10" width="8" height="4" rx="1" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="14" y="6" width="8" height="4" rx="1" stroke={color} strokeWidth="2" fill="none"/>
    <rect x="14" y="14" width="8" height="4" rx="1" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M10 12h4" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 8h-2a2 2 0 00-2 2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 16h-2a2 2 0 01-2-2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="6" cy="12" r="1" fill={color}/>
    <circle cx="18" cy="8" r="1" fill={color}/>
    <circle cx="18" cy="16" r="1" fill={color}/>
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

// Mini Split Icon
export const MiniSplitIcon = ({ size = 24, className = '', color = 'currentColor' }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="2" y="8" width="20" height="8" rx="2" stroke={color} strokeWidth="2" fill="none"/>
    <path d="M6 12h12" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M6 14h8" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 14h2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="4" cy="12" r="1" fill={color}/>
    <circle cx="20" cy="12" r="1" fill={color}/>
    <path d="M8 16v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M12 16v3" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <path d="M16 16v2" stroke={color} strokeWidth="2" strokeLinecap="round"/>
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
  AirConditioner: AirConditionerIcon,
  Thermometer: ThermometerIcon,
  Wrench: WrenchIcon,
  Furnace: FurnaceIcon,
  Snowflake: SnowflakeIcon,
  Ductwork: DuctworkIcon,
  Emergency: EmergencyIcon,
  Diagnostic: DiagnosticIcon,
  MiniSplit: MiniSplitIcon,
  Phone: PhoneIcon,
  Location: LocationIcon,
} as const;

export type ServiceIconName = keyof typeof ServiceIcons;