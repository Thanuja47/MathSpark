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

  const response = NextResponse.json({
    user: {
      id:              student.id,
      name:            student.name,
      phone:           student.phone,
      grade:           student.grade,
      medium:          student.medium,
      role:            student.role,
      enrolledCourses: student.enrolledCourses,
      approvedGrades,
      // Full gradeAccess records so client can check grade+month combos
      gradeAccess:     student.gradeAccess || [],
    },
  });
  response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  response.headers.set('Pragma', 'no-cache');
  response.headers.set('Expires', '0');
  return response;
}

// POST /api/auth/me — logout (clear cookie)
export async function POST() {
  const response = NextResponse.json({ success: true, message: 'Logged out.' });
  response.headers.set('Set-Cookie', clearAuthCookie());
  return response;
}
