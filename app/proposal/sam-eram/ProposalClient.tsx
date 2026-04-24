"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { AIFlowDiagram } from "./AIFlowDiagram";

// ───────────────────────────────────────────────────────────────────────────────
// Constants, keep proposal-only data here so it doesn't leak into site copy
// ───────────────────────────────────────────────────────────────────────────────

const CLIENT_NAME_FIRST = "Sam";
const CURRENT_VENDOR_MONTHLY = 700;
const OUR_MONTHLY = 300;

const PROVIDER = {
  name: "Samer Shaker",
  company: "imakemvps",
  email: "sam@imakemvps.com",
  phone: "619-792-3366",
};

const PREVIEW_URL = "https://1wayhomeservices.vercel.app";
const CURRENT_SITE_URL = "https://1wayhomeservices.com";

// AI-forward reframing: six signals AI tools look for before citing a firm.
const COMPARISON_STORIES = [
  {
    number: "01",
    title: "Plain-English briefing for AI.",
    body: "A public llms.txt file (94 lines) plus an expanded llms-full.txt tells ChatGPT and Claude exactly who you are before they crawl a single page.",
  },
  {
    number: "02",
    title: "13 AI bots invited by name.",
    body: "GPTBot, ClaudeBot, PerplexityBot, Google-Extended, and nine others are explicitly welcomed in robots.txt. Most firms block them by default without realizing it.",
  },
  {
    number: "03",
    title: "Six linked machine schemas.",
    body: "ProfessionalService, AccountingService, LocalBusiness, Organization, WebSite, and FAQPage form one connected graph assistants can parse in a single pass.",
  },
  {
    number: "04",
    title: "DRE license as a verifiable credential.",
    body: "Bakhan's DRE #02223420 is published as an EducationalOccupationalCredential, so it reads as verified fact, not marketing copy.",
  },
  {
    number: "05",
    title: "Fresh-review timestamp.",
    body: "Your 5.0 rating across 416 reviews carries a reviewVerifiedDate attribute, giving AI crawlers the freshness signal they rank on.",
  },
  {
    number: "06",
    title: "One source of truth, zero NAP drift.",
    body: "Phone, address, hours, and credentials live in one file and propagate to 200-plus surfaces, so AI never sees a conflicting name, address, or phone.",
  },
];

// Six AI-focused pieces of craft already shipped on the live preview.
// Links point at the raw artifact or the live validator that inspects it.
const ALREADY_BUILT = [
  {
    number: "01",
    title: "llms.txt briefing file, live at the edge.",
    body:
      "Plain-English summary AI assistants read first, 94 curated lines, plus an expanded llms-full.txt for assistants that want the deeper cut. Most firms in your category publish neither.",
    href: "https://1wayhomeservices.vercel.app/llms.txt",
    linkLabel: "View the raw llms.txt",
  },
  {
    number: "02",
    title: "13-bot AI allow-list in robots.txt.",
    body:
      "GPTBot, ChatGPT-User, OAI-SearchBot, ClaudeBot, anthropic-ai, Claude-Web, CCBot, PerplexityBot, Google-Extended, Applebot-Extended, Amazonbot, Bytespider, FacebookBot, each welcomed explicitly.",
    href: "https://1wayhomeservices.vercel.app/robots.txt",
    linkLabel: "View the raw robots.txt",
  },
  {
    number: "03",
    title: "Six-type linked schema graph.",
    body:
      "ProfessionalService, AccountingService, LocalBusiness, Organization, WebSite, and FAQPage, all connected for one-pass parsing by AI crawlers. Run it through Google's Rich Results test.",
    href: "https://search.google.com/test/rich-results?url=https%3A%2F%2F1wayhomeservices.vercel.app%2Fen%2F",
    linkLabel: "Run Google's Rich Results Test",
  },
  {
    number: "04",
    title: "DRE license as a Schema.org credential.",
    body:
      "California DRE #02223420 declared on Bakhan's Person object as an EducationalOccupationalCredential, so AI tools cite 'licensed California broker' as a verifiable fact, not a claim.",
    href: "https://validator.schema.org/#url=https%3A%2F%2F1wayhomeservices.vercel.app%2Fen%2F",
    linkLabel: "Inspect the schema directly",
  },
  {
    number: "05",
    title: "Timestamped 5.0 rating for AI freshness.",
    body:
      "416 Google reviews published in JSON-LD with a reviewVerifiedDate attribute, the freshness signal AI crawlers check before deciding an aggregate rating is current enough to cite.",
    href: "https://1wayhomeservices.vercel.app/en/",
    linkLabel: "See the live rating",
  },
  {
    number: "06",
    title: "One source of truth, 200-plus surfaces.",
    body:
      "Address, phone, hours, services, team, testimonials, and FAQs all live in one TypeScript constants file. One edit there propagates to llms.txt, JSON-LD, footer, and the contact form.",
    href: "https://github.com/samershaker/1wayhomeservices/blob/main/lib/constants.ts",
    linkLabel: "See the constants file",
  },
];

// The AI-outreach layer: what we do every month to keep 1Way cited and keep
// leads warm after the AI surfaces them.
const OUTREACH_ITEMS = [
  {
    label: "Monthly cited content",
    body: "One research-backed post per month, written to win a specific AI-search query and published under your byline.",
  },
  {
    label: "Quarterly AI re-tune",
    body: "llms.txt, the schema graph, and the crawler allow-list refreshed every quarter against the latest AI ranking signals.",
  },
  {
    label: "AI-visible syndication",
    body: "Google Business, Bing Places, Apple Business Connect, and the directories AI crawlers ingest, kept in sync with one source of truth.",
  },
  {
    label: "Lead magnet capture",
    body: "Downloadable guides wired to the contact form so AI-referred visitors leave an email before they leave the page.",
  },
  {
    label: "AI-drafted follow-up",
    body: "Email sequences written for your list, edited and sent by you, so interest from an AI citation turns into a booked call.",
  },
];

