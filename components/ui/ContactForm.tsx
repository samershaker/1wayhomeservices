'use client';

/**
 * Professional Contact Form Component
 * Features: Real-time validation, service selection, mobile-optimized
 *
 * Submission strategy:
 *   1. If NEXT_PUBLIC_FORMSPREE_ID is set, POST to Formspree.
 *   2. Otherwise fall back to a mailto: compose so leads still reach inbox.
 */

import { useState, FormEvent } from 'react';
import { SERVICES, CONTACT_INFO } from '@/lib/constants';

const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  smsConsent: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
}

// Exact A2P 10DLC consent language as published in the Privacy Policy and
// Terms & Conditions. Do not edit without updating both legal pages in lockstep.
const SMS_CONSENT_TEXT =
  'By checking this box, I consent to receive marketing and promotional messages, including special offers, discounts, new product updates among others. Message frequency may vary. Message & Data rates may apply. Reply HELP for help or STOP to opt-out.';

export function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    smsConsent: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but validate if provided)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
      }
    }

    // Service validation
    if (!formData.service) {
      newErrors.service = 'Please select a service';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    // SMS consent only meaningful if a phone number was provided.
    const smsConsentEffective = Boolean(formData.smsConsent && formData.phone.trim());

    // Fallback: no Formspree configured — open the user's email client with a pre-filled message
    if (!FORMSPREE_ID) {
      const body = [
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone || '—'}`,
        `Service: ${formData.service}`,
        `SMS opt-in: ${smsConsentEffective ? 'Yes' : 'No'}`,
        '',
        formData.message,
      ].join('\n');
      const mailto = `mailto:${CONTACT_INFO.email}?subject=${encodeURIComponent(`Website inquiry — ${formData.service}`)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailto;
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', service: '', message: '', smsConsent: false });
      setErrors({});
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          smsConsent: smsConsentEffective,
          smsConsentLanguage: smsConsentEffective ? SMS_CONSENT_TEXT : null,
          smsConsentTimestamp: smsConsentEffective ? new Date().toISOString() : null,
        }),
      });

      if (response.ok) {
        if (typeof window !== 'undefined' && window.gtag) {
          window.gtag('event', 'form_submission', {
            event_category: 'Contact',
            event_label: formData.service,
          });
        }
        window.location.href = '/en/thanks/';
        return;
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (typeof value === 'string' && errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field as keyof FormErrors]: undefined }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Full Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            transition-all duration-200 ${errors.name ? 'border-red-500' : 'border-white/10'}`}
          placeholder="John Doe"
          autoComplete="name"
          required
        />
        {errors.name && (
          <p role="alert" className="mt-1 text-sm text-red-400">{errors.name}</p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email Address <span className="text-red-400">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            transition-all duration-200 ${errors.email ? 'border-red-500' : 'border-white/10'}`}
          placeholder="john@example.com"
          autoComplete="email"
          spellCheck={false}
          required
        />
        {errors.email && (
          <p role="alert" className="mt-1 text-sm text-red-400">{errors.email}</p>
        )}
      </div>

      {/* Phone Field */}
      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number <span className="text-gray-300 text-xs">(Optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            transition-all duration-200 ${errors.phone ? 'border-red-500' : 'border-white/10'}`}
          placeholder="(619) 555-1234"
          autoComplete="tel"
        />
        {errors.phone && (
          <p role="alert" className="mt-1 text-sm text-red-400">{errors.phone}</p>
        )}
      </div>

      {/* Service Selection */}
      <div>
        <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
          Service Interested In <span className="text-red-400">*</span>
        </label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={(e) => handleChange('service', e.target.value)}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            transition-all duration-200 cursor-pointer ${errors.service ? 'border-red-500' : 'border-white/10'}`}
          required
        >
          <option value="" disabled className="bg-gray-900">
            Select a service...
          </option>
          {SERVICES.map((service) => (
            <option key={service.id} value={service.id} className="bg-gray-900">
              {service.name}
            </option>
          ))}
          <option value="general" className="bg-gray-900">
            General Inquiry
          </option>
        </select>
        {errors.service && (
          <p role="alert" className="mt-1 text-sm text-red-400">{errors.service}</p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message <span className="text-red-400">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={(e) => handleChange('message', e.target.value)}
          rows={4}
          className={`w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent
            transition-all duration-200 resize-y ${errors.message ? 'border-red-500' : 'border-white/10'}`}
          placeholder="Tell us about your tax or real estate needs..."
          required
        />
        {errors.message && (
          <p role="alert" className="mt-1 text-sm text-red-400">{errors.message}</p>
        )}
        <p className="mt-1 text-xs text-gray-300">
          {formData.message.length}/500 characters
        </p>
      </div>

      {/* SMS Opt-in (A2P 10DLC) — only acted on if a phone number is provided */}
      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <label htmlFor="smsConsent" className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            id="smsConsent"
            name="smsConsent"
            checked={formData.smsConsent}
            onChange={(e) => handleChange('smsConsent', e.target.checked)}
            className="mt-1 h-4 w-4 rounded border-white/20 bg-white/10 text-[var(--color-primary)] focus:ring-2 focus:ring-[var(--color-secondary-light)] focus:ring-offset-0 cursor-pointer"
          />
          <span className="text-xs text-gray-300 leading-relaxed">
            {SMS_CONSENT_TEXT}
          </span>
        </label>
        <p className="mt-2 text-[11px] text-gray-400 pl-7">
          Optional. Consent is not required to use our services. SMS messages are
          only sent to the phone number you provide above.
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </button>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div role="status" className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-center">
          <p className="font-semibold">Thank you for contacting us!</p>
          <p className="text-sm mt-1">We'll get back to you within 24 hours.</p>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-center">
          <p className="font-semibold">Oops! Something went wrong.</p>
          <p className="text-sm mt-1">Please try again or call us at {CONTACT_INFO.phone}.</p>
        </div>
      )}

      {/* Privacy Note */}
      <p className="text-xs text-gray-300 text-center">
        We respect your privacy. Your information will only be used to contact you about our services.
      </p>
    </form>
  );
}

