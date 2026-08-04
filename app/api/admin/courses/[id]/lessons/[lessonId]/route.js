export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ROLES } from '@/utils/constants';

// PUT /api/admin/courses/[id]/lessons/[lessonId] — update lesson
export async function PUT(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { lessonId } = params;
    const body = await request.json();

    const existing = await db.courseLessons.findById(lessonId);
    if (!existing) {
      return NextResponse.json({ error: 'Lesson not found.' }, { status: 404 });
    }

    const updated = await db.courseLessons.update(lessonId, body);
    return NextResponse.json({ success: true, lesson: updated });
  } catch (err) {
    console.error('[PUT /api/admin/courses/[id]/lessons/[lessonId]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// DELETE /api/admin/courses/[id]/lessons/[lessonId] — delete lesson
export async function DELETE(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { lessonId } = params;
    await db.courseLessons.delete(lessonId);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/admin/courses/[id]/lessons/[lessonId]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
