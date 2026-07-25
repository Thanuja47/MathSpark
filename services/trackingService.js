/**
 * MathSpark — Tracking Service
 * All API calls related to tute courier tracking.
 */

/**
 * Look up a tute tracking record by tracking ID or phone number.
 * @param {string} query - Tracking ID (e.g. "MSP-9842") or phone number
 * @returns {Promise<{record?: object, error?: string}>}
 */
export async function getTracking(query) {
  const res = await fetch(`/api/tracking?q=${encodeURIComponent(query)}`);
  return res.json();
}

/**
 * Update a tracking record status (admin only).
 * @param {object} data - { id, status, courier?, studentName?, phone?, item? }
 * @returns {Promise<{success: boolean, record?: object, error?: string}>}
 */
export async function updateTracking(data) {
  const res = await fetch('/api/tracking', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify(data),
  });
  return res.json();
}
