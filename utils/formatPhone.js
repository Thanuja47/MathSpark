/**
 * MathSpark — Phone Formatting Utilities
 * Centralises all phone number normalisation logic.
 */

/**
 * Normalise any Sri Lankan phone number to 0XXXXXXXXX (10 digits with leading zero).
 * Handles: 0712345678 | 712345678 | +94712345678 | 94712345678
 *
 * @param {string} phone - Raw phone input from form or API
 * @returns {string} Normalised phone number e.g. "0712345678"
 */
export function normalisePhone(phone) {
  let n = String(phone).replace(/[\s\-()]/g, ''); // strip spaces, dashes, brackets
  if (n.startsWith('+94')) n = '0' + n.slice(3);
  else if (n.startsWith('94') && n.length === 11) n = '0' + n.slice(2);
  else if (!n.startsWith('0')) n = '0' + n; // e.g. 712345678 → 0712345678
  return n;
}

/**
 * Format a phone number for display: 0712345678 → 071 234 5678
 *
 * @param {string} phone - Normalised phone number
 * @returns {string} Display-formatted phone
 */
export function formatPhoneDisplay(phone) {
  const n = normalisePhone(phone);
  if (n.length === 10) {
    return `${n.slice(0, 3)} ${n.slice(3, 6)} ${n.slice(6)}`;
  }
  return n;
}
