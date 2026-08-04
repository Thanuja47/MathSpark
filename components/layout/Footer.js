'use client';
import Link from 'next/link';
import { SITE, GRADES, NAV_LINKS } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-content">
              <div className="section-tag">{t('sections.whyMathSpark')}</div>
              <h2>{t('footer.ctaTitle1')}<br /><span className="theme-gradient">{t('footer.ctaTitle2')}</span></h2>
              <p>{t('hero.description')}</p>
            </div>
            <div className="footer-cta-actions">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-accent btn-lg">
                <span>💬</span> {t('common.whatsAppInquiry')}
              </a>
              <a href={`tel:${SITE.phone}`} className="btn btn-outline btn-lg">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                {t('common.contactUs')}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Main */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-brand">
              <Link href="/" className="footer-logo">
                <svg className="footer-logo-svg" width="38" height="38" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="logo-grad-footer" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#6366f1"/>
                      <stop offset="100%" stopColor="#8b5cf6"/>
                    </linearGradient>
                    <filter id="logo-glow-footer" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="1.5" result="blur"/>
                      <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
                    </filter>
                  </defs>
                  <rect width="40" height="40" rx="10" fill="#13141a"/>
                  <rect x="0.5" y="0.5" width="39" height="39" rx="9.5" stroke="url(#logo-grad-footer)" strokeOpacity="0.4"/>
                  <path d="M10 28 L16 12 L20 22 L24 12 L30 28" stroke="url(#logo-grad-footer)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" filter="url(#logo-glow-footer)"/>
                  <circle cx="20" cy="20" r="1.5" fill="#8b5cf6" opacity="0.7"/>
                </svg>
                <div>
                  <span className="footer-logo-name">MathSpark</span>
                  <span className="footer-logo-sub">Online Academy</span>
                </div>
              </Link>
              <p className="footer-desc">
                {t('footer.about')}
              </p>
              <div className="footer-social">
                <a href={SITE.facebook} target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Facebook">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href={SITE.youtube} target="_blank" rel="noreferrer" className="footer-social-link" aria-label="YouTube">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                </a>
                <a href={SITE.instagram} target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Instagram">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
                <a href={SITE.twitter} target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Twitter">
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h5 className="footer-col-title">{t('footer.quickLinks')}</h5>
              <ul className="footer-links">
                <li><Link href="/">{t('nav.home')}</Link></li>
                <li><Link href="/courses">{t('nav.classes')}</Link></li>
                <li><Link href="/store">{t('nav.store')}</Link></li>
                <li><Link href="/instructors">{t('footer.instructors')}</Link></li>
                <li><Link href="/contact">{t('nav.contact')}</Link></li>
                <li><Link href="/tracking">{t('footer.tuteTracking')}</Link></li>
              </ul>
            </div>

            {/* Grades */}
            <div className="footer-col">
              <h5 className="footer-col-title">{t('nav.grades')}</h5>
              <ul className="footer-links">
                {GRADES.map(g => (
                  <li key={g.id}>
                    <Link href={`/grades/${g.id}`}>{g.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-col">
              <h5 className="footer-col-title">{t('common.contactUs')}</h5>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-icon">📞</span>
                  <div>
                    <div className="footer-contact-label">{t('footer.phoneWhatsapp')}</div>
                    <a href={`tel:${SITE.phone}`} className="footer-contact-val">{SITE.phone}</a>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">✉️</span>
                  <div>
                    <div className="footer-contact-label">{t('footer.email')}</div>
                    <a href={`mailto:${SITE.email}`} className="footer-contact-val">{SITE.email}</a>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">🕐</span>
                  <div>
                    <div className="footer-contact-label">{t('footer.supportHours')}</div>
                    <span className="footer-contact-val">{t('footer.supportHoursVal')}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-inner">
            <div className="footer-copyright-block">
              <p className="footer-copyright">
                © {currentYear} <span className="footer-brand-accent">MathSpark</span>. All rights reserved.
              </p>
              <p className="footer-powered-by">
                Designed &amp; Developed by
                <span className="fillex-badge">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <polygon points="6,1 11,4 11,8 6,11 1,8 1,4" fill="url(#fx-grad)" opacity="0.9"/>
                    <defs>
                      <linearGradient id="fx-grad" x1="0" y1="0" x2="12" y2="12">
                        <stop offset="0%" stopColor="#6366f1"/>
                        <stop offset="100%" stopColor="#8b5cf6"/>
                      </linearGradient>
                    </defs>
                  </svg>
                  FILLEX360 Solutions
                </span>
              </p>
            </div>
            <ul className="footer-policy-links">
              <li><Link href="/terms">{t('footer.terms')}</Link></li>
              <li><Link href="/privacy">{t('footer.privacy')}</Link></li>
              <li><Link href="/refund">{t('footer.refund')}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer { background: var(--dark-2); border-top: 1px solid var(--border); }

        /* CTA */
        .footer-cta {
          background: linear-gradient(135deg, rgba(0,82,255,0.12) 0%, rgba(123,47,255,0.08) 50%, rgba(255,107,0,0.08) 100%);
          border-bottom: 1px solid var(--border);
          padding: 80px 0;
        }
        .footer-cta-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 48px;
        }
        .footer-cta-content { flex: 1; }
        .footer-cta-content h2 { margin: 12px 0 16px; }
        .footer-cta-content p { color: var(--text-secondary); max-width: 480px; }
        .footer-cta-actions { display: flex; flex-direction: column; gap: 12px; flex-shrink: 0; min-width: 200px; }

        /* Main */
        .footer-main { padding: 72px 0; }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
        }

        /* Brand */
        .footer-logo {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px;
          text-decoration: none;
          transition: opacity 0.2s;
        }
        .footer-logo:hover { opacity: 0.85; }
        .footer-logo-svg {
          flex-shrink: 0;
          transition: transform 0.3s ease, filter 0.3s ease;
        }
        .footer-logo:hover .footer-logo-svg {
          transform: scale(1.05) rotate(-2deg);
          filter: drop-shadow(0 0 8px rgba(139,92,246,0.5));
        }
        .footer-logo-name { display: block; font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; }
        .footer-logo-sub  { display: block; font-size: 0.6rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .footer-desc { font-size: 0.875rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 24px; max-width: 300px; }
        .footer-social { display: flex; gap: 10px; }
        .footer-social-link {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.05);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .footer-social-link:hover { background: var(--primary); border-color: var(--primary); color: white; transform: translateY(-2px); }

        /* Cols */
        .footer-col-title {
          font-size: 0.875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--text-primary);
          margin-bottom: 20px;
        }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-links a {
          font-size: 0.875rem;
          color: var(--text-muted);
          transition: color 0.2s, padding-left 0.2s;
        }
        .footer-links a:hover { color: var(--primary-light); padding-left: 4px; }

        /* Contact list */
        .footer-contact-list { display: flex; flex-direction: column; gap: 16px; }
        .footer-contact-list li { display: flex; align-items: flex-start; gap: 12px; }
        .footer-contact-icon { font-size: 1rem; margin-top: 2px; flex-shrink: 0; }
        .footer-contact-label { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 2px; }
        .footer-contact-val { font-size: 0.875rem; font-weight: 500; color: var(--text-secondary); transition: color 0.2s; }
        a.footer-contact-val:hover { color: var(--primary-light); }

        /* Bottom */
        .footer-bottom {
          border-top: 1px solid var(--border-light);
          padding: 20px 0;
        }
        .footer-bottom-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          flex-wrap: wrap;
        }
        .footer-copyright-block { display: flex; flex-direction: column; gap: 4px; }
        .footer-copyright { font-size: 0.82rem; color: var(--text-muted); }
        .footer-brand-accent {
          font-weight: 700;
          background: linear-gradient(90deg, #6366f1, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .footer-powered-by {
          font-size: 0.75rem;
          color: rgba(255,255,255,0.25);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .fillex-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          padding: 2px 8px;
          background: linear-gradient(135deg, rgba(99,102,241,0.12), rgba(139,92,246,0.12));
          border: 1px solid rgba(139,92,246,0.25);
          border-radius: 999px;
          color: rgba(139,92,246,0.9);
          font-size: 0.72rem;
          font-weight: 600;
          letter-spacing: 0.01em;
          transition: border-color 0.2s, background 0.2s;
        }
        .fillex-badge:hover {
          border-color: rgba(139,92,246,0.5);
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(139,92,246,0.2));
          color: #a78bfa;
        }
        .footer-policy-links { display: flex; gap: 20px; }
        .footer-policy-links a { font-size: 0.82rem; color: var(--text-muted); transition: color 0.2s; }
        .footer-policy-links a:hover { color: var(--primary-light); }

        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
          .footer-brand { grid-column: span 2; }
          .footer-cta-inner { flex-direction: column; text-align: center; }
          .footer-cta-actions { flex-direction: row; }
          .footer-cta-content p { margin: 0 auto; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-brand { grid-column: span 1; }
          .footer-bottom-inner { flex-direction: column; text-align: center; }
          .footer-cta-actions { flex-direction: column; width: 100%; }
          .footer-cta-actions .btn { width: 100%; justify-content: center; }
          .footer-policy-links { flex-wrap: wrap; justify-content: center; gap: 12px; }
        }
      `}</style>
    </footer>
  );
}
