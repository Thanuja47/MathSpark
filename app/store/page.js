'use client';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { STORE_ITEMS } from '@/lib/data';

export default function StorePage() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero">
          <div className="container">
            <div className="breadcrumb">
              <a href="/">Home</a> <span>/</span> <span>Store</span>
            </div>
            <div className="section-tag page-hero-tag">Study Materials &amp; Tutes</div>
            <h1 className="page-hero-title">
              MatSpark <span className="theme-gradient">Store</span>
            </h1>
            <p className="page-hero-desc">
              Get official revision books, formula sheets, workbooks, and past paper packs delivered to your doorstep.
            </p>
          </div>
        </section>

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="store-grid">
              {STORE_ITEMS.map((item) => (
                <div key={item.id} className="store-card">
                  <div className="store-card-image">
                    <div className="store-img-placeholder">
                      <span>📖</span>
                      <div className="store-type-badge">{item.type.toUpperCase()}</div>
                    </div>
                    {item.badge && (
                      <div className="store-card-badge">{item.badge}</div>
                    )}
                  </div>
                  <div className="store-card-body">
                    <h4 className="store-card-title">{item.title}</h4>
                    <p className="store-card-desc">{item.description}</p>
                    <div className="store-price-row">
                      <span className="store-price">{item.currency} {item.price.toLocaleString()}</span>
                      {item.originalPrice && (
                        <span className="store-original-price">{item.currency} {item.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                  </div>
                  <div className="store-card-footer">
                    <button
                      className="btn btn-primary"
                      style={{ width: '100%' }}
                      disabled={!item.inStock}
                    >
                      {item.inStock ? 'Order Now 🛒' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingWidgets />
      <style jsx>{`
        .store-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }
        .store-img-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, var(--surface), var(--surface-2));
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem;
          position: relative;
        }
        /* Subtle signature graph paper overlay */
        .store-img-placeholder::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 14px 14px;
          pointer-events: none;
        }
        .store-type-badge {
          position: absolute;
          bottom: 8px; right: 8px;
          font-size: 0.625rem; font-weight: 700;
          background: var(--ink);
          border: 1px solid var(--rule);
          padding: 3px 8px; border-radius: var(--radius-xs);
          color: var(--muted);
          font-family: var(--font-mono);
          letter-spacing: 0.05em;
        }
        .store-card-badge {
          position: absolute;
          top: 10px; left: 10px;
          font-size: 0.65rem; font-weight: 700;
          background: var(--gold-glow);
          border: 1px solid rgba(245,158,11,0.3);
          color: var(--gold);
          padding: 3px 10px; border-radius: var(--radius-full);
          letter-spacing: 0.05em;
        }
        @media (max-width: 1024px) {
          .store-grid { grid-template-columns: repeat(2, 1fr); }
        }
        @media (max-width: 580px) {
          .store-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
