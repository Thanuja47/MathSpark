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
    const body = await request.json();
    const gradeItems = body.gradeItems || body.gradeIds;

    if (!Array.isArray(gradeItems)) {
      return NextResponse.json({ error: 'gradeItems must be an array.' }, { status: 400 });
    }

    const student = await db.students.findById(id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    await db.students.setApprovedGrades(id, gradeItems);
    const updatedStudent = await db.students.findByIdWithGrades(id);

    return NextResponse.json({
      success: true,
      message: 'Student grade access updated successfully.',
      approvedGrades: (updatedStudent.gradeAccess || []).map(g => g.gradeId),
      gradeAccess: updatedStudent.gradeAccess || []
    });
  } catch (err) {
    console.error('[PUT /api/admin/students/[id]/grades]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
