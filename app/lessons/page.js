'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import AccessLockedModal from '@/components/AccessLockedModal';
import { ROLES } from '@/utils/constants';

export default function LessonsPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lessons, setLessons] = useState([]);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [lockedGrade, setLockedGrade] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          window.location.href = '/register';
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.user) {
          setUser(data.user);
          fetchLessons();
        }
      })
      .catch(() => {
        window.location.href = '/register';
      })
      .finally(() => setLoading(false));
  }, []);

  const fetchLessons = () => {
    fetch('/api/lessons')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.lessons)) {
          setLessons(data.lessons);
        }
      })
      .catch(() => {});
  };

  const handleAccessContent = (e, lesson, type) => {
    e.preventDefault();
    if (!user) return;

    // Admin bypasses all checks
    if (user.role === ROLES.ADMIN) {
      const url = type === 'pdf' ? lesson.pdfUrl : lesson.videoUrl;
      if (url) window.open(url, '_blank');
      return;
    }

    const approvedGrades = user.approvedGrades || [];
    if (!approvedGrades.includes(Number(lesson.gradeId))) {
      setLockedGrade(lesson.gradeId);
      return;
    }

    const url = type === 'pdf' ? lesson.pdfUrl : lesson.videoUrl;
    if (url) window.open(url, '_blank');
  };

  if (loading) {
    return (
      <>
        <Header />
        <main style={{ background: 'var(--dark)', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ color: 'var(--text-muted)' }}>Loading lessons...</p>
        </main>
        <Footer />
      </>
    );
  }

  const gradesList = [6, 7, 8, 9, 10, 11];
  const filteredLessons = lessons.filter((les) =>
    selectedGrade === 'all' ? true : les.gradeId === Number(selectedGrade)
  );

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '85vh', paddingBottom: 60 }}>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">📖 Grade Lessons</div>
            <h1 className="page-hero-title">
              Video & PDF <span className="theme-gradient">Lesson Library</span>
            </h1>
            <p className="page-hero-desc">
              Access your grade-specific recorded video lectures and downloadable PDF notes.
            </p>
          </div>
        </section>

        <section className="section-sm">
          <div className="container">
            {/* Grade Filter Pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32, justifyContent: 'center' }}>
              <button
                className={`btn btn-sm ${selectedGrade === 'all' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setSelectedGrade('all')}
              >
                All Grades
              </button>
              {gradesList.map((g) => (
                <button
                  key={g}
                  className={`btn btn-sm ${selectedGrade === String(g) ? 'btn-primary' : 'btn-outline'}`}
                  onClick={() => setSelectedGrade(String(g))}
                >
                  Grade {g}
                </button>
              ))}
            </div>

            {filteredLessons.length === 0 ? (
              <div className="admin-empty-box" style={{ padding: '60px 20px' }}>
                No lessons available for the selected filter.
              </div>
            ) : (
              <div className="grid grid-2">
                {filteredLessons.map((lesson) => {
                  const isApproved =
                    user?.role === ROLES.ADMIN || (user?.approvedGrades || []).includes(Number(lesson.gradeId));

                  return (
                    <div
                      key={lesson.id}
                      style={{
                        background: 'var(--dark-card)',
                        border: '1px solid var(--border)',
                        borderRadius: 'var(--radius-lg)',
                        padding: 24,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyConstraint: 'space-between',
                        position: 'relative',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                          <span className="badge badge-primary">Grade {lesson.gradeId}</span>
                          {!isApproved && (
                            <span className="badge badge-accent" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
                              🔒 Access Locked
                            </span>
                          )}
                          {isApproved && (
                            <span className="badge badge-green">
                              ✓ Approved Access
                            </span>
                          )}
                        </div>

                        <h3 style={{ fontSize: '1.2rem', marginBottom: 8, color: '#fff' }}>{lesson.title}</h3>
                        {lesson.description && (
                          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.5 }}>
                            {lesson.description}
                          </p>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
                        {lesson.videoUrl && (
                          <button
                            onClick={(e) => handleAccessContent(e, lesson, 'video')}
                            className="btn btn-primary btn-sm"
                            style={{ flex: 1, justifyContent: 'center' }}
                          >
                            📹 Watch Video
                          </button>
                        )}

                        {lesson.pdfUrl && (
                          <button
                            onClick={(e) => handleAccessContent(e, lesson, 'pdf')}
                            className="btn btn-outline btn-sm"
                            style={{ flex: 1, justifyContent: 'center' }}
                          >
                            📄 Download PDF
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      {lockedGrade && (
        <AccessLockedModal grade={lockedGrade} onClose={() => setLockedGrade(null)} />
      )}
    </>
  );
}
