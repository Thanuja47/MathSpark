import { NextResponse } from 'next/server';
import crypto from 'crypto';

const PAYHERE_MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID     || '1230017';
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'your_secret_here';

// POST /api/payment/notify — PayHere sends payment status here
export async function POST(request) {
  try {
    const formData = await request.formData();

    const merchantId      = formData.get('merchant_id');
    const orderId         = formData.get('order_id');
    const paymentId       = formData.get('payment_id');
    const payhereAmount   = formData.get('payhere_amount');
    const payhereCurrency = formData.get('payhere_currency');
    const statusCode      = formData.get('status_code');
    const md5sig          = formData.get('md5sig');

    // Verify the signature
    const secretHash = crypto.createHash('md5').update(PAYHERE_MERCHANT_SECRET).digest('hex').toUpperCase();
    const localSig   = crypto
      .createHash('md5')
      .update(`${merchantId}${orderId}${payhereAmount}${payhereCurrency}${statusCode}${secretHash}`)
      .digest('hex')
      .toUpperCase();

    if (localSig !== md5sig) {
      console.error('[PayHere Notify] Signature mismatch – possible tamper attempt.');
      return new Response('Invalid signature', { status: 400 });
    }

    // status_code 2 = successful payment
    if (statusCode === '2') {
      console.log(`[PayHere] Payment SUCCESS | Order: ${orderId} | Payment: ${paymentId} | Amount: LKR ${payhereAmount}`);
      // TODO: Update database — mark course as enrolled for the student
      // await db.enrollments.create({ orderId, paymentId, amount: payhereAmount });
    } else if (statusCode === '0') {
      console.log(`[PayHere] Payment PENDING | Order: ${orderId}`);
    } else if (statusCode === '-1') {
      console.log(`[PayHere] Payment CANCELLED | Order: ${orderId}`);
    } else if (statusCode === '-2') {
      console.log(`[PayHere] Payment FAILED | Order: ${orderId}`);
    } else if (statusCode === '-3') {
      console.log(`[PayHere] Payment CHARGEDBACK | Order: ${orderId}`);
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('[/api/payment/notify]', err);
    return new Response('Error', { status: 500 });
  }
}
