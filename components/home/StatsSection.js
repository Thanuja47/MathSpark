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
    <span ref={ref} className="stat-value font-mono">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function StatsSection() {
  return (
    <section className="section-sm stats-section">
      <div className="container">
        <div className="stats-grid">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <div className="stat-card-inner">
                <CountUp target={stat.value} suffix={stat.suffix} />
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        .stats-section {
          background: var(--surface);
          border-top: 1px solid var(--rule);
          border-bottom: 1px solid var(--rule);
          position: relative;
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .stat-card {
          text-align: center;
          padding: 24px;
          border-radius: var(--radius-lg);
          background: var(--surface-2);
          border: 1px solid var(--rule-light);
          transition: var(--transition);
          position: relative;
          overflow: hidden;
        }
        .stat-card::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--cobalt);
          opacity: 0;
          transition: opacity 0.25s;
        }
        .stat-card:hover {
          border-color: var(--cobalt-ring);
          transform: translateY(-3px);
        }
        .stat-card:hover::after {
          opacity: 1;
        }
        @media (max-width: 991px) {
          .stats-grid { gap: 16px; }
          .stat-card { padding: 16px; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 16px; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr; gap: 12px; }
          .stat-card { padding: 20px 16px; }
        }
      `}</style>
    </section>
  );
}