/**
 * Contact Form Section Component
 * Full-width section with form and contact info
 */
export function ContactFormSection() {
  return (
    <section id="contact" className="py-24 px-6 section-gradient-navy">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Schedule your free consultation today. Let's discuss how we can help you save on taxes and achieve your real estate goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="glass-card p-8">
            <h3 className="font-display text-2xl font-bold mb-6">Send Us a Message</h3>
            <ContactForm />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="glass-card p-8">
              <h3 className="font-display text-2xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Phone</p>
                    <a href={CONTACT_INFO.phoneHref} className="text-lg font-semibold text-white hover:text-[var(--color-accent)] transition-colors">
                      {CONTACT_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Email</p>
                    <a href={CONTACT_INFO.emailHref} className="text-lg font-semibold text-white hover:text-[var(--color-accent)] transition-colors">
                      {CONTACT_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Location</p>
                    <p className="text-lg font-semibold text-white">
                      {CONTACT_INFO.addressParts.streetAddress}
                    </p>
                    <p className="text-sm text-gray-300">
                      {CONTACT_INFO.addressParts.locality},{' '}
                      {CONTACT_INFO.addressParts.region}{' '}
                      {CONTACT_INFO.addressParts.postalCode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)]/20 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-300 mb-1">Hours</p>
                    <p className="text-lg font-semibold text-white">
                      Mon–Fri 9:00 AM – 6:00 PM
                    </p>
                    <p className="text-sm text-gray-300 mt-1">
                      By appointment · Free consultation available
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 bg-gradient-to-br from-[var(--color-primary)]/10 to-[var(--color-accent)]/10">
              <h3 className="font-display text-lg font-bold mb-3">Prefer to Call?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Speak directly with a tax professional. We're here to answer your questions.
              </p>
              <a href={CONTACT_INFO.phoneHref} className="btn-primary inline-block">
                Call {CONTACT_INFO.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
