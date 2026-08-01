'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { uploadImage } from '@/utils/uploadImage';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('courses');

  // Live DB State
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form states for Courses Create/Edit
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [editingCourseId, setEditingCourseId] = useState(null);

  const [courseTitle, setCourseTitle] = useState('');
  const [courseGrade, setCourseGrade] = useState('10');
  const [courseMedium, setCourseMedium] = useState('sinhala');
  const [coursePrice, setCoursePrice] = useState('2000');
  const [courseDesc, setCourseDesc] = useState('');
  const [courseBadge, setCourseBadge] = useState('Popular');
  
  // Image Upload States
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Fetch live courses from Admin API
  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/courses');
      if (res.ok) {
        const data = await res.json();
        setCoursesList(data);
      }
    } catch (err) {
      console.error('Error loading admin courses', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const resetForm = () => {
    setCourseTitle('');
    setCourseGrade('10');
    setCourseMedium('sinhala');
    setCoursePrice('2000');
    setCourseDesc('');
    setCourseBadge('Popular');
    setImageFile(null);
    setImagePreview('');
    setEditingCourseId(null);
    setShowAddCourse(false);
  };

  const handleEditClick = (course) => {
    setEditingCourseId(course.id);
    setCourseTitle(course.title || '');
    setCourseGrade(course.grade?.toString() || '10');
    setCourseMedium(course.medium || 'sinhala');
    setCoursePrice(course.price?.toString() || '2000');
    setCourseDesc(course.description || '');
    setCourseBadge(course.badge || 'Popular');
    setImagePreview(course.imageUrl || '');
    setImageFile(null);
    setShowAddCourse(true);
  };

  const handleSubmitCourse = async (e) => {
    e.preventDefault();
    if (!courseTitle) return;

    setIsUploading(true);
    try {
      let finalImageUrl = imagePreview;

      // Upload new image if file selected
      if (imageFile) {
        finalImageUrl = await uploadImage(imageFile);
      }

      const payload = {
        title: courseTitle,
        grade: Number(courseGrade),
        medium: courseMedium,
        price: Number(coursePrice),
        description: courseDesc || `Grade ${courseGrade} ${courseMedium} medium class by Ishan Maduranga.`,
        badge: courseBadge,
        imageUrl: finalImageUrl || null,
      };

      if (editingCourseId) {
        // PUT update existing course
        const res = await fetch(`/api/admin/courses/${editingCourseId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const updated = await res.json();
          setCoursesList(coursesList.map(c => c.id === editingCourseId ? updated : c));
          resetForm();
        } else {
          alert('Failed to update course.');
        }
      } else {
        // POST create new course
        const res = await fetch('/api/admin/courses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        if (res.ok) {
          const created = await res.json();
          setCoursesList([created, ...coursesList]);
          resetForm();
        } else {
          alert('Failed to create course.');
        }
      }
    } catch (err) {
      alert('Error saving course: ' + err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteCourse = async (id) => {
    if (!confirm('Are you sure you want to delete this course? This action cannot be undone.')) return;
    try {
      const res = await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setCoursesList(coursesList.filter(c => c.id !== id));
      } else {
        alert('Failed to delete course.');
      }
    } catch (e) {
      alert('Failed to delete course.');
    }
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
                  className={`admin-nav-item ${activeTab === 'courses' ? 'active' : ''}`}
                  onClick={() => setActiveTab('courses')}
                >
                  📚 Manage Courses ({coursesList.length})
                </button>
              </div>

              {/* Admin Main Content */}
              <div className="admin-content">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                  <h3>Course Management (CRUD)</h3>
                  <button className="btn btn-primary btn-sm" onClick={() => { if (showAddCourse) resetForm(); else setShowAddCourse(true); }}>
                    {showAddCourse ? 'Cancel' : '+ Add New Course'}
                  </button>
                </div>

                {/* Create / Edit Form */}
                {showAddCourse && (
                  <form onSubmit={handleSubmitCourse} className="admin-form-box">
                    <h4 style={{ marginBottom: 16 }}>{editingCourseId ? 'Edit Course' : 'Create New Course'}</h4>
                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Course Title</label>
                      <input
                        type="text"
                        placeholder="Ex: Grade 10 Maths Revision Batch 2026"
                        className="form-input"
                        value={courseTitle}
                        onChange={(e) => setCourseTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
                      <div className="form-group">
                        <label className="form-label">Grade</label>
                        <select className="form-input" value={courseGrade} onChange={(e) => setCourseGrade(e.target.value)}>
                          {[6, 7, 8, 9, 10, 11].map(g => <option key={g} value={g}>Grade {g}</option>)}
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Medium</label>
                        <select className="form-input" value={courseMedium} onChange={(e) => setCourseMedium(e.target.value)}>
                          <option value="sinhala">Sinhala Medium</option>
                          <option value="english">English Medium</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Fee (LKR)</label>
                        <input type="number" className="form-input" value={coursePrice} onChange={(e) => setCoursePrice(e.target.value)} required />
                      </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: 12 }}>
                      <label className="form-label">Description</label>
                      <textarea
                        className="form-input"
                        rows="2"
                        placeholder="Brief overview of course topics..."
                        value={courseDesc}
                        onChange={(e) => setCourseDesc(e.target.value)}
                      />
                    </div>

                    {/* Image Upload Field */}
                    <div className="form-group" style={{ marginBottom: 16 }}>
                      <label className="form-label">Course Image (Supabase Storage)</label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="form-input"
                        style={{ padding: '8px' }}
                      />
                      {imagePreview && (
                        <div style={{ marginTop: 10 }}>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Image Preview:</span>
                          <img
                            src={imagePreview}
                            alt="Course Preview"
                            style={{ height: 100, borderRadius: 8, objectFit: 'cover', display: 'block', marginTop: 4, border: '1px solid var(--border)' }}
                          />
                        </div>
                      )}
                    </div>

                    <div style={{ display: 'flex', gap: 10 }}>
                      <button type="submit" className="btn btn-accent btn-sm" disabled={isUploading}>
                        {isUploading ? 'Uploading & Saving...' : (editingCourseId ? 'Update Course 💾' : 'Publish Course 🚀')}
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={resetForm}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}

                {/* Course List Table */}
                {loading ? (
                  <div style={{ padding: 40, textAlign: 'center', color: 'var(--text-muted)' }}>
                    Loading courses from database...
                  </div>
                ) : (
                  <div className="admin-table-wrap">
                    <table className="admin-table">
                      <thead>
                        <tr>
                          <th>Image</th>
                          <th>Course Title</th>
                          <th>Grade</th>
                          <th>Medium</th>
                          <th>Fee</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {coursesList.length === 0 ? (
                          <tr>
                            <td colSpan="6" style={{ textAlign: 'center', color: 'var(--muted)' }}>No courses found. Add your first course!</td>
                          </tr>
                        ) : (
                          coursesList.map((c) => (
                            <tr key={c.id}>
                              <td>
                                {c.imageUrl ? (
                                  <img src={c.imageUrl} alt={c.title} style={{ width: 48, height: 36, objectFit: 'cover', borderRadius: 4 }} />
                                ) : (
                                  <span style={{ fontSize: '1.2rem' }}>📚</span>
                                )}
                              </td>
                              <td><strong>{c.title}</strong></td>
                              <td>Grade {c.grade}</td>
                              <td><span className="badge badge-primary">{c.medium}</span></td>
                              <td>LKR {c.price}</td>
                              <td>
                                <div style={{ display: 'flex', gap: 8 }}>
                                  <button
                                    onClick={() => handleEditClick(c)}
                                    className="btn btn-secondary btn-sm"
                                    style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => handleDeleteCourse(c.id)}
                                    className="btn btn-ghost btn-sm"
                                    style={{ padding: '4px 10px', fontSize: '0.75rem', color: '#ff4d4f' }}
                                  >
                                    Delete
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
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
          gap: 6px;
        }
        .admin-nav-item {
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
        .admin-nav-item.active, .admin-nav-item:hover {
          background: var(--cobalt-glow);
          border-color: var(--cobalt-ring);
          color: var(--cobalt-light);
        }
        .admin-content {
          background: var(--surface);
          border: 1px solid var(--rule);
          border-radius: var(--radius-xl);
          padding: 32px;
        }
        .admin-form-box {
          background: var(--surface-2);
          border: 1px solid var(--rule);
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
          border-bottom: 1px solid var(--rule-light);
        }
        .admin-table th {
          color: var(--muted);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.72rem;
          letter-spacing: 0.05em;
        }
        @media (max-width: 850px) {
          .admin-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
