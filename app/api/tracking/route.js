export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/tracking?id=MSP-9842
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id')?.trim().toUpperCase();

  if (!id) {
    return NextResponse.json({ error: 'Tracking ID is required.' }, { status: 400 });
  }

  // Search by tracking ID
  let record = await db.tracking.get(id);

  // Also search by phone
  if (!record) {
    record = await db.tracking.findByPhone(id);
  }

  if (!record) {
    return NextResponse.json({ error: 'No delivery found for this tracking ID or phone number.' }, { status: 404 });
  }

  return NextResponse.json({ success: true, tracking: record });
}

// POST /api/tracking — admin add/update tracking
export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.id || !data.student) {
      return NextResponse.json({ error: 'Tracking ID and student name are required.' }, { status: 400 });
    }
    const record = { ...data, updatedAt: new Date().toISOString() };
    await db.tracking.set(data.id.toUpperCase(), record);
    return NextResponse.json({ success: true, tracking: record });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
