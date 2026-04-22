/**
 * 1Way Home Services Website Constants
 * Tax Preparation & Real Estate Services
 */

// Type Exports
export type Service = typeof SERVICES[number];
export type ServiceId = Service['id'];
export type ServiceCategory = Service['category'];

export type Testimonial = typeof TESTIMONIALS[number];
export type TeamMember = typeof TEAM_MEMBERS[number];
export type ProcessStep = typeof PROCESS_STEPS[number];
export type FAQItem = typeof FAQ_ITEMS[number];
export type ContactInfo = typeof CONTACT_INFO;

// Tax & Real Estate Services
export const SERVICES = [
  {
    id: 'tax-planning',
    name: 'Tax Planning & Advisory',
    slug: 'tax-planning',
    shortName: 'Tax Planning',
    description: 'Strategic tax planning to minimize liability and maximize deductions for individuals and businesses year-round.',
    icon: 'clock',
    category: 'tax',
    price: 'Varies',
    priceNote: 'Free initial consultation',
    features: [
      'Year-round tax strategy development',
      'Deduction optimization',
      'Business structure analysis',
      'Quarterly estimated tax planning'
    ],
    image: '/images/services/tax-planning.jpg',
    featured: true,
    badge: 'Most Popular'
  },
  {
    id: 'tax-filing',
    name: 'Tax Filing',
    slug: 'tax-filing',
    shortName: 'Tax Filing',
    description: 'Complete federal and state tax return preparation for individuals and businesses. E-file with direct deposit.',
    icon: 'dollar',
    category: 'tax',
    price: 'From $199',
    priceNote: 'Starting price — varies by complexity',
    features: [
      'Federal & state tax preparation',
      'Individual & business returns',
      'Itemized deductions',
      'E-file with direct deposit'
    ],
    image: '/images/services/tax-filing.jpg',
    featured: true,
    badge: null,
    landingUrl: '/en/personal-tax-filing/'
  },
  {
    id: 'payroll-tax',
    name: 'Payroll Tax Filing',
    slug: 'payroll-tax',
    shortName: 'Payroll Taxes',
    description: 'Quarterly and annual payroll tax filings, W-2 and 1099 preparation, compliance management for businesses.',
    icon: 'calendar',
    category: 'tax',
    price: 'From $150/mo',
    priceNote: 'Starting price — varies by employee count',
    features: [
      'Quarterly payroll tax filings',
      'Annual W-2 and 1099 preparation',
      'Payroll tax calculations',
      'Compliance management'
    ],
    image: '/images/services/payroll.jpg',
    featured: false,
    badge: 'For Business'
  },
  {
    id: 'bookkeeping',
    name: 'Bookkeeping',
    slug: 'bookkeeping',
    shortName: 'Bookkeeping',
    description: 'Monthly financial record keeping, bank reconciliation, and financial statement preparation to keep your books in order.',
    icon: 'document',
    category: 'tax',
    price: 'From $200/mo',
    priceNote: 'Starting price — varies by transaction volume',
    features: [
      'Monthly financial record keeping',
      'Bank reconciliation',
      'Financial statement preparation',
      'Expense categorization'
    ],
    image: '/images/services/bookkeeping.jpg',
    featured: false,
    badge: null
  },
  {
    id: 'irs-help',
    name: 'IRS Help & Audit Support',
    slug: 'irs-help',
    shortName: 'IRS Help',
    description: 'Professional representation during IRS audits, notices, and collections. Penalty abatement and payment plan negotiation.',
    icon: 'shield',
    category: 'tax',
    price: 'Varies',
    priceNote: 'Free consultation for audit cases',
    features: [
      'IRS audit representation',
      'Notice response management',
      'Payment plan negotiation',
      'Penalty abatement requests'
    ],
    image: '/images/services/irs-help.jpg',
    featured: false,
    badge: 'Expert Help'
  },
  {
    id: 'real-estate-tax',
    name: 'Real Estate Tax Support',
    slug: 'real-estate-tax',
    shortName: 'Real Estate Tax',
    description: 'Capital gains planning, 1031 exchanges, depreciation strategies, and property sale tax planning for investors.',
    icon: 'home',
    category: 'real-estate',
    price: 'Varies',
    priceNote: 'Free initial consultation',
    features: [
      'Capital gains planning',
      '1031 exchange guidance',
      'Depreciation strategies',
      'Property sale tax planning'
    ],
    image: '/images/services/real-estate.jpg',
    featured: true,
    badge: 'For Investors'
  },
  {
    id: 'mortgage-consulting',
    name: 'Mortgage Consulting',
    slug: 'mortgage-consulting',
    shortName: 'Mortgage',
    description: 'Loan pre-approval, refinancing analysis, debt planning, and home buying guidance — all at no charge for initial consultations.',
    icon: 'building',
    category: 'real-estate',
    price: 'Free',
    priceNote: 'Initial consultation at no charge',
    features: [
      'Loan pre-approval assistance',
      'Refinancing analysis',
      'Debt planning strategies',
      'Home buying guidance'
    ],
    image: '/images/services/mortgage.jpg',
    featured: true,
    badge: 'Free Consult'
  }
] as const;

