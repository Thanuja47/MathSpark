'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { useLanguage } from '@/context/LanguageContext';

export default function ForgotPasswordPage() {
  const { t } = useLanguage();
  
  // Step 1: Phone Entry, Step 2: OTP Verification, Step 3: Set New Password
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [resetComplete, setResetComplete] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length < 9) {
      setError('Please enter a valid WhatsApp phone number.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send OTP.');

      setSuccessMsg('✅ Verification OTP code sent via SMS to your phone.');
      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otpCode || otpCode.length !== 6) {
      setError('Please enter the 6-digit verification code.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, code: otpCode }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Invalid OTP code.');

      setSuccessMsg('✅ OTP verified successfully! Enter your new password below.');
      setStep(3);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to reset password.');

      setResetComplete(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '85vh', display: 'flex', alignItems: 'center' }}>
        <div className="container" style={{ padding: '60px 24px' }}>
          <div className="register-box" style={{ maxWidth: 460, margin: '0 auto' }}>
            <div className="register-header">
              <div className="register-logo">🔒</div>
              <h2>{t('auth.forgotTitle')}</h2>
              <p className="text-secondary text-sm" style={{ marginTop: 8 }}>
                {t('auth.forgotSubtitle')}
              </p>
            </div>

            {error && (
              <div className="alert alert-error" style={{ marginBottom: 20 }}>
                ⚠️ {error}
              </div>
            )}

            {successMsg && !resetComplete && (
              <div className="alert alert-success" style={{ marginBottom: 20, background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
                {successMsg}
              </div>
            )}

            {resetComplete ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>✅</div>
                <h3 style={{ color: '#fff', fontSize: '1.3rem', fontWeight: '800', marginBottom: 8 }}>{t('auth.resetSuccessTitle')}</h3>
                <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>{t('auth.resetSuccessDesc')}</p>
                <Link href="/login" className="btn btn-primary btn-full">
                  {t('auth.goToLogin')} →
                </Link>
              </div>
            ) : step === 1 ? (
              <form onSubmit={handleSendOtp}>
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
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? t('auth.sendingOtp') : `${t('auth.sendOtpBtn')} →`}
                </button>
              </form>
            ) : step === 2 ? (
              <form onSubmit={handleVerifyOtp}>
                <div className="form-group">
                  <label className="form-label" style={{ textAlign: 'center', display: 'block' }}>{t('auth.enterOtpLabel')}</label>
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
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? t('auth.verifyingOtp') : `${t('auth.verifyOtpBtn')} →`}
                </button>
                <div style={{ textAlign: 'center', marginTop: 16 }}>
                  <button type="button" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }} onClick={() => setStep(1)}>
                    ← {t('auth.changePhone')}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleResetPassword}>
                <div className="form-group">
                  <label className="form-label">{t('auth.newPasswordLabel')}</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder={t('auth.newPasswordPlaceholder')}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">{t('auth.confirmPasswordLabel')}</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder={t('auth.confirmPasswordPlaceholder')}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary btn-full" disabled={loading}>
                  {loading ? t('auth.updatingPassword') : `${t('auth.resetPasswordBtn')} ✅`}
                </button>
              </form>
            )}

            <div className="register-footer" style={{ marginTop: 24, textAlign: 'center' }}>
              <p className="text-secondary text-sm">
                {t('auth.rememberPassword')} <Link href="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>{t('nav.login')}</Link>
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
