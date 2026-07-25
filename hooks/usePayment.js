'use client';
import { useState } from 'react';
import { createPayment } from '@/services/paymentService';

export default function usePayment() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const startCheckout = async (paymentDetails) => {
    setLoading(true);
    setError(null);
    try {
      const data = await createPayment(paymentDetails);
      if (data && data.success && data.paymentData) {
        // Trigger PayHere sandbox or production checkout modal or form post
        const payhereData = data.paymentData;
        
        // Dynamic form insertion and submission to PayHere
        const form = document.createElement('form');
        form.setAttribute('method', 'post');
        form.setAttribute('action', 'https://sandbox.payhere.lk/pay/checkout'); // change to production url if needed

        for (const key in payhereData) {
          if (payhereData.hasOwnProperty(key)) {
            const hiddenField = document.createElement('input');
            hiddenField.setAttribute('type', 'hidden');
            hiddenField.setAttribute('name', key);
            hiddenField.setAttribute('value', payhereData[key]);
            form.appendChild(hiddenField);
          }
        }

        document.body.appendChild(form);
        form.submit();
        
        return { success: true };
      } else {
        setError(data.error || 'Failed to initiate payment.');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('An error occurred during payment setup.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    startCheckout,
    loading,
    error
  };
}
