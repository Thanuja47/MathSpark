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
  
  // Step 1: Info, Step 2: Password, Step 3: OTP Verification
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [grade, setGrade] = useState('10');
  const [medium, setMedium] = useState('sinhala');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // OTP state
  const [otpCode, setOtpCode] = useState('');
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [otpMsg, setOtpMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleStep1 = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) { setError('Please enter a valid WhatsApp number.'); return; }
    if (!name.trim()) { setError('Please enter your full name.'); return; }
    setError('');
    setStep(2);
  };

  const handleSendOtpAndProceed = async (e) => {
    e.preventDefault();
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return; }
    if (password !== confirmPassword) { setError('Passwords do not match.'); return; }
    setError('');
    
    setSendingOtp(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP.');
      
      setOtpMsg('✅ Verification code sent to your WhatsApp / Phone via SMS.');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    setError('');
    setOtpMsg('');
    setSendingOtp(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to resend OTP.');
      setOtpMsg('✅ A new 6-digit OTP code has been sent via SMS.');
    } catch (err) {
      setError(err.message);
    } finally {
      setSendingOtp(false);
    }
  };

  const handleVerifyOtpAndRegister = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setError('');
    setVerifyingOtp(true);

    try {
      // 1. Verify OTP
      const verifyRes = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otpCode }),
      });
      const verifyData = await verifyRes.json();
      if (!verifyRes.ok) throw new Error(verifyData.error || 'Invalid OTP code.');

      // 2. Perform Account Registration
      const result = await performRegister({
        name,
        phone,
        grade: parseInt(grade, 10),
        medium,
        password
      });

      if (result.success) {
        setSuccess(true);
      } else {
        throw new Error(result.error || 'Registration failed.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setVerifyingOtp(false);
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

            {/* Step Indicators */}
            {!success && (
              <div style={{ display: 'flex', gap: 8, margin: '20px 0 24px' }}>
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: step >= 1 ? 'var(--primary)' : 'var(--border-dark)' }} />
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: step >= 2 ? 'var(--primary)' : 'var(--border-dark)' }} />
                <div style={{ flex: 1, height: 4, borderRadius: 2, background: step >= 3 ? 'var(--primary)' : 'var(--border-dark)' }} />
              </div>
            )}

            {error && (
              <div className="alert alert-error" style={{ marginBottom: 20 }}>
                ⚠️ {error}
              </div>
            )}

            {otpMsg && (
              <div className="alert alert-success" style={{ marginBottom: 20, background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
                {otpMsg}
              </div>
            )}

            {success ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: '800', marginBottom: 8 }}>Registration Complete!</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Your account has been verified and activated. Welcome to MathSpark!</p>
                <Link href="/my-account" className="btn btn-primary btn-full">
                  Go to Student Dashboard →
                </Link>
              </div>
            ) : step === 1 ? (
              <form onSubmit={handleStep1}>
                <div className="form-group">
                  <label className="form-label">{t('auth.fullName')}</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. Kasun Perera"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('auth.whatsappNumber')}</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="07X XXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                  <p className="field-help">SMS OTP will be sent to verify this phone number.</p>
                </div>

                <div className="form-row">
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">{t('auth.grade')}</label>
                    <select className="form-input" value={grade} onChange={(e) => setGrade(e.target.value)}>
                      {[6,7,8,9,10,11].map(g => <option key={g} value={g}>Grade {g}</option>)}
                    </select>
                  </div>
                  <div className="form-group" style={{ flex: 1 }}>
                    <label className="form-label">{t('auth.medium')}</label>
                    <select className="form-input" value={medium} onChange={(e) => setMedium(e.target.value)}>
                      <option value="sinhala">Sinhala Medium</option>
                      <option value="english">English Medium</option>
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary btn-full">
                  Next Step →
                </button>
              </form>
            ) : step === 2 ? (
              <form onSubmit={handleSendOtpAndProceed}>
                <div className="form-group">
                  <label className="form-label">{t('auth.createPassword')}</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="At least 6 characters"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('auth.confirmPassword')}</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Repeat password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={sendingOtp}>
                    {sendingOtp ? 'Sending OTP SMS...' : 'Send SMS OTP Code →'}
                  </button>
                </div>
              </form>
            ) : (
              /* Step 3: SMS OTP Verification Screen */
              <form onSubmit={handleVerifyOtpAndRegister}>
                <div style={{ textAlign: 'center', marginBottom: 20 }}>
                  <span style={{ fontSize: '2.5rem' }}>📱</span>
                  <h3 style={{ color: '#fff', fontSize: '1.2rem', margin: '8px 0 4px' }}>SMS Verification Required</h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                    Enter the 6-digit OTP code sent to <strong>{phone}</strong>
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label" style={{ textAlign: 'center', display: 'block' }}>6-Digit SMS Verification Code</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="123456"
                    maxLength={6}
                    style={{ textAlign: 'center', fontSize: '1.5rem', letterSpacing: '8px', fontWeight: '800' }}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>

                <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
                  <button type="button" className="btn btn-outline btn-sm" style={{ flex: 1 }} onClick={handleResendOtp} disabled={sendingOtp}>
                    {sendingOtp ? 'Resending...' : 'Resend SMS OTP'}
                  </button>
                </div>

                <button type="submit" className="btn btn-primary btn-full" disabled={verifyingOtp || loading}>
                  {verifyingOtp || loading ? 'Verifying & Creating Account...' : 'Verify OTP & Complete Registration'}
                </button>

                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => setStep(2)}>
                    ← Change Password / Details
                  </button>
                </div>
              </form>
            )}

            <div className="register-footer" style={{ marginTop: 24, textAlign: 'center' }}>
              <p className="text-secondary text-sm">
                Already have an account? <Link href="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>Log In</Link>
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
