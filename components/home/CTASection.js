'use client';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export default function CTASection() {
  return (
    <section className="section" style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="cta-card">
          <div className="cta-glow" />
          <div className="cta-content text-center">
            <div className="section-tag" style={{ margin: '0 auto 16px' }}>Start Learning Today</div>
            <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}>
              Transform Your Math Grades with <span className="theme-gradient">MathSpark</span>
            </h2>
            <p className="section-subtitle" style={{ margin: '0 auto 32px', maxWidth: '600px' }}>
              Join live classes, access 24/7 recordings, and get direct teacher support on WhatsApp. Enrollment is open for Grades 6 through 11.
            </p>
            <div className="cta-buttons">
              <Link href="/courses" className="btn btn-primary btn-xl">
                Explore Classes
                <svg className="arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-accent btn-xl">
                <span>💬</span> WhatsApp Inquiry
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .cta-card {
          position: relative;
          background: linear-gradient(135deg, rgba(0, 82, 255, 0.1) 0%, rgba(123, 47, 255, 0.08) 50%, rgba(255, 107, 0, 0.08) 100%);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 64px 32px;
          overflow: hidden;
        }
        .cta-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(0,82,255,0.2) 0%, transparent 70%);
          pointer-events: none;
        }
        .cta-content {
          position: relative;
          z-index: 2;
        }
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .cta-card { padding: 40px 20px; }
          .cta-buttons { flex-direction: column; }
          .cta-buttons .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
}
