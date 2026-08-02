'use client';
import { useState } from 'react';
import Link from 'next/link';
import { SITE, GRADES } from '@/lib/data';

export default function RedesignedHomepage() {
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const processSteps = [
    {
      step: '01',
      title: 'Theory & Concept Mastery',
      desc: 'Deep-dive into core mathematical concepts with step-by-step proofs, visual aids, and interactive breakdown of complex syllabus topics.',
      icon: '💡',
      color: '#e0e7ff',
      textColor: '#3730a3',
    },
    {
      step: '02',
      title: 'Structured Practice & Tests',
      desc: 'Targeted model papers, past O/L & A/L examination papers, timed MCQ tests, and monthly progress evaluations to build accuracy.',
      icon: '✍️',
      color: '#f3e8ff',
      textColor: '#6b21a8',
    },
    {
      step: '03',
      title: 'Live Interactive Classes',
      desc: 'Engaging real-time online streams with direct voice Q&A, instant doubt resolution, and full HD recording access for revision anytime.',
      icon: '🚀',
      color: '#fce7f3',
      textColor: '#9d174d',
    },
  ];

  const faqs = [
    {
      q: 'How do I enroll in Ishan Maduranga’s Mathematics classes?',
      a: 'You can register a free account on MathSpark, select your grade under the Classes section, and choose your preferred batch (Sinhala or English Medium). Complete payment via online gateway or bank transfer to unlock live stream links & tutes.',
    },
    {
      q: 'How are physical tutes and revision packs delivered?',
      a: 'Printed revision workbooks, past paper collections, and tute packs are dispatched via Domex Express courier to your home address in Sri Lanka. You can track your shipment anytime on our Tracking page.',
    },
    {
      q: 'What if I miss a live online class?',
      a: 'Every live session is recorded in High Definition and uploaded to your student portal within 24 hours. You can re-watch any lesson as many times as you like until your final examinations.',
    },
    {
      q: 'Can I ask questions during live online streams?',
      a: 'Yes! Our custom virtual classroom includes a live Q&A panel and audio mic access during designated Q&A segments so you can clarify any doubts directly with Ishan sir.',
    },
    {
      q: 'Are classes available in both Sinhala and English medium?',
      a: 'Yes, we conduct separate dedicated streams for Sinhala medium and English medium students across Grades 6 to 11 and A/L classes.',
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
                Sri Lanka&apos;s #1 Trusted Math Platform
              </div>

              <h1 className="hero-headline">
                <span className="accent-tag">A/L &amp; O/L Mathematics</span>
                <br />
                Master Math with <span className="highlight-blue">Ishan Maduranga</span>
              </h1>

              <p className="hero-subtitle">
                Transform your understanding of Mathematics through interactive live streams, structured problem-solving, and proven exam paper strategies.
              </p>

              {/* Grade Selector Pills */}
              <div className="hero-grades-wrapper">
                <span className="grades-label">Select Grade:</span>
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
                  <span>Explore Classes</span>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
                <Link href="/contact" className="btn-light-secondary">
                  Contact Us
                </Link>
              </div>

              {/* Trust indicator */}
              <div className="hero-trust-row">
                <span className="stars">⭐⭐⭐⭐⭐</span>
                <span className="trust-text"><strong>98% A-Pass Rate</strong> across 15,000+ Students nationwide</span>
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
                    <div className="stat-desc">Enrolled Students</div>
                  </div>
                </div>
                <div className="floating-stat-card card-bottom">
                  <div className="stat-icon-bg">🏆</div>
                  <div>
                    <div className="stat-number">98%</div>
                    <div className="stat-desc">A/B Pass Accuracy</div>
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
              <div className="feature-icon-wrapper bg-blue-light">
                <span>📚</span>
              </div>
              <h3 className="feature-card-title">Live &amp; Recorded Classes</h3>
              <p className="feature-card-desc">
                High-definition live interactive lectures with instant video replay access available 24/7 on your personal dashboard.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper bg-purple-light">
                <span>🏆</span>
              </div>
              <h3 className="feature-card-title">Proven Top Results</h3>
              <p className="feature-card-desc">
                Consistent track record of island-best and district-best rankings in G.C.E. O/L and A/L Mathematics examinations.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-wrapper bg-pink-light">
                <span>📝</span>
              </div>
              <h3 className="feature-card-title">Timed MCQ &amp; Model Exams</h3>
              <p className="feature-card-desc">
                Interactive digital exam portal with automated marking, detailed paper solutions, and performance analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. OUR PROCESS SECTION ── */}
      <section className="section-light bg-slate">
        <div className="container">
          <div className="section-header-center">
            <span className="section-badge">METHODOLOGY</span>
            <h2 className="section-title-dark">Our 3-Step Learning Process</h2>
            <p className="section-subtitle-dark">
              A systematic teaching methodology crafted to make even the hardest calculus and algebra concepts intuitive.
            </p>
          </div>

          <div className="process-grid">
            {processSteps.map((p) => (
              <div key={p.step} className="process-card">
                <div className="process-step-pill" style={{ background: p.color, color: p.textColor }}>
                  {p.step}
                </div>
                <div className="process-icon">{p.icon}</div>
                <h3 className="process-title">{p.title}</h3>
                <p className="process-desc">{p.desc}</p>
              </div>
            ))}
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
                  <span className="exp-text">Years of Excellence</span>
                </div>
              </div>
            </div>

            <div className="instructor-info-side">
              <span className="section-badge">MEET YOUR TEACHER</span>
              <h2 className="instructor-name">Ishan Maduranga</h2>
              <div className="instructor-qual">B.Sc (Hons) Mathematics · Lead Educator</div>
              
              <p className="instructor-bio-p">
                Ishan Maduranga is one of Sri Lanka&apos;s most celebrated and sought-after Mathematics educators. Known for his clarity, logical approach, and engaging teaching style, he has guided thousands of students to achieve top distinction grades in G.C.E. Ordinary Level and Advanced Level exams.
              </p>
              <p className="instructor-bio-p">
                His unique framework breaks down intimidating mathematical equations into simple, digestible mental models. Whether you are aiming for an &apos;A&apos; grade or building fundamental confidence, his structured methodology delivers results.
              </p>

              <div className="instructor-highlights">
                <div className="highlight-item">
                  <span className="check-icon">✓</span>
                  <span>Specialized in O/L &amp; A/L Mathematics</span>
                </div>
                <div className="highlight-item">
                  <span className="check-icon">✓</span>
                  <span>10,000+ Hours of Live Teaching</span>
                </div>
                <div className="highlight-item">
                  <span className="check-icon">✓</span>
                  <span>Author of Official MathSpark Workbooks</span>
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
            <span className="section-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title-dark">Got Questions? We Have Answers.</h2>
            <p className="section-subtitle-dark">
              Everything you need to know about joining MathSpark online classes and receiving study materials.
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

        /* ── FEATURE CARDS ── */
        .feature-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .feature-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 36px 28px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.03);
          transition: all 0.25s;
        }
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(37,99,235,0.08);
          border-color: #cbd5e1;
        }
        .feature-icon-wrapper {
          width: 56px; height: 56px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.6rem;
          margin-bottom: 20px;
        }
        .bg-blue-light { background: #eff6ff; }
        .bg-purple-light { background: #f3e8ff; }
        .bg-pink-light { background: #fce7f3; }
        .feature-card-title { font-size: 1.25rem; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        .feature-card-desc { font-size: 0.92rem; color: #64748b; line-height: 1.6; }

        /* ── PROCESS GRID ── */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }
        .process-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 36px 28px;
          position: relative;
          box-shadow: 0 4px 20px rgba(0,0,0,0.02);
        }
        .process-step-pill {
          position: absolute;
          top: 24px; right: 24px;
          font-size: 0.8rem; font-weight: 800;
          padding: 4px 10px; border-radius: 999px;
        }
        .process-icon { font-size: 2rem; margin-bottom: 20px; }
        .process-title { font-size: 1.2rem; font-weight: 700; color: #0f172a; margin-bottom: 12px; }
        .process-desc { font-size: 0.9rem; color: #64748b; line-height: 1.6; }

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
