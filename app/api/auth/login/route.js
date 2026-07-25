import { NextResponse } from 'next/server';
import { comparePassword, signToken, setAuthCookie } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request) {
  try {
    const { phone, password } = await request.json();

    // Validate input
    if (!phone || !password) {
      return NextResponse.json({ error: 'Phone number and password are required.' }, { status: 400 });
    }

    // Normalise phone (remove spaces, leading 0, country code)
    const normalised = phone.replace(/\s/g, '').replace(/^\+94/, '0').replace(/^94/, '0');

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

    // Sign JWT
    const token = signToken({
      id: student.id,
      name: student.name,
      phone: student.phone,
      grade: student.grade,
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
