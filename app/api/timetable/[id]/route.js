export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function DELETE(req, { params }) {
  try {
    await db.timetable.delete(params.id);
    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete timetable entry' }, { status: 500 });
  }
}
