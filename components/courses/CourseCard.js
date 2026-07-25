'use client';
import Link from 'next/link';

export default function CourseCard({ course }) {
  const {
    id, title, grade, medium, lessons, students,
    price, currency, isFree, thumbnail, badge, badgeColor, description,
  } = course;

  const placeholderColors = {
    6:  'from-blue-600 to-violet-600',
    7:  'from-violet-600 to-pink-600',
    8:  'from-pink-600 to-orange-500',
    9:  'from-orange-500 to-yellow-500',
    10: 'from-emerald-500 to-teal-600',
    11: 'from-teal-600 to-blue-600',
  };

  const gradientMap = {
    6:  'linear-gradient(135deg,#4F46E5,#7C3AED)',
    7:  'linear-gradient(135deg,#7C3AED,#DB2777)',
    8:  'linear-gradient(135deg,#DB2777,#F97316)',
    9:  'linear-gradient(135deg,#F97316,#EAB308)',
    10: 'linear-gradient(135deg,#0052FF,#7B2FFF)',
    11: 'linear-gradient(135deg,#0D9488,#0052FF)',
  };

  return (
    <div className="course-card">
      {/* Image / Placeholder */}
      <div className="course-card-image">
        <div
          className="course-img-placeholder"
          style={{ background: gradientMap[grade] || gradientMap[10] }}
        >
          <div className="course-placeholder-content">
            <span className="course-grade-big">G{grade}</span>
            <span className="course-medium-tag">{medium === 'english' ? 'English' : 'Sinhala'} Medium</span>
          </div>
          {/* Decorative circles */}
          <div className="placeholder-circle c1" />
          <div className="placeholder-circle c2" />
        </div>
        {badge && (
          <div
            className="course-card-badge"
            style={{ background: badgeColor || 'var(--primary)' }}
          >
            {badge}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="course-card-body">
        <h4 className="course-card-title">
          <Link href={`/courses/${id}`}>{title}</Link>
        </h4>

        <p className="course-card-desc">{description?.slice(0, 90)}…</p>

        <div className="course-meta">
          <span>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
            {lessons} Lessons
          </span>
          <span>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/>
            </svg>
            {students.toLocaleString()} Students
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="course-card-footer">
        <div className="course-price">
          {isFree ? (
            <span className="free-badge">FREE</span>
          ) : (
            <>
              <span className="currency">{currency} </span>
              {price.toLocaleString()}
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400, marginLeft: 4 }}>/month</span>
            </>
          )}
        </div>
        <Link href={`/courses/${id}`} className="course-link">
          Learn More
          <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </Link>
      </div>

      <style jsx>{`
        .course-img-placeholder {
          width: 100%; height: 100%;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .course-placeholder-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }
        .course-grade-big {
          font-family: var(--font-heading);
          font-size: 3.5rem;
          font-weight: 900;
          color: rgba(255,255,255,0.9);
          line-height: 1;
          text-shadow: 0 4px 20px rgba(0,0,0,0.3);
        }
        .course-medium-tag {
          font-size: 0.7rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.7);
          background: rgba(0,0,0,0.2);
          padding: 3px 10px;
          border-radius: 100px;
        }
        .placeholder-circle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.1);
        }
        .c1 { width: 120px; height: 120px; top: -30px; right: -30px; }
        .c2 { width: 80px; height: 80px; bottom: -20px; left: -20px; }
        .course-card-desc {
          font-size: 0.82rem;
          color: var(--text-muted);
          line-height: 1.5;
          margin: 0;
        }
        .free-badge {
          font-size: 0.85rem;
          font-weight: 800;
          color: #00C896;
          letter-spacing: 0.05em;
        }
      `}</style>
    </div>
  );
}
