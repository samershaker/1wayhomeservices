/**
 * 1Way Home Services Website Constants
 * Tax Preparation & Real Estate Services
 */

// Tax & Real Estate Services
export const SERVICES = [
  {
    id: 'tax-planning',
    name: 'Tax Planning & Advisory',
    slug: 'tax-planning',
    shortName: 'Tax Planning',
    description: 'Strategic tax planning to minimize liability and maximize deductions for individuals and businesses.',
    icon: 'calculator',
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
    description: 'Complete federal and state tax return preparation for individuals and businesses.',
    icon: 'document',
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
    description: 'Complete payroll tax management including quarterly and annual filings.',
    icon: 'payroll',
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
    description: 'Accurate and organized bookkeeping to keep your business financials in order.',
    icon: 'ledger',
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
    description: 'Professional representation and support during IRS audits, notices, and collections.',
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
    description: 'Specialized tax guidance for property sales, investments, and real estate transactions.',
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
    description: 'Expert mortgage guidance from pre-approval through closing and refinancing.',
    icon: 'loan',
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
    credentials: 'CPA | Tax Advisor',
    bio: 'Expert in tax planning, filing, and financial strategy for individuals and businesses.',
    image: '/team-photo.png'
  },
  {
    id: 'bakhan-kareem',
    name: 'Bakhan Kareem',
    title: 'Chief Executive Officer',
    credentials: 'Real Estate | Mortgage Specialist',
    bio: 'Leading real estate tax strategy and mortgage consulting for clients across San Diego.',
    image: '/team-photo.png'
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
    quote: '"Sam" is the best! So welcoming and knows what he\'s doing! He\'s helped me with my taxes, running loan numbers and starting my business. Great guy and helps with whatever you need when it comes to taxes, real estate and business. I will keep coming back.',
    author: 'Jennifer R.',
    role: 'Business Owner'
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