// Process Steps
export const PROCESS_STEPS = [
  {
    step: 1,
    title: 'Schedule a Free Consultation',
    description: 'Meet with an expert tax advisor in person, over the phone, or via Zoom.',
    icon: 'calendar'
  },
  {
    step: 2,
    title: 'Submit Your Tax Paperwork',
    description: 'Provide us with your paperwork via email or in-person.',
    icon: 'document'
  },
  {
    step: 3,
    title: 'File With Confidence',
    description: 'Our team will take care of all the paperwork and filings.',
    icon: 'check'
  },
  {
    step: 4,
    title: 'Post-Filing Tax Support',
    description: 'Our team will assist in any audits or IRS communication.',
    icon: 'support'
  }
] as const;

// Team Members
// Note: Credentials, license numbers, and social links below are populated only
// where publicly verifiable. Items marked with `null`/empty are pending client
// confirmation (see PENDING CLIENT INPUT in CHANGELOG.md).
export const TEAM_MEMBERS = [
  {
    id: 'sam-eram',
    name: 'Sam Eram',
    title: 'Chief Financial Officer',
    credentials: 'Tax Preparation & Financial Services',
    bio: 'Leads tax planning, filing, and financial strategy for individuals and businesses at 1Way Home Services.',
    image: '/images/Sam_Eram_Headshot.PNG',
    licenseNumber: null,
    licenseAuthority: null,
    socialLinks: [] as { type: string; url: string }[],
  },
  {
    id: 'bakhan-kareem',
    name: 'Bakhan Kareem',
    title: 'Chief Executive Officer',
    credentials: 'Real Estate & Mortgage Consulting · California DRE License #02223420',
    bio: 'San Diego County REALTOR® leading real estate and mortgage services at 1Way Home Real Estate and Mortgage Services Inc.',
    image: '/images/Bakhan_Kareem_Headshot.PNG',
    licenseNumber: '02223420',
    licenseAuthority: 'California Department of Real Estate',
    socialLinks: [
      { type: 'LinkedIn', url: 'https://www.linkedin.com/in/bakhan-kareem-1657842a5/' },
      { type: 'Instagram', url: 'https://www.instagram.com/bakhan.sdrealtor/' },
    ],
  }
] as const;

