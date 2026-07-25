'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import { INSTRUCTORS } from '@/lib/data';

export default function InstructorsPage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a> <span>/</span> <span>Instructors</span>
            </div>
            <div className="section-tag page-hero-tag">Expert Educators</div>
            <h1 className="page-hero-title">
              Meet Our <span className="theme-gradient">Teachers</span>
            </h1>
            <p className="page-hero-desc">
              Learn from Sri Lanka&apos;s most experienced and engaging Mathematics educators.
            </p>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="instructors-grid">
              {INSTRUCTORS.map((ins) => (
                <div key={ins.id} className="instructor-card">
                  <div className="instructor-avatar">👨‍🏫</div>
                  <h3 className="instructor-name">{ins.name}</h3>
                  <div className="instructor-title">{ins.title}</div>
                  <div className="instructor-stats">
                    <div>
                      <div className="instructor-stat-val">{ins.experience}</div>
                      <div className="instructor-stat-lbl">Experience</div>
                    </div>
                    <div>
                      <div className="instructor-stat-val">{ins.students}</div>
                      <div className="instructor-stat-lbl">Students</div>
                    </div>
                    <div>
                      <div className="instructor-stat-val">⭐ {ins.rating}</div>
                      <div className="instructor-stat-lbl">Rating</div>
                    </div>
                  </div>
                  <p className="text-secondary text-sm" style={{ lineHeight: 1.6 }}>{ins.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .instructors-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px) {
          .instructors-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
