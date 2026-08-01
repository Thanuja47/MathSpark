'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import useTracking from '@/hooks/useTracking';
import { formatDate } from '@/utils/formatDate';
import { getOrderWhatsAppLink } from '@/utils/whatsapp';

export default function TrackingPage() {
  const [trackingNo, setTrackingNo] = useState('');
  const { record, fetchTracking, loading, error } = useTracking();

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!trackingNo) return;
    await fetchTracking(trackingNo);
  };

  // Convert the simplified DB record structure to the UI display model
  const result = record ? {
    trackingNo: record.id,
    status: record.status,
    courier: record.courier || 'Domex Express',
    estimatedDelivery: '1-2 Days',
    studentName: record.student,
    item: record.item,
    history: [
      { time: formatDate(record.updatedAt), status: `Package status updated to [${record.status}]` },
      { time: 'MathSpark Center', status: 'Dispatched from MathSpark Warehouse' },
      { time: 'MathSpark Center', status: 'Order packed & verified' },
    ]
  } : null;

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a> <span>/</span> <span>Tute Tracking</span>
            </div>
            <div className="section-tag page-hero-tag">Delivery Tracking</div>
            <h1 className="page-hero-title">
              Track Your <span className="theme-gradient">Tute Pack</span>
            </h1>
            <p className="page-hero-desc">
              Enter your mobile number or tracking code to check the real-time delivery status of your study pack.
            </p>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="tracking-box">
              <form onSubmit={handleTrack}>
                <div className="form-group" style={{ textAlign: 'left' }}>
                  <label className="form-label">Phone Number or Tracking ID</label>
                  <input
                    type="text"
                    placeholder="Ex: MSP-9842 or 0712345678"
                    value={trackingNo}
                    onChange={(e) => setTrackingNo(e.target.value)}
                    className="form-input"
                    style={{ fontSize: '1.1rem', padding: '16px' }}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '16px' }} disabled={loading}>
                  {loading ? 'Searching Database...' : 'Track Package 🚚'}
                </button>
              </form>

              {error && (
                <div style={{ marginTop: 24, padding: 16, background: 'rgba(255,77,79,0.1)', border: '1px solid #ff4d4f', borderRadius: 8, color: '#ff4d4f', textAlign: 'center' }}>
                  {error}
                </div>
              )}

              {result && (
                <div className="tracking-result" style={{ marginTop: 32 }}>
                  <div className="tracking-badge">
                    <span>Status: <strong>{result.status}</strong></span>
                    <span>ID: <code>{result.trackingNo}</code></span>
                  </div>

                  <div className="tracking-details">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className="text-muted">Student:</span>
                      <strong>{result.studentName}</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                      <span className="text-muted">Item:</span>
                      <span>{result.item}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span className="text-muted">Courier:</span>
                      <span>{result.courier}</span>
                    </div>
                  </div>

                  <a
                    href={getOrderWhatsAppLink(result.trackingNo, result.item)}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-accent btn-sm"
                    style={{ width: '100%', marginTop: 16, justifyContent: 'center' }}
                  >
                    💬 Ask Delivery Support on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .tracking-box {
          max-width: 540px;
          margin: 0 auto;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 36px;
          text-align: center;
        }
        .tracking-badge {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(0, 200, 150, 0.1);
          border: 1px solid rgba(0, 200, 150, 0.2);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          color: #00C896;
          margin-bottom: 20px;
        }
        .tracking-details {
          background: var(--dark-2);
          padding: 16px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
          font-size: 0.9rem;
          text-align: left;
        }
      `}</style>
    </>
  );
}
