export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { sendOtp } from '@/lib/otpStore';

export async function POST(request) {
  try {
    const { phone } = await request.json();
    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }

    const res = await sendOtp(phone);
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ error: err.message || 'Failed to send OTP.' }, { status: 400 });
  }
}
