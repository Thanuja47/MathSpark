'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SCHEDULE = [
  { day: 0, grade: 10, title: 'Grade 10 – Algebra & Equations', time: '18:00', duration: 90, medium: 'Sinhala', zoom: 'https://zoom.us/j/123456789', color: '#0052FF' },
  { day: 1, grade: 11, title: 'Grade 11 – Coordinate Geometry', time: '19:00', duration: 90, medium: 'Sinhala', zoom: 'https://zoom.us/j/987654321', color: '#7B2FFF' },
  { day: 2, grade: 9, title: 'Grade 9 – Statistics & Probability', time: '17:30', duration: 60, medium: 'Sinhala', zoom: 'https://zoom.us/j/456789123', color: '#FF6B00' },
  { day: 3, grade: 10, title: 'Grade 10 – Past Paper Discussion', time: '18:00', duration: 120, medium: 'English', zoom: 'https://zoom.us/j/321654987', color: '#0052FF' },
  { day: 4, grade: 11, title: 'Grade 11 – O/L Revision Class', time: '18:30', duration: 90, medium: 'Sinhala', zoom: 'https://zoom.us/j/654321789', color: '#7B2FFF' },
  { day: 5, grade: 8, title: 'Grade 8 – Fractions & Decimals', time: '10:00', duration: 60, medium: 'Sinhala', zoom: 'https://zoom.us/j/789123456', color: '#00C896' },
  { day: 6, grade: 9, title: 'Grade 9 – Mensuration & Volume', time: '15:00', duration: 90, medium: 'English', zoom: 'https://zoom.us/j/111222333', color: '#FF6B00' },
];

const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function getCountdown(dayIndex, timeStr) {
  const now = new Date();
  const [h, m] = timeStr.split(':').map(Number);
  const target = new Date();
  target.setHours(h, m, 0, 0);

  let daysUntil = ((dayIndex - now.getDay()) + 7) % 7;
  if (daysUntil === 0 && now >= target) daysUntil = 7;
  target.setDate(target.getDate() + daysUntil);

  const diff = target - now;
  const dh = Math.floor(diff / 3600000);
  const dm = Math.floor((diff % 3600000) / 60000);
  const ds = Math.floor((diff % 60000) / 1000);

  return { diff, dh, dm, ds, isToday: daysUntil === 0 };
}

export default function LiveScheduleWidget() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const todayDay = now.getDay();
  const todayClasses = SCHEDULE.filter(c => c.day === todayDay);
  const nextClass = SCHEDULE
    .map(c => ({ ...c, ...getCountdown(c.day, c.time) }))
    .sort((a, b) => a.diff - b.diff)[0];

  return (
    <div className="live-schedule-widget">
      {/* Next Class Countdown Banner */}
      {nextClass && (
        <div className="next-class-banner" style={{ borderColor: nextClass.color }}>
          <div className="next-class-left">
            <div className="live-badge">
              <span className="live-dot" />
              {nextClass.isToday ? 'TODAY' : DAYS[nextClass.day]}
            </div>
            <div className="next-class-title">{nextClass.title}</div>
            <div className="next-class-meta">
              🕐 {nextClass.time} &nbsp;|&nbsp; ⏱️ {nextClass.duration} min &nbsp;|&nbsp; 🌐 {nextClass.medium} Medium
            </div>
          </div>
          <div className="next-class-right">
            <div className="countdown-display">
              <div className="countdown-unit">
                <div className="countdown-num">{String(nextClass.dh).padStart(2, '0')}</div>
                <div className="countdown-lbl">HRS</div>
              </div>
              <div className="countdown-sep">:</div>
              <div className="countdown-unit">
                <div className="countdown-num">{String(nextClass.dm).padStart(2, '0')}</div>
                <div className="countdown-lbl">MIN</div>
              </div>
              <div className="countdown-sep">:</div>
              <div className="countdown-unit">
                <div className="countdown-num">{String(nextClass.ds).padStart(2, '0')}</div>
                <div className="countdown-lbl">SEC</div>
              </div>
            </div>
            <a href={nextClass.zoom} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm" style={{ marginTop: 14 }}>
              📹 Join Zoom Class
            </a>
          </div>
        </div>
      )}

      {/* Today's Classes */}
      {todayClasses.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 12 }}>
            Today's Classes
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {todayClasses.map((c, i) => (
              <div key={i} className="today-class-row" style={{ borderLeftColor: c.color }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.title}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>🕐 {c.time} &nbsp;•&nbsp; Grade {c.grade}</div>
                </div>
                <a href={c.zoom} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">Join →</a>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/exams" style={{ display: 'block', marginTop: 20, fontSize: '0.85rem', color: 'var(--primary-light)', textAlign: 'center', fontWeight: 500 }}>
        📝 Practice MCQ Tests →
      </Link>

      <style jsx>{`
        .live-schedule-widget { width: 100%; }
        .next-class-banner {
          background: var(--dark-card);
          border: 1.5px solid;
          border-radius: var(--radius-lg);
          padding: 24px;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 24px;
          flex-wrap: wrap;
        }
        .live-badge {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 0.72rem; font-weight: 700; letter-spacing: 0.1em;
          color: #00C896; text-transform: uppercase; margin-bottom: 10px;
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%; background: #00C896;
          animation: pulse-glow 1.2s infinite;
        }
        .next-class-title { font-weight: 700; font-size: 1rem; margin-bottom: 6px; }
        .next-class-meta { font-size: 0.8rem; color: var(--text-muted); }
        .next-class-right { text-align: center; }
        .countdown-display { display: flex; align-items: center; gap: 6px; }
        .countdown-unit { text-align: center; }
        .countdown-num {
          font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900;
          background: var(--gradient-blue);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .countdown-lbl { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; }
        .countdown-sep { font-size: 1.5rem; font-weight: 900; color: var(--text-muted); margin-bottom: 10px; }
        .today-class-row {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          background: var(--dark-card); border: 1px solid var(--border); border-left: 3px solid;
          border-radius: var(--radius-md); padding: 12px 16px;
        }
      `}</style>
    </div>
  );
}

export { SCHEDULE, DAYS };
