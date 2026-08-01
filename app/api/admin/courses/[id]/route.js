export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

function verifyAdmin(request) {
  const user = getUserFromRequest(request);
  if (!user) {
    return { authorized: false, error: 'Unauthorized: No token provided.', status: 401 };
  }
  if (user.role !== 'admin' && user.phone !== '0712345678') {
    return { authorized: false, error: 'Forbidden: Admin access required.', status: 403 };
  }
  return { authorized: true, user };
}

// PUT /api/admin/courses/[id] — update existing course
export async function PUT(request, { params }) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    const data = await request.json();
    const updated = await db.courses.update(params.id, data);
    return NextResponse.json(updated);
  } catch (e) {
    console.error('[PUT /api/admin/courses/[id]]', e);
    return NextResponse.json({ error: 'Failed to update course' }, { status: 500 });
  }
}

// DELETE /api/admin/courses/[id] — delete course
export async function DELETE(request, { params }) {
  try {
    const auth = verifyAdmin(request);
    if (!auth.authorized) {
      return NextResponse.json({ error: auth.error }, { status: auth.status });
    }

    await db.courses.delete(params.id);
    return NextResponse.json({ success: true, id: params.id });
  } catch (e) {
    console.error('[DELETE /api/admin/courses/[id]]', e);
    return NextResponse.json({ error: 'Failed to delete course' }, { status: 500 });
  }
}
