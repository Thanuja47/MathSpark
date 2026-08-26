'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import en from '@/lib/translations/en.json';
import si from '@/lib/translations/si.json';

const translations = { en, si };

const LanguageContext = createContext();

function getInitialLanguage() {
  if (typeof window !== 'undefined') {
    try {
      const match = document.cookie.match(/(?:^|;\s*)mathspark_lang=(en|si)/);
      if (match) return match[1];
      const saved = localStorage.getItem('mathspark_lang');
      if (saved === 'en' || saved === 'si') return saved;
    } catch (e) {}
  }
  return 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLanguage);

  const toggleLanguage = () => {
    const nextLang = lang === 'en' ? 'si' : 'en';
    setLang(nextLang);
    try {
      document.cookie = `mathspark_lang=${nextLang}; path=/; max-age=31536000; SameSite=Lax`;
      localStorage.setItem('mathspark_lang', nextLang);
    } catch (e) {}
  };

  const t = (key) => {
    const keys = key.split('.');
    let val = translations[lang];
    for (const k of keys) {
      if (val && val[k] !== undefined) {
        val = val[k];
      } else {
        // Fallback to English if missing in Sinhala
        let fallbackVal = translations['en'];
        for (const fk of keys) {
          if (fallbackVal && fallbackVal[fk] !== undefined) {
            fallbackVal = fallbackVal[fk];
          } else {
            return key;
          }
        }
        return fallbackVal;
      }
    }
    return val;
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
