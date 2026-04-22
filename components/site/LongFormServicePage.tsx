"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  PhoneIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldIcon,
  ClockIcon,
  DollarIcon,
  StarFilledIcon,
  UserIcon,
  CalendarIcon,
  DocumentIcon,
  HomeIcon,
  BuildingIcon,
  MailIcon,
} from "@/components/ui/icons/page-icons";
import { CONTACT_INFO } from "@/lib/constants";
import { EASE_OUT_EXPO, SCROLL_VIEWPORT } from "@/lib/animations";
import { FAQStructuredData } from "@/components/StructuredData";

/* ═══ Config shape ═══ */

export type LandingIconName =
  | "phone"
  | "check"
  | "shield"
  | "clock"
  | "dollar"
  | "star"
  | "user"
  | "calendar"
  | "document"
  | "home"
  | "building"
  | "mail"
  | "arrow";

export interface LandingCta {
  label: string;
  href: string;
  icon?: LandingIconName;
}

export interface LandingConfig {
  hero: {
    eyebrow: string;
    headline: string;
    highlight?: string;
    subheadline: string;
    primaryCta?: LandingCta;
    secondaryCta?: LandingCta;
    trustRow?: string[];
  };
  valueProps: {
    icon: LandingIconName;
    title: string;
    description: string;
  }[];
  howItWorks: {
    step: number;
    title: string;
    description: string;
    icon?: LandingIconName;
  }[];
  pricing: {
    eyebrow?: string;
    headline: string;
    price: string;
    priceNote: string;
    includes: string[];
    cta?: LandingCta;
  };
  testimonials?: {
    quote: string;
    author: string;
    role: string;
    result?: string;
  }[];
  guarantee?: {
    icon?: LandingIconName;
    headline: string;
    body: string;
  };
  faqs?: { question: string; answer: string }[];
  closingCta: {
    eyebrow?: string;
    headline: string;
    highlight?: string;
    subheadline: string;
    primaryCta?: LandingCta;
    secondaryCta?: LandingCta;
  };
}

/* ═══ Icon mapper ═══ */

function Icon({ name, size = 20 }: { name?: LandingIconName; size?: number }) {
  switch (name) {
    case "phone":
      return <PhoneIcon size={size} />;
    case "check":
      return <CheckCircleIcon size={size} />;
    case "shield":
      return <ShieldIcon size={size} />;
    case "clock":
      return <ClockIcon size={size} />;
    case "dollar":
      return <DollarIcon size={size} />;
    case "star":
      return <StarFilledIcon size={size} />;
    case "user":
      return <UserIcon size={size} />;
    case "calendar":
      return <CalendarIcon size={size} />;
    case "document":
      return <DocumentIcon size={size} />;
    case "home":
      return <HomeIcon size={size} />;
    case "building":
      return <BuildingIcon size={size} />;
    case "mail":
      return <MailIcon size={size} />;
    case "arrow":
      return <ArrowRightIcon size={size} />;
    default:
      return null;
  }
}

/* ═══ CTA link ═══ */

function CtaLink({
  cta,
  variant = "primary",
}: {
  cta: LandingCta;
  variant?: "primary" | "secondary";
}) {
  const className =
    variant === "primary"
      ? "btn-primary text-base !py-3 !px-8"
      : "btn-secondary text-base !py-3 !px-8";
  const isInternal = cta.href.startsWith("/");
  const content = (
    <>
      {cta.icon && <Icon name={cta.icon} size={18} />}
      {cta.label}
      {variant === "secondary" && !cta.icon && <Icon name="arrow" size={18} />}
    </>
  );
  if (isInternal) {
    return (
      <Link href={cta.href} className={className}>
        {content}
      </Link>
    );
  }
  return (
    <a href={cta.href} className={className}>
      {content}
    </a>
  );
}

/* ═══ Defaults (used when config omits CTAs) ═══ */

function defaultPrimary(): LandingCta {
  return { label: `Call ${CONTACT_INFO.phone}`, href: CONTACT_INFO.phoneHref, icon: "phone" };
}
function defaultSecondary(): LandingCta {
  return { label: "Send a message", href: "/en/#contact", icon: "mail" };
}

/* ═══ Main component ═══ */

