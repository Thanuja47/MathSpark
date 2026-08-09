'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { SITE } from '@/lib/data';

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) { setError('Please enter a valid WhatsApp number.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 900);
  };

  const handleVerify = (e) => {
    e.preventDefault();
    if (otp.length < 4) { setError('Please enter the 4-digit OTP sent to your WhatsApp.'); return; }
    setError('');
    setStep(3);
  };

  const handleReset = (e) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { setError('Passwords do not match.'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess(true); }, 1000);
  };

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ padding: '60px 24px' }}>
          <div className="register-box">
            <div className="register-header">
              <div className="register-logo">🔐</div>
              <h2>Reset Your <span className="theme-gradient">Password</span></h2>
              <p className="text-secondary text-sm" style={{ marginTop: 8 }}>
                We&apos;ll send a one-time code to your WhatsApp to verify your identity.
              </p>
            </div>

            {error && <div className="login-error">⚠️ {error}</div>}

            {success ? (
              <div className="text-center" style={{ padding: '20px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ marginBottom: 8 }}>Password Reset!</h3>
                <p className="text-secondary text-sm">Your password has been updated. You can now log in with your new password.</p>
                <Link href="/" className="btn btn-primary" style={{ marginTop: 24 }}>
                  Back to Homepage →
                </Link>
              </div>
            ) : step === 1 ? (
              <form onSubmit={handleSendOtp}>
                <div className="form-group">
                  <label className="form-label">Your Registered WhatsApp Number</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>+94</span>
                    <input type="number" className="form-input" placeholder="712 345 678"
                      style={{ paddingLeft: 52 }}
                      value={phone}
                      onChange={e => { if (e.target.value.length <= 10) setPhone(e.target.value); setError(''); }}
                      required autoFocus />
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Sending OTP...' : 'Send OTP via WhatsApp 💬'}
                </button>
              </form>
            ) : step === 2 ? (
              <form onSubmit={handleVerify}>
                <p className="text-secondary text-sm" style={{ marginBottom: 20 }}>
                  An OTP has been sent to <strong>+94 {phone}</strong> via WhatsApp. Enter it below.
                </p>
                <div className="form-group">
                  <label className="form-label">One-Time Password (OTP)</label>
                  <input type="number" className="form-input" placeholder="Enter 4-digit OTP"
                    value={otp}
                    onChange={e => { if (e.target.value.length <= 4) setOtp(e.target.value); setError(''); }}
                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '0.3em' }}
                    autoFocus required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                  Verify OTP →
                </button>
                <button type="button" className="btn btn-ghost" style={{ width: '100%', marginTop: 10 }}
                  onClick={() => setStep(1)}>
                  ← Change Number
                </button>
              </form>
            ) : (
              <form onSubmit={handleReset}>
                <div className="form-group">
                  <label className="form-label">New Password</label>
                  <input type="password" className="form-input" placeholder="At least 6 characters"
                    value={password} onChange={e => { setPassword(e.target.value); setError(''); }} required autoFocus />
                </div>
                <div className="form-group">
                  <label className="form-label">Confirm New Password</label>
                  <input type="password" className="form-input" placeholder="Re-enter new password"
                    value={confirm} onChange={e => { setConfirm(e.target.value); setError(''); }} required />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
                  {loading ? 'Updating...' : 'Reset Password 🔐'}
                </button>
              </form>
            )}

            {!success && (
              <div className="text-center text-sm text-muted" style={{ marginTop: 24 }}>
                <p style={{ margin: '0 0 8px' }}>
                  Remember your password?{' '}
                  <Link href="/" style={{ color: 'var(--primary-light)', fontWeight: 600 }}>Login here</Link>
                </p>
                <p style={{ margin: 0, fontSize: '0.8rem' }}>
                  Need immediate help?{' '}
                  <a href={`https://wa.me/${SITE.whatsapp}?text=Hi%20MathSpark,%20I%20need%20help%20resetting%20my%20password.`}
                    target="_blank" rel="noreferrer"
                    style={{ color: '#25D366', fontWeight: 600 }}>
                    Contact WhatsApp Support 💬
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .register-box {
          max-width: 440px;
          margin: 0 auto;
          background: var(--dark-2);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 48px 40px;
        }
        .register-header { text-align: center; margin-bottom: 32px; }
        .register-logo {
          width: 52px; height: 52px;
          background: var(--dark-3);
          border: 1px solid var(--border);
          border-radius: 14px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 16px;
        }
        .login-error {
          background: rgba(255,60,60,0.1); border: 1px solid rgba(255,60,60,0.2);
          border-radius: var(--radius-md); padding: 12px 16px;
          font-size: 0.875rem; color: #FF6B6B; margin-bottom: 20px;
        }
        @media (max-width: 480px) { .register-box { padding: 32px 20px; } }
      `}</style>
    </>
  );
}
