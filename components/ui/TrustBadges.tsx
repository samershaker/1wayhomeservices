/**
 * Trust Badges Component
 * Displays professional credentials, certifications, and security badges
 * Increases trust and credibility for professional services
 */

const ACCENT = 'text-[var(--color-secondary-light)]';

export function TrustBadges({ variant = 'horizontal', size = 'md' }: { variant?: 'horizontal' | 'vertical' | 'grid'; size?: 'sm' | 'md' | 'lg' }) {
  const badges = [
    {
      id: 'tax-pro',
      name: 'Tax Professional',
      description: 'Licensed Tax Preparation',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: ACCENT,
    },
    {
      id: 'irs',
      name: 'IRS Authorized',
      description: 'IRS E-File Provider',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: ACCENT,
    },
    {
      id: 'security',
      name: 'Bank-Level Security',
      description: '256-bit Encryption',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: ACCENT,
    },
    {
      id: 'experience',
      name: '6+ Years',
      description: 'Industry Experience',
      icon: (
        <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      ),
      color: ACCENT,
    },
  ];

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  if (variant === 'horizontal') {
    return (
      <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className={`${iconSizes[size]} ${badge.color}`}>
              {badge.icon}
            </div>
            <div>
              <p className={`font-semibold ${sizeClasses[size]}`}>{badge.name}</p>
              <p className="text-xs text-gray-300">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className="space-y-3">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className={`${iconSizes[size]} ${badge.color} flex-shrink-0`}>
              {badge.icon}
            </div>
            <div>
              <p className={`font-semibold ${sizeClasses[size]}`}>{badge.name}</p>
              <p className="text-xs text-gray-300">{badge.description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'grid') {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <div
            key={badge.id}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 transition-colors"
          >
            <div className={`${iconSizes[size]} ${badge.color} mb-2`}>
              {badge.icon}
            </div>
            <p className={`font-semibold ${sizeClasses[size]}`}>{badge.name}</p>
            <p className="text-xs text-gray-300 mt-1">{badge.description}</p>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

/**
 * Compact Trust Indicator (for hero / under CTA)
 */
export function CompactTrustIndicator() {
  return (
    <div className="flex items-center gap-2 text-xs text-gray-300">
      <span>6+ Years Experience</span>
      <span className="text-gray-500">•</span>
      <span>Free Initial Consultation</span>
      <span className="text-gray-500">•</span>
      <span>IRS E-File Authorized</span>
    </div>
  );
}

/**
 * Google Reviews Badge — outbound link to Google Business listing.
 * No hard-coded rating; swap to a real widget once the business profile is verified.
 */
export function GoogleReviewsBadge() {
  return (
    <a
      href="https://www.google.com/search?q=1wayhomeservices+el+cajon"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all group"
    >
      <div className="w-8 h-8">
        <svg viewBox="0 0 48 48" className="w-full h-full" aria-hidden="true">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
        </svg>
      </div>

      <div>
        <p className="text-sm font-semibold">Find us on Google</p>
        <p className="text-xs text-gray-300">Read reviews · Get directions</p>
      </div>

      <svg className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
}

/**
 * Security Badge (for forms/payment areas)
 */
export function SecurityBadge() {
  return (
    <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
      <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
      <span>Secure 256-bit SSL encryption</span>
      <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
      <span>Your data is protected</span>
    </div>
  );
}

/**
 * Certification Showcase Section
 */
export function CertificationShowcase() {
  return (
    <section className="py-12 px-6 bg-white/5 border-y border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h3 className="font-display text-2xl font-bold mb-2">Trusted & Certified</h3>
          <p className="text-gray-400">Professional credentials you can rely on</p>
        </div>

        <TrustBadges variant="grid" size="lg" />

        <div className="mt-8 text-center">
          <GoogleReviewsBadge />
        </div>
      </div>
    </section>
  );
}