export function LongFormServicePage({ config }: { config: LandingConfig }) {
  const heroPrimary = config.hero.primaryCta ?? defaultPrimary();
  const heroSecondary = config.hero.secondaryCta ?? defaultSecondary();
  const closingPrimary = config.closingCta.primaryCta ?? defaultPrimary();
  const closingSecondary = config.closingCta.secondaryCta ?? defaultSecondary();
  const pricingCta = config.pricing.cta ?? defaultPrimary();

  return (
    <div className="bg-noise">
      {config.faqs && config.faqs.length > 0 && (
        <FAQStructuredData faqs={config.faqs} />
      )}
      {/* ═══ HERO ═══ */}
      <section className="relative pt-28 md:pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 section-gradient-navy opacity-60 pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.p
            className="text-label mb-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {config.hero.eyebrow}
          </motion.p>
          <motion.h1
            className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {config.hero.headline}
            {config.hero.highlight && (
              <>
                <br className="hidden md:block" />{" "}
                <span className="text-gradient-teal">{config.hero.highlight}</span>
              </>
            )}
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {config.hero.subheadline}
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <CtaLink cta={heroPrimary} variant="primary" />
            <CtaLink cta={heroSecondary} variant="secondary" />
          </motion.div>
          {config.hero.trustRow && config.hero.trustRow.length > 0 && (
            <motion.div
              className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              {config.hero.trustRow.map((item, i) => (
                <span key={i} className="inline-flex items-center gap-2">
                  {i > 0 && <span aria-hidden="true" className="text-gray-500">·</span>}
                  {item}
                </span>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* ═══ VALUE PROPS ═══ */}
      <section className="py-16 md:py-20 px-6 border-y border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          {config.valueProps.map((vp, i) => (
            <motion.div
              key={i}
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-secondary)]/15 text-[var(--color-secondary-light)] mb-4">
                <Icon name={vp.icon} size={28} />
              </div>
              <h3 className="font-display text-xl font-bold text-white mb-2">
                {vp.title}
              </h3>
              <p className="text-gray-300 leading-relaxed">{vp.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="py-20 md:py-28 px-6 section-gradient-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-label mb-3">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              From inquiry to filed return
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {config.howItWorks.map((step, i) => (
              <motion.div
                key={step.step}
                className="relative text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={SCROLL_VIEWPORT}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                {i < config.howItWorks.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-[var(--color-secondary)]/30 to-transparent"
                  />
                )}
                <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 mb-6">
                  <span className="stat-number font-display text-2xl font-extrabold">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            {config.pricing.eyebrow && (
              <p className="text-label mb-3">{config.pricing.eyebrow}</p>
            )}
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              {config.pricing.headline}
            </h2>
          </div>
          <div className="glass-card-premium p-8 md:p-10">
            <div className="text-center mb-8 pb-8 border-b border-white/10">
              <p className="font-display text-5xl md:text-6xl font-extrabold text-white mb-2">
                {config.pricing.price}
              </p>
              <p className="text-sm text-gray-300">{config.pricing.priceNote}</p>
            </div>
            <ul className="space-y-3 mb-8">
              {config.pricing.includes.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-200">
                  <svg
                    className="w-5 h-5 text-[var(--color-secondary-light)] flex-shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-center">
              <CtaLink cta={pricingCta} variant="primary" />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      {config.testimonials && config.testimonials.length > 0 && (
        <section className="py-20 md:py-28 px-6 section-gradient-navy">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-label mb-3">What Clients Say</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Real results from real people
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {config.testimonials.map((t, i) => (
                <motion.div
                  key={i}
                  className="glass-card p-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={SCROLL_VIEWPORT}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                >
                  <div className="flex items-center gap-1 mb-4 text-[var(--color-secondary-light)]" aria-hidden="true">
                    {Array.from({ length: 5 }).map((_, si) => (
                      <StarFilledIcon key={si} size={16} />
                    ))}
                  </div>
                  <blockquote className="text-gray-200 leading-relaxed mb-5 italic">
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <div className="font-semibold text-white">{t.author}</div>
                      <div className="text-sm text-gray-300">{t.role}</div>
                    </div>
                    {t.result && (
                      <div className="text-right">
                        <div className="text-xs text-gray-300 uppercase tracking-wide">
                          Result
                        </div>
                        <div className="text-sm font-semibold text-[var(--color-secondary-light)]">
                          {t.result}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ GUARANTEE / RISK REVERSAL ═══ */}
      {config.guarantee && (
        <section className="py-16 md:py-20 px-6">
          <div className="max-w-3xl mx-auto">
            <motion.div
              className="glass-card p-8 md:p-10 flex items-start gap-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={SCROLL_VIEWPORT}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-secondary)]/15 text-[var(--color-secondary-light)] flex-shrink-0">
                <Icon name={config.guarantee.icon ?? "shield"} size={24} />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  {config.guarantee.headline}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {config.guarantee.body}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══ FAQ ═══ */}
      {config.faqs && config.faqs.length > 0 && (
        <section className="py-20 md:py-28 px-6 section-gradient-subtle">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-label mb-3">FAQ</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold">
                Questions, answered
              </h2>
            </div>
            <div className="space-y-4">
              {config.faqs.map((item, i) => (
                <motion.details
                  key={i}
                  className="glass-card p-5 group"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: i * 0.04 }}
                >
                  <summary className="flex items-start justify-between gap-4 cursor-pointer list-none font-display font-semibold text-white">
                    <span>{item.question}</span>
                    <span
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-300 transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-300 leading-relaxed">{item.answer}</p>
                </motion.details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══ CLOSING CTA ═══ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden glass-card-premium p-10 md:p-16 text-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/10 via-[var(--color-primary)]/10 to-transparent pointer-events-none" />
            <div className="relative z-10">
              {config.closingCta.eyebrow && (
                <p className="text-label mb-4">{config.closingCta.eyebrow}</p>
              )}
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                {config.closingCta.headline}
                {config.closingCta.highlight && (
                  <>
                    {" "}
                    <span className="text-gradient-teal">
                      {config.closingCta.highlight}
                    </span>
                  </>
                )}
              </h2>
              <p className="text-lg text-gray-300 max-w-xl mx-auto mb-8">
                {config.closingCta.subheadline}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <CtaLink cta={closingPrimary} variant="primary" />
                <CtaLink cta={closingSecondary} variant="secondary" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
