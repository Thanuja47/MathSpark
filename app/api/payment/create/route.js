import { NextResponse } from 'next/server';
import { generatePaymentHash, PAYHERE_MERCHANT_ID } from '@/utils/payhereSignature';
import { CURRENCY, PAYHERE_DEFAULTS } from '@/utils/constants';

// POST /api/payment/create — initiate PayHere checkout
export async function POST(request) {
  try {
    const { courseId, courseTitle, amount, studentName, studentEmail, studentPhone } = await request.json();

    if (!courseId || !amount || !studentName) {
      return NextResponse.json({ error: 'Missing required payment fields.' }, { status: 400 });
    }

    const orderId = `MS-${courseId}-${Date.now()}`;
    const hash    = generatePaymentHash(orderId, amount, CURRENCY);

    const paymentData = {
      merchant_id:   PAYHERE_MERCHANT_ID,
      return_url:    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
      cancel_url:    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
      notify_url:    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/notify`,
      order_id:      orderId,
      items:         courseTitle,
      currency:      CURRENCY,
      amount:        parseFloat(amount).toFixed(2),
      first_name:    studentName.split(' ')[0],
      last_name:     studentName.split(' ').slice(1).join(' ') || 'Student',
      email:         studentEmail || PAYHERE_DEFAULTS.EMAIL,
      phone:         studentPhone || PAYHERE_DEFAULTS.PHONE,
      address:       PAYHERE_DEFAULTS.ADDRESS,
      city:          PAYHERE_DEFAULTS.CITY,
      country:       PAYHERE_DEFAULTS.COUNTRY,
      hash,
    };

    return NextResponse.json({ success: true, paymentData });
  } catch (err) {
    console.error('[/api/payment/create]', err);
    return NextResponse.json({ error: 'Failed to create payment.' }, { status: 500 });
  }
}
