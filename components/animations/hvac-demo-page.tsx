'use client';

/**
 * HVAC Animation Demo Page
 * Demonstrates all animation components in a cohesive HVAC-themed layout
 * This serves as a reference and can be used as a template for actual pages
 */

import React, { useState } from 'react';
import {
  HeroText,
  TypewriterText,
  GlowText,
  SpringButton,
  SpringThermostat,
  InViewAnimation,
  HVACEquipmentAnimation,
  ScrollCounter,
  StaggeredReveal,
  StaggerItem,
  PageTransition,
  EquipmentShowcase,
  ServiceCardsTrail,
  FloatingElement,
  SpringModal,
  ParallaxElement
} from './index';

// Demo data
const serviceData = [
  {
    id: 'cooling',
    title: 'Air Conditioning Services',
    description: 'Professional AC installation, repair, and maintenance services to keep you cool year-round.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
      </svg>
    )
  },
  {
    id: 'heating',
    title: 'Heating System Solutions',
    description: 'Expert furnace installation, repair, and maintenance to ensure your home stays warm.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
      </svg>
    )
  },
  {
    id: 'maintenance',
    title: 'Preventive Maintenance',
    description: 'Regular maintenance plans to keep your HVAC system running efficiently and prevent costly repairs.',
    icon: (
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    )
  }
];

