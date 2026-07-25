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
          gap: 32px;
          padding: 16px 0;
        }
        .stat-card {
          text-align: center;
          padding: 24px;
          border-radius: var(--radius-lg);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: var(--transition);
        }
        .stat-card:hover {
          background: rgba(255, 255, 255, 0.04);
          transform: translateY(-2px);
          border-color: rgba(0, 82, 255, 0.2);
        }
        @media (max-width: 991px) {
          .stats-grid { gap: 24px; }
          .stat-card { padding: 16px; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; gap: 16px; }
          .stat-card { padding: 20px 16px; }
        }
      `}</style>
    </section>
  );
}
