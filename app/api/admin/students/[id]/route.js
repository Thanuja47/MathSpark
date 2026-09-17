export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ROLES } from '@/utils/constants';

export async function DELETE(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id } = params;
    if (!id) {
      return NextResponse.json({ error: 'Student ID is required.' }, { status: 400 });
    }

    const student = await db.students.findById(id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    // Protect administrator accounts from deletion via this route
    if (student.role === ROLES.ADMIN) {
      return NextResponse.json({ error: 'Cannot delete an administrator account.' }, { status: 400 });
    }

    await db.students.delete(id);

    return NextResponse.json({
      success: true,
      message: `Student '${student.name}' (${student.phone}) deleted successfully.`
    });
  } catch (err) {
    console.error('[DELETE /api/admin/students/[id]]', err);
    return NextResponse.json({ error: err.message || 'Internal server error.' }, { status: 500 });
  }
}
