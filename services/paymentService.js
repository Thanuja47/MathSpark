/**
 * MathSpark — Payment Service
 * All API calls related to initiating PayHere checkout.
 */

/**
 * Create a payment signature and data block for PayHere checkout.
 * @param {object} paymentDetails - { courseId, courseTitle, amount, studentName, studentEmail, studentPhone }
 * @returns {Promise<{success: boolean, paymentData?: object, error?: string}>}
 */
export async function createPayment(paymentDetails) {
  const res = await fetch('/api/payment/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paymentDetails),
  });
  return res.json();
}
