'use client';
import { useState } from 'react';
import { getTracking, updateTracking } from '@/services/trackingService';

export default function useTracking() {
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTracking = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getTracking(query);
      if (data && data.record) {
        setRecord(data.record);
        return { success: true, record: data.record };
      } else {
        setError(data.error || 'Tracking record not found.');
        setRecord(null);
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('An error occurred while fetching tracking.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const saveTracking = async (trackingData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await updateTracking(trackingData);
      if (data && data.success) {
        setRecord(data.record);
        return { success: true, record: data.record };
      } else {
        setError(data.error || 'Failed to update tracking.');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('An error occurred while updating tracking.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    record,
    loading,
    error,
    fetchTracking,
    saveTracking,
    setError
  };
}
