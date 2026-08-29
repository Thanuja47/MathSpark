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

// Helper: Get current time in Sri Lanka (Asia/Colombo, UTC+5:30)
export function getSriLankaNow() {
  const now = new Date();
  // Format current UTC time into Asia/Colombo parts
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Colombo',
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric',
    hour12: false
  });
  const parts = formatter.formatToParts(now);
  const getPart = name => Number(parts.find(p => p.type === name).value);
  
  // Reconstruct Date object representing SL local wall-clock time in local timestamp context
  const year = getPart('year');
  const month = getPart('month') - 1;
  const day = getPart('day');
  let hour = getPart('hour');
  if (hour === 24) hour = 0;
  const minute = getPart('minute');
  const second = getPart('second');

  const slDate = new Date();
  slDate.setFullYear(year, month, day);
  slDate.setHours(hour, minute, second, 0);
  return slDate;
}

export function parseTime(timeStr) {
  if (!timeStr) return { h: 18, m: 0, duration: 90 };
  const str = timeStr.trim().toLowerCase();
  
  // Extract duration if in range format like "7.00 pm - 10.00pm" or "8:00 AM - 11:00 AM"
  let durationMinutes = 90;
  let startPart = str;

  if (str.includes('-')) {
    const rangeParts = str.split('-');
    startPart = rangeParts[0].trim();
    const endPart = rangeParts[1].trim();

    const startH = parseTimeSingle(startPart);
    const endH = parseTimeSingle(endPart);
    const diffMins = (endH.h * 60 + endH.m) - (startH.h * 60 + startH.m);
    if (diffMins > 0) durationMinutes = diffMins;
  }

  const { h, m } = parseTimeSingle(startPart);
  return { h, m, duration: durationMinutes };
}

function parseTimeSingle(timeStr) {
  let str = timeStr.trim().toLowerCase();
  const isPM = str.includes('pm');
  const isAM = str.includes('am');
  str = str.replace(/(am|pm)/g, '').trim();
  // Handle dots like 7.00 or colons like 7:00
  const parts = str.split(/[:\.]/).map(Number);
  let h = parts[0] || 0;
  const m = parts[1] || 0;
  if (isPM && h < 12) h += 12;
  if (isAM && h === 12) h = 0;
  return { h, m };
}

export function getCountdown(dayIndex, timeStr, customDuration = null) {
  const slNow = getSriLankaNow();
  const parsed = parseTime(timeStr);
  const h = parsed.h;
  const m = parsed.m;
  const durationMinutes = customDuration || parsed.duration || 90;

  const target = new Date(slNow.getTime());
  target.setHours(h, m, 0, 0);

  const daysUntilRaw = ((dayIndex - slNow.getDay()) + 7) % 7;
  let daysUntil = daysUntilRaw;

  const endTarget = new Date(target.getTime() + durationMinutes * 60000);
  const isEndedToday = daysUntilRaw === 0 && slNow > endTarget;

  // If the class day matches Sri Lanka's today
  if (daysUntil === 0) {
    if (slNow > endTarget) {
      daysUntil = 7;
    }
  }

  target.setDate(target.getDate() + daysUntil);

  const targetMs = target.getTime();
  const nowMs = slNow.getTime();
  const diff = targetMs - nowMs;
  const endTargetMs = targetMs + durationMinutes * 60000;
  const isLive = nowMs >= targetMs && nowMs <= endTargetMs;

  if (isLive) {
    return { targetTime: targetMs, diff: 0, dh: 0, dm: 0, ds: 0, isToday: true, isLive: true, isEnded: false, isPast: false };
  }

  if (isEndedToday) {
    return { targetTime: targetMs, diff: 0, dh: 0, dm: 0, ds: 0, isToday: true, isLive: false, isEnded: true, isPast: true };
  }

  const isPast = diff < 0;
  const dh = Math.max(0, Math.floor(diff / (1000 * 60 * 60)));
  const dm = Math.max(0, Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)));
  const ds = Math.max(0, Math.floor((diff % (1000 * 60)) / 1000));

  return { targetTime: targetMs, diff, dh, dm, ds, isToday: daysUntil === 0, isLive: false, isEnded: false, isPast };
}

