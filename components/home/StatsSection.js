'use client';
import { useState, useEffect, useRef } from 'react';
import { STATS } from '@/lib/data';

function CountUp({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3); // ease out cubic
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return (
    <span ref={ref} className="stat-value">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="section-sm" style={{ background: 'var(--dark-3)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <CountUp target={stat.value} suffix={stat.suffix} />
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 16px; }
        }
      `}</style>
    </section>
  );
}
