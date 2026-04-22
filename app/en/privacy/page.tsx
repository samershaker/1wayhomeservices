import type { Metadata } from 'next';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How 1Way Home Services collects, uses, and protects your information.',
  alternates: { canonical: '/en/privacy/' },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <div className="bg-noise">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 md:pb-20">
        <p className="text-label mb-3">Legal</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-300 mb-10">Last updated: April 22, 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Who we are</h2>
            <p>
              {CONTACT_INFO.businessName} ({CONTACT_INFO.website}) provides tax preparation,
              bookkeeping, real estate tax, and mortgage consulting services in El Cajon,
              San Diego, and surrounding areas. This policy describes what information we
              collect through this website and how we use it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">What we collect</h2>
            <p className="mb-3">When you contact us through this site, we collect:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Your name, email address, and (optionally) phone number</li>
              <li>The service you are interested in and the message you send us</li>
              <li>Standard web analytics data (page views, device type, referrer) via Vercel Analytics and Speed Insights</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">How we use it</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>To reply to your inquiry and schedule consultations</li>
              <li>To prepare and deliver the services you engage us for</li>
              <li>To improve our website and understand how visitors use it</li>
            </ul>
            <p className="mt-3">
              We do not sell your information. We do not use it to send marketing emails unless
              you ask us to.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Tax information</h2>
            <p>
              Tax documents and financial information you share with us during an engagement
              are handled under professional confidentiality standards and applicable state and
              federal law. We retain client records for the periods required by the IRS and
              the California Franchise Tax Board.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Your rights</h2>
            <p>
              California residents have rights under the CCPA/CPRA to know what personal
              information we hold, to request deletion, and to opt out of any sale of personal
              information (we do not sell personal information). To exercise these rights,
              email{' '}
              <a href={CONTACT_INFO.emailHref} className="text-[var(--color-secondary-light)] hover:text-white transition-colors">
                {CONTACT_INFO.email}
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Contact</h2>
            <p>
              Questions about this policy? Call{' '}
              <a href={CONTACT_INFO.phoneHref} className="text-[var(--color-secondary-light)] hover:text-white transition-colors">
                {CONTACT_INFO.phone}
              </a>{' '}
              or email{' '}
              <a href={CONTACT_INFO.emailHref} className="text-[var(--color-secondary-light)] hover:text-white transition-colors">
                {CONTACT_INFO.email}
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
