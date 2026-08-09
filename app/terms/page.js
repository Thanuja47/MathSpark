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
                By accessing MathSpark (&quot;the Platform&quot;), operated by Ishan Maduranga Mathematics, you agree to abide by these Terms of Service. All course materials, live stream accesses, video recordings, MCQ test banks, and physical or digital study packs remain the exclusive intellectual property of MathSpark.
              </p>
              <p>
                Account credentials are strictly non-transferable. Any unauthorized account sharing, screen recording, commercial reproduction, or redistribution of proprietary learning materials will result in immediate termination of account access without entitlement to a refund, and may incur legal action.
              </p>

              <h3 style={{ marginTop: 32 }}>2. Privacy &amp; Data Protection</h3>
              <p>
                MathSpark respects student privacy and is committed to protecting your personal information. We collect essential profile data—specifically your name, grade, mobile/WhatsApp contact number, and transaction records—solely to facilitate course access, process physical tute deliveries, and provide academic support.
              </p>
              <p>
                Your data is stored securely and processed exclusively for MathSpark services. We do not sell, rent, or trade student personal information to third-party advertisers or external organizations under any circumstances.
              </p>

              <h3 style={{ marginTop: 32 }}>3. Refund &amp; Cancellation Policy</h3>
              <p>
                Monthly subscription fees for live online classes and recording access packs are eligible for a refund within <strong>7 days</strong> of purchase, provided the student has attended fewer than two live sessions and accessed no more than two recording packs.
              </p>
              <p>
                Physical study materials and printed tute packs may be returned or replaced within <strong>5 days</strong> of delivery if received damaged or incomplete. To request a refund or tute pack exchange, please contact our official support team at <strong>+94 72 929 8096</strong> via WhatsApp.
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
