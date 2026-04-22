"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
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
import { ContactFormSection } from "@/components/ui/ContactForm";
import { TrustBadges, GoogleReviewsBadge } from "@/components/ui/TrustBadges";

/* ═══ Animations ═══ */
import type { Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};
const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
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

/* ═══ NAVIGATION ═══ */
function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/en/" className="flex items-center gap-3">
          <img src="/images/logo-color.png" alt="1Way Home Services" className="h-10 w-auto" />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <a href="#services" className="text-sm text-gray-400 hover:text-white transition-colors">Services</a>
          <a href="#about" className="text-sm text-gray-400 hover:text-white transition-colors">About</a>
          <a href="#process" className="text-sm text-gray-400 hover:text-white transition-colors">Process</a>
          <a href="#faq" className="text-sm text-gray-400 hover:text-white transition-colors">FAQ</a>
          <a href="tel:+16197169193" className="btn-primary text-sm !py-2 !px-5">
            {icons.phone} Call Now
          </a>
        </div>
        <a href="tel:+16197169193" className="md:hidden btn-primary text-sm !py-2 !px-4">
          {icons.phone}
        </a>
      </div>
    </nav>
  );
}

/* ═══ HERO ═══ */
function HeroSection() {
  return (
    <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      {/* Background image - optimized for performance */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/hero-team.avif" type="image/avif" />
          <source srcSet="/images/hero-team.webp" type="image/webp" />
          <img
            src="/images/hero-team-optimized.png"
            alt="1Way Home Services Team - Sam Eram (CPA) and Bakhan Kareem (CEO)"
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading="eager"
            decoding="async"
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
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
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
              <div className="text-sm text-gray-500 mt-3 font-display font-medium uppercase tracking-widest">
                {s.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══ SERVICES ═══ */
function ServicesSection() {
  const serviceCards = [
    {
      icon: icons.clock,
      title: "Tax Planning & Advisory",
      body: "Strategic tax planning to minimize liability and maximize deductions for individuals and businesses year-round.",
      cta: "Get Tax Guidance",
      color: "text-blue-400",
      href: "#",
    },
    {
      icon: icons.dollar,
      title: "Tax Filing",
      body: "Complete federal and state tax return preparation for individuals and businesses. E-file with direct deposit.",
      cta: "Start Your Return",
      color: "text-emerald-400",
      href: "#",
    },
    {
      icon: icons.calendar,
      title: "Payroll Tax Filing",
      body: "Quarterly and annual payroll tax filings, W-2 and 1099 preparation, compliance management for businesses.",
      cta: "Business Services",
      color: "text-purple-400",
      href: "#",
    },
    {
      icon: icons.document,
      title: "Bookkeeping",
      body: "Monthly financial record keeping, bank reconciliation, and financial statement preparation to keep your books in order.",
      cta: "Organize Your Books",
      color: "text-yellow-400",
      href: "#",
    },
    {
      icon: icons.shield,
      title: "IRS Help & Audit Support",
      body: "Professional representation during IRS audits, notices, and collections. Penalty abatement and payment plan negotiation.",
      cta: "IRS Assistance",
      color: "text-red-400",
      href: "#",
    },
    {
      icon: icons.home,
      title: "Real Estate Tax Support",
      body: "Capital gains planning, 1031 exchanges, depreciation strategies, and property sale tax planning for investors.",
      cta: "Real Estate Tax",
      color: "text-blue-400",
      href: "#",
    },
    {
      icon: icons.building,
      title: "Mortgage Consulting",
      body: "Loan pre-approval, refinancing analysis, debt planning, and home buying guidance — all at no charge for initial consultations.",
      cta: "Mortgage Help",
      color: "text-emerald-400",
      href: "#",
    },
  ];

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
          {serviceCards.map((s, i) => (
            <motion.div key={i} variants={fadeUp}>
              <div className="glass-card p-7 h-full flex flex-col group hover-lift">
                <div className={`${s.color} mb-4 icon-glow w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center transition-all`}>
                  {s.icon}
                </div>
                <h3 className="font-display text-lg font-bold mb-3 text-white tracking-tight">{s.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed flex-grow mb-5">{s.body}</p>
                <span className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-blue-400">
                  {s.cta} {icons.arrowRight}
                </span>
              </div>
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

/* ═══ TESTIMONIALS ═══ */
function TestimonialSection() {
  return (
    <section className="py-24 md:py-32 px-6 section-gradient-subtle">
      <div className="max-w-6xl mx-auto">
        <AnimateOnScroll className="text-center mb-16">
          <p className="text-label mb-4">CLIENT SUCCESS STORIES</p>
          <h2 className="font-display text-display-md font-bold mb-6">
            Trusted by <span className="text-gradient-blue">100+ Clients</span>
          </h2>
          <div className="flex justify-center mb-8">
            <GoogleReviewsBadge />
          </div>
        </AnimateOnScroll>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((testimonial, i) => (
            <motion.div key={testimonial.id} variants={fadeUp}>
              <div className="glass-card p-6 h-full flex flex-col">
                {/* Stars */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <span key={j} className="text-yellow-400 text-sm">{icons.star}</span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-sm text-gray-300 leading-relaxed mb-4 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Result (if exists) */}
                {'result' in testimonial && testimonial.result && (
                  <div className="mb-4 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                    <p className="text-xs text-green-400 font-semibold">
                      ✓ {testimonial.result}
                    </p>
                  </div>
                )}

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                    {icons.user}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-semibold text-white">{testimonial.author}</div>
                    <div className="text-xs text-gray-500">{testimonial.role}</div>
                    {'location' in testimonial && testimonial.location && (
                      <div className="text-xs text-gray-600">{testimonial.location}</div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA after testimonials */}
        <AnimateOnScroll className="text-center mt-12">
          <p className="text-gray-400 mb-6">Join our satisfied clients</p>
          <a href="tel:+16197169193" className="btn-primary inline-flex items-center gap-2">
            {icons.phone} Schedule Your Free Consultation
          </a>
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
    <footer className="border-t border-white/5 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Trust Badges */}
        <div className="mb-12">
          <TrustBadges variant="horizontal" size="md" />
        </div>

        <div className="grid md:grid-cols-3 gap-12">
          <div>
            <img src="/images/logo-color.png" alt="1Way Home Services" className="h-10 w-auto mb-4" />
            <p className="text-sm text-gray-400 mb-4">
              Tax Preparation & Real Estate Services serving El Cajon, San Diego, and surrounding areas.
            </p>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-yellow-400">★</span>
              <span className="font-semibold">4.9/5</span>
              <span>· 87 reviews</span>
            </div>
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
    <main className="bg-[var(--color-black)]">
      <Navigation />
      <HeroSection />
      <StatsBand />
      <ServicesSection />
      <AboutSection />
      <ProcessSection />
      <TestimonialSection />
      <FAQSection />
      <ContactFormSection />
      <CTABanner />
      <Footer />
    </main>
  );
}
