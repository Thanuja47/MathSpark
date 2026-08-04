'use client';
import { SITE } from '@/lib/data';
import { useLanguage } from '@/context/LanguageContext';

export default function AccessLockedModal({ grade, onClose }) {
  const { t } = useLanguage();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#181a20',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          padding: '32px 28px',
          maxWidth: '440px',
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 20px 50px rgba(0,0,0,0.6)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔒</div>
        <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '12px' }}>
          {t('common.accessRequired')} (Grade {grade})
        </h3>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '24px' }}>
          {t('common.requiredGradeAccess')}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <a
            href={`https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(`Hi, I am requesting access to Grade ${grade} content on MathSpark.`)}`}
            target="_blank"
            rel="noreferrer"
            className="btn btn-accent btn-lg"
            style={{ width: '100%', justifyContent: 'center', fontWeight: 600, textDecoration: 'none' }}
          >
            💬 {t('common.contactViaWhatsApp')}
          </a>

          <button
            onClick={onClose}
            className="btn btn-outline"
            style={{ width: '100%', justifyContent: 'center', color: 'rgba(255,255,255,0.7)' }}
          >
            {t('common.close')}
          </button>
        </div>
      </div>
    </div>
  );
}
