export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

async function verifyAdmin(request) {
  const user = getUserFromRequest(request);
  if (!user) return false;
  if (user.role === 'admin') return true;
  if (user.id) {
    const dbUser = await db.students.findById(user.id);
    return dbUser?.role === 'admin';
  }
  return false;
}

// GET /api/admin/orders — fetch all orders
export async function GET(request) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
  }

  try {
    const orders = await db.orders.all();
    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 });
  }
}
