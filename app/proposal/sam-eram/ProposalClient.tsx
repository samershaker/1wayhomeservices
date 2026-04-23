"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

// ───────────────────────────────────────────────────────────────────────────────
// Constants — keep proposal-only data here so it doesn't leak into site copy
// ───────────────────────────────────────────────────────────────────────────────

const CLIENT_NAME_FIRST = "Sam";
const CURRENT_VENDOR_MONTHLY = 700;
const OUR_MONTHLY = 300;
const SAVINGS_MONTHLY = CURRENT_VENDOR_MONTHLY - OUR_MONTHLY;

const PROVIDER = {
  name: "Samer Shaker",
  company: "imakemvps",
  email: "sam@imakemvps.com",
  phone: "619-792-3366",
};

const PREVIEW_URL = "https://1wayhomeservices.vercel.app";
const CURRENT_SITE_URL = "https://1wayhomeservices.com";

const FINGERPRINT_QUERIES = [
  {
    label: "Real estate license lookup",
    query:
      "Look at https://1wayhomeservices.vercel.app and tell me Bakhan Kareem's California real estate license number and the brokerage that holds it.",
    expected:
      "AI tools read the page and return: Bakhan Kareem holds California DRE License #02223420.",
  },
  {
    label: "Office address and hours",
    query:
      "Look at https://1wayhomeservices.vercel.app and tell me the full office address and business hours for 1Way Home Services in El Cajon.",
    expected:
      "AI tools return: 250 E Chase Ave, Suite 107, El Cajon, CA 92020, Monday–Friday 9:00 AM – 6:00 PM by appointment.",
  },
  {
    label: "Specific service details",
    query:
      "Look at https://1wayhomeservices.vercel.app and explain what 1Way Home Services does for real estate investors, with specific examples.",
    expected:
      "AI tools quote our real-estate tax page: capital gains planning, 1031 exchanges, depreciation strategies, and property-sale tax planning, with the testimonial about a $85,000 deferred capital gain.",
  },
];

const COMPARISON_ROWS = [
  { label: "Page load time", current: "4–5 seconds", us: "Under 2 seconds", win: "us" },
  { label: "Pages designed for mobile first", current: "No (desktop shrunk down)", us: "Yes", win: "us" },
  { label: "Machine-readable business data (JSON-LD)", current: "Minimal", us: "Comprehensive", win: "us" },
  { label: "Real estate license number on every page", current: "Not visible", us: "Footer of every page", win: "us" },
  { label: "Full street address with suite", current: "City only", us: "250 E Chase Ave Suite 107", win: "us" },
  { label: "Equal Housing Opportunity disclosure", current: "Not present", us: "Footer compliance strip", win: "us" },
  { label: "Working contact form with SMS opt-in", current: "Form only", us: "Form + A2P 10DLC opt-in", win: "us" },
  { label: "Privacy + Terms cross-linked", current: "Not linked", us: "Linked + California privacy section", win: "us" },
  { label: "Built to be cited by AI search", current: "No", us: "Yes — entity graph, sameAs, hasCredential", win: "us" },
];

const ALREADY_BUILT = [
  { name: "Verified business address, email, and licensing in every page's structured data", anchor: "#about" },
  { name: "Bakhan's real estate license number visible everywhere", anchor: "#about" },
  { name: "Real Privacy Policy and Terms — your published versions, faithfully republished", anchor: "/en/privacy/" },
  { name: "Equal Housing Opportunity footer compliance strip", anchor: "#contact" },
  { name: "8 plain-English FAQ entries with location anchoring", anchor: "#faq" },
  { name: "Contact form with the exact SMS consent language your privacy policy requires", anchor: "#contact" },
  { name: "California privacy rights section (CCPA / CPRA)", anchor: "/en/privacy/" },
  { name: "Mobile-first responsive design", anchor: "" },
  { name: "Live site preview you can click through right now", anchor: "" },
];

