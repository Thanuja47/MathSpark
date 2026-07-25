'use client';
import { WHY_MATSPARK } from '@/lib/data';

export default function WhyMatSpark() {
  return (
    <section className="section" style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: 56 }}>
          <div className="section-tag">Why Choose Us</div>
          <h2 className="section-title">Why <span className="theme-gradient">MathSpark</span>?</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            We don&apos;t just teach Maths — we ignite a passion for it. Here&apos;s what makes us different.
          </p>
        </div>

        <div className="why-grid">
          {WHY_MATSPARK.map((item, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.08}s` }}>
              <span className="feature-icon">{item.icon}</span>
              <h4 className="feature-title">{item.title}</h4>
              <p className="feature-desc">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom banner */}
        <div className="why-bottom-banner">
          <div className="why-banner-content">
            <div className="why-banner-icon">🏆</div>
            <div>
              <h4 style={{ marginBottom: 4 }}>Sri Lanka&apos;s Most Result-Oriented Online Maths Platform</h4>
              <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                Over 3,682 students achieved A Pass in O/L 2024(2025). Your turn is next.
              </p>
            </div>
          </div>
          <div className="why-banner-stats">
            <div className="banner-stat">
              <span className="banner-stat-val">98%</span>
              <span className="banner-stat-lbl">A-Pass Rate</span>
            </div>
            <div className="banner-divider" />
            <div className="banner-stat">
              <span className="banner-stat-val">5,200+</span>
              <span className="banner-stat-lbl">Active Students</span>
            </div>
            <div className="banner-divider" />
            <div className="banner-stat">
              <span className="banner-stat-val">12 Yrs</span>
              <span className="banner-stat-lbl">Experience</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .why-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-bottom: 56px;
        }
        .why-bottom-banner {
          background: linear-gradient(135deg, rgba(0,82,255,0.1) 0%, rgba(123,47,255,0.06) 100%);
          border: 1px solid rgba(0,82,255,0.15);
          border-radius: var(--radius-xl);
          padding: 36px 44px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          flex-wrap: wrap;
        }
        .why-banner-content { display: flex; align-items: center; gap: 20px; flex: 1; }
        .why-banner-icon { font-size: 2.5rem; flex-shrink: 0; }
        .why-banner-stats { display: flex; align-items: center; gap: 24px; flex-shrink: 0; }
        .banner-stat { text-align: center; }
        .banner-stat-val {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 900;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .banner-stat-lbl { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .banner-divider { width: 1px; height: 40px; background: var(--border); }

        @media (max-width: 900px) {
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .why-bottom-banner { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 580px) {
          .why-grid { grid-template-columns: 1fr; }
          .why-banner-stats { width: 100%; justify-content: space-around; }
        }
      `}</style>
    </section>
  );
}
