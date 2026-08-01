export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { hashPassword, signToken, setAuthCookie } from '@/lib/auth';
import { db } from '@/lib/db';
import { normalisePhone } from '@/utils/formatPhone';
import { ROLES } from '@/utils/constants';

export async function POST(request) {
  try {
    const { name, phone, grade, medium, password } = await request.json();

    // Validate
    if (!name || !phone || !password || !grade) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Password must be at least 6 characters.' }, { status: 400 });
    }

    const normalised = normalisePhone(phone);

    // Check if already registered
    const exists = await db.students.exists(normalised);
    if (exists) {
      return NextResponse.json({ error: 'An account with this WhatsApp number already exists.' }, { status: 409 });
    }

    // Hash password & create student
    const passwordHash = await hashPassword(password);
    const student = await db.students.create({
      name: name.trim(),
      phone: normalised,
      passwordHash,
      grade: parseInt(grade, 10),
      medium: medium || 'sinhala',
      role: ROLES.STUDENT,
      enrolledCourses: [],
    });

    // Sign token & set cookie
    const token = signToken({ id: student.id, name: student.name, phone: student.phone, grade: student.grade });

    const response = NextResponse.json({
      success: true,
      user: { id: student.id, name: student.name, phone: student.phone, grade: student.grade, medium: student.medium, role: student.role },
    }, { status: 201 });

    response.headers.set('Set-Cookie', setAuthCookie(token));
    return response;

  } catch (err) {
    console.error('[/api/auth/register]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
