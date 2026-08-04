'use client';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export default function CourseCard({ course }) {
  const { t } = useLanguage();
  const {
    id, title, grade, medium, lessons, students,
    price, currency, isFree, badge, description,
  } = course;

  const gradientMap = {
    6:  'linear-gradient(135deg,#1D4ED8,#2563EB)',
    7:  'linear-gradient(135deg,#1E1B4B,#312E81)',
    8:  'linear-gradient(135deg,#0F172A,#1E293B)',
    9:  'linear-gradient(135deg,#581C87,#6B21A8)',
    10: 'linear-gradient(135deg,#2563EB,#7C3AED)',
    11: 'linear-gradient(135deg,#0F766E,#0D9488)',
  };

  return (
    <div className="course-card">
      {/* Image / Placeholder */}
      <div className="course-card-image">
        <div
          className="course-img-placeholder"
          style={{ background: gradientMap[grade] || gradientMap[10] }}
        >
          {/* Subtle math graph overlay for signature detail */}
          <div className="math-graph-overlay" />
          
          <div className="course-placeholder-content">
            <span className="course-grade-big font-mono">G{grade}</span>
            <span className="course-medium-tag">{medium === 'english' ? 'English' : 'Sinhala'} Medium</span>
          </div>
        </div>
        {badge && (
          <div className="course-card-badge">
            {badge}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="course-card-body">
        <h4 className="course-card-title">
          <Link href={`/courses/${id}`}>{title}</Link>
        </h4>

        <p className="course-card-desc">{description?.slice(0, 85)}...</p>

        <div className="course-meta">
          <span>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
            </svg>
            {lessons} Lessons
          </span>
          <span>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
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
            <span className="free-badge">{t('common.free')}</span>
          ) : (
            <>
              <span className="currency">{currency}</span>
              <span className="price-mono">{price.toLocaleString()}</span>
              <span className="price-cycle">/mo</span>
            </>
          )}
        </div>
        <Link href={`/courses/${id}`} className="course-link">
          {t('common.viewDetails')}
          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
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
        .math-graph-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 16px 16px;
          pointer-events: none;
        }
        .course-placeholder-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .course-grade-big {
          font-size: 3rem;
          font-weight: 700;
          color: var(--paper);
          line-height: 1;
          letter-spacing: -0.03em;
        }
        .course-medium-tag {
          font-size: 0.65rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.8);
          background: rgba(0,0,0,0.3);
          padding: 3px 10px;
          border-radius: var(--radius-sm);
        }
        .course-card-desc {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
        .free-badge {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--emerald);
          letter-spacing: 0.05em;
        }
        .price-mono {
          font-weight: 600;
          color: var(--paper);
        }
        .price-cycle {
          font-size: 0.72rem;
          color: var(--muted);
          margin-left: 2px;
        }
      `}</style>
    </div>
  );
}
