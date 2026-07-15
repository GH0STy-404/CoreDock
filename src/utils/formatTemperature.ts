/**
 * Formats a temperature value to Celsius string format.
 * Example: 350 -> "350°C"
 */
export function formatTemperature(temp: number | string): string {
  const str = String(temp).replace(/[^\d]/g, '');
  if (!str) return String(temp);
  return `${str}°C`;
}
