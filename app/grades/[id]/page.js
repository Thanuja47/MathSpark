'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import CourseCard from '@/components/courses/CourseCard';
import { COURSES, GRADES } from '@/lib/data';

export default function GradeFilteredPage({ params }) {
  const gradeId = parseInt(params.id, 10);
  const gradeObj = GRADES.find((g) => g.id === gradeId) || { label: `Grade ${gradeId}` };
  const filteredCourses = COURSES.filter((c) => c.grade === gradeId);

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a> <span>/</span> <a href="/courses">Classes</a> <span>/</span> <span>{gradeObj.label}</span>
            </div>
            <div className="section-tag page-hero-tag">{gradeObj.label} Mathematics</div>
            <h1 className="page-hero-title">
              <span className="theme-gradient">{gradeObj.label}</span> Classes
            </h1>
            <p className="page-hero-desc">
              All live interactive sessions, lesson recordings, and tute materials for {gradeObj.label}.
            </p>
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

      <style jsx>{`
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
        }
      `}</style>
    </>
  );
}
