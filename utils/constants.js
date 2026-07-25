/**
 * MathSpark — Global Constants
 * Single source of truth for all magic strings used across the codebase.
 */

// ── User Roles ──────────────────────────────────────────────────────────────
export const ROLES = {
  ADMIN:   'admin',
  STUDENT: 'student',
};

// ── Tute / Courier Tracking Status ─────────────────────────────────────────
export const TUTE_STATUS = {
  PROCESSING:  'Processing',
  DISPATCHED:  'Dispatched',
  IN_TRANSIT:  'In Transit',
  DELIVERED:   'Delivered',
};

// ── Payment Status Codes (PayHere) ─────────────────────────────────────────
export const PAYMENT_STATUS = {
  SUCCESS:     '2',
  PENDING:     '0',
  CANCELLED:   '-1',
  FAILED:      '-2',
  CHARGEDBACK: '-3',
};

// ── Course Medium Options ───────────────────────────────────────────────────
export const MEDIUMS = {
  SINHALA: 'sinhala',
  ENGLISH: 'english',
};

// ── Grade Options ───────────────────────────────────────────────────────────
export const GRADE_OPTIONS = [6, 7, 8, 9, 10, 11];

// ── Currency ────────────────────────────────────────────────────────────────
export const CURRENCY = 'LKR';

// ── PayHere Defaults ────────────────────────────────────────────────────────
export const PAYHERE_DEFAULTS = {
  COUNTRY:  'Sri Lanka',
  CITY:     'Colombo',
  ADDRESS:  'Sri Lanka',
  EMAIL:    'student@mathspark.lk',
  PHONE:    '0712345678',
};

// ── Site Info ───────────────────────────────────────────────────────────────
export const SITE_NAME = 'MathSpark';
export const SITE_TAGLINE = 'Ignite Your Math Skills';