// Extras: a sample of add-on projects, ordered intentionally.
// Blog first (the compound-growth lever), booking calendar second (smallest
// commitment, biggest friction reducer), then the content build-outs. Each
// entry is either a flat `why` string or a structured `intro` + `options`
// + `closing` shape for the blog.
const EXTRAS = [
  {
    name: "Monthly blog content",
    price: "Option A: free  ·  Option B: $250/month",
    highlight: true,
    intro:
      "Blog posts are the single most-cited content format in AI search, more than case studies, FAQs, and testimonials combined. Every post is a new question your site can answer, a new phrase you can rank for, and a new surface ChatGPT can quote. One post a month, compounded over twelve months, turns your firm into the default answer for tax questions across San Diego County.",
    options: [
      {
        label: "Option A",
        name: "Write it yourself, no cost",
        desc: "I set you up with a simple publishing space inside the site where you can draft and post articles whenever you want. No monthly fee, no word counts, no deadlines. If you enjoy writing or want to journal your own expertise, this is yours to use as often or as rarely as you like.",
      },
      {
        label: "Option B",
        name: "I run it for you, $250/month",
        desc: "I write and publish one research-backed post per month with your name on the byline, on topics we agree on in advance. Each post is SEO-optimized and built for AI citation. Every quarter I run a full SEO/GEO audit of the site, update your llms.txt and structured data to reflect new content, and tune the pages for the queries you're closest to winning. Your citability improves visibly month over month, and you spend zero minutes on content.",
      },
    ],
    closing:
      "Sample topics I'd suggest for your first twelve months: 'The S-Corp election that saved my client $14,000,' '1031 exchange mistakes real-estate investors made last year,' 'How to appeal a San Diego County property tax assessment,' 'What changed for California tax filers this year.' Each is targeted to win a specific AI-search query the day it goes live.",
  },
  {
    name: "Booking calendar replacing \"schedule a consultation\"",
    price: "~$300 one-time, plus about $15/month for the calendar tool",
    why:
      "Prospects pick a slot themselves and it lands on your calendar automatically. One less phone-tag step, one less reason someone puts it off. Small change, measurable bump in consultation rate, especially with leads who find you after hours. This is the smallest-commitment upgrade on the menu and often the first one clients add.",
  },
  {
    name: "\"San Diego Tax Deadlines 2027\" cornerstone page",
    price: "~$600 one-time",
    why:
      "Since we're already past April 15, 2026, the right play is to get ahead of next season. One page with every federal, California, and San Diego County tax deadline for the 2027 filing year, who it applies to, what's owed, when it's due. Dated, specific, locally anchored. This is the single most likely page on your site to show up in ChatGPT, Google's AI Overviews, and Perplexity during next year's tax season. Shipped in two weeks, indexed long before January.",
  },
  {
    name: "Lead magnet pack (three downloadable PDFs)",
    price: "~$400 one-time",
    why:
      "Tax Deduction Checklist. Real Estate Investor's Tax Guide. Small Business Tax Calendar. Three downloads, each wired into the contact form so visitors trade an email for the PDF. I write and design all three end-to-end so you don't lift a finger. You quietly build an email list of interested leads, each of whom becomes a future client and the audience for the monthly blog above.",
  },
  {
    name: "Tax and real estate glossary",
    price: "~$500 one-time",
    why:
      "Sixty-plus terms (1031 exchange, depreciation recapture, S-Corp election, capital gains, AMT) each defined in two clear sentences. Definition-style content is the format AI tools quote most of all. One page, one afternoon to build, months of citations once AI tools learn that 1wayhomeservices.com is the place to send people who need a clear definition.",
  },
  {
    name: "Case studies hub (you collect the stories, I package them)",
    price: "~$600 one-time, once you have stories ready",
    why:
      "This one is contingent on you. Concrete numbers like 'San Diego real estate investor, saved $14,200 via S-Corp election in 2024' are what AI tools quote, and generic praise they ignore. But I can't make the stories up. Action 06 in the Do Yourself section above is the prerequisite: you approach three to five loyal clients for permission to share anonymized wins. Once I have their approval and the specifics, I write the hub page, draft the case studies to your spec, and add the IRS Circular 230 §10.30-compliant disclosures that keep it publishable.",
  },
  {
    name: "Spanish mirror of the site",
    price: "$1,000 setup, plus $150/month to keep it in sync",
    why:
      "A full Spanish-language mirror of your site on separate URL paths, with structured data properly tagged so Spanish-language AI search actually finds you. San Diego County is over thirty percent Spanish-speaking, and almost none of your category competitors publish a real Spanish site. The $1,000 setup covers the initial translation of every existing page, navigation, contact form, and legal content. The $150 a month keeps the mirror in sync: anything new you publish in English (blog posts, service updates, case studies, the Tax Deadlines page) gets translated and mirrored on the Spanish side within the month, so the two sites never drift apart. Especially valuable paired with the managed blog above, write once in English, reach both audiences.",
  },
];

