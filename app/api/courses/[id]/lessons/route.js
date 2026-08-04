export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/courses/[id]/lessons — public listing of lessons for a course
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const lessons = await db.courseLessons.byCourseId(id);
    return NextResponse.json({ success: true, lessons });
  } catch (err) {
    console.error('[GET /api/courses/[id]/lessons]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
