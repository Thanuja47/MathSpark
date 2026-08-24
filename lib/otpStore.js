/**
 * In-Memory OTP & Rate Limiting Store
 * Store format: Map<phone, { code: string, expiresAt: number, verified: boolean, attempts: number[], lastVerifiedAt?: number }>
 */

import { normalisePhone } from '@/utils/formatPhone';
import { sendSmsGoOtp } from './sms';

// Global singleton map to survive hot-reloads in Next.js dev server
if (!globalThis.__otpStore) {
  globalThis.__otpStore = new Map();
}
const otpStore = globalThis.__otpStore;

const OTP_TTL_MS = 5 * 60 * 1000; // 5 minutes
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_SENDS_PER_WINDOW = 3;

export async function sendOtp(rawPhone) {
  const phone = normalisePhone(rawPhone);
  const now = Date.now();

  const record = otpStore.get(phone) || { attempts: [], code: null, expiresAt: 0, verified: false };

  // Filter attempts within the 15-minute window
  const recentAttempts = record.attempts.filter(timestamp => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentAttempts.length >= MAX_SENDS_PER_WINDOW) {
    const oldest = recentAttempts[0];
    const waitSeconds = Math.ceil((RATE_LIMIT_WINDOW_MS - (now - oldest)) / 1000);
    const waitMinutes = Math.ceil(waitSeconds / 60);
    throw new Error(`Rate limit exceeded. Maximum 3 OTPs per 15 minutes. Please wait ${waitMinutes} minute(s).`);
  }

  // Generate 6-digit OTP code
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = now + OTP_TTL_MS;

  recentAttempts.push(now);

  otpStore.set(phone, {
    code,
    expiresAt,
    verified: false,
    attempts: recentAttempts,
  });

  // Send via SMSGo.lk
  await sendSmsGoOtp(phone, code);

  return { success: true, message: 'OTP sent successfully.' };
}

export function verifyOtp(rawPhone, inputCode) {
  const phone = normalisePhone(rawPhone);
  const record = otpStore.get(phone);

  if (!record || !record.code) {
    throw new Error('No OTP requested for this phone number. Please request a new code.');
  }

  if (Date.now() > record.expiresAt) {
    throw new Error('OTP code has expired. Please request a new code.');
  }

  if (record.code !== String(inputCode).trim()) {
    throw new Error('Invalid OTP code. Please check and try again.');
  }

  // Mark verified
  record.verified = true;
  record.verifiedAt = Date.now();
  otpStore.set(phone, record);

  return { success: true, message: 'OTP verified successfully.' };
}

export function isOtpVerified(rawPhone) {
  const phone = normalisePhone(rawPhone);
  const record = otpStore.get(phone);
  if (!record) return false;
  // OTP verification valid for 15 minutes after verification
  return record.verified && (Date.now() - (record.verifiedAt || 0) < 15 * 60 * 1000);
}

export function clearOtpState(rawPhone) {
  const phone = normalisePhone(rawPhone);
  const record = otpStore.get(phone);
  if (record) {
    record.verified = false;
    record.code = null;
    otpStore.set(phone, record);
  }
}
