'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { useLanguage } from '@/context/LanguageContext';

export default function PolicyPage() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="section-tag page-hero-tag">{t('legal.termsTag')}</div>
            <h1 className="page-hero-title">
              {t('legal.termsTitle')} <span className="theme-gradient">{t('legal.termsTitleHighlight')}</span> {t('legal.termsTagline')}
            </h1>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container" style={{ maxWidth: '800px' }}>
            <div className="policy-box">
              <h3>{t('legal.terms1Heading')}</h3>
              <p>
                {t('legal.terms1Body1')}
              </p>
              <p>
                {t('legal.terms1Body2')}
              </p>

              <h3 style={{ marginTop: 32 }}>{t('legal.terms2Heading')}</h3>
              <p>
                {t('legal.terms2Body1')}
              </p>
              <p>
                {t('legal.terms2Body2')}
              </p>

              <h3 style={{ marginTop: 32 }}>{t('legal.terms3Heading')}</h3>
              <p>
                {t('legal.terms3Body1')}
              </p>
              <p>
                {t('legal.terms3Body2')}
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
