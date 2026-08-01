export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const students = await db.students.all();
    // Exclude passwordHash from response
    const safeStudents = students.map(({ passwordHash, ...s }) => s);
    return NextResponse.json(safeStudents);
  } catch (e) {
    console.error('[GET /api/students]', e);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}
