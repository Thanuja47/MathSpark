'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';

// Sample tute packs available to student
const TUTES = [
  { id: 1, grade: 10, title: 'Grade 10 — Month 01 Tute', subject: 'Algebra & Equations', pages: 24, date: '2025-01-10', url: '/sample-tute.pdf' },
  { id: 2, grade: 10, title: 'Grade 10 — Month 02 Tute', subject: 'Fractions & Percentages', pages: 28, date: '2025-02-10', url: '/sample-tute.pdf' },
  { id: 3, grade: 11, title: 'Grade 11 — O/L Paper Pack 01', subject: 'Full Syllabus Revision', pages: 48, date: '2025-03-05', url: '/sample-tute.pdf' },
  { id: 4, grade: 10, title: 'Grade 10 — Month 03 Tute', subject: 'Geometry & Angles', pages: 32, date: '2025-03-15', url: '/sample-tute.pdf' },
];

export default function TuteViewerPage() {
  const [selectedTute, setSelectedTute] = useState(null);
  const [studentName] = useState('Kavindi Perera');
  const [studentPhone] = useState('0712345678');

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '85vh' }}>
        {!selectedTute ? (
          <>
            <section className="page-hero">
              <div className="container">
                <div className="section-tag page-hero-tag">📄 My Tutes</div>
                <h1 className="page-hero-title">Tute <span className="theme-gradient">Library</span></h1>
                <p className="page-hero-desc">View and download your monthly tute packs. Protected with your personal watermark.</p>
              </div>
            </section>
            <section className="section">
              <div className="container">
                <div className="grid grid-2">
                  {TUTES.map(tute => (
                    <div key={tute.id} className="tute-card">
                      <div className="tute-card-icon">📄</div>
                      <div className="tute-card-body">
                        <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                          <span className="badge badge-primary">Grade {tute.grade}</span>
                          <span className="badge badge-purple">{tute.pages} pages</span>
                        </div>
                        <h4 style={{ marginBottom: 6 }}>{tute.title}</h4>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 4 }}>{tute.subject}</p>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Published: {tute.date}</p>
                      </div>
                      <button
                        className="btn btn-primary btn-sm"
                        onClick={() => setSelectedTute(tute)}
                        style={{ marginTop: 16, width: '100%' }}
                      >
                        📖 View PDF
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="pdf-viewer-wrap">
            {/* Toolbar */}
            <div className="pdf-toolbar">
              <button className="btn btn-ghost btn-sm" onClick={() => setSelectedTute(null)}>
                ← Back to Tutes
              </button>
              <div className="pdf-toolbar-title">{selectedTute.title}</div>
              <a href={selectedTute.url} download className="btn btn-primary btn-sm">
                ⬇ Download
              </a>
            </div>

            {/* Watermarked PDF Viewer */}
            <div className="pdf-container">
              {/* Diagonal Watermark Overlay Grid */}
              <div className="watermark-overlay" aria-hidden="true">
                {Array.from({ length: 30 }).map((_, i) => (
                  <div key={i} className="watermark-text">
                    {studentName} · {studentPhone} · MathSpark
                  </div>
                ))}
              </div>

              {/* Embed PDF */}
              <iframe
                src={`${selectedTute.url}#toolbar=0&navpanes=0&scrollbar=1`}
                className="pdf-iframe"
                title={selectedTute.title}
              />

              {/* Anti-screenshot note */}
              <div className="pdf-protection-notice">
                🔒 This document is watermarked with your name & WhatsApp number: <strong>{studentName} · {studentPhone}</strong>. Sharing is prohibited.
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .tute-card {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          flex-direction: column;
          transition: var(--transition);
        }
        .tute-card:hover { transform: translateY(-4px); border-color: rgba(0,82,255,0.3); }
        .tute-card-icon { font-size: 2.5rem; margin-bottom: 16px; }
        .tute-card-body { flex: 1; }

        /* PDF Viewer */
        .pdf-viewer-wrap { display: flex; flex-direction: column; height: 100vh; }
        .pdf-toolbar {
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 12px 24px;
          background: var(--dark-2);
          border-bottom: 1px solid var(--border);
          position: sticky; top: 0; z-index: 100;
          flex-wrap: wrap;
        }
        .pdf-toolbar-title { font-weight: 600; font-size: 0.9rem; }
        .pdf-container { flex: 1; position: relative; min-height: calc(100vh - 120px); }

        /* Watermark Grid */
        .watermark-overlay {
          position: absolute; inset: 0;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
          padding: 40px;
          pointer-events: none;
          z-index: 10;
          overflow: hidden;
        }
        .watermark-text {
          font-size: 0.75rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.08);
          transform: rotate(-35deg);
          white-space: nowrap;
          user-select: none;
          font-family: var(--font-heading);
          letter-spacing: 0.05em;
        }

        .pdf-iframe {
          width: 100%; height: 100%;
          min-height: calc(100vh - 120px);
          border: none;
          display: block;
          background: #fff;
        }
        .pdf-protection-notice {
          position: sticky; bottom: 0;
          padding: 10px 24px;
          background: rgba(0,0,0,0.85);
          border-top: 1px solid var(--border);
          font-size: 0.78rem;
          color: var(--text-muted);
          text-align: center;
          z-index: 20;
        }

        @media (max-width: 640px) {
          .grid-2 { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
