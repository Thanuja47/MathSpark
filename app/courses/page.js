'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import CourseCard from '@/components/courses/CourseCard';
import { courseService } from '@/services/courseService';

export default function CoursesPage() {
  const [coursesList, setCoursesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedMedium, setSelectedMedium] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    courseService.getAllCourses()
      .then(data => {
        if (Array.isArray(data)) {
          const formatted = data.map(c => ({
            id: c.id,
            title: c.title,
            grade: c.grade,
            medium: c.medium,
            lessons: 12,
            students: 150,
            packs: 2,
            price: c.price,
            currency: 'LKR',
            isPopular: c.badge === 'Popular',
            description: c.description || '',
            instructor: 'Ishan Maduranga',
            imageUrl: c.imageUrl,
          }));
          setCoursesList(formatted);
        }
      })
      .catch(err => console.error('Failed to load courses', err))
      .finally(() => setLoading(false));
  }, []);

  const filteredCourses = coursesList.filter((course) => {
    const matchesGrade = selectedGrade === 'all' || course.grade.toString() === selectedGrade;
    const matchesMedium = selectedMedium === 'all' || course.medium === selectedMedium;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGrade && matchesMedium && matchesSearch;
  });

  return (
    <>
      <Header />
      <main>
        {/* Page Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a> <span>/</span> <span>Classes</span>
            </div>
            <div className="section-tag page-hero-tag">All Online Classes</div>
            <h1 className="page-hero-title">
              Explore Our <span className="theme-gradient">Mathematics</span> Courses
            </h1>
            <p className="page-hero-desc">
              Choose from Grade 6 to Grade 11 live interactive classes in Sinhala and English Medium.
            </p>
          </div>
        </section>

        {/* Courses Section */}
        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            {/* Filters Bar */}
            <div className="courses-filter-bar">
              {/* Search */}
              <div className="search-input-wrap">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search classes or topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="form-input"
                  style={{ paddingLeft: '44px' }}
                />
              </div>

              {/* Grade Filter */}
              <div className="filter-tags">
                <button
                  className={`filter-tag ${selectedGrade === 'all' ? 'active' : ''}`}
                  onClick={() => setSelectedGrade('all')}
                >
                  All Grades
                </button>
                {[6, 7, 8, 9, 10, 11].map((g) => (
                  <button
                    key={g}
                    className={`filter-tag ${selectedGrade === g.toString() ? 'active' : ''}`}
                    onClick={() => setSelectedGrade(g.toString())}
                  >
                    Grade {g}
                  </button>
                ))}
              </div>

              {/* Medium Filter */}
              <div className="medium-select-wrap">
                <select
                  value={selectedMedium}
                  onChange={(e) => setSelectedMedium(e.target.value)}
                  className="form-input"
                >
                  <option value="all">All Mediums</option>
                  <option value="sinhala">Sinhala Medium</option>
                  <option value="english">English Medium</option>
                </select>
              </div>
            </div>

            {/* Results Grid */}
            {loading ? (
              <div style={{ textCenter: 'center', padding: '60px 20px', color: 'var(--text-muted)' }}>
                Loading live classes from database...
              </div>
            ) : filteredCourses.length > 0 ? (
              <div className="courses-page-grid">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="no-results-box">
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
                <h3>No Classes Found</h3>
                <p>Try adjusting your search query or grade filters.</p>
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => { setSelectedGrade('all'); setSelectedMedium('all'); setSearchQuery(''); }}
                  style={{ marginTop: '16px' }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .courses-filter-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          align-items: center;
          justify-content: space-between;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 16px 20px;
          margin-bottom: 36px;
        }
        .search-input-wrap {
          position: relative;
          flex: 1;
          min-width: 240px;
        }
        .search-input-wrap svg {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-muted);
          pointer-events: none;
        }
        .filter-tags {
          display: flex;
          gap: 6px;
          flex-wrap: wrap;
        }
        .filter-tag {
          padding: 8px 14px;
          border-radius: var(--radius-md);
          background: var(--surface-2);
          border: 1px solid var(--border);
          color: var(--text-muted);
          font-size: 0.8438rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition);
        }
        .filter-tag:hover, .filter-tag.active {
          background: var(--cobalt-glow);
          border-color: var(--cobalt-ring);
          color: var(--cobalt-light);
        }
        .medium-select-wrap select {
          min-width: 160px;
        }
        .courses-page-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        .no-results-box {
          text-align: center;
          padding: 60px 20px;
          background: var(--surface);
          border: 1px dashed var(--border);
          border-radius: var(--radius-lg);
        }
        @media (max-width: 768px) {
          .courses-filter-bar {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </>
  );
}
