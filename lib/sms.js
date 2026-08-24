/**
 * SMSGo.lk API Integration Utility
 * Endpoint: POST https://api.smsgo.lk/api/v1/sms/send
 * Header: X-API-Key: [SMS_API_KEY]
 * Body: { "to": "94XXXXXXXXX", "message": "...", "mask": "MathSpark" }
 */

import { normalisePhone } from '@/utils/formatPhone';

export async function sendSmsGoOtp(phone, otpCode) {
  const apiKey = process.env.SMS_API_KEY;
  const normalised = normalisePhone(phone); // 07XXXXXXXX -> 947XXXXXXXX conversion or similar

  // Convert 07XXXXXXXX to 947XXXXXXXX format for SMSGo.lk
  let formattedPhone = normalised;
  if (formattedPhone.startsWith('0')) {
    formattedPhone = '94' + formattedPhone.slice(1);
  } else if (!formattedPhone.startsWith('94') && formattedPhone.length === 9) {
    formattedPhone = '94' + formattedPhone;
  }

  const message = `Your MathSpark verification code is: ${otpCode}. Valid for 5 minutes. Do not share this code with anyone.`;

  console.log(`[SMSGo.lk] Sending OTP to ${formattedPhone}...`);

  if (!apiKey) {
    console.warn(`[SMSGo.lk WARNING] SMS_API_KEY environment variable is not set. OTP ${otpCode} for ${formattedPhone} logged to console for testing.`);
    return { success: true, simulated: true, otpCode };
  }

  const payload = {
    to: formattedPhone,
    message: message,
    mask: process.env.SMS_MASK || 'SMSGo',
  };

  try {
    const res = await fetch('https://api.smsgo.lk/api/v1/sms/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': apiKey,
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (!res.ok || data.status === 'error' || data.error) {
      console.error('[SMSGo.lk Error Response]', data);
      throw new Error(data.message || data.error || 'Failed to send SMS via SMSGo.lk');
    }

    return { success: true, data };
  } catch (err) {
    console.error('[SMSGo.lk Exception]', err);
    throw err;
  }
}
