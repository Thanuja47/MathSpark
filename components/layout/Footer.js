'use client';
import Link from 'next/link';
import { SITE, GRADES, NAV_LINKS } from '@/lib/data';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      {/* CTA Banner */}
      <div className="footer-cta">
        <div className="container">
          <div className="footer-cta-inner">
            <div className="footer-cta-content">
              <div className="section-tag">Join MathSpark Today</div>
              <h2>Ready to Ignite Your<br /><span className="theme-gradient">Math Journey?</span></h2>
              <p>Join 5,200+ students achieving A passes in Mathematics. Live classes, full recordings, WhatsApp support — all in one place.</p>
            </div>
            <div className="footer-cta-actions">
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="btn btn-accent btn-lg">
                <span>💬</span> WhatsApp Now
              </a>
              <a href={`tel:${SITE.phone}`} className="btn btn-outline btn-lg">
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                Call Us
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
                <div className="footer-logo-mark">⚡</div>
                <div>
                  <span className="footer-logo-name">MathSpark</span>
                  <span className="footer-logo-sub">Online School</span>
                </div>
              </Link>
              <p className="footer-desc">
                Sri Lanka&apos;s most result-oriented online Mathematics platform for Grades 6–11. Sinhala &amp; English medium classes with live sessions and full recordings.
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
              <h5 className="footer-col-title">Quick Links</h5>
              <ul className="footer-links">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/courses">Classes</Link></li>
                <li><Link href="/store">Store</Link></li>
                <li><Link href="/instructors">Instructors</Link></li>
                <li><Link href="/contact">Contact</Link></li>
                <li><Link href="/tracking">Tute Tracking</Link></li>
              </ul>
            </div>

            {/* Grades */}
            <div className="footer-col">
              <h5 className="footer-col-title">Grades</h5>
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
              <h5 className="footer-col-title">Contact Us</h5>
              <ul className="footer-contact-list">
                <li>
                  <span className="footer-contact-icon">📞</span>
                  <div>
                    <div className="footer-contact-label">Phone / WhatsApp</div>
                    <a href={`tel:${SITE.phone}`} className="footer-contact-val">{SITE.phone}</a>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">✉️</span>
                  <div>
                    <div className="footer-contact-label">Email</div>
                    <a href={`mailto:${SITE.email}`} className="footer-contact-val">{SITE.email}</a>
                  </div>
                </li>
                <li>
                  <span className="footer-contact-icon">🕐</span>
                  <div>
                    <div className="footer-contact-label">Support Hours</div>
                    <span className="footer-contact-val">Mon–Sat, 9am–6pm</span>
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
            <p className="footer-copyright">
              © {currentYear} MathSpark. All rights reserved. Built with ❤️ for Sri Lankan students.
            </p>
            <ul className="footer-policy-links">
              <li><Link href="/terms">Terms of Service</Link></li>
              <li><Link href="/privacy">Privacy Policy</Link></li>
              <li><Link href="/refund">Refund Policy</Link></li>
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
          display: flex; align-items: center; gap: 10px;
          margin-bottom: 20px;
        }
        .footer-logo-mark {
          width: 38px; height: 38px;
          background: var(--gradient-blue);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.2rem;
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
        .footer-copyright { font-size: 0.82rem; color: var(--text-muted); }
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
