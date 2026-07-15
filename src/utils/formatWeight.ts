/**
 * Formats weights to kilograms format.
 * Example: 1.5 -> "1.5 kg"
 */
export function formatWeight(weight: number | string): string {
  const num = typeof weight === 'string' ? parseFloat(weight) : weight;
  if (isNaN(num)) return String(weight);
  return `${num.toFixed(1)} kg`;
}
