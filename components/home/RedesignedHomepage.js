'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SITE, GRADES } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function RedesignedHomepage() {
  const { t } = useLanguage();
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const processSteps = [
    {
      step: '01',
      title: t('sections.step1Title'),
      desc: t('sections.step1Desc'),
      icon: '💡',
      color: '#e0e7ff',
      textColor: '#3730a3',
    },
    {
      step: '02',
      title: t('sections.step2Title'),
      desc: t('sections.step2Desc'),
      icon: '✍️',
      color: '#f3e8ff',
      textColor: '#6b21a8',
    },
    {
      step: '03',
      title: t('sections.step3Title'),
      desc: t('sections.step3Desc'),
      icon: '🚀',
      color: '#fce7f3',
      textColor: '#9d174d',
    },
  ];

  const faqs = [
    {
      q: t('sections.faq1Q'),
      a: t('sections.faq1A'),
    },
    {
      q: t('sections.faq2Q'),
      a: t('sections.faq2A'),
    },
    {
      q: t('sections.faq3Q'),
      a: t('sections.faq3A'),
    },
    {
      q: t('sections.faq4Q'),
      a: t('sections.faq4A'),
    },
    {
      q: t('sections.faq5Q'),
      a: t('sections.faq5A'),
    },
  ];

  return (
    <div className="light-theme-wrapper">
      {/* ── 1. VIBRANT HERO SECTION ── */}
      <section className="hero-light">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text-side">
              <div className="trust-badge-pill">
                <span className="badge-dot" />
                {t('hero.tag')}
              </div>

              <h1 className="hero-headline">
                <span className="accent-tag">A/L &amp; O/L MATHEMATICS</span>
                <br />
                {t('hero.title')} <span className="highlight-blue">{t('hero.titleGradient')}</span>
              </h1>

              <p className="hero-subtitle">
                {t('hero.description')}
              </p>

              {/* Grade Selector Pills */}
              <div className="hero-grades-wrapper">
                <span className="grades-label">{t('sections.browseByGrade')}:</span>
                <div className="grades-pills">
                  {GRADES.map(g => (
                    <Link key={g.id} href={`/grades/${g.id}`} className="grade-pill-item">
                      G{g.id}
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="hero-actions">
                <Link href="/courses" className="btn-light-primary">
                  <span>{t('common.exploreClasses')}</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
                <Link href="/contact" className="btn-light-secondary">
                  {t('common.contactUs')}
                </Link>
              </div>

              {/* Trust indicator */}
              <div className="hero-trust-row">
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <span className="trust-text"><strong>98% {t('hero.statPass')}</strong> ({t('hero.statStudents')})</span>
              </div>
            </div>

            <div className="hero-image-side">
              <div className="hero-image-card">
                <img
                  src="/ishan_teaching.jpg"
                  alt="Ishan Maduranga Mathematics"
                  className="hero-main-img"
                />
                <div className="floating-stat-card card-top">
                  <div className="stat-icon-bg">🎓</div>
                  <div>
                    <div className="stat-number">15,000+</div>
                    <div className="stat-desc">{t('hero.statStudents')}</div>
                  </div>
                </div>
                <div className="floating-stat-card card-bottom">
                  <div className="stat-icon-bg">🏆</div>
                  <div>
                    <div className="stat-number">98%</div>
                    <div className="stat-desc">{t('hero.statPass')}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. FEATURE CARDS ROW ── */}
      <section className="section-light bg-white">
        <div className="container">
          <div className="feature-cards-grid">
            <div className="feature-card">
              <div className="feature-icon-wrapper bg-gradient-blue animated-badge">
                <svg className="badge-3d-svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <h3 className="feature-card-title">{t('sections.feat1Title')}</h3>
              <p className="feature-card-desc">
                {t('sections.feat1Desc')}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper bg-gradient-purple animated-badge">
                <div className="ap-medal-badge">
                  <span className="medal-number">1</span>
                  <div className="medal-ribbon" />
                </div>
              </div>
              <h3 className="feature-card-title">{t('sections.feat2Title')}</h3>
              <p className="feature-card-desc">
                {t('sections.feat2Desc')}
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper bg-gradient-pink animated-badge">
                <svg className="badge-3d-svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                  <polyline points="10 9 9 9 8 9"/>
                </svg>
              </div>
              <h3 className="feature-card-title">{t('sections.feat3Title')}</h3>
              <p className="feature-card-desc">
                {t('sections.feat3Desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OUR PROCESS SECTION ── */}
      <section className="section-light bg-slate">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">{t('sections.methodology')}</span>
            <h2 className="section-title-dark">{t('sections.processTitle')}</h2>
            <p className="section-subtitle-dark">
              {t('sections.processSubtitle')}
            </p>
          </div>

          <div className="process-grid">
            <div className="process-card">
              <div className="process-step-pill" style={{ background: '#e0e7ff', color: '#3730a3' }}>01</div>
              <div className="process-icon-wrapper bg-gradient-yellow animated-badge">
                <svg className="badge-3d-svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/>
                  <path d="M9 18h6"/>
                  <path d="M10 22h4"/>
                </svg>
              </div>
              <h3 className="process-title">{t('sections.step1Title')}</h3>
              <p className="process-desc">{t('sections.step1Desc')}</p>
            </div>

            <div className="process-card">
              <div className="process-step-pill" style={{ background: '#f3e8ff', color: '#6b21a8' }}>02</div>
              <div className="process-icon-wrapper bg-gradient-orange animated-badge">
                <svg className="badge-3d-svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </div>
              <h3 className="process-title">{t('sections.step2Title')}</h3>
              <p className="process-desc">{t('sections.step2Desc')}</p>
            </div>

            <div className="process-card">
              <div className="process-step-pill" style={{ background: '#fce7f3', color: '#9d174d' }}>03</div>
              <div className="process-icon-wrapper bg-gradient-rocket animated-badge">
                <svg className="badge-3d-svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.26-1.5 1.76-2.31M12 15l-3-3M8.5 8.5l3 3M15 12l.55.55A6 6 0 0 0 21 7.5V3h-4.5a6 6 0 0 0-5.05 5.45L12 9"/>
                </svg>
              </div>
              <h3 className="process-title">{t('sections.step3Title')}</h3>
              <p className="process-desc">{t('sections.step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. INSTRUCTOR BIO SECTION ── */}
      <section className="section-light bg-white">
        <div className="container">
          <div className="instructor-bio-grid">
            <div className="instructor-photo-side">
              <div className="instructor-photo-wrapper">
                <img
                  src="/ishan_portrait.jpg"
                  alt="Ishan Maduranga"
                  className="instructor-img"
                />
                <div className="instructor-experience-badge">
                  <span className="exp-years">10+</span>
                  <span className="exp-text">{t('sections.expYears')}</span>
                </div>
              </div>
            </div>

            <div className="instructor-info-side">
              <span className="section-badge">{t('sections.meetTeacherTag')}</span>
              <h2 className="instructor-name">Ishan Maduranga</h2>
              <div className="instructor-qual">{t('sections.instructorTitle')}</div>
              
              <p className="instructor-bio-p">
                {t('sections.instructorBio1')}
              </p>
              <p className="instructor-bio-p">
                {t('sections.instructorBio2')}
              </p>

              <div className="instructor-highlights">
                <div className="highlight-item">
                  <span className="check-icon">✓</span>
                  <span>{t('sections.instructorHighlight1')}</span>
                </div>
                <div className="highlight-item">
                  <span className="check-icon">✓</span>
                  <span>{t('sections.instructorHighlight2')}</span>
                </div>
                <div className="highlight-item">
                  <span className="check-icon">✓</span>
                  <span>{t('sections.instructorHighlight3')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ SECTION ── */}
      <section className="section-light bg-slate">
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="section-header-center">
            <span className="section-badge">{t('sections.faq').toUpperCase()}</span>
            <h2 className="section-title-dark">{t('sections.faq')}</h2>
            <p className="section-subtitle-dark">
              {t('sections.faqSubtitle')}
            </p>
          </div>

          <div className="faq-accordion">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className={`faq-item ${isOpen ? 'open' : ''}`}>
                  <button className="faq-question-btn" onClick={() => toggleFaq(idx)}>
                    <span>{faq.q}</span>
                    <span className="faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                  </button>
                  {isOpen && (
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STYLES ── */}
      <style jsx>{`
        .light-theme-wrapper {
          background: #ffffff;
          color: #0f172a;
          font-family: var(--font-body), sans-serif;
        }

        /* ── HERO LIGHT ── */
        .hero-light {
          background: linear-gradient(135deg, #eef2ff 0%, #f3e8ff 50%, #fce7f3 100%);
          padding: 80px 0 90px;
          position: relative;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .trust-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid #cbd5e1;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #2563eb;
          box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          margin-bottom: 24px;
        }
        .badge-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #2563eb;
        }
        .hero-headline {
          font-size: clamp(2.2rem, 5vw, 3.4rem);
          font-weight: 800;
          line-height: 1.15;
          color: #0f172a;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }
        .accent-tag {
          font-size: 1.25rem;
          color: #6366f1;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }
        .highlight-blue {
          color: #2563eb;
          background: linear-gradient(120deg, #2563eb, #7c3aed);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .hero-subtitle {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 28px;
          max-width: 540px;
        }
        .hero-grades-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }
        .grades-label {
          font-size: 0.85rem;
          font-weight: 700;
          color: #64748b;
        }
        .grades-pills {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .grade-pill-item {
          padding: 5px 12px;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #1e293b;
          text-decoration: none;
          transition: all 0.2s;
        }
        .grade-pill-item:hover {
          background: #2563eb;
          color: #ffffff;
          border-color: #2563eb;
        }
        .hero-actions {
          display: flex;
          gap: 16px;
          margin-bottom: 32px;
        }
        .btn-light-primary {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #2563eb;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 4px 20px rgba(37,99,235,0.3);
          transition: all 0.2s;
        }
        .btn-light-primary:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
          box-shadow: 0 6px 24px rgba(37,99,235,0.4);
        }
        .btn-light-secondary {
          display: inline-flex;
          align-items: center;
          background: #ffffff;
          color: #0f172a;
          border: 1px solid #cbd5e1;
          padding: 14px 28px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.2s;
        }
        .btn-light-secondary:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }
        .hero-trust-row {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          color: #475569;
        }

        /* Hero Image Container */
        .hero-image-card {
          position: relative;
          border-radius: 24px;
          padding: 10px;
          background: #ffffff;
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
        }
        .hero-main-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 18px;
        }
        .floating-stat-card {
          position: absolute;
          background: #ffffff;
          padding: 12px 20px;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid #f1f5f9;
        }
        .card-top { top: -20px; right: -20px; }
        .card-bottom { bottom: -20px; left: -20px; }
        .stat-icon-bg {
          width: 44px; height: 44px;
          border-radius: 12px;
          background: #eff6ff;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.3rem;
        }
        .stat-number { font-size: 1.1rem; font-weight: 800; color: #0f172a; }
        .stat-desc { font-size: 0.75rem; color: #64748b; font-weight: 600; }

        /* ── SECTIONS GENERAL ── */
        .section-light { padding: 80px 0; }
        .bg-white { background: #ffffff; }
        .bg-slate { background: #f8fafc; }

        .section-header-center {
          text-align: center;
          margin-bottom: 50px;
        }
        .section-badge {
          display: inline-block;
          font-size: 0.75rem;
          font-weight: 800;
          color: #2563eb;
          letter-spacing: 0.1em;
          background: #eff6ff;
          padding: 4px 12px;
          border-radius: 999px;
          margin-bottom: 12px;
        }
        .section-title-dark {
          font-size: 2.2rem;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
          margin-bottom: 12px;
        }
        .section-subtitle-dark {
          font-size: 1rem;
          color: #64748b;
          max-width: 600px;
          margin: 0 auto;
        }

        /* ── FEATURE CARDS AP.LK ANIMATED 3D BADGES ── */
        .feature-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .feature-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 40px 30px;
          box-shadow: 0 8px 30px rgba(0,0,0,0.04);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          position: relative;
        }
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(37,99,235,0.12);
          border-color: #bfdbfe;
        }
        .feature-icon-wrapper {
          width: 80px; height: 80px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 24px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          position: relative;
          transition: transform 0.3s ease;
        }
        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(4deg);
        }

        /* 3D AP.LK Medal Badge Styles */
        .bg-gradient-blue {
          background: linear-gradient(135deg, #2563eb 0%, #3b82f6 100%);
          color: #ffffff;
        }
        .bg-gradient-purple {
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
          color: #ffffff;
        }
        .bg-gradient-pink {
          background: linear-gradient(135deg, #ec4899 0%, #f43f5e 100%);
          color: #ffffff;
        }

        .animated-badge {
          animation: badgeFloat 3.5s ease-in-out infinite alternate;
        }
        @keyframes badgeFloat {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }

        /* Medal #1 Badge design matching AP.LK */
        .ap-medal-badge {
          width: 46px; height: 46px;
          background: #fbbf24;
          border-radius: 50%;
          border: 3px solid #ffffff;
          display: flex; align-items: center; justify-content: center;
          position: relative;
          box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        }
        .medal-number {
          font-size: 1.6rem;
          font-weight: 900;
          color: #78350f;
          font-family: var(--font-heading), sans-serif;
          line-height: 1;
        }
        .medal-ribbon {
          position: absolute;
          bottom: -12px;
          width: 0; height: 0;
          border-left: 14px solid transparent;
          border-right: 14px solid transparent;
          border-top: 14px solid #dc2626;
          filter: drop-shadow(0 2px 4px rgba(0,0,0,0.2));
        }

        .badge-3d-svg {
          filter: drop-shadow(0 4px 6px rgba(0,0,0,0.2));
        }

        .feature-card-title { font-size: 1.3rem; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
        .feature-card-desc { font-size: 0.95rem; color: #64748b; line-height: 1.6; }

        /* ── PROCESS GRID & ANIMATED 3D BADGES ── */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .process-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 36px 28px;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .process-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(37,99,235,0.08);
          border-color: #cbd5e1;
        }
        .process-step-pill {
          position: absolute;
          top: 24px; right: 24px;
          font-size: 0.8rem; font-weight: 800;
          padding: 4px 12px; border-radius: 999px;
        }
        .process-icon-wrapper {
          width: 64px; height: 64px;
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
          box-shadow: 0 8px 20px rgba(0,0,0,0.12);
        }
        .bg-gradient-yellow {
          background: linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%);
          color: #ffffff;
        }
        .bg-gradient-orange {
          background: linear-gradient(135deg, #ea580c 0%, #f97316 100%);
          color: #ffffff;
        }
        .bg-gradient-rocket {
          background: linear-gradient(135deg, #0284c7 0%, #38bdf8 100%);
          color: #ffffff;
        }
        .process-title { font-size: 1.25rem; font-weight: 800; color: #0f172a; margin-bottom: 12px; }
        .process-desc { font-size: 0.92rem; color: #64748b; line-height: 1.6; }

        /* ── INSTRUCTOR BIO ── */
        .instructor-bio-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 60px;
          align-items: center;
        }
        .instructor-photo-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        .instructor-img {
          width: 100%; height: 480px; object-fit: cover; display: block;
        }
        .instructor-experience-badge {
          position: absolute;
          bottom: 20px; left: 20px; right: 20px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(10px);
          padding: 16px 24px;
          border-radius: 16px;
          color: #ffffff;
          display: flex; align-items: center; gap: 16px;
        }
        .exp-years { font-size: 1.8rem; font-weight: 800; color: #38bdf8; }
        .exp-text { font-size: 0.9rem; font-weight: 600; color: #f1f5f9; }
        .instructor-name { font-size: 2.4rem; font-weight: 800; color: #0f172a; margin-bottom: 6px; }
        .instructor-qual { font-size: 0.95rem; font-weight: 700; color: #2563eb; margin-bottom: 20px; }
        .instructor-bio-p { font-size: 0.95rem; color: #475569; line-height: 1.7; margin-bottom: 16px; }
        .instructor-highlights { margin-top: 24px; display: flex; flex-direction: column; gap: 10px; }
        .highlight-item { display: flex; align-items: center; gap: 10px; font-weight: 600; color: #1e293b; font-size: 0.95rem; }
        .check-icon {
          width: 24px; height: 24px; border-radius: 50%; background: #dcfce7; color: #16a34a;
          display: flex; align-items: center; justify-content: center; font-size: 0.8rem; font-weight: 800;
        }

        /* ── FAQ ACCORDION ── */
        .faq-accordion { display: flex; flex-direction: column; gap: 14px; }
        .faq-item {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.2s;
        }
        .faq-item.open { border-color: #2563eb; box-shadow: 0 4px 16px rgba(37,99,235,0.06); }
        .faq-question-btn {
          width: 100%;
          padding: 20px 24px;
          background: none; border: none;
          display: flex; justify-content: space-between; align-items: center;
          font-size: 1.05rem; font-weight: 700; color: #0f172a;
          cursor: pointer; text-align: left;
        }
        .faq-toggle-icon { font-size: 1.4rem; color: #2563eb; font-weight: 700; }
        .faq-answer {
          padding: 0 24px 20px;
          font-size: 0.95rem; color: #475569; line-height: 1.6;
        }

        /* Responsive */
        @media (max-width: 992px) {
          .hero-grid, .instructor-bio-grid { grid-template-columns: 1fr; gap: 40px; }
          .feature-cards-grid, .process-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
