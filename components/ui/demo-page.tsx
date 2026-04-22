"use client";

import React from 'react';
import {
  Navigation,
  HeroSection,
  ServiceCardsGrid,
  EmergencyCallout,
  EmergencyFloating,
  GoogleReviews,
  HVACIcons
} from './index';

// Demo navigation items
const navigationItems = [
  {
    label: 'Services',
    href: '/services',
    submenu: [
      { label: 'AC Installation', href: '/services/installation', icon: HVACIcons.AirConditioning },
      { label: 'HVAC Repair', href: '/services/repair', icon: HVACIcons.Tool },
      { label: 'Diagnosis', href: '/services/diagnosis', icon: HVACIcons.Diagnosis },
      { label: 'AC Recharge', href: '/services/recharge', icon: HVACIcons.Cooling }
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Emergency', href: '/emergency', badge: '24/7' }
];

// Demo services data
const services = [
  {
    title: 'AC Installation',
    description: 'Professional air conditioning installation with warranty coverage and expert setup.',
    price: 'From $2,499',
    features: [
      'Free consultation & estimate',
      'Professional installation',
      '5-year warranty',
      'Energy efficiency optimization',
      'Post-installation support'
    ],
    icon: HVACIcons.AirConditioning,
    primaryColor: 'cooling' as const,
    featured: true,
    onLearnMore: () => console.log('Learn more about AC Installation'),
    onBookNow: () => console.log('Book AC Installation')
  },
  {
    title: 'HVAC Repair',
    description: 'Expert repair services for all HVAC systems with quick response times.',
    price: 'From $149',
    features: [
      'Same-day service',
      'Diagnostic included',
      '90-day warranty',
      'All major brands',
      'Upfront pricing'
    ],
    icon: HVACIcons.Tool,
    primaryColor: 'heating' as const,
    onLearnMore: () => console.log('Learn more about HVAC Repair'),
    onBookNow: () => console.log('Book HVAC Repair')
  },
  {
    title: 'System Diagnosis',
    description: 'Comprehensive HVAC system analysis to identify issues and optimize performance.',
    price: '$99',
    features: [
      'Complete system analysis',
      'Performance testing',
      'Detailed report',
      'Repair recommendations',
      'Energy efficiency tips'
    ],
    icon: HVACIcons.Diagnosis,
    primaryColor: 'neutral' as const,
    onLearnMore: () => console.log('Learn more about Diagnosis'),
    onBookNow: () => console.log('Book Diagnosis')
  }
];

export const HVACComponentDemo: React.FC = () => {
  const [showFloatingEmergency, setShowFloatingEmergency] = React.useState(true);

  return (
    <div className="min-h-screen bg-base-100">
      {/* Navigation */}
      <Navigation
        logo={{ 
          text: "Everglade Heating and Air", 
          href: "/", 
          icon: HVACIcons.Thermostat 
        }}
        items={navigationItems}
        emergencyNumber="619-555-0100"
        onEmergencyCall={() => console.log('Emergency call initiated')}
      />

      {/* Hero Section */}
      <HeroSection
        title="Professional HVAC Services"
        subtitle="Expert AC installation, repair, and maintenance for your comfort and peace of mind"
        primaryAction={{
          text: "Get Quote",
          onClick: () => console.log('Get estimate clicked')
        }}
        secondaryAction={{
          text: "View Services",
          onClick: () => console.log('View services clicked')
        }}
        emergencyNumber="619-555-0100"
      />

      {/* Services Section */}
      <section className="py-16 bg-base-200">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Professional Services
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive HVAC solutions for residential and commercial properties
            </p>
          </div>

          <ServiceCardsGrid services={services} />
        </div>
      </section>

      {/* Google Reviews Section */}
      <GoogleReviews
        businessName="Everglade Heating and Air"
        averageRating={4.9}
        totalReviews={127}
        googleBusinessUrl="https://www.google.com/maps/place/YOUR_BUSINESS_HERE"
        className=""
      />

      {/* Emergency Section */}
      <section className="py-16 bg-gradient-to-br from-cooling-50 to-heating-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <EmergencyCallout
              emergencyText="24/7 Emergency HVAC"
              description="HVAC system failed? Don't wait - our emergency team is ready to restore your comfort immediately."
              phoneNumber="619-555-0100"
              size="lg"
              onCall={() => console.log('Emergency card call')}
            />
            
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Why Choose Our Emergency Service?
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <HVACIcons.Emergency size={20} className="text-hvac-error mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Rapid Response</h4>
                    <p className="text-gray-600">Average 30-minute response time for emergency calls</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <HVACIcons.Tool size={20} className="text-hvac-error mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Expert Technicians</h4>
                    <p className="text-gray-600">Certified professionals with fully stocked vehicles</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <HVACIcons.Thermostat size={20} className="text-hvac-error mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">All Systems</h4>
                    <p className="text-gray-600">We service all major HVAC brands and models</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Controls */}
      <section className="py-8 bg-base-300">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-lg font-semibold mb-4">Demo Controls</h3>
          <button
            onClick={() => setShowFloatingEmergency(!showFloatingEmergency)}
            className="btn btn-outline"
          >
            {showFloatingEmergency ? 'Hide' : 'Show'} Floating Emergency Widget
          </button>
        </div>
      </section>

      {/* Floating Emergency Widget */}
      {showFloatingEmergency && (
        <EmergencyFloating
          emergencyText="Emergency HVAC"
          description="System down? Call now!"
          phoneNumber="619-555-0100"
          onCall={() => console.log('Floating emergency call')}
        />
      )}
    </div>
  );
};

export default HVACComponentDemo;