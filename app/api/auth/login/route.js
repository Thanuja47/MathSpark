export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { normalisePhone } from '@/utils/formatPhone';

export async function POST(request) {
  try {
    const { phone, password } = await request.json();

    // Validate input
    if (!phone || !password) {
      return NextResponse.json({ error: 'Phone number and password are required.' }, { status: 400 });
    }

    // Normalise phone → always store/lookup as 0XXXXXXXXX
    const normalised = normalisePhone(phone);

    // Find student in DB
    const student = await db.students.findByPhone(normalised);
    if (!student) {
      return NextResponse.json({ error: 'No account found with this WhatsApp number.' }, { status: 401 });
    }

    // Verify password
    const valid = await comparePassword(password, student.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: 'Incorrect password. Please try again.' }, { status: 401 });
    }

    // Sign JWT (include role so verifyAdmin helper receives it)
    const token = signToken({
      id: student.id,
      name: student.name,
      phone: student.phone,
      grade: student.grade,
      role: student.role || 'student',
    });

    // Return response with HttpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: student.id,
        name: student.name,
        phone: student.phone,
        grade: student.grade,
        medium: student.medium,
        role: student.role || 'student',
        enrolledCourses: student.enrolledCourses,
      },
    });

    response.headers.set('Set-Cookie', setAuthCookie(token));
    return response;

  } catch (err) {
    console.error('[/api/auth/login]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
