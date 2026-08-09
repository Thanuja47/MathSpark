'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import AccessLockedModal from '@/components/AccessLockedModal';
import { COURSES, SITE } from '@/lib/data';
import { ROLES } from '@/utils/constants';
import { useLanguage } from '@/context/LanguageContext';

const STATIC_SYLLABUS = [
  { unit: '01', title: 'Number Systems & Operations', description: 'Fundamental number properties, indices, and arithmetic operations.', pdfUrl: null, videoUrl: null },
  { unit: '02', title: 'Fractions, Decimals & Percentages', description: 'Real-world application of proportions and percentage calculations.', pdfUrl: null, videoUrl: null },
  { unit: '03', title: 'Algebra – Expressions & Equations', description: 'Solving linear equations, factorizing algebraic expressions.', pdfUrl: null, videoUrl: null },
  { unit: '04', title: 'Geometry – Angles, Triangles & Polygons', description: 'Geometrical theorems, angle proofs, and polygon calculations.', pdfUrl: null, videoUrl: null },
  { unit: '05', title: 'Statistics & Probability', description: 'Data representation, mean/median/mode, and probability models.', pdfUrl: null, videoUrl: null },
  { unit: '06', title: 'Mensuration – Area & Volume', description: '3D shapes volume calculation, total surface area theorems.', pdfUrl: null, videoUrl: null },
  { unit: '07', title: 'Quadratic Equations & Graphs', description: 'Quadratic formula derivation, parabola sketching, and roots.', pdfUrl: null, videoUrl: null },
  { unit: '08', title: 'Past Paper Analysis & Exam Technique', description: 'Step-by-step guidance on answering O/L paper 1 and paper 2 questions.', pdfUrl: null, videoUrl: null },
];

export default function CourseDetailPage({ params }) {
  const { t } = useLanguage();
  const { id } = params;
  const course = COURSES.find((c) => c.id.toString() === id) || COURSES[0];

  const [lessons, setLessons] = useState([]);
  const [user, setUser] = useState(null);
  const [lockedGrade, setLockedGrade] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => res.json())
      .then((data) => { if (data.user) setUser(data.user); })
      .catch(() => {});

    fetch(`/api/courses/${id}/lessons`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.lessons) && data.lessons.length > 0) {
          setLessons(data.lessons);
        }
      })
      .catch(() => {});
  }, [id]);

  const displayedLessons = lessons.length > 0 ? lessons : STATIC_SYLLABUS.map((s, i) => ({
    id: `static-${i}`,
    order: i + 1,
    title: s.title,
    description: s.description,
    pdfUrl: s.pdfUrl,
    videoUrl: s.videoUrl,
  }));

  const handleAccessAttachment = (e, type, url) => {
    e.preventDefault();
    if (!url) return;

    if (!user) {
      setLockedGrade(course.grade);
      return;
    }

    if (user.role === ROLES.ADMIN) {
      window.open(url, '_blank');
      return;
    }

    const approved = user.approvedGrades || [];
    if (!approved.includes(Number(course.grade))) {
      setLockedGrade(course.grade);
      return;
    }

    window.open(url, '_blank');
  };

  const courseSchema = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    'name': course.title,
    'description': course.description || `${course.title} by Ishan Maduranga on MathSpark platform.`,
    'provider': {
      '@type': 'EducationalOrganization',
      'name': 'MathSpark',
      'sameAs': SITE.url
    },
    'offers': {
      '@type': 'Offer',
      'price': course.price,
      'priceCurrency': 'LKR',
      'availability': 'https://schema.org/InStock'
    },
    'hasCourseInstance': {
      '@type': 'CourseInstance',
      'courseMode': 'online',
      'instructor': {
        '@type': 'Person',
        'name': 'Ishan Maduranga'
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
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
                      <div className="quick-stat-val">{displayedLessons.length}</div>
                      <div className="quick-stat-lbl">{t('sections.whatYouLearn').split(" ")[0]}</div>
                    </div>
                  </div>
                  <div className="quick-stat">
                    <span className="quick-stat-icon">👥</span>
                    <div>
                      <div className="quick-stat-val">{course.students.toLocaleString()}</div>
                      <div className="quick-stat-lbl">{t('common.enrollNow').split(" ")[0]}</div>
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
                      <div className="quick-stat-val">{course.medium === 'english' ? 'English' : 'සිංහල'}</div>
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
                    💬 {t('common.whatsAppEnroll')}
                  </a>
                  <a href={`tel:${SITE.phone}`} className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    📞 {t('common.callToEnroll')}
                  </a>

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
                <div className="section-tag">{t('sections.fullCurriculum')}</div>
                <h2 className="section-title">{t('sections.whatYouLearn')}</h2>
              </div>

              <div className="syllabus-list">
                {displayedLessons.map((les, index) => {
                  const unitNum = String(les.order || index + 1).padStart(2, '0');
                  const hasVideo = Boolean(les.videoUrl);
                  const hasPdf = Boolean(les.pdfUrl);

                  return (
                    <div key={les.id} className="syllabus-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: 16 }}>
                        <div className="syllabus-unit-badge">{unitNum}</div>
                        <div className="syllabus-info" style={{ flex: 1 }}>
                          <div className="syllabus-title">{les.title}</div>
                          {les.description && (
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                              {les.description}
                            </div>
                          )}
                        </div>
                      </div>

                      {(hasVideo || hasPdf) && (
                        <div style={{ display: 'flex', gap: 10, marginTop: 4, width: '100%', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          {hasVideo && (
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={(e) => handleAccessAttachment(e, 'video', les.videoUrl)}
                              style={{ fontSize: '0.78rem', padding: '5px 12px' }}
                            >
                              📹 Watch Lesson Video
                            </button>
                          )}
                          {hasPdf && (
                            <button
                              className="btn btn-outline btn-sm"
                              onClick={(e) => handleAccessAttachment(e, 'pdf', les.pdfUrl)}
                              style={{ fontSize: '0.78rem', padding: '5px 12px' }}
                            >
                              📄 Download PDF Notes
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
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

      {lockedGrade && (
        <AccessLockedModal grade={lockedGrade} onClose={() => setLockedGrade(null)} />
      )}

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
