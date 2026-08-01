'use client';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { SITE, GRADES } from '@/lib/data';

export default function HeroSection() {
  const floatRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 14, seconds: 0 });

  useEffect(() => {
    const handleMouse = (e) => {
      if (!floatRef.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 8;
      const y = (e.clientY / window.innerHeight - 0.5) * 5;
      floatRef.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handleMouse);
    return () => window.removeEventListener('mousemove', handleMouse);
  }, []);

  // Simple countdown simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 2, minutes: 14, seconds: 0 }; // reset
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="hero graph-bg">
      {/* Subtle blur highlights */}
      <div className="hero-glow g1" aria-hidden="true" />
      <div className="hero-glow g2" aria-hidden="true" />

      <div className="container">
        <div className="hero-inner">
          
          {/* Left - Content (Ruled margins) */}
          <div className="hero-content">
            <div className="section-tag hero-load-in">
              <span className="live-pulse-dot" />
              Online School 2026
            </div>

            <h1 className="hero-title hero-load-in">
              Sri Lanka&apos;s Most Trusted
              <br />
              <span className="theme-gradient display">Mathematics</span> Tuition.
            </h1>

            <p className="hero-desc hero-load-in">
              An authoritative virtual classroom built for precision. Master the syllabus with Ishan Maduranga through live interactive sessions, detailed recordings, and guided tutes.
            </p>

            {/* Quick Grade Selector Selector (Interactive) */}
            <div className="hero-grade-picker-container hero-load-in">
              <span className="picker-label">Select Your Grade:</span>
              <div className="hero-grade-picker">
                {GRADES.map(grade => (
                  <Link key={grade.id} href={`/grades/${grade.id}`} className="grade-pill">
                    G{grade.id}
                  </Link>
                ))}
              </div>
            </div>

            {/* CTAs */}
            <div className="hero-ctas hero-load-in">
              <Link href="/courses" className="btn btn-primary btn-lg">
                Explore Classes
                <svg className="arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                </svg>
              </Link>
              <a
                href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20MathSpark%20classes!`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-lg"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#10B981', marginRight: 4 }}>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.571a.5.5 0 00.61.61l5.736-1.485A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.94a9.923 9.923 0 01-5.065-1.381l-.363-.215-3.76.974.998-3.649-.236-.374A9.94 9.94 0 012.06 12C2.06 6.504 6.504 2.06 12 2.06S21.94 6.504 21.94 12 17.496 21.94 12 21.94z"/>
                </svg>
                WhatsApp Inquiry
              </a>
            </div>

            {/* Credibility stats */}
            <div className="hero-proof hero-load-in">
              <span style={{ fontWeight: 600, fontSize: '0.8125rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted)' }}>Proven Success:</span>
              <span className="proof-text font-semi text-sm">🏆 98% A-Pass Rate O/L &amp; A/L Classrooms</span>
            </div>
          </div>

          {/* Right - Live countdown schedule card */}
          <div className="hero-visual">
            <div ref={floatRef} className="hero-visual-inner float">
              
              <div className="live-panel-card">
                <div className="live-panel-header">
                  <div className="live-badge">
                    <span className="live-dot" />
                    NEXT CLASS COUNTDOWN
                  </div>
                </div>
                
                <div className="live-panel-body">
                  <div className="countdown-display font-mono">
                    <div className="countdown-segment">
                      <span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="countdown-lbl">HOURS</span>
                    </div>
                    <span className="countdown-colon">:</span>
                    <div className="countdown-segment">
                      <span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="countdown-lbl">MINUTES</span>
                    </div>
                    <span className="countdown-colon">:</span>
                    <div className="countdown-segment">
                      <span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="countdown-lbl">SECONDS</span>
                    </div>
                  </div>
                  
                  <div className="live-class-details">
                    <div className="class-label">TODAY&apos;S SCHEDULE</div>
                    <div className="class-name">Grade 10 Theory Class — Sinhala Medium</div>
                    <div className="class-teacher">By Ishan Maduranga</div>
                  </div>
                </div>

                <div className="live-panel-footer">
                  <span className="live-link-pill">Platform Link Ready</span>
                  <span className="live-rating">⭐ 4.95 Class Rating</span>
                </div>
              </div>

              {/* Feature badges — deliberate glassmorphic design */}
              <div className="feature-badge badge-top-left">
                <span className="badge-icon">📚</span>
                <span className="badge-text">PDF Tutes</span>
              </div>
              <div className="feature-badge badge-top-right">
                <span className="badge-icon">💻</span>
                <span className="badge-text">Live Zoom</span>
              </div>
              <div className="feature-badge badge-bottom-left">
                <span className="badge-icon">✅</span>
                <span className="badge-text">O/L · A/L Syllabus</span>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .hero {
          position: relative;
          min-height: 85vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: var(--gradient-hero);
          padding: 100px 0 80px;
        }
        .hero-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          pointer-events: none;
          z-index: 0;
        }
        .g1 { width: 500px; height: 500px; top: -100px; left: -100px; background: rgba(37,99,235,0.08); }
        .g2 { width: 450px; height: 450px; bottom: -100px; right: -50px; background: rgba(245,158,11,0.05); }

        .hero-inner {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
        }

        .live-pulse-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--cobalt-light);
          animation: pulse-glow 2s ease-in-out infinite;
        }

        .hero-title {
          font-size: clamp(2.2rem, 4.5vw, 3.3rem);
          font-weight: 800;
          line-height: 1.15;
          margin-bottom: 18px;
          letter-spacing: -0.02em;
          color: var(--paper);
        }

        .hero-desc {
          font-size: 1.05rem;
          color: var(--text);
          line-height: 1.7;
          margin-bottom: 28px;
          max-width: 520px;
        }

        /* Grade Selector */
        .hero-grade-picker-container {
          margin-bottom: 32px;
        }
        .picker-label {
          display: block;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .hero-grade-picker {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .grade-pill {
          width: 44px; height: 44px;
          border-radius: var(--radius-md);
          background: var(--surface-2);
          border: 1px solid var(--rule);
          color: var(--paper);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.85rem;
          font-weight: 700;
          font-family: var(--font-mono);
          transition: var(--transition);
        }
        .grade-pill:hover {
          background: var(--cobalt);
          border-color: var(--cobalt);
          transform: translateY(-2px);
          box-shadow: var(--shadow-cobalt);
        }

        .hero-ctas {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .hero-proof {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .proof-text {
          color: var(--paper);
        }

        /* Countdown Card */
        .hero-visual {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-visual-inner {
          position: relative;
          width: 100%;
          max-width: 400px;
        }

        .live-panel-card {
          background: var(--surface);
          border: 1px solid var(--rule);
          border-radius: var(--radius-lg);
          padding: 24px;
          box-shadow: var(--shadow-xl);
          position: relative;
        }
        .live-panel-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: var(--radius-lg);
          padding: 1.5px;
          background: linear-gradient(to bottom, var(--rule), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .live-panel-header {
          margin-bottom: 20px;
        }
        .live-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--gold);
          background: var(--gold-glow);
          border: 1px solid rgba(245, 158, 11, 0.3);
          padding: 4px 10px;
          border-radius: var(--radius-sm);
          letter-spacing: 0.05em;
        }
        .live-dot {
          width: 5px; height: 5px;
          background: var(--gold);
          border-radius: 50%;
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        .live-panel-body {
          margin-bottom: 20px;
        }
        
        .countdown-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--surface-2);
          border: 1px solid var(--rule-light);
          padding: 16px;
          border-radius: var(--radius-md);
          margin-bottom: 20px;
        }
        .countdown-segment {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .countdown-num {
          font-size: 1.875rem;
          font-weight: 600;
          color: var(--paper);
          line-height: 1;
        }
        .countdown-lbl {
          font-size: 0.6rem;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 0.05em;
          margin-top: 4px;
        }
        .countdown-colon {
          font-size: 1.5rem;
          font-weight: 600;
          color: var(--rule);
          line-height: 1;
          margin-bottom: 12px;
        }

        .live-class-details {
          text-align: left;
          padding: 4px;
        }
        .class-label {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--muted);
          letter-spacing: 0.08em;
          margin-bottom: 6px;
        }
        .class-name {
          font-size: 0.9375rem;
          font-weight: 700;
          color: var(--paper);
          line-height: 1.4;
          margin-bottom: 4px;
        }
        .class-teacher {
          font-size: 0.78rem;
          color: var(--muted);
        }

        .live-panel-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--rule-light);
          padding-top: 16px;
        }
        .live-link-pill {
          font-size: 0.75rem;
          color: var(--cobalt-light);
          font-weight: 600;
        }
        .live-rating {
          font-size: 0.75rem;
          color: var(--muted);
        }

        /* Float Chips */
        /* ── Feature Badges (glassmorphic) ── */
        .feature-badge {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          background: rgba(15, 18, 28, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--paper);
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06);
          letter-spacing: 0.01em;
          animation: badgeFloat 4s ease-in-out infinite;
          z-index: 2;
        }
        .badge-icon { font-size: 0.95rem; line-height: 1; }
        .badge-text { font-size: 0.77rem; font-weight: 600; opacity: 0.92; }
        .badge-top-left    { top: -18px;    left: 12px;   animation-delay: 0s;   }
        .badge-top-right   { top: -18px;    right: 12px;  animation-delay: 1.4s; }
        .badge-bottom-left { bottom: -18px; left: 12px;   animation-delay: 2.8s; }
        @keyframes badgeFloat {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-5px); }
        }

        @media (max-width: 960px) {
          .hero-inner { grid-template-columns: 1fr; text-align: center; gap: 40px; }
          .hero-desc { margin: 0 auto 28px; }
          .hero-grade-picker { justify-content: center; }
          .hero-ctas { justify-content: center; }
          .hero-proof { justify-content: center; }
          .hero-visual { margin-top: 24px; }
        }

        @media (max-width: 480px) {
          .hero { padding: 80px 0 60px; }
          .hero-ctas .btn { width: 100%; justify-content: center; }
          .feature-badge { display: none; }
        }
      `}</style>
    </section>
  );
}