// Contact Information
// Address, email, and legal entity name verified against client's public website
// (1wayhomeservices.com) and California Secretary of State business records.
// reviewVerifiedDate stamps the last time the Google review count was confirmed —
// update on each verification pass so LLMs see a recency signal.
export const CONTACT_INFO = {
  name: '1Way Home Services',
  businessName: '1Way Home Services',
  legalEntityName: '1 Way Home Real Estate and Mortgage Services Inc.',
  tagline: 'Tax Preparation & Real Estate Services',
  phone: '(619) 716-9193',
  phoneFormatted: '(619) 716-9193',
  phoneTel: '+16197169193',
  phoneHref: 'tel:+16197169193',
  email: 'sam@1wayhomeservices.com',
  emailHref: 'mailto:sam@1wayhomeservices.com',
  // Verified against client's public website
  address: '250 E Chase Ave, Suite 107, El Cajon, CA 92020',
  addressParts: {
    streetAddress: '250 E Chase Ave, Suite 107',
    locality: 'El Cajon',
    region: 'CA',
    postalCode: '92020',
    country: 'US',
  },
  hours: {
    regular: 'By Appointment',
    consultation: 'Free Initial Consultation Available'
  },
  serviceArea: 'El Cajon, San Diego, and surrounding areas',
  website: 'https://1wayhomeservices.vercel.app',
  yearsInBusiness: 6,
  repeatCustomers: 100,
  satisfactionRate: 100,
  // Google Business — verified review data (source of truth for JSON-LD + trust badges)
  reviewCount: 416,
  reviewRating: 5.0,
  reviewVerifiedDate: '2026-04-22',
  googleReviewsUrl: 'https://www.google.com/search?q=1wayhomeservices+el+cajon#lrd=0x80d959b762e109ad:0x48deced3a0f716dc,1',
  // Verified company social profiles
  socialLinks: [
    { type: 'LinkedIn', url: 'https://www.linkedin.com/company/1-way-home-real-estate-and-mortgage-services-inc' },
  ],
} as const;

// Stats
export const STATS = [
  { value: '100+', label: 'Repeat Customers' },
  { value: '6', label: 'Years in Business' },
  { value: '100%', label: 'Client Satisfaction' }
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    id: 1,
    quote: '"Sam" is the best! So welcoming and knows what he\'s doing! He\'s helped me with my taxes, running loan numbers and starting my business. Great guy and helps with whatever you need when it comes to taxes, real estate and business. I will keep coming back.',
    author: 'Jennifer R.',
    role: 'Business Owner',
    location: 'El Cajon, CA',
    rating: 5,
    service: 'Tax Planning & Business Formation',
    image: '/testimonials/jennifer-r.jpg' // Placeholder - replace with actual image
  },
  {
    id: 2,
    quote: 'I was facing an IRS audit and didn\'t know where to turn. Sam represented me professionally and got the penalties completely waived. His expertise saved me over $4,200 in potential fines. Couldn\'t be happier with the outcome!',
    author: 'Michael T.',
    role: 'Real Estate Investor',
    location: 'San Diego, CA',
    rating: 5,
    service: 'IRS Audit Defense',
    result: 'Saved $4,200 in penalties',
    image: '/testimonials/michael-t.jpg'
  },
  {
    id: 3,
    quote: 'As a small business owner, bookkeeping was taking up too much of my time. 1Way Home Services handles everything - from monthly reconciliation to quarterly tax filings. My financials have never been cleaner and I can focus on growing my business.',
    author: 'Sarah K.',
    role: 'Small Business Owner',
    location: 'La Mesa, CA',
    rating: 5,
    service: 'Bookkeeping & Payroll',
    result: 'Saves 10+ hours per month',
    image: '/testimonials/sarah-k.jpg'
  },
  {
    id: 4,
    quote: 'Fast, professional, and thorough. They completed my tax return in just 3 days and found deductions I didn\'t even know existed. Got back $1,850 more than I expected. Will definitely use them again next year!',
    author: 'David L.',
    role: 'W-2 Employee',
    location: 'Santee, CA',
    rating: 5,
    service: 'Individual Tax Filing',
    result: 'Additional $1,850 refund',
    image: '/testimonials/david-l.jpg'
  },
  {
    id: 5,
    quote: 'Working as a freelance designer, my taxes were a mess. Sam helped me set up quarterly estimated payments and maximize my home office deduction. No more surprises at tax time - everything is organized and stress-free now.',
    author: 'Lisa M.',
    role: 'Freelance Designer',
    location: 'El Cajon, CA',
    rating: 5,
    service: 'Quarterly Tax Planning',
    result: 'Eliminated tax surprises',
    image: '/testimonials/lisa-m.jpg'
  },
  {
    id: 6,
    quote: 'Bakhan guided us through a 1031 exchange on our investment property. His knowledge of real estate tax law saved us from a huge capital gains hit. The process was smooth and we reinvested tax-free. Highly recommend for real estate investors!',
    author: 'Robert & Patricia P.',
    role: 'Property Investors',
    location: 'San Diego, CA',
    rating: 5,
    service: '1031 Exchange Guidance',
    result: 'Tax-deferred $85,000 capital gain',
    image: '/testimonials/robert-p.jpg'
  },
  {
    id: 7,
    quote: 'Buying our first home was overwhelming, but the team at 1Way made the tax side simple. They explained mortgage interest deductions, property tax implications, and connected us with a great lender. Made the whole process less stressful!',
    author: 'Amanda H.',
    role: 'First-Time Homebuyer',
    location: 'El Cajon, CA',
    rating: 5,
    service: 'Mortgage Consulting',
    result: 'Smooth first-home purchase',
    image: '/testimonials/amanda-h.jpg'
  }
] as const;

