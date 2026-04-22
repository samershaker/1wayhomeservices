import type { Metadata } from 'next';
import { CONTACT_INFO } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms that apply to use of the 1Way Home Services website.',
  alternates: { canonical: '/en/terms/' },
  robots: { index: true, follow: true },
};

// Content is reproduced from the client's published Terms and Conditions at
// https://1wayhomeservices.com/terms-and-conditions/ (Effective Date 11/21/2025, v1.0).
// Headings and substantive text are kept verbatim; only presentation chrome is adapted.

export default function TermsPage() {
  return (
    <div className="bg-noise">
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16 md:pb-20">
        <p className="text-label mb-3">Legal</p>
        <h1 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Terms and Conditions
        </h1>
        <p className="text-sm text-gray-300 mb-2">Effective Date: 11/21/2025</p>
        <p className="text-sm text-gray-300 mb-10">Version: 1.0</p>

        <div className="space-y-10 text-gray-300 leading-relaxed">
          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Overview</h2>
            <p className="mb-3">
              These Terms &amp; Conditions (&quot;Terms&quot;) apply to your use of the
              1 Way Home Services website (&quot;Website&quot;). By using this Website,
              you agree to be bound by these Terms and by our Privacy Policy. If you do
              not agree, please discontinue use of the Website.
            </p>
            <p>
              We may update these Terms from time to time. Any changes will be posted on
              this page with an updated effective date. Your continued use of the Website
              means you accept the updated Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Website Use</h2>
            <p className="mb-3">
              This Website is available for individuals of all ages. By using this
              Website, you agree to use it only for lawful purposes and in compliance
              with these Terms.
            </p>
            <p className="mb-3">
              This Website provides general information about our services, including tax
              preparation, financial services, mortgages, real estate services, and
              customer communication. You may contact us, request information, or opt in
              to receive SMS updates, but you may not create an account or log in.
            </p>
            <p className="mb-3">You agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Use the Website in any way that violates U.S. or California law</li>
              <li>Interfere with the Website&apos;s operation or attempt to access restricted areas</li>
              <li>Upload harmful code, attempt to hack, or use automated tools to scrape or disrupt the Website</li>
              <li>Use the Website to send unsolicited or unauthorized messages</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Not Professional Advise</h2>
            <p className="mb-3">
              Although 1 Way Home Services provides tax services, mortgage services, real
              estate services, and financial-related assistance, the content on this
              Website is for general informational purposes only.
            </p>
            <p>
              Website content should not be considered legal, tax, financial, or
              investment advice. You should not make decisions based solely on
              information from the Website without consulting a qualified professional.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Intellectual Property</h2>
            <p className="mb-3">
              All content on this Website — including text, graphics, logos, images,
              videos, and layout — is owned by 1 Way Home Services or used with
              permission. You may view the Website and use its content for personal,
              non-commercial use only.
            </p>
            <p className="mb-3">You may not:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>Copy, reproduce, or distribute Website content</li>
              <li>Modify or create derivative works</li>
              <li>Use Website content for commercial purposes</li>
              <li>Repost, publish, or resell Website materials</li>
            </ul>
            <p>No rights to our trademarks, logos, or branding are granted through your use of the Website.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">SMS and Communication Consent</h2>
            <p className="mb-3">
              If you choose to opt in to receive text messages from us, you agree to the
              following:
            </p>
            <blockquote className="border-l-4 border-[var(--color-secondary-light)] pl-4 italic mb-3">
              &quot;By checking this box, I consent to receive marketing and promotional
              messages, including special offers, discounts, new product updates among
              others. Message frequency may vary. Message &amp; Data rates may apply.
              Reply HELP for help or STOP to opt-out.&quot;
            </blockquote>
            <p className="mb-3">By opting in:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>You may receive service reminders, updates, or promotions</li>
              <li>You may unsubscribe at any time by replying STOP</li>
              <li>You may reply HELP for support</li>
              <li>Standard message and data rates may apply</li>
              <li>Consent is not required to use our services</li>
            </ul>
            <p>
              You agree to provide accurate contact information and understand that we
              may contact you through phone, email, or SMS regarding your inquiry.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Third-Party Links</h2>
            <p>
              The Website may contain links to third-party websites. We are not
              responsible for the content, accuracy, or practices of these external
              sites. Accessing external links is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Website Availability</h2>
            <p className="mb-3">We work to keep the Website online and functioning, but we cannot guarantee:</p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>that the Website will always be available</li>
              <li>that it will be error-free</li>
              <li>that it will be free from viruses or harmful components</li>
            </ul>
            <p>You are responsible for maintaining your own antivirus protection and internet security.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Limitation of Liability</h2>
            <p className="mb-3">
              To the fullest extent permitted by California law, 1 Way Home Services is
              not liable for:
            </p>
            <ul className="list-disc pl-6 space-y-1 mb-3">
              <li>any errors or inaccuracies in Website content</li>
              <li>damages resulting from your reliance on Website information</li>
              <li>interruptions, technical issues, or loss of data</li>
              <li>damages related to third-party links</li>
              <li>any indirect, incidental, or consequential damages</li>
            </ul>
            <p>You use this Website at your own risk.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Indemnification</h2>
            <p>
              You agree to indemnify and hold harmless 1 Way Home Services and its
              owners, employees, and representatives from any claims, damages, losses, or
              expenses arising from your use of the Website or your violation of these
              Terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Governing Law</h2>
            <p>
              These Terms are governed by the laws of the State of California. Any
              disputes will be handled in California courts unless otherwise required by
              law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-bold text-white mb-3">Contact Information</h2>
            <p className="mb-2">For questions or privacy-related requests, contact:</p>
            <p className="text-white font-semibold">Sam Eram</p>
            <p>1 Way Home Services</p>
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
