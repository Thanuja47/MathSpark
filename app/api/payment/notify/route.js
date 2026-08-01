export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { verifyNotifySignature } from '@/utils/payhereSignature';
import { PAYMENT_STATUS } from '@/utils/constants';
import { db } from '@/lib/db';

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
    const custom1         = formData.get('custom_1'); // studentId or studentPhone
    const custom2         = formData.get('custom_2'); // courseId

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

    // Handle payment status
    if (statusCode === PAYMENT_STATUS.SUCCESS) {
      console.log(`[PayHere] Payment SUCCESS | Order: ${orderId} | Course: ${custom2} | Student: ${custom1}`);
      
      if (custom1 && custom2) {
        let student = await db.students.findById(custom1);
        if (!student) {
          student = await db.students.findByPhone(custom1);
        }

        if (student) {
          let enrolled = [];
          try {
            enrolled = JSON.parse(student.enrolledCourses || '[]');
          } catch (e) {
            enrolled = [];
          }

          if (!enrolled.includes(custom2)) {
            enrolled.push(custom2);
            await db.students.updateEnrollments(student.id, enrolled);
            console.log(`[PayHere] Successfully enrolled student ${student.phone} into course ${custom2}`);
          }
        }
      }
    }

    return new Response('OK', { status: 200 });
  } catch (err) {
    console.error('[/api/payment/notify]', err);
    return new Response('Error', { status: 500 });
  }
}
