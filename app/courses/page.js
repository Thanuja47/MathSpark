'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import CourseCard from '@/components/CourseCard';
import { COURSES } from '@/lib/data';

export default function CoursesPage() {
  const [selectedGrade, setSelectedGrade] = useState('all');
  const [selectedMedium, setSelectedMedium] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCourses = COURSES.filter((course) => {
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
            {filteredCourses.length > 0 ? (
              <div className="courses-page-grid">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">🔍</div>
                <h3 className="empty-state-title">No classes found</h3>
                <p className="empty-state-desc">Try adjusting your filters or search query.</p>
                <button
                  className="btn btn-outline"
                  style={{ marginTop: '20px' }}
                  onClick={() => { setSelectedGrade('all'); setSelectedMedium('all'); setSearchQuery(''); }}
                >
                  Reset Filters
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
          margin-bottom: 40px;
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 20px;
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
        }
        .filter-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .medium-select-wrap select {
          min-width: 150px;
          cursor: pointer;
        }
        .courses-page-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .courses-page-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 600px) {
          .courses-page-grid { grid-template-columns: 1fr; }
          .courses-filter-bar { flex-direction: column; align-items: stretch; }
        }
      `}</style>
    </>
  );
}
