import { ADDRESS_TRUNCATE_START, ADDRESS_TRUNCATE_END } from './constants';

/**
 * Shorten a Stellar address for display: GABC...XYZ
 */
export function shortenAddress(
  address: string,
  start = ADDRESS_TRUNCATE_START,
  end = ADDRESS_TRUNCATE_END
): string {
  if (!address || address.length <= start + end) return address;
  return `${address.slice(0, start)}...${address.slice(-end)}`;
}

/**
 * Format XLM balance with commas and fixed decimals.
 */
export function formatBalance(balance: string, decimals = 4): string {
  const num = parseFloat(balance);
  if (isNaN(num)) return '0.0000';
  return num.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/**
 * Format a timestamp string to a human-readable date/time.
 */
export function formatTimestamp(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

/**
 * Format a number as a compact string (e.g., 1.2K, 3.4M).
 */
export function formatCompact(value: number): string {
  return Intl.NumberFormat('en-US', { notation: 'compact' }).format(value);
}

/**
 * Truncate a transaction hash for display.
 */
export function shortenHash(hash: string, length = 8): string {
  if (!hash || hash.length <= length * 2) return hash;
  return `${hash.slice(0, length)}...${hash.slice(-length)}`;
}
