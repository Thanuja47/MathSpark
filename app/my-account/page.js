'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { COURSES, SITE } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

import { BookOpen, Video, Package, Settings, LogOut, MessageCircle, Lock, Play, ExternalLink } from 'lucide-react';

export default function MyAccountPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('courses');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myTracking, setMyTracking] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [courseLessons, setCourseLessons] = useState({});
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => {
        if (data.user) {
          setUser(data.user);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));

    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDbCourses(data);
      })
      .catch(() => {});

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
    await fetch('/api/auth/login', { method: 'DELETE' });
    window.location.href = '/login';
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
          <p>Loading account details...</p>
        </main>
        <Footer />
      </>
    );
  }

  const approvedGrades = user?.approvedGrades || [];
  const gradeAccessList = user?.gradeAccess || [];
  const hasAccess = approvedGrades.length > 0 || gradeAccessList.length > 0;

  const currentMonthStr = new Date().toISOString().slice(0, 7); // e.g. "2026-08"

  // 1. My Enrolled Classes: Only show active courses/classes for the APPROVED GRADE & CURRENT MONTH (or all-month grant)
  const enrolledCourses = dbCourses.filter(c => {
    const cGrade = Number(c.grade);
    if (!approvedGrades.includes(cGrade)) return false;
    // If course has a specific month tag, check if student has grant for that month OR all-months grant
    if (c.month) {
      return gradeAccessList.some(g => Number(g.gradeId) === cGrade && (!g.month || g.month === c.month || g.month === currentMonthStr));
    }
    return true;
  });

  // 2. Lesson Recordings Archive: Shows past/all courses that the student has APPROVED access for (matching approved grade + granted months)
  const accessibleRecordings = dbCourses.filter(c => {
    const cGrade = Number(c.grade);
    if (!approvedGrades.includes(cGrade)) return false;
    if (!c.sampleVideoUrl) return false;
    if (c.month) {
      return gradeAccessList.some(g => Number(g.gradeId) === cGrade && (!g.month || g.month === c.month));
    }
    return true;
  });

  return (
    <>
      <Header />
      <main>
        <section className="page-hero" style={{ padding: '40px 0 30px', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div className="dashboard-user-header">
              <div className="dashboard-avatar">👤</div>
              <div>
                <h1 style={{ fontSize: '1.8rem', margin: '0 0 4px' }}>{user?.name || 'Student Account'}</h1>
                <p style={{ color: 'var(--text-muted)', margin: 0 }}>
                  Phone: <strong>{user?.phone}</strong> &nbsp;|&nbsp; Registered Grade: <strong>Grade {user?.grade}</strong>
                </p>
                <div style={{ marginTop: 8 }}>
                  {hasAccess ? (
                    <span className="badge badge-green" style={{ fontSize: '0.8rem', padding: '4px 12px' }}>
                      Approved Access: {approvedGrades.sort((a,b)=>a-b).map(g => `Grade ${g}`).join(', ')}
                    </span>
                  ) : (
                    <span className="badge badge-accent" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '0.8rem', padding: '4px 12px' }}>
                      NO ACCESS GRANTED — FEE PAYMENT PENDING
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
              <div className="dashboard-sidebar">
                <button
                  className={`dashboard-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <BookOpen size={18} />
                  <span>My Enrolled Classes ({enrolledCourses.length})</span>
                </button>
                <button
                  className={`dashboard-nav-item ${activeTab === 'recordings' ? 'active' : ''}`}
                  onClick={() => setActiveTab('recordings')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <Video size={18} />
                  <span>Lesson Recordings ({accessibleRecordings.length})</span>
                </button>
                <button
                  className={`dashboard-nav-item ${activeTab === 'tutes' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tutes')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <Package size={18} />
                  <span>My Tute Orders ({myTracking.length + myOrders.length})</span>
                </button>
                <button
                  className={`dashboard-nav-item ${activeTab === 'profile' ? 'active' : ''}`}
                  onClick={() => setActiveTab('profile')}
                  style={{ display: 'flex', alignItems: 'center', gap: 10 }}
                >
                  <Settings size={18} />
                  <span>Profile Settings</span>
                </button>
                {user && (
                  <button
                    className="dashboard-nav-item"
                    onClick={handleLogout}
                    style={{ color: '#ff4d4f', marginTop: 12, display: 'flex', alignItems: 'center', gap: 10 }}
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                )}
              </div>

              <div className="dashboard-content">
                {activeTab === 'courses' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Enrolled Classes</h3>
                    {!hasAccess ? (
                      <div className="admin-empty-box" style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(239,68,68,0.2)', padding: '36px', borderRadius: '16px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', padding: 14, background: 'rgba(239,68,68,0.1)', borderRadius: '50%', color: '#ef4444', marginBottom: 12 }}>
                          <Lock size={32} />
                        </div>
                        <h4 style={{ color: '#ef4444', fontSize: '1.2rem', marginBottom: 8 }}>No Grade Access Approved Yet</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto 20px' }}>
                          Your registered account has not been granted access to live classes yet. Please contact Ishan Sir on WhatsApp after completing your fee payment to get your grade unlocked.
                        </p>
                        <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                          <MessageCircle size={16} />
                          <span>Request Grade Approval on WhatsApp</span>
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
                          Request Access on WhatsApp
                        </a>
                      </div>
                    ) : accessibleRecordings.length === 0 ? (
                      <div className="admin-empty-box" style={{ background: 'rgba(15,23,42,0.4)', padding: '36px', borderRadius: '16px', textAlign: 'center' }}>
                        <div style={{ fontSize: '2rem', marginBottom: 8 }}>🎥</div>
                        <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: 4 }}>No Lesson Recordings Uploaded Yet</h4>
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Recorded video lessons for your approved grade and month access will appear here as soon as Ishan Sir uploads them in the Admin Panel.</p>
                      </div>
                    ) : (
                      <div className="recordings-list">
                        {accessibleRecordings.map((course, i) => (
                          <div key={i} className="recording-card">
                            <div className="rec-icon">▶</div>
                            <div style={{ flex: 1 }}>
                              <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{course.title} — Recorded Live Class</h4>
                              <div className="text-muted text-xs" style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                                <span>📚 Grade {course.grade}</span>
                                {course.month && <span>📅 Month: {course.month}</span>}
                                <span>🌐 {(course.medium || 'Sinhala').toUpperCase()}</span>
                              </div>
                            </div>
                            <button
                              className="btn btn-secondary btn-sm"
                              onClick={() => setActiveVideo({ title: course.title, videoUrl: course.sampleVideoUrl })}
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
