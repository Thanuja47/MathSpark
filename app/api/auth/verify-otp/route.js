export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { verifyOtp } from '@/lib/otpStore';

export async function POST(request) {
  try {
    const { phone, code } = await request.json();
    if (!phone || !code) {
      return NextResponse.json({ error: 'Phone number and OTP code are required.' }, { status: 400 });
    }

    const res = verifyOtp(phone, code);
    return NextResponse.json(res);
  } catch (err) {
    return NextResponse.json({ error: err.message || 'OTP verification failed.' }, { status: 400 });
  }
}
