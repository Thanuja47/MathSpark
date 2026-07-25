'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_LINKS, GRADES, SITE } from '@/lib/data';
import useAuth from '@/hooks/useAuth';
import { normalisePhone } from '@/utils/formatPhone';

export default function Header() {
  const [scrolled, setScrolled]       = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [loginOpen, setLoginOpen]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [step, setStep]     = useState(1); // login modal step
  const [phone, setPhone]   = useState('');
  const [password, setPassword] = useState('');
  
  const { login: performLogin, error: loginError, loading, setError: setLoginError } = useAuth();
  const headerRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu / modal is open
  useEffect(() => {
    document.body.style.overflow = (mobileOpen || loginOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, loginOpen]);

  const closeMobile = () => setMobileOpen(false);
  const closeLogin  = () => { setLoginOpen(false); setStep(1); setPhone(''); setPassword(''); setLoginError(null); };

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) { setLoginError('Please enter a valid WhatsApp number.'); return; }
    setLoginError(null);
    setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) { setLoginError('Please enter your password.'); return; }
    setLoginError(null);
    
    const result = await performLogin(phone, password);
    if (result.success) {
      closeLogin();
      if (result.user?.role === 'admin') {
        window.location.href = '/admin';
      } else {
        window.location.href = '/my-account';
      }
    }
  };

  return (
    <>
      {/* ── Top Info Bar ── */}
      <div className="header-topbar">
        <div className="container">
          <div className="header-topbar-inner">
            <div className="header-topbar-left">
              <a href={`tel:${SITE.phone}`} className="topbar-link">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="topbar-link">
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {SITE.email}
              </a>
            </div>
            <div className="header-topbar-right">
              <span className="topbar-badge">🔥 2026 Syllabus Classes Now Live!</span>
              <div className="topbar-social">
                <a href={SITE.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href={SITE.youtube} target="_blank" rel="noreferrer" aria-label="YouTube">
                  <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                </a>
                <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header ref={headerRef} className={`main-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">
            {/* Logo */}
            <Link href="/" className="header-logo">
              <div className="logo-mark">
                <span className="logo-icon">⚡</span>
              </div>
              <div className="logo-text">
                <span className="logo-name">MathSpark</span>
                <span className="logo-sub">Online School</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="desktop-nav" aria-label="Main navigation">
              <ul className="nav-list">
                {NAV_LINKS.map((link) => (
                  <li
                    key={link.label}
                    className={`nav-item ${link.dropdown ? 'has-dropdown' : ''}`}
                    onMouseEnter={() => link.dropdown && setActiveDropdown(link.label)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className="nav-link"
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noreferrer' : undefined}
                    >
                      {link.label}
                      {link.dropdown && (
                        <svg className="nav-chevron" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"/></svg>
                      )}
                    </Link>
                    {link.dropdown && activeDropdown === link.label && (
                      <div className="nav-dropdown">
                        {link.dropdown.map((item) => (
                          <Link key={item.label} href={item.href} className="dropdown-item">
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              <button
                id="grades-sidebar-btn"
                className="btn btn-ghost btn-sm"
                onClick={() => setSidebarOpen(true)}
                aria-label="Browse Grades"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
                Grades
              </button>
              <button
                id="login-btn-header"
                className="btn btn-primary btn-sm"
                onClick={() => setLoginOpen(true)}
              >
                Login
                <svg className="arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </button>
              {/* Mobile hamburger */}
              <button
                id="mobile-menu-btn"
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Overlay ── */}
      <div
        className={`overlay ${(mobileOpen || loginOpen || sidebarOpen) ? 'active' : ''}`}
        onClick={() => { closeMobile(); closeLogin(); setSidebarOpen(false); }}
      />

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu-header">
          <Link href="/" className="header-logo" onClick={closeMobile}>
            <div className="logo-mark"><span className="logo-icon">⚡</span></div>
            <div className="logo-text">
              <span className="logo-name">MathSpark</span>
              <span className="logo-sub">Online School</span>
            </div>
          </Link>
          <button id="mobile-close-btn" className="modal-close" onClick={closeMobile} aria-label="Close menu">✕</button>
        </div>
        <div className="mobile-contact-bar">
          <a href={`tel:${SITE.phone}`}><span>📞</span> {SITE.phone}</a>
          <a href={`mailto:${SITE.email}`}><span>✉️</span> {SITE.email}</a>
        </div>
        <nav className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <div key={link.label}>
              <Link href={link.href} className="mobile-nav-link" onClick={closeMobile}
                target={link.external ? '_blank' : undefined}>
                {link.label}
              </Link>
              {link.dropdown && (
                <div className="mobile-sub-links">
                  {link.dropdown.map((item) => (
                    <Link key={item.label} href={item.href} className="mobile-sub-link" onClick={closeMobile}>
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="mobile-menu-footer">
          <button id="mobile-login-btn" className="btn btn-primary" style={{width:'100%'}} onClick={() => { closeMobile(); setLoginOpen(true); }}>
            Login to Your Account
          </button>
          <div className="mobile-social">
            <span className="text-muted text-sm">Find us on</span>
            <div style={{display:'flex',gap:'12px',marginTop:'12px'}}>
              <a href={SITE.facebook} target="_blank" rel="noreferrer" className="social-btn">f</a>
              <a href={SITE.youtube}  target="_blank" rel="noreferrer" className="social-btn">▶</a>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" className="social-btn">📸</a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Grades Sidebar ── */}
      <div className={`grades-sidebar ${sidebarOpen ? 'open' : ''}`} aria-hidden={!sidebarOpen}>
        <div className="grades-sidebar-header">
          <h4>Browse by Grade</h4>
          <button id="sidebar-close-btn" className="modal-close" onClick={() => setSidebarOpen(false)}>✕</button>
        </div>
        <div className="grades-sidebar-body">
          {GRADES.map((grade) => (
            <div key={grade.id} className="grade-sidebar-item">
              <Link href={`/grades/${grade.id}`} className="grade-sidebar-label" onClick={() => setSidebarOpen(false)}>
                <span className="grade-sidebar-badge">{grade.id}</span>
                {grade.label}
              </Link>
              <div className="grade-sidebar-subjects">
                {grade.subjects.map((sub) => (
                  <Link key={sub} href={`/grades/${grade.id}`} className="grade-sidebar-sub" onClick={() => setSidebarOpen(false)}>
                    {sub}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Login Modal ── */}
      <div className={`modal ${loginOpen ? 'active' : ''}`} role="dialog" aria-modal="true" aria-label="Login">
        <div className="modal-box">
          <button id="login-modal-close" className="modal-close" onClick={closeLogin} aria-label="Close login">✕</button>
          <div className="modal-logo" style={{marginBottom:'24px'}}>
            <div style={{display:'flex',alignItems:'center',gap:'10px',marginBottom:'8px'}}>
              <span style={{fontSize:'1.8rem'}}>⚡</span>
              <span style={{fontFamily:'var(--font-heading)',fontWeight:800,fontSize:'1.4rem'}}>MathSpark</span>
            </div>
            <h3 style={{fontSize:'1.2rem',fontWeight:700,marginBottom:'4px'}}>
              {step === 1 ? 'Welcome Back!' : 'Enter your password'}
            </h3>
            <p style={{fontSize:'0.85rem',color:'var(--text-muted)'}}>
              {step === 1 ? 'Enter your WhatsApp number to continue' : `Logging in as ${phone}`}
            </p>
          </div>

          {loginError && (
            <div className="login-error">
              ⚠️ {loginError}
            </div>
          )}

          {step === 1 && (
            <form id="login-step1-form" onSubmit={handleStep1}>
              <div className="form-group">
                <label className="form-label" htmlFor="login-phone">WhatsApp Number</label>
                <div style={{position:'relative'}}>
                  <input
                    id="login-phone"
                    type="tel"
                    className="form-input"
                    placeholder="0712 345 678"
                    value={phone}
                    onChange={e => { setPhone(e.target.value.replace(/\s/g, '')); setLoginError(''); }}
                    required
                    autoFocus
                  />
                </div>
              </div>
              <button type="submit" id="login-step1-btn" className="btn btn-primary" style={{width:'100%'}} disabled={loading}>
                {loading ? 'Checking...' : <>Continue <svg className="arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>}
              </button>
            </form>
          )}

          {step === 2 && (
            <form id="login-step2-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">WhatsApp Number</label>
                <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                  <span style={{fontWeight:600}}>+94 {phone}</span>
                  <button type="button" id="change-number-btn" style={{fontSize:'0.8rem',color:'var(--primary-light)',cursor:'pointer',background:'none',border:'none'}}
                    onClick={() => { setStep(1); setPassword(''); setLoginError(''); }}>
                    Change
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor="login-password">Password</label>
                <input
                  id="login-password"
                  type="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={password}
                  onChange={e => { setPassword(e.target.value); setLoginError(''); }}
                  required
                  autoFocus
                />
              </div>
              <div style={{textAlign:'right',marginBottom:'20px'}}>
                <Link href="/forgot-password" style={{fontSize:'0.83rem',color:'var(--primary-light)'}}>Forgot Password?</Link>
              </div>
              <button type="submit" id="login-submit-btn" className="btn btn-primary" style={{width:'100%'}} disabled={loading}>
                {loading ? 'Logging in...' : <>Login <svg className="arrow" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>}
              </button>
            </form>
          )}

          <p style={{textAlign:'center',marginTop:'24px',fontSize:'0.85rem',color:'var(--text-muted)'}}>
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{color:'var(--primary-light)',fontWeight:600}} onClick={closeLogin}>Register here</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        /* ── Top Bar ── */
        .header-topbar {
          background: var(--dark-2);
          border-bottom: 1px solid var(--border-light);
          height: var(--header-top-h);
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .header-topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }
        .header-topbar-left { display: flex; align-items: center; gap: 20px; }
        .header-topbar-right { display: flex; align-items: center; gap: 16px; }
        .topbar-link {
          font-size: 0.78rem;
          color: var(--text-muted);
          display: flex;
          align-items: center;
          gap: 6px;
          transition: color 0.2s;
        }
        .topbar-link:hover { color: var(--text-primary); }
        .topbar-badge {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--accent-light);
          background: var(--accent-glow);
          border: 1px solid rgba(255,107,0,0.2);
          padding: 3px 10px;
          border-radius: 100px;
        }
        .topbar-social { display: flex; align-items: center; gap: 10px; }
        .topbar-social a {
          color: var(--text-muted);
          display: flex;
          align-items: center;
          transition: color 0.2s;
        }
        .topbar-social a:hover { color: var(--primary-light); }

        /* ── Main Header ── */
        .main-header {
          background: rgba(11,14,26,0.85);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-light);
          position: sticky;
          top: var(--header-top-h);
          z-index: 90;
          height: var(--header-main-h);
          display: flex;
          align-items: center;
          transition: var(--transition);
        }
        .main-header.scrolled {
          background: rgba(11,14,26,0.97);
          border-bottom-color: var(--border);
          box-shadow: 0 4px 24px rgba(0,0,0,0.5);
        }
        .header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          width: 100%;
        }

        /* Logo */
        .header-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }
        .logo-mark {
          width: 40px; height: 40px;
          background: var(--gradient-blue);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 16px rgba(0,82,255,0.4);
        }
        .logo-icon { font-size: 1.3rem; }
        .logo-name { display: block; font-family: var(--font-heading); font-weight: 800; font-size: 1.15rem; color: var(--text-primary); line-height: 1.1; }
        .logo-sub  { display: block; font-size: 0.62rem; color: var(--text-muted); letter-spacing: 0.06em; text-transform: uppercase; }

        /* Desktop Nav */
        .desktop-nav { display: flex; flex: 1; justify-content: center; }
        .nav-list { display: flex; align-items: center; gap: 4px; }
        .nav-item { position: relative; }
        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 8px 14px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--text-secondary);
          border-radius: var(--radius-md);
          transition: var(--transition);
          white-space: nowrap;
        }
        .nav-link:hover { color: var(--text-primary); background: rgba(255,255,255,0.05); }
        .nav-chevron { transition: transform 0.2s; }
        .has-dropdown:hover .nav-chevron { transform: rotate(180deg); }
        .nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-md);
          padding: 8px;
          min-width: 160px;
          box-shadow: var(--shadow-lg);
          z-index: 200;
          animation: fadeInUp 0.15s ease;
        }
        .dropdown-item {
          display: block;
          padding: 9px 14px;
          font-size: 0.875rem;
          color: var(--text-secondary);
          border-radius: var(--radius-sm);
          transition: var(--transition);
          white-space: nowrap;
        }
        .dropdown-item:hover { background: var(--primary-glow); color: var(--primary-light); }

        /* Header Actions */
        .header-actions { display: flex; align-items: center; gap: 10px; flex-shrink: 0; }
        .mobile-menu-btn {
          display: none;
          color: var(--text-secondary);
          padding: 8px;
          border-radius: var(--radius-sm);
          transition: var(--transition);
        }
        .mobile-menu-btn:hover { color: var(--text-primary); background: rgba(255,255,255,0.06); }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0; right: -100%;
          width: min(360px, 90vw);
          height: 100vh;
          background: var(--dark-2);
          border-left: 1px solid var(--border);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .mobile-menu.open { right: 0; }
        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px 24px;
          border-bottom: 1px solid var(--border);
        }
        .mobile-contact-bar {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: 16px 24px;
          border-bottom: 1px solid var(--border-light);
          font-size: 0.82rem;
          color: var(--text-muted);
        }
        .mobile-contact-bar a { display: flex; align-items: center; gap: 8px; color: var(--text-muted); }
        .mobile-nav { flex: 1; padding: 16px 24px; }
        .mobile-nav-link {
          display: block;
          padding: 14px 0;
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          border-bottom: 1px solid var(--border-light);
          transition: color 0.2s;
        }
        .mobile-nav-link:hover { color: var(--primary-light); }
        .mobile-sub-links { display: flex; flex-wrap: wrap; gap: 8px; padding: 10px 0 14px 16px; }
        .mobile-sub-link {
          font-size: 0.82rem;
          color: var(--text-muted);
          padding: 5px 12px;
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          transition: var(--transition);
        }
        .mobile-sub-link:hover { background: var(--primary-glow); color: var(--primary-light); border-color: rgba(0,82,255,0.2); }
        .mobile-menu-footer { padding: 24px; border-top: 1px solid var(--border); }
        .mobile-social { margin-top: 20px; }
        .social-btn {
          width: 36px; height: 36px;
          border-radius: 50%;
          background: rgba(255,255,255,0.06);
          border: 1px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          color: var(--text-secondary);
          transition: var(--transition);
        }
        .social-btn:hover { background: var(--primary-glow); color: var(--primary-light); }

        /* Grades Sidebar */
        .grades-sidebar {
          position: fixed;
          top: 0; left: -100%;
          width: min(320px, 90vw);
          height: 100vh;
          background: var(--dark-2);
          border-right: 1px solid var(--border);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transition: left 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          overflow-y: auto;
        }
        .grades-sidebar.open { left: 0; }
        .grades-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px;
          border-bottom: 1px solid var(--border);
        }
        .grades-sidebar-body { padding: 16px; flex: 1; }
        .grade-sidebar-item { margin-bottom: 8px; }
        .grade-sidebar-label {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.95rem;
          color: var(--text-primary);
          transition: var(--transition);
        }
        .grade-sidebar-label:hover { background: var(--primary-glow); color: var(--primary-light); }
        .grade-sidebar-badge {
          width: 30px; height: 30px;
          background: var(--gradient-blue);
          border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
        }
        .grade-sidebar-subjects { display: flex; flex-wrap: wrap; gap: 6px; padding: 6px 16px 12px 58px; }
        .grade-sidebar-sub {
          font-size: 0.78rem;
          color: var(--text-muted);
          padding: 4px 10px;
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--border-light);
          border-radius: var(--radius-full);
          transition: var(--transition);
        }
        .grade-sidebar-sub:hover { color: var(--primary-light); background: var(--primary-glow); }

        /* Login error */
        .login-error {
          background: rgba(255,60,60,0.1);
          border: 1px solid rgba(255,60,60,0.2);
          border-radius: var(--radius-md);
          padding: 12px 16px;
          font-size: 0.875rem;
          color: #FF6B6B;
          margin-bottom: 20px;
        }

        /* Responsive */
        @media (max-width: 1100px) {
          .desktop-nav { display: none; }
          .mobile-menu-btn { display: flex; }
          .header-topbar-left { display: none; }
        }
        @media (max-width: 640px) {
          .topbar-badge { display: none; }
          .header-topbar { display: none; }
          .main-header { top: 0; }
        }
      `}</style>
    </>
  );
}
