"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
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
  CONTACT_INFO,
} from "@/lib/constants";
import { ContactFormSection } from '@/components/ui/ContactForm';
import { TrustBadges, GoogleReviewsBadge, CompactTrustIndicator } from '@/components/ui/TrustBadges';
import { FAQStructuredData } from '@/components/StructuredData';

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

/* ═══ HERO WITH WORD-BY-WORD REVEAL ═══ */
function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Respect prefers-reduced-motion: skip parallax + fade, keep content stable.
  const textY = useTransform(scrollYProgress, [0, 0.5], prefersReducedMotion ? ["0%", "0%"] : ["0%", "10%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], prefersReducedMotion ? [1, 1] : [1, 0]);

  // Word-by-word reveal for the headline
  const headlineWords = ["Helping", "You", "Claim"];
  const highlightWords = ["Every", "Deduction", "Possible"];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-banner.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/90 via-black/80 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
      </div>
      <div className="relative z-10 min-h-[100vh] flex items-center justify-center bg-noise">
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
                  className="inline-block text-gradient-teal"
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
              href={CONTACT_INFO.phoneHref}
              className="btn-primary text-base !py-3 !px-8"
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
      </div>
    </section>
  );
}

/* ═══ STATS BAND - with teal accent numbers and scale animation ═══ */
function StatsBand() {
  return (
    <section className="py-20 border-y border-white/5 bg-black/40 bg-noise relative overflow-hidden">
      {/* Subtle teal accent glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_100%,rgba(13,78,83,0.08)_0%,transparent_60%)]" />

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
              <div className="stat-number font-display text-4xl md:text-5xl font-extrabold tracking-tighter group-hover:scale-105 transition-transform duration-300">
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

/* ═══ SERVICES - Two Category Layout with Images ═══ */
function ServicesSection() {
  // Split services by category
  const taxServices = SERVICES.filter(s => s.category === 'tax');
  const realEstateServices = SERVICES.filter(s => s.category === 'real-estate');

  return (
    <section id="services" className="py-24 md:py-32 px-6 section-gradient-navy bg-noise relative">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-3">What We Do</p>
          <h2 className="font-display text-display-md font-bold mb-4">
            Full-Service <span className="text-gradient-teal">Tax & Real Estate</span>
          </h2>
          <p className="text-subheading-lg max-w-2xl mx-auto">
            Comprehensive financial services tailored to individuals and businesses in San Diego County
          </p>
        </AnimateOnScroll>

        {/* TAX SERVICES */}
        <div className="mb-20">
          <AnimateOnScroll className="mb-10">
            <h3 className="font-display text-2xl font-bold text-white mb-2">Tax Services</h3>
            <p className="text-gray-300">Professional tax preparation and planning for individuals & businesses</p>
          </AnimateOnScroll>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {taxServices.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </motion.div>
        </div>

        {/* REAL ESTATE SERVICES */}
        <div>
          <AnimateOnScroll className="mb-10">
            <h3 className="font-display text-2xl font-bold text-white mb-2">Real Estate Services</h3>
            <p className="text-gray-300">Property investment guidance and mortgage consulting</p>
          </AnimateOnScroll>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid md:grid-cols-2 gap-6"
          >
            {realEstateServices.map((service) => (
              <ServiceCard key={service.id} service={service} isLarge />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══ SERVICE CARD - Reusable card with image ═══ */
function ServiceCard({ service, isLarge = false }: { service: typeof SERVICES[number]; isLarge?: boolean }) {
  const href = 'landingUrl' in service && service.landingUrl ? service.landingUrl : `/en/services/${service.slug}/`;
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className={isLarge ? 'md:col-span-1' : ''}
    >
      <Link
        href={href}
        className="glass-card h-full flex flex-col group block focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-black relative overflow-hidden"
        aria-label={`Learn more about ${service.name}`}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={service.image}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Badge */}
          {service.badge && (
            <span className="absolute top-3 right-3 px-3 py-1 text-xs font-semibold rounded-full bg-[var(--color-secondary)]/90 text-white backdrop-blur-sm">
              {service.badge}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-grow">
          <h4 className="font-display text-lg font-bold mb-2 text-white tracking-tight group-hover:text-[var(--color-secondary-light)] transition-colors">
            {service.name}
          </h4>
          <p className="text-sm text-gray-300 leading-relaxed flex-grow mb-4">
            {service.description}
          </p>

          {/* Features - show first 2 */}
          <ul className="space-y-1.5 mb-4">
            {service.features.slice(0, 2).map((feature, i) => (
              <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
                <svg className="w-3.5 h-3.5 text-[var(--color-secondary-light)] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--color-secondary-light)] group-hover:gap-3 transition-all">
            Learn more {icons.arrowRight}
          </span>
        </div>

        {/* Hover glow effect */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[var(--color-secondary)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </Link>
    </motion.div>
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
              <p className="text-label mb-3">About 1Way Home Services</p>
            </AnimateSlideIn>
            <AnimateSlideIn direction="left" delay={0.1}>
              <h2 className="font-display text-display-sm font-bold mb-4">
                6 Years of Experience.{" "}
                <span className="text-gradient-teal">100% Client Satisfaction.</span>
              </h2>
            </AnimateSlideIn>
            <AnimateSlideIn direction="left" delay={0.15}>
              <p className="text-subheading mb-8">
                Your trusted partners in tax preparation, real estate, and financial planning.
              </p>
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
                  spellCheck={false}
                  data-gramm="false"
                  data-gramm_editor="false"
                  data-enable-grammarly="false"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-gradient-to-br from-[var(--color-secondary)]/20 to-primary/5 ring-2 ring-[var(--color-secondary)]/20 group-hover:ring-[var(--color-secondary)]/40 transition-all">
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
                    <h3 className="font-display text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-sm text-[var(--color-secondary-light)] font-semibold mb-3">{member.credentials}</p>
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
        <AnimateOnScroll className="text-center mb-20">
          <p className="text-label mb-3">Our Process</p>
          <h2 className="font-display text-display-md font-bold mb-4">
            Step by Step to <span className="text-gradient-teal">File With Confidence</span>
          </h2>
          <p className="text-subheading-lg max-w-2xl mx-auto">
            A simple, transparent approach that keeps you informed at every stage
          </p>
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
                <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[var(--color-secondary)]/30 to-transparent" />
              )}

              <motion.div
                className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-secondary)]/10 border border-[var(--color-secondary)]/30 mb-6 group"
                whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              >
                <span className="stat-number font-display text-2xl font-extrabold">{step.step}</span>
                {/* Glow on hover */}
                <div className="absolute inset-0 rounded-full bg-[var(--color-secondary)]/20 opacity-0 group-hover:opacity-100 blur-md transition-opacity" />
              </motion.div>
              <h3 className="font-display text-base font-bold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ TESTIMONIAL CAROUSEL - cycles through all reviews ═══ */
function TestimonialSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 7000);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[index];

  return (
    <section className="py-24 md:py-32 px-6 bg-noise" aria-label="Client testimonials">
      <div className="max-w-3xl mx-auto text-center" ref={ref}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="glass-card-premium p-10 md:p-14 relative overflow-hidden"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            {/* Decorative quote marks */}
            <div className="absolute top-6 left-6 text-6xl text-[var(--color-secondary)]/10 font-serif" aria-hidden="true">&ldquo;</div>
            <div className="absolute bottom-6 right-6 text-6xl text-[var(--color-secondary)]/10 font-serif" aria-hidden="true">&rdquo;</div>

            <div aria-live="polite" aria-atomic="true">
              <div className="flex items-center justify-center gap-1 mb-6" aria-hidden="true">
                {STAR_INDICES.map((i) => (
                  <span key={i} className="text-[var(--color-secondary-light)]">{icons.star}</span>
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-200 font-display font-medium leading-relaxed mb-8 relative z-10 min-h-[8rem]">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-full bg-[var(--color-secondary)]/20 flex items-center justify-center" aria-hidden="true">
                  {icons.user}
                </div>
                <div className="text-left">
                  <div className="text-sm font-semibold text-white">{current.author}</div>
                  <div className="text-xs text-gray-300">{current.role} · {current.location}</div>
                </div>
              </div>
            </div>

            {/* Dot navigation */}
            <div className="flex items-center justify-center gap-2">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1} of ${TESTIMONIALS.length}`}
                  aria-current={i === index ? 'true' : undefined}
                  className={`h-2 rounded-full transition-all ${
                    i === index
                      ? 'bg-[var(--color-secondary-light)] w-6'
                      : 'bg-white/20 hover:bg-white/40 w-2'
                  }`}
                />
              ))}
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
      <FAQStructuredData faqs={FAQ_ITEMS} />
      <div className="max-w-3xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">FAQ</p>
          <h2 className="font-display text-display-md font-bold">
            Your Tax Questions <span className="text-gradient-teal">Answered</span>
          </h2>
        </AnimateOnScroll>

        <div className="space-y-4">
          {FAQ_ITEMS.map((item, i) => (
            <AnimateSlideIn key={i} direction={i % 2 === 0 ? "left" : "right"} delay={i * 0.08}>
              <motion.div
                className="glass-card p-6 group"
                whileHover={{ x: i % 2 === 0 ? 8 : -8, transition: { duration: 0.3 } }}
              >
                <h3 className="font-display text-base font-semibold text-white mb-3 group-hover:text-[var(--color-secondary-light)] transition-colors">{item.question}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{item.answer}</p>
              </motion.div>
            </AnimateSlideIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══ CTA BANNER - with enhanced teal accents ═══ */
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
            {/* Enhanced gradient with teal accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/10 via-primary/10 to-transparent" />
            <div className="absolute inset-0 animate-glow-pulse-teal" />
            <div className="absolute inset-0 bg-noise opacity-50" />

            <div className="relative z-10">
              <p className="text-label mb-4">Start Saving on Your Taxes Today</p>
              <h2 className="font-display text-display-sm font-bold mb-6">
                Get Your <span className="text-gradient-teal">Free Consultation</span>
              </h2>
              <p className="text-body-lg text-gray-300 max-w-xl mx-auto mb-10">
                Schedule a free, no-obligation consultation. In person, over the phone, or via Zoom —
                however you prefer.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <motion.a
                  href={CONTACT_INFO.phoneHref}
                  className="btn-primary text-base !py-4 !px-10"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {icons.phone} Call Now: {CONTACT_INFO.phone}
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ PAGE ASSEMBLY ═══ */
/* Nav, footer, and mobile sticky CTA are provided by app/en/layout.tsx
   so they persist across every page under /en/. */
export default function HomePage() {
  return (
    <>
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
    </>
  );
}
