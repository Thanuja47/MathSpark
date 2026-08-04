export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ROLES } from '@/utils/constants';

export async function PUT(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id } = params;
    const { gradeIds } = await request.json();

    if (!Array.isArray(gradeIds)) {
      return NextResponse.json({ error: 'gradeIds must be an array.' }, { status: 400 });
    }

    const student = await db.students.findById(id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    await db.students.setApprovedGrades(id, gradeIds);
    const updatedApproved = await db.students.getApprovedGrades(id);

    return NextResponse.json({
      success: true,
      message: 'Student grade access updated successfully.',
      approvedGrades: updatedApproved
    });
  } catch (err) {
    console.error('[PUT /api/admin/students/[id]/grades]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
