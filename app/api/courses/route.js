export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const courses = await db.courses.all();
    return NextResponse.json(courses);
  } catch (e) {
    console.error('[GET /api/courses]', e);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const course = await db.courses.create(data);
    return NextResponse.json(course, { status: 201 });
  } catch (e) {
    console.error('[POST /api/courses]', e);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