// Six concrete actions Sam can take on his own to strengthen his online
// presence, no inputs collected, pure value. Each one compounds with the
// foundation the new site provides.
const ACTIONS = [
  {
    number: "01",
    title: "Claim and optimize your Google Business Profile",
    timeToDo: "10 minutes",
    body:
      "If you haven't already done this, do it today. It's free, and it's the single biggest local-search signal you can send. Ensures your address, hours, phone, and the 416 reviews show up correctly next to your name on Google Maps and in local results.",
    cta: { label: "Start at google.com/business ↗", href: "https://www.google.com/business/" },
  },
  {
    number: "02",
    title: "Create LinkedIn profiles for you and Bakhan",
    timeToDo: "15 minutes each",
    body:
      "Basic profiles are fine, name, photo, current role, one-line bio. The moment your LinkedIn URLs are linked from the new site, ChatGPT and other AI tools treat you as verified, identifiable people rather than anonymous strings. This is the strongest single trust signal you can add.",
    cta: { label: "Create a profile at linkedin.com ↗", href: "https://www.linkedin.com/signup" },
  },
  {
    number: "03",
    title: "List your firm on four free directories",
    timeToDo: "about a Saturday afternoon",
    body:
      "Yelp (business tax preparation + real estate services), Avvo (tax, and Bakhan for real estate), Nextdoor (business page), and the El Cajon Chamber of Commerce. These third-party mentions account for roughly 80 percent of the citations AI tools hand out, Reddit and Wikipedia included. Every listing is one more place your name can be found.",
    cta: { label: "Find the El Cajon Chamber listing form ↗", href: "https://www.elcajonchamber.org" },
  },
  {
    number: "04",
    title: "Build reviews around the tax calendar, not every month",
    timeToDo: "batched around your deadlines",
    body:
      "Tax clients don't review like consumer businesses, they review once a year, and most of them do it within six weeks of getting their return back. Plan the push around that reality: biggest wave the week after each 1040 client's return is delivered (usually March through April), smaller waves after March 15 S-corp filings and October 15 extensions. One sentence per client, one direct link, 'Would you take 30 seconds to leave us a Google review?' Done well, 416 becomes 440 before next tax season.",
  },
  {
    number: "05",
    title: "Google yourself today, screenshot the result",
    timeToDo: "3 minutes",
    body:
      "Open an incognito tab. Search 'tax preparer El Cajon' and 'Bakhan Kareem real estate San Diego.' Save the screenshots. Do it again one month after launch, and again after three. You'll see yourself climb in both regular search and Google's AI Overviews as the new site's foundation takes hold.",
  },
  {
    number: "06",
    title: "Ask three loyal clients if you can share their stories anonymously",
    timeToDo: "one phone call each",
    body:
      "Not a public testimonial request, just permission to reference their win in an anonymized case study. 'San Diego real estate investor, saved $14,000 via S-Corp election in 2024.' Specific numbers are what AI tools quote; generic praise is not. Three approved stories become the backbone of the case studies hub in the extras below.",
  },
];

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
// Interactive AI widgets (crawler grid, llms.txt peek, discovery funnel)
// ───────────────────────────────────────────────────────────────────────────────

function AICrawlerGrid() {
  const CRAWLERS = [
    { name: "GPTBot", feeds: "ChatGPT" },
    { name: "ChatGPT-User", feeds: "ChatGPT browsing" },
    { name: "OAI-SearchBot", feeds: "OpenAI Search" },
    { name: "ClaudeBot", feeds: "Claude" },
    { name: "anthropic-ai", feeds: "Claude training" },
    { name: "Claude-Web", feeds: "Claude browsing" },
    { name: "CCBot", feeds: "Common Crawl (feeds most LLMs)" },
    { name: "PerplexityBot", feeds: "Perplexity" },
    { name: "Google-Extended", feeds: "Google AI Overviews / Gemini" },
    { name: "Applebot-Extended", feeds: "Apple Intelligence" },
    { name: "Amazonbot", feeds: "Alexa / Rufus" },
    { name: "Bytespider", feeds: "Doubao / TikTok AI" },
    { name: "FacebookBot", feeds: "Meta AI" },
  ] as const;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: "-80px" });

  const count = useMotionValue(0);
  const spring = useSpring(count, { stiffness: 60, damping: 20 });
  const roundedSpring = useTransform(spring, (latest) => Math.round(latest).toString());

  useEffect(() => {
    if (inView) spring.set(13);
  }, [inView, spring]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex items-baseline gap-3 mb-6">
        <motion.span
          className="text-5xl md:text-6xl font-bold text-gradient-blue tabular-nums"
          aria-label="13 AI crawlers welcomed by name"
        >
          {roundedSpring}
        </motion.span>
        <span className="text-sm md:text-base text-slate-300">
          AI crawlers welcomed by name in robots.txt.
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
        {CRAWLERS.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="hover-lift rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-center cursor-default transition-colors hover:border-[color:var(--color-secondary-light)]/50 hover:bg-[color:var(--color-primary)]/15">
              <span className="text-xs md:text-sm font-mono font-semibold text-slate-100 whitespace-nowrap">
                {c.name}
              </span>
            </div>
            <div
              className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              role="tooltip"
            >
              <div className="whitespace-nowrap rounded-md border border-[color:var(--color-secondary-light)]/30 bg-[color:var(--color-navy)] px-2.5 py-1.5 text-[11px] text-slate-200 shadow-lg">
                <span className="text-[color:var(--color-secondary-light)] font-semibold">{c.name}</span>
                <span className="text-slate-400 mx-1.5">feeds</span>
                <span>{c.feeds}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-5 text-xs text-slate-400 italic">
        Hover any crawler to see which AI tool it feeds.
      </p>
    </div>
  );
}