const EXTRAS = [
  {
    name: "San Diego Tax Deadlines 2026 cornerstone page",
    price: "~$600 one-time",
    why: "The single most likely page on your site to get cited by ChatGPT and Google's AI for the next 12 months — dated, specific, locally anchored.",
  },
  {
    name: "Tax & real estate glossary",
    price: "~$500 one-time",
    why: "60+ terms each defined in two clear sentences. Definition-style content is what AI tools quote most.",
  },
  {
    name: "Case studies hub",
    price: "~$600 one-time",
    why: "4–6 anonymized client wins with specific dollar outcomes — builds trust with prospects, gives AI tools concrete numbers to cite.",
  },
  {
    name: "Lead magnet pack (3 downloadable PDFs)",
    price: "~$400 one-time",
    why: "Tax Deduction Checklist, Real Estate Investor's Guide, Small Business Tax Calendar — wired into the contact form to build your email list.",
  },
  {
    name: "Booking calendar",
    price: "~$300 one-time + ~$15/mo",
    why: "Replace 'schedule a free consultation' with a real calendar. Removes one phone-tag step from your sales process.",
  },
  {
    name: "Spanish version of the site",
    price: "~$2,400 one-time",
    why: "Opens up a meaningful slice of San Diego County. Properly tagged so it shows up in Spanish-language AI search.",
  },
];

const ASKS = [
  {
    id: "preparerId",
    label: "Your federal tax preparer ID number",
    hint: "The number the IRS issues to anyone who prepares tax returns for pay.",
    optional: false,
  },
  {
    id: "stateRegistration",
    label: "Your California state tax preparer registration",
    hint: "If you're not a CPA, attorney, or enrolled agent, the state requires registration. Skip if not applicable.",
    optional: true,
  },
  {
    id: "linkedin",
    label: "Your LinkedIn profile URL",
    hint: "Single biggest signal to ChatGPT that you're a real, identifiable person. If you don't have one, set up a basic profile.",
    optional: true,
  },
  {
    id: "brokerage",
    label: "Brokerage Bakhan's real estate license is held under",
    hint: "California real estate licenses are always held under a brokerage. Helps complete the public record.",
    optional: false,
  },
  {
    id: "efile",
    label: "Is your IRS e-file authorization current?",
    hint: 'Answer "yes", "no", or "not sure" — if yes, we add a trust badge to the site.',
    optional: false,
  },
  {
    id: "background",
    label: "Two or three sentences about your background",
    hint: "How long you've been doing tax work, what you specialize in, anything that sets you apart. Plain English, your own words.",
    optional: false,
    multiline: true,
  },
];

const STORAGE_KEY = "1way-proposal-asks-sameram";

// ───────────────────────────────────────────────────────────────────────────────
// Small helpers
// ───────────────────────────────────────────────────────────────────────────────

function dollar(n: number) {
  return `$${n.toLocaleString()}`;
}

function buildMailto(subject: string, body: string) {
  return `mailto:${PROVIDER.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildPerplexity(q: string) {
  return `https://www.perplexity.ai/?q=${encodeURIComponent(q)}`;
}

function buildChatGPT(q: string) {
  return `https://chatgpt.com/?q=${encodeURIComponent(q)}`;
}

