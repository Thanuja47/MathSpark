'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { COURSES, SITE } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

import CourseCard from '@/components/courses/CourseCard';
import { BookOpen, Video, Package, Settings, LogOut, MessageCircle, Lock, Play, ExternalLink } from 'lucide-react';

export default function MyAccountPage() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState('courses');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [myTracking, setMyTracking] = useState([]);
  const [myOrders, setMyOrders] = useState([]);
  const [dbCourses, setDbCourses] = useState([]);
  const [dbTimetable, setDbTimetable] = useState([]);
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

    fetch('/api/timetable')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) setDbTimetable(data);
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

  // All unique grades this student has access to (sorted)
  const allAccessGrades = [...new Set([
    ...approvedGrades,
    ...gradeAccessList.map(g => Number(g.gradeId))
  ])].sort((a, b) => a - b);

  const currentMonthStr = new Date().toISOString().slice(0, 7); // e.g. "2026-08"

  // Helper: normalize month to compare "August" == "2026-08" == "aug" etc.
  const MONTH_NAMES = ['january','february','march','april','may','june','july','august','september','october','november','december'];
  const monthsMatch = (a, b) => {
    if (!a || !b) return false;
    const normalize = (m) => {
      const s = String(m).toLowerCase().trim();
      // Check if it's YYYY-MM format like "2026-08"
      const ym = s.match(/^\d{4}-(\d{2})$/);
      if (ym) return parseInt(ym[1], 10); // returns 1-12
      // Check if it's a month name like "august"
      const idx = MONTH_NAMES.findIndex(mn => s.startsWith(mn.slice(0,3)));
      if (idx >= 0) return idx + 1; // returns 1-12
      // Try plain number
      const n = parseInt(s, 10);
      if (!isNaN(n)) return n;
      return s; // fallback: raw string compare
    };
    return normalize(a) === normalize(b);
  };

  // Helper: mirrors db.students.hasGradeMonthAccess server-side logic
  // CRITICAL: g.month === null means "ALL months access"
  const hasAccess4GradeMonth = (gradeId, contentMonth) => {
    return gradeAccessList.some(g => {
      if (Number(g.gradeId) !== Number(gradeId)) return false;
      if (g.month === null || g.month === undefined || g.month === '') return true; // null = all months
      if (!contentMonth) return true; // course has no month restriction
      return monthsMatch(g.month, contentMonth); // normalize before comparing
    });
  };

  // Timetable entries accessible for this student (matching approved grades + month access)
  const accessibleTimetable = dbTimetable.filter(t => {
    const tGrade = Number(t.grade);
    if (!allAccessGrades.includes(tGrade)) return false;
    if (t._locked) return false; // server already marked as locked
    if (t.month) return hasAccess4GradeMonth(tGrade, t.month);
    return true;
  });

  // Extract direct Zoom URL from raw invitation text (Admin may paste full Zoom invite)
  const extractZoomUrl = (raw) => {
    if (!raw) return null;
    const m = raw.match(/https?:\/\/[^\s<"'>]+/i);
    return m ? m[0] : raw;
  };

  // 1. My Enrolled Classes: Driven 100% by Timetable (Real Live Classes & Zoom Links for student's approved grades)
  const enrolledByGrade = allAccessGrades.reduce((acc, grade) => {
    const timetables = accessibleTimetable.filter(t => Number(t.grade) === grade);
    if (timetables.length > 0) {
      acc[grade] = timetables.map(t => ({
        id: t.id,
        title: t.subject || `Grade ${grade} Live Mathematics Class`,
        medium: user?.medium || 'Sinhala',
        day: t.day,
        time: t.time,
        month: t.month,
        schedule: `${t.day} (${t.time})`,
        zoomUrl: extractZoomUrl(t.liveLink)
      }));
    }
    return acc;
  }, {});

  // 2. Lesson Recordings Archive: Driven 100% by Courses (Past & August Recorded Video Lessons for student's approved grades & months)
  const accessibleRecordings = dbCourses.filter(c => {
    const cGrade = Number(c.grade);
    if (!allAccessGrades.includes(cGrade)) return false;
    // Check if student has access grant for this grade + month (or all-months access)
    if (c.month) return hasAccess4GradeMonth(cGrade, c.month);
    return true;
  });

  // Group recordings by grade and sort courses by month
  const recordingsByGrade = allAccessGrades.reduce((acc, grade) => {
    const recs = accessibleRecordings.filter(c => Number(c.grade) === grade);
    if (recs.length > 0) {
      // Sort chronologically by month if available
      const sortedRecs = [...recs].sort((a, b) => {
        const mA = MONTH_NAMES.findIndex(mn => (a.month || '').toLowerCase().startsWith(mn.slice(0, 3)));
        const mB = MONTH_NAMES.findIndex(mn => (b.month || '').toLowerCase().startsWith(mn.slice(0, 3)));
        return (mA >= 0 ? mA : 99) - (mB >= 0 ? mB : 99);
      });
      acc[grade] = sortedRecs;
    }
    return acc;
  }, {});

  const totalEnrolledCount = Object.values(enrolledByGrade).reduce((sum, list) => sum + list.length, 0);

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
                      Approved Access: {[...approvedGrades].sort((a,b)=>a-b).map(g => `Grade ${g}`).join(', ')}
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
                  <span>My Enrolled Classes ({totalEnrolledCount})</span>
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
                    ) : totalEnrolledCount === 0 ? (
                      <div className="admin-empty-box">No approved classes scheduled for this month yet. Classes will appear here once Ishan Sir adds them in the Admin Panel.</div>
                    ) : (
                      <div className="enrolled-list">
                        {Object.entries(enrolledByGrade).map(([grade, classes]) => (
                          <div key={grade}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '24px 0 12px', borderBottom: '1px solid rgba(99,102,241,0.25)', paddingBottom: 8 }}>
                              <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 700, fontSize: '0.8rem', padding: '3px 12px', borderRadius: 20 }}>GRADE {grade}</span>
                              <span style={{ color: '#94a3b8', fontSize: '0.82rem' }}>{classes.length} class{classes.length !== 1 ? 'es' : ''} this month</span>
                            </div>
                            {classes.map((cls) => (
                              <div key={cls.id} className="enrolled-card">
                                <div className="enrolled-info">
                                  <div className="badge badge-primary">{(cls.medium || 'Sinhala').toUpperCase()} MEDIUM</div>
                                  <h4 style={{ marginTop: 8, fontSize: '1.1rem' }}>{cls.title}</h4>
                                  <p className="text-muted text-xs" style={{ marginTop: 4 }}>
                                    📅 {cls.schedule}
                                  </p>
                                </div>
                                <div className="enrolled-actions">
                                  {cls.zoomUrl ? (
                                    <a href={cls.zoomUrl} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">🔴 Join Live Room</a>
                                  ) : (
                                    <button className="btn btn-primary btn-sm" style={{ opacity: 0.5, cursor: 'not-allowed' }} title="Zoom link not set yet">🔴 Join Live Room</button>
                                  )}
                                  <button className="btn btn-outline btn-sm" onClick={() => setActiveTab('recordings')}>View Recordings</button>
                                </div>
                              </div>
                            ))}
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
                        <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Recorded video lessons for your approved grades and month access will appear here as soon as Ishan Sir uploads them in the Admin Panel.</p>
                      </div>
                    ) : (
                      <div className="recordings-list">
                        {Object.entries(recordingsByGrade).map(([grade, recs]) => (
                          <div key={grade} style={{ marginBottom: 36 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '24px 0 16px', borderBottom: '1px solid rgba(99,102,241,0.25)', paddingBottom: 8 }}>
                              <span style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff', fontWeight: 700, fontSize: '0.85rem', padding: '4px 14px', borderRadius: 20 }}>GRADE {grade}</span>
                              <span style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{recs.length} course{recs.length !== 1 ? 's' : ''} available</span>
                            </div>
                            <div className="courses-page-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
                              {recs.map((course) => (
                                <CourseCard key={course.id} course={course} />
                              ))}
                            </div>
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