function LlmsTxtPeek() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const LINES: Array<{ text: string; tone?: "comment" | "section" }> = [
    { text: "# 1Way Home Services", tone: "section" },
    { text: "# Tax preparation and real estate, El Cajon CA", tone: "comment" },
    { text: "" },
    { text: "Business: 1 Way Home Real Estate and Mortgage Services Inc." },
    { text: "Address: 250 E Chase Ave, Suite 107, El Cajon, CA 92020" },
    { text: "Phone: (619) 792-3366" },
    { text: "Hours: Mon to Fri, 9 AM to 6 PM PT" },
    { text: "" },
    { text: "## Team", tone: "section" },
    { text: "- Sam Eram, CFO and CPA" },
    { text: "- Bakhan Kareem, CEO and licensed CA broker, DRE #02223420" },
    { text: "" },
    { text: "## Services", tone: "section" },
    { text: "Tax planning, filing, bookkeeping, IRS support," },
    { text: "real estate tax guidance, mortgage consulting." },
  ];

  const toneColor = (tone?: string) => {
    if (tone === "comment") return "text-slate-500";
    if (tone === "section") return "text-[color:var(--color-secondary-light)] font-semibold";
    return "text-slate-200";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6 }}
      className="w-full glass-card-premium rounded-xl overflow-hidden border border-white/10"
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/10 bg-black/40">
        <div className="flex items-center gap-1.5">
          <span className="block w-3 h-3 rounded-full bg-red-400/70" />
          <span className="block w-3 h-3 rounded-full bg-yellow-400/70" />
          <span className="block w-3 h-3 rounded-full bg-green-400/70" />
        </div>
        <div className="flex-1 text-center">
          <span className="text-[11px] md:text-xs font-mono text-slate-400">
            1wayhomeservices.com/llms.txt
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="block w-2 h-2 rounded-full bg-green-400"
          />
          <span className="text-[10px] font-mono font-semibold tracking-wider text-green-400">LIVE</span>
        </div>
      </div>
      <div className="px-4 md:px-6 py-4 md:py-5 font-mono text-[12px] md:text-[13px] leading-relaxed bg-[color:var(--color-navy)]/60">
        {LINES.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
            transition={{ duration: 0.3, delay: 0.3 + i * 0.06 }}
            className={`flex gap-4 ${line.text === "" ? "h-3" : ""}`}
          >
            <span className="select-none text-slate-600 w-5 text-right shrink-0">
              {line.text === "" ? "" : i + 1}
            </span>
            <span className={toneColor(line.tone)}>{line.text || " "}</span>
          </motion.div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-white/10 bg-black/30 flex items-center justify-between">
        <span className="text-[11px] text-slate-400">94 curated lines, served at the edge.</span>
        <a
          href="https://1wayhomeservices.vercel.app/llms.txt"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-semibold text-[color:var(--color-secondary-light)] hover:text-white transition-colors"
        >
          View full file &rarr;
        </a>
      </div>
    </motion.div>
  );
}

