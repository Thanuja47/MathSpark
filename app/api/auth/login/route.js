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

    // Normalise phone → always store/lookup as 0XXXXXXXXX
    let normalised = phone.replace(/[\s\-]/g, '');     // strip spaces/dashes
    if (normalised.startsWith('+94')) normalised = '0' + normalised.slice(3);
    else if (normalised.startsWith('94') && normalised.length === 11) normalised = '0' + normalised.slice(2);
    else if (!normalised.startsWith('0')) normalised = '0' + normalised; // e.g. 712345678 → 0712345678

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
