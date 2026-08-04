export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated.' }, { status: 401 });
    }

    const lessons = await db.lessons.all();
    return NextResponse.json({ success: true, lessons });
  } catch (err) {
    console.error('[GET /api/lessons]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
