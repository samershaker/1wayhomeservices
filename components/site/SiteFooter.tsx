import Link from "next/link";
import { PhoneIcon, MapPinIcon } from "@/components/ui/icons/page-icons";
import { CONTACT_INFO } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-16 px-6 bg-noise" aria-label="Site footer">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-color.png"
              alt="1Way Home Services"
              className="h-10 w-auto mb-4"
              width={120}
              height={40}
            />
            <p className="text-sm text-gray-300">
              Tax Preparation & Real Estate Services serving El Cajon, San Diego, and surrounding areas.
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm mb-4 text-teal-400">Services</h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Tax Planning &amp; Advisory · Tax Filing · Payroll Taxes<br />
              Bookkeeping · IRS Audit Support · Real Estate Tax<br />
              Mortgage Consulting
            </p>
          </div>
          <div>
            <h3 className="font-display font-bold text-sm mb-4 text-teal-400">Contact</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <PhoneIcon size={20} />{" "}
                <a href={CONTACT_INFO.phoneHref} className="hover:text-white transition-colors">
                  {CONTACT_INFO.phone}
                </a>
              </p>
              <p>
                <MapPinIcon size={18} /> {CONTACT_INFO.address}
              </p>
              <p>Hours: By Appointment</p>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-center">
          <p className="text-xs text-gray-300">
            © {new Date().getFullYear()} 1Way Home Services. All rights reserved.
          </p>
          <nav aria-label="Legal" className="flex items-center gap-4 text-xs text-gray-300">
            <Link href="/en/privacy/" className="hover:text-white transition-colors">
              Privacy
            </Link>
            <span aria-hidden="true" className="text-gray-500">
              ·
            </span>
            <Link href="/en/terms/" className="hover:text-white transition-colors">
              Terms
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
