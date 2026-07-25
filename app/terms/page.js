'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';

export default function PolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">Legal</div>
            <h1 className="page-hero-title">
              Terms of <span className="theme-gradient">Service</span> &amp; Privacy
            </h1>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="policy-box">
              <h3>1. Terms of Service</h3>
              <p>
                By accessing MatSpark, you agree to abide by our platform guidelines. All course materials, video recordings, and study packs remain the intellectual property of MatSpark. Account sharing or unauthorized downloading of proprietary content is strictly prohibited.
              </p>

              <h3 style={{ marginTop: 32 }}>2. Privacy Policy</h3>
              <p>
                We value your privacy. We collect minimal student information (name, WhatsApp number, grade) solely for class management, delivery tracking, and academic updates. We do not sell or share personal data with third parties.
              </p>

              <h3 style={{ marginTop: 32 }}>3. Refund Policy</h3>
              <p>
                Monthly subscription fees are refundable within 7 days of payment if you have attended fewer than 2 live sessions and wish to cancel your enrollment. Physical tute packs can be returned if undamaged within 5 days of delivery.
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
