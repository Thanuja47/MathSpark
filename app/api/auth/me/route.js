export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest, clearAuthCookie } from '@/lib/auth';
import { db } from '@/lib/db';

// GET /api/auth/me — return current logged-in user
export async function GET(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
  }
  const student = await db.students.findByIdWithGrades(user.id);
  if (!student) {
    return NextResponse.json({ error: 'User not found.' }, { status: 404 });
  }
  const approvedGrades = (student.gradeAccess || []).map(g => g.gradeId);

  return NextResponse.json({
    user: {
      id:              student.id,
      name:            student.name,
      phone:           student.phone,
      grade:           student.grade,
      medium:          student.medium,
      role:            student.role,
      enrolledCourses: student.enrolledCourses,
      approvedGrades,
    },
  });
}

// POST /api/auth/me — logout (clear cookie)
export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out.' });
  response.headers.set('Set-Cookie', clearAuthCookie());
  return response;
}
