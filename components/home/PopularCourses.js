'use client';
import Link from 'next/link';
import CourseCard from '@/components/courses/CourseCard';
import { POPULAR_COURSES } from '@/lib/data';

export default function PopularCourses() {
  return (
    <section className="section" style={{ background: 'var(--dark)' }}>
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div>
            <div className="section-tag">🔥 Live Courses</div>
            <h2 className="section-title">Popular <span className="theme-gradient">Classes</span></h2>
            <p className="section-subtitle">
              Join thousands of students in Sri Lanka mastering Mathematics with expert-led live sessions.
            </p>
          </div>
          <Link href="/courses" className="btn btn-outline">
            View All Classes
            <svg className="arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>

        {/* Course Grid */}
        <div className="courses-grid">
          {POPULAR_COURSES.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="courses-bottom-cta">
          <p className="text-secondary text-sm">Can&apos;t find your grade? We cover all grades from 6 to 11.</p>
          <Link href="/courses" className="btn btn-primary">
            Browse All {'{'}8{'}'} Courses
            <svg className="arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .section-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 24px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .courses-bottom-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          margin-top: 48px;
          flex-wrap: wrap;
        }
        @media (max-width: 900px) {
          .courses-grid { grid-template-columns: repeat(2, 1fr); }
          .section-header { flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 580px) {
          .courses-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
}
