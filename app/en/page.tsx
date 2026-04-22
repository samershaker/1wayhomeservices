"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import {
  ClockIcon,
  DollarIcon,
  StarFilledIcon,
  ShieldIcon,
  PhoneIcon,
  CheckCircleIcon,
  MapPinIcon,
  ArrowRightIcon,
  CalendarIcon,
  DocumentIcon,
  UserIcon,
  HomeIcon,
  BuildingIcon,
} from "@/components/ui/icons/page-icons";
import {
  STATS,
  TEAM_MEMBERS,
  PROCESS_STEPS,
  TESTIMONIALS,
  FAQ_ITEMS,
  SERVICES,
} from "@/lib/constants";
import { ContactFormSection } from '@/components/ui/ContactForm';
import { TrustBadges, GoogleReviewsBadge, CompactTrustIndicator } from '@/components/ui/TrustBadges';

/* ═══ Animations ═══ */
import { motionPresets } from "@/lib/animations";

const { fadeUp, stagger } = motionPresets;

function AnimateOnScroll({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══ Icons map ═══ */
const icons = {
  clock: <ClockIcon />,
  dollar: <DollarIcon />,
  star: <StarFilledIcon />,
  shield: <ShieldIcon />,
  phone: <PhoneIcon size={20} />,
  check: <CheckCircleIcon size={18} />,
  mapPin: <MapPinIcon size={18} />,
  arrowRight: <ArrowRightIcon size={18} />,
  calendar: <CalendarIcon size={20} />,
  document: <DocumentIcon size={20} />,
  user: <UserIcon size={20} />,
  home: <HomeIcon size={20} />,
  building: <BuildingIcon size={20} />,
};

/* ═══ MOBILE STICKY CTA ═══ */
function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex gap-2">
        <a href="tel:+16197169193" className="btn-primary flex-1 justify-center text-sm !py-3">
          📞 Call Now
        </a>
        <a href="#contact" className="btn-secondary flex-1 justify-center text-sm !py-3">
          ✉️ Message
        </a>
      </div>
    </div>
  );
}

/* ═══ NAVIGATION ═══ */
function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5" aria-label="Main navigation">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/en/" className="flex items-center gap-3">
            <img src="/images/logo-color.png" alt="1Way Home Services home" className="h-10 w-auto" />
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm text-gray-300 hover:text-white transition-colors py-3">Services</a>
            <a href="#about" className="text-sm text-gray-300 hover:text-white transition-colors py-3">About</a>
            <a href="#process" className="text-sm text-gray-300 hover:text-white transition-colors py-3">Process</a>
            <a href="#faq" className="text-sm text-gray-300 hover:text-white transition-colors py-3">FAQ</a>
            <a href="tel:+16197169193" className="btn-primary text-sm !py-2 !px-5">
              <span className="sr-only">Call us at </span>
              <span aria-hidden="true">{icons.phone}</span>
              <span className="hidden sm:inline">Call Now</span>
            </a>
          </div>

          {/* Mobile: Hamburger + Phone */}
          <div className="md:hidden flex items-center gap-2">
            <button
              className="p-2 text-white hover:text-blue-400 transition-colors text-2xl"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? '✕' : '☰'}
            </button>
            <a href="tel:+16197169193" className="btn-primary text-sm !py-2 !px-4" aria-label="Call (619) 716-9193">
              <span aria-hidden="true">{icons.phone}</span>
            </a>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div id="mobile-menu" className="md:hidden bg-black/95 border-t border-white/5">
            <div className="flex flex-col p-6 gap-4">
              <a href="#services" className="text-white py-2 text-lg hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Services</a>
              <a href="#about" className="text-white py-2 text-lg hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#process" className="text-white py-2 text-lg hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Process</a>
              <a href="#faq" className="text-white py-2 text-lg hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
              <a href="#contact" className="text-white py-2 text-lg hover:text-blue-400 transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

