import Link from "next/link";
import { CONTACT_INFO, SERVICES, TEAM_MEMBERS } from "@/lib/constants";
import { GoogleReviewsBadge } from "@/components/ui/TrustBadges";

const FOOTER_YEAR = new Date().getFullYear();

const linkClass =
  "inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)] rounded";

const headingClass =
  "font-display font-bold text-xs uppercase tracking-[0.14em] mb-4 text-[var(--color-secondary-light)]";

const realtor = TEAM_MEMBERS.find((m) => m.id === "bakhan-kareem");

const reviewVerifiedDateLabel = (() => {
  const d = new Date(`${CONTACT_INFO.reviewVerifiedDate}T00:00:00Z`);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
})();

export function SiteFooter() {
  return (
    <footer
      role="contentinfo"
      className="relative px-6 pt-20 pb-10 bg-[#0A2342] border-t border-[rgba(37,87,168,0.25)]"
    >
      {/* subtle navy fade so the footer reads as destination chrome, not a cut-off */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-16 h-16 pointer-events-none bg-gradient-to-b from-transparent to-[#0A2342]"
      />

      <div className="relative max-w-7xl mx-auto">
        {/* ── Main grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8">
          {/* Brand block */}
          <div className="md:col-span-5 space-y-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="1Way Home Services"
              className="h-10 w-auto"
              width={120}
              height={40}
            />
            <p className="text-sm text-gray-300 leading-relaxed max-w-sm">
              Tax preparation and real estate tax services for El Cajon and San
              Diego County. Coordinated tax, real estate, and mortgage advice
              under one roof.
            </p>

            <div className="space-y-2 max-w-sm">
              <GoogleReviewsBadge />
              <p className="text-[10px] uppercase tracking-wider text-gray-400">
                Verified {reviewVerifiedDateLabel}
              </p>
            </div>

            {CONTACT_INFO.socialLinks.length > 0 && (
              <nav aria-label="Social links" className="flex items-center gap-3 pt-2">
                {CONTACT_INFO.socialLinks.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`1Way Home Services on ${link.type} (opens in new tab)`}
                    className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-white/20 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)]"
                  >
                    {link.type === "LinkedIn" && (
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.268 2.37 4.268 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    )}
                  </a>
                ))}
              </nav>
            )}
          </div>

          {/* Services column */}
          <nav aria-label="Services" className="md:col-span-2">
            <h2 className={headingClass}>Services</h2>
            <ul className="space-y-2">
              {SERVICES.map((service) => {
                const href =
                  "landingUrl" in service && typeof service.landingUrl === "string"
                    ? service.landingUrl
                    : `/en/services/${service.slug}/`;
                return (
                  <li key={service.id}>
                    <Link href={href} className={linkClass}>
                      {service.shortName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Company column */}
          <nav aria-label="Company" className="md:col-span-2">
            <h2 className={headingClass}>Company</h2>
            <ul className="space-y-2">
              <li><Link href="/en/#about" className={linkClass}>About the Team</Link></li>
              <li><Link href="/en/#process" className={linkClass}>Our Process</Link></li>
              <li><Link href="/en/#testimonials" className={linkClass}>Client Reviews</Link></li>
              <li><Link href="/en/#faq" className={linkClass}>FAQ</Link></li>
              <li><Link href="/en/#contact" className={linkClass}>Free Consultation</Link></li>
            </ul>
          </nav>

          {/* Contact / NAP column */}
          <div className="md:col-span-3">
            <h2 className={headingClass}>Contact</h2>
            <address className="not-italic space-y-2 text-sm text-gray-300 leading-relaxed">
              <p className="text-white font-semibold">{CONTACT_INFO.businessName}</p>
              <p>
                {CONTACT_INFO.addressParts.streetAddress}<br />
                {CONTACT_INFO.addressParts.locality}, {CONTACT_INFO.addressParts.region}{" "}
                {CONTACT_INFO.addressParts.postalCode}
              </p>
              <p>
                <a href={CONTACT_INFO.phoneHref} className={linkClass}>
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>
                <a href={CONTACT_INFO.emailHref} className={`${linkClass} break-all`}>
                  {CONTACT_INFO.email}
                </a>
              </p>
              <p className="pt-2 text-gray-400">
                Mon–Fri 9:00 AM – 6:00 PM<br />
                <span className="text-gray-500">By appointment</span>
              </p>
              <p className="text-gray-400">
                Serving El Cajon · San Diego · La Mesa · Santee
              </p>
            </address>
          </div>
        </div>

        {/* ── Compliance strip ────────────────────────────────────── */}
        <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 text-xs text-gray-400 leading-relaxed">
          <div className="md:col-span-3 flex items-start gap-3">
            <div className="text-gray-300 flex-shrink-0" aria-hidden="true">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/equal-housing-opportunity.svg"
                alt=""
                className="w-10 h-10"
                width={40}
                height={40}
              />
            </div>
            <p>
              <span className="block text-gray-300 font-semibold mb-1">Equal Housing Opportunity</span>
              {CONTACT_INFO.legalEntityName} supports the principles of the Fair Housing Act.
            </p>
          </div>

          {realtor?.licenseNumber && realtor.licenseAuthority && (
            <div className="md:col-span-4">
              <p className="text-gray-300 font-semibold mb-1">Licensing</p>
              <p>
                Real estate services provided by {realtor.name},{" "}
                {realtor.licenseAuthority} License #{realtor.licenseNumber}.{" "}
                <a
                  href="https://www.dre.ca.gov"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-white/20 underline-offset-2 hover:text-white hover:decoration-white transition-colors"
                >
                  dre.ca.gov
                </a>
              </p>
            </div>
          )}

          <div className="md:col-span-5">
            <p className="text-gray-300 font-semibold mb-1">Disclaimer</p>
            <p>
              Information on this website is provided for general informational
              purposes only and does not constitute tax, legal, accounting, or
              investment advice for any specific individual or situation. Consult a
              qualified professional before acting on any information presented
              here. {CONTACT_INFO.businessName} is not a law firm and does not
              provide legal representation. To the extent this communication
              contains tax advice, it is not intended or written to be used, and
              cannot be used, for the purpose of avoiding penalties under the
              Internal Revenue Code.
            </p>
          </div>
        </div>

        {/* ── Bottom bar ──────────────────────────────────────────── */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-400">
          <p>
            © {FOOTER_YEAR} {CONTACT_INFO.legalEntityName} All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4">
            <Link href="/en/privacy/" className={linkClass}>
              Privacy Policy
            </Link>
            <span aria-hidden="true" className="text-gray-600">·</span>
            <Link href="/en/terms/" className={linkClass}>
              Terms &amp; Conditions
            </Link>
            <span aria-hidden="true" className="text-gray-600">·</span>
            <a href="/sitemap.xml" className={linkClass}>
              Sitemap
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