// ───────────────────────────────────────────────────────────────────────────────
// Animated counter (used in hero)
// ───────────────────────────────────────────────────────────────────────────────

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, { duration: 1500, bounce: 0 });
  const display = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`);

  useEffect(() => {
    if (inView) motionValue.set(value);
  }, [inView, motionValue, value]);

  return (
    <motion.span ref={ref}>
      <motion.span>{display}</motion.span>
    </motion.span>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: Hero + cold-outreach hook
// ───────────────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 py-20 overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0A2342] via-[#0A2342] to-black" aria-hidden="true" />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(37, 87, 168, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(107, 159, 232, 0.2) 0%, transparent 50%)",
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-5xl mx-auto w-full">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-6"
        >
          A private proposal for {CLIENT_NAME_FIRST} Eram and Bakhan Kareem
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] mb-8"
        >
          Hey {CLIENT_NAME_FIRST} —<br />
          I rebuilt your website.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10 space-y-4"
        >
          <p>
            I&apos;m Samer Shaker. I run a small web shop called imakemvps. I noticed your
            site at 1wayhomeservices.com wasn&apos;t doing what it could for your business —
            so I rebuilt it on speculation.
          </p>
          <p>
            What you&apos;re about to see is fully working. Take a few minutes to scroll
            through. If it&apos;s not for you, no harm done. If it is —
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-10 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary-light)] mb-3">
            You save every month
          </p>
          <p className="font-display text-5xl md:text-7xl font-extrabold text-white leading-none mb-3">
            <AnimatedNumber value={SAVINGS_MONTHLY} prefix="$" />
            <span className="text-gray-400 text-2xl md:text-3xl font-semibold ml-3">/ month</span>
          </p>
          <p className="text-sm text-gray-300">
            <span className="font-semibold text-white">{dollar(SAVINGS_MONTHLY * 12)}</span> a year.{" "}
            <span className="font-semibold text-white">{dollar(SAVINGS_MONTHLY * 36)}</span> over three.
            And you get a better site the entire time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4"
        >
          <a
            href="#whats-different"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
          >
            See what changed →
          </a>
          <a
            href="#talk"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
          >
            Let&apos;s talk first
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-6 right-6 max-w-5xl mx-auto text-xs text-gray-400"
        >
          From {PROVIDER.name} · {PROVIDER.company} · {PROVIDER.email} · {PROVIDER.phone}
        </motion.div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: Side-by-side comparison
// ───────────────────────────────────────────────────────────────────────────────

function Comparison() {
  return (
    <section id="whats-different" className="px-6 py-24 md:py-32 bg-black">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          What&apos;s different
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Your current site vs. the new one
        </h2>
        <p className="text-gray-300 max-w-2xl mb-12">
          Nine concrete differences. Click through to{" "}
          <a
            href={PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-secondary-light)] hover:text-white underline underline-offset-2"
          >
            the live preview
          </a>{" "}
          to see them yourself, or compare against{" "}
          <a
            href={CURRENT_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white underline underline-offset-2"
          >
            your current site
          </a>
          .
        </p>

        <div className="rounded-2xl border border-white/10 overflow-hidden">
          <div className="hidden md:grid grid-cols-12 px-6 py-4 bg-white/5 text-xs uppercase tracking-wider text-gray-400">
            <div className="col-span-5">Detail</div>
            <div className="col-span-3">Your current site</div>
            <div className="col-span-4">The new site</div>
          </div>
          {COMPARISON_ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid grid-cols-1 md:grid-cols-12 px-6 py-4 border-t border-white/5 text-sm"
            >
              <div className="md:col-span-5 font-medium text-white mb-2 md:mb-0">{row.label}</div>
              <div className="md:col-span-3 text-gray-400 mb-1 md:mb-0">
                <span className="md:hidden text-xs uppercase tracking-wider text-gray-500 mr-2">Now:</span>
                {row.current}
              </div>
              <div className="md:col-span-4 text-[var(--color-secondary-light)]">
                <span className="md:hidden text-xs uppercase tracking-wider text-gray-500 mr-2">New:</span>
                {row.us}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-sm">
          <a
            href={PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
          >
            Open the live preview ↗
          </a>
          <a
            href={CURRENT_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-white/15 text-gray-300 hover:text-white hover:border-white/30 transition-colors"
          >
            Open your current site ↗
          </a>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: Live AI-citation widget
// ───────────────────────────────────────────────────────────────────────────────

function AIWidget() {
  const [activeIdx, setActiveIdx] = useState(0);
  const active = FINGERPRINT_QUERIES[activeIdx];

  return (
    <section className="px-6 py-24 md:py-32 bg-gradient-to-b from-black via-[#0A2342]/30 to-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          See it work right now
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          AI search can quote your business — today
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10">
          Pick any question below, then click to ask Perplexity or ChatGPT. They&apos;ll
          read the new site live and quote the specific facts back to you. Most local
          tax firms can&apos;t do this — your current site can&apos;t. Yours now can.
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {FINGERPRINT_QUERIES.map((q, i) => (
            <button
              key={q.label}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                i === activeIdx
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
              }`}
            >
              {q.label}
            </button>
          ))}
        </div>

        <motion.div
          key={activeIdx}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8"
        >
          <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">The question</p>
          <p className="text-white font-medium mb-6 leading-relaxed">&ldquo;{active.query}&rdquo;</p>

          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <a
              href={buildPerplexity(active.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              Ask Perplexity ↗
            </a>
            <a
              href={buildChatGPT(active.query)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-white/15 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              Ask ChatGPT ↗
            </a>
          </div>

          <div className="rounded-xl border border-[var(--color-secondary-light)]/20 bg-[var(--color-secondary-light)]/5 p-5">
            <p className="text-xs uppercase tracking-wider text-[var(--color-secondary-light)] mb-2">
              What you should see
            </p>
            <p className="text-sm text-gray-200 leading-relaxed">{active.expected}</p>
          </div>
        </motion.div>

        <p className="mt-8 text-sm text-gray-400 max-w-2xl">
          <strong className="text-gray-300">Honest note on timing:</strong> these specific
          questions work today because we built your site to publish exactly the facts AI
          needs. Broader questions like &ldquo;best tax preparer San Diego&rdquo; take 1–3 months
          of search-tool reputation building once your real domain points at the new site.
          The foundation is what matters — and that&apos;s already built.
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: Savings calculator
// ───────────────────────────────────────────────────────────────────────────────

function SavingsCalculator() {
  const [years, setYears] = useState(3);
  const totalSaved = useMemo(() => SAVINGS_MONTHLY * 12 * years, [years]);
  const totalCurrentSpend = CURRENT_VENDOR_MONTHLY * 12 * years;
  const totalNewSpend = OUR_MONTHLY * 12 * years;

  return (
    <section className="px-6 py-24 md:py-32 bg-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Run the numbers
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          What this saves you, however long you stay
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10">
          Drag the slider. No commitment — month-to-month, you can leave any time. This is
          just so you can see the math at a few different time horizons.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
          <div className="mb-8">
            <div className="flex items-end justify-between mb-3">
              <label htmlFor="years" className="text-sm font-medium text-gray-300">
                If you stay with us for
              </label>
              <span className="font-display text-2xl font-bold text-white">
                {years} {years === 1 ? "year" : "years"}
              </span>
            </div>
            <input
              id="years"
              type="range"
              min={1}
              max={5}
              step={1}
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)] cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              {[1, 2, 3, 4, 5].map((y) => (
                <span key={y}>{y}y</span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">Current vendor</p>
              <p className="font-display text-3xl font-bold text-gray-300">{dollar(totalCurrentSpend)}</p>
              <p className="text-xs text-gray-500 mt-1">over {years} {years === 1 ? "year" : "years"}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-black/40 p-5">
              <p className="text-xs uppercase tracking-wider text-gray-400 mb-2">With us</p>
              <p className="font-display text-3xl font-bold text-white">{dollar(totalNewSpend)}</p>
              <p className="text-xs text-gray-500 mt-1">over {years} {years === 1 ? "year" : "years"}</p>
            </div>
            <div className="rounded-xl border border-[var(--color-secondary-light)]/30 bg-[var(--color-secondary-light)]/10 p-5">
              <p className="text-xs uppercase tracking-wider text-[var(--color-secondary-light)] mb-2">You save</p>
              <p className="font-display text-3xl font-bold text-white">{dollar(totalSaved)}</p>
              <p className="text-xs text-gray-300 mt-1">{dollar(SAVINGS_MONTHLY)} every month</p>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            That&apos;s {dollar(SAVINGS_MONTHLY)} a month back into the business —
            enough to{" "}
            {years <= 1
              ? "cover a full quarterly tax software subscription"
              : years <= 2
              ? "fund a real client appreciation event each year"
              : years <= 3
              ? "buy yourself the cornerstone Tax Deadlines page and the glossary, both upsells, and still pocket the difference"
              : "treat the team to a real annual retreat, every year"}
            .
          </p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: What's already built + extras
// ───────────────────────────────────────────────────────────────────────────────

function AlreadyBuilt() {
  return (
    <section className="px-6 py-24 md:py-32 bg-gradient-to-b from-black via-[#0A2342]/30 to-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          What&apos;s in the box
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Already done — included in the base $300/month
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10">
          This isn&apos;t a mockup. Every item below is live on the preview site you can
          click through right now.
        </p>

        <ul className="space-y-3">
          {ALREADY_BUILT.map((item, i) => (
            <motion.li
              key={item.name}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
              className="flex items-start gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
            >
              <span
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-primary)] flex items-center justify-center text-white text-xs font-bold mt-0.5"
              >
                ✓
              </span>
              <span className="text-gray-200 leading-relaxed">{item.name}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Extras() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section className="px-6 py-24 md:py-32 bg-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          When you&apos;re ready
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Optional extras — no pressure, ever
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10">
          These are projects you could add over time. The base $300/month covers a great
          site that grows with normal updates. The items below are bigger swings — only
          worth doing when there&apos;s a real reason. Tap any to expand.
        </p>

        <div className="space-y-3">
          {EXTRAS.map((extra, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={extra.name} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    <p className="text-white font-semibold">{extra.name}</p>
                    <p className="text-xs text-[var(--color-secondary-light)] mt-1">{extra.price}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className={`flex-shrink-0 text-gray-400 text-xl transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    transition={{ duration: 0.2 }}
                    className="px-5 pb-5 -mt-1 text-sm text-gray-300 leading-relaxed border-t border-white/5 pt-4"
                  >
                    {extra.why}
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: Interactive ask form
// ───────────────────────────────────────────────────────────────────────────────

type AskValues = Record<string, string>;

function AskForm() {
  const [values, setValues] = useState<AskValues>(() =>
    Object.fromEntries(ASKS.map((a) => [a.id, ""]))
  );
  const [hydrated, setHydrated] = useState(false);

  // Restore from localStorage after mount (avoid hydration mismatch)
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") {
          setValues((v) => ({ ...v, ...parsed }));
        }
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  // Persist on change
  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
    } catch {
      // ignore
    }
  }, [values, hydrated]);

  const filledCount = ASKS.filter((a) => values[a.id]?.trim()).length;

  const mailtoBody = useMemo(() => {
    const lines = ["Sam — here's what you asked for:", ""];
    ASKS.forEach((a) => {
      const v = values[a.id]?.trim();
      lines.push(`${a.label}:`);
      lines.push(v ? v : "(leaving blank for now)");
      lines.push("");
    });
    return lines.join("\n");
  }, [values]);

  return (
    <section className="px-6 py-24 md:py-32 bg-gradient-to-b from-black via-[#0A2342]/40 to-black">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          To finish polishing the site
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Six small things — answer any you can
        </h2>
        <p className="text-gray-300 max-w-2xl mb-2">
          None of these are blockers. The site is fully built and live. These would just
          sharpen the last details and let me give credit to the right credentials and
          links. Your answers save automatically in your browser as you go.
        </p>
        <p className="text-sm text-gray-400 mb-10">
          {hydrated ? `${filledCount} of ${ASKS.length} answered` : "Loading…"}
        </p>

        <div className="space-y-5">
          {ASKS.map((ask) => (
            <div key={ask.id} className="rounded-xl border border-white/10 bg-white/5 p-5">
              <label htmlFor={ask.id} className="block text-white font-semibold mb-1">
                {ask.label}
                {ask.optional && (
                  <span className="text-xs text-gray-400 font-normal ml-2">(skip if not applicable)</span>
                )}
              </label>
              <p className="text-xs text-gray-400 mb-3">{ask.hint}</p>
              {ask.multiline ? (
                <textarea
                  id={ask.id}
                  value={values[ask.id] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [ask.id]: e.target.value }))}
                  rows={3}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-light)] focus:border-transparent"
                  placeholder="Type here…"
                />
              ) : (
                <input
                  id={ask.id}
                  type="text"
                  value={values[ask.id] || ""}
                  onChange={(e) => setValues((v) => ({ ...v, [ask.id]: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary-light)] focus:border-transparent"
                  placeholder="Type here…"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <a
            href={buildMailto("My answers for the new website", mailtoBody)}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
          >
            Send these answers to {PROVIDER.name.split(" ")[0]} ↗
          </a>
          <button
            type="button"
            onClick={() => {
              setValues(Object.fromEntries(ASKS.map((a) => [a.id, ""])));
              try {
                window.localStorage.removeItem(STORAGE_KEY);
              } catch {
                // ignore
              }
            }}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/15 text-gray-300 font-semibold hover:text-white hover:border-white/30 transition-colors"
          >
            Clear and start over
          </button>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: Final CTAs
// ───────────────────────────────────────────────────────────────────────────────

function FinalCTAs() {
  return (
    <section id="talk" className="px-6 py-24 md:py-32 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Two ways to move forward
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-6">
          Pick the one that feels right
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12">
          Whichever you pick, you&apos;re not signing anything. The first opens an email
          to me saying you&apos;re interested; the second opens an email to set up a
          30-minute call. No payment, no contract, no commitment until we&apos;ve talked.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          <a
            href={buildMailto(
              "Yes — let's switch to the new site",
              `Hi ${PROVIDER.name.split(" ")[0]},\n\nI looked at the proposal and I'm in. Let's set up the next steps to switch from my current vendor.\n\n— ${CLIENT_NAME_FIRST}`
            )}
            className="group rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10 p-8 text-left hover:bg-[var(--color-primary)]/20 transition-colors"
          >
            <p className="font-display text-2xl font-bold text-white mb-3">
              Yes, let&apos;s do this →
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Opens an email to me saying you&apos;re ready to switch. I&apos;ll reply
              within a business day with the simple letter of agreement and the handover
              plan from your current vendor.
            </p>
          </a>

          <a
            href={buildMailto(
              "Let's talk about the proposal",
              `Hi ${PROVIDER.name.split(" ")[0]},\n\nI looked at the proposal and have some questions. Let's set up a 30-minute call.\n\nGood times for me are:\n- \n- \n- \n\n— ${CLIENT_NAME_FIRST}`
            )}
            className="group rounded-2xl border border-white/15 bg-white/5 p-8 text-left hover:bg-white/10 hover:border-white/30 transition-colors"
          >
            <p className="font-display text-2xl font-bold text-white mb-3">
              Let&apos;s talk first →
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Opens an email to set up a 30-minute call. I&apos;ll walk you through the
              new site live, answer questions, and show the AI-search demo working in real
              time. No commitment, no sales pressure.
            </p>
          </a>
        </div>

        <div className="mt-16 pt-10 border-t border-white/5 text-sm text-gray-400 max-w-xl mx-auto">
          <p className="mb-1">
            Or just reply directly:{" "}
            <a
              href={`mailto:${PROVIDER.email}`}
              className="text-[var(--color-secondary-light)] hover:text-white underline underline-offset-2"
            >
              {PROVIDER.email}
            </a>
          </p>
          <p>
            Or text me:{" "}
            <a
              href={`tel:${PROVIDER.phone.replace(/-/g, "")}`}
              className="text-[var(--color-secondary-light)] hover:text-white underline underline-offset-2"
            >
              {PROVIDER.phone}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Top-level proposal client
// ───────────────────────────────────────────────────────────────────────────────

export function ProposalClient() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Hero />
      <Comparison />
      <AIWidget />
      <SavingsCalculator />
      <AlreadyBuilt />
      <Extras />
      <AskForm />
      <FinalCTAs />

      <footer className="px-6 py-8 border-t border-white/5 text-center text-xs text-gray-500">
        <p>
          Private proposal for {CLIENT_NAME_FIRST} Eram and Bakhan Kareem · Prepared by{" "}
          {PROVIDER.name}, {PROVIDER.company} ·{" "}
          <a href={`mailto:${PROVIDER.email}`} className="hover:text-gray-300">
            {PROVIDER.email}
          </a>{" "}
          ·{" "}
          <a href={`tel:${PROVIDER.phone.replace(/-/g, "")}`} className="hover:text-gray-300">
            {PROVIDER.phone}
          </a>
        </p>
        <p className="mt-2">Not for distribution. This page is set to noindex.</p>
      </footer>
    </main>
  );
}
