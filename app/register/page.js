'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import useAuth from '@/hooks/useAuth';
import { useLanguage } from '@/context/LanguageContext';

export default function RegisterPage() {
  const { t } = useLanguage();
  const { register: performRegister, error, setError, loading } = useAuth();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('10');
  const [medium, setMedium] = useState('sinhala');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) { setError('Please enter a valid WhatsApp number.'); return; }
    if (!name.trim()) { setError('Please enter your full name.'); return; }
    setError('');
    setStep(2);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setError('');
    
    const result = await performRegister({
      name,
      phone,
      grade: parseInt(grade, 10),
      medium,
      password
    });
    
    if (result.success) {
      setSuccess(true);
    }
  };

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ padding: '60px 24px' }}>
          <div className="register-box">
            <div className="register-header">
              <div className="register-logo">⚡</div>
              <h2>{t('auth.registerTitle')}</h2>
              <p className="text-secondary text-sm" style={{ marginTop: 8 }}>Join 5,200+ students mastering Maths across Sri Lanka</p>
            </div>

            {/* Step Indicator */}
            {!success && (
              <div className="register-steps">
                <div className={`reg-step ${step >= 1 ? 'active' : ''}`}>
                  <div className="reg-step-dot">1</div>
                  <span>Your Info</span>
                </div>
                <div className="reg-step-line" />
                <div className={`reg-step ${step >= 2 ? 'active' : ''}`}>
                  <div className="reg-step-dot">2</div>
                  <span>Set Password</span>
                </div>
              </div>
            )}

            {error && (
              <div className="login-error">⚠️ {error}</div>
            )}

            {success ? (
              <div className="text-center" style={{ padding: '20px 0' }}>
                <div style={{ fontSize: '3.5rem', marginBottom: 16 }}>🎉</div>
                <h3 style={{ marginBottom: 8 }}>Welcome to MathSpark!</h3>
                <p className="text-secondary text-sm">Your account has been created. You can now log in and start learning.</p>
                <Link href="/" className="btn btn-primary" style={{ marginTop: 24 }}>
                  Go to Homepage →
                </Link>
              </div>
            ) : step === 1 ? (
              <form onSubmit={handleStep1}>
                <div className="form-group">
                  <label className="form-label">{t('auth.nameLabel')}</label>
                  <input type="text" className="form-input" placeholder="Ex: Kavindi Perera"
                    value={name} onChange={e => { setName(e.target.value); setError(''); }} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.phoneLabel')}</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>+94</span>
                    <input type="number" className="form-input" placeholder="712 345 678"
                      style={{ paddingLeft: 52 }}
                      value={phone}
                      onChange={e => { if (e.target.value.length <= 10) setPhone(e.target.value); setError(''); }}
                      required />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">{t('auth.gradeLabel')}</label>
                    <select className="form-input" value={grade} onChange={e => setGrade(e.target.value)}>
                      {[6, 7, 8, 9, 10, 11].map(g => <option key={g} value={g}>Grade {g}</option>)}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Medium</label>
                    <select className="form-input" value={medium} onChange={e => setMedium(e.target.value)}>
                      <option value="sinhala">Sinhala Medium</option>
                      <option value="english">English Medium</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  {t('auth.registerBtn').split(' ')[0]} →
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister}>
                <div className="form-group">
                  <label className="form-label">WhatsApp Number (confirmed)</label>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                    <span>+94 {phone}</span>
                    <button type="button" style={{ fontSize: '0.8rem', color: 'var(--primary-light)', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={() => { setStep(1); setError(''); }}>Change</button>
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.passwordLabel')}</label>
                  <input type="password" className="form-input" placeholder="At least 6 characters"
                    value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.passwordLabel')} (Confirm)</label>
                  <input type="password" className="form-input" placeholder="Re-enter your password"
                    value={confirmPassword} onChange={e => { setConfirmPassword(e.target.value); setError(''); }} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? t('common.loading') : t('auth.registerBtn')}
                </button>
              </form>
            )}

            {!success && (
              <p className="text-center text-sm text-muted" style={{ marginTop: 24 }}>
                {t('auth.alreadyHaveAccount').split('?')[0]}?{' '}
                <span style={{ color: 'var(--primary-light)', fontWeight: 600, cursor: 'pointer' }}>{t('auth.signInBtn')}</span>
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .register-box {
          max-width: 480px;
          margin: 0 auto;
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 48px 40px;
        }
        .register-header { text-align: center; margin-bottom: 32px; }
        .register-logo {
          width: 52px; height: 52px;
          background: var(--gradient-blue);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 16px;
          box-shadow: 0 4px 20px rgba(0,82,255,0.4);
        }
        .register-steps {
          display: flex; align-items: center; justify-content: center;
          gap: 0;
          margin-bottom: 28px;
        }
        .reg-step { display: flex; align-items: center; flex-direction: column; gap: 4px; }
        .reg-step-dot {
          width: 32px; height: 32px;
          border-radius: 50%;
          background: var(--dark-3);
          border: 2px solid var(--border);
          display: flex; align-items: center; justify-content: center;
          font-size: 0.8rem; font-weight: 700;
          color: var(--text-muted);
          transition: var(--transition);
        }
        .reg-step.active .reg-step-dot {
          background: var(--gradient-blue);
          border-color: var(--primary);
          color: white;
          box-shadow: 0 0 12px rgba(0,82,255,0.4);
        }
        .reg-step span { font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .reg-step.active span { color: var(--primary-light); }
        .reg-step-line { width: 60px; height: 2px; background: var(--border); margin-bottom: 16px; }
        .login-error {
          background: rgba(255,60,60,0.1); border: 1px solid rgba(255,60,60,0.2);
          border-radius: var(--radius-md); padding: 12px 16px;
          font-size: 0.875rem; color: #FF6B6B; margin-bottom: 20px;
        }
        @media (max-width: 520px) {
          .register-box { padding: 32px 24px; }
        }
      `}</style>
    </>
  );
}
