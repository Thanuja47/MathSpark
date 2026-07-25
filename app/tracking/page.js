'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';

export default function TrackingPage() {
  const [trackingNo, setTrackingNo] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!trackingNo) return;
    setLoading(true);
    setResult(null);

    setTimeout(() => {
      setLoading(false);
      setResult({
        trackingNo,
        status: 'In Transit',
        courier: 'Pronto Lanka / Domex',
        estimatedDelivery: 'Tomorrow by 4:00 PM',
        studentName: 'Kavindi Perera',
        item: 'Grade 10 Maths Tute Pack - Month 05',
        history: [
          { time: 'Today, 09:30 AM', status: 'Out for delivery from Colombo Hub' },
          { time: 'Yesterday, 06:15 PM', status: 'Dispatched from MatSpark Warehouse' },
          { time: 'Yesterday, 02:00 PM', status: 'Order packed & verified' },
        ],
      });
    }, 1000);
  };

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
                    placeholder="Ex: 0712345678 or MSP-9842"
                    value={trackingNo}
                    onChange={(e) => setTrackingNo(e.target.value)}
                    className="form-input"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Searching...' : 'Track Package 🚚'}
                </button>
              </form>

              {result && (
                <div className="tracking-result">
                  <div className="tracking-badge">
                    <span>STATUS</span>
                    <strong>{result.status}</strong>
                  </div>

                  <div className="tracking-details">
                    <div>
                      <div className="text-muted text-xs">ITEM</div>
                      <div style={{ fontWeight: 600 }}>{result.item}</div>
                    </div>
                    <div style={{ marginTop: 12 }}>
                      <div className="text-muted text-xs">ESTIMATED DELIVERY</div>
                      <div style={{ color: 'var(--accent-light)', fontWeight: 600 }}>{result.estimatedDelivery}</div>
                    </div>
                  </div>

                  <div className="tracking-timeline">
                    {result.history.map((h, i) => (
                      <div key={i} className="timeline-step">
                        <div className="step-dot" />
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '0.85rem' }}>{h.status}</div>
                          <div className="text-muted text-xs">{h.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .tracking-result {
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid var(--border);
          text-align: left;
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
        }
        .tracking-timeline {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: relative;
          padding-left: 20px;
        }
        .tracking-timeline::before {
          content: '';
          position: absolute;
          left: 5px;
          top: 6px;
          bottom: 6px;
          width: 2px;
          background: var(--border);
        }
        .timeline-step {
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }
        .step-dot {
          position: absolute;
          left: -20px;
          top: 5px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--primary);
          border: 2px solid var(--dark-card);
        }
      `}</style>
    </>
  );
}
