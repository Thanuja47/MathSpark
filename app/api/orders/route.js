export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '@/lib/auth';
import { db } from '@/lib/db';

export async function POST(request) {
  try {
    const authUser = getUserFromRequest(request);
    if (!authUser) {
      return NextResponse.json({ error: 'Please log in to place an order.' }, { status: 401 });
    }

    const student = await db.students.findById(authUser.id);
    if (!student) {
      return NextResponse.json({ error: 'Student profile not found.' }, { status: 404 });
    }

    const body = await request.json();
    const { storeItemId, quantity = 1 } = body;

    if (!storeItemId) {
      return NextResponse.json({ error: 'Store item ID is required.' }, { status: 400 });
    }

    const storeItem = await db.store.findById(storeItemId);
    if (!storeItem) {
      return NextResponse.json({ error: 'Store item not found.' }, { status: 404 });
    }

    const qty = Math.max(1, Number(quantity) || 1);
    const totalPrice = storeItem.price * qty;

    const newOrder = await db.orders.create({
      studentName: student.name,
      phone: student.phone,
      storeItemId: storeItem.id,
      itemName: storeItem.name,
      quantity: qty,
      totalPrice: totalPrice,
      status: 'Pending',
    });

    return NextResponse.json({
      success: true,
      message: "Order placed! We'll contact you on WhatsApp to confirm payment via bank transfer.",
      order: newOrder,
    }, { status: 201 });
  } catch (error) {
    console.error('Error placing order:', error);
    return NextResponse.json({ error: 'Failed to place order.' }, { status: 500 });
  }
}
