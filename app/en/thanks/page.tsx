import Link from 'next/link';
import type { Metadata } from 'next';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Message received',
  description: 'Thanks for reaching out. We will respond within one business day.',
  robots: { index: false, follow: false },
};

export default function ThanksPage() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] bg-noise flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[var(--color-secondary)]/20 mb-6">
          <svg className="w-8 h-8 text-[var(--color-secondary-light)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-label mb-3">Message Received</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Thanks for reaching out
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          We&apos;ve received your message and will respond within one business day. In the
          meantime, if your question is urgent, the fastest way to reach us is by phone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={CONTACT_INFO.phoneHref} className="btn-primary">
            Call {CONTACT_INFO.phone}
          </a>
          <Link href="/en/" className="btn-secondary">
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
