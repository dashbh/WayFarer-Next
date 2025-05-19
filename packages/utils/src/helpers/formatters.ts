/**
 * Format a number as currency
 */
export const formatCurrency = (value: number, currency: string = 'USD') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(value);
};

/**
 * Format a location string from parts
 */
export const formatLocation = (parts: (string | undefined)[]) => {
  return parts.filter(Boolean).join(', ');
};

/**
 * Format duration range (e.g., "3-5 days" or "7 days")
 */
export const formatDurationRange = (min: number, max: number) => {
  return min === max ? `${min} days` : `${min}-${max} days`;
};
