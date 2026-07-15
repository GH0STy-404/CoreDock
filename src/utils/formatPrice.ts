/**
 * Formats a number to USD price format.
 * Example: 12500 -> "$12,500"
 */
export function formatPrice(price: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0
  }).format(price);
}
