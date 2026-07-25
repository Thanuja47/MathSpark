/**
 * MathSpark — Tracking Service
 * All API calls related to tute courier tracking.
 */

/**
 * Look up a tute tracking record by tracking ID (e.g. "MSP-9842") or phone number.
 * @param {string} query - Tracking ID or phone number
 * @returns {Promise<{record?: object, error?: string}>}
 */
export async function getTracking(query) {
  const res = await fetch(`/api/tracking?id=${encodeURIComponent(query)}`);
  const data = await res.json();
  // API returns { tracking: {...} } — normalise to { record }
  if (data.tracking) return { record: data.tracking };
  return data; // passthrough error
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
