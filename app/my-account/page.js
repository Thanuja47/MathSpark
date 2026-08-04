'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { COURSES } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function MyAccountPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('courses');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState(null); // video modal stream

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(err => console.error('Auth error', err))
      .finally(() => setLoading(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'POST' });
    window.location.href = '/';
  };

  const enrolledCourses = COURSES.slice(0, 2);

  const recordings = [
    { title: 'Lesson 14: Quadratic Equations & Formula Proofs', date: 'July 18, 2026', duration: '1h 45m', views: '230 watching', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Lesson 13: Linear Graphs & Intercept Analysis', date: 'July 11, 2026', duration: '2h 00m', views: '410 watching', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
    { title: 'Lesson 12: Algebraic Expressions & Expansion', date: 'July 04, 2026', duration: '1h 50m', views: '520 watching', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
  ];

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '80vh' }}>
        <section className="page-hero" style={{ padding: '60px 0 40px' }}>
          <div className="container">
            <div className="dashboard-user-header">
              <div className="dashboard-avatar">👨‍🎓</div>
              <div>
                <h2 style={{ fontSize: '1.8rem' }}>
                  Welcome back, <span className="theme-gradient">{user ? user.name : 'Student'}!</span>
                </h2>
                <p className="text-secondary text-sm">
                  {user ? `Registered Grade: Grade ${user.grade} · ${user.medium.toUpperCase()} Medium · WhatsApp: ${user.phone}` : 'Grade 10 · Sinhala Medium'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {t('common.approvedAccess')}:
                  </span>
                  {user && user.approvedGrades && user.approvedGrades.length > 0 ? (
                    user.approvedGrades.sort((a,b)=>a-b).map(g => (
                      <span key={g} className="badge badge-green" style={{ fontSize: '0.75rem' }}>
                        Grade {g}
                      </span>
                    ))
                  ) : (
                    <span className="badge badge-accent" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '0.75rem' }}>
                      {t('common.noAccessGranted')}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-sm">
          <div className="container">
            <div className="dashboard-grid">
              {/* Sidebar navigation */}
              <div className="dashboard-sidebar">
                <button
                  className={`dashboard-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                >
                  📚 My Enrolled Classes ({enrolledCourses.length})
                </button>
                <button
                  className={`dashboard-nav-item ${activeTab === 'recordings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recordings')}
                >
                  📹 Lesson Recordings ({recordings.length})
                </button>
                <button
                  className={`dashboard-nav-item ${activeTab === 'tutes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tutes')}
                >
                  📦 My Tute Orders
                </button>
                <button
                  className={`dashboard-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                >
                  ⚙️ Profile Settings
                </button>
                {user && (
                  <button
                    className="dashboard-nav-item"
                    onClick={handleLogout}
                    style={{ color: '#ff4d4f', marginTop: 12 }}
                  >
                    🚪 Logout
                  </button>
                )}
              </div>

              {/* Main content */}
              <div className="dashboard-content">
                {activeTab === 'courses' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Enrolled Classes</h3>
                    <div className="enrolled-list">
                      {enrolledCourses.map((course) => (
                        <div key={course.id} className="enrolled-card">
                          <div className="enrolled-info">
                            <div className="badge badge-primary">{course.medium.toUpperCase()} MEDIUM</div>
                            <h4 style={{ marginTop: 8, fontSize: '1.1rem' }}>{course.title}</h4>
                            <p className="text-muted text-xs" style={{ marginTop: 4 }}>Schedule: {course.schedule}</p>
                          </div>
                          <div className="enrolled-actions">
                            <a
                              href="https://zoom.us"
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-primary btn-sm"
                            >
                              🔴 Join Live Room
                            </a>
                            <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('recordings')}>
                              View Recordings
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'recordings' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Lesson Recordings Archive</h3>
                    <div className="recordings-list">
                      {recordings.map((rec, i) => (
                        <div key={i} className="recording-card">
                          <div className="rec-icon">▶</div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rec.title}</h4>
                            <div className="text-muted text-xs" style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                              <span>📅 {rec.date}</span>
                              <span>⏱ {rec.duration}</span>
                              <span>👁 {rec.views}</span>
                            </div>
                          </div>
                          <button
                            className="btn btn-secondary btn-sm"
                            onClick={() => setActiveVideo(rec)}
                          >
                            Watch Video 🎬
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'tutes' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Tute Order Deliveries</h3>
                    <div className="orders-table-wrap">
                      <table className="orders-table">
                        <thead>
                          <tr>
                            <th>Tracking ID</th>
                            <th>Item Description</th>
                            <th>Courier</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td><code>MSP-9842</code></td>
                            <td>Grade 10 Maths Tute Month 05</td>
                            <td>Domex Express</td>
                            <td><span className="badge badge-primary">In Transit</span></td>
                          </tr>
                          <tr>
                            <td><code>MSP-9841</code></td>
                            <td>Grade 10 Past Paper Pack</td>
                            <td>Prompt Express</td>
                            <td><span className="badge badge-green">Delivered</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Profile Settings</h3>
                    <form className="profile-form">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" defaultValue={user?.name || 'Kavindi Perera'} readOnly />
                      </div>
                      <div className="form-group">
                        <label className="form-label">WhatsApp Number</label>
                        <input type="text" className="form-input" defaultValue={user?.phone || '0712345678'} readOnly />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="form-group">
                          <label className="form-label">Grade</label>
                          <input type="text" className="form-input" defaultValue={`Grade ${user?.grade || 10}`} readOnly />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Medium</label>
                          <input type="text" className="form-input" defaultValue={(user?.medium || 'sinhala').toUpperCase()} readOnly />
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Video Player Modal */}
        {activeVideo && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20
          }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)', padding: 24, maxWidth: 800, width: '100%'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                <h4 style={{ fontSize: '1.1rem' }}>{activeVideo.title}</h4>
                <button className="btn btn-ghost btn-sm" onClick={() => setActiveVideo(null)}>✕ Close</button>
              </div>
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, borderRadius: 12, overflow: 'hidden', background: '#000' }}>
                <iframe
                  src={activeVideo.videoUrl}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .dashboard-user-header {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .dashboard-avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: var(--cobalt-glow);
          border: 2px solid var(--cobalt-ring);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2rem;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
        }
        .dashboard-sidebar {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .dashboard-nav-item {
          padding: 12px 16px;
          border-radius: var(--radius-md);
          background: var(--surface);
          border: 1px solid var(--rule);
          color: var(--text);
          font-size: 0.8438rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: var(--transition);
        }
        .dashboard-nav-item.active, .dashboard-nav-item:hover {
          background: var(--cobalt-glow);
          border-color: var(--cobalt-ring);
          color: var(--cobalt-light);
        }
        .dashboard-content {
          background: var(--surface);
          border: 1px solid var(--rule);
          border-radius: var(--radius-xl);
          padding: 32px;
        }
        .enrolled-list, .recordings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .enrolled-card, .recording-card {
          background: var(--surface-2);
          border: 1px solid var(--rule-light);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .rec-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: var(--cobalt-glow);
          color: var(--cobalt-light);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .orders-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.875rem;
        }
        .orders-table th, .orders-table td {
          padding: 12px 16px;
          border-bottom: 1px solid var(--rule-light);
        }
        .profile-form {
          max-width: 500px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 850px) {
          .dashboard-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
