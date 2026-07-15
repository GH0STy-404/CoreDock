export const SITE_CONSTANTS = {
  activeLocales: ['en', 'de'] as const,
  defaultLocale: 'en' as const,
  supportedIndustries: ['Aerospace', 'Automotive', 'Medical', 'Engineering', 'Manufacturing', 'Robotics'] as const,
  contactReasons: [
    { value: 'quote', label: 'Request custom system quote' },
    { value: 'demo', label: 'Schedule system telemetry demo' },
    { value: 'dealer', label: 'Become an authorized B2B dealer' },
    { value: 'support', label: 'Operator maintenance support' }
  ]
};
