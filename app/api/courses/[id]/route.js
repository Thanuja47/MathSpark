export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PUT(req, { params }) {
  try {
    const data = await req.json();
    const course = await db.courses.update(params.id, data);
    return NextResponse.json(course);
  } catch (e) {
    console.error('[PUT /api/courses/[id]]', e);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    await db.courses.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('[DELETE /api/courses/[id]]', e);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
