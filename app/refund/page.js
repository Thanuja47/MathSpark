'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">Guarantee &amp; Support</div>
            <h1 className="page-hero-title">
              Refund &amp; <span className="theme-gradient">Cancellation Policy</span>
            </h1>
            <p className="page-hero-desc">
              Clear and transparent terms for online class subscriptions and physical study materials.
            </p>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="policy-box">
              <h3>1. Online Class Subscription Refunds</h3>
              <p>
                Monthly subscription fees for live online classes and recording access packs are eligible for a 100% refund within <strong>7 days</strong> of purchase, provided the student has attended fewer than two live sessions and accessed no more than two recording packs.
              </p>

              <h3 style={{ marginTop: 32 }}>2. Physical Tute Pack Returns &amp; Exchanges</h3>
              <p>
                Printed study materials and physical tute packs can be returned or exchanged within <strong>5 days</strong> of delivery if received in damaged condition, or if incorrect materials were shipped.
              </p>

              <h3 style={{ marginTop: 32 }}>3. How to Request a Refund</h3>
              <p>
                To request a refund or tute exchange, please contact our support team at <strong>+94 72 929 8096</strong> via WhatsApp with your student registration name, phone number, and payment receipt reference. Approved refunds are processed within 2–3 business days.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .policy-box {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .policy-box h3 { color: var(--text-primary); margin-bottom: 12px; }
      `}</style>
    </>
  );
}
