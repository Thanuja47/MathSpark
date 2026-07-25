import { NextResponse } from 'next/server';
import { verifyNotifySignature } from '@/utils/payhereSignature';
import { PAYMENT_STATUS } from '@/utils/constants';

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

    // Verify the signature using shared utility
    const isValid = verifyNotifySignature({
      merchantId,
      orderId,
      amount:      payhereAmount,
      currency:    payhereCurrency,
      statusCode,
      receivedSig: md5sig,
    });

    if (!isValid) {
      console.error('[PayHere Notify] Signature mismatch – possible tamper attempt.');
      return new Response('Invalid signature', { status: 400 });
    }

    // Handle payment status using constants
    if (statusCode === PAYMENT_STATUS.SUCCESS) {
      console.log(`[PayHere] Payment SUCCESS | Order: ${orderId} | Payment: ${paymentId} | Amount: LKR ${payhereAmount}`);
      // TODO: Update database — mark course as enrolled for the student
      // await db.enrollments.create({ orderId, paymentId, amount: payhereAmount });
    } else if (statusCode === PAYMENT_STATUS.PENDING) {
      console.log(`[PayHere] Payment PENDING | Order: ${orderId}`);
    } else if (statusCode === PAYMENT_STATUS.CANCELLED) {
      console.log(`[PayHere] Payment CANCELLED | Order: ${orderId}`);
    } else if (statusCode === PAYMENT_STATUS.FAILED) {
      console.log(`[PayHere] Payment FAILED | Order: ${orderId}`);
    } else if (statusCode === PAYMENT_STATUS.CHARGEDBACK) {
      console.log(`[PayHere] Payment CHARGEDBACK | Order: ${orderId}`);
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('[/api/payment/notify]', err);
    return new Response('Error', { status: 500 });
  }
}
