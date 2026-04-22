import type { Metadata } from "next";
import {
  LongFormServicePage,
  type LandingConfig,
} from "@/components/site/LongFormServicePage";
import { CONTACT_INFO } from "@/lib/constants";
import { ServiceStructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "Personal Tax Filing in El Cajon & San Diego",
  description:
    "Fast, accurate personal tax filing with flat, upfront pricing and year-round IRS support. Serving El Cajon, San Diego, and surrounding areas.",
  alternates: { canonical: "/en/personal-tax-filing/" },
};

const config: LandingConfig = {
  hero: {
    eyebrow: "Personal Tax Filing",
    headline: "Claim Every Deduction",
    highlight: "You've Earned",
    subheadline:
      "Fast, accurate tax returns for individuals and families across El Cajon, San Diego, and surrounding areas. Flat pricing, no surprises, and year-round IRS support if you need it.",
    trustRow: [
      "6+ Years Experience",
      "IRS E-File Authorized",
      "Flat, Upfront Pricing",
    ],
  },

  valueProps: [
    {
      icon: "check",
      title: "Every deduction found",
      description:
        "We review your situation line by line and find credits and deductions most DIY software misses.",
    },
    {
      icon: "dollar",
      title: "Flat, upfront pricing",
      description:
        "No per-form charges or surprise add-ons. You'll know the cost before we start, with complex situations quoted in writing.",
    },
    {
      icon: "shield",
      title: "Year-round IRS support",
      description:
        "Get an IRS notice after filing? We respond on your behalf at no extra cost. Filing with us is the end of the paperwork, not the start.",
    },
  ],

  howItWorks: [
    {
      step: 1,
      title: "Schedule a free consultation",
      description:
        "In person at our El Cajon office, over the phone, or via Zoom — whatever fits your schedule.",
      icon: "calendar",
    },
    {
      step: 2,
      title: "Send us your documents",
      description:
        "We'll send a short checklist of what to gather. Upload them securely, email, or drop them off — we're flexible.",
      icon: "document",
    },
    {
      step: 3,
      title: "Review and e-file",
      description:
        "We walk you through the return so you understand every number, then e-file with direct deposit for the fastest refund.",
      icon: "check",
    },
  ],

  pricing: {
    eyebrow: "Straightforward Pricing",
    headline: "One flat fee. No surprises.",
    price: "From $199",
    priceNote:
      "Starting price for standard individual returns. Complex situations (self-employed, rental income, multi-state) quoted in writing after a free review.",
    includes: [
      "Federal and state return preparation",
      "All applicable deductions and credits reviewed",
      "Itemized vs. standard deduction optimization",
      "E-file with direct deposit for fast refunds",
      "A line-by-line review of your return before filing",
      "Year-round IRS notice response at no extra cost",
    ],
    cta: {
      label: `Call ${CONTACT_INFO.phone}`,
      href: CONTACT_INFO.phoneHref,
      icon: "phone",
    },
  },

  testimonials: [
    {
      quote:
        "Fast, professional, and thorough. They completed my tax return in just 3 days and found deductions I didn't even know existed. Got back $1,850 more than I expected.",
      author: "David L.",
      role: "W-2 Employee · Santee, CA",
      result: "+$1,850 refund",
    },
    {
      quote:
        "Working as a freelance designer, my taxes were a mess. Sam helped me set up quarterly estimated payments and maximize my home office deduction. No more surprises at tax time.",
      author: "Lisa M.",
      role: "Freelance Designer · El Cajon, CA",
      result: "Zero tax surprises",
    },
  ],

  guarantee: {
    icon: "shield",
    headline: "Audit protection, included",
    body:
      "If you receive an IRS notice or audit inquiry for a return we filed, we respond on your behalf year-round at no additional cost. Filing with us doesn't end in April — it covers you until the next one.",
  },

  faqs: [
    {
      question: "What documents should I bring?",
      answer:
        "The essentials: W-2s, 1099s, mortgage interest (1098), charitable donation receipts, medical expense records over 7.5% of income, student loan interest statements, and prior-year return. We'll send a full checklist tailored to your situation after the free consultation.",
    },
    {
      question: "How long does tax preparation take?",
      answer:
        "Most individual returns are completed within 5-7 business days from when we receive all your documents. Straightforward W-2 returns often wrap up in 2-3 days. Complex returns (self-employed, rental property, multiple states) may take a little longer.",
    },
    {
      question: "What does it cost?",
      answer:
        "Individual returns start at $199 for standard situations. We quote complex returns in writing after a free initial review — no hidden fees, no per-form surprises.",
    },
    {
      question: "Can I file if I'm missing some paperwork?",
      answer:
        "Yes. If you're missing W-2s, 1099s, or prior returns, we can request transcripts from the IRS and help reconstruct records. Don't let missing paperwork stop you from filing.",
    },
    {
      question: "Can you file past-due returns?",
      answer:
        "Absolutely. We specialize in catching up on back taxes — one year or several — and can negotiate payment plans or penalty abatement with the IRS if you owe.",
    },
    {
      question: "Do I have to come in person?",
      answer:
        "No. We offer the full process virtually: Zoom consultation, secure document upload, remote review and e-signature. Many clients we've never met in person.",
    },
    {
      question: "What if the IRS contacts me after filing?",
      answer:
        "We respond on your behalf at no extra charge. Forward the notice and we'll handle the communication, explanation, or resolution directly with the IRS.",
    },
    {
      question: "What if I owe taxes?",
      answer:
        "We'll show you exactly what you owe and the available options — installment plans, offer-in-compromise, hardship deferral — and help you set up the one that fits your situation.",
    },
  ],

  closingCta: {
    eyebrow: "Ready when you are",
    headline: "Let's file with",
    highlight: "confidence",
    subheadline:
      "Start with a free, no-pressure consultation. If we're a fit, we'll get your return done in a week.",
  },
};

export default function PersonalTaxFilingPage() {
  return (
    <>
      <ServiceStructuredData serviceId="tax-filing" />
      <LongFormServicePage config={config} />
    </>
  );
}
