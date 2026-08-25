'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { COURSES, SITE } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function MyAccountPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('courses');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myTracking, setMyTracking] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

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

    fetch('/api/orders/my-orders')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setMyTracking(data.tracking || []);
          setMyOrders(data.orders || []);
        }
      })
      .catch(() => {});
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/me', { method: 'POST' });
    window.location.href = '/';
  };

  const approvedGrades = user?.approvedGrades || [];
  const hasAccess = approvedGrades.length > 0;

  // Filter courses strictly by approved grade access
  const enrolledCourses = COURSES.filter(c => approvedGrades.includes(c.grade));

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '85vh' }}>
        <section className="page-hero" style={{ padding: '60px 0 40px' }}>
          <div className="container">
            <div className="dashboard-user-header">
              <div className="dashboard-avatar">👨‍🎓</div>
              <div>
                <h2 style={{ fontSize: '1.8rem' }}>
                  Welcome back, <span className="theme-gradient">{user ? user.name : 'Student'}!</span>
                </h2>
                <p className="text-secondary text-sm">
                  {user ? `Registered Grade: Grade ${user.grade} · ${user.medium ? user.medium.toUpperCase() : 'SINHALA'} Medium · WhatsApp: ${user.phone}` : 'Grade 10 · Sinhala Medium'}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                    {t('common.approvedAccess')}:
                  </span>
                  {hasAccess ? (
                    approvedGrades.sort((a,b)=>a-b).map(g => (
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
                  📹 Lesson Recordings ({hasAccess ? enrolledCourses.length * 3 : 0})
                </button>
                <button
                  className={`dashboard-nav-item ${activeTab === 'tutes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tutes')}
                >
                  📦 My Tute Orders ({myTracking.length + myOrders.length})
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
                
                {/* 1. ENROLLED CLASSES TAB */}
                {activeTab === 'courses' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Enrolled Classes</h3>
                    {!hasAccess ? (
                      <div className="admin-empty-box" style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', borderRadius: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔒</div>
                        <h4 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: 8 }}>No Grade Access Approved Yet</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 20px' }}>
                          Your registered account has not been granted access to live classes yet. Please contact Ishan Sir on WhatsApp after completing your fee payment to get your grade unlocked.
                        </p>
                        <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                          💬 Request Grade Approval on WhatsApp
                        </a>
                      </div>
                    ) : enrolledCourses.length === 0 ? (
                      <div className="admin-empty-box">No approved classes available for your grade yet.</div>
                    ) : (
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
                    )}
                  </div>
                )}

                {/* 2. LESSON RECORDINGS TAB */}
                {activeTab === 'recordings' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Lesson Recordings Archive</h3>
                    {!hasAccess ? (
                      <div className="admin-empty-box" style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', borderRadius: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔒</div>
                        <h4 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: 8 }}>Lesson Recordings Locked</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 20px' }}>
                          Lesson recordings are locked until your grade access is approved by Ishan Sir.
                        </p>
                        <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
                          💬 Request Access on WhatsApp
                        </a>
                      </div>
                    ) : (
                      <div className="recordings-list">
                        {enrolledCourses.flatMap((course) => [
                          { title: `${course.title} — Month 01 Special Revision`, date: 'July 18, 2026', duration: '1h 45m', views: 'Active', videoUrl: course.sampleVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                          { title: `${course.title} — Theory & Theorem Breakdown`, date: 'July 11, 2026', duration: '2h 00m', views: 'Active', videoUrl: course.sampleVideoUrl || 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
                        ]).map((rec, i) => (
                          <div key={i} className="recording-card">
                            <div className="rec-icon">▶</div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rec.title}</h4>
                              <div className="text-muted text-xs" style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                                <span>📅 {rec.date}</span>
                                <span>⏱ {rec.duration}</span>
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
                    )}
                  </div>
                )}

                {/* 3. TUTE ORDERS TAB */}
                {activeTab === 'tutes' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Tute Order Deliveries</h3>
                    {myTracking.length === 0 && myOrders.length === 0 ? (
                      <div className="admin-empty-box" style={{ background: 'rgba(15,23,42,0.4)', padding: '32px', borderRadius: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: 8 }}>📦</div>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 4 }}>No Tute Orders Found</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>You have not placed any tute package orders yet under phone <strong>{user?.phone}</strong>.</p>
                      </div>
                    ) : (
                      <div className="orders-table-wrap">
                        <table className="orders-table">
                          <thead>
                            <tr>
                              <th>Tracking / Order ID</th>
                              <th>Item Description</th>
                              <th>Courier</th>
                              <th>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {myTracking.map((t) => (
                              <tr key={t.id}>
                                <td><code>{t.id}</code></td>
                                <td>{t.item}</td>
                                <td>{t.courier || 'Domex Express'}</td>
                                <td><span className="badge badge-primary">{t.status}</span></td>
                              </tr>
                            ))}
                            {myOrders.map((o) => (
                              <tr key={o.id}>
                                <td><code>ORD-{o.id.slice(0,6).toUpperCase()}</code></td>
                                <td>{o.itemName} (x{o.quantity})</td>
                                <td>Standard Post / Courier</td>
                                <td><span className="badge badge-green">{o.status}</span></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. PROFILE SETTINGS TAB */}
                {activeTab === 'profile' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Profile Settings</h3>
                    <form className="profile-form">
                      <div className="form-group">
                        <label className="form-label">Full Name</label>
                        <input type="text" className="form-input" value={user?.name || ''} readOnly />
                      </div>
                      <div className="form-group">
                        <label className="form-label">WhatsApp Number</label>
                        <input type="text" className="form-input" value={user?.phone || ''} readOnly />
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="form-group">
                          <label className="form-label">Registered Grade</label>
                          <input type="text" className="form-input" value={`Grade ${user?.grade || 10}`} readOnly />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Medium</label>
                          <input type="text" className="form-input" value={(user?.medium || 'sinhala').toUpperCase()} readOnly />
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
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: 'var(--radius-lg)' }}>
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
    </>
  );
}