// FAQ Items
// Answers are sourced from existing service-page content and the client's own
// public service descriptions. Kept concrete and standalone so each one reads
// as a complete, citable answer for LLM snippet extraction.
export const FAQ_ITEMS = [
  {
    question: 'How long does tax preparation take at 1Way Home Services?',
    answer: 'Most individual returns are completed within 5–7 business days from when we receive all your documents at our El Cajon office. Straightforward W-2 returns often wrap up in 2–3 days. Complex returns — self-employed, rental property, or multi-state — may take a little longer.'
  },
  {
    question: 'Do I have to come in person, or can the entire process be done remotely?',
    answer: 'The full process can be done virtually. We offer Zoom or phone consultations, secure document upload, remote review, and e-signature. Many of our tax clients we have never met in person. In-person appointments are also available at our El Cajon office at 250 E Chase Ave, Suite 107.'
  },
  {
    question: 'Do you offer free consultations?',
    answer: 'Yes. Initial consultations are free for both tax services and mortgage consulting. You can meet with us in person at our El Cajon office, by phone, or via Zoom — whichever fits your schedule.'
  },
  {
    question: 'What areas does 1Way Home Services serve?',
    answer: 'We are based in El Cajon and primarily serve clients across San Diego County, including El Cajon, San Diego, La Mesa, and Santee. We also work with clients beyond San Diego County for tax matters where remote service is appropriate.'
  },
  {
    question: 'Can you help with past-due tax returns?',
    answer: 'Yes. We help clients catch up on back taxes — one year or several — and can request transcripts from the IRS to reconstruct missing records. If you owe, we can negotiate installment plans or pursue penalty abatement on your behalf.'
  },
  {
    question: 'What happens if the IRS contacts me after you file my return?',
    answer: 'For returns we file, we respond on your behalf at no additional cost, year-round. Forward any IRS notice or audit inquiry to us and we will handle the communication and resolution directly with the IRS. Filing with us does not end in April — it covers you until the next one.'
  },
  {
    question: 'Can you help with real estate investment taxes and 1031 exchanges?',
    answer: 'Yes. Real estate tax support is a core part of what we do. We provide capital gains planning, 1031 exchange guidance, depreciation strategies, and property-sale tax planning for individual investors and landlords across San Diego County.'
  },
  {
    question: 'What if I owe taxes and cannot pay in full?',
    answer: 'We will show you exactly what you owe and walk through the available options — IRS installment plans, offer-in-compromise, hardship deferral — and help you set up the one that fits your situation. Past-due-return resolution is a service we handle regularly.'
  }
] as const;

// SEO Keywords
export const SEO_KEYWORDS = {
  primary: [
    'tax preparation San Diego',
    'tax advisor El Cajon',
    'bookkeeping services',
    'payroll tax filing',
    'IRS audit support'
  ],
  secondary: [
    'real estate tax planning',
    'capital gains calculator',
    '1031 exchange advisor',
    'mortgage pre-approval',
    'small business tax'
  ],
  location: [
    'El Cajon tax preparation',
    'San Diego tax services',
    'San Diego County tax advisor'
  ]
} as const;

// Animation Configurations
export const ANIMATION_CONFIG = {
  spring: {
    default: { tension: 300, friction: 30 },
    gentle: { tension: 120, friction: 14 },
    wobbly: { tension: 180, friction: 12 },
    stiff: { tension: 210, friction: 20 }
  },
  duration: {
    fast: 200,
    medium: 400,
    slow: 600,
    slower: 1000
  },
  easing: {
    default: 'ease-out',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    smooth: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
  }
} as const;
