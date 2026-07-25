import { NextResponse } from 'next/server';
import crypto from 'crypto';

const PAYHERE_MERCHANT_ID  = process.env.PAYHERE_MERCHANT_ID  || '1230017';
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'your_secret_here';

/**
 * Generate PayHere MD5 hash for payment verification
 * Formula: MD5(merchant_id + order_id + amount + currency + md5(secret).toUpperCase())
 */
function generateHash(orderId, amount, currency = 'LKR') {
  const secretHash = crypto.createHash('md5').update(PAYHERE_MERCHANT_SECRET).digest('hex').toUpperCase();
  const rawString = `${PAYHERE_MERCHANT_ID}${orderId}${parseFloat(amount).toFixed(2)}${currency}${secretHash}`;
  return crypto.createHash('md5').update(rawString).digest('hex').toUpperCase();
}

// POST /api/payment/create — initiate PayHere checkout
export async function POST(request) {
  try {
    const { courseId, courseTitle, amount, studentName, studentEmail, studentPhone } = await request.json();

    if (!courseId || !amount || !studentName) {
      return NextResponse.json({ error: 'Missing required payment fields.' }, { status: 400 });
    }

    const orderId = `MS-${courseId}-${Date.now()}`;
    const hash    = generateHash(orderId, amount);

    const paymentData = {
      merchant_id:   PAYHERE_MERCHANT_ID,
      return_url:    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/success`,
      cancel_url:    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/payment/cancel`,
      notify_url:    `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/payment/notify`,
      order_id:      orderId,
      items:         courseTitle,
      currency:      'LKR',
      amount:        parseFloat(amount).toFixed(2),
      first_name:    studentName.split(' ')[0],
      last_name:     studentName.split(' ').slice(1).join(' ') || 'Student',
      email:         studentEmail || 'student@mathspark.lk',
      phone:         studentPhone || '0712345678',
      address:       'Sri Lanka',
      city:          'Colombo',
      country:       'Sri Lanka',
      hash,
    };

    return NextResponse.json({ success: true, paymentData });
  } catch (err) {
    console.error('[/api/payment/create]', err);
    return NextResponse.json({ error: 'Failed to create payment.' }, { status: 500 });
  }
}
