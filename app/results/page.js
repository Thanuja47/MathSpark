'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import { SITE } from '@/lib/data';

const RESULTS = [
  { year: '2025', grade: 'O/L (Grade 11)', aPass: 3682, total: 3950, percentage: '93%', topScorer: 'Kavindi P. — 100/100', medium: 'Sinhala & English' },
  { year: '2025', grade: 'Grade 10 Term Exam', aPass: 1840, total: 2100, percentage: '87%', topScorer: 'Tharindu S. — 98/100', medium: 'Sinhala' },
  { year: '2024', grade: 'O/L (Grade 11)', aPass: 2910, total: 3200, percentage: '91%', topScorer: 'Sithmi F. — 99/100', medium: 'Sinhala & English' },
  { year: '2024', grade: 'Grade 10 Term Exam', aPass: 1540, total: 1820, percentage: '84%', topScorer: 'Dinesh B. — 97/100', medium: 'Sinhala' },
];

const TOPPERS = [
  { name: 'Kavindi Perera', grade: 'Grade 11 · O/L 2025', score: '100/100', school: 'Visakha Vidyalaya, Colombo', medium: 'Sinhala', color: '#0052FF' },
  { name: 'Tharindu Silva', grade: 'Grade 10 · Term 2025', score: '98/100', school: 'Mahinda College, Galle', medium: 'Sinhala', color: '#7B2FFF' },
  { name: 'Sithmi Fernando', grade: 'Grade 11 · O/L 2024', score: '99/100', school: "S. Thomas' Girls, Colombo", medium: 'English', color: '#FF6B00' },
  { name: 'Dinesh Bandara', grade: 'Grade 10 · Term 2024', score: '97/100', school: 'Ananda College, Colombo', medium: 'Sinhala', color: '#00C896' },
  { name: 'Nimal Siripala', grade: 'Grade 09 · Term 2025', score: '95/100', school: 'Dharmaraja College, Kandy', medium: 'Sinhala', color: '#FF3D9A' },
  { name: 'Oshadi Wickrama', grade: 'Grade 11 · O/L 2025', score: '99/100', school: 'Methodist College, Colombo', medium: 'English', color: '#0052FF' },
];

export default function ResultsPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">Proven Track Record</div>
            <h1 className="page-hero-title">
              Our Students&apos; <span className="theme-gradient">Results</span>
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
                  {RESULTS.map((r, i) => (
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
              {TOPPERS.map((t, i) => (
                <div key={i} className="topper-card" style={{ '--topper-color': t.color }}>
                  <div className="topper-avatar" style={{ background: t.color }}>
                    {t.name.charAt(0)}
                  </div>
                  <div className="topper-score">{t.score}</div>
                  <h4 className="topper-name">{t.name}</h4>
                  <div className="topper-grade">{t.grade}</div>
                  <div className="topper-school">{t.school}</div>
                  <span className="badge badge-primary" style={{ marginTop: 12 }}>{t.medium} Medium</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-sm" style={{ background: 'var(--dark)', borderTop: '1px solid var(--border)' }}>
          <div className="container text-center">
            <h2>Your Name Could Be <span className="theme-gradient">Next!</span></h2>
            <p className="text-secondary" style={{ marginTop: 12, maxWidth: 500, margin: '12px auto 32px' }}>
              Join MathSpark today and write your own success story in the next O/L exam.
            </p>
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-accent btn-xl">
                💬 Enroll via WhatsApp
              </a>
              <a href="/courses" className="btn btn-outline btn-xl">Browse Classes →</a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .results-table-wrap { overflow-x: auto; }
        .results-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.9rem;
        }
        .results-table th {
          padding: 14px 18px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          border-bottom: 1px solid var(--border);
          background: var(--dark-2);
          text-align: left;
        }
        .results-table td {
          padding: 16px 18px;
          border-bottom: 1px solid var(--border-light);
          vertical-align: middle;
        }
        .results-table tr:hover td { background: rgba(255,255,255,0.02); }
        .result-bar-wrap { display: flex; align-items: center; gap: 10px; }
        .result-bar {
          height: 6px;
          border-radius: 3px;
          background: var(--gradient-blue);
          min-width: 20px;
        }
        .toppers-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .topper-card {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          text-align: center;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        .topper-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 3px;
          background: var(--topper-color);
        }
        .topper-card:hover { transform: translateY(-6px); box-shadow: 0 24px 64px rgba(0,0,0,0.5); }
        .topper-avatar {
          width: 64px; height: 64px;
          border-radius: 50%;
          margin: 0 auto 16px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem; font-weight: 800; color: white;
          box-shadow: 0 8px 24px rgba(0,0,0,0.3);
        }
        .topper-score {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 900;
          background: var(--gradient-brand);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }
        .topper-name { font-size: 1.05rem; font-weight: 700; margin-bottom: 4px; }
        .topper-grade { font-size: 0.8rem; color: var(--primary-light); font-weight: 500; margin-bottom: 6px; }
        .topper-school { font-size: 0.78rem; color: var(--text-muted); }

        @media (max-width: 900px) { .toppers-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 580px) { .toppers-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
