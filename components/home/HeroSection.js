'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export default function HeroSection() {
  const floatRef = useRef(null);

  useEffect(() => {
    // Subtle parallax on mouse move
    const handleMouse = (e) => {
      if (!floatRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 8;
      floatRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  return (
    <section className="hero">
      {/* Background glows */}
      <div className="hero-glow g1" aria-hidden="true" />
      <div className="hero-glow g2" aria-hidden="true" />
      <div className="hero-glow g3" aria-hidden="true" />

      {/* Grid pattern overlay */}
      <div className="hero-grid-pattern" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          {/* Left – Text */}
          <div className="hero-content">
            <div className="hero-tag">
              <span className="hero-tag-dot" />
              Ishara Madushan Online School
            </div>

            <h1 className="hero-title">
              Master{' '}
              <span className="theme-gradient">Maths</span>
              <br />
              Now At Your
              <br />
              <span className="hero-title-spark">Fingertips!</span>
            </h1>

            <p className="hero-desc">
              Sri Lanka&apos;s most result-oriented online Maths platform. Live classes, full recordings and WhatsApp support — in Sinhala &amp; English for Grades 6–11.
            </p>

            {/* Social proof */}
            <div className="hero-proof">
              <div className="proof-avatars">
                {['K','T','S','D','N'].map((letter, i) => (
                  <div key={i} className="proof-avatar" style={{ marginLeft: i ? '-10px' : 0, background: ['#0052FF','#7B2FFF','#FF6B00','#00C896','#FF3D9A'][i] }}>
                    {letter}
                  </div>
                ))}
              </div>
              <div>
                <div className="proof-count">5,200+ Students</div>
                <div className="proof-label">Achieving A passes in 2025 O/L</div>
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-ctas">
              <Link href="/courses" className="btn btn-primary btn-xl">
                Explore Classes
                <svg className="arrow" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20MatSpark%20classes!`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-xl"
              >
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#25D366' }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.571a.5.5 0 00.61.61l5.736-1.485A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.94a9.923 9.923 0 01-5.065-1.381l-.363-.215-3.76.974.998-3.649-.236-.374A9.94 9.94 0 012.06 12C2.06 6.504 6.504 2.06 12 2.06S21.94 6.504 21.94 12 17.496 21.94 12 21.94z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>

            {/* Trust badges */}
            <div className="hero-trust">
              <div className="trust-item">
                <span className="trust-icon">✅</span>
                <span>Free trial class</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✅</span>
                <span>Cancel anytime</span>
              </div>
              <div className="trust-item">
                <span className="trust-icon">✅</span>
                <span>24/7 recordings</span>
              </div>
            </div>
          </div>

          {/* Right – Visual */}
          <div className="hero-visual">
            <div ref={floatRef} className="hero-visual-inner float">
              {/* Main card */}
              <div className="hero-main-card">
                <div className="hero-card-header">
                  <div className="hero-card-avatar">⚡</div>
                  <div>
                    <div className="hero-card-name">MathSpark Live</div>
                    <div className="hero-card-sub">Grade 10 Maths · Now Live</div>
                  </div>
                  <div className="hero-live-dot">
                    <span className="live-pulse" />
                    LIVE
                  </div>
                </div>
                <div className="hero-card-screen">
                  <div className="screen-content">
                    <div className="screen-formula">
                      <span className="formula-text">x² + 5x + 6 = (x+2)(x+3)</span>
                    </div>
                    <div className="screen-bars">
                      {[60,85,45,95,70,80].map((h, i) => (
                        <div key={i} className="screen-bar" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hero-card-footer">
                  <div className="hero-card-viewers">
                    <span className="viewer-dot" />
                    <span>1,247 watching</span>
                  </div>
                  <div className="hero-card-rating">⭐ 4.9 / 5.0</div>
                </div>
              </div>

              {/* Floating info chips */}
              <div className="hero-chip chip-1">
                <span>🎯</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>98% A-Pass</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>O/L 2025</div>
                </div>
              </div>

              <div className="hero-chip chip-2">
                <span>📚</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>1,800+ Lessons</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>All grades</div>
                </div>
              </div>

              <div className="hero-chip chip-3">
                <span>🌟</span>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>New Syllabus</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>2026 Ready</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 90vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--gradient-hero);
          padding: 80px 0 60px;
        }
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          pointer-events: none;
        }
        .g1 { width: 600px; height: 600px; top: -200px; left: -100px; background: rgba(0,82,255,0.12); }
        .g2 { width: 500px; height: 500px; bottom: -150px; right: -100px; background: rgba(255,107,0,0.10); }
        .g3 { width: 400px; height: 400px; top: 50%; left: 50%; transform: translate(-50%,-50%); background: rgba(123,47,255,0.08); }
        .hero-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
        }
        .hero-inner {
          position: relative;
          z-index: 2;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: center;
        }
        .hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: var(--primary-light);
          background: rgba(0,82,255,0.1);
          border: 1px solid rgba(0,82,255,0.2);
          padding: 7px 16px;
          border-radius: 100px;
          margin-bottom: 24px;
        }
        .hero-tag-dot {
          width: 7px; height: 7px;
          background: var(--primary-light);
          border-radius: 50%;
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
        .hero-title {
          font-size: clamp(2.4rem, 5vw, 4rem);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 20px;
        }
        .hero-title-spark {
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
        }
        .hero-desc {
          font-size: 1.05rem;
          color: var(--text-secondary);
          line-height: 1.75;
          margin-bottom: 32px;
          max-width: 480px;
        }
        /* Social proof */
        .hero-proof { display: flex; align-items: center; gap: 14px; margin-bottom: 36px; }
        .proof-avatars { display: flex; }
        .proof-avatar {
          width: 36px; height: 36px;
          border-radius: 50%;
          border: 2px solid var(--dark);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }
        .proof-count { font-weight: 700; font-size: 0.95rem; }
        .proof-label { font-size: 0.78rem; color: var(--text-muted); }
        /* CTAs */
        .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 28px; }
        /* Trust */
        .hero-trust { display: flex; gap: 20px; flex-wrap: wrap; }
        .trust-item { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--text-muted); }
        .trust-icon { font-size: 0.9rem; }

        /* Visual */
        .hero-visual { position: relative; display: flex; align-items: center; justify-content: center; }
        .hero-visual-inner { position: relative; width: 100%; max-width: 420px; margin: 0 auto; }

        /* Main card */
        .hero-main-card {
          background: rgba(22,27,46,0.9);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 24px;
          backdrop-filter: blur(20px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(0,82,255,0.1), var(--shadow-glow-b);
        }
        .hero-card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .hero-card-avatar {
          width: 42px; height: 42px;
          border-radius: 12px;
          background: var(--gradient-blue);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        .hero-card-name { font-weight: 700; font-size: 0.95rem; }
        .hero-card-sub  { font-size: 0.75rem; color: var(--text-muted); }
        .hero-live-dot {
          margin-left: auto;
          display: flex; align-items: center; gap: 6px;
          font-size: 0.7rem; font-weight: 700;
          color: #FF4444;
          background: rgba(255,68,68,0.1);
          border: 1px solid rgba(255,68,68,0.2);
          padding: 4px 10px; border-radius: 100px;
          position: relative;
        }
        .live-pulse {
          width: 7px; height: 7px;
          background: #FF4444;
          border-radius: 50%;
          animation: pulse-glow 1s ease-in-out infinite;
        }
        .hero-card-screen {
          background: var(--dark-3);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 16px;
          min-height: 120px;
          display: flex;
          align-items: center;
        }
        .screen-content { width: 100%; }
        .screen-formula {
          text-align: center;
          margin-bottom: 16px;
          padding: 10px;
          background: rgba(0,82,255,0.05);
          border: 1px solid rgba(0,82,255,0.1);
          border-radius: 8px;
        }
        .formula-text {
          font-family: 'Courier New', monospace;
          font-size: 0.85rem;
          color: var(--primary-light);
          font-weight: 600;
        }
        .screen-bars { display: flex; align-items: flex-end; gap: 6px; height: 48px; }
        .screen-bar {
          flex: 1;
          background: var(--gradient-blue);
          border-radius: 4px 4px 0 0;
          opacity: 0.7;
          animation: bar-pulse 2s ease-in-out infinite alternate;
        }
        @keyframes bar-pulse {
          from { opacity: 0.5; transform: scaleY(0.8); }
          to   { opacity: 1;   transform: scaleY(1); }
        }
        .hero-card-footer { display: flex; align-items: center; justify-content: space-between; }
        .hero-card-viewers { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--text-muted); }
        .viewer-dot { width: 6px; height: 6px; background: #00C896; border-radius: 50%; animation: pulse-glow 1.5s ease-in-out infinite; }
        .hero-card-rating { font-size: 0.8rem; font-weight: 600; color: #FFB800; }

        /* Chips */
        .hero-chip {
          position: absolute;
          background: rgba(22,27,46,0.95);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-md);
          font-size: 0.85rem;
          white-space: nowrap;
          animation: float 3s ease-in-out infinite;
        }
        .chip-1 { top: -20px; right: -20px; animation-delay: 0s; }
        .chip-2 { bottom: 60px; left: -30px; animation-delay: 0.7s; }
        .chip-3 { bottom: -20px; right: 10px; animation-delay: 1.4s; }

        @media (max-width: 900px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; }
          .hero-desc { margin: 0 auto 32px; }
          .hero-proof { justify-content: center; }
          .hero-ctas { justify-content: center; }
          .hero-trust { justify-content: center; }
          .hero-visual { margin-top: 40px; }
          .chip-1 { top: -30px; right: 0; }
          .chip-2 { left: 0; }
        }
        @media (max-width: 480px) {
          .hero { padding: 60px 0 40px; min-height: auto; }
          .hero-ctas { flex-direction: column; }
          .hero-ctas .btn { width: 100%; justify-content: center; }
          .chip-1, .chip-2, .chip-3 { display: none; }
        }
      `}</style>
    </section>
  );
}
