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

    const stats = await db.students.getStudentStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error('[GET /api/admin/students/stats]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
