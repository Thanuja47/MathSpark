'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import CourseCard from '@/components/courses/CourseCard';
import SampleVideoModal from '@/components/courses/SampleVideoModal';
import { COURSES, GRADES } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function GradeFilteredClient({ gradeId }) {
  const { t } = useLanguage();
  const [selectedSampleCourse, setSelectedSampleCourse] = useState(null);

  const gradeObj = GRADES.find((g) => g.id === gradeId) || { label: `Grade ${gradeId}` };
  const filteredCourses = COURSES.filter((c) => c.grade === gradeId);
  const sampleCourse = filteredCourses[0] || { id: 1, title: `${gradeObj.label} Mathematics`, grade: gradeId, price: 2000 };

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">{t('nav.home')}</a> <span>/</span> <a href="/courses">{t('nav.classes')}</a> <span>/</span> <span>{gradeObj.label}</span>
            </div>
            <div className="section-tag page-hero-tag">{gradeObj.label} Mathematics</div>
            <h1 className="page-hero-title">
              <span className="theme-gradient">{gradeObj.label}</span> {t('nav.classes')}
            </h1>
            <p className="page-hero-desc">
              All live interactive sessions, lesson recordings, and tute materials for {gradeObj.label}.
            </p>

            {/* Free Sample Lesson Callout Banner */}
            <div className="grade-sample-banner">
              <div className="banner-left">
                <span className="banner-badge">🎬 FREE LESSON PREVIEW</span>
                <div className="banner-title">Try {gradeObj.label} Maths Class Before Buying!</div>
                <div className="banner-sub">Watch a free 3-minute sample lesson recording by Ishan Maduranga</div>
              </div>
              <button
                className="banner-play-btn"
                onClick={() => setSelectedSampleCourse(sampleCourse)}
              >
                <span className="btn-play-icon">▶</span>
                <span>Watch Free Sample Lesson</span>
              </button>
            </div>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            {filteredCourses.length > 0 ? (
              <div className="courses-page-grid">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📚</div>
                <h3 className="empty-state-title">No classes available for {gradeObj.label} yet</h3>
                <p className="empty-state-desc">Check back soon or contact us via WhatsApp to enroll in upcoming batches.</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      {/* Free Sample Video Modal */}
      <SampleVideoModal
        isOpen={Boolean(selectedSampleCourse)}
        onClose={() => setSelectedSampleCourse(null)}
        course={selectedSampleCourse}
      />

      <style jsx>{`
        .grade-sample-banner {
          margin-top: 28px;
          background: linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%);
          border: 1.5px solid rgba(59, 130, 246, 0.3);
          border-radius: 16px;
          padding: 20px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          box-shadow: 0 8px 30px rgba(37, 99, 235, 0.15);
        }
        .banner-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #10b981;
          margin-bottom: 4px;
        }
        .banner-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #eff2ff;
        }
        .banner-sub {
          font-size: 0.85rem;
          color: #8d96a7;
          margin-top: 2px;
        }
        .banner-play-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%);
          color: #ffffff;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 12px 24px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 4px 20px rgba(37, 99, 235, 0.35);
          transition: all 0.25s ease;
        }
        .banner-play-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(124, 58, 237, 0.45);
        }
        .btn-play-icon {
          font-size: 0.75rem;
          color: #10b981;
          background: rgba(255, 255, 255, 0.2);
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .courses-page-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .courses-page-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 768px) {
          .grade-sample-banner {
            flex-direction: column;
            align-items: flex-start;
          }
          .banner-play-btn {
            width: 100%;
            justify-content: center;
          }
        }
        @media (max-width: 640px) {
          .courses-page-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
