'use client';
import { useState, useEffect } from 'react';
import { Video } from 'lucide-react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import LiveScheduleWidget, { SCHEDULE, DAYS, parseTime, getCountdown, getSriLankaNow, CountdownDisplay } from '@/components/tracking/LiveScheduleWidget';
import AccessLockedModal from '@/components/AccessLockedModal';
import { useLanguage } from '@/context/LanguageContext';

export default function TimetablePage() {
  const { t } = useLanguage();
  const [user, setUser] = useState(null);
  const [lockedGrade, setLockedGrade] = useState(null);
  const [timetableList, setTimetableList] = useState(null); // null = loading state

  // Ticker for live per-class countdowns using Sri Lanka timezone
  useEffect(() => {
    const timer = setInterval(() => setSlNow(getSriLankaNow()), 1000);
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
        setTimetableList(Array.isArray(data) ? data : []);
      })
      .catch(() => setTimetableList([]));
  }, []);

  const handleJoinZoom = (e, grade, zoomUrl, month) => {
    if (e && e.preventDefault) e.preventDefault();
    const targetGrade = Number(grade);

    if (!user) {
      window.location.href = '/login?returnUrl=' + encodeURIComponent('/timetable');
      return;
    }

    const userRole = user.role;
    if (userRole === 'admin') {
      // Admin always has access
    } else {
      // Check if student has access to THIS grade (or specific month if tagged)
      const userGrades = user.gradeAccess || [];
      const approvedGrades = (user.approvedGrades || []).map(Number);
      
      const hasAccess = approvedGrades.includes(targetGrade) || userGrades.some(g => {
        if (Number(g.gradeId) !== targetGrade) return false;
        // If grant has no specific month restriction OR class entry has no month tag => full access
        if (!g.month || !month) return true;
        // Exact month match
        return g.month === month;
      });

      if (!hasAccess) {
        setLockedGrade({ grade: targetGrade, month: month || null });
        return;
      }
    }

    if (!zoomUrl || zoomUrl === '#' || !zoomUrl.trim()) {
      alert('Zoom link not set for this class yet. Please contact the admin.');
      return;
    }

    // Extract actual URL if full Zoom invitation text block was pasted by Admin
    let rawText = zoomUrl.trim();
    let extractedUrl = rawText;
    const urlMatch = rawText.match(/https?:\/\/[^\s<">]+/i);
    if (urlMatch) {
      extractedUrl = urlMatch[0];
    } else if (!/^https?:\/\//i.test(extractedUrl)) {
      extractedUrl = 'https://' + extractedUrl;
    }

    window.open(extractedUrl, '_blank', 'noopener,noreferrer');
  };

  // Build combined schedule from DB or fallback SCHEDULE
  const activeSchedule = (Array.isArray(timetableList) && timetableList.length > 0)
    ? timetableList.map((item, idx) => {
        const dayIdx = DAYS.findIndex(d => d.toLowerCase() === (item.day || '').toLowerCase());
        return {
          id: item.id,
          day: dayIdx !== -1 ? dayIdx : 0,
          grade: item.grade,
          month: item.month || null,
          title: `${item.subject} (Grade ${item.grade})`,
          time: item.time,
          duration: 90,
          medium: 'Sinhala & English',
          zoom: item.liveLink || '#',
          color: ['#0052FF', '#7B2FFF', '#FF6B00', '#00C896', '#FF3D9A'][idx % 5]
        };
      })
    : (timetableList === null ? [] : SCHEDULE);

  // ── 1. Dynamic Day Reordering ──────────────────────────────────────────
  // Get today's day index in Sri Lanka time (0 = Sunday ... 6 = Saturday)
  const todayIndex = slNow.getDay();
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
                const dayClasses = activeSchedule
                  .filter(c => c.day === dayIdx)
                  .sort((a, b) => {
                    const { h: ha, m: ma } = parseTime(a.time);
                    const { h: hb, m: mb } = parseTime(b.time);
                    return (ha * 60 + ma) - (hb * 60 + mb);
                  });
                const isToday = colIdx === 0;

                return (
                  <div key={dayIdx} className={`timetable-day ${isToday ? 'today' : ''}`}>
                    {/* Day column header */}
                    <div className="timetable-day-header">
                      <span className="timetable-day-name">{dayName}</span>
                      {isToday && <span className="badge badge-green">Today</span>}
                    </div>

                    {dayClasses.length === 0 ? (
                      <div className="timetable-empty">No classes</div>
                    ) : (
                      dayClasses.map((cls, i) => {
                        const countdown = getCountdown(cls.day, cls.time, cls.duration || 90);
                        const isLive = countdown.isLive;

                        return (
                          /* ── Each class card matches top hero card layout exactly ── */
                          <div
                            key={cls.id || i}
                            className={`grid-class-card ${isLive ? 'grid-class-card--live' : ''}`}
                            style={{ borderColor: cls.color }}
                          >
                            {/* Badge row — same as top card's live-badge */}
                            <div className="grid-card-badge">
                              <span
                                className="grid-live-dot"
                                style={{ background: isLive ? '#00C896' : countdown.isEnded ? '#FF4D4D' : cls.color }}
                              />
                              <span
                                className="grid-card-badge-label"
                                style={{ color: isLive ? '#00C896' : countdown.isEnded ? '#FF4D4D' : cls.color }}
                              >
                                {isLive ? 'LIVE NOW' : countdown.isEnded ? 'ENDED' : isToday ? 'TODAY' : dayName}
                              </span>
                            </div>

                            {/* Title */}
                            <div className="grid-card-title">{cls.title}</div>

                            {/* Meta — time · grade */}
                            <div className="grid-card-meta">
                              <span>🕐 {cls.time}</span>
                              <span>Gr {cls.grade}</span>
                            </div>

                            {/* Countdown — identical component, centered */}
                            <div className="grid-card-countdown">
                              {isLive ? (
                                <div className="grid-live-text">🔴 CLASS IS LIVE!</div>
                              ) : countdown.isEnded ? (
                                <div className="grid-ended-text" style={{ fontSize: '0.85rem', fontWeight: 700, color: '#8E8E93' }}>
                                  ⏹️ Class Ended
                                </div>
                              ) : (
                                <CountdownDisplay countdown={countdown} scale={0.7} />
                              )}
                            </div>

                            {/* Join button */}
                            {!countdown.isEnded ? (
                              <button
                                onClick={(e) => handleJoinZoom(e, cls.grade, cls.zoom, cls.month)}
                                className={`btn ${isLive ? 'btn-primary' : 'btn-primary'} btn-sm grid-join-btn`}
                                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}
                              >
                                <Video size={14} />
                                <span>{isLive ? 'Join Live Class' : 'Join Zoom Class'}</span>
                              </button>
                            ) : (
                              <button
                                disabled
                                className="btn btn-ghost btn-sm grid-join-btn"
                                style={{ opacity: 0.5, cursor: 'not-allowed', fontSize: '0.75rem' }}
                              >
                                Session Completed
                              </button>
                            )}
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
        <AccessLockedModal
          grade={typeof lockedGrade === 'object' ? lockedGrade.grade : lockedGrade}
          month={typeof lockedGrade === 'object' ? lockedGrade.month : null}
          onClose={() => setLockedGrade(null)}
        />
      )}

      <style jsx>{`
        .timetable-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 12px;
        }

        /* ── Day column wrapper ── */
        .timetable-day {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .timetable-day.today .timetable-day-header {
          border-color: rgba(0,82,255,0.5);
        }
        .timetable-day-header {
          padding: 10px 12px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: space-between; gap: 6px;
          flex-wrap: wrap;
        }
        .timetable-day-name {
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.08em;
          color: var(--text-muted);
        }
        .timetable-empty {
          padding: 20px 12px; font-size: 0.75rem;
          color: var(--text-muted); text-align: center;
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
        }

        /* ── Each class card: same as top hero card ── */
        .grid-class-card {
          background: var(--dark-card);
          border: 1.5px solid;
          border-radius: var(--radius-lg);
          padding: 14px 14px 12px;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .grid-class-card--live {
          box-shadow: 0 0 0 1px rgba(0,200,150,0.3), 0 0 20px rgba(0,200,150,0.1);
        }

        /* Badge row */
        .grid-card-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .grid-live-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          animation: pulse-glow 1.2s infinite;
          flex-shrink: 0;
        }
        .grid-card-badge-label { line-height: 1; }

        /* Title */
        .grid-card-title {
          font-weight: 700;
          font-size: 0.82rem;
          line-height: 1.35;
          color: var(--paper);
          margin-bottom: 6px;
        }

        /* Meta */
        .grid-card-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 4px 8px;
          font-size: 0.68rem;
          color: var(--text-muted);
          margin-bottom: 10px;
        }
        .grid-card-meta span {
          display: inline-flex;
          align-items: center;
          gap: 3px;
        }

        /* Countdown area */
        .grid-card-countdown {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
          min-height: 44px;
        }
        .grid-live-text {
          font-size: 0.75rem;
          font-weight: 800;
          color: #00C896;
          letter-spacing: 0.04em;
          animation: pulse-glow 1.2s infinite;
          text-align: center;
        }

        /* Join button — same primary blue as top card button */
        .grid-join-btn {
          width: 100%;
          justify-content: center;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 8px 10px;
        }

        @media (max-width: 1100px) { .timetable-grid { grid-template-columns: repeat(4, 1fr); } }
        @media (max-width: 700px)  { .timetable-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 420px)  { .timetable-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
