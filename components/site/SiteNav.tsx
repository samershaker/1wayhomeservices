"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon, PhoneIcon } from "@/components/ui/icons/page-icons";
import { CONTACT_INFO, SERVICES } from "@/lib/constants";

type ServiceLike = (typeof SERVICES)[number] & { landingUrl?: string };

const NAV_LINKS = [
  { href: "/en/#services", label: "Services" },
  { href: "/en/#about", label: "About" },
  { href: "/en/#process", label: "Process" },
  { href: "/en/#faq", label: "FAQ" },
];

function getServiceHref(service: ServiceLike): string {
  if (typeof service.landingUrl === "string" && service.landingUrl.length > 0) {
    return service.landingUrl;
  }
  return `/en/services/${service.slug}/`;
}

export function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMobileMenuOpen(false);
    setMobileServicesOpen(false);
    toggleBtnRef.current?.focus();
  };

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
        return;
      }
      if (e.key === "Tab" && menuRef.current) {
        const focusables = menuRef.current.querySelectorAll<HTMLElement>(
          "a, button"
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    menuRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => document.removeEventListener("keydown", handleKey);
  }, [mobileMenuOpen]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded"
      >
        Skip to main content
      </a>
      <nav
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/70 border-b border-white/5"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/en/" className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-color.png"
              alt="1Way Home Services home"
              className="h-10 w-auto"
              width={120}
              height={40}
            />
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-8">
            {/* Services dropdown */}
            <div
              className="group relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
              onFocus={() => setServicesDropdownOpen(true)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setServicesDropdownOpen(false);
                }
              }}
            >
              <Link
                href="/en/#services"
                className="text-sm text-gray-300 hover:text-white transition-colors py-3 inline-flex items-center gap-1"
                aria-haspopup="menu"
                aria-expanded={servicesDropdownOpen}
              >
                Services
                <svg
                  aria-hidden="true"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  className="transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>

              <div
                role="menu"
                aria-label="Services"
                className="invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0 transition-all duration-150 absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50"
              >
                <div className="glass-card min-w-[260px] py-2 shadow-xl">
                  <Link
                    href="/en/#services"
                    role="menuitem"
                    className="block px-4 py-2 text-sm text-gray-200 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    All services
                  </Link>
                  <div className="my-1 border-t border-white/10" />
                  {SERVICES.map((service) => (
                    <Link
                      key={service.id}
                      href={getServiceHref(service as ServiceLike)}
                      role="menuitem"
                      className="block px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                    >
                      {service.shortName}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {NAV_LINKS.filter((l) => l.href !== "/en/#services").map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors py-3"
              >
                {link.label}
              </Link>
            ))}
            <a href={CONTACT_INFO.phoneHref} className="btn-primary text-sm !py-2 !px-5">
              <span className="sr-only">Call us at {CONTACT_INFO.phone}</span>
              <span aria-hidden="true">
                <PhoneIcon size={20} />
              </span>
              <span className="hidden sm:inline">Call Now</span>
            </a>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-2">
            <button
              ref={toggleBtnRef}
              className="min-h-11 min-w-11 flex items-center justify-center text-white hover:text-[var(--color-primary-light)] transition-colors"
              onClick={() => setMobileMenuOpen((v) => !v)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
            </button>
            <a
              href={CONTACT_INFO.phoneHref}
              className="btn-primary text-sm !py-2 !px-4"
              aria-label={`Call ${CONTACT_INFO.phone}`}
            >
              <span aria-hidden="true">
                <PhoneIcon size={20} />
              </span>
            </a>
          </div>
        </div>

        {mobileMenuOpen && (
          <div id="mobile-menu" ref={menuRef} className="md:hidden bg-black/95 border-t border-white/5">
            <div className="flex flex-col p-6 gap-2">
              {/* Services with nested list */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between">
                  <Link
                    href="/en/#services"
                    className="text-white py-2 text-lg hover:text-[var(--color-primary-light)] transition-colors flex-1"
                    onClick={closeMenu}
                  >
                    Services
                  </Link>
                  <button
                    type="button"
                    className="min-h-11 min-w-11 flex items-center justify-center text-white"
                    onClick={() => setMobileServicesOpen((v) => !v)}
                    aria-expanded={mobileServicesOpen}
                    aria-controls="mobile-services-submenu"
                    aria-label={mobileServicesOpen ? "Collapse services" : "Expand services"}
                  >
                    <svg
                      aria-hidden="true"
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                    >
                      <path
                        d="M3 4.5L6 7.5L9 4.5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
                {mobileServicesOpen && (
                  <div
                    id="mobile-services-submenu"
                    className="flex flex-col pl-4 border-l border-white/10 ml-2 mt-1 mb-2 gap-1"
                  >
                    <Link
                      href="/en/#services"
                      className="text-gray-200 py-2 text-base hover:text-[var(--color-primary-light)] transition-colors"
                      onClick={closeMenu}
                    >
                      All services
                    </Link>
                    {SERVICES.map((service) => (
                      <Link
                        key={service.id}
                        href={getServiceHref(service as ServiceLike)}
                        className="text-gray-300 py-2 text-base hover:text-[var(--color-primary-light)] transition-colors"
                        onClick={closeMenu}
                      >
                        {service.shortName}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {NAV_LINKS.filter((l) => l.href !== "/en/#services").map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white py-2 text-lg hover:text-[var(--color-primary-light)] transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/en/#contact"
                className="text-white py-2 text-lg hover:text-[var(--color-primary-light)] transition-colors"
                onClick={closeMenu}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
