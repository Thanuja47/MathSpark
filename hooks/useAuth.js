'use client';
import { useState, useEffect } from 'react';
import { login, register, getMe } from '@/services/authService';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function checkAuth() {
      try {
        const data = await getMe();
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (err) {
        console.error('Failed to restore auth session:', err);
      } finally {
        setLoading(false);
      }
    }
    checkAuth();
  }, []);

  const handleLogin = async (phone, password) => {
    setLoading(true);
    setError(null);
    try {
      const data = await login(phone, password);
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        setError(data.error || 'Login failed.');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('An error occurred during login.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (studentData) => {
    setLoading(true);
    setError(null);
    try {
      const data = await register(studentData);
      if (data.success && data.user) {
        setUser(data.user);
        return { success: true, user: data.user };
      } else {
        setError(data.error || 'Registration failed.');
        return { success: false, error: data.error };
      }
    } catch (err) {
      setError('An error occurred during registration.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    // Remove client side cookie if any, or reload window to clear server cookies
    document.cookie = 'auth_token=; Max-Age=0; path=/;';
    window.location.href = '/';
  };

  return {
    user,
    loading,
    error,
    login: handleLogin,
    register: handleRegister,
    logout,
    setError
  };
}
