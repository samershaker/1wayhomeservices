import Link from 'next/link';
import type { Metadata } from 'next';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms that apply to use of the 1Way Home Services website.',
  alternates: { canonical: '/en/terms/' },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] bg-noise">
      <header className="border-b border-white/5 backdrop-blur-xl bg-black/60 sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center">
          <Link href="/en/" className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
            <span aria-hidden="true">←</span> Back to home
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-6 py-12 md:py-20">
        <p className="text-label mb-3">Legal</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-sm text-gray-300 mb-10">Last updated: April 22, 2026</p>

        <div className="space-y-8 text-gray-300 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Informational use</h2>
            <p>
              The content on this website is provided for general informational purposes only.
              It does not constitute tax, legal, financial, or real estate advice, and should
              not be relied on as a substitute for professional consultation tailored to your
              specific circumstances.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Client engagements</h2>
            <p>
              Tax preparation, bookkeeping, and other services are governed by a separate
              written engagement letter that will be provided when you retain us. Fees,
              deliverables, and responsibilities are defined there, not on this website.
              Submitting a contact form does not create a client relationship.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">No warranties</h2>
            <p>
              This site is provided &quot;as is&quot; without warranty of any kind. We make no
              representations about the accuracy, completeness, or timeliness of content on
              this site. Tax law and real estate regulations change frequently — always verify
              current rules with a professional before acting.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Third-party links</h2>
            <p>
              We may link to external websites for your convenience. We do not control those
              sites and are not responsible for their content or privacy practices.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Governing law</h2>
            <p>
              These terms are governed by the laws of the State of California. Any dispute
              arising out of use of this website will be resolved in San Diego County,
              California.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Contact</h2>
            <p>
              Questions? Call{' '}
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
    </main>
  );
}
