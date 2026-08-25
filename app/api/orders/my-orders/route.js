export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

export async function GET(request) {
  try {
    const authUser = getUserFromRequest(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const student = await db.students.findById(authUser.id);
    const phone = student?.phone || authUser.phone || '';

    // Fetch tracking / tute order deliveries for this student's phone
    const trackingRecords = await db.tracking.all();
    const myTracking = trackingRecords.filter(t => t.phone && t.phone === phone);

    // Fetch store orders for this student's phone
    const allOrders = await db.orders.all();
    const myOrders = allOrders.filter(o => o.phone && o.phone === phone);

    return NextResponse.json({
      success: true,
      tracking: myTracking,
      orders: myOrders
    });
  } catch (err) {
    console.error('[GET /api/orders/my-orders]', err);
    return NextResponse.json({ error: 'Failed to fetch student orders' }, { status: 500 });
  }
}
