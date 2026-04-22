import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { SERVICES, CONTACT_INFO } from '@/lib/constants';
import { ServiceStructuredData } from '@/components/StructuredData';

export const dynamic = 'force-static';
export const dynamicParams = false;

export async function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `/en/services/${service.slug}/` },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = SERVICES.find((s) => s.slug === slug);
  if (!service) notFound();

  const related = SERVICES.filter(
    (s) => s.id !== service.id && s.category === service.category
  ).slice(0, 3);

  return (
    <div className="bg-noise">
      <ServiceStructuredData serviceId={service.id} />

      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16 md:pb-20">
        <Link
          href="/en/"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-6"
        >
          <span aria-hidden="true">←</span> Back to home
        </Link>

        {/* Hero image */}
        <div className="relative h-56 md:h-80 rounded-2xl overflow-hidden mb-10">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
          {service.badge && (
            <span className="absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full bg-[var(--color-secondary)]/90 text-white backdrop-blur-sm">
              {service.badge}
            </span>
          )}
        </div>

        <p className="text-label mb-3">
          {service.category === 'tax' ? 'Tax Service' : 'Real Estate Service'}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
          {service.name}
        </h1>
        <p className="text-xl text-gray-300 leading-relaxed mb-10">
          {service.description}
        </p>

        {/* What's included */}
        <div className="glass-card p-8 mb-8">
          <h2 className="font-display text-2xl font-bold mb-6">What&apos;s included</h2>
          <ul className="space-y-3">
            {service.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3 text-gray-300">
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
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="glass-card p-8 mb-8">
          <h2 className="font-display text-2xl font-bold mb-4">Pricing</h2>
          <p className="text-3xl font-display font-extrabold text-white mb-2">{service.price}</p>
          <p className="text-sm text-gray-300">{service.priceNote}</p>
        </div>

        {/* CTA */}
        <div className="glass-card-premium p-8 md:p-10 text-center mb-16">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-3">
            Ready to get started?
          </h2>
          <p className="text-gray-300 mb-6 max-w-md mx-auto">
            Free initial consultation — in person, over the phone, or via Zoom.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a href={CONTACT_INFO.phoneHref} className="btn-primary">
              Call {CONTACT_INFO.phone}
            </a>
            <Link href="/en/#contact" className="btn-secondary">
              Send a message
            </Link>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section>
            <h2 className="font-display text-xl font-bold mb-6">Related services</h2>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/en/services/${r.slug}/`}
                  className="glass-card p-5 hover:border-white/20 transition-colors block group"
                >
                  <h3 className="font-display font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                    {r.name}
                  </h3>
                  <p className="text-sm text-gray-300">{r.description}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
