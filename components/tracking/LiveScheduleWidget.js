'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Video, Globe, FileCheck, ArrowRight } from 'lucide-react';

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

export function parseTime(timeStr) {
  if (!timeStr) return { h: 18, m: 0 };
  const str = timeStr.trim();
  const isPM = /pm/i.test(str);
  const isAM = /am/i.test(str);
  const clean = str.replace(/(am|pm)/i, '').trim();
  const parts = clean.split(':').map(Number);
  let h = parts[0] || 0;
  const m = parts[1] || 0;
  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;
  return { h, m };
}

export function getCountdown(dayIndex, timeStr, durationMinutes = 90) {
  const now = new Date();
  const { h, m } = parseTime(timeStr);

  const target = new Date();
  target.setHours(h, m, 0, 0);

  let daysUntil = ((dayIndex - now.getDay()) + 7) % 7;
  
  // If it's today, check if class is live or finished
  if (daysUntil === 0) {
    const endTarget = new Date(target.getTime() + durationMinutes * 60000);
    if (now > endTarget) {
      daysUntil = 7; // Completed today, next occurrence is next week
    }
  }

  target.setDate(target.getDate() + daysUntil);

  const diff = target - now;
  const endTarget = new Date(target.getTime() + durationMinutes * 60000);
  const isLive = now >= target && now <= endTarget;

  if (isLive) {
    return { diff: 0, dh: 0, dm: 0, ds: 0, isToday: true, isLive: true, isPast: false };
  }

  const isPast = diff < 0;
  const dh = Math.max(0, Math.floor(diff / 3600000));
  const dm = Math.max(0, Math.floor((diff % 3600000) / 60000));
  const ds = Math.max(0, Math.floor((diff % 60000) / 1000));

  return { diff, dh, dm, ds, isToday: daysUntil === 0, isLive: false, isPast };
}

export default function LiveScheduleWidget({ customSchedule = null, onJoinZoom = null }) {
  const [now, setNow] = useState(new Date());
  const [dbSchedule, setDbSchedule] = useState([]);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!customSchedule) {
      fetch('/api/timetable')
        .then(r => r.json())
        .then(data => {
          if (Array.isArray(data) && data.length > 0) {
            const mapped = data.map((item, idx) => {
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
            });
            setDbSchedule(mapped);
          }
        })
        .catch(() => {});
    }
  }, [customSchedule]);

  const activeSchedule = customSchedule || (dbSchedule.length > 0 ? dbSchedule : SCHEDULE);
  const todayDay = now.getDay();
  const todayClasses = activeSchedule.filter(c => c.day === todayDay);
  
  const nextClass = activeSchedule
    .map(c => ({ ...c, ...getCountdown(c.day, c.time, c.duration || 90) }))
    .sort((a, b) => (a.isLive ? -1 : b.isLive ? 1 : a.diff - b.diff))[0];

  const handleJoin = (e, cls) => {
    if (onJoinZoom) {
      onJoinZoom(e, cls.grade, cls.zoom);
    } else {
      if (cls.zoom && cls.zoom !== '#') {
        window.open(cls.zoom, '_blank');
      } else {
        alert('Zoom link not set for this class.');
      }
    }
  };

  return (
    <div className="live-schedule-widget">
      {/* Next Class Countdown Banner */}
      {nextClass && (
        <div className="next-class-banner" style={{ borderColor: nextClass.color }}>
          <div className="next-class-left">
            <div className="live-badge">
              <span className="live-dot" />
              {nextClass.isLive ? 'LIVE NOW' : nextClass.isToday ? 'TODAY' : DAYS[nextClass.day]}
            </div>
            <div className="next-class-title">{nextClass.title}</div>
            <div className="next-class-meta" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Clock size={14} />
                <span>{nextClass.time} ({nextClass.duration || 90} min)</span>
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                <Globe size={14} />
                <span>{nextClass.medium}</span>
              </span>
            </div>
          </div>
          <div className="next-class-right">
            {nextClass.isLive ? (
              <div className="live-now-text" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00C896', marginBottom: 6 }}>
                🔴 CLASS IS LIVE!
              </div>
            ) : (
              <CountdownDisplay countdown={nextClass} />
            )}
            <button
              onClick={(e) => handleJoin(e, nextClass)}
              className="btn btn-primary btn-sm"
              style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <Video size={16} />
              <span>Join Zoom Class</span>
            </button>
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
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                    <Clock size={12} />
                    <span>{c.time} &nbsp;•&nbsp; Grade {c.grade}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => handleJoin(e, c)}
                  className="btn btn-ghost btn-sm"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}
                >
                  <span>Join</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link href="/exams" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 20, fontSize: '0.85rem', color: 'var(--primary-light)', fontWeight: 500 }}>
        <FileCheck size={16} />
        <span>Practice MCQ Tests</span>
        <ArrowRight size={14} />
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
        .today-class-row {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          background: var(--dark-card); border: 1px solid var(--border); border-left: 3px solid;
          border-radius: var(--radius-md); padding: 12px 16px;
        }
      `}</style>
    </div>
  );
}

export function CountdownDisplay({ countdown, scale = 1 }) {
  if (!countdown) return null;
  return (
    <div className="countdown-display" style={{ transform: scale !== 1 ? `scale(${scale})` : 'none', transformOrigin: 'center center' }}>
      <div className="countdown-unit">
        <div className="countdown-num">{String(countdown.dh).padStart(2, '0')}</div>
        <div className="countdown-lbl">HRS</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-unit">
        <div className="countdown-num">{String(countdown.dm).padStart(2, '0')}</div>
        <div className="countdown-lbl">MIN</div>
      </div>
      <div className="countdown-sep">:</div>
      <div className="countdown-unit">
        <div className="countdown-num">{String(countdown.ds).padStart(2, '0')}</div>
        <div className="countdown-lbl">SEC</div>
      </div>
      <style jsx>{`
        .countdown-display { display: flex; align-items: center; justify-content: center; gap: 6px; }
        .countdown-unit { text-align: center; }
        .countdown-num {
          font-family: var(--font-heading); font-size: 1.8rem; font-weight: 900;
          background: var(--gradient-blue);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
        }
        .countdown-lbl { font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em; color: var(--text-muted); text-transform: uppercase; }
        .countdown-sep { font-size: 1.5rem; font-weight: 900; color: var(--text-muted); margin-bottom: 10px; }
      `}</style>
    </div>
  );
}

export { SCHEDULE, DAYS };
