export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const results = await db.results.all();
    return NextResponse.json(results);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch results' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const result = await db.results.create(data);
    return NextResponse.json(result, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create result' }, { status: 500 });
  }
}
