'use client';
import { SITE } from '@/lib/data';

export default function AboutSection() {
  return (
    <section className="section" style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--border)' }}>
      <div className="container">
        <div className="about-grid">
          {/* Video side */}
          <div className="about-video-wrapper">
            <div className="about-video-card">
              <div className="video-thumbnail">
                <div className="video-placeholder">
                  <div className="video-play-icon">
                    <svg width="28" height="28" fill="white" viewBox="0 0 24 24">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <div className="video-text">Watch How It Works</div>
                </div>
              </div>
              {/* Floating card on video */}
              <div className="video-floating-card">
                <div className="vfc-icon">🎓</div>
                <div>
                  <div className="vfc-val">3,682+</div>
                  <div className="vfc-label">A Pass in O/L 2025</div>
                </div>
              </div>
            </div>

            {/* Result chips */}
            <div className="result-chips">
              {['A Grade – O/L 2025','Top Scorer – Grade 10','98% Pass Rate','Island Rank Results'].map((r, i) => (
                <div key={i} className="result-chip">
                  <span style={{ color: '#00C896' }}>✓</span> {r}
                </div>
              ))}
            </div>
          </div>

          {/* Text side */}
          <div className="about-content">
            <div className="section-tag">About MathSpark</div>
            <h2 className="section-title">
              Sri Lanka&apos;s Most <span className="theme-gradient">Result-Oriented</span> Online Maths Class
            </h2>
            <p>
              MathSpark is Sri Lanka&apos;s most popular online Mathematics class with the highest student participation. Students from Grade 6 to Grade 11 can join, whether in Sinhala Medium or English Medium.
            </p>
            <p style={{ marginTop: 16 }}>
              All previous lesson recordings are available to watch anytime through our official website, so students never miss a class. Join us and experience the MathSpark difference.
            </p>

            {/* Feature list */}
            <ul className="about-features">
              {[
                { icon: '🎥', text: 'Live interactive sessions every week' },
                { icon: '📹', text: 'All recordings available 24/7 on dashboard' },
                { icon: '📱', text: 'Direct WhatsApp support from instructor' },
                { icon: '🌐', text: 'Sinhala & English medium classes' },
                { icon: '📋', text: '2026 new syllabus fully covered' },
              ].map((f, i) => (
                <li key={i} className="about-feature-item">
                  <span className="about-feature-icon">{f.icon}</span>
                  <span>{f.text}</span>
                </li>
              ))}
            </ul>

            <div className="about-ctas">
              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-accent btn-lg"
              >
                <svg width="18" height="18" fill="white" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.571a.5.5 0 00.61.61l5.736-1.485A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/></svg>
                WhatsApp Now
              </a>
              <a href={`tel:${SITE.phone}`} className="btn btn-outline btn-lg">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call Now
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        /* Video */
        .about-video-card { position: relative; margin-bottom: 20px; }
        .video-thumbnail {
          border-radius: var(--radius-xl);
          overflow: hidden;
          aspect-ratio: 16/10;
          background: linear-gradient(135deg, #0D1230, #1A1F35);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
        }
        .video-thumbnail::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0,82,255,0.1), rgba(123,47,255,0.1));
        }
        .video-thumbnail:hover { transform: scale(1.01); }
        .video-placeholder { display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; z-index: 2; }
        .video-play-icon {
          width: 72px; height: 72px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255,255,255,0.2);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          transition: var(--transition);
          cursor: pointer;
        }
        .video-thumbnail:hover .video-play-icon {
          background: var(--primary);
          border-color: var(--primary);
          transform: scale(1.08);
          box-shadow: var(--shadow-glow-b);
        }
        .video-text { font-size: 0.9rem; color: var(--text-secondary); font-weight: 500; }
        .video-floating-card {
          position: absolute;
          bottom: -16px;
          right: 24px;
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 12px 18px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: var(--shadow-md);
        }
        .vfc-icon { font-size: 1.6rem; }
        .vfc-val { font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; color: var(--primary-light); }
        .vfc-label { font-size: 0.75rem; color: var(--text-muted); }
        .result-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; }
        .result-chip {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.8rem; font-weight: 500;
          padding: 6px 14px;
          background: rgba(0,200,150,0.06);
          border: 1px solid rgba(0,200,150,0.15);
          border-radius: 100px;
          color: var(--text-secondary);
        }
        /* Content */
        .about-content p { color: var(--text-secondary); font-size: 1rem; line-height: 1.8; }
        .about-features { display: flex; flex-direction: column; gap: 12px; margin: 24px 0; }
        .about-feature-item { display: flex; align-items: center; gap: 12px; font-size: 0.95rem; color: var(--text-secondary); }
        .about-feature-icon { font-size: 1.2rem; flex-shrink: 0; }
        .about-ctas { display: flex; gap: 14px; flex-wrap: wrap; }

        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 40px; }
        }
        @media (max-width: 480px) {
          .about-ctas { flex-direction: column; }
          .about-ctas .btn { justify-content: center; }
        }
      `}</style>
    </section>
  );
}