export default function LiveScheduleWidget({ customSchedule = null, onJoinZoom = null }) {
  const [slNow, setSlNow] = useState(getSriLankaNow());
  const [dbSchedule, setDbSchedule] = useState([]);

  useEffect(() => {
    const t = setInterval(() => setSlNow(getSriLankaNow()), 1000);
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
  const todayDay = slNow.getDay();

  // Calculate countdowns for ALL active schedule items using SL time
  const allWithCountdown = activeSchedule.map(c => ({ ...c, ...getCountdown(c.day, c.time, c.duration) }));

  // Get ALL today's classes, sorted chronologically by start time
  const todayClasses = allWithCountdown
    .filter(c => c.day === todayDay)
    .sort((a, b) => {
      const { h: ha, m: ma } = parseTime(a.time);
      const { h: hb, m: mb } = parseTime(b.time);
      return (ha * 60 + ma) - (hb * 60 + mb);
    });

  // If no classes today, show the next upcoming class across the week
  const nextClassesToShow = todayClasses.length > 0
    ? todayClasses
    : allWithCountdown
        .sort((a, b) => {
          if (a.isLive) return -1;
          if (b.isLive) return 1;
          return a.targetTime - b.targetTime;
        })
        .slice(0, 1);

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
      {/* Show ALL Today's Classes in the Hero Section Stack */}
      <div className="hero-classes-stack" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {nextClassesToShow.map((item, idx) => (
          <div
            key={item.id || idx}
            className={`next-class-banner ${item.isLive ? 'next-class-banner--live' : ''}`}
            style={{
              borderColor: item.isLive ? '#00C896' : item.isEnded ? 'rgba(255,255,255,0.1)' : item.color,
              opacity: item.isEnded ? 0.75 : 1
            }}
          >
            <div className="next-class-left">
              <div
                className="live-badge"
                style={{ color: item.isLive ? '#00C896' : item.isEnded ? '#FF4D4D' : item.day === todayDay ? '#00C896' : item.color }}
              >
                <span
                  className="live-dot"
                  style={{ background: item.isLive ? '#00C896' : item.isEnded ? '#FF4D4D' : item.day === todayDay ? '#00C896' : item.color }}
                />
                {item.isLive ? 'LIVE NOW' : item.isEnded ? 'ENDED TODAY' : item.day === todayDay ? 'TODAY' : DAYS[item.day]}
              </div>
              <div className="next-class-title">{item.title}</div>
              <div className="next-class-meta" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Clock size={14} />
                  <span>{item.time} ({item.duration} min)</span>
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Globe size={14} />
                  <span>{item.medium}</span>
                </span>
              </div>
            </div>

            <div className="next-class-right">
              {item.isLive ? (
                <div className="live-now-text" style={{ fontSize: '1.4rem', fontWeight: 900, color: '#00C896', marginBottom: 6 }}>
                  🔴 CLASS IS LIVE!
                </div>
              ) : item.isEnded ? (
                <div className="class-ended-text" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#8E8E93', marginBottom: 6, letterSpacing: '0.05em' }}>
                  ⏹️ Class Ended
                </div>
              ) : (
                <CountdownDisplay countdown={item} />
              )}
              
              {!item.isEnded ? (
                <button
                  onClick={(e) => handleJoin(e, item)}
                  className={`btn ${item.isLive ? 'btn-primary' : 'btn-primary'} btn-sm`}
                  style={{ marginTop: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  <Video size={16} />
                  <span>{item.isLive ? '🔴 Join Live Class' : '📹 Join Zoom Class'}</span>
                </button>
              ) : (
                <button
                  disabled
                  className="btn btn-ghost btn-sm"
                  style={{ marginTop: 14, opacity: 0.5, cursor: 'not-allowed', fontSize: '0.8rem' }}
                >
                  Session Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Practice MCQ Tests Link */}
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
          text-transform: uppercase; margin-bottom: 10px;
          /* color set inline per class */
        }
        .live-dot {
          width: 8px; height: 8px; border-radius: 50%;
          animation: pulse-glow 1.2s infinite;
          /* background set inline per class */
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
