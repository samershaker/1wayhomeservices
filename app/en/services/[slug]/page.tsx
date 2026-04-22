import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  SERVICES,
  CONTACT_INFO,
  PROCESS_STEPS,
  TESTIMONIALS,
  FAQ_ITEMS,
} from '@/lib/constants';
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

// Loose match between a testimonial's `service` field and the current service.
// Returns the first testimonial whose service mentions any meaningful word from
// the current service's shortName/name; falls back to TESTIMONIALS[0].
function pickTestimonial(currentServiceName: string, currentShortName: string) {
  const needles = [currentShortName, currentServiceName]
    .join(' ')
    .toLowerCase()
    .split(/[\s&]+/)
    .filter((w) => w.length > 3);
  const match = TESTIMONIALS.find((t) =>
    needles.some((n) => t.service.toLowerCase().includes(n))
  );
  return match ?? TESTIMONIALS[0];
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

  const testimonial = pickTestimonial(service.name, service.shortName);

  return (
    <div className="bg-noise">
      <ServiceStructuredData serviceId={service.id} />

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-28 pb-12">
        <Link
          href="/en/"
          className="inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors mb-6"
        >
          <span aria-hidden="true">←</span> Back to home
        </Link>

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
        <p className="text-xl text-gray-300 leading-relaxed mb-8">
          {service.description}
        </p>

        {/* Inline hero CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <a href={CONTACT_INFO.phoneHref} className="btn-primary">
            Call {CONTACT_INFO.phone}
          </a>
          <Link href="/en/#contact" className="btn-secondary">
            Send a message
          </Link>
        </div>
      </section>

      {/* What's included */}
      <section className="max-w-4xl mx-auto px-6 py-12">
        <div className="glass-card p-8">
          <h2 className="font-display text-2xl font-bold mb-6">What&apos;s included</h2>
          <ul className="grid sm:grid-cols-2 gap-3">
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
      </section>

      {/* How it works */}
      <section className="px-6 py-16 section-gradient-subtle">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-label mb-3">How It Works</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold">
              Simple, transparent, done right
            </h2>
          </div>
          <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step) => (
              <li key={step.step} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[var(--color-secondary)]/15 border border-[var(--color-secondary)]/30 mb-4">
                  <span className="stat-number font-display text-xl font-extrabold">
                    {step.step}
                  </span>
                </div>
                <h3 className="font-display font-bold text-white mb-2">{step.title}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pricing */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="glass-card p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <p className="text-label mb-2">Pricing</p>
              <p className="font-display text-4xl md:text-5xl font-extrabold text-white mb-2">
                {service.price}
              </p>
              <p className="text-sm text-gray-300 max-w-md">{service.priceNote}</p>
            </div>
            <a href={CONTACT_INFO.phoneHref} className="btn-primary self-start md:self-auto">
              Call {CONTACT_INFO.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="px-6 py-16 section-gradient-navy">
          <div className="max-w-3xl mx-auto">
            <div className="glass-card-premium p-8 md:p-10 text-center">
              <div className="flex items-center justify-center gap-1 mb-5 text-[var(--color-secondary-light)]" aria-hidden="true">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-lg md:text-xl text-gray-200 font-display leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <div className="text-sm">
                <div className="font-semibold text-white">{testimonial.author}</div>
                <div className="text-gray-300">
                  {testimonial.role} · {testimonial.location}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <p className="text-label mb-3">FAQ</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Common questions</h2>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <details key={i} className="glass-card p-5 group">
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
            </details>
          ))}
        </div>
      </section>

      {/* Closing CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <div className="glass-card-premium p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)]/10 via-[var(--color-primary)]/10 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Ready to get started?
            </h2>
            <p className="text-gray-300 mb-8 max-w-md mx-auto">
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
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-20">
          <h2 className="font-display text-xl font-bold mb-6">Related services</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/en/services/${r.slug}/`}
                className="glass-card p-5 hover:border-white/20 transition-colors block group"
              >
                <h3 className="font-display font-bold text-white mb-2 group-hover:text-[var(--color-secondary-light)] transition-colors">
                  {r.name}
                </h3>
                <p className="text-sm text-gray-300">{r.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
