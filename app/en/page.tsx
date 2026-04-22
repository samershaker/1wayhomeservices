"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
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
  MenuIcon,
  XIcon,
  MailIcon,
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
import { BackgroundImage } from '@/components/ui/ResponsiveImage';

/* ═══ Animations ═══ */
import { motionPresets } from "@/lib/animations";

const { fadeUp } = motionPresets;

/* ═══ Additional animation variants for visual diversity ═══ */
const scaleInVariant = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

/* ═══ Constants moved outside components for performance ═══ */
const STAR_INDICES = [0, 1, 2, 3, 4];

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

/* ═══ Slide animation wrapper for horizontal reveals ═══ */
function AnimateSlideIn({ children, className = "", direction = "left", delay = 0 }: { children: React.ReactNode; className?: string; direction?: "left" | "right"; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const x = direction === "left" ? -40 : 40;
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══ MOBILE STICKY CTA ═══ */
function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-black/95 backdrop-blur-xl border-t border-white/10">
      <div className="flex gap-2">
        <a href="tel:+16197169193" className="btn-primary flex-1 justify-center text-sm !py-3">
          <PhoneIcon size={16} /> Call Now
        </a>
        <a href="#contact" className="btn-secondary flex-1 justify-center text-sm !py-3">
          <MailIcon size={16} /> Message
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
            <img src="/images/logo-color.png" alt="1Way Home Services home" className="h-10 w-auto" width={120} height={40} />
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
              className="min-h-11 min-w-11 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
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

/* ═══ HERO WITH WORD-BY-WORD REVEAL ═══ */
function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const textY = useTransform(scrollYProgress, [0, 0.5], ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Word-by-word reveal for the headline
  const headlineWords = ["Helping", "You", "Claim"];
  const highlightWords = ["Every", "Deduction", "Possible"];

  return (
    <BackgroundImage
      basePath="/images/hero-team"
      alt=""
      overlay="gradient"
      priority={true}
      className="min-h-[100vh] flex items-center justify-center bg-noise"
    >
      <div ref={containerRef} className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
          style={{ y: textY, opacity }}
          className="relative z-10"
        >
          {/* Logo with scale-in animation */}
          <motion.img
            src="/images/logo-white.png"
            alt="1Way Home Services"
            className="h-24 w-auto mx-auto mb-8"
            width={288}
            height={96}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Tagline with fade in */}
          <motion.p
            className="text-label mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Tax Preparation · Real Estate · Mortgages
          </motion.p>

          {/* Word-by-word headline reveal */}
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight leading-[1.1]">
            {headlineWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.3 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-white"
                >
                  {word}
                </motion.span>
              </span>
            ))}
            <br className="hidden md:block" />
            {highlightWords.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1,
                    delay: 0.6 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="inline-block text-gradient-gold"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtitle */}
          <motion.p
            className="text-body-lg text-gray-300 max-w-2xl mx-auto mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Serving El Cajon, San Diego, and surrounding areas. We uncover every possible
            tax benefit for a stronger return — plus real estate and mortgage support
            when you need it.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.a
              href="tel:+16197169193"
              className="btn-gold text-base !py-3 !px-8"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              {icons.phone} Schedule Free Consultation
            </motion.a>
            <motion.a
              href="#services"
              className="btn-secondary text-base !py-3 !px-8"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
            >
              View Our Services {icons.arrowRight}
            </motion.a>
          </motion.div>

          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.8 }}
          >
            <CompactTrustIndicator />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator with gold accent */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 rounded-full bg-[var(--color-accent)]" />
          </motion.div>
        </motion.div>
      </div>
    </BackgroundImage>
  );
}

