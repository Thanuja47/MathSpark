/**
 * MathSpark — Date Formatting Utilities
 */

/**
 * Format an ISO date string or Date object to "Month DD, YYYY"
 * e.g. "2026-07-23T..." → "July 23, 2026"
 *
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year:  'numeric',
    month: 'long',
    day:   'numeric',
  });
}

/**
 * Format an ISO date string to short date: "23 Jul 2026"
 *
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateShort(date) {
  return new Date(date).toLocaleDateString('en-GB', {
    year:  'numeric',
    month: 'short',
    day:   'numeric',
  });
}

/**
 * Returns "Today", "Yesterday", or a formatted date string.
 *
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateRelative(date) {
  const d = new Date(date);
  const now = new Date();
  const diff = Math.floor((now - d) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Yesterday';
  return formatDate(date);
}
