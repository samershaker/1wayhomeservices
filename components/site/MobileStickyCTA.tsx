"use client";

import { useEffect, useState } from "react";
import { PhoneIcon, MailIcon } from "@/components/ui/icons/page-icons";
import { CONTACT_INFO } from "@/lib/constants";

export function MobileStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Skip scroll listener entirely on desktop — component returns null anyway.
    if (typeof window !== "undefined" && window.matchMedia("(min-width: 768px)").matches) return;
    const handleScroll = () => {
      setIsVisible(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-black/95 backdrop-blur-xl border-t border-white/10"
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex gap-2">
        <a href={CONTACT_INFO.phoneHref} className="btn-primary flex-1 justify-center text-sm !py-3">
          <PhoneIcon size={16} /> Call Now
        </a>
        <a href="/en/#contact" className="btn-secondary flex-1 justify-center text-sm !py-3">
          <MailIcon size={16} /> Message
        </a>
      </div>
    </div>
  );
}
