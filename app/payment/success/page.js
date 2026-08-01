'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import Link from 'next/link';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');

  useEffect(() => {
    if (courseId) {
      fetch('/api/enroll', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId }),
      })
        .then(res => res.json())
        .then(data => console.log('Auto-enroll result:', data))
        .catch(err => console.error('Auto-enroll error:', err));
    }
  }, [courseId]);

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ padding: '60px 24px' }}>
          <div style={{
            maxWidth: 520,
            margin: '0 auto',
            background: 'var(--dark-2)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-xl)',
            padding: '48px 40px',
            textAlign: 'center'
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'rgba(0, 200, 150, 0.15)',
              border: '2px solid #00C896',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.5rem',
              margin: '0 auto 24px',
              color: '#00C896'
            }}>
              ✓
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>Payment <span className="theme-gradient">Successful!</span></h1>
            <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: 28 }}>
              Thank you for enrolling with MathSpark. Your access has been activated automatically!
            </p>

            <div style={{
              background: 'var(--dark-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 'var(--radius-md)',
              padding: '20px',
              textAlign: 'left',
              marginBottom: 32,
              fontSize: '0.9rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="text-muted">Status:</span>
                <span style={{ color: '#00C896', fontWeight: 600 }}>Active</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span className="text-muted">Payment Gateway:</span>
                <span>PayHere (LKR)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="text-muted">Access Level:</span>
                <span>Live Sessions & Recording Library</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/my-account" className="btn btn-primary btn-lg">
                Go to Student Dashboard →
              </Link>
              <Link href="/courses" className="btn btn-outline btn-lg">
                Browse More Classes
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
