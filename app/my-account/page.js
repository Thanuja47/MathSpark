'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { COURSES } from '@/lib/data';

export default function MyAccountPage() {
  const [activeTab, setActiveTab] = useState('courses');

  const enrolledCourses = COURSES.slice(0, 2);

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '80vh' }}>
        <section className="page-hero" style={{ padding: '60px 0 40px' }}>
          <div className="container">
            <div className="dashboard-user-header">
              <div className="dashboard-avatar">👨‍🎓</div>
              <div>
                <h2 style={{ fontSize: '1.8rem' }}>Welcome back, <span className="theme-gradient">Kavindi!</span></h2>
                <p className="text-secondary text-sm">Grade 10 · Sinhala Medium · WhatsApp: +94 71 234 5678</p>
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
                  📹 Lesson Recordings
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
                            <button className="btn btn-primary btn-sm">
                              🔴 Join Live Room
                            </button>
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
                      {[
                        { title: 'Lesson 14: Quadratic Equations & Formula Proofs', date: 'July 18, 2026', duration: '1h 45m', views: '230 watching' },
                        { title: 'Lesson 13: Linear Graphs & Intercept Analysis', date: 'July 11, 2026', duration: '2h 00m', views: '410 watching' },
                        { title: 'Lesson 12: Algebraic Expressions & Expansion', date: 'July 04, 2026', duration: '1h 50m', views: '520 watching' },
                      ].map((rec, i) => (
                        <div key={i} className="recording-card">
                          <div className="rec-icon">▶</div>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{rec.title}</h4>
                            <div className="text-muted text-xs" style={{ display: 'flex', gap: 16, marginTop: 4 }}>
                              <span>📅 {rec.date}</span>
                              <span>⏱️ {rec.duration}</span>
                            </div>
                          </div>
                          <button className="btn btn-accent btn-sm">
                            Watch Video 🎬
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'tutes' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Tute Packs &amp; Book Deliveries</h3>
                    <div className="enrolled-card">
                      <div>
                        <span className="badge badge-green">DELIVERED</span>
                        <h4 style={{ marginTop: 8, fontSize: '1rem' }}>Grade 10 Maths Tute Pack - Month 05</h4>
                        <p className="text-muted text-xs" style={{ marginTop: 4 }}>Tracking ID: MSP-9842 · Delivered on July 14, 2026</p>
                      </div>
                      <a href="/tracking" className="btn btn-outline btn-sm">
                        View Receipt
                      </a>
                    </div>
                  </div>
                )}

                {activeTab === 'profile' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Profile Settings</h3>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input type="text" className="form-input" defaultValue="Kavindi Perera" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">WhatsApp Number</label>
                      <input type="text" className="form-input" defaultValue="+94 71 234 5678" readOnly />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Grade</label>
                      <input type="text" className="form-input" defaultValue="Grade 10" readOnly />
                    </div>
                    <button className="btn btn-primary" style={{ marginTop: 12 }}>
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
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
          width: 64px; height: 64px;
          border-radius: 50%;
          background: var(--gradient-blue);
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
        }
        .dashboard-grid {
          display: grid;
          grid-template-columns: 260px 1fr;
          gap: 32px;
        }
        .dashboard-sidebar {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .dashboard-nav-item {
          padding: 14px 18px;
          border-radius: var(--radius-md);
          background: var(--dark-2);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.9rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: var(--transition);
        }
        .dashboard-nav-item.active, .dashboard-nav-item:hover {
          background: var(--primary-glow);
          border-color: rgba(0,82,255,0.3);
          color: var(--primary-light);
        }
        .dashboard-content {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px;
        }
        .enrolled-list, .recordings-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .enrolled-card, .recording-card {
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }
        .rec-icon {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: rgba(255,107,0,0.1);
          color: var(--accent);
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem; flex-shrink: 0;
        }
        @media (max-width: 850px) {
          .dashboard-grid { grid-template-columns: 1fr; }
          .enrolled-card, .recording-card { flex-direction: column; align-items: flex-start; }
        }
      `}</style>
    </>
  );
}
