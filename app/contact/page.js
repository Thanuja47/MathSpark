'use client';
import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { SITE } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [grade, setGrade] = useState('6');
  const [message, setMessage] = useState('');
  const [waLink, setWaLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = `*New Contact Inquiry from MatSpark Website*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Grade:* Grade ${encodeURIComponent(grade)}%0A*Message:* ${encodeURIComponent(message)}`;
    const url = `https://wa.me/${SITE.whatsapp}?text=${text}`;
    setWaLink(url);
    setSubmitted(true);
    // Automatically open WhatsApp in new tab for instant response
    window.open(url, '_blank');
  };

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">{t('nav.home')}</a> <span>/</span> <span>{t('nav.contact')}</span>
            </div>
            <div className="section-tag page-hero-tag">{t('common.contactUs')}</div>
            <h1 className="page-hero-title">
              {t('common.contactUs')}
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
                    <div className="contact-info-label">{t('common.contactUs')}</div>
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
                    <div style={{ fontSize: '3rem', marginBottom: 16 }}>💬</div>
                    <h3>Opening WhatsApp to Send Message...</h3>
                    <p style={{ color: 'var(--text-muted)', marginTop: 8 }}>
                      If WhatsApp did not open automatically, click the button below to send your inquiry directly to Ishan Maduranga:
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'center', marginTop: 24 }}>
                      <a href={waLink} target="_blank" rel="noreferrer" className="btn btn-primary btn-lg" style={{ background: '#10B981', textDecoration: 'none' }}>
                        Chat directly on WhatsApp 💬
                      </a>
                      <button className="btn btn-outline" onClick={() => setSubmitted(false)}>
                        Send Another Message
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label className="form-label">{t('auth.nameLabel')}</label>
                      <input type="text" className="form-input" value={name} onChange={e => setName(e.target.value)} placeholder="Ex: Kavindi Perera" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('auth.phoneLabel')}</label>
                      <input type="tel" className="form-input" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Ex: 0712345678" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">{t('auth.gradeLabel')}</label>
                      <select className="form-input" value={grade} onChange={e => setGrade(e.target.value)}>
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
                      <textarea className="form-input" rows="4" value={message} onChange={e => setMessage(e.target.value)} placeholder="How can we help you?" required />
                    </div>
                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%' }}>
                      {t('common.contactUs')} 🚀
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
