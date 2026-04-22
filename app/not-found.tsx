import Link from 'next/link';
import { CONTACT_INFO } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[var(--color-black)] bg-noise flex items-center justify-center px-6 py-20">
      <div className="max-w-xl text-center">
        <p className="text-label mb-3">404</p>
        <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
          Page not found
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          The page you were looking for doesn&apos;t exist or has moved. Head back to the
          home page — or give us a call if you can&apos;t find what you need.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/en/" className="btn-primary">
            Back to home
          </Link>
          <a href={CONTACT_INFO.phoneHref} className="btn-secondary">
            Call {CONTACT_INFO.phone}
          </a>
        </div>
      </div>
    </main>
  );
}
