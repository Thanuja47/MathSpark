export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';
import { ROLES } from '@/utils/constants';

export async function PUT(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id } = params;
    const body = await request.json();

    const existing = await db.lessons.findById(id);
    if (!existing) {
      return NextResponse.json({ error: 'Lesson not found.' }, { status: 404 });
    }

    const updated = await db.lessons.update(id, body);
    return NextResponse.json(updated);
  } catch (err) {
    console.error('[PUT /api/admin/lessons/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const currentUser = getUserFromRequest(request);
    if (!currentUser || currentUser.role !== ROLES.ADMIN) {
      return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 403 });
    }

    const { id } = params;
    await db.lessons.delete(id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[DELETE /api/admin/lessons/[id]]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
