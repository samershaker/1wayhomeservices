import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { MobileStickyCTA } from "@/components/site/MobileStickyCTA";

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <MobileStickyCTA />
      <SiteNav />
      <main id="main-content" className="bg-[var(--color-black)] pb-24 md:pb-0">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
