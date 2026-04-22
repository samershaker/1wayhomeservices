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
    images: ['tax-planning.jpg']
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
    images: ['tax-filing.jpg']
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
    images: ['payroll.jpg']
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
    images: ['bookkeeping.jpg']
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
    images: ['irs-help.jpg']
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
    images: ['real-estate.jpg']
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
    images: ['mortgage.jpg']
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
export const TEAM_MEMBERS = [
  {
    id: 'sam-eram',
    name: 'Sam Eram',
    title: 'Chief Financial Officer',
    credentials: 'Tax Preparation & Financial Services',
    bio: 'Expert in tax planning, filing, and financial strategy for individuals and businesses.',
    image: '/images/Sam_Eram_Headshot.PNG'
  },
  {
    id: 'bakhan-kareem',
    name: 'Bakhan Kareem',
    title: 'Chief Executive Officer',
    credentials: 'Real Estate & Mortgage Consulting',
    bio: 'Leading real estate tax strategy and mortgage consulting for clients across San Diego.',
    image: '/images/Bakhan_Kareem_Headshot.PNG'
  }
] as const;

// Contact Information
export const CONTACT_INFO = {
  name: '1Way Home Services',
  businessName: '1Way Home Services',
  tagline: 'Tax Preparation & Real Estate Services',
  phone: '(619) 716-9193',
  phoneFormatted: '(619) 716-9193',
  email: 'info@1wayhomeservices.com',
  address: 'El Cajon, San Diego, California',
  hours: {
    regular: 'By Appointment',
    consultation: 'Free Initial Consultation Available'
  },
  serviceArea: 'El Cajon, San Diego, and surrounding areas',
  website: 'https://1wayhomeservices.com',
  yearsInBusiness: 6,
  repeatCustomers: 100,
  satisfactionRate: 100
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
export const FAQ_ITEMS = [
  {
    question: 'How long does tax preparation take?',
    answer: 'Most tax returns are completed within 5-7 business days after all documents are submitted. Complex business returns may take longer.'
  },
  {
    question: 'Do you offer virtual consultations?',
    answer: 'Yes! We offer consultations in-person, over the phone, or via Zoom to accommodate your schedule and preferences.'
  },
  {
    question: 'What areas do you serve?',
    answer: 'We primarily serve El Cajon, San Diego, and surrounding areas. Contact us to confirm your location is within our service area.'
  },
  {
    question: 'Can you help with past-due tax returns?',
    answer: 'Absolutely. We specialize in helping clients catch up on past-due tax returns and can represent you in any IRS matters.'
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
