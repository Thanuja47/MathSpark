export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ROLES } from '@/utils/constants';

export async function GET(request) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const students = await db.students.allWithGrades();
    const formatted = students.map(s => ({
      id: s.id,
      name: s.name,
      phone: s.phone,
      grade: s.grade,
      medium: s.medium,
      role: s.role,
      createdAt: s.createdAt,
      approvedGrades: (s.gradeAccess || []).map(g => g.gradeId),
    }));

    return NextResponse.json({ success: true, students: formatted });
  } catch (err) {
    console.error('[GET /api/admin/students]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
