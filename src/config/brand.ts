export const BRAND_CONFIG = {
  companyName: 'Coredock Lab',
  productLine: 'Apex Series',
  tagline: 'Precision Industrial Additive Manufacturing Systems',
  foundedYear: 2022,
  headquarters: 'Bengaluru, India',
  certifications: [
    { id: 'iso9001', name: 'ISO 9001:2015 Certified', desc: 'Quality Management Systems' },
    { id: 'ce', name: 'CE Compliant', desc: 'European Safety & Health Conformity' },
    { id: 'rohs', name: 'RoHS Directive', desc: 'Restriction of Hazardous Substances' }
  ],
  support: {
    email: 'support@coredocklab.com',
    salesEmail: 'sales@coredocklab.com',
    phone: '+91 (80) 4900-3400',
    hours: 'Monday - Friday, 09:00 - 18:00 (IST)',
    address: 'Coredock Lab Research Park, Phase 1, Whitefield, Bengaluru, India'
  },
  socials: {
    linkedin: 'https://linkedin.com/company/coredocklab',
    twitter: 'https://twitter.com/coredocklab',
    youtube: 'https://youtube.com/c/coredocklab',
    github: 'https://github.com/coredocklab'
  },
  brandHierarchy: [
    { name: 'Apex Series', desc: 'Industrial 3D Printers', active: true },
    { name: 'Materials Lab', desc: 'Engineering Polymer Development', active: false },
    { name: 'Coredock Cloud', desc: 'Additive Manufacturing Fleet Management', active: false }
  ],
  warranty: {
    standardPeriod: '1 Year Industrial Warranty',
    extendedOptions: 'Available up to 3 Years',
    onSiteService: '48-hour SLA for critical systems'
  }
};
