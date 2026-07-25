'use client';
import { useState, useEffect } from 'react';
import { SITE } from '@/lib/data';

export default function FloatingWidgets() {
  const [showBackTop, setShowBackTop] = useState(false);
  const [scrollPct, setScrollPct]    = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total    = document.body.scrollHeight - window.innerHeight;
      setScrollPct(total > 0 ? (scrolled / total) * 100 : 0);
      setShowBackTop(scrolled > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="scroll-progress"
        style={{ width: `${scrollPct}%` }}
        aria-hidden="true"
      />

      {/* WhatsApp float */}
      <a
        id="whatsapp-float"
        href={`https://wa.me/${SITE.whatsapp}?text=Hi%2C%20I%27m%20interested%20in%20MatSpark%20classes!`}
        target="_blank"
        rel="noreferrer"
        className="whatsapp-float"
        aria-label="Chat on WhatsApp"
      >
        <svg width="26" height="26" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.533 5.856L.057 23.571a.5.5 0 00.61.61l5.736-1.485A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.94a9.923 9.923 0 01-5.065-1.381l-.363-.215-3.76.974.998-3.649-.236-.374A9.94 9.94 0 012.06 12C2.06 6.504 6.504 2.06 12 2.06S21.94 6.504 21.94 12 17.496 21.94 12 21.94z"/>
        </svg>
      </a>

      {/* Back to top */}
      <button
        id="back-to-top"
        className={`back-to-top ${showBackTop ? 'visible' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
      >
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <polyline points="18 15 12 9 6 15"/>
        </svg>
      </button>
    </>
  );
}
