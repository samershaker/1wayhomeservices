import type { Metadata } from 'next';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'How 1Way Home Services collects, uses, and protects your information.',
  alternates: { canonical: '/en/privacy/' },
  robots: { index: true, follow: true },
};

// Content is reproduced from the client's published Privacy Policy at
// https://1wayhomeservices.com/privacy-policy/ (Effective Date 11/21/2025, v1.0).
// Substantive text is kept verbatim. The contact block adds phone and street
// address so the NAP is consistent with the rest of the site (the source page
// lists email only). Flagged in CHANGELOG for client awareness.

export default function PrivacyPage() {
  return (
    <div className="bg-noise">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 md:pb-20">
        <p className="text-label mb-3">Legal</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-300 mb-2">Effective Date: 11/21/2025</p>
        <p className="text-sm text-gray-300 mb-10">Version: 1.0</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Overview</h2>
            <p>
              This Privacy Policy explains how 1 Way Home Services (&quot;we,&quot; &quot;us,&quot;
              &quot;our&quot;) collects, uses, and protects the personal information you
              provide when visiting our website or contacting us. By using our website,
              you agree to the practices described in this policy. If you do not agree
              with this Privacy Policy, please discontinue use of our website.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-4">Information We Collect</h2>

            <h3 className="font-display text-lg font-semibold text-white mb-2">Personal Information You Provide</h3>
            <p className="mb-2">We only collect the information needed to communicate with you, which includes:</p>
            <ul className="list-disc pl-6 space-y-1 mb-6">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
            </ul>
            <p className="mb-6">This information is collected when you fill out a form or contact us directly.</p>

            <h3 className="font-display text-lg font-semibold text-white mb-2">Information Collected Automatically</h3>
            <p className="mb-2">
              Through Google Analytics and Google Search Console, we collect general,
              non-identifying data such as:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Device and browser type</li>
              <li>Pages visited</li>
              <li>Time spent on the site</li>
              <li>Approximate location (city-level)</li>
              <li>Traffic source</li>
            </ul>
            <p>This data does not personally identify you. It helps us understand how visitors use our website.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">How We Use Your Information</h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Respond to your inquiries</li>
              <li>Communicate about services you requested</li>
              <li>Send updates or service-related messages</li>
              <li>Improve our website and marketing</li>
              <li>Send SMS messages if you opt in</li>
              <li>Maintain internal business records</li>
            </ul>
            <p>We do not sell, rent, or share your information with third parties.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Text Messaging (A2P 10DLC)</h2>
            <p className="mb-3">
              We use a registered A2P 10DLC business phone number through GoHighLevel to
              send service-related and, if you consent, promotional text messages.
            </p>
            <p className="mb-3">
              If you choose to receive SMS messages, our forms will display the following
              exact consent language: &quot;By checking this box, I consent to receive
              marketing and promotional messages, including special offers, discounts,
              new product updates among others. Message frequency may vary. Message &amp;
              Data rates may apply. Reply HELP for help or STOP to opt-out.&quot;
            </p>
            <p className="mb-3">By opting in:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Message frequency may vary</li>
              <li>You may receive reminders, updates, or promotions</li>
              <li>You can reply STOP at any time to unsubscribe</li>
              <li>You can reply HELP for assistance</li>
              <li>Standard message and data rates may apply</li>
            </ul>
            <p>Consent is not required to use our services. Your phone number will not be shared with outside parties.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Cookies</h2>
            <p>
              We use cookies through Google Analytics to collect anonymous usage data.
              You may disable cookies in your browser settings at any time. Because our
              website only uses basic analytics cookies and we do not target EU users or
              sell data, a cookie consent banner is not required under U.S. law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Data Security</h2>
            <p>
              We take reasonable steps to protect your information, including secure
              website connections (SSL/HTTPS), reputable third-party platforms, and
              restricted access to submitted information. While we follow standard
              security practices, no online data transmission is completely secure.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Third-Party Service Providers</h2>
            <p className="mb-3">We use trusted partners who process data on our behalf:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Google Analytics &amp; Google Search Console (website analytics)</li>
              <li>GoHighLevel (forms, CRM, and text messaging)</li>
            </ul>
            <p>These partners do not use your information for their own purposes.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Your Rights</h2>
            <p className="mb-3">You may request at any time to:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Access the information we have about you</li>
              <li>Update or correct your information</li>
              <li>Request deletion</li>
              <li>Opt out of emails, calls, or text messages</li>
            </ul>
            <p>Submit all requests through the contact information below.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Your California Privacy Rights (CCPA / CPRA)</h2>
            <p className="mb-3">
              If you are a California resident, the California Consumer Privacy Act
              (CCPA) and California Privacy Rights Act (CPRA) give you specific rights
              regarding your personal information:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-3">
              <li>
                <span className="text-white font-semibold">Right to know</span> — request
                the categories and specific pieces of personal information we have
                collected about you, the sources we collected it from, and the purposes
                for collecting it.
              </li>
              <li>
                <span className="text-white font-semibold">Right to delete</span> —
                request that we delete personal information we have collected from you,
                subject to exceptions such as records we are required to retain by tax
                law or other applicable regulation.
              </li>
              <li>
                <span className="text-white font-semibold">Right to correct</span> —
                request that we correct inaccurate personal information we hold about
                you.
              </li>
              <li>
                <span className="text-white font-semibold">Right to opt out of sale or sharing</span> —
                we do not sell or share personal information with third parties for
                cross-context behavioral advertising or any other commercial purpose.
              </li>
              <li>
                <span className="text-white font-semibold">Right to non-discrimination</span> —
                we will not discriminate against you for exercising any of these rights.
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us using the information at the
              bottom of this policy. We will verify your identity before responding and
              will reply within the timeframes required by California law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy periodically. Any updates will be posted
              on this page with a new effective date. Continued use of the website after
              an update means you accept the revised policy.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Contact</h2>
            <p className="mb-2">For questions or privacy-related requests, contact:</p>
            <p className="text-white font-semibold">Sam Eram</p>
            <p>1 Way Home Services</p>
            <p>{CONTACT_INFO.address}</p>
            <p>
              Phone:{' '}
              <a
                href={CONTACT_INFO.phoneHref}
                className="text-[var(--color-secondary-light)] hover:text-white transition-colors"
              >
                {CONTACT_INFO.phone}
              </a>
            </p>
            <p>
              Email:{' '}
              <a
                href={CONTACT_INFO.emailHref}
                className="text-[var(--color-secondary-light)] hover:text-white transition-colors"
              >
                {CONTACT_INFO.email}
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
