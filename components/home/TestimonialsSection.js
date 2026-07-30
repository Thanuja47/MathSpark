'use client';
import { TESTIMONIALS } from '@/lib/data';

export default function TestimonialsSection() {
  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="text-center" style={{ marginBottom: 44 }}>
          <div className="section-tag">Student Success Stories</div>
          <h2 className="section-title">
            What Our <span className="theme-gradient">Students</span> Say
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Proven results from students across Sri Lanka who transformed their Maths grades with MathSpark.
          </p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="testimonial-card">
              <div className="testimonial-stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="testimonial-text">&ldquo;{t.text}&rdquo;</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div className="testimonial-name">{t.name}</div>
                  <div className="testimonial-grade">{t.grade}</div>
                  <div className="testimonial-result">{t.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .testimonials-section {
          background: var(--ink);
        }
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }
        @media (max-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
