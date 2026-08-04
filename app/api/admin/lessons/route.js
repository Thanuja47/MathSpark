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

    const lessons = await db.lessons.all();
    return NextResponse.json(lessons);
  } catch (err) {
    console.error('[GET /api/admin/lessons]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const body = await request.json();
    const { title, gradeId, description, pdfUrl, videoUrl } = body;

    if (!title || !gradeId) {
      return NextResponse.json({ error: 'Title and Grade are required.' }, { status: 400 });
    }

    const lesson = await db.lessons.create({
      title,
      gradeId: Number(gradeId),
      description,
      pdfUrl,
      videoUrl,
    });

    return NextResponse.json(lesson, { status: 201 });
  } catch (err) {
    console.error('[POST /api/admin/lessons]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
