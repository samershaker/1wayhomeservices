"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { EmergencyIcon, ThermostatIcon } from './icons/hvac-icons';

interface NavigationItem {
  label: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  submenu?: NavigationItem[];
}

interface NavigationProps {
  logo?: {
    text: string;
    href: string;
    icon?: React.ComponentType<{ size?: number; className?: string }>;
  };
  items: NavigationItem[];
  emergencyNumber?: string;
  onEmergencyCall?: () => void;
  className?: string;
  variant?: 'default' | 'transparent' | 'solid';
}

const Logo = ({ 
  logo, 
  isScrolled 
}: { 
  logo: NavigationProps['logo']; 
  isScrolled: boolean 
}) => {
  if (!logo) return null;

  return (
    <motion.a
      href={logo.href}
      animate={{ scale: isScrolled ? 0.9 : 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="flex items-center gap-2 text-xl font-bold text-hvac-primary hover:text-hvac-secondary transition-colors duration-200"
    >
      {logo.icon && <logo.icon size={32} />}
      <span>{logo.text}</span>
    </motion.a>
  );
};

const NavigationMenu = ({ 
  items, 
  isMobile = false, 
  onItemClick 
}: { 
  items: NavigationItem[]; 
  isMobile?: boolean;
  onItemClick?: () => void;
}) => {
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null);

  const handleItemClick = () => {
    if (onItemClick) onItemClick();
    setActiveDropdown(null);
  };

  return (
    <ul className={`${isMobile ? 'menu menu-vertical w-full' : 'menu menu-horizontal'} gap-2`}>
      {items.map((item, index) => (
        <li key={index} className="relative">
          {item.submenu ? (
            <div className="dropdown dropdown-hover">
              <div
                tabIndex={0}
                role="button"
                className="flex items-center gap-2 hover:text-hvac-primary transition-colors duration-200"
                onMouseEnter={() => !isMobile && setActiveDropdown(item.label)}
                onMouseLeave={() => !isMobile && setActiveDropdown(null)}
              >
                {item.icon && <item.icon size={18} />}
                {item.label}
                {item.badge && (
                  <span className="badge badge-primary badge-sm">{item.badge}</span>
                )}
                <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              
              <motion.ul
                initial={{ opacity: 0, y: -10 }}
                animate={{ 
                  opacity: activeDropdown === item.label ? 1 : 0,
                  y: activeDropdown === item.label ? 0 : -10
                }}
                className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow-lg border border-base-300"
              >
                {item.submenu.map((subItem, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={subItem.href}
                      onClick={handleItemClick}
                      className="flex items-center gap-2 hover:text-hvac-primary transition-colors duration-200"
                    >
                      {subItem.icon && <subItem.icon size={16} />}
                      {subItem.label}
                      {subItem.badge && (
                        <span className="badge badge-accent badge-sm">{subItem.badge}</span>
                      )}
                    </a>
                  </li>
                ))}
              </motion.ul>
            </div>
          ) : (
            <a
              href={item.href}
              onClick={handleItemClick}
              className="flex items-center gap-2 hover:text-hvac-primary transition-colors duration-200"
            >
              {item.icon && <item.icon size={18} />}
              {item.label}
              {item.badge && (
                <span className="badge badge-primary badge-sm">{item.badge}</span>
              )}
            </a>
          )}
        </li>
      ))}
    </ul>
  );
};

const EmergencyButton = ({ 
  phoneNumber, 
  onCall, 
  isScrolled 
}: { 
  phoneNumber: string; 
  onCall?: () => void;
  isScrolled: boolean;
}) => {
  const handleClick = () => {
    if (onCall) {
      onCall();
    } else {
      window.location.href = `tel:${phoneNumber}`;
    }
  };

  return (
    <motion.button
      animate={{
        background: isScrolled 
          ? 'linear-gradient(45deg, #ef4444, #dc2626)'
          : 'linear-gradient(45deg, #dc2626, #b91c1c)',
        scale: isScrolled ? 0.9 : 1,
        boxShadow: [
          '0 0 0 0 rgba(220, 38, 38, 0.7)',
          '0 0 0 10px rgba(220, 38, 38, 0)',
          '0 0 0 0 rgba(220, 38, 38, 0.7)'
        ]
      }}
      transition={{
        boxShadow: { duration: 2, repeat: Infinity },
        default: { type: "spring", stiffness: 300, damping: 30 }
      }}
      onClick={handleClick}
      className="btn btn-error text-white border-0 hidden sm:flex items-center gap-2 hover:scale-105 transition-transform duration-200"
    >
      <EmergencyIcon size={18} />
      <span className="hidden lg:inline">Emergency</span>
      <span className="font-bold">{phoneNumber}</span>
    </motion.button>
  );
};

export const Navigation: React.FC<NavigationProps> = ({
  logo = { text: "Everglade Heating and Air", href: "/", icon: ThermostatIcon },
  items,
  emergencyNumber = "619-555-0100",
  onEmergencyCall,
  className = "",
  variant = "default"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  // Handle scroll effect
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsOpen(!isOpen);
  const closeMobileMenu = () => setIsOpen(false);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`sticky top-0 z-50 ${className}`}
    >
      <motion.div
        animate={{
          backgroundColor: isScrolled 
            ? 'rgba(255, 255, 255, 0.95)' 
            : variant === 'transparent' 
              ? 'rgba(255, 255, 255, 0.8)'
              : 'rgba(255, 255, 255, 1)',
          backdropFilter: isScrolled ? 'blur(10px)' : 'blur(5px)',
          borderBottom: isScrolled 
            ? '1px solid rgba(226, 232, 240, 0.8)'
            : '1px solid transparent'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative"
      >
        <div className="container mx-auto px-4">
          <div className="navbar min-h-16 justify-between">
            {/* Logo */}
            <div className="navbar-start">
              <Logo logo={logo} isScrolled={isScrolled} />
            </div>

            {/* Desktop Menu */}
            <div className="navbar-center hidden lg:flex">
              <NavigationMenu items={items} />
            </div>

            {/* Emergency Button & Mobile Menu Toggle */}
            <div className="navbar-end flex items-center gap-4">
              <EmergencyButton 
                phoneNumber={emergencyNumber}
                onCall={onEmergencyCall}
                isScrolled={isScrolled}
              />
              
              {/* Mobile menu toggle */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={toggleMobileMenu}
                className="btn btn-ghost lg:hidden"
                aria-label="Toggle menu"
              >
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  )}
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{
            height: isOpen ? 'auto' : 0,
            opacity: isOpen ? 1 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="lg:hidden overflow-hidden border-t border-base-300"
        >
          <div className="container mx-auto px-4 py-4">
            <NavigationMenu 
              items={items} 
              isMobile={true} 
              onItemClick={closeMobileMenu}
            />
            
            {/* Mobile Emergency Button */}
            <div className="mt-4 pt-4 border-t border-base-300">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (onEmergencyCall) {
                    onEmergencyCall();
                  } else {
                    window.location.href = `tel:${emergencyNumber}`;
                  }
                  closeMobileMenu();
                }}
                className="btn btn-error w-full text-white flex items-center gap-2"
              >
                <EmergencyIcon size={18} />
                Emergency: {emergencyNumber}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.nav>
  );
};

export default Navigation;
