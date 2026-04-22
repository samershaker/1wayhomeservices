"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MenuIcon, XIcon, PhoneIcon } from "@/components/ui/icons/page-icons";
import { CONTACT_INFO } from "@/lib/constants";

const NAV_LINKS = [
  { href: "/en/#services", label: "Services" },
  { href: "/en/#about", label: "About" },
  { href: "/en/#process", label: "Process" },
  { href: "/en/#faq", label: "FAQ" },
];

export function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = () => {
    setMobileMenuOpen(false);
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
        const focusables = menuRef.current.querySelectorAll<HTMLElement>("a, button");
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
            {NAV_LINKS.map((link) => (
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
              className="min-h-11 min-w-11 flex items-center justify-center text-white hover:text-blue-400 transition-colors"
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
            <div className="flex flex-col p-6 gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white py-2 text-lg hover:text-blue-400 transition-colors"
                  onClick={closeMenu}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/en/#contact"
                className="text-white py-2 text-lg hover:text-blue-400 transition-colors"
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
