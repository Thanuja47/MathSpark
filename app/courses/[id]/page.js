'use client';
import { use } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { COURSES, SITE } from '@/lib/data';

export default function CourseDetailPage({ params }) {
  const { id } = use(params);
  const course = COURSES.find((c) => c.id.toString() === id) || COURSES[0];

  const syllabus = [
    { unit: '01', title: 'Number Systems & Operations', lessons: 12, duration: '6h 20m' },
    { unit: '02', title: 'Fractions, Decimals & Percentages', lessons: 14, duration: '7h 45m' },
    { unit: '03', title: 'Algebra – Expressions & Equations', lessons: 18, duration: '9h 10m' },
    { unit: '04', title: 'Geometry – Angles, Triangles & Polygons', lessons: 16, duration: '8h 30m' },
    { unit: '05', title: 'Statistics & Probability', lessons: 10, duration: '5h 15m' },
    { unit: '06', title: 'Mensuration – Area & Volume', lessons: 12, duration: '6h 00m' },
    { unit: '07', title: 'Quadratic Equations & Graphs', lessons: 15, duration: '7h 50m' },
    { unit: '08', title: 'Past Paper Analysis & Exam Technique', lessons: 8, duration: '4h 20m' },
  ];

  return (
    <>
      <Header />
      <main>
        {/* Course Hero */}
        <section className="course-detail-hero">
          <div className="hero-glow g1" aria-hidden="true" />
          <div className="hero-glow g2" aria-hidden="true" />
          <div className="container">
            <div className="course-detail-grid">
              {/* Left – Text */}
              <div className="course-detail-content">
                <div className="breadcrumb" style={{ justifyContent: 'flex-start' }}>
                  <Link href="/">Home</Link> <span>/</span>
                  <Link href="/courses">Classes</Link> <span>/</span>
                  <span>Grade {course.grade}</span>
                </div>

                <div className="course-detail-badges">
                  <span className="badge badge-primary">{course.medium === 'english' ? 'English' : 'Sinhala'} Medium</span>
                  {course.badge && <span className="badge badge-accent">{course.badge}</span>}
                  <span className="badge badge-green">Grade {course.grade}</span>
                </div>

                <h1 className="course-detail-title">{course.title}</h1>
                <p className="course-detail-desc">{course.description}</p>

                {/* Quick Stats Row */}
                <div className="course-quick-stats">
                  <div className="quick-stat">
                    <span className="quick-stat-icon">📚</span>
                    <div>
                      <div className="quick-stat-val">{course.lessons}</div>
                      <div className="quick-stat-lbl">Lessons</div>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <span className="quick-stat-icon">👥</span>
                    <div>
                      <div className="quick-stat-val">{course.students.toLocaleString()}</div>
                      <div className="quick-stat-lbl">Enrolled</div>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <span className="quick-stat-icon">⭐</span>
                    <div>
                      <div className="quick-stat-val">4.9/5.0</div>
                      <div className="quick-stat-lbl">Rating</div>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <span className="quick-stat-icon">🌐</span>
                    <div>
                      <div className="quick-stat-val">{course.medium === 'english' ? 'English' : 'Sinhala'}</div>
                      <div className="quick-stat-lbl">Language</div>
                    </div>
                  </div>
                </div>

                {/* Instructor */}
                <div className="course-instructor-row">
                  <div className="course-instructor-avatar">👨‍🏫</div>
                  <div>
                    <div className="text-xs text-muted">Instructor</div>
                    <div style={{ fontWeight: 600 }}>{course.instructor}</div>
                  </div>
                </div>
              </div>

              {/* Right – Enroll Card */}
              <div className="course-enroll-card">
                {/* Video Preview Placeholder */}
                <div className="enroll-preview">
                  <div className="enroll-preview-bg">
                    <div className="preview-play-btn">
                      <svg width="26" height="26" fill="white" viewBox="0 0 24 24">
                        <polygon points="5 3 19 12 5 21 5 3"/>
                      </svg>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginTop: 12 }}>
                      Watch Preview Lesson
                    </div>
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="enroll-body">
                  <div className="enroll-price">
                    {course.isFree ? (
                      <span style={{ color: '#00C896', fontWeight: 800, fontSize: '1.8rem' }}>FREE</span>
                    ) : (
                      <>
                        <span className="enroll-price-val">LKR {course.price.toLocaleString()}</span>
                        <span className="enroll-price-period">/month</span>
                      </>
                    )}
                  </div>

                  <a
                    href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%20want%20to%20enroll%20in%20${encodeURIComponent(course.title)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-accent btn-lg"
                    style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
                  >
                    💬 Enroll via WhatsApp
                  </a>
                  <a href={`tel:${SITE.phone}`} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 Call to Enroll
                  </a>

                  {/* What's Included */}
                  <ul className="enroll-includes">
                    {[
                      '✅ Full live session access',
                      '✅ 24/7 video recording library',
                      '✅ Monthly tute packs (optional)',
                      '✅ WhatsApp teacher support',
                      '✅ Past paper analysis sessions',
                      '✅ Cancel anytime',
                    ].map((item, i) => (
                      <li key={i} className="enroll-include-item">{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Syllabus / Curriculum */}
        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="course-syllabus-wrap">
              <div className="text-center" style={{ marginBottom: 40 }}>
                <div className="section-tag">Full Curriculum</div>
                <h2 className="section-title">What You&apos;ll <span className="theme-gradient">Learn</span></h2>
              </div>

              <div className="syllabus-list">
                {syllabus.map((unit) => (
                  <div key={unit.unit} className="syllabus-item">
                    <div className="syllabus-unit-badge">{unit.unit}</div>
                    <div className="syllabus-info">
                      <div className="syllabus-title">{unit.title}</div>
                      <div className="syllabus-meta">
                        <span>📖 {unit.lessons} lessons</span>
                        <span>⏱️ {unit.duration}</span>
                      </div>
                    </div>
                    <div className="syllabus-arrow">→</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section-sm" style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="course-cta-banner">
              <div>
                <h3>Ready to join <span className="theme-gradient">{course.title}</span>?</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: 8, fontSize: '0.95rem' }}>
                  WhatsApp us right now to get your enrollment link and start learning today.
                </p>
              </div>
              <div style={{ display: 'flex', gap: 12, flexShrink: 0, flexWrap: 'wrap' }}>
                <a
                  href={`https://wa.me/${SITE.whatsapp}?text=Enroll%3A%20${encodeURIComponent(course.title)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-accent btn-lg"
                >
                  💬 WhatsApp Enroll
                </a>
                <Link href="/courses" className="btn btn-outline btn-lg">
                  ← Back to Classes
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .course-detail-hero {
          background: var(--gradient-hero);
          border-bottom: 1px solid var(--border);
          padding: 80px 0 60px;
          position: relative;
          overflow: hidden;
        }
        .hero-glow { position: absolute; border-radius: 50%; filter: blur(100px); pointer-events: none; }
        .g1 { width: 500px; height: 500px; top: -100px; left: -100px; background: rgba(0,82,255,0.1); }
        .g2 { width: 400px; height: 400px; bottom: -100px; right: 0; background: rgba(255,107,0,0.08); }
        .course-detail-grid {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 48px;
          align-items: start;
          position: relative;
          z-index: 2;
        }
        .course-detail-badges { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
        .course-detail-title { font-size: clamp(1.8rem, 3.5vw, 2.8rem); margin-bottom: 16px; }
        .course-detail-desc { color: var(--text-secondary); font-size: 1.05rem; line-height: 1.75; margin-bottom: 32px; }
        .course-quick-stats {
          display: flex; gap: 32px; flex-wrap: wrap;
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px 28px;
          margin-bottom: 28px;
        }
        .quick-stat { display: flex; align-items: center; gap: 12px; }
        .quick-stat-icon { font-size: 1.5rem; }
        .quick-stat-val { font-weight: 700; font-size: 1.05rem; }
        .quick-stat-lbl { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .course-instructor-row {
          display: flex; align-items: center; gap: 14px;
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 14px 20px;
        }
        .course-instructor-avatar {
          width: 40px; height: 40px;
          border-radius: 50%;
          background: var(--gradient-blue);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
        }
        /* Enroll Card */
        .course-enroll-card {
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          overflow: hidden;
          position: sticky;
          top: 130px;
          box-shadow: var(--shadow-lg);
        }
        .enroll-preview {
          aspect-ratio: 16/9;
          background: var(--dark-3);
          position: relative;
          overflow: hidden;
        }
        .enroll-preview-bg {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, #0D1230, #1A1F35);
          display: flex; flex-direction: column; align-items: center; justify-content: center;
          cursor: pointer;
          transition: var(--transition);
        }
        .enroll-preview-bg:hover { background: linear-gradient(135deg, #131740, #202545); }
        .preview-play-btn {
          width: 64px; height: 64px;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
          border: 2px solid rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 12px;
          transition: var(--transition);
        }
        .enroll-preview-bg:hover .preview-play-btn {
          background: var(--primary);
          border-color: var(--primary);
          transform: scale(1.08);
          box-shadow: 0 0 30px rgba(0,82,255,0.5);
        }
        .enroll-body { padding: 24px; }
        .enroll-price { margin-bottom: 20px; }
        .enroll-price-val { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900; }
        .enroll-price-period { font-size: 0.85rem; color: var(--text-muted); margin-left: 4px; }
        .enroll-includes { margin-top: 20px; padding-top: 20px; border-top: 1px solid var(--border-light); display: flex; flex-direction: column; gap: 8px; }
        .enroll-include-item { font-size: 0.875rem; color: var(--text-secondary); }

        /* Syllabus */
        .course-syllabus-wrap { max-width: 800px; margin: 0 auto; }
        .syllabus-list { display: flex; flex-direction: column; gap: 12px; }
        .syllabus-item {
          display: flex; align-items: center; gap: 16px;
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 16px 20px;
          transition: var(--transition);
          cursor: pointer;
        }
        .syllabus-item:hover { border-color: rgba(0,82,255,0.3); background: var(--dark-2); transform: translateX(4px); }
        .syllabus-unit-badge {
          width: 36px; height: 36px;
          border-radius: 10px;
          background: var(--gradient-blue);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; font-weight: 700; color: white; flex-shrink: 0;
        }
        .syllabus-info { flex: 1; }
        .syllabus-title { font-weight: 600; font-size: 0.95rem; margin-bottom: 4px; }
        .syllabus-meta { display: flex; gap: 16px; font-size: 0.78rem; color: var(--text-muted); }
        .syllabus-arrow { color: var(--primary-light); font-size: 1.2rem; opacity: 0; transition: opacity 0.2s; }
        .syllabus-item:hover .syllabus-arrow { opacity: 1; }

        /* CTA Banner */
        .course-cta-banner {
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(135deg, rgba(0,82,255,0.08), rgba(255,107,0,0.06));
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 36px 40px;
          gap: 32px;
          flex-wrap: wrap;
        }

        @media (max-width: 1000px) {
          .course-detail-grid { grid-template-columns: 1fr; }
          .course-enroll-card { position: static; }
        }
        @media (max-width: 640px) {
          .course-cta-banner { flex-direction: column; align-items: flex-start; padding: 24px; }
          .course-cta-banner > div:last-child { width: 100%; }
          .course-cta-banner .btn { width: 100%; justify-content: center; }
        }
      `}</style>
    </>
  );
}
