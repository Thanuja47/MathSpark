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

    let student = null;
    if (authUser.id) {
      student = await db.students.findById(authUser.id);
    }
    if (!student && authUser.phone) {
      student = await db.students.findByPhone(authUser.phone);
    }
    if (!student) {
      student = { name: authUser.name || 'Student', phone: authUser.phone || '' };
    }


    const body = await request.json();
    const { storeItemId, itemTitle, itemPrice, quantity = 1 } = body;

    let finalItemName = 'Store Item';
    let finalPrice = 0;
    let validStoreItemId = null;

    if (storeItemId) {
      const storeItem = await db.store.findById(storeItemId);
      if (storeItem) {
        finalItemName = storeItem.name;
        finalPrice = storeItem.price;
        validStoreItemId = storeItem.id;
      }
    }

    if (!validStoreItemId) {
      if (!itemTitle || !itemPrice) {
        return NextResponse.json({ error: 'Store item information missing.' }, { status: 400 });
      }
      finalItemName = itemTitle;
      finalPrice = Number(itemPrice) || 0;
    }

    const qty = Math.max(1, Number(quantity) || 1);
    const totalPrice = finalPrice * qty;

    const newOrder = await db.orders.create({
      studentName: student.name,
      phone: student.phone,
      storeItemId: validStoreItemId,
      itemName: finalItemName,
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