/* ═══ HERO ═══ */
function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image with optimized formats */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/hero-team.webp" type="image/webp" />
          <img
            src="/images/hero-team-optimized.png"
            alt=""
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            role="presentation"
          />
        </picture>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src="/images/logo-white.png" alt="1Way Home Services" className="h-24 w-auto mx-auto mb-8" />
          <p className="text-label mb-4">Tax Preparation · Real Estate · Mortgages</p>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Helping You Claim{" "}
            <span className="text-gradient-blue">Every Deduction Possible</span>
          </h1>
          <p className="text-body-lg text-gray-300 max-w-2xl mx-auto mb-10">
            Serving El Cajon, San Diego, and surrounding areas. We uncover every possible
            tax benefit for a stronger return — plus real estate and mortgage support
            when you need it.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="tel:+16197169193" className="btn-primary text-base !py-3 !px-8">
              {icons.phone} Schedule Free Consultation
            </a>
            <a href="#services" className="btn-secondary text-base !py-3 !px-8">
              View Our Services →
            </a>
          </div>
          <div className="mt-6">
            <CompactTrustIndicator />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
        >
          <div className="w-1 h-2 rounded-full bg-white/40" />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ STATS BAND ═══ */
function StatsBand() {
  return (
    <section className="py-20 border-y border-white/5 bg-black/40">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-3 gap-8 text-center"
        >
          {STATS.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="stat-number font-display text-4xl md:text-5xl font-extrabold tracking-tighter">
                {s.value}
              </div>
              <div className="text-sm text-gray-300 mt-3 font-display font-medium uppercase tracking-widest">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ TRUST BADGES SECTION ═══ */
function TrustBadgesSection() {
  return (
    <section className="py-12 px-6 border-y border-white/5">
      <div className="max-w-6xl mx-auto">
        <TrustBadges variant="horizontal" size="md" />
        <div className="mt-6 flex justify-center">
          <GoogleReviewsBadge />
        </div>
      </div>
    </section>
  );
}

/* ═══ SERVICES ═══ */
function ServicesSection() {
  // Icon mapping utility
  const getServiceIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'clock': icons.clock,
      'dollar': icons.dollar,
      'calendar': icons.calendar,
      'document': icons.document,
      'shield': icons.shield,
      'home': icons.home,
      'building': icons.building,
    };
    return iconMap[iconName] || icons.clock;
  };

  // Color mapping for service cards
  const serviceColors = ['text-blue-400', 'text-emerald-400', 'text-purple-400', 'text-yellow-400', 'text-red-400', 'text-blue-400', 'text-emerald-400'];
  const serviceCTAs = ['Get Tax Guidance', 'Start Your Return', 'Business Services', 'Organize Your Books', 'IRS Assistance', 'Real Estate Tax', 'Mortgage Help'];

  return (
    <section id="services" className="py-24 md:py-32 px-6 section-gradient-navy">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">What We Do</p>
          <h2 className="font-display text-display-md font-bold">
            Full-Service <span className="text-gradient-blue">Tax & Real Estate</span>
          </h2>
        </AnimateOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.div key={service.id} variants={fadeUp}>
              <a
                href="tel:+16197169193"
                className="glass-card p-7 h-full flex flex-col group hover-lift block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black"
                aria-label={`${service.name} - ${service.description}. Call to learn more.`}
              >
                <div className={`${serviceColors[i]} mb-4 icon-glow w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all`} aria-hidden="true">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="font-display text-lg font-bold mb-3 text-white tracking-tight">{service.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-grow mb-5">{service.description}</p>
                <span className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-blue-400">
                  {serviceCTAs[i]} {icons.arrowRight}
                </span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ ABOUT / TEAM ═══ */
function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div>
            <AnimateOnScroll>
              <p className="text-label mb-4">About 1Way Home Services</p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.1}>
              <h2 className="font-display text-display-md font-bold mb-8">
                6 Years of Experience.{" "}
                <span className="text-gradient-blue">100% Client Satisfaction.</span>
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={0.2}>
              <div className="space-y-5 text-body-lg">
                <p>
                  Taxes can get complicated, but they don&apos;t have to feel overwhelming.
                  We review your situation carefully, identify every deduction you qualify for,
                  and guide you through the process with clarity and confidence.
                </p>
                <p>
                  Beyond tax preparation, our team offers real estate tax strategy and mortgage
                  consulting — giving you a full-picture view of your financial health.
                  Whether you&apos;re buying a home, selling an investment property, or running a business,
                  we&apos;ve got you covered.
                </p>
              </div>
            </AnimateOnScroll>
          </div>

          {/* Right: Team */}
          <AnimateOnScroll delay={0.3}>
            <div className="space-y-6">
              {TEAM_MEMBERS.map((member) => (
                <div key={member.id} className="glass-card p-7 flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-primary/20">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">{member.name}</h4>
                    <p className="text-xs text-blue-400 font-semibold mb-2">{member.credentials}</p>
                    <p className="text-sm text-gray-400 leading-relaxed">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ═══ PROCESS ═══ */
function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 px-6 section-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">Our Process</p>
          <h2 className="font-display text-display-md font-bold">
            Step by Step to <span className="text-gradient-blue">File With Confidence</span>
          </h2>
        </AnimateOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div key={i} variants={fadeUp} className="text-center">
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 border border-primary/30 mb-6">
                <span className="stat-number font-display text-2xl font-extrabold">{step.step}</span>
              </div>
              <h4 className="font-display text-base font-bold text-white mb-3">{step.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIAL ═══ */
function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <AnimateOnScroll>
          <div className="glass-card p-10 md:p-14">
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">{icons.star}</span>
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-200 font-display font-medium leading-relaxed mb-8">
              &ldquo;{TESTIMONIALS[0].quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                {icons.user}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">{TESTIMONIALS[0].author}</div>
                <div className="text-xs text-gray-500">{TESTIMONIALS[0].role}</div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ═══ FAQ ═══ */
function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 section-gradient-navy">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">FAQ</p>
          <h2 className="font-display text-display-md font-bold">
            Your Tax Questions <span className="text-gradient-blue">Answered</span>
          </h2>
        </AnimateOnScroll>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <AnimateOnScroll key={i} delay={i * 0.08}>
              <div className="glass-card p-6">
                <h4 className="font-display text-base font-semibold text-white mb-3">{item.question}</h4>
                <p className="text-sm text-gray-400 leading-relaxed">{item.answer}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA BANNER ═══ */
function CTABanner() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimateOnScroll>
          <div className="relative rounded-2xl overflow-hidden glass-card-premium p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
            <div className="absolute inset-0 animate-glow-pulse-soft" />
            <div className="relative z-10">
              <p className="text-label mb-4">Start Saving on Your Taxes Today</p>
              <h2 className="font-display text-display-sm font-bold mb-6">
                Get Your <span className="text-gradient-blue">Free Consultation</span>
              </h2>
              <p className="text-body-lg text-gray-300 max-w-xl mx-auto mb-10">
                Schedule a free, no-obligation consultation. In person, over the phone, or via Zoom —
                however you prefer.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a href="tel:+16197169193" className="btn-primary text-base !py-3 !px-8">
                  {icons.phone} Call Now: (619) 716-9193
                </a>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6" aria-label="Site footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src="/images/logo-color.png" alt="1Way Home Services" className="h-10 w-auto mb-4" />
            <p className="text-sm text-gray-400">
              Tax Preparation & Real Estate Services serving El Cajon, San Diego, and surrounding areas.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4">Services</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              Tax Planning & Advisory · Tax Filing · Payroll Taxes<br />
              Bookkeeping · IRS Audit Support · Real Estate Tax<br />
              Mortgage Consulting
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>{icons.phone} (619) 716-9193</p>
              <p>{icons.mapPin} El Cajon, San Diego, California</p>
              <p>Hours: By Appointment</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} 1Way Home Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ═══ PAGE ASSEMBLY ═══ */
export default function HomePage() {
  return (
    <>
      <MobileStickyCTA />
      <Navigation />
      <main id="main-content" className="bg-[var(--color-black)]">
        <HeroSection />
        <StatsBand />
        <TrustBadgesSection />
        <ServicesSection />
        <AboutSection />
        <ProcessSection />
        <TestimonialSection />
        <ContactFormSection />
        <FAQSection />
        <CTABanner />
        <Footer />
      </main>
    </>
  );
}
