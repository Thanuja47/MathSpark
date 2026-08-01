'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { NAV_LINKS, GRADES, SITE } from '@/lib/data';
import { login as loginService } from '@/services/authService';

export default function Header() {
  const [scrolled, setScrolled]             = useState(false);
  const [mobileOpen, setMobileOpen]         = useState(false);
  const [loginOpen, setLoginOpen]           = useState(false);
  const [sidebarOpen, setSidebarOpen]       = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [step, setStep]                     = useState(1);
  const [phone, setPhone]                   = useState('');
  const [password, setPassword]             = useState('');
  const [loginError, setLoginError]         = useState('');
  const [loading, setLoading]               = useState(false);
  const [expandedMobile, setExpandedMobile] = useState(null);

  // Auth state
  const [user, setUser]               = useState(null);
  const [authChecked, setAuthChecked] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const headerRef   = useRef(null);

  // Check auth on mount
  useEffect(() => {
    fetch('/api/auth/me', { credentials: 'include' })
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => {})
      .finally(() => setAuthChecked(true));
  }, []);

  // Close user menu on outside click
  useEffect(() => {
    if (!userMenuOpen) return;
    const handle = (e) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [userMenuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = (mobileOpen || loginOpen) ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen, loginOpen]);

  const closeMobile = () => { setMobileOpen(false); setExpandedMobile(null); };
  const closeLogin  = () => { setLoginOpen(false); setStep(1); setPhone(''); setPassword(''); setLoginError(''); };

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!phone || phone.replace(/\s/g,'').length < 9) { setLoginError('Please enter a valid WhatsApp number.'); return; }
    setLoginError('');
    setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!password) { setLoginError('Please enter your password.'); return; }
    setLoginError('');
    setLoading(true);
    try {
      const data = await loginService(phone, password);
      setLoading(false);
      if (!data.success) {
        setLoginError(data.error || 'Login failed. Please check your credentials.');
      } else {
        setUser(data.user);
        closeLogin();
        window.location.href = data.user?.role === 'admin' ? '/admin' : '/my-account';
      }
    } catch {
      setLoading(false);
      setLoginError('Server error. Please try again.');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/me', { method: 'POST', credentials: 'include' });
    } catch {}
    setUser(null);
    setUserMenuOpen(false);
    window.location.href = '/';
  };

  const getInitials = (name, phone) => {
    if (name) {
      const parts = name.trim().split(' ');
      return parts.length >= 2
        ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
        : parts[0].slice(0, 2).toUpperCase();
    }
    return phone ? phone.slice(-2) : '??';
  };

  const dashboardHref = user?.role === 'admin' ? '/admin' : '/my-account';
  const displayName   = user?.name || user?.phone || '';

  return (
    <>
      {/* ── Top Info Bar ── */}
      <div className="header-topbar">
        <div className="container">
          <div className="header-topbar-inner">
            <div className="header-topbar-left">
              <a href={`tel:${SITE.phone}`} className="topbar-link">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
                {SITE.phone}
              </a>
              <a href={`mailto:${SITE.email}`} className="topbar-link">
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                {SITE.email}
              </a>
            </div>
            <div className="header-topbar-right">
              <span className="topbar-badge">
                <span className="topbar-badge-dot" />
                2026 Syllabus Classes Live
              </span>
              <div className="topbar-social">
                <a href={SITE.facebook}  target="_blank" rel="noreferrer" aria-label="Facebook"  className="topbar-social-link">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
                </a>
                <a href={SITE.youtube}   target="_blank" rel="noreferrer" aria-label="YouTube"   className="topbar-social-link">
                  <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg>
                </a>
                <a href={SITE.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="topbar-social-link">
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Header ── */}
      <header ref={headerRef} className={`main-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="header-inner">

            {/* Logo */}
            <Link href="/" className="header-logo">
              <div className="logo-mark">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <div className="logo-text">
                <span className="logo-name">MathSpark</span>
                <span className="logo-sub">Online Tuition</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="desktop-nav" aria-label="Main navigation">
              <ul className="nav-list">
                {NAV_LINKS.map((link) => (
                  <li
                    key={link.label}
                    className={`nav-item${link.dropdown ? ' has-dropdown' : ''}`}
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
                        <svg
                          className={`nav-chevron${activeDropdown === link.label ? ' open' : ''}`}
                          width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                        >
                          <polyline points="6 9 12 15 18 9"/>
                        </svg>
                      )}
                    </Link>
                    {link.dropdown && activeDropdown === link.label && (
                      <div className="nav-dropdown">
                        <div className="nav-dropdown-inner">
                          {link.dropdown.map((item) => (
                            <Link key={item.label} href={item.href} className="dropdown-item">
                              <span className="dropdown-item-text">{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="header-actions">
              {/* Grades sidebar trigger */}
              <button
                id="grades-sidebar-btn"
                className="grades-icon-btn"
                onClick={() => setSidebarOpen(true)}
                aria-label="Browse by Grade"
                title="Browse by Grade"
              >
                <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                <span className="grades-icon-label">Grades</span>
              </button>

              {/* Separator */}
              <span className="actions-separator" aria-hidden="true" />

              {/* Auth: User menu OR Login button */}
              {authChecked && (
                user ? (
                  /* ── Logged-in user menu ── */
                  <div className="user-menu-wrap" ref={userMenuRef}>
                    <button
                      id="user-menu-btn"
                      className="user-menu-btn"
                      onClick={() => setUserMenuOpen(o => !o)}
                      aria-expanded={userMenuOpen}
                      aria-label="User menu"
                    >
                      <span className="user-avatar">{getInitials(user.name, user.phone)}</span>
                      <span className="user-name-text">{displayName.split(' ')[0] || displayName}</span>
                      <svg
                        className={`nav-chevron${userMenuOpen ? ' open' : ''}`}
                        width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"
                      >
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </button>

                    {userMenuOpen && (
                      <div className="user-dropdown">
                        <div className="user-dropdown-header">
                          <span className="user-dropdown-name">{displayName}</span>
                          <span className="user-dropdown-role">{user.role === 'admin' ? 'Administrator' : `Grade ${user.grade || ''} Student`}</span>
                        </div>
                        <div className="user-dropdown-divider" />
                        <Link
                          href={dashboardHref}
                          className="user-dropdown-item"
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
                          Dashboard
                        </Link>
                        <button
                          className="user-dropdown-item user-dropdown-logout"
                          onClick={handleLogout}
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Logged-out Login button ── */
                  <button
                    id="login-btn-header"
                    className="login-btn"
                    onClick={() => setLoginOpen(true)}
                  >
                    Login
                    <svg className="arrow" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </button>
                )
              )}

              {/* Mobile hamburger */}
              <button
                id="mobile-menu-btn"
                className="mobile-menu-btn"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <line x1="3" y1="6"  x2="21" y2="6"/>
                  <line x1="3" y1="12" x2="21" y2="12"/>
                  <line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ── Overlay ── */}
      <div
        className={`overlay${(mobileOpen || loginOpen || sidebarOpen) ? ' active' : ''}`}
        onClick={() => { closeMobile(); closeLogin(); setSidebarOpen(false); setUserMenuOpen(false); }}
        aria-hidden="true"
      />

      {/* ── Mobile Menu ── */}
      <div className={`mobile-menu${mobileOpen ? ' open' : ''}`} aria-hidden={!mobileOpen} role="dialog" aria-label="Navigation menu">
        <div className="mobile-menu-header">
          <Link href="/" className="header-logo" onClick={closeMobile}>
            <div className="logo-mark">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
            </div>
            <div className="logo-text">
              <span className="logo-name">MathSpark</span>
              <span className="logo-sub">Online Tuition</span>
            </div>
          </Link>
          <button id="mobile-close-btn" className="icon-btn" onClick={closeMobile} aria-label="Close menu">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Mobile user info strip (if logged in) */}
        {user && (
          <div className="mobile-user-strip">
            <span className="user-avatar user-avatar-sm">{getInitials(user.name, user.phone)}</span>
            <div>
              <div className="mobile-user-name">{displayName}</div>
              <div className="mobile-user-role">{user.role === 'admin' ? 'Administrator' : 'Student'}</div>
            </div>
          </div>
        )}

        <div className="mobile-contact-bar">
          <a href={`tel:${SITE.phone}`} className="mobile-contact-link">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
            {SITE.phone}
          </a>
        </div>

        <nav className="mobile-nav">
          {NAV_LINKS.map((link) => (
            <div key={link.label} className="mobile-nav-item">
              <button
                className="mobile-nav-link"
                onClick={() => {
                  if (link.dropdown) {
                    setExpandedMobile(expandedMobile === link.label ? null : link.label);
                  } else {
                    closeMobile();
                    window.location.href = link.href;
                  }
                }}
              >
                <span>{link.label}</span>
                {link.dropdown && (
                  <svg
                    className={`mobile-chevron${expandedMobile === link.label ? ' open' : ''}`}
                    width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                  >
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                )}
              </button>
              {link.dropdown && expandedMobile === link.label && (
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
          {user ? (
            <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
              <Link
                href={dashboardHref}
                className="login-btn"
                style={{ width:'100%', justifyContent:'center', textDecoration:'none' }}
                onClick={closeMobile}
              >
                My Dashboard
                <svg className="arrow" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </Link>
              <button
                className="logout-btn-mobile"
                onClick={handleLogout}
              >
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Logout
              </button>
            </div>
          ) : (
            <button
              id="mobile-login-btn"
              className="login-btn"
              style={{ width:'100%', justifyContent:'center' }}
              onClick={() => { closeMobile(); setLoginOpen(true); }}
            >
              Login to Your Account
              <svg className="arrow" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          )}
        </div>
      </div>

      {/* ── Grades Sidebar ── */}
      <div className={`grades-sidebar${sidebarOpen ? ' open' : ''}`} aria-hidden={!sidebarOpen} role="dialog" aria-label="Browse by grade">
        <div className="grades-sidebar-header">
          <div>
            <div style={{fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--muted)', marginBottom:4}}>Browse</div>
            <h4 style={{fontSize:'1.0625rem', color:'var(--paper)', letterSpacing:'-0.01em'}}>By Grade</h4>
          </div>
          <button id="sidebar-close-btn" className="icon-btn" onClick={() => setSidebarOpen(false)} aria-label="Close grades panel">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
        <div className="grades-sidebar-body">
          {GRADES.map((grade) => (
            <div key={grade.id} className="grade-sidebar-item">
              <Link href={`/grades/${grade.id}`} className="grade-sidebar-label" onClick={() => setSidebarOpen(false)}>
                <span className="grade-sidebar-badge">{grade.id}</span>
                <span>{grade.label}</span>
                <svg style={{marginLeft:'auto', opacity:0.4}} width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
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
      <div className={`modal${loginOpen ? ' active' : ''}`} role="dialog" aria-modal="true" aria-label="Login to MathSpark">
        <div className="modal-box">
          <button id="login-modal-close" className="modal-close" onClick={closeLogin} aria-label="Close login">
            <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>

          <div className="modal-header">
            <div className="modal-logo-row">
              <div className="logo-mark" style={{width:32,height:32}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              </div>
              <span className="logo-name" style={{fontSize:'1rem'}}>MathSpark</span>
            </div>
            <h3 className="modal-title">
              {step === 1 ? 'Welcome back' : 'Enter password'}
            </h3>
            <p className="modal-subtitle">
              {step === 1
                ? 'Sign in with your registered WhatsApp number'
                : <span>Signing in as <strong style={{color:'var(--paper)'}}>{phone}</strong></span>
              }
            </p>
          </div>

          <div className="modal-steps">
            <div className={`modal-step${step >= 1 ? ' active' : ''}`}>
              <div className="modal-step-dot">{step > 1 ? '✓' : '1'}</div>
              <span>Phone</span>
            </div>
            <div className={`modal-step-line${step >= 2 ? ' active' : ''}`} />
            <div className={`modal-step${step >= 2 ? ' active' : ''}`}>
              <div className="modal-step-dot">2</div>
              <span>Password</span>
            </div>
          </div>

          {loginError && (
            <div className="login-error" role="alert">
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{flexShrink:0}}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              {loginError}
            </div>
          )}

          {step === 1 && (
            <form id="login-step1-form" onSubmit={handleStep1}>
              <div className="form-group">
                <label className="form-label" htmlFor="login-phone">WhatsApp Number</label>
                <input
                  id="login-phone"
                  type="tel"
                  className="form-input"
                  placeholder="0712 345 678"
                  value={phone}
                  onChange={e => { setPhone(e.target.value.replace(/\s/g,'')); setLoginError(''); }}
                  required
                  autoFocus
                />
              </div>
              <button type="submit" id="login-step1-btn" className="login-btn" style={{width:'100%',justifyContent:'center'}} disabled={loading}>
                {loading ? 'Checking...' : <>Continue <svg className="arrow" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>}
              </button>
            </form>
          )}

          {step === 2 && (
            <form id="login-step2-form" onSubmit={handleLogin}>
              <div className="form-group">
                <label className="form-label">Password</label>
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
              <div style={{textAlign:'right', marginBottom:'18px', marginTop:'-6px'}}>
                <Link href="/forgot-password" style={{fontSize:'0.8125rem', color:'var(--cobalt-light)'}} onClick={closeLogin}>
                  Forgot password?
                </Link>
              </div>
              <button type="submit" id="login-submit-btn" className="login-btn" style={{width:'100%',justifyContent:'center'}} disabled={loading}>
                {loading
                  ? <><span className="spinner" /> Signing in...</>
                  : <>Sign in <svg className="arrow" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg></>
                }
              </button>
              <button type="button" className="modal-back-btn" onClick={() => { setStep(1); setPassword(''); setLoginError(''); }}>
                ← Use a different number
              </button>
            </form>
          )}

          <p className="modal-footer-text">
            Don&apos;t have an account?{' '}
            <Link href="/register" style={{color:'var(--cobalt-light)', fontWeight:600}} onClick={closeLogin}>
              Register here
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        /* ── Top Bar ── */
        .header-topbar {
          background: var(--surface);
          border-bottom: 1px solid var(--rule-light);
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
        .header-topbar-left  { display: flex; align-items: center; gap: 18px; }
        .header-topbar-right { display: flex; align-items: center; gap: 14px; }

        .topbar-link {
          font-size: 0.75rem;
          color: var(--muted);
          display: flex;
          align-items: center;
          gap: 5px;
          transition: color 0.2s;
          font-family: var(--font-mono);
        }
        .topbar-link:hover { color: var(--paper); }

        .topbar-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--emerald);
          background: rgba(16,185,129,0.08);
          border: 1px solid rgba(16,185,129,0.18);
          padding: 3px 10px;
          border-radius: var(--radius-full);
          letter-spacing: 0.01em;
        }
        .topbar-badge-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: var(--emerald);
          animation: pulse-glow 2s ease-in-out infinite;
          flex-shrink: 0;
        }

        .topbar-social { display: flex; align-items: center; gap: 8px; }
        .topbar-social-link {
          width: 26px; height: 26px;
          border-radius: var(--radius-sm);
          display: flex; align-items: center; justify-content: center;
          color: var(--muted);
          transition: color 0.2s, background 0.2s;
        }
        .topbar-social-link:hover { color: var(--paper); background: var(--rule); }

        /* ── Main Header ── */
        .main-header {
          background: rgba(13,15,20,0.80);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--rule-light);
          position: sticky;
          top: var(--header-top-h);
          z-index: 90;
          height: var(--header-main-h);
          display: flex;
          align-items: center;
          transition: background 0.3s var(--ease), border-color 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .main-header.scrolled {
          background: rgba(13,15,20,0.96);
          border-bottom-color: var(--rule);
          box-shadow: 0 1px 0 var(--rule), 0 4px 24px rgba(0,0,0,0.4);
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
          width: 36px; height: 36px;
          background: var(--cobalt);
          border-radius: var(--radius-md);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 12px rgba(37,99,235,0.35);
          flex-shrink: 0;
        }
        .logo-name {
          display: block;
          font-family: var(--font-body);
          font-weight: 800;
          font-size: 1.0625rem;
          color: var(--paper);
          line-height: 1.1;
          letter-spacing: -0.02em;
        }
        .logo-sub {
          display: block;
          font-size: 0.6rem;
          color: var(--muted);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-top: 1px;
        }

        /* Desktop Nav */
        .desktop-nav { display: flex; flex: 1; justify-content: center; }
        .nav-list { display: flex; align-items: center; gap: 2px; flex-wrap: nowrap; }
        .nav-item { position: relative; }

        .nav-link {
          display: flex;
          align-items: center;
          gap: 4px;
          padding: 7px 12px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--muted);
          border-radius: var(--radius-sm);
          transition: color 0.2s, background 0.2s;
          white-space: nowrap;
          border: none;
          background: none;
          cursor: pointer;
          text-decoration: none;
        }
        .nav-link:hover {
          color: var(--paper);
          background: var(--rule);
        }
        .nav-link:focus-visible {
          outline: 2px solid var(--cobalt-light);
          outline-offset: 2px;
        }

        .nav-chevron {
          opacity: 0.5;
          transition: transform 0.2s var(--ease), opacity 0.2s;
          flex-shrink: 0;
        }
        .nav-chevron.open { transform: rotate(180deg); opacity: 1; }
        .has-dropdown:hover .nav-link { color: var(--paper); }

        .nav-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          z-index: 200;
          animation: fadeInUp 0.15s var(--ease-out);
        }
        .nav-dropdown-inner {
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-md);
          padding: 6px;
          min-width: 180px;
          box-shadow: var(--shadow-lg);
        }

        /* Fix: dropdown items — proper flex layout, no icon overlap */
        .dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text);
          border-radius: var(--radius-sm);
          transition: background 0.15s, color 0.15s;
          white-space: nowrap;
          text-decoration: none;
          line-height: 1.4;
        }
        .dropdown-item-text {
          display: block;
          line-height: 1;
        }
        .dropdown-item:hover {
          background: var(--cobalt-glow);
          color: var(--cobalt-light);
        }

        /* Header Actions */
        .header-actions {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-shrink: 0;
        }

        /* Visual separator between Grades and Login */
        .actions-separator {
          display: block;
          width: 1px;
          height: 22px;
          background: var(--rule);
          flex-shrink: 0;
        }

        .grades-icon-btn {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 7px 14px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--text);
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .grades-icon-btn:hover { color: var(--cobalt-light); border-color: var(--cobalt-ring); background: var(--cobalt-glow); }
        .grades-icon-btn:focus-visible { outline: 2px solid var(--cobalt-light); outline-offset: 2px; }
        .grades-icon-label { font-size: 0.8125rem; font-weight: 600; }

        .login-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 18px;
          font-size: 0.875rem;
          font-weight: 600;
          color: white;
          background: var(--cobalt);
          border: none;
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
          text-decoration: none;
          white-space: nowrap;
          letter-spacing: -0.01em;
        }
        .login-btn:hover {
          background: var(--cobalt-dark);
          transform: translateY(-1px);
          box-shadow: var(--shadow-cobalt);
        }
        .login-btn:active { transform: translateY(0); }
        .login-btn:focus-visible { outline: 2px solid var(--cobalt-light); outline-offset: 2px; }
        .login-btn:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
        .login-btn .arrow { transition: transform 0.2s; }
        .login-btn:hover .arrow { transform: translateX(3px); }

        /* ── User Menu ── */
        .user-menu-wrap { position: relative; }

        .user-menu-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 5px 12px 5px 5px;
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-full);
          cursor: pointer;
          transition: var(--transition);
          color: var(--text);
          font-size: 0.875rem;
          font-weight: 500;
        }
        .user-menu-btn:hover { border-color: var(--cobalt-ring); background: var(--cobalt-glow); color: var(--paper); }

        .user-avatar {
          width: 30px; height: 30px;
          background: var(--cobalt);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.7rem;
          font-weight: 700;
          color: white;
          flex-shrink: 0;
          letter-spacing: 0.02em;
        }
        .user-avatar-sm { width: 36px; height: 36px; font-size: 0.8rem; }
        .user-name-text { font-weight: 600; max-width: 100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

        .user-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 210px;
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
          z-index: 200;
          animation: fadeInUp 0.15s var(--ease-out);
        }
        .user-dropdown-header {
          padding: 14px 16px 12px;
        }
        .user-dropdown-name {
          display: block;
          font-size: 0.9rem;
          font-weight: 700;
          color: var(--paper);
          letter-spacing: -0.01em;
        }
        .user-dropdown-role {
          display: block;
          font-size: 0.75rem;
          color: var(--muted);
          margin-top: 2px;
        }
        .user-dropdown-divider {
          height: 1px;
          background: var(--rule);
          margin: 0;
        }
        .user-dropdown-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 11px 16px;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text);
          background: none;
          border: none;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.15s, color 0.15s;
          text-align: left;
        }
        .user-dropdown-item:hover { background: var(--cobalt-glow); color: var(--cobalt-light); }
        .user-dropdown-logout { color: var(--muted); }
        .user-dropdown-logout:hover { background: rgba(239,68,68,0.08); color: #f87171; }

        .mobile-menu-btn {
          display: none;
          align-items: center;
          justify-content: center;
          width: 38px; height: 38px;
          color: var(--text);
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        .mobile-menu-btn:hover { color: var(--paper); border-color: var(--cobalt-ring); }

        .icon-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 34px; height: 34px;
          color: var(--muted);
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        .icon-btn:hover { color: var(--paper); background: var(--rule); }
        .icon-btn:focus-visible { outline: 2px solid var(--cobalt-light); outline-offset: 2px; }

        /* ── Mobile Menu ── */
        .mobile-menu {
          position: fixed;
          top: 0; right: -100%;
          width: min(340px, 92vw);
          height: 100dvh;
          background: var(--surface);
          border-left: 1px solid var(--rule);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transition: right 0.32s var(--ease);
          overflow-y: auto;
        }
        .mobile-menu.open { right: 0; }

        .mobile-menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 20px;
          border-bottom: 1px solid var(--rule);
          flex-shrink: 0;
        }

        .mobile-user-strip {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          background: var(--cobalt-glow);
          border-bottom: 1px solid var(--cobalt-ring);
          flex-shrink: 0;
        }
        .mobile-user-name { font-size: 0.9rem; font-weight: 700; color: var(--paper); }
        .mobile-user-role { font-size: 0.75rem; color: var(--muted); margin-top: 1px; }

        .mobile-contact-bar {
          padding: 12px 20px;
          border-bottom: 1px solid var(--rule-light);
          flex-shrink: 0;
        }
        .mobile-contact-link {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.8125rem;
          color: var(--muted);
          font-family: var(--font-mono);
          transition: color 0.2s;
        }
        .mobile-contact-link:hover { color: var(--paper); }

        .mobile-nav {
          flex: 1;
          padding: 8px 12px;
          overflow-y: auto;
        }
        .mobile-nav-item { border-bottom: 1px solid var(--rule-light); }
        .mobile-nav-item:last-child { border-bottom: none; }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 14px 8px;
          font-size: 0.9375rem;
          font-weight: 600;
          color: var(--paper);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
          transition: color 0.2s;
          letter-spacing: -0.01em;
        }
        .mobile-nav-link:hover { color: var(--cobalt-light); }
        .mobile-nav-link:focus-visible { outline: 2px solid var(--cobalt-light); outline-offset: -2px; border-radius: var(--radius-sm); }

        .mobile-chevron { transition: transform 0.22s var(--ease); opacity: 0.5; flex-shrink: 0; }
        .mobile-chevron.open { transform: rotate(180deg); opacity: 1; }

        .mobile-sub-links {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          padding: 8px 8px 14px;
        }
        .mobile-sub-link {
          font-size: 0.8rem;
          color: var(--muted);
          padding: 5px 12px;
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-full);
          transition: var(--transition);
        }
        .mobile-sub-link:hover { background: var(--cobalt-glow); color: var(--cobalt-light); border-color: var(--cobalt-ring); }

        .mobile-menu-footer {
          padding: 18px 20px;
          border-top: 1px solid var(--rule);
          flex-shrink: 0;
        }
        .logout-btn-mobile {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          padding: 10px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--muted);
          background: none;
          border: 1px solid var(--rule);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        .logout-btn-mobile:hover { color: #f87171; border-color: rgba(239,68,68,0.4); background: rgba(239,68,68,0.06); }

        /* ── Grades Sidebar ── */
        .grades-sidebar {
          position: fixed;
          top: 0; left: -100%;
          width: min(300px, 88vw);
          height: 100dvh;
          background: var(--surface);
          border-right: 1px solid var(--rule);
          z-index: 1000;
          display: flex;
          flex-direction: column;
          transition: left 0.32s var(--ease);
          overflow-y: auto;
        }
        .grades-sidebar.open { left: 0; }

        .grades-sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 20px;
          border-bottom: 1px solid var(--rule);
        }
        .grades-sidebar-body { padding: 12px; flex: 1; overflow-y: auto; }
        .grade-sidebar-item { margin-bottom: 8px; }
        .grade-sidebar-label {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: var(--radius-sm);
          color: var(--text);
          font-weight: 600;
          font-size: 0.9rem;
          transition: var(--transition);
          text-decoration: none;
        }
        .grade-sidebar-label:hover { background: var(--cobalt-glow); color: var(--cobalt-light); }
        .grade-sidebar-badge {
          width: 28px; height: 28px;
          display: flex; align-items: center; justify-content: center;
          background: var(--cobalt);
          color: white;
          border-radius: var(--radius-sm);
          font-size: 0.75rem;
          font-weight: 700;
          flex-shrink: 0;
        }
        .grade-sidebar-subjects {
          display: flex;
          flex-wrap: wrap;
          gap: 5px;
          padding: 4px 12px 8px 50px;
        }
        .grade-sidebar-sub {
          font-size: 0.75rem;
          color: var(--muted);
          padding: 3px 10px;
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-full);
          transition: var(--transition);
          text-decoration: none;
        }
        .grade-sidebar-sub:hover { background: var(--cobalt-glow); color: var(--cobalt-light); border-color: var(--cobalt-ring); }

        /* ── Overlay ── */
        .overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.5);
          z-index: 900;
          opacity: 0; pointer-events: none;
          transition: opacity 0.3s var(--ease);
          backdrop-filter: blur(2px);
        }
        .overlay.active { opacity: 1; pointer-events: auto; }

        /* ── Login Modal ── */
        .modal {
          position: fixed; inset: 0;
          z-index: 1100;
          display: flex; align-items: center; justify-content: center;
          padding: 20px;
          opacity: 0; pointer-events: none;
          transition: opacity 0.25s var(--ease);
        }
        .modal.active { opacity: 1; pointer-events: auto; }

        .modal-box {
          background: var(--surface);
          border: 1px solid var(--rule);
          border-radius: var(--radius-lg);
          padding: 32px;
          width: 100%;
          max-width: 420px;
          position: relative;
          box-shadow: var(--shadow-xl);
          animation: fadeInUp 0.25s var(--ease-out);
        }
        .modal-close {
          position: absolute; top: 16px; right: 16px;
          display: flex; align-items: center; justify-content: center;
          width: 28px; height: 28px;
          color: var(--muted);
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: var(--transition);
        }
        .modal-close:hover { color: var(--paper); background: var(--rule); }

        .modal-header { margin-bottom: 24px; }
        .modal-logo-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .modal-title { font-size: 1.375rem; font-weight: 800; color: var(--paper); letter-spacing: -0.02em; margin-bottom: 6px; }
        .modal-subtitle { font-size: 0.875rem; color: var(--muted); }

        .modal-steps {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 24px;
        }
        .modal-step { display: flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--muted); }
        .modal-step.active { color: var(--cobalt-light); }
        .modal-step-dot {
          width: 22px; height: 22px;
          border-radius: 50%;
          background: var(--surface-2);
          border: 1px solid var(--rule);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.72rem; font-weight: 700;
        }
        .modal-step.active .modal-step-dot { background: var(--cobalt); border-color: var(--cobalt); color: white; }
        .modal-step-line { flex: 1; height: 1px; background: var(--rule); }
        .modal-step-line.active { background: var(--cobalt); }

        .login-error {
          display: flex; align-items: flex-start; gap: 8px;
          padding: 10px 14px;
          background: rgba(239,68,68,0.08);
          border: 1px solid rgba(239,68,68,0.2);
          border-radius: var(--radius-sm);
          font-size: 0.8125rem;
          color: #f87171;
          margin-bottom: 18px;
        }

        .form-group { margin-bottom: 18px; }
        .form-label { display: block; font-size: 0.8125rem; font-weight: 600; color: var(--text); margin-bottom: 7px; letter-spacing: 0.01em; }
        .form-input {
          width: 100%; padding: 10px 14px;
          background: var(--surface-2);
          border: 1px solid var(--rule);
          border-radius: var(--radius-sm);
          color: var(--paper); font-size: 0.9375rem;
          font-family: var(--font-body);
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
          box-sizing: border-box;
        }
        .form-input:focus { border-color: var(--cobalt-ring); box-shadow: 0 0 0 3px var(--cobalt-glow); }
        .form-input::placeholder { color: var(--muted); }

        .modal-back-btn {
          display: block; width: 100%; margin-top: 12px;
          font-size: 0.8125rem; color: var(--muted);
          background: none; border: none; cursor: pointer;
          text-align: center; transition: color 0.2s;
        }
        .modal-back-btn:hover { color: var(--paper); }
        .modal-footer-text { margin-top: 20px; text-align: center; font-size: 0.8125rem; color: var(--muted); }

        .spinner {
          display: inline-block; width: 12px; height: 12px;
          border: 2px solid rgba(255,255,255,0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        /* Responsive */
        @media (max-width: 900px) {
          .desktop-nav { display: none; }
          .grades-icon-btn { display: none; }
          .actions-separator { display: none; }
          .mobile-menu-btn { display: flex; }
          .user-name-text { display: none; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(16,185,129,0.4); }
          50%       { opacity: 0.7; box-shadow: 0 0 0 4px rgba(16,185,129,0); }
        }
      `}</style>
    </>
  );
}
