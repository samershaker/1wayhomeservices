/**
 * Structured Data (Schema.org) Components for SEO
 * Generates JSON-LD markup for rich snippets in search results
 */

import { CONTACT_INFO, SERVICES, TEAM_MEMBERS } from '@/lib/constants';

interface StructuredDataProps {
  type?: 'local-business' | 'organization' | 'service' | 'all';
}

export function StructuredData({ type = 'all' }: StructuredDataProps = {}) {
  const schemas = [];

  const siteUrl = CONTACT_INFO.website;

  // LocalBusiness Schema
  if (type === 'local-business' || type === 'all') {
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      '@id': `${siteUrl}/#organization`,
      name: CONTACT_INFO.businessName,
      alternateName: '1Way Home Services',
      description: 'Professional tax preparation, bookkeeping, and real estate tax services in El Cajon and San Diego County',
      url: siteUrl,
      telephone: CONTACT_INFO.phoneTel,
      email: CONTACT_INFO.email,
      priceRange: '$$',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'El Cajon',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '32.7948',
        longitude: '-116.9625',
      },
      areaServed: [
        {
          '@type': 'City',
          name: 'El Cajon',
        },
        {
          '@type': 'City',
          name: 'San Diego',
        },
        {
          '@type': 'City',
          name: 'La Mesa',
        },
        {
          '@type': 'City',
          name: 'Santee',
        },
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Tax and Real Estate Services',
        itemListElement: SERVICES.map((service) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: service.name,
            description: service.description,
            provider: {
              '@type': 'Organization',
              name: CONTACT_INFO.businessName,
            },
          },
        })),
      },
      employee: TEAM_MEMBERS.map((member) => ({
        '@type': 'Person',
        name: member.name,
        jobTitle: member.title,
        description: member.bio,
      })),
    };
    schemas.push(localBusinessSchema);
  }

  // Organization Schema
  if (type === 'organization' || type === 'all') {
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: CONTACT_INFO.businessName,
      url: siteUrl,
      logo: `${siteUrl}/images/logo-color.png`,
      description: 'Tax preparation and real estate services in San Diego County',
      telephone: CONTACT_INFO.phoneTel,
      email: CONTACT_INFO.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'El Cajon',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: CONTACT_INFO.phoneTel,
        contactType: 'Customer Service',
        areaServed: 'US',
        availableLanguage: ['English', 'Arabic'],
      },
    };
    schemas.push(organizationSchema);
  }

  // BreadcrumbList Schema (for navigation)
  if (type === 'all') {
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: siteUrl,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Services',
          item: `${siteUrl}/#services`,
        },
      ],
    };
    schemas.push(breadcrumbSchema);
  }

  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

/**
 * Service-specific structured data
 * Use on individual service pages
 */
export function ServiceStructuredData({ serviceId }: { serviceId: string }) {
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) return null;

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@type': 'ProfessionalService',
      name: CONTACT_INFO.businessName,
      telephone: CONTACT_INFO.phoneTel,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'El Cajon',
        addressRegion: 'CA',
        addressCountry: 'US',
      },
    },
    areaServed: {
      '@type': 'City',
      name: 'San Diego',
    },
    description: service.description,
    offers: {
      '@type': 'Offer',
      price: service.price,
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
    />
  );
}

/**
 * Breadcrumb structured data (reusable)
 * Pass an ordered list of { name, url }. Relative URLs are resolved against
 * NEXT_PUBLIC_SITE_URL (falling back to the canonical Vercel preview URL)
 * so search engines always receive absolute URLs as required by schema.org.
 */
export function BreadcrumbStructuredData({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') ||
    'https://1wayhomeservices.vercel.app';

  const toAbsolute = (url: string) => {
    if (/^https?:\/\//i.test(url)) return url;
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${siteUrl}${path}`;
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: toAbsolute(item.url),
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

/**
 * FAQ structured data
 * Use on FAQ section or page
 */
export function FAQStructuredData({ faqs }: { faqs: ReadonlyArray<{ readonly question: string; readonly answer: string }> }) {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
    />
  );
}
