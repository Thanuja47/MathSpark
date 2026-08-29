export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    // Vercel Cron sends this header automatically; for manual calls require a secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    // If CRON_SECRET env var is set, validate it
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const deletedCount = await db.students.cleanupExpiredGrades();

    return NextResponse.json({
      success: true,
      deletedCount,
      cleanedAt: new Date().toISOString()
    });
  } catch (err) {
    console.error('[CRON /api/cron/cleanup-expired-grades]', err);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
