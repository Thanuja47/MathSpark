'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import LiveScheduleWidget, { SCHEDULE, DAYS, getCountdown } from '@/components/tracking/LiveScheduleWidget';
import AccessLockedModal from '@/components/AccessLockedModal';
import { useLanguage } from '@/context/LanguageContext';

export default function TimetablePage() {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [lockedGrade, setLockedGrade] = useState(null);
  const [timetableList, setTimetableList] = useState([]);
  const [now, setNow] = useState(new Date());

  // Ticker for live per-class countdowns
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch logged in user details
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => { if (data.user) setUser(data.user); })
      .catch(() => {});
  }, []);

  // Fetch admin-managed timetable entries from DB
  useEffect(() => {
    fetch('/api/timetable')
      .then(r => r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTimetableList(data);
        }
      })
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
    if (!zoomUrl || zoomUrl === '#') {
      alert('Zoom link not configured for this class yet.');
      return;
    }
    window.open(zoomUrl, '_blank');
  };

  // Build combined schedule from DB or fallback SCHEDULE
  const activeSchedule = timetableList.length > 0
    ? timetableList.map((item, idx) => {
        const dayIdx = DAYS.findIndex(d => d.toLowerCase() === (item.day || '').toLowerCase());
        return {
          id: item.id,
          day: dayIdx !== -1 ? dayIdx : 0,
          grade: item.grade,
          title: `${item.subject} (Grade ${item.grade})`,
          time: item.time,
          duration: 90,
          medium: 'Sinhala & English',
          zoom: item.liveLink || '#',
          color: ['#0052FF', '#7B2FFF', '#FF6B00', '#00C896', '#FF3D9A'][idx % 5]
        };
      })
    : SCHEDULE;

  // ── 1. Dynamic Day Reordering ──────────────────────────────────────────
  // Get today's day index (0 = Sunday ... 6 = Saturday)
  const todayIndex = now.getDay();
  // Reorder days starting from today and wrapping around
  const reorderedDayIndices = Array.from({ length: 7 }, (_, i) => (todayIndex + i) % 7);

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">📅 {t('nav.timetable')}</div>
            <h1 className="page-hero-title">{t('nav.timetable')}</h1>
            <p className="page-hero-desc">Check today's live sessions and join with one click. New classes every week.</p>
          </div>
        </section>

        {/* Top Highlight Countdown Banner */}
        <section style={{ background: 'var(--dark-2)', borderBottom: '1px solid var(--border)', padding: '40px 0' }}>
          <div className="container">
            <LiveScheduleWidget customSchedule={activeSchedule} onJoinZoom={handleJoinZoom} />
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
              {reorderedDayIndices.map((dayIdx, colIdx) => {
                const dayName = DAYS[dayIdx];
                const dayClasses = activeSchedule.filter(c => c.day === dayIdx);
                const isToday = colIdx === 0; // First column is always Today

                return (
                  <div key={dayIdx} className={`timetable-day ${isToday ? 'today' : ''}`}>
                    <div className="timetable-day-header">
                      <span className="timetable-day-name">{dayName}</span>
                      {isToday && <span className="badge badge-green">Today</span>}
                    </div>
                    {dayClasses.length === 0 ? (
                      <div className="timetable-empty">No classes</div>
                    ) : (
                      dayClasses.map((cls, i) => {
                        // ── 3. Live Countdown per Class ─────────────────
                        const countdown = getCountdown(cls.day, cls.time, cls.duration || 90);
                        const isLive = countdown.isLive;

                        return (
                          <div key={cls.id || i} className="timetable-class" style={{ borderLeftColor: cls.color }}>
                            <div className="timetable-time">{cls.time}</div>
                            <div className="timetable-title">{cls.title}</div>
                            <div className="timetable-meta">
                              <span>⏱ {cls.duration || 90}m</span>
                              <span>Grade {cls.grade}</span>
                            </div>

                            {/* Live per-class countdown block matching top card's stacked digit & label layout */}
                            <div className="card-countdown-box">
                              {isLive ? (
                                <div className="card-live-now">🔴 LIVE NOW</div>
                              ) : (
                                <div className="card-countdown-display">
                                  <div className="card-countdown-unit">
                                    <div className="card-countdown-num">{String(countdown.dh).padStart(2, '0')}</div>
                                    <div className="card-countdown-lbl">HRS</div>
                                  </div>
                                  <div className="card-countdown-sep">:</div>
                                  <div className="card-countdown-unit">
                                    <div className="card-countdown-num">{String(countdown.dm).padStart(2, '0')}</div>
                                    <div className="card-countdown-lbl">MIN</div>
                                  </div>
                                  <div className="card-countdown-sep">:</div>
                                  <div className="card-countdown-unit">
                                    <div className="card-countdown-num">{String(countdown.ds).padStart(2, '0')}</div>
                                    <div className="card-countdown-lbl">SEC</div>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* ── 2. Admin-Updatable Zoom Button ───────── */}
                            <button
                              onClick={(e) => handleJoinZoom(e, cls.grade, cls.zoom)}
                              className={`btn ${isLive ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                              style={{ width: '100%', justifyContent: 'center', fontSize: '0.78rem' }}
                            >
                              {isLive ? '🔴 Join Live Class' : 'Join Zoom'}
                            </button>
                          </div>
                        );
                      })
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
          display: flex;
          flex-direction: column;
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
          margin: 10px 10px 10px;
          border-radius: var(--radius-sm);
          background: rgba(255,255,255,0.02);
          display: flex;
          flex-direction: column;
        }
        .timetable-time { font-size: 0.78rem; font-weight: 700; color: var(--primary-light); margin-bottom: 4px; }
        .timetable-title { font-size: 0.8rem; font-weight: 600; line-height: 1.3; margin-bottom: 6px; }
        .timetable-meta { display: flex; gap: 6px; font-size: 0.7rem; color: var(--text-muted); flex-wrap: wrap; margin-bottom: 10px; }
        .timetable-meta span::after { content: '•'; margin-left: 6px; }
        .timetable-meta span:last-child::after { content: ''; margin: 0; }
        
        .card-countdown-box {
          background: rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-sm);
          padding: 8px 6px;
          margin-bottom: 10px;
          text-align: center;
        }
        .card-countdown-display {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
        }
        .card-countdown-unit {
          text-align: center;
          min-width: 26px;
        }
        .card-countdown-num {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 900;
          background: var(--gradient-blue);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }
        .card-countdown-lbl {
          font-size: 0.52rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          color: var(--text-muted);
          text-transform: uppercase;
          margin-top: 2px;
        }
        .card-countdown-sep {
          font-size: 1rem;
          font-weight: 900;
          color: var(--text-muted);
          margin-bottom: 8px;
        }
        .card-live-now {
          font-size: 0.78rem;
          font-weight: 800;
          color: #00C896;
          letter-spacing: 0.05em;
          animation: pulse-glow 1.2s infinite;
        }
        .timetable-empty { padding: 20px 14px; font-size: 0.78rem; color: var(--text-muted); text-align: center; }

        @media (max-width: 1100px) { .timetable-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 700px) { .timetable-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px) { .timetable-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
