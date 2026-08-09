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
      {/* ── 1. HERO SECTION ── */}
      <section className="hero-light">
        <div className="container">
          <div className="hero-grid">
            {/* ── LEFT: Text ── */}
            <div className="hero-text-side">
              <div className="trust-badge-pill">
                <span className="badge-star">★</span>
                {t('hero.tag')}
              </div>

              <h1 className="hero-headline">
                <span className="accent-tag">A/L &amp; O/L MATHEMATICS</span>
                {t('hero.title')}{' '}
                <span className="highlight-blue">{t('hero.titleGradient')}</span>
              </h1>
              <div className="headline-underline" />

              <p className="hero-subtitle">{t('hero.description')}</p>

              {/* Grade Selector Pills */}
              <div className="hero-grades-wrapper">
                <span className="grades-label">{t('sections.browseByGrade')}:</span>
                <div className="grades-pills">
                  {GRADES.map(g => (
                    <Link key={g.id} href={`/grades/${g.id}`} className="grade-pill-item">G{g.id}</Link>
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
                <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn-light-secondary">
                  {/* WhatsApp Icon */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{flexShrink:0}}>
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.855L.057 23.633a.5.5 0 00.609.61l5.879-1.464A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.369l-.36-.214-3.713.924.951-3.62-.234-.372A9.818 9.818 0 1112 21.818z"/>
                  </svg>
                  {t('common.contactUs')}
                </a>
              </div>
            </div>

            {/* ── RIGHT: Image with floating cards & soft purple glow ── */}
            <div className="hphoto-container-side">
              {/* Soft purple background glow */}
              <div className="hphoto-glow-bg" />

              {/* Decorative math elements near top right */}
              <div className="hphoto-math-badge font-mono">a² + b² = c²</div>
              <div className="hphoto-math-symbol font-mono">+</div>
              <div className="hphoto-math-symbol-sub font-mono">∫dx</div>

              {/* Floating feature card 1: Live Classes */}
              <div className="hphoto-float-card fc-pos-live">
                <div className="hphoto-card-icon badge-solid-purple">
                  {/* Webcam icon matching reference */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="10" r="8"/>
                    <circle cx="12" cy="10" r="3"/>
                    <path d="M7 22h10"/>
                    <path d="M12 18v4"/>
                  </svg>
                </div>
                <div>
                  <div className="hphoto-card-title">Live Classes</div>
                  <div className="hphoto-card-sub">Interactive &amp; Engaging</div>
                </div>
              </div>

              {/* Floating feature card 2: Video Recordings */}
              <div className="hphoto-float-card fc-pos-video">
                <div className="hphoto-card-icon badge-solid-orange">
                  {/* Solid white play icon */}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffffff">
                    <polygon points="6 3 20 12 6 21 6 3"/>
                  </svg>
                </div>
                <div>
                  <div className="hphoto-card-title">Video Recordings</div>
                  <div className="hphoto-card-sub">Learn at your pace</div>
                </div>
              </div>

              {/* Floating feature card 3: 24/7 Support */}
              <div className="hphoto-float-card fc-pos-support">
                <div className="hphoto-card-icon badge-solid-green">
                  {/* White WhatsApp icon inside green circular badge */}
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a11.945 11.945 0 00-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.855L.057 23.633a.5.5 0 00.609.61l5.879-1.464A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.001-1.369l-.36-.214-3.713.924.951-3.62-.234-.372A9.818 9.818 0 1112 21.818z"/>
                  </svg>
                </div>
                <div>
                  <div className="hphoto-card-title">24/7 Support</div>
                  <div className="hphoto-card-sub">We&apos;re here for you!</div>
                </div>
              </div>

              {/* Main Photo */}
              <img
                src="/ishan_teaching.jpg"
                alt="Ishan Maduranga Mathematics"
                className="hphoto-main-img"
              />

              {/* Stat card showing "98% A-Pass Rate" (no Active Students text) */}
              <div className="hphoto-stat-badge">
                <div className="hphoto-stat-stars">★★★★★</div>
                <div className="hphoto-stat-val">98% A-Pass Rate</div>
              </div>
            </div>
          </div>

          {/* ── Bottom Trust Bar Card ── */}
          <div className="tbar-card-container">
            {/* 1. Expert Teachers (Purple/Indigo Circle Badge) */}
            <div className="tbar-item">
              <div className="tbar-icon-badge badge-solid-purple">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                </svg>
              </div>
              <div>
                <div className="tbar-title">Expert Teachers</div>
                <div className="tbar-sub">Experienced &amp; Qualified</div>
              </div>
            </div>

            <div className="tbar-divider" />

            {/* 2. Result Focused (Pink/Red Circle Badge) */}
            <div className="tbar-item">
              <div className="tbar-icon-badge badge-solid-pink">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </div>
              <div>
                <div className="tbar-title">Result Focused</div>
                <div className="tbar-sub">Proven Exam Success</div>
              </div>
            </div>

            <div className="tbar-divider" />

            {/* 3. Trusted by Parents (Blue Circle Badge) */}
            <div className="tbar-item">
              <div className="tbar-icon-badge badge-solid-blue">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  <polyline points="9 12 11 14 15 10"/>
                </svg>
              </div>
              <div>
                <div className="tbar-title">Trusted by Parents</div>
                <div className="tbar-sub">Safe &amp; Reliable Platform</div>
              </div>
            </div>

            <div className="tbar-divider" />

            {/* 4. 98% A-Pass Rate (Amber/Gold Circle Badge - No Subtitle) */}
            <div className="tbar-item">
              <div className="tbar-icon-badge badge-solid-amber">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#ffffff">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div>
                <div className="tbar-title">98% A-Pass Rate</div>
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
          background: linear-gradient(135deg, #f8fafc 0%, #ede9fe 60%, #e0e7ff 100%);
          padding: 64px 0 0;
          position: relative;
          overflow: hidden;
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          align-items: center;
        }
        /* LEFT */
        .hero-text-side {
          padding-bottom: 40px;
        }
        .trust-badge-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 7px 16px;
          background: #ffffff;
          border: 1.5px solid #e0e7ff;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #4f46e5;
          margin-bottom: 20px;
          box-shadow: 0 2px 8px rgba(79,70,229,0.08);
        }
        .badge-star { color: #4f46e5; font-size: 0.9rem; }
        .badge-dot { width:8px;height:8px;border-radius:50%;background:#4f46e5; }
        .accent-tag {
          display: block;
          font-size: 0.82rem;
          font-weight: 800;
          color: #4f46e5;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 10px;
        }
        .hero-headline {
          font-size: clamp(2.2rem, 4.5vw, 3.2rem);
          font-weight: 900;
          line-height: 1.13;
          color: #0f172a;
          letter-spacing: -0.035em;
          margin: 0 0 12px;
        }
        .highlight-blue {
          background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 60%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: 900;
        }
        .headline-underline {
          width: 48px;
          height: 4px;
          border-radius: 2px;
          background: linear-gradient(90deg, #4f46e5, #7c3aed);
          margin-bottom: 20px;
        }
        .hero-subtitle {
          font-size: 1rem;
          color: #475569;
          line-height: 1.65;
          margin-bottom: 24px;
          max-width: 480px;
        }
        /* Grade pills */
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
          color: #475569;
        }
        .grades-pills { display:flex;gap:8px;flex-wrap:wrap; }
        .grade-pill-item {
          padding: 6px 16px;
          background: #f3e8ff;
          border: 1px solid #e9d5ff;
          border-radius: 9999px;
          font-size: 0.82rem;
          font-weight: 800;
          color: #6b21a8;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 1px 2px rgba(107,33,168,0.05);
        }
        .grade-pill-item:hover {
          background: #7c3aed;
          color: #ffffff;
          border-color: #7c3aed;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(124,58,237,0.3);
        }
        /* Buttons */
        .hero-actions { display:flex;align-items:center;gap:14px;margin-bottom:0;flex-wrap:wrap; }
        .btn-light-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 48px;
          background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%);
          color: #ffffff;
          padding: 0 28px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(37, 99, 235, 0.35);
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
          box-sizing: border-box;
        }
        .btn-light-primary:hover {
          background: linear-gradient(90deg, #1d4ed8 0%, #6d28d9 100%);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(124, 58, 237, 0.45);
          color: #ffffff;
        }
        .btn-light-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          height: 48px;
          background: #ffffff;
          color: #1e293b;
          border: 1.5px solid #cbd5e1;
          padding: 0 24px;
          border-radius: 12px;
          font-size: 0.95rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          transition: all 0.2s cubic-bezier(0.16,1,0.3,1);
          box-sizing: border-box;
        }
        .btn-light-secondary:hover {
          background: #f8fafc;
          border-color: #94a3b8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        /* ── HERO PHOTO SIDE SCOPED STYLES (hphoto-*) ── */
        .hphoto-container-side {
          position: relative;
          height: 460px;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }
        .hphoto-glow-bg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 360px;
          height: 360px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167, 139, 250, 0.45) 0%, rgba(139, 92, 246, 0.25) 50%, rgba(255,255,255,0) 75%);
          filter: blur(20px);
          pointer-events: none;
        }
        .hphoto-main-img {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 380px;
          height: 440px;
          object-fit: cover;
          object-position: top center;
          border-radius: 20px;
          display: block;
          box-shadow: 0 20px 40px rgba(124, 58, 237, 0.15);
        }
        .hphoto-math-badge {
          position: absolute;
          top: 8%;
          right: 2%;
          z-index: 3;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(196, 181, 253, 0.8);
          backdrop-filter: blur(8px);
          padding: 6px 14px;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 800;
          color: #7c3aed;
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.1);
        }
        .hphoto-math-symbol {
          position: absolute;
          top: 22%;
          right: 0%;
          z-index: 3;
          font-size: 1.6rem;
          color: #a78bfa;
          opacity: 0.6;
        }
        .hphoto-math-symbol-sub {
          position: absolute;
          bottom: 35%;
          right: -2%;
          z-index: 3;
          font-size: 0.9rem;
          color: #7c3aed;
          opacity: 0.5;
        }
        .hphoto-float-card {
          position: absolute;
          z-index: 4;
          background: #ffffff;
          border-radius: 14px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          border: 1px solid rgba(226, 232, 240, 0.8);
          white-space: nowrap;
          animation: floatCardHero 3.5s ease-in-out infinite alternate;
        }
        @keyframes floatCardHero {
          0% { transform: translateY(0); }
          100% { transform: translateY(-8px); }
        }
        .fc-pos-live {
          top: 28%;
          left: -4%;
          animation-delay: 0s;
        }
        .fc-pos-video {
          bottom: 22%;
          left: -2%;
          animation-delay: 1.2s;
        }
        .fc-pos-support {
          top: 48%;
          right: -4%;
          animation-delay: 0.6s;
        }
        .hphoto-card-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .badge-solid-purple {
          background: linear-gradient(135deg, #7c3aed 0%, #6d28d9 100%);
          box-shadow: 0 4px 12px rgba(124, 58, 237, 0.3);
        }
        .badge-solid-orange {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        .badge-solid-green {
          background: linear-gradient(135deg, #25D366 0%, #16a34a 100%);
          box-shadow: 0 4px 12px rgba(37, 211, 102, 0.3);
        }
        .hphoto-card-title {
          font-size: 0.85rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
        }
        .hphoto-card-sub {
          font-size: 0.72rem;
          color: #64748b;
          font-weight: 500;
        }
        .hphoto-stat-badge {
          position: absolute;
          bottom: -10px;
          right: -2%;
          z-index: 5;
          background: linear-gradient(135deg, #4f46e5 0%, #3730a3 100%);
          color: #ffffff;
          border-radius: 14px;
          padding: 12px 20px;
          text-align: center;
          box-shadow: 0 8px 24px rgba(79, 70, 229, 0.35);
        }
        .hphoto-stat-stars {
          font-size: 0.9rem;
          color: #fbbf24;
          letter-spacing: 2px;
          margin-bottom: 2px;
        }
        .hphoto-stat-val {
          font-size: 0.95rem;
          font-weight: 800;
        }

        /* ── SINGLE WHITE TRUST BAR CARD (tbar-*) ── */
        .tbar-card-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #ffffff;
          border-radius: 16px;
          padding: 22px 32px;
          margin-top: 48px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.06);
          border: 1px solid #f1f5f9;
        }
        .tbar-item {
          display: flex;
          align-items: center;
          gap: 14px;
          flex: 1;
        }
        .tbar-icon-badge {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .badge-solid-pink {
          background: linear-gradient(135deg, #ec4899 0%, #db2777 100%);
          box-shadow: 0 4px 12px rgba(236, 72, 153, 0.3);
        }
        .badge-solid-blue {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }
        .badge-solid-amber {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }
        .tbar-title {
          font-size: 0.925rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.25;
        }
        .tbar-sub {
          font-size: 0.78rem;
          color: #64748b;
          font-weight: 500;
          margin-top: 2px;
        }
        .tbar-divider {
          width: 1px;
          height: 36px;
          background: #e2e8f0;
          margin: 0 24px;
          flex-shrink: 0;
        }
        @media (max-width: 900px) {
          .tbar-card-container {
            flex-direction: column;
            gap: 20px;
            align-items: flex-start;
            padding: 20px;
          }
          .tbar-divider { display: none; }
        }

        /* Hero Image Container & AP.LK Animated Elements */
        .hero-image-card {
          position: relative;
          border-radius: 24px;
          padding: 10px;
          background: #ffffff;
          box-shadow: 0 20px 50px rgba(37,99,235,0.12);
          transition: transform 0.3s ease;
        }
        .animated-hero-glow {
          animation: heroGlowPulse 4s ease-in-out infinite alternate;
        }
        @keyframes heroGlowPulse {
          0% { box-shadow: 0 20px 50px rgba(37,99,235,0.12), 0 0 0 0px rgba(37,99,235,0.1); }
          50% { box-shadow: 0 25px 60px rgba(124,58,237,0.18), 0 0 0 8px rgba(124,58,237,0.08); }
          100% { box-shadow: 0 20px 50px rgba(37,99,235,0.12), 0 0 0 0px rgba(37,99,235,0.1); }
        }
        .hero-main-img {
          width: 100%;
          height: 420px;
          object-fit: cover;
          border-radius: 18px;
          transition: transform 0.4s ease;
        }
        .hero-image-card:hover .hero-main-img {
          transform: scale(1.015);
        }

        /* Floating particles */
        .hero-floating-particle {
          position: absolute;
          background: rgba(255,255,255,0.92);
          border: 1px solid rgba(226,232,240,0.8);
          backdrop-filter: blur(8px);
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.82rem;
          font-weight: 800;
          color: #2563eb;
          box-shadow: 0 6px 16px rgba(0,0,0,0.06);
          z-index: 5;
          pointer-events: none;
        }
        .particle-1 {
          top: 40px; left: -24px;
          animation: floatParticle1 5s ease-in-out infinite alternate;
          color: #2563eb;
        }
        .particle-2 {
          bottom: 80px; right: -20px;
          animation: floatParticle2 6s ease-in-out infinite alternate;
          color: #7c3aed;
        }
        .particle-3 {
          top: 180px; left: -30px;
          animation: floatParticle1 4.5s ease-in-out infinite alternate-reverse;
          color: #ec4899;
        }
        @keyframes floatParticle1 {
          0% { transform: translateY(0px) rotate(-3deg); }
          100% { transform: translateY(-12px) rotate(4deg); }
        }
        @keyframes floatParticle2 {
          0% { transform: translateY(0px) rotate(4deg); }
          100% { transform: translateY(-15px) rotate(-2deg); }
        }

        .floating-stat-card {
          position: absolute;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(12px);
          padding: 12px 20px;
          border-radius: 18px;
          box-shadow: 0 12px 35px rgba(0,0,0,0.12);
          display: flex;
          align-items: center;
          gap: 12px;
          border: 1px solid rgba(255,255,255,0.8);
          z-index: 6;
          transition: transform 0.3s ease;
        }
        .float-card-1 {
          top: -22px; right: -22px;
          animation: floatCardTop 4s ease-in-out infinite alternate;
        }
        .float-card-2 {
          bottom: -22px; left: -22px;
          animation: floatCardBottom 4.5s ease-in-out infinite alternate;
        }
        @keyframes floatCardTop {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
        @keyframes floatCardBottom {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-8px); }
        }
        .floating-stat-card:hover {
          transform: scale(1.05) translateY(-4px) !important;
        }

        .stat-icon-bg {
          width: 46px; height: 46px;
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .small-medal {
          width: 32px; height: 32px;
          border-width: 2px;
        }
        .small-num {
          font-size: 1.1rem;
        }
        .small-ribbon {
          bottom: -8px;
          border-left-width: 9px;
          border-right-width: 9px;
          border-top-width: 9px;
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

        /* ── RESPONSIVE MEDIA QUERIES ── */
        @media (max-width: 1024px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; }
          .hero-text-side { text-align: center; display: flex; flex-direction: column; align-items: center; }
          .hero-subtitle { margin: 0 auto 28px; }
          .hero-grades-wrapper { justify-content: center; }
          .hero-actions { justify-content: center; }
          .feature-cards-grid { grid-template-columns: 1fr; gap: 20px; }
          .process-grid { grid-template-columns: 1fr; gap: 20px; }
          .instructor-bio-grid { grid-template-columns: 1fr; text-align: center; }
          .instructor-highlights { justify-content: center; text-align: left; }
        }

        @media (max-width: 640px) {
          .hero-light { padding: 40px 0 60px; }
          .hero-headline { font-size: 1.8rem; }
          .accent-tag { font-size: 1rem; }
          .hero-subtitle { font-size: 0.95rem; }
          .hero-actions { flex-direction: column; width: 100%; gap: 10px; }
          .btn-light-primary, .btn-light-secondary { width: 100%; justify-content: center; }
          .hero-image-card { padding: 6px; }
          .hero-main-img { height: 300px; }
          .card-top { top: -15px; right: -10px; padding: 8px 12px; }
          .card-bottom { bottom: -15px; left: -10px; padding: 8px 12px; }
          .stat-number { font-size: 0.95rem; }
          .stat-desc { font-size: 0.65rem; }
          .stat-icon-bg { width: 36px; height: 36px; }
          .particle-1, .particle-2, .particle-3 { display: none; }
          .feature-card, .process-card { padding: 24px 18px; }
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
