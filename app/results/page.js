'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { useLanguage } from '@/context/LanguageContext';

const STATIC_RESULTS = [
  { year: '2025', grade: 'O/L (Grade 11)', aPass: 3682, total: 3950, percentage: '93%', topScorer: 'Kavindi P. — 100/100', medium: 'Sinhala & English' },
  { year: '2025', grade: 'Grade 10 Term Exam', aPass: 1840, total: 2100, percentage: '87%', topScorer: 'Tharindu S. — 98/100', medium: 'Sinhala' },
  { year: '2024', grade: 'O/L (Grade 11)', aPass: 2910, total: 3200, percentage: '91%', topScorer: 'Sithmi F. — 99/100', medium: 'Sinhala & English' },
];

const STATIC_TOPPERS = [
  { name: 'Kavindi Perera', grade: 'Grade 11 · O/L 2025', score: '100/100', school: 'Visakha Vidyalaya, Colombo', medium: 'Sinhala', color: '#0052FF' },
  { name: 'Tharindu Silva', grade: 'Grade 10 · Term 2025', score: '98/100', school: 'Mahinda College, Galle', medium: 'Sinhala', color: '#7B2FFF' },
  { name: 'Sithmi Fernando', grade: 'Grade 11 · O/L 2024', score: '99/100', school: "S. Thomas' Girls, Colombo", medium: 'English', color: '#FF6B00' },
  { name: 'Dinesh Bandara', grade: 'Grade 10 · Term 2024', score: '97/100', school: 'Ananda College, Colombo', medium: 'Sinhala', color: '#00C896' },
];

export default function ResultsPage() {
  const { t } = useLanguage();
  const [liveResults, setLiveResults] = useState([]);

  useEffect(() => {
    fetch('/api/results')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setLiveResults(data);
        }
      })
      .catch(err => console.error('Error fetching results:', err));
  }, []);

  const allToppers = [
    ...liveResults.map(r => ({
      name: r.studentName,
      grade: `Grade ${r.grade} · ${r.year}`,
      score: `${r.score}/100`,
      school: 'MathSpark Student',
      medium: r.subject || 'Sinhala',
      color: '#0052FF',
    })),
    ...STATIC_TOPPERS
  ];

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">{t('nav.results')}</div>
            <h1 className="page-hero-title">
              {t('nav.results')}
            </h1>
            <p className="page-hero-desc">
              Real results from real students. See why MathSpark is Sri Lanka&apos;s most result-oriented online Maths platform.
            </p>
          </div>
        </section>

        {/* Results Table */}
        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: 48 }}>
              <div className="section-tag">Year-by-Year Breakdown</div>
              <h2 className="section-title">Exam <span className="theme-gradient">Performance</span></h2>
            </div>

            <div className="results-table-wrap">
              <table className="results-table">
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Exam</th>
                    <th>Students</th>
                    <th>A Passes</th>
                    <th>A Pass Rate</th>
                    <th>Top Scorer</th>
                    <th>Medium</th>
                  </tr>
                </thead>
                <tbody>
                  {STATIC_RESULTS.map((r, i) => (
                    <tr key={i}>
                      <td><strong style={{ color: 'var(--primary-light)' }}>{r.year}</strong></td>
                      <td>{r.grade}</td>
                      <td>{r.total.toLocaleString()}</td>
                      <td><strong style={{ color: '#00C896' }}>{r.aPass.toLocaleString()}</strong></td>
                      <td>
                        <div className="result-bar-wrap">
                          <div className="result-bar" style={{ width: r.percentage }} />
                          <span>{r.percentage}</span>
                        </div>
                      </td>
                      <td style={{ fontSize: '0.85rem' }}>🏆 {r.topScorer}</td>
                      <td><span className="badge badge-primary">{r.medium}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Top Scorers */}
        <section className="section" style={{ background: 'var(--dark-2)', borderTop: '1px solid var(--border)' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: 48 }}>
              <div className="section-tag">Hall of Fame</div>
              <h2 className="section-title">Top <span className="theme-gradient">Scorers</span></h2>
              <p className="section-subtitle" style={{ margin: '0 auto' }}>Students who achieved outstanding results with MathSpark.</p>
            </div>

            <div className="toppers-grid">
              {allToppers.map((t, i) => (
                <div key={i} className="topper-card" style={{ '--topper-color': t.color }}>
                  <div className="topper-avatar" style={{ background: t.color }}>
                    {t.name.charAt(0)}
                  </div>
                  <div className="topper-score">{t.score}</div>
                  <h4 className="topper-name">{t.name}</h4>
                  <div className="topper-grade">{t.grade}</div>
                  <div className="topper-school">{t.school}</div>
                  <span className="badge badge-primary" style={{ marginTop: 12 }}>{t.medium}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .results-table-wrap {
          overflow-x: auto;
        }
        .results-table {
          width: 100%;
          border-collapse: collapse;
          text-align: left;
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
        }
        .results-table th, .results-table td {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
        }
        .results-table th {
          color: var(--text-muted);
          font-weight: 600;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .result-bar-wrap {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .result-bar {
          height: 8px;
          background: var(--primary-gradient);
          border-radius: 4px;
        }
        .toppers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .topper-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 28px 24px;
          text-align: center;
          transition: var(--transition);
        }
        .topper-card:hover {
          transform: translateY(-4px);
          border-color: var(--topper-color);
          box-shadow: 0 12px 30px rgba(0,0,0,0.3);
        }
        .topper-avatar {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          color: white;
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }
        .topper-score {
          font-family: var(--font-mono);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--topper-color);
          margin-bottom: 8px;
        }
        .topper-name {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }
        .topper-grade {
          font-size: 0.85rem;
          color: var(--primary-light);
          margin-bottom: 4px;
        }
        .topper-school {
          font-size: 0.78rem;
          color: var(--text-muted);
        }
      `}</style>
    </>
  );
}
