/**
 * HVAC-themed SVG Icons
 * Professional icons for air conditioning, heating, and HVAC services
 */

import React from 'react';

export interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

// Air Conditioning Unit Icon
export const AirConditioningIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="2" y="6" width="20" height="12" rx="2" />
    <path d="M6 10h12" />
    <path d="M6 14h12" />
    <path d="M10 6V4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v2" />
    <circle cx="7" cy="8" r="0.5" />
    <circle cx="17" cy="8" r="0.5" />
    <path d="M4 18v2" />
    <path d="M20 18v2" />
  </svg>
);

// Thermostat Icon
export const ThermostatIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v2" />
    <path d="M12 19v2" />
    <path d="M3 12h2" />
    <path d="M19 12h2" />
    <path d="M6.34 6.34l1.41 1.41" />
    <path d="M16.24 16.24l1.41 1.41" />
    <path d="M17.66 6.34l-1.41 1.41" />
    <path d="M7.76 16.24l-1.41 1.41" />
  </svg>
);

// HVAC Wrench/Tool Icon
export const HVACToolIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

// Ductwork/Ventilation Icon
export const DuctworkIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <rect x="3" y="8" width="18" height="8" rx="1" />
    <path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
    <path d="M7 16v2a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-2" />
    <path d="M9 12h6" />
    <path d="M12 9v6" />
  </svg>
);

// Snowflake (Cooling) Icon
export const CoolingIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2v20" />
    <path d="M2 12h20" />
    <path d="M6.34 6.34l11.32 11.32" />
    <path d="M6.34 17.66L17.66 6.34" />
    <path d="M9 2l3 3 3-3" />
    <path d="M9 22l3-3 3 3" />
    <path d="M2 9l3 3-3 3" />
    <path d="M22 9l-3 3 3 3" />
  </svg>
);

// Flame (Heating) Icon
export const HeatingIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
  </svg>
);

// Fan Icon
export const FanIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2c-2.5 0-4.5 2-4.5 4.5 0 .8.2 1.5.6 2.1L12 12l3.9-3.4c.4-.6.6-1.3.6-2.1C16.5 4 14.5 2 12 2z" />
    <path d="M12 22c2.5 0 4.5-2 4.5-4.5 0-.8-.2-1.5-.6-2.1L12 12l-3.9 3.4c-.4.6-.6 1.3-.6 2.1C7.5 20 9.5 22 12 22z" />
    <path d="M2 12c0 2.5 2 4.5 4.5 4.5.8 0 1.5-.2 2.1-.6L12 12l-3.4-3.9c-.6-.4-1.3-.6-2.1-.6C4 7.5 2 9.5 2 12z" />
    <path d="M22 12c0-2.5-2-4.5-4.5-4.5-.8 0-1.5.2-2.1.6L12 12l3.4 3.9c.6.4 1.3.6 2.1.6C20 16.5 22 14.5 22 12z" />
  </svg>
);

// Emergency/24-7 Icon
export const EmergencyIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </svg>
);

// Diagnosis/Inspection Icon
export const DiagnosisIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
    <path d="M11 8v6" />
    <path d="M8 11h6" />
  </svg>
);

// External Link Icon
export const ExternalLinkIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = "currentColor", 
  className = "" 
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15,3 21,3 21,9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

// All icons object for easy import
export const HVACIcons = {
  AirConditioning: AirConditioningIcon,
  Thermostat: ThermostatIcon,
  Tool: HVACToolIcon,
  Ductwork: DuctworkIcon,
  Cooling: CoolingIcon,
  Heating: HeatingIcon,
  Fan: FanIcon,
  Emergency: EmergencyIcon,
  Diagnosis: DiagnosisIcon,
  ExternalLink: ExternalLinkIcon,
};

export default HVACIcons;