/**
 * A lightweight utility to merge CSS classes conditionally.
 * Replaces heavy external dependencies like clsx/tailwind-merge for a faster footprint.
 */
export function cn(...inputs: (string | undefined | null | boolean | Record<string, boolean>)[]) {
  const classes: string[] = [];

  inputs.forEach((input) => {
    if (!input) return;

    if (typeof input === 'string') {
      classes.push(input);
    } else if (typeof input === 'object') {
      Object.entries(input).forEach(([key, value]) => {
        if (value) {
          classes.push(key);
        }
      });
    }
  });

  return classes.filter(Boolean).join(' ');
}
export default cn;
