'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">Legal &amp; Security</div>
            <h1 className="page-hero-title">
              Privacy <span className="theme-gradient">Policy</span>
            </h1>
            <p className="page-hero-desc">
              How MathSpark collects, uses, and protects student data.
            </p>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="policy-box">
              <h3>1. Data We Collect</h3>
              <p>
                MathSpark collects essential profile information—including your full name, student grade (Grades 6–11), WhatsApp contact number, and payment records—solely to deliver course materials, manage enrollments, and ship physical study packs.
              </p>

              <h3 style={{ marginTop: 32 }}>2. How Your Data Is Used</h3>
              <p>
                Your personal details are used strictly for course administration, verification of student identity, live class access control, and delivery of physical tutes via delivery partners.
              </p>

              <h3 style={{ marginTop: 32 }}>3. Zero Third-Party Data Sharing</h3>
              <p>
                We value your trust. MathSpark does not sell, rent, trade, or share student personal data with external advertisers, marketers, or third-party brokers under any circumstances.
              </p>

              <h3 style={{ marginTop: 32 }}>4. Data Security &amp; Contact</h3>
              <p>
                All account data is transmitted securely and stored in encrypted databases. If you have questions regarding your data privacy or wish to update your registered details, please contact our support team at <strong>+94 72 929 8096</strong> via WhatsApp.
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