export const HVACDemoPage: React.FC = () => {
  const [thermostatValue, setThermostatValue] = useState(72);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <PageTransition className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-cooling-50 to-heating-50 overflow-hidden">
        {/* Background Elements */}
        <ParallaxElement offset={30} className="absolute inset-0 opacity-10">
          <div className="w-full h-full bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center" />
        </ParallaxElement>

        {/* Floating Elements */}
        <FloatingElement 
          amplitude={15} 
          speed={3000} 
          delay={0}
          className="absolute top-20 left-20 opacity-20"
        >
          <div className="w-16 h-16 bg-cooling-300 rounded-full" />
        </FloatingElement>
        
        <FloatingElement 
          amplitude={20} 
          speed={2500} 
          delay={1000}
          className="absolute bottom-20 right-20 opacity-20"
        >
          <div className="w-12 h-12 bg-heating-300 rounded-full" />
        </FloatingElement>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <HeroText 
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            delay={0.2}
          >
            Professional HVAC Services
          </HeroText>
          
          <div className="mb-8">
            <TypewriterText 
              className="text-xl md:text-2xl text-gray-600"
              speed={50}
              startDelay={2000}
            >
              Cooling • Heating • Maintenance • Emergency Repairs
            </TypewriterText>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <SpringButton
              variant="primary"
              size="lg"
              onClick={() => setIsModalOpen(true)}
            >
              <GlowText glowColor="accent" intensity="medium">
                Schedule Service
              </GlowText>
            </SpringButton>
            
            <SpringButton
              variant="outline"
              size="lg"
            >
              Emergency Service
            </SpringButton>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <InViewAnimation animation="fadeInUp" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <StaggeredReveal className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <StaggerItem>
              <div className="p-6">
                <ScrollCounter
                  from={0}
                  to={25}
                  duration={2000}
                  className="text-4xl font-bold text-hvac-primary"
                  suffix="+"
                />
                <p className="text-gray-600 mt-2">Years Experience</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="p-6">
                <ScrollCounter
                  from={0}
                  to={5000}
                  duration={2500}
                  className="text-4xl font-bold text-hvac-secondary"
                  suffix="+"
                />
                <p className="text-gray-600 mt-2">Happy Customers</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="p-6">
                <ScrollCounter
                  from={0}
                  to={99}
                  duration={2000}
                  decimals={1}
                  className="text-4xl font-bold text-hvac-accent"
                  suffix="%"
                />
                <p className="text-gray-600 mt-2">Satisfaction Rate</p>
              </div>
            </StaggerItem>
            
            <StaggerItem>
              <div className="p-6">
                <ScrollCounter
                  from={0}
                  to={24}
                  duration={1500}
                  className="text-4xl font-bold text-hvac-primary"
                  suffix="/7"
                />
                <p className="text-gray-600 mt-2">Emergency Service</p>
              </div>
            </StaggerItem>
          </StaggeredReveal>
        </div>
      </InViewAnimation>

      {/* Equipment Showcase */}
      <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <InViewAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <GlowText glowColor="cooling" intensity="low">
                Modern HVAC Equipment
              </GlowText>
            </h2>
            <p className="text-xl text-gray-600">
              State-of-the-art systems for optimal comfort and efficiency
            </p>
          </InViewAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <EquipmentShowcase equipmentType="cooling" className="text-center">
              <HVACEquipmentAnimation type="cooling" intensity="medium">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-24 h-24 bg-cooling-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-cooling-400 rounded-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cooling Systems</h3>
                  <p className="text-gray-600">Advanced air conditioning units with smart temperature control</p>
                </div>
              </HVACEquipmentAnimation>
            </EquipmentShowcase>

            <EquipmentShowcase equipmentType="heating" className="text-center">
              <HVACEquipmentAnimation type="heating" intensity="medium">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-24 h-24 bg-heating-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-heating-400 rounded-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Heating Systems</h3>
                  <p className="text-gray-600">Efficient furnaces and heat pumps for year-round comfort</p>
                </div>
              </HVACEquipmentAnimation>
            </EquipmentShowcase>

            <EquipmentShowcase equipmentType="ventilation" className="text-center">
              <HVACEquipmentAnimation type="ventilation" intensity="low">
                <div className="bg-white rounded-xl p-8 shadow-lg">
                  <div className="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <div className="w-12 h-12 bg-green-400 rounded-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Ventilation</h3>
                  <p className="text-gray-600">Air purification and circulation systems for healthy indoor air</p>
                </div>
              </HVACEquipmentAnimation>
            </EquipmentShowcase>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <InViewAnimation animation="fadeInUp" className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600">Comprehensive HVAC solutions for your home and business</p>
          </InViewAnimation>

          <ServiceCardsTrail items={serviceData} className="max-w-4xl mx-auto" />
        </div>
      </section>

      {/* Interactive Thermostat Demo */}
      <section className="py-20 bg-gradient-to-br from-cooling-50 to-heating-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <InViewAnimation animation="fadeInUp" className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Smart Temperature Control</h2>
            <p className="text-xl text-gray-600">Experience our advanced thermostat technology</p>
          </InViewAnimation>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <SpringThermostat
              value={thermostatValue}
              onChange={setThermostatValue}
              mode={thermostatValue > 75 ? 'cooling' : 'heating'}
              className="mx-auto"
            />
            
            <div className="text-left">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Current Setting: <GlowText glowColor={thermostatValue > 75 ? 'cooling' : 'heating'}>{thermostatValue}°F</GlowText>
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Smart scheduling</li>
                <li>• Remote control via app</li>
                <li>• Energy efficiency monitoring</li>
                <li>• Automatic temperature adjustment</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-hvac-primary text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <InViewAnimation animation="scaleIn">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Contact us today for a free consultation and estimate
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <SpringButton
                variant="secondary"
                size="lg"
                onClick={() => setIsModalOpen(true)}
              >
                Schedule Consultation
              </SpringButton>
              
              <SpringButton
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-hvac-primary"
              >
                Call (555) 123-HVAC
              </SpringButton>
            </div>
          </InViewAnimation>
        </div>
      </section>

      {/* Demo Modal */}
      <SpringModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="p-8"
      >
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Schedule Your Service</h3>
        <p className="text-gray-600 mb-6">
          This is a demo modal showcasing the SpringModal animation component. 
          In a real implementation, this would contain a service scheduling form.
        </p>
        <SpringButton onClick={() => setIsModalOpen(false)}>
          Close Demo
        </SpringButton>
      </SpringModal>
    </PageTransition>
  );
};

export default HVACDemoPage;