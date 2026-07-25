/**
 * MathSpark — PayHere MD5 Signature Utility
 * Extracted from /api/payment/create and /api/payment/notify routes.
 * This is the ONLY place MD5 signature logic should live.
 */
import crypto from 'crypto';

const PAYHERE_MERCHANT_ID     = process.env.PAYHERE_MERCHANT_ID     || '1230017';
const PAYHERE_MERCHANT_SECRET = process.env.PAYHERE_MERCHANT_SECRET || 'your_secret_here';

/**
 * Generate PayHere MD5 hash for initiating a payment.
 * Formula: MD5(merchant_id + order_id + amount + currency + MD5(secret).toUpperCase())
 *
 * @param {string} orderId   - Unique order ID
 * @param {number|string} amount   - Payment amount
 * @param {string} [currency='LKR'] - Currency code
 * @returns {string} Uppercase MD5 hash
 */
export function generatePaymentHash(orderId, amount, currency = 'LKR') {
  const secretHash = crypto
    .createHash('md5')
    .update(PAYHERE_MERCHANT_SECRET)
    .digest('hex')
    .toUpperCase();

  const rawString = `${PAYHERE_MERCHANT_ID}${orderId}${parseFloat(amount).toFixed(2)}${currency}${secretHash}`;

  return crypto.createHash('md5').update(rawString).digest('hex').toUpperCase();
}

/**
 * Verify a PayHere notification signature (used in the notify webhook).
 * Formula: MD5(merchant_id + order_id + amount + currency + status_code + MD5(secret).toUpperCase())
 *
 * @param {object} params
 * @param {string} params.merchantId
 * @param {string} params.orderId
 * @param {string} params.amount
 * @param {string} params.currency
 * @param {string} params.statusCode
 * @param {string} params.receivedSig - The md5sig field sent by PayHere
 * @returns {boolean} True if signature is valid
 */
export function verifyNotifySignature({ merchantId, orderId, amount, currency, statusCode, receivedSig }) {
  const secretHash = crypto
    .createHash('md5')
    .update(PAYHERE_MERCHANT_SECRET)
    .digest('hex')
    .toUpperCase();

  const localSig = crypto
    .createHash('md5')
    .update(`${merchantId}${orderId}${amount}${currency}${statusCode}${secretHash}`)
    .digest('hex')
    .toUpperCase();

  return localSig === receivedSig;
}

export { PAYHERE_MERCHANT_ID };
