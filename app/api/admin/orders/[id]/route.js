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

// PUT /api/admin/orders/[id] — update order status
export async function PUT(request, { params }) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
  }

  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status) {
      return NextResponse.json({ error: 'Status is required.' }, { status: 400 });
    }

    const updated = await db.orders.updateStatus(id, status);
    return NextResponse.json({ success: true, order: updated });
  } catch (error) {
    console.error('Error updating order status:', error);
    return NextResponse.json({ error: 'Failed to update order status.' }, { status: 500 });
  }
}

// DELETE /api/admin/orders/[id] — delete order
export async function DELETE(request, { params }) {
  const isAdmin = await verifyAdmin(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized. Admin access required.' }, { status: 401 });
  }

  try {
    const { id } = params;
    await db.orders.delete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json({ error: 'Failed to delete order.' }, { status: 500 });
  }
}