/* ═══ STATS BAND - with gold accent numbers and scale animation ═══ */
function StatsBand() {
  return (
    <section className="py-20 border-y border-white/5 bg-black/40 bg-noise relative overflow-hidden">
      {/* Subtle gold accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(212,168,83,0.06)_0%,transparent_60%)]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid grid-cols-3 gap-8 text-center"
        >
          {STATS.map((s, i) => (
            <motion.div
              key={i}
              variants={scaleInVariant}
              className="group"
            >
              <div className="stat-number-gold font-display text-4xl md:text-5xl font-extrabold tracking-tighter group-hover:scale-105 transition-transform duration-300">
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

/* ═══ SERVICES - with staggered card animations ═══ */
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

  // Color mapping for service cards - using gold for first card
  const serviceColors = ['text-amber-400', 'text-blue-400', 'text-emerald-400', 'text-purple-400', 'text-red-400', 'text-blue-400', 'text-emerald-400'];
  const serviceCTAs = ['Get Tax Guidance', 'Start Your Return', 'Business Services', 'Organize Your Books', 'IRS Assistance', 'Real Estate Tax', 'Mortgage Help'];

  return (
    <section id="services" className="py-24 md:py-32 px-6 section-gradient-navy bg-noise relative">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">What We Do</p>
          <h2 className="font-display text-display-md font-bold">
            Full-Service <span className="text-gradient-gold">Tax & Real Estate</span>
          </h2>
        </AnimateOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.id}
              variants={fadeUp}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
            >
              <a
                href="tel:+16197169193"
                className="glass-card p-7 h-full flex flex-col group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden"
                aria-label={`${service.name} - ${service.description}. Call to learn more.`}
              >
                {/* Hover glow effect */}
                <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />

                <div className={`${serviceColors[i]} mb-4 icon-glow w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all relative z-10 group-hover:scale-110`} aria-hidden="true">
                  {getServiceIcon(service.icon)}
                </div>
                <h3 className="font-display text-lg font-bold mb-3 text-white tracking-tight relative z-10">{service.name}</h3>
                <p className="text-sm text-gray-300 leading-relaxed flex-grow mb-5 relative z-10">{service.description}</p>
                <span className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-amber-400 relative z-10">
                  {serviceCTAs[i]} {icons.arrowRight}
                </span>

                {/* Bottom accent line on hover */}
                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ ABOUT / TEAM - with slide animations ═══ */
function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 bg-noise relative">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy - slides in from left */}
          <div>
            <AnimateSlideIn direction="left">
              <p className="text-label mb-4">About 1Way Home Services</p>
            </AnimateSlideIn>
            <AnimateSlideIn direction="left" delay={0.1}>
              <h2 className="font-display text-display-md font-bold mb-8">
                6 Years of Experience.{" "}
                <span className="text-gradient-gold">100% Client Satisfaction.</span>
              </h2>
            </AnimateSlideIn>
            <AnimateSlideIn direction="left" delay={0.2}>
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
            </AnimateSlideIn>
          </div>

          {/* Right: Team - slides in from right */}
          <AnimateSlideIn direction="right" delay={0.3}>
            <div className="space-y-6">
              {TEAM_MEMBERS.map((member) => (
                <motion.div
                  key={member.id}
                  className="glass-card p-7 flex items-start gap-6 group"
                  whileHover={{ x: 8, transition: { duration: 0.3 } }}
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-amber-500/20 to-primary/5 ring-2 ring-amber-500/20 group-hover:ring-amber-500/40 transition-all">
                    <picture>
                      <source srcSet={member.image.replace('.PNG', '.webp')} type="image/webp" />
                      <img
                        src={member.image}
                        alt={`${member.name}, ${member.title}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        width={96}
                        height={96}
                      />
                    </picture>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-display text-xl font-bold text-white mb-1">{member.name}</h4>
                    <p className="text-sm text-amber-400 font-semibold mb-3">{member.credentials}</p>
                    <p className="text-sm text-gray-300 leading-relaxed">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimateSlideIn>
        </div>
      </div>
    </section>
  );
}

/* ═══ PROCESS - with connected steps ═══ */
function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 px-6 section-gradient-subtle bg-noise relative">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">Our Process</p>
          <h2 className="font-display text-display-md font-bold">
            Step by Step to <span className="text-gradient-gold">File With Confidence</span>
          </h2>
        </AnimateOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PROCESS_STEPS.map((step, i) => (
            <motion.div
              key={i}
              variants={scaleInVariant}
              className="text-center relative"
            >
              {/* Connecting line between steps */}
              {i < PROCESS_STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-amber-500/30 to-transparent" />
              )}

              <motion.div
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 mb-6 group"
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <span className="stat-number-gold font-display text-2xl font-extrabold">{step.step}</span>
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full bg-amber-500/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
              </motion.div>
              <h4 className="font-display text-base font-bold text-white mb-3">{step.title}</h4>
              <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIAL - with scale animation ═══ */
function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-6 bg-noise">
      <div className="max-w-3xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="glass-card-premium p-10 md:p-14 relative overflow-hidden">
            {/* Decorative quote marks */}
            <div className="absolute top-6 left-6 text-6xl text-amber-500/10 font-serif">&ldquo;</div>
            <div className="absolute bottom-6 right-6 text-6xl text-amber-500/10 font-serif">&rdquo;</div>

            <div className="flex items-center justify-center gap-1 mb-6">
              {STAR_INDICES.map((i) => (
                <motion.span
                  key={i}
                  className="text-amber-400"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  {icons.star}
                </motion.span>
              ))}
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-200 font-display font-medium leading-relaxed mb-8 relative z-10">
              &ldquo;{TESTIMONIALS[0].quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                {icons.user}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-white">{TESTIMONIALS[0].author}</div>
                <div className="text-xs text-gray-400">{TESTIMONIALS[0].role}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ FAQ - with alternating slide animations ═══ */
function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6 section-gradient-navy bg-noise">
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">FAQ</p>
          <h2 className="font-display text-display-md font-bold">
            Your Tax Questions <span className="text-gradient-gold">Answered</span>
          </h2>
        </AnimateOnScroll>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <AnimateSlideIn key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <motion.div
                className="glass-card p-6 group"
                whileHover={{ x: i % 2 === 0 ? 8 : -8, transition: { duration: 0.3 } }}
              >
                <h4 className="font-display text-base font-semibold text-white mb-3 group-hover:text-amber-400 transition-colors">{item.question}</h4>
                <p className="text-sm text-gray-300 leading-relaxed">{item.answer}</p>
              </motion.div>
            </AnimateSlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA BANNER - with enhanced gold accents ═══ */
function CTABanner() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="relative rounded-2xl overflow-hidden glass-card-premium p-10 md:p-16 text-center">
            {/* Enhanced gradient with gold accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-primary/10 to-transparent" />
            <div className="absolute inset-0 animate-glow-pulse-gold" />
            <div className="absolute inset-0 bg-noise opacity-50" />

            <div className="relative z-10">
              <p className="text-label mb-4">Start Saving on Your Taxes Today</p>
              <h2 className="font-display text-display-sm font-bold mb-6">
                Get Your <span className="text-gradient-gold">Free Consultation</span>
              </h2>
              <p className="text-body-lg text-gray-300 max-w-xl mx-auto mb-10">
                Schedule a free, no-obligation consultation. In person, over the phone, or via Zoom —
                however you prefer.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href="tel:+16197169193"
                  className="btn-gold text-base !py-4 !px-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {icons.phone} Call Now: (619) 716-9193
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ FOOTER ═══ */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-16 px-6 bg-noise" aria-label="Site footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src="/images/logo-color.png" alt="1Way Home Services" className="h-10 w-auto mb-4" width={120} height={40} />
            <p className="text-sm text-gray-300">
              Tax Preparation & Real Estate Services serving El Cajon, San Diego, and surrounding areas.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4 text-amber-400">Services</h4>
            <p className="text-sm text-gray-400 leading-relaxed">
              Tax Planning & Advisory · Tax Filing · Payroll Taxes<br />
              Bookkeeping · IRS Audit Support · Real Estate Tax<br />
              Mortgage Consulting
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-sm mb-4 text-amber-400">Contact</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>{icons.phone} (619) 716-9193</p>
              <p>{icons.mapPin} El Cajon, San Diego, California</p>
              <p>Hours: By Appointment</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-400">
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
