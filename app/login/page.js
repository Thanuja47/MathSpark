'use client';
import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { login as loginService } from '@/services/authService';
import { useLanguage } from '@/context/LanguageContext';
import { LogIn, Phone, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const { t } = useLanguage();
  const [phone, setPhone]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await loginService(phone, password);
      if (res.user) {
        window.location.href = res.user.role === 'admin' ? '/admin' : '/my-account';
      } else {
        throw new Error(res.error || 'Login failed. Please check your details.');
      }
    } catch (err) {
      setError(err.message || 'Incorrect WhatsApp number or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', padding: '60px 0', background: 'var(--dark)' }}>
        <div className="container">
          <div style={{ maxWidth: '440px', margin: '0 auto', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '24px', padding: '36px 32px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(12px)' }}>
            
            {/* Header */}
            <div style={{ textAlign: 'center', marginBottom: 28 }}>
              <div style={{ display: 'inline-flex', padding: 14, background: 'rgba(37, 99, 235, 0.12)', borderRadius: '50%', color: '#3b82f6', marginBottom: 16 }}>
                <LogIn size={32} />
              </div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '800', color: '#fff', margin: '0 0 6px' }}>
                Student & Admin Login
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
                Enter your WhatsApp number & password to access your dashboard.
              </p>
            </div>

            {error && (
              <div className="alert alert-error" style={{ marginBottom: 20, background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.88rem' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group" style={{ marginBottom: 18 }}>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, fontSize: '0.88rem', color: '#cbd5e1' }}>
                  <Phone size={15} />
                  <span>WhatsApp Phone Number</span>
                </label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="07X XXXXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 18 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.88rem', color: '#cbd5e1', margin: 0 }}>
                    <Lock size={15} />
                    <span>Password</span>
                  </label>
                  <Link href="/forgot-password" style={{ fontSize: '0.8rem', color: '#3b82f6', textDecoration: 'none' }}>
                    Forgot Password?
                  </Link>
                </div>
                <input
                  type="password"
                  className="form-input"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-full"
                disabled={loading}
                style={{ width: '100%', padding: '14px', borderRadius: '12px', background: 'linear-gradient(135deg, #2563eb, #1d4ed8)', border: 'none', color: '#fff', fontWeight: '700', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 24, boxShadow: '0 4px 15px rgba(37, 99, 235, 0.35)' }}
              >
                <span>{loading ? 'Signing In...' : 'Log In to Dashboard'}</span>
                <ArrowRight size={18} />
              </button>
            </form>

            {/* Footer options */}
            <div style={{ textAlign: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
              Don&apos;t have an account yet?{' '}
              <Link href="/register" style={{ color: '#3b82f6', fontWeight: '700', textDecoration: 'none' }}>
                Register Free
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
