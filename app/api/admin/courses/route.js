export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

function verifyAdmin(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return { authorized: false, error: 'Unauthorized: No token provided.', status: 401 };
  }
  // Allow admin user role or admin phone number
  if (user.role !== 'admin' && user.phone !== '0712345678') {
    return { authorized: false, error: 'Forbidden: Admin access required.', status: 403 };
  }
  return { authorized: true, user };
}

// GET /api/admin/courses — fetch all courses
export async function GET(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const courses = await db.courses.all();
    return NextResponse.json(courses);
  } catch (e) {
    console.error('[GET /api/admin/courses]', e);
    return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
  }
}

// POST /api/admin/courses — create a new course
export async function POST(request) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const data = await request.json();
    if (!data.title || data.price === undefined || data.grade === undefined) {
      return NextResponse.json({ error: 'Title, Grade, and Price are required.' }, { status: 400 });
    }

    const newCourse = await db.courses.create(data);
    return NextResponse.json(newCourse, { status: 201 });
  } catch (e) {
    console.error('[POST /api/admin/courses]', e);
    return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
  }
}
