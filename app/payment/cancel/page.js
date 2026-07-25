import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import Link from 'next/link';

export default function PaymentCancelPage() {
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
              background: 'rgba(255, 107, 0, 0.15)',
              border: '2px solid var(--accent)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2.2rem',
              margin: '0 auto 24px',
              color: 'var(--accent)'
            }}>
              ⚠️
            </div>

            <h1 style={{ fontSize: '2rem', marginBottom: 12 }}>Payment <span style={{ color: 'var(--accent)' }}>Cancelled</span></h1>
            <p className="text-secondary" style={{ fontSize: '0.95rem', marginBottom: 28 }}>
              Your transaction was cancelled or interrupted. No charges were made to your account.
            </p>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/courses" className="btn btn-accent btn-lg">
                Try Again / Choose Class
              </Link>
              <a href="https://wa.me/94712345678" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">
                💬 WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
