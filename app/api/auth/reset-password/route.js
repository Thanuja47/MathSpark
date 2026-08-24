export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { hashPassword } from '@/lib/auth';
import { db } from '@/lib/db';
import { normalisePhone } from '@/utils/formatPhone';
import { isOtpVerified, clearOtpState } from '@/lib/otpStore';

export async function POST(request) {
  try {
    const { phone, newPassword } = await request.json();

    if (!phone || !newPassword) {
      return NextResponse.json({ error: 'Phone number and new password are required.' }, { status: 400 });
    }

    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const normalised = normalisePhone(phone);

    // Verify that OTP was verified for this phone
    if (!isOtpVerified(normalised)) {
      return NextResponse.json({ error: 'Phone number has not been verified via OTP. Please request and verify OTP first.' }, { status: 403 });
    }

    // Check if student exists
    const student = await db.students.findByPhone(normalised);
    if (!student) {
      return NextResponse.json({ error: 'No account found with this WhatsApp number.' }, { status: 444 });
    }

    // Hash new password and update record
    const passwordHash = await hashPassword(newPassword);
    await db.students.updatePassword(student.id, passwordHash);

    // Clear OTP verification state after successful reset
    clearOtpState(normalised);

    return NextResponse.json({ success: true, message: 'Password reset successfully. You can now login.' });

  } catch (err) {
    console.error('[/api/auth/reset-password]', err);
    return NextResponse.json({ error: 'Failed to reset password.' }, { status: 500 });
  }
}
