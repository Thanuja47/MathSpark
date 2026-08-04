'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import LiveScheduleWidget, { SCHEDULE, DAYS } from '@/components/tracking/LiveScheduleWidget';
import AccessLockedModal from '@/components/AccessLockedModal';

const COLORS = ['#0052FF', '#7B2FFF', '#FF6B00', '#00C896', '#FF3D9A'];

export default function TimetablePage() {
  const [user, setUser] = useState(null);
  const [lockedGrade, setLockedGrade] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => { if (data.user) setUser(data.user); })
      .catch(() => {});
  }, []);

  const handleJoinZoom = (e, grade, zoomUrl) => {
    e.preventDefault();
    if (!user) {
      alert('Please log in to join live sessions.');
      return;
    }
    const approved = user.approvedGrades || [];
    if (!approved.includes(Number(grade))) {
      setLockedGrade(grade);
      return;
    }
    window.open(zoomUrl, '_blank');
  };

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">📅 Weekly Schedule</div>
            <h1 className="page-hero-title">Live Class <span className="theme-gradient">Timetable</span></h1>
            <p className="page-hero-desc">Check today's live sessions and join with one click. New classes every week.</p>
          </div>
        </section>

        {/* Countdown Banner */}
        <section style={{ background: 'var(--dark-2)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
          <div className="container">
            <LiveScheduleWidget />
          </div>
        </section>

        {/* Full Week Grid */}
        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="text-center" style={{ marginBottom: 48 }}>
              <div className="section-tag">Full Weekly Schedule</div>
              <h2 className="section-title">All <span className="theme-gradient">Classes This Week</span></h2>
            </div>

            <div className="timetable-grid">
              {DAYS.map((day, dayIdx) => {
                const dayClasses = SCHEDULE.filter(c => c.day === dayIdx);
                const isToday = new Date().getDay() === dayIdx;
                return (
                  <div key={dayIdx} className={`timetable-day ${isToday ? 'today' : ''}`}>
                    <div className="timetable-day-header">
                      <span className="timetable-day-name">{day}</span>
                      {isToday && <span className="badge badge-green">Today</span>}
                    </div>
                    {dayClasses.length === 0 ? (
                      <div className="timetable-empty">No classes</div>
                    ) : (
                      dayClasses.map((cls, i) => (
                        <div key={i} className="timetable-class" style={{ borderLeftColor: cls.color }}>
                          <div className="timetable-time">{cls.time}</div>
                          <div className="timetable-title">{cls.title}</div>
                          <div className="timetable-meta">
                            <span>⏱ {cls.duration}m</span>
                            <span>Grade {cls.grade}</span>
                            <span>{cls.medium}</span>
                          </div>
                          <button
                            onClick={(e) => handleJoinZoom(e, cls.grade, cls.zoom)}
                            className="btn btn-ghost btn-sm"
                            style={{ marginTop: 10, width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
                          >
                            📹 Join Zoom
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      {lockedGrade && (
        <AccessLockedModal grade={lockedGrade} onClose={() => setLockedGrade(null)} />
      )}

      <style jsx>{`
        .timetable-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
        }
        .timetable-day {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          overflow: hidden;
        }
        .timetable-day.today {
          border-color: rgba(0,82,255,0.4);
          box-shadow: 0 0 0 1px rgba(0,82,255,0.2), 0 0 30px rgba(0,82,255,0.1);
        }
        .timetable-day-header {
          padding: 12px 14px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid var(--border);
          display: flex; align-items: center; justify-content: space-between; gap: 6px;
          flex-wrap: wrap;
        }
        .timetable-day-name { font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; }
        .timetable-class {
          padding: 12px 14px;
          border-left: 3px solid;
          margin: 10px 10px 0;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.02);
        }
        .timetable-time { font-size: 0.78rem; font-weight: 700; color: var(--primary-light); margin-bottom: 4px; }
        .timetable-title { font-size: 0.8rem; font-weight: 600; line-height: 1.3; margin-bottom: 6px; }
        .timetable-meta { display: flex; gap: 6px; font-size: 0.7rem; color: var(--text-muted); flex-wrap: wrap; margin-bottom: 2px; }
        .timetable-meta span::after { content: '•'; margin-left: 6px; }
        .timetable-meta span:last-child::after { content: ''; margin: 0; }
        .timetable-empty { padding: 20px 14px; font-size: 0.78rem; color: var(--text-muted); text-align: center; }

        @media (max-width: 1100px) { .timetable-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 700px) { .timetable-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .timetable-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
