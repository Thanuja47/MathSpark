export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ROLES } from '@/utils/constants';

// POST — add a new grade+month access grant to a student
export async function POST(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { gradeId, month, expiresAt } = body;

    if (!gradeId) {
      return NextResponse.json({ error: 'gradeId is required.' }, { status: 400 });
    }

    const student = await db.students.findById(id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    await db.students.addGradeMonthAccess(id, gradeId, month || null, expiresAt || null);
    const updatedStudent = await db.students.findByIdWithGrades(id);

    return NextResponse.json({
      success: true,
      message: 'Access grant added successfully.',
      gradeAccess: (updatedStudent.gradeAccess || []).map(g => ({
        id: g.id,
        gradeId: g.gradeId,
        month: g.month || null,
        grantedAt: g.grantedAt,
        expiresAt: g.expiresAt || null,
      }))
    });
  } catch (err) {
    console.error('[POST /api/admin/students/[id]/grades]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE — remove a specific access grant by accessId
export async function DELETE(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();
    const { accessId } = body;

    if (!accessId) {
      return NextResponse.json({ error: 'accessId is required.' }, { status: 400 });
    }

    const student = await db.students.findById(id);
    if (!student) {
      return NextResponse.json({ error: 'Student not found.' }, { status: 404 });
    }

    await db.students.removeGradeMonthAccess(accessId);
    const updatedStudent = await db.students.findByIdWithGrades(id);

    return NextResponse.json({
      success: true,
      message: 'Access grant removed successfully.',
      gradeAccess: (updatedStudent.gradeAccess || []).map(g => ({
        id: g.id,
        gradeId: g.gradeId,
        month: g.month || null,
        grantedAt: g.grantedAt,
        expiresAt: g.expiresAt || null,
      }))
    });
  } catch (err) {
    console.error('[DELETE /api/admin/students/[id]/grades]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// PUT — legacy: replace all access grants (keep for backwards compat)
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
      gradeAccess: (updatedStudent.gradeAccess || []).map(g => ({
        id: g.id,
        gradeId: g.gradeId,
        month: g.month || null,
        grantedAt: g.grantedAt,
        expiresAt: g.expiresAt || null,
      }))
    });
  } catch (err) {
    console.error('[PUT /api/admin/students/[id]/grades]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}