function AIDiscoveryFunnel() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const STAGES = [
    {
      label: "AI crawler visits",
      body: "GPTBot, ClaudeBot, PerplexityBot land on the domain.",
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="16" cy="16" r="11" />
          <path d="M5 16h22M16 5c3 3.5 4.5 7 4.5 11s-1.5 7.5-4.5 11c-3-3.5-4.5-7-4.5-11S13 8.5 16 5z" />
          <circle cx="16" cy="16" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      label: "Reads llms.txt + schema",
      body: "Structured facts, DRE license, hours, reviews, all machine-readable.",
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="7" y="5" width="18" height="22" rx="2" />
          <path d="M11 11h10M11 15h10M11 19h7M11 23h6" />
        </svg>
      ),
    },
    {
      label: "Indexes as trusted answer",
      body: "Firm is stored as a verified entity, not a guess.",
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 4l10 4v7c0 6-4.5 10.5-10 13-5.5-2.5-10-7-10-13V8l10-4z" />
          <path d="M11 16l3.5 3.5L22 12" />
        </svg>
      ),
    },
    {
      label: "Cites firm to next user",
      body: "When someone asks, the AI quotes 1Way Home Services by name.",
      icon: (
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 9a3 3 0 013-3h16a3 3 0 013 3v10a3 3 0 01-3 3H14l-6 5v-5H8a3 3 0 01-3-3V9z" />
          <circle cx="12" cy="14" r="1" fill="currentColor" />
          <circle cx="16" cy="14" r="1" fill="currentColor" />
          <circle cx="20" cy="14" r="1" fill="currentColor" />
        </svg>
      ),
    },
  ];

  return (
    <div ref={ref} className="w-full">
      <div className="flex flex-col md:flex-row md:items-stretch gap-4 md:gap-2">
        {STAGES.map((stage, i) => (
          <div key={stage.label} className="flex md:flex-1 md:items-stretch gap-3 md:gap-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 glass-card rounded-xl p-4 md:p-5 border border-white/10 hover:border-[color:var(--color-secondary-light)]/40 transition-colors relative"
            >
              <div className="absolute top-3 right-3 text-[10px] font-mono font-bold text-slate-500">
                0{i + 1}
              </div>
              <div className="text-[color:var(--color-secondary-light)] mb-3">{stage.icon}</div>
              <div className="text-sm md:text-[15px] font-bold text-white leading-tight mb-1.5">
                {stage.label}
              </div>
              <div className="text-xs text-slate-400 leading-relaxed">{stage.body}</div>
            </motion.div>
            {i < STAGES.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                className="flex md:items-center justify-center shrink-0 px-0 md:px-1"
                aria-hidden="true"
              >
                <svg viewBox="0 0 24 24" className="hidden md:block w-6 h-6 text-[color:var(--color-secondary-light)]/60" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
                <svg viewBox="0 0 24 24" className="md:hidden w-6 h-6 text-[color:var(--color-secondary-light)]/60 ml-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 4v16M6 14l6 6 6-6" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
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
          Hey {CLIENT_NAME_FIRST},<br />
          be the answer AI gives in El Cajon.
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mb-10 space-y-4"
        >
          <p>
            This proposal is about AI integration and outreach. We make 1Way Home Services
            the firm ChatGPT, Claude, and Google AI cite when someone in your zip code asks
            about tax prep, 1031 exchanges, or a licensed local broker. The website you
            already have is how we do it, not what we are selling.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap gap-3 mb-10 max-w-2xl"
        >
          <div className="glass-card rounded-xl border border-white/10 px-5 py-3 flex items-baseline gap-3 bg-white/5 backdrop-blur-sm">
            <span className="font-display text-3xl md:text-4xl font-extrabold text-white leading-none tabular-nums">
              <AnimatedNumber value={13} />
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-[var(--color-secondary-light)] font-semibold leading-tight">
              AI crawlers<br />welcomed
            </span>
          </div>
          <div className="glass-card rounded-xl border border-white/10 px-5 py-3 flex items-baseline gap-3 bg-white/5 backdrop-blur-sm">
            <span className="font-display text-3xl md:text-4xl font-extrabold text-white leading-none tabular-nums">
              <AnimatedNumber value={6} />
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-[var(--color-secondary-light)] font-semibold leading-tight">
              linked JSON-LD<br />schemas
            </span>
          </div>
          <div className="glass-card rounded-xl border border-white/10 px-5 py-3 flex items-baseline gap-3 bg-white/5 backdrop-blur-sm">
            <span className="font-display text-3xl md:text-4xl font-extrabold text-white leading-none tabular-nums">
              <AnimatedNumber value={2} />
            </span>
            <span className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-[var(--color-secondary-light)] font-semibold leading-tight">
              AI-readable<br />briefing files
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-10 max-w-2xl"
        >
          <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-secondary-light)] mb-3">
            The offer
          </p>
          <p className="font-display text-5xl md:text-7xl font-extrabold text-white leading-none mb-3">
            <AnimatedNumber value={OUR_MONTHLY} prefix="$" />
            <span className="text-gray-400 text-2xl md:text-3xl font-semibold ml-3">/ month</span>
          </p>
          <p className="text-sm text-gray-300 mb-5 max-w-prose">
            Month-to-month. No contract, no setup fee, cancel any time with 30 days notice.
          </p>

          <div className="border-t border-white/10 pt-5">
            <p className="text-[10px] uppercase tracking-[0.14em] text-gray-500 font-semibold mb-3">
              What {dollar(OUR_MONTHLY)} covers every month
            </p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 text-sm text-gray-300">
              <li className="flex gap-2"><span className="text-[var(--color-secondary-light)]">·</span>Hosting on Vercel&apos;s edge</li>
              <li className="flex gap-2"><span className="text-[var(--color-secondary-light)]">·</span>Uptime monitoring</li>
              <li className="flex gap-2"><span className="text-[var(--color-secondary-light)]">·</span>Security patches + updates</li>
              <li className="flex gap-2"><span className="text-[var(--color-secondary-light)]">·</span>Small content edits as needed</li>
              <li className="flex gap-2"><span className="text-[var(--color-secondary-light)]">·</span>Bug fixes at no extra charge</li>
              <li className="flex gap-2"><span className="text-[var(--color-secondary-light)]">·</span>Email support, one-day reply</li>
            </ul>
            <p className="text-xs text-gray-400 mt-4 leading-relaxed">
              New pages, redesigns, paid-ad management, and bigger projects are quoted separately.
              Your site code is yours, on termination I hand over source, accounts, and credentials within 14 days.
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-sm text-gray-400 leading-relaxed max-w-2xl mb-10"
        >
          If you&apos;re paying more than that elsewhere, managed CPA sites in the region typically
          run $600 to $900 a month, the difference is yours. There&apos;s a calculator later in the
          page where you can plug in your actual number and see the math.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-16"
        >
          <a
            href="#ai-search"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
          >
            See the AI demo →
          </a>
          <a
            href="#savings"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-white/20 text-white font-semibold hover:bg-white/5 transition-colors"
          >
            Run the numbers
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
    <section id="whats-different" className="px-6 py-16 md:py-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          What&apos;s different
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          What&apos;s different, in AI terms.
        </h2>
        <p className="text-gray-300 max-w-4xl mb-12 leading-relaxed">
          Six ways this site is built for machine readers, not just humans. Each one is a
          signal an AI tool looks for before it cites a firm by name.
        </p>

        <div className="mb-10 flex flex-col sm:flex-row items-center justify-center gap-3 text-sm">
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
    <section className="px-6 py-16 md:py-20 bg-gradient-to-b from-black via-[#0A2342]/30 to-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Your business card to AI search
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          The AI search demo.
        </h2>
        <p className="text-gray-300 max-w-4xl mb-10 leading-relaxed">
          Here is exactly what ChatGPT, Claude, and Perplexity see when they visit
          1wayhomeservices.com today, and the 13 AI tools we welcomed by name.
        </p>

        <div className="mb-10">
          <AIFlowDiagram />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mt-10 mb-10">
          <AICrawlerGrid />
          <LlmsTxtPeek />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 md:p-8 mb-8"
        >
          <p className="text-xs uppercase tracking-wider text-[var(--color-secondary-light)] mb-4">
            Every field the diagram shows, published as structured data
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
              <p className="text-sm text-gray-400 mt-1">
                Based on 416 Google reviews, need to confirm with you whether these
                live under Bakhan&apos;s real-estate Google Business Profile or the tax
                firm&apos;s, so the schema attaches to the right entity.
              </p>
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
            Verify it yourself, click anything below
          </p>
          <p className="text-sm text-gray-400 mb-6 leading-relaxed">
            Every link opens what AI crawlers actually read; try the same path on your
            current site for the contrast.
          </p>

          {/* Block A: Google and schema.org live validators */}
          <div className="mb-8">
            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-3">
              Google and schema.org live validators (they fetch the URL while you watch)
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={richResultsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-[var(--color-primary)] text-white font-semibold hover:bg-[var(--color-primary)]/90 transition-colors"
              >
                Run Google&apos;s Rich Results Test ↗
              </a>
              <a
                href={schemaValidatorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-white/15 text-white font-semibold hover:bg-white/5 transition-colors"
              >
                Run schema.org Validator ↗
              </a>
            </div>
          </div>

          {/* Block B: AI-facing files, new site vs current site */}
          <div>
            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold mb-3">
              The four files AI crawlers look for, on your new site vs. on your current site
            </p>

            <div className="space-y-3">
              {[
                {
                  file: "llms.txt",
                  what: "A plain-English business summary written specifically for AI assistants, ChatGPT, Claude, Perplexity. It's the first file they look for.",
                },
                {
                  file: "llms-full.txt",
                  what: "Expanded version with pricing, testimonials, FAQs, and the full service catalog, everything an AI might want to quote.",
                },
                {
                  file: "sitemap.xml",
                  what: "The map every search engine uses to find every page on your site.",
                },
                {
                  file: "robots.txt",
                  what: "The list of AI crawlers we explicitly welcome onto your site, ChatGPT, Perplexity, Claude, Google AI, and a dozen more.",
                },
              ].map((row) => (
                <div
                  key={row.file}
                  className="rounded-xl border border-white/10 bg-black/30 p-4 md:p-5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1 mb-2">
                    <code className="font-mono text-sm font-semibold text-[var(--color-secondary-light)]">
                      /{row.file}
                    </code>
                    <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider font-semibold text-gray-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600" aria-hidden="true" />
                      typically missing on competitor sites
                    </span>
                  </div>
                  <p className="text-sm text-gray-300 leading-relaxed mb-3">{row.what}</p>
                  <a
                    href={`${PREVIEW_URL}/${row.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[var(--color-primary)]/15 border border-[var(--color-primary)]/40 text-[var(--color-secondary-light)] hover:bg-[var(--color-primary)]/25 text-xs font-semibold transition-colors"
                  >
                    View it live on your new site ↗
                  </a>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs text-gray-500 leading-relaxed max-w-prose">
              If you want to see the contrast firsthand, try the same paths on your current
              site.{" "}
              <a
                href={`${CURRENT_SITE_URL}/llms.txt`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white"
              >
                1wayhomeservices.com/llms.txt
              </a>{" "}
              and{" "}
              <a
                href={`${CURRENT_SITE_URL}/sitemap.xml`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-white"
              >
                /sitemap.xml
              </a>{" "}
              are the quickest checks. Most competitor sites 404 on these, which is exactly
              why they don&apos;t get cited by AI.
            </p>
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
                The foundation is live and verifiable, Google&apos;s Rich Results Test, the
                schema.org validator, and &ldquo;view source&rdquo; all confirm the structured
                data is there.
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Days to weeks</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Once Bing IndexNow runs and Perplexity crawls the preview, narrow factual
                questions start getting answered, things like &ldquo;is 1Way Home Services
                licensed in California?&rdquo; or &ldquo;where is 1Way Home Services
                located?&rdquo;
              </p>
            </div>
            <div>
              <p className="text-white font-semibold mb-1">Months, not weeks</p>
              <p className="text-sm text-gray-300 leading-relaxed">
                Broader queries, things like &ldquo;El Cajon CPA with real estate
                experience&rdquo;, improve as the site builds reputation on your real
                domain. AI citation is a black box owned by Google and OpenAI, not me.
                What I can promise is the foundation they look for; the citations
                themselves are up to them.
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
  // Default to the mid-range of typical managed CPA sites. Sam can adjust to
  // his actual bill; we never claim we know what he pays.
  const [currentMonthly, setCurrentMonthly] = useState(CURRENT_VENDOR_MONTHLY);

  const savingsMonthly = Math.max(0, currentMonthly - OUR_MONTHLY);
  const totalSaved = useMemo(() => savingsMonthly * 12 * years, [savingsMonthly, years]);
  const totalCurrentSpend = currentMonthly * 12 * years;
  const totalNewSpend = OUR_MONTHLY * 12 * years;

  return (
    <section id="savings" className="px-6 py-16 md:py-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Run the numbers
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Plug in your actual costs, here&apos;s the math
        </h2>
        <p className="text-gray-300 max-w-4xl mb-10 leading-relaxed">
          I don&apos;t know what you&apos;re paying today, so the calculator lets you set
          it yourself. Drag both sliders to see the real savings on your timeline, nothing
          assumed, nothing hidden.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-10">
          {/* Slider 1: current monthly cost */}
          <div className="mb-8">
            <div className="flex items-end justify-between mb-3">
              <label htmlFor="currentMonthly" className="text-sm font-medium text-gray-300">
                What you pay your current vendor per month
              </label>
              <span className="font-display text-2xl font-bold text-white">
                {dollar(currentMonthly)}
              </span>
            </div>
            <input
              id="currentMonthly"
              type="range"
              min={0}
              max={1500}
              step={50}
              value={currentMonthly}
              onChange={(e) => setCurrentMonthly(Number(e.target.value))}
              className="w-full accent-[var(--color-primary)] cursor-pointer"
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>$0</span>
              <span>$500</span>
              <span>$1,000</span>
              <span>$1,500</span>
            </div>
          </div>

          {/* Slider 2: time horizon */}
          <div className="mb-8">
            <div className="flex items-end justify-between mb-3">
              <label htmlFor="years" className="text-sm font-medium text-gray-300">
                If you stayed with us for
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
              <p className="text-xs uppercase tracking-wider text-[var(--color-secondary-light)] mb-2">
                {currentMonthly > OUR_MONTHLY ? "You save" : "Difference"}
              </p>
              <p className="font-display text-3xl font-bold text-white">{dollar(totalSaved)}</p>
              <p className="text-xs text-gray-300 mt-1">
                {savingsMonthly > 0
                  ? `${dollar(savingsMonthly)} every month`
                  : "You're already paying less than $300"}
              </p>
            </div>
          </div>

          {currentMonthly > OUR_MONTHLY && (
            <p className="text-sm text-gray-400 leading-relaxed max-w-prose">
              That&apos;s {dollar(savingsMonthly)} a month you&apos;d be keeping. What you
              do with it is your business, not mine, I&apos;m not routing this back into
              upsells.
            </p>
          )}
          {currentMonthly <= OUR_MONTHLY && currentMonthly > 0 && (
            <p className="text-sm text-gray-400 leading-relaxed max-w-prose">
              Your current price is already competitive. The case for switching isn&apos;t
              savings, it&apos;s the rebuilt site and the AI-search foundation. Worth a
              look even if the cost is a wash.
            </p>
          )}
          {currentMonthly === 0 && (
            <p className="text-sm text-gray-400 leading-relaxed max-w-prose">
              If you&apos;re running the site yourself for free today, the value
              proposition isn&apos;t cost, it&apos;s time, capability, and discoverability.
              Three hours of your billable time a month already pays for this.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: AI outreach layer
// ───────────────────────────────────────────────────────────────────────────────

function AIOutreachLayer() {
  return (
    <section id="outreach" className="relative py-20 md:py-24 px-6 bg-gradient-to-b from-black via-[#0A2342]/20 to-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Outreach, not just optimization
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          The AI outreach layer.
        </h2>
        <p className="text-gray-300 max-w-4xl mb-10 leading-relaxed">
          Citations are half the work. The other half is turning an AI-referred visitor
          into a booked call, every month, on repeat.
        </p>

        <div className="mb-10">
          <AIDiscoveryFunnel />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {OUTREACH_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="glass-card rounded-xl p-5 border border-white/10 hover:border-[color:var(--color-secondary-light)]/40 transition-colors"
            >
              <p className="font-display text-base font-bold text-white mb-2 leading-snug">
                {item.label}
              </p>
              <p className="text-sm text-gray-300 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
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
    <section id="whats-built" className="px-6 py-16 md:py-20 bg-gradient-to-b from-black via-[#0A2342]/30 to-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Under the hood
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Under the hood, the AI plumbing.
        </h2>
        <p className="text-gray-300 max-w-4xl mb-10 leading-relaxed">
          Six specific pieces of craft that turn your site from a brochure into a
          machine-readable entity AI tools will quote.
        </p>

        <div className="space-y-4 md:space-y-5">
          {ALREADY_BUILT.map((item, i) => (
            <motion.article
              key={item.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7"
            >
              <div className="flex items-baseline gap-4 mb-3">
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-semibold tracking-wider text-[var(--color-secondary-light)]/80"
                >
                  {item.number}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-white leading-snug">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed md:pl-10 max-w-prose">
                {item.body}
              </p>
              {item.href && (
                <div className="mt-4 md:pl-10">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-white/15 text-sm text-white font-semibold hover:bg-white/5 hover:border-white/30 transition-colors"
                  >
                    {item.linkLabel ?? "See it live"} ↗
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Extras() {
  // Start with the first extra (the blog) open by default so Sam sees the
  // strongest upsell fully laid out without having to click.
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="extras" className="px-6 py-16 md:py-20 bg-black">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          When you&apos;re ready
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Optional add-ons that compound over time
        </h2>
        <p className="text-gray-300 max-w-4xl mb-4 leading-relaxed">
          The base $300 a month covers a great site that grows with normal updates. The
          items below are bigger swings, the kind that turn a good foundation into real
          discoverability. None required, all optional, and one (the first one) is
          genuinely overpowered.
        </p>
        <p className="text-sm text-gray-400 max-w-4xl mb-10 leading-relaxed italic">
          These are examples, not a complete list. Ideas surface regularly once we&apos;re
          working together. If something specific is on your mind, say so.
        </p>

        <div className="space-y-3">
          {EXTRAS.map((extra, i) => {
            const isOpen = openIdx === i;
            const isHighlighted = "highlight" in extra && extra.highlight === true;
            const hasOptions = "options" in extra && Array.isArray(extra.options);
            const paragraphs =
              "why" in extra && typeof extra.why === "string"
                ? extra.why.split("\n\n")
                : [];
            return (
              <div
                key={extra.name}
                className={`rounded-xl overflow-hidden transition-colors ${
                  isHighlighted
                    ? "border-2 border-[var(--color-primary)]/60 bg-[var(--color-primary)]/10"
                    : "border border-white/10 bg-white/5"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left hover:bg-white/5 transition-colors"
                  aria-expanded={isOpen}
                >
                  <div className="min-w-0">
                    {isHighlighted && (
                      <p className="text-[10px] uppercase tracking-[0.14em] font-bold text-[var(--color-secondary-light)] mb-1.5">
                        Most impactful add-on
                      </p>
                    )}
                    <p className="text-white font-semibold leading-snug">{extra.name}</p>
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
                    className="px-5 pb-5 -mt-1 text-sm md:text-base text-gray-300 leading-relaxed border-t border-white/5 pt-4 space-y-5 max-w-prose"
                  >
                    {hasOptions && "intro" in extra && typeof extra.intro === "string" && (
                      <p>{extra.intro}</p>
                    )}

                    {hasOptions &&
                      "options" in extra &&
                      Array.isArray(extra.options) &&
                      (extra.options as { label: string; name: string; desc: string }[]).map(
                        (opt) => (
                          <div
                            key={opt.label}
                            className="rounded-xl border border-white/10 bg-black/30 p-4 md:p-5"
                          >
                            <p className="text-[10px] uppercase tracking-[0.14em] font-semibold text-[var(--color-secondary-light)] mb-1">
                              {opt.label}
                            </p>
                            <p className="text-white font-semibold mb-2">{opt.name}</p>
                            <p className="text-sm text-gray-300 leading-relaxed">{opt.desc}</p>
                          </div>
                        ),
                      )}

                    {hasOptions && "closing" in extra && typeof extra.closing === "string" && (
                      <p className="text-gray-400">{extra.closing}</p>
                    )}

                    {!hasOptions &&
                      paragraphs.map((p, j) => <p key={j}>{p}</p>)}
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

function ActionsList() {
  return (
    <section id="ask" className="px-6 py-16 md:py-20 bg-gradient-to-b from-black via-[#0A2342]/40 to-black">
      <div className="max-w-4xl mx-auto">
        <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-secondary-light)] mb-3">
          Things you can do yourself
        </p>
        <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mb-4">
          Six things you can do this week, no one needed but you
        </h2>
        <p className="text-gray-300 max-w-4xl mb-12 leading-relaxed">
          The new site gives you the foundation. These six things are what stack on top of
          it to turn it into real discoverability. Every one of them is free, takes minutes
          to an afternoon, and compounds for months. Do them whether or not you ever work
          with me.
        </p>

        <div className="space-y-4 md:space-y-5">
          {ACTIONS.map((action, i) => (
            <motion.article
              key={action.number}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-7"
            >
              <div className="flex items-baseline gap-4 mb-2">
                <span
                  aria-hidden="true"
                  className="font-display text-sm font-semibold tracking-wider text-[var(--color-secondary-light)]/80"
                >
                  {action.number}
                </span>
                <h3 className="font-display text-lg md:text-xl font-bold text-white leading-snug">
                  {action.title}
                </h3>
              </div>
              <p className="text-[11px] uppercase tracking-wider text-gray-500 font-semibold md:pl-10 mb-3">
                Takes about {action.timeToDo}
              </p>
              <p className="text-sm md:text-base text-gray-300 leading-relaxed md:pl-10 max-w-prose">
                {action.body}
              </p>
              {action.cta && (
                <div className="mt-4 md:pl-10">
                  <a
                    href={action.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 rounded-lg border border-white/15 text-sm text-white font-semibold hover:bg-white/5 hover:border-white/30 transition-colors"
                  >
                    {action.cta.label}
                  </a>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-sm text-gray-400 leading-relaxed max-w-prose">
          None of these require a contract with me to be worth doing. If you want help with
          any of them, or you&apos;d rather hand the content side over entirely, see the
          extras section, especially the monthly content option.
        </p>
      </div>
    </section>
  );
}

// ───────────────────────────────────────────────────────────────────────────────
// Section: Final CTAs
// ───────────────────────────────────────────────────────────────────────────────

function FinalCTAs() {
  return (
    <section id="talk" className="px-6 py-16 md:py-20 bg-black">
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
              "Let's move forward, send me the agreement",
              `Hi ${PROVIDER.name.split(" ")[0]},\n\nI'd like to move forward. Please send over the letter of agreement so I can review it, plus any specifics on how the handover from my current vendor would work when the time comes.\n\nNo commitment yet, I just want to see the terms in writing.\n\nThanks,\n${CLIENT_NAME_FIRST}`
            )}
            className="group flex flex-col rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/10 p-8 text-left hover:bg-[var(--color-primary)]/20 transition-colors h-full"
          >
            <p className="font-display text-2xl font-bold text-white mb-3">
              Send me the agreement to review →
            </p>
            <p className="text-sm text-gray-300 leading-relaxed">
              Opens an email asking for the letter of agreement. You read it, sign it only
              when and if the terms land right. No verbal commitment, no vendor-switching
              on this click, just paper you can actually review.
            </p>
          </a>

          <a
            href={buildMailto(
              "Let's talk about the proposal",
              `Hi ${PROVIDER.name.split(" ")[0]},\n\nI looked at the proposal and have some questions. Let's set up a 30-minute call.\n\nGood times for me are:\n- \n- \n- \n\nThanks,\n${CLIENT_NAME_FIRST}`
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
// Table of Contents, sticky rail (desktop) + floating sheet (mobile)
// ───────────────────────────────────────────────────────────────────────────────

const TOC_SECTIONS: { id: string; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "ai-search", label: "AI search demo" },
  { id: "savings", label: "Run the numbers" },
  { id: "whats-different", label: "What's different" },
  { id: "outreach", label: "AI outreach" },
  { id: "whats-built", label: "What's in the box" },
  { id: "extras", label: "Optional extras" },
  { id: "ask", label: "Do yourself" },
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
      <div id="ai-search">
        <AIWidget />
      </div>
      <SavingsCalculator />
      <Comparison />
      <AIOutreachLayer />
      <AlreadyBuilt />
      <Extras />
      <ActionsList />
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
