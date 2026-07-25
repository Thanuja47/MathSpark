'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { COURSES, STATS, STORE_ITEMS } from '@/lib/data';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Admin state management
  const [coursesList, setCoursesList] = useState(COURSES);
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourseTitle, setNewCourseTitle] = useState('');
  const [newCourseGrade, setNewCourseGrade] = useState('10');
  const [newCourseMedium, setNewCourseMedium] = useState('sinhala');
  const [newCoursePrice, setNewCoursePrice] = useState('2000');

  // Tracking codes management
  const [trackingList, setTrackingList] = useState([
    { id: 'MSP-9842', student: 'Kavindi Perera', phone: '0712345678', item: 'Grade 10 Maths Tute Month 05', status: 'In Transit', date: 'July 23, 2026' },
    { id: 'MSP-9841', student: 'Tharindu Silva', phone: '0779876543', item: 'Grade 11 Past Paper Pack', status: 'Delivered', date: 'July 22, 2026' },
    { id: 'MSP-9840', student: 'Sithmi Fernando', phone: '0701122334', item: 'Grade 9 Foundation Workbook', status: 'Processing', date: 'July 23, 2026' },
  ]);
  const [newTrackId, setNewTrackId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newStatus, setNewStatus] = useState('Processing');

  // Upload video recording state
  const [uploadCourseId, setUploadCourseId] = useState('1');
  const [lessonTitle, setLessonTitle] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (!newCourseTitle) return;
    const newCourse = {
      id: Date.now(),
      title: newCourseTitle,
      grade: parseInt(newCourseGrade, 10),
      medium: newCourseMedium,
      lessons: 0,
      students: 0,
      packs: 0,
      price: parseInt(newCoursePrice, 10),
      currency: 'LKR',
      isFree: false,
      isPopular: false,
      description: 'Newly created class for upcoming term.',
      instructor: 'Ishan Maduranga',
    };
    setCoursesList([newCourse, ...coursesList]);
    setNewCourseTitle('');
    setShowAddCourse(false);
  };

  const handleAddTracking = (e) => {
    e.preventDefault();
    if (!newTrackId || !newStudentName) return;
    const newEntry = {
      id: newTrackId,
      student: newStudentName,
      phone: newStudentPhone,
      item: newItemName,
      status: newStatus,
      date: 'Today',
    };
    setTrackingList([newEntry, ...trackingList]);
    setNewTrackId('');
    setNewStudentName('');
    setNewStudentPhone('');
    setNewItemName('');
  };

  const handleUploadVideo = (e) => {
    e.preventDefault();
    if (!lessonTitle || !videoUrl) return;
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setLessonTitle('');
      setVideoUrl('');
    }, 2500);
  };

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '85vh' }}>
        {/* Admin Header */}
        <section className="page-hero" style={{ padding: '40px 0 30px', borderBottom: '1px solid var(--border)' }}>
          <div className="container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <span className="badge badge-accent" style={{ marginBottom: 8 }}>ADMIN CONTROL PANEL</span>
                <h1 style={{ fontSize: '1.8rem' }}>MathSpark <span className="theme-gradient">Teacher &amp; Admin Portal</span></h1>
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Logged in as <strong>admin@mathspark.lk</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section-sm">
          <div className="container">
            <div className="admin-grid">
              {/* Admin Navigation */}
              <div className="admin-sidebar">
                <button
                  className={`admin-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  📊 Platform Analytics
                </button>
                <button
                  className={`admin-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                >
                  📚 Manage Classes ({coursesList.length})
                </button>
                <button
                  className={`admin-nav-item ${activeTab === 'upload' ? 'active' : ''}`}
                  onClick={() => setActiveTab('upload')}
                >
                  📹 Upload Lesson Video
                </button>
                <button
                  className={`admin-nav-item ${activeTab === 'tracking' ? 'active' : ''}`}
                  onClick={() => setActiveTab('tracking')}
                >
                  🚚 Tute Delivery Tracking
                </button>
                <button
                  className={`admin-nav-item ${activeTab === 'students' ? 'active' : ''}`}
                  onClick={() => setActiveTab('students')}
                >
                  👥 Student Directory
                </button>
              </div>

              {/* Admin Main Window */}
              <div className="admin-content">
                {/* 1. OVERVIEW */}
                {activeTab === 'overview' && (
                  <div>
                    <h3 style={{ marginBottom: 24 }}>Platform Overview</h3>
                    <div className="admin-stats-grid">
                      <div className="admin-stat-card">
                        <div className="admin-stat-val">5,240</div>
                        <div className="admin-stat-lbl">Active Enrolled Students</div>
                      </div>
                      <div className="admin-stat-card">
                        <div className="admin-stat-val">LKR 10.4M</div>
                        <div className="admin-stat-lbl">Monthly Tuition Revenue</div>
                      </div>
                      <div className="admin-stat-card">
                        <div className="admin-stat-val">1,840</div>
                        <div className="admin-stat-lbl">Total Lesson Videos</div>
                      </div>
                      <div className="admin-stat-card">
                        <div className="admin-stat-val">342</div>
                        <div className="admin-stat-lbl">Pending Tute Deliveries</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 2. MANAGE COURSES */}
                {activeTab === 'courses' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                      <h3>Class Management</h3>
                      <button className="btn btn-primary btn-sm" onClick={() => setShowAddCourse(!showAddCourse)}>
                        {showAddCourse ? 'Cancel' : '+ Add New Class'}
                      </button>
                    </div>

                    {showAddCourse && (
                      <form onSubmit={handleAddCourse} className="admin-form-box">
                        <h4 style={{ marginBottom: 16 }}>Create New Class</h4>
                        <div className="form-group">
                          <label className="form-label">Class Title</label>
                          <input
                            type="text"
                            placeholder="Ex: Grade 10 Maths Revision Batch 2026"
                            className="form-input"
                            value={newCourseTitle}
                            onChange={(e) => setNewCourseTitle(e.target.value)}
                            required
                          />
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                          <div className="form-group">
                            <label className="form-label">Grade</label>
                            <select className="form-input" value={newCourseGrade} onChange={(e) => setNewCourseGrade(e.target.value)}>
                              {[6, 7, 8, 9, 10, 11].map(g => <option key={g} value={g}>Grade {g}</option>)}
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Medium</label>
                            <select className="form-input" value={newCourseMedium} onChange={(e) => setNewCourseMedium(e.target.value)}>
                              <option value="sinhala">Sinhala Medium</option>
                              <option value="english">English Medium</option>
                            </select>
                          </div>
                          <div className="form-group">
                            <label className="form-label">Fee (LKR)</label>
                            <input type="number" className="form-input" value={newCoursePrice} onChange={(e) => setNewCoursePrice(e.target.value)} />
                          </div>
                        </div>
                        <button type="submit" className="btn btn-accent btn-sm" style={{ marginTop: 12 }}>
                          Publish Class 🚀
                        </button>
                      </form>
                    )}

                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Class Title</th>
                            <th>Grade</th>
                            <th>Medium</th>
                            <th>Fee</th>
                            <th>Students</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coursesList.map((c) => (
                            <tr key={c.id}>
                              <td><strong>{c.title}</strong></td>
                              <td>Grade {c.grade}</td>
                              <td><span className="badge badge-primary">{c.medium}</span></td>
                              <td>LKR {c.price}</td>
                              <td>{c.students}</td>
                              <td>
                                <button className="btn btn-ghost btn-sm" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>
                                  Edit
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 3. UPLOAD LESSON VIDEO */}
                {activeTab === 'upload' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Upload Lesson Video Recording</h3>
                    {uploadSuccess && (
                      <div className="alert alert-success" style={{ background: 'rgba(0,200,150,0.1)', border: '1px solid #00C896', padding: 14, borderRadius: 8, color: '#00C896', marginBottom: 20 }}>
                        ✅ Video recording successfully uploaded and published to student dashboard!
                      </div>
                    )}
                    <form onSubmit={handleUploadVideo} className="admin-form-box">
                      <div className="form-group">
                        <label className="form-label">Select Target Class</label>
                        <select className="form-input" value={uploadCourseId} onChange={(e) => setUploadCourseId(e.target.value)}>
                          {coursesList.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Lesson Title</label>
                        <input
                          type="text"
                          placeholder="Ex: Lesson 15: Quadratic Equations & Past Paper Questions"
                          className="form-input"
                          value={lessonTitle}
                          onChange={(e) => setLessonTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Video Stream URL / Embed Link (Vimeo/Cloudflare Stream/HLS)</label>
                        <input
                          type="text"
                          placeholder="Ex: https://player.vimeo.com/video/84920491 or HLS stream link"
                          className="form-input"
                          value={videoUrl}
                          onChange={(e) => setVideoUrl(e.target.value)}
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Publish Lesson Video 🎬
                      </button>
                    </form>
                  </div>
                )}

                {/* 4. TUTE TRACKING MANAGEMENT */}
                {activeTab === 'tracking' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Update Tute Delivery Tracking</h3>

                    <form onSubmit={handleAddTracking} className="admin-form-box" style={{ marginBottom: 24 }}>
                      <h4 style={{ marginBottom: 12 }}>Add/Update Tracking Code</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                        <div className="form-group">
                          <label className="form-label">Tracking ID</label>
                          <input type="text" placeholder="Ex: MSP-9843" className="form-input" value={newTrackId} onChange={(e) => setNewTrackId(e.target.value)} required />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Student Name</label>
                          <input type="text" placeholder="Ex: Nimal Siripala" className="form-input" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} required />
                        </div>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                        <div className="form-group">
                          <label className="form-label">Phone</label>
                          <input type="text" placeholder="0712345678" className="form-input" value={newStudentPhone} onChange={(e) => setNewStudentPhone(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Item Description</label>
                          <input type="text" placeholder="Grade 10 Tute Month 06" className="form-input" value={newItemName} onChange={(e) => setNewItemName(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label className="form-label">Status</label>
                          <select className="form-input" value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
                            <option value="Processing">Processing</option>
                            <option value="Dispatched">Dispatched</option>
                            <option value="In Transit">In Transit</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="btn btn-accent btn-sm">
                        Save Tracking Info 🚚
                      </button>
                    </form>

                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Tracking ID</th>
                            <th>Student</th>
                            <th>Phone</th>
                            <th>Item</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {trackingList.map((t) => (
                            <tr key={t.id}>
                              <td><code>{t.id}</code></td>
                              <td>{t.student}</td>
                              <td>{t.phone}</td>
                              <td>{t.item}</td>
                              <td>
                                <span className={`badge ${t.status === 'Delivered' ? 'badge-green' : t.status === 'In Transit' ? 'badge-primary' : 'badge-accent'}`}>
                                  {t.status}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 5. STUDENTS DIRECTORY */}
                {activeTab === 'students' && (
                  <div>
                    <h3 style={{ marginBottom: 20 }}>Registered Students Directory</h3>
                    <div className="admin-table-wrap">
                      <table className="admin-table">
                        <thead>
                          <tr>
                            <th>Student Name</th>
                            <th>WhatsApp Number</th>
                            <th>Grade</th>
                            <th>Joined Date</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[
                            { name: 'Kavindi Perera', phone: '+94 71 234 5678', grade: 'Grade 10', date: 'May 12, 2025', status: 'Active' },
                            { name: 'Tharindu Silva', phone: '+94 77 987 6543', grade: 'Grade 11', date: 'Jan 04, 2025', status: 'Active' },
                            { name: 'Sithmi Fernando', phone: '+94 70 112 2334', grade: 'Grade 09', date: 'Feb 18, 2026', status: 'Active' },
                            { name: 'Dinesh Bandara', phone: '+94 76 554 3321', grade: 'Grade 11', date: 'Mar 30, 2025', status: 'Active' },
                          ].map((s, i) => (
                            <tr key={i}>
                              <td><strong>{s.name}</strong></td>
                              <td>{s.phone}</td>
                              <td>{s.grade}</td>
                              <td>{s.date}</td>
                              <td><span className="badge badge-green">{s.status}</span></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
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
        .admin-grid {
          display: grid;
          grid-template-columns: 240px 1fr;
          gap: 32px;
        }
        .admin-sidebar {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .admin-nav-item {
          padding: 14px 16px;
          border-radius: var(--radius-md);
          background: var(--dark-2);
          border: 1px solid var(--border);
          color: var(--text-secondary);
          font-size: 0.88rem;
          font-weight: 500;
          text-align: left;
          cursor: pointer;
          transition: var(--transition);
        }
        .admin-nav-item.active, .admin-nav-item:hover {
          background: var(--primary-glow);
          border-color: rgba(0,82,255,0.3);
          color: var(--primary-light);
        }
        .admin-content {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 32px;
        }
        .admin-stats-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }
        .admin-stat-card {
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          text-align: center;
        }
        .admin-stat-val {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 900;
          color: var(--primary-light);
          margin-bottom: 4px;
        }
        .admin-stat-lbl {
          font-size: 0.8rem;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .admin-form-box {
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          margin-bottom: 24px;
        }
        .admin-table-wrap {
          overflow-x: auto;
        }
        .admin-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          font-size: 0.875rem;
        }
        .admin-table th, .admin-table td {
          padding: 14px 16px;
          border-bottom: 1px solid var(--border-light);
        }
        .admin-table th {
          color: var(--text-muted);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
        }
        @media (max-width: 850px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
