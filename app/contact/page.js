'use client';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
import { SITE } from '@/lib/data';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a> <span>/</span> <span>Contact</span>
            </div>
            <div className="section-tag page-hero-tag">Get In Touch</div>
            <h1 className="page-hero-title">
              We&apos;re Here to <span className="theme-gradient">Help</span>
            </h1>
            <p className="page-hero-desc">
              Have questions about class schedules, payments, or enrollment? Contact our support team.
            </p>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="contact-wrapper">
              {/* Left Details */}
              <div className="contact-details">
                <div className="contact-info-item">
                  <div className="contact-icon">📞</div>
                  <div>
                    <div className="contact-info-label">Call Us</div>
                    <div className="contact-info-value">
                      <a href={`tel:${SITE.phone}`}>{SITE.phone}</a>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">💬</div>
                  <div>
                    <div className="contact-info-label">WhatsApp Support</div>
                    <div className="contact-info-value">
                      <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer">
                        +94 112 902 405
                      </a>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">✉️</div>
                  <div>
                    <div className="contact-info-label">Email Us</div>
                    <div className="contact-info-value">
                      <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                    </div>
                  </div>
                </div>

                <div className="contact-info-item">
                  <div className="contact-icon">📍</div>
                  <div>
                    <div className="contact-info-label">Location</div>
                    <div className="contact-info-value">Colombo, Sri Lanka</div>
                  </div>
                </div>
              </div>

              {/* Right Form */}
              <div className="contact-form-box">
                {submitted ? (
                  <div className="text-center" style={{ padding: '40px 0' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 16 }}>🎉</div>
                    <h3>Message Sent Successfully!</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                      Thank you for contacting MatSpark. Our team will respond within 24 hours.
                    </p>
                    <button className="btn btn-outline" style={{ marginTop: 24 }} onClick={() => setSubmitted(false)}>
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">Your Name</label>
                      <input type="text" className="form-input" placeholder="Ex: Kavindi Perera" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">WhatsApp Number</label>
                      <input type="number" className="form-input" placeholder="Ex: 0712345678" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Student Grade</label>
                      <select className="form-input">
                        <option value="6">Grade 06</option>
                        <option value="7">Grade 07</option>
                        <option value="8">Grade 08</option>
                        <option value="9">Grade 09</option>
                        <option value="10">Grade 10</option>
                        <option value="11">Grade 11</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label className="form-label">Message</label>
                      <textarea className="form-input" rows="4" placeholder="How can we help you?" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      Send Message 🚀
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .contact-form-box {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px;
        }
        @media (max-width: 600px) {
          .contact-form-box { padding: 24px; }
        }
      `}</style>
    </>
  );
}
