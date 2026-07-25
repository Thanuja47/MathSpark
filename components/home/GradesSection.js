'use client';
import Link from 'next/link';
import { GRADES } from '@/lib/data';

const gradeColors = [
  { from: '#4F46E5', to: '#7C3AED' },
  { from: '#7C3AED', to: '#DB2777' },
  { from: '#DB2777', to: '#F97316' },
  { from: '#F97316', to: '#EAB308' },
  { from: '#0052FF', to: '#7B2FFF' },
  { from: '#0D9488', to: '#0052FF' },
];

export default function GradesSection() {
  return (
    <section className="section" style={{ background: 'var(--dark)' }}>
      <div className="container">
        <div className="text-center" style={{ marginBottom: 52 }}>
          <div className="section-tag">Browse by Grade</div>
          <h2 className="section-title">
            Find Your <span className="theme-gradient">Grade</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            From Grade 6 to 11, we have dedicated classes in Sinhala and English medium — tailored for each grade&apos;s curriculum.
          </p>
        </div>

        <div className="grades-grid">
          {GRADES.map((grade, i) => {
            const col = gradeColors[i] || gradeColors[0];
            return (
              <Link key={grade.id} href={`/grades/${grade.id}`} className="grade-card">
                <div
                  className="grade-card-bg"
                  style={{ background: `linear-gradient(135deg, ${col.from}, ${col.to})` }}
                />
                <div className="grade-card-content">
                  <div className="grade-number">G{grade.id}</div>
                  <div className="grade-label">{grade.label}</div>
                  <div className="grade-subjects">
                    {grade.subjects.map((s) => (
                      <span key={s} className="grade-subject-tag">{s}</span>
                    ))}
                  </div>
                  <div className="grade-arrow">
                    Explore →
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .grades-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .grade-card {
          position: relative;
          border-radius: var(--radius-lg);
          overflow: hidden;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          transition: var(--transition);
          border: 1px solid var(--border);
        }
        .grade-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 24px 64px rgba(0,0,0,0.6);
          border-color: transparent;
        }
        .grade-card-bg {
          position: absolute;
          inset: 0;
          opacity: 0.12;
          transition: opacity 0.3s;
        }
        .grade-card:hover .grade-card-bg { opacity: 0.2; }
        .grade-card-content {
          position: relative;
          z-index: 2;
          padding: 28px;
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .grade-number {
          font-family: var(--font-heading);
          font-size: 2.8rem;
          font-weight: 900;
          line-height: 1;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .grade-label { font-weight: 700; font-size: 1rem; color: var(--text-primary); }
        .grade-subjects { display: flex; flex-wrap: wrap; gap: 6px; margin-top: 4px; }
        .grade-subject-tag {
          font-size: 0.72rem;
          padding: 3px 10px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 100px;
          color: var(--text-muted);
        }
        .grade-arrow {
          margin-top: auto;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--primary-light);
          opacity: 0;
          transform: translateX(-8px);
          transition: var(--transition);
        }
        .grade-card:hover .grade-arrow { opacity: 1; transform: translateX(0); }

        @media (max-width: 900px) {
          .grades-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .grades-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
          .grade-card { min-height: 160px; }
          .grade-number { font-size: 2rem; }
          .grade-card-content { padding: 20px; }
        }
      `}</style>
    </section>
  );
}
