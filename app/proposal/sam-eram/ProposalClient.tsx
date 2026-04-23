"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";

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

const COMPARISON_STORIES = [
  {
    number: "01",
    title: "Four seconds is the difference between a phone call and a back-button.",
    body: "People decide whether to stay on a page in about two seconds. Your current site takes four to become visible on a phone — most visitors are already gone. The new site is visible in under two. Your first impression is your first sentence, not a loading spinner.",
  },
  {
    number: "02",
    title: "“El Cajon, CA” doesn’t help anyone find you.",
    body: "That’s what your current contact page says. Technically true, practically useless. Google Maps can’t pin you, a new client doesn’t know which cross-street to look for, and ChatGPT has nothing specific to cite. The new site publishes 250 E Chase Ave, Suite 107, El Cajon CA 92020 on every page — in a format both humans and AI tools can actually use.",
  },
  {
    number: "03",
    title: "Bakhan is a licensed California broker. The internet doesn’t know it.",
    body: "California real estate license #02223420 is public record. It’s not on your current site anywhere. The new site displays it in the footer of every page, next to a direct link to the state’s official verification database. This is how licensed professionals signal regulated and accountable without having to say the words.",
  },
  {
    number: "04",
    title: "416 five-star reviews should be working harder than they are.",
    body: "They’re real. They’re earned. But on your current site they aren’t structured the way AI search needs them — so when someone asks ChatGPT or Google’s AI “who’s a trusted tax preparer in El Cajon?”, your reputation isn’t doing the work it could. The new site publishes the rating properly — structured, dated, linked to Google. Your reviews start selling for you even while you’re asleep.",
  },
  {
    number: "05",
    title: "The small things regulators and careful clients notice.",
    body: "Fair Housing language. California privacy rights. Text-message consent wording that matches what your own privacy policy already commits you to. None of them make or break your business on their own. All three together signal a firm that takes the details seriously — the kind of firm regulators don’t need to call. Your current site is missing all three. The new one has all three.",
  },
  {
    number: "06",
    title: "Built for the screen your customers actually use.",
    body: "Seven out of ten people who visit your site are on a phone. Your current site was designed for a desktop and shrunk down to fit — which is why buttons feel tight, forms are awkward, and people bounce. The new site was designed for phones first, then widened to desktop. Your customers meet you on the screen they’re already holding.",
  },
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
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-28 md:pb-24 overflow-hidden"
    >
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
          <p className="text-sm text-gray-300 max-w-prose">
            <span className="font-semibold text-white">{dollar(SAVINGS_MONTHLY * 12)}</span> a year.{" "}
            <span className="font-semibold text-white">{dollar(SAVINGS_MONTHLY * 36)}</span> over three.
            And you get a better site the entire time.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
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
          className="text-xs text-gray-400"
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
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          What&apos;s different
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Six specific things your customers will notice
        </h2>
        <p className="text-gray-300 max-w-2xl mb-12 leading-relaxed">
          Vague comparisons are how bad agencies sell you things you don&apos;t need.
          Every item below is specific and verifiable. Open{" "}
          <a
            href={PREVIEW_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-secondary-light)] hover:text-white underline underline-offset-2"
          >
            the new site
          </a>{" "}
          and{" "}
          <a
            href={CURRENT_SITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white underline underline-offset-2"
          >
            your current site
          </a>{" "}
          in two tabs and check any of them yourself.
        </p>

        <div className="space-y-4 md:space-y-5">
          {COMPARISON_STORIES.map((story, i) => (
            <motion.article
              key={story.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8"
            >
              <div className="flex items-baseline gap-4 md:gap-5 mb-3">
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-semibold tracking-wider text-[var(--color-secondary-light)]/80"
                >
                  {story.number}
                </span>
                <h3 className="font-display text-xl md:text-2xl font-bold text-white leading-snug tracking-tight">
                  {story.title}
                </h3>
              </div>
              <p className="text-base md:text-lg text-gray-300 leading-relaxed md:pl-10 max-w-prose">
                {story.body}
              </p>
            </motion.article>
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
// Section: Your business card to AI search
// ───────────────────────────────────────────────────────────────────────────────

function AIWidget() {
  const richResultsUrl =
    "https://search.google.com/test/rich-results?url=https%3A%2F%2F1wayhomeservices.vercel.app%2Fen%2F";
  const schemaValidatorUrl =
    "https://validator.schema.org/#url=https%3A%2F%2F1wayhomeservices.vercel.app%2Fen%2F";

  const services = [
    "Tax planning",
    "Tax filing",
    "Payroll",
    "Bookkeeping",
    "IRS support",
    "Real estate tax guidance",
    "Mortgage consulting",
  ];

  return (
    <section className="px-6 py-24 md:py-32 bg-gradient-to-b from-black via-[#0A2342]/30 to-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Your business card to AI search
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          What AI search needs — and the foundation we built
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10 leading-relaxed">
          Citations from ChatGPT, Perplexity, and Google&apos;s AI follow the foundation.
          The foundation is what&apos;s real today: every page of the new site publishes a
          clean, machine-readable profile of your business — the exact facts AI tools look
          for when deciding whether to cite a local firm.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-8"
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-secondary-light)] mb-4">
            Here&apos;s what AI sees on every page of your new site
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Business name</p>
              <p className="text-white font-semibold">1Way Home Services</p>
              <p className="text-sm text-gray-400 mt-1">
                1 Way Home Real Estate and Mortgage Services Inc.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Phone</p>
              <p className="text-white font-semibold">(619) 716-9193</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Address</p>
              <p className="text-white font-semibold">250 E Chase Ave, Suite 107</p>
              <p className="text-sm text-gray-400">El Cajon, CA 92020</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Email</p>
              <p className="text-white font-semibold">sam@1wayhomeservices.com</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Hours</p>
              <p className="text-white font-semibold">Mon – Fri, 9:00 AM – 6:00 PM</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">California DRE license</p>
              <p className="text-white font-semibold">#02223420</p>
              <p className="text-sm text-gray-400 mt-1">Bakhan Kareem</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Aggregate rating</p>
              <p className="text-white font-semibold">5.0 / 5</p>
              <p className="text-sm text-gray-400 mt-1">Based on 416 Google reviews</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-1">Services published</p>
              <p className="text-white font-semibold">7 services</p>
              <p className="text-sm text-gray-400 mt-1">All tagged in structured data</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-5">
            <p className="text-xs uppercase tracking-wider text-gray-500 mb-3">Service lineup</p>
            <div className="flex flex-wrap gap-2">
              {services.map((s) => (
                <span
                  key={s}
                  className="px-3 py-1 rounded-full border border-white/10 bg-black/30 text-xs text-gray-200"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-8"
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-secondary-light)] mb-2">
            Verify it yourself in 30 seconds
          </p>
          <p className="text-white font-medium mb-2 leading-relaxed">
            These are Google&apos;s and schema.org&apos;s own public tools.
          </p>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            They fetch the live preview URL right now and show you exactly the structured
            data the new site publishes — the same data ChatGPT, Perplexity, and Google&apos;s
            AI read to decide whether to cite a business.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={richResultsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
            >
              Open Google Rich Results Test ↗
            </a>
            <a
              href={schemaValidatorUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-white/15 text-white font-semibold hover:bg-white/5 transition-colors"
            >
              Open schema.org Validator ↗
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="rounded-2xl border border-[var(--color-secondary-light)]/20 bg-[var(--color-secondary-light)]/5 p-6 md:p-8"
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-secondary-light)] mb-4">
            An honest timeline
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <p className="text-white font-semibold mb-1">Today</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                The foundation is live and verifiable — Google&apos;s Rich Results Test, the
                schema.org validator, and &ldquo;view source&rdquo; all confirm the structured
                data is there.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Days to weeks</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Once Bing IndexNow runs and Perplexity crawls the preview, the new site starts
                answering specific, narrow questions — license numbers, office hours, service
                lists.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">1 – 3 months</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Once your real domain <span className="text-white">1wayhomeservices.com</span>{" "}
                points at this build, broader queries like &ldquo;best tax preparer San
                Diego&rdquo; start naming you as ChatGPT and Google&apos;s AI grow trust in
                the site.
              </p>
            </div>
          </div>
        </motion.div>
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

  const horizonLine = useMemo(() => {
    switch (years) {
      case 1:
        return "cover a full quarterly tax software subscription";
      case 2:
        return "fund a real client appreciation event each year";
      case 3:
        return "pay for the cornerstone Tax Deadlines page and the glossary upsell, and still pocket the rest";
      case 4:
        return "run a proper email marketing program with room to spare";
      default:
        return "treat the team to a real annual retreat, every year";
    }
  }, [years]);

  return (
    <section id="savings" className="px-6 py-24 md:py-32 bg-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Run the numbers
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          What this saves you, however long you stay
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10 leading-relaxed">
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

          <p className="text-sm text-gray-400 leading-relaxed max-w-prose">
            That&apos;s {dollar(SAVINGS_MONTHLY)} a month back into the business —
            enough to {horizonLine}.
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
    <section id="whats-built" className="px-6 py-24 md:py-32 bg-gradient-to-b from-black via-[#0A2342]/30 to-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          What&apos;s in the box
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Already done — included in the base $300/month
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10 leading-relaxed">
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
    <section id="extras" className="px-6 py-24 md:py-32 bg-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          When you&apos;re ready
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Optional extras — no pressure, ever
        </h2>
        <p className="text-gray-300 max-w-2xl mb-10 leading-relaxed">
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
    <section id="ask" className="px-6 py-24 md:py-32 bg-gradient-to-b from-black via-[#0A2342]/40 to-black">
      <div className="max-w-3xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          To finish polishing the site
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Six small things — answer any you can
        </h2>
        <p className="text-gray-300 max-w-2xl mb-3 leading-relaxed">
          None of these are blockers. The site is fully built and live. These would just
          sharpen the last details and let me give credit to the right credentials and
          links. Your answers save automatically in your browser as you go.
        </p>
        <p className="text-sm text-gray-400 mb-10">
          {hydrated ? `${filledCount} of ${ASKS.length} answered` : "Loading…"}
        </p>

        <div className="space-y-4 md:space-y-5">
          {ASKS.map((ask) => (
            <div key={ask.id} className="rounded-xl border border-white/10 bg-white/5 p-4 md:p-5">
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
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Pick the one that feels right
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-12 leading-relaxed">
          Whichever you pick, you&apos;re not signing anything. The first opens an email
          to me saying you&apos;re interested; the second opens an email to set up a
          30-minute call. No payment, no contract, no commitment until we&apos;ve talked.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto items-stretch">
          <a
            href={buildMailto(
              "Yes — let's switch to the new site",
              `Hi ${PROVIDER.name.split(" ")[0]},\n\nI looked at the proposal and I'm in. Let's set up the next steps to switch from my current vendor.\n\n— ${CLIENT_NAME_FIRST}`
            )}
            className="group flex flex-col rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10 p-8 text-left hover:bg-[var(--color-primary)]/20 transition-colors h-full"
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
            className="group flex flex-col rounded-2xl border border-white/15 bg-white/5 p-8 text-left hover:bg-white/10 hover:border-white/30 transition-colors h-full"
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
// Table of Contents — sticky rail (desktop) + floating sheet (mobile)
// ───────────────────────────────────────────────────────────────────────────────

const TOC_SECTIONS: { id: string; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "whats-different", label: "What's different" },
  { id: "ai-search", label: "AI search demo" },
  { id: "savings", label: "Run the numbers" },
  { id: "whats-built", label: "What's in the box" },
  { id: "extras", label: "Optional extras" },
  { id: "ask", label: "Six small things" },
  { id: "talk", label: "Let's talk" },
];

function TableOfContents() {
  const [activeId, setActiveId] = useState<string>(TOC_SECTIONS[0].id);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Track which section is most visible in the viewport. Multiple sections
    // may be partially visible, so pick the entry with the highest intersection
    // ratio that is currently intersecting.
    const elements = TOC_SECTIONS
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const visibility = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        visibility.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });
        if (bestId) setActiveId(bestId);
      },
      {
        // A band across the middle of the viewport; whichever section has the
        // most of its area in this band wins.
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleJump = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileOpen(false);
  }, []);

  return (
    <>
      {/* Desktop: fixed vertical rail on the right */}
      <nav
        aria-label="Proposal sections"
        className="hidden md:flex flex-col gap-1 fixed right-6 top-1/2 -translate-y-1/2 z-40 pointer-events-auto"
      >
        {TOC_SECTIONS.map((s) => {
          const isActive = s.id === activeId;
          return (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleJump(s.id);
              }}
              aria-current={isActive ? "location" : undefined}
              className={`group relative flex items-center justify-end gap-3 rounded-md pl-3 pr-2 py-1.5 text-[11px] uppercase tracking-[0.14em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-black ${
                isActive ? "text-white" : "text-gray-500 hover:text-gray-200"
              }`}
            >
              <span
                className={`transition-opacity ${
                  isActive ? "opacity-100 font-semibold" : "opacity-70 group-hover:opacity-100"
                }`}
              >
                {s.label}
              </span>
              <span
                aria-hidden="true"
                className={`block h-px transition-all ${
                  isActive
                    ? "w-6 bg-[var(--color-secondary-light)]"
                    : "w-3 bg-gray-600 group-hover:w-5 group-hover:bg-gray-400"
                }`}
              />
            </a>
          );
        })}
      </nav>

      {/* Mobile: floating button + bottom sheet */}
      <div className="md:hidden">
        <button
          type="button"
          aria-label="Open proposal sections menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
          className="fixed bottom-5 right-5 z-40 h-12 w-12 rounded-full bg-[var(--color-primary)] text-white shadow-lg shadow-black/40 flex items-center justify-center border border-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)] focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          <span aria-hidden="true" className="flex flex-col gap-[3px]">
            <span className="block h-[2px] w-4 bg-white rounded-full" />
            <span className="block h-[2px] w-4 bg-white rounded-full" />
            <span className="block h-[2px] w-4 bg-white rounded-full" />
          </span>
        </button>

        {mobileOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end"
            role="dialog"
            aria-modal="true"
            aria-label="Proposal sections"
          >
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />
            <div className="relative w-full rounded-t-2xl bg-[#0A2342] border-t border-white/10 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
              <div className="flex items-center justify-between mb-4">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)]">
                  Jump to
                </p>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close"
                  className="text-gray-400 hover:text-white text-sm px-2 py-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)]"
                >
                  Close
                </button>
              </div>
              <ul className="space-y-1">
                {TOC_SECTIONS.map((s) => {
                  const isActive = s.id === activeId;
                  return (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleJump(s.id);
                        }}
                        aria-current={isActive ? "location" : undefined}
                        className={`flex items-center justify-between gap-3 rounded-lg px-3 py-3 text-sm transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-secondary-light)] ${
                          isActive
                            ? "bg-white/10 text-white font-semibold"
                            : "text-gray-300 hover:bg-white/5"
                        }`}
                      >
                        <span>{s.label}</span>
                        {isActive && (
                          <span
                            aria-hidden="true"
                            className="h-1.5 w-1.5 rounded-full bg-[var(--color-secondary-light)]"
                          />
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Top-level proposal client
// ───────────────────────────────────────────────────────────────────────────────

export function ProposalClient() {
  return (
    <main className="min-h-screen bg-black text-white">
      <TableOfContents />
      <Hero />
      <Comparison />
      <div id="ai-search">
        <AIWidget />
      </div>
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
