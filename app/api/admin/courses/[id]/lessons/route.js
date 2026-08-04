export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ROLES } from '@/utils/constants';

// GET /api/admin/courses/[id]/lessons — list all lessons for a course
export async function GET(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id } = params;
    const lessons = await db.courseLessons.byCourseId(id);
    return NextResponse.json({ success: true, lessons });
  } catch (err) {
    console.error('[GET /api/admin/courses/[id]/lessons]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

// POST /api/admin/courses/[id]/lessons — create lesson for a course
export async function POST(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id: courseId } = params;
    const body = await request.json();
    const { title, order, description, pdfUrl, videoUrl } = body;

    if (!title) {
      return NextResponse.json({ error: 'Lesson title is required.' }, { status: 400 });
    }

    const lesson = await db.courseLessons.create({
      courseId,
      order: Number(order || 0),
      title,
      description,
      pdfUrl,
      videoUrl,
    });

    return NextResponse.json({ success: true, lesson }, { status: 201 });
  } catch (err) {
    console.error('[POST /api/admin/courses/[id]/lessons]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
