'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPolicyPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">{t('legal.privacyTag')}</div>
            <h1 className="page-hero-title">
              {t('legal.privacyTitle')} <span className="theme-gradient">{t('legal.privacyTitleHighlight')}</span>
            </h1>
            <p className="page-hero-desc">
              {t('legal.privacyDesc')}
            </p>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="policy-box">
              <h3>{t('legal.privacy1Heading')}</h3>
              <p>
                {t('legal.privacy1Body')}
              </p>

              <h3 style={{ marginTop: 32 }}>{t('legal.privacy2Heading')}</h3>
              <p>
                {t('legal.privacy2Body')}
              </p>

              <h3 style={{ marginTop: 32 }}>{t('legal.privacy3Heading')}</h3>
              <p>
                {t('legal.privacy3Body')}
              </p>

              <h3 style={{ marginTop: 32 }}>{t('legal.privacy4Heading')}</h3>
              <p>
                {t('legal.privacy4Body')}
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .policy-box {
          background: var(--dark-card);
          border: 1px solid var(--border);
          border-radius: var(--radius-xl);
          padding: 40px;
          line-height: 1.8;
          color: var(--text-secondary);
        }
        .policy-box h3 { color: var(--text-primary); margin-bottom: 12px; }
      `}</style>
    </>
  );
}
