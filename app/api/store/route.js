export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const items = await db.store.all();
    return NextResponse.json(items);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch store items' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const data = await req.json();
    const item = await db.store.create(data);
    return NextResponse.json(item, { status: 201 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create store item' }, { status: 500 });
  }
}
