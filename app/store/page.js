'use client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingWidgets from '@/components/FloatingWidgets';
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
          background: linear-gradient(135deg, #1A1F35, #0D1230);
          display: flex; align-items: center; justify-content: center;
          font-size: 3rem;
          position: relative;
        }
        .store-type-badge {
          position: absolute;
          bottom: 8px; right: 8px;
          font-size: 0.65rem; font-weight: 700;
          background: rgba(0,0,0,0.4);
          padding: 2px 8px; border-radius: 4px;
          color: var(--text-muted);
        }
        .store-card-badge {
          position: absolute;
          top: 10px; left: 10px;
          font-size: 0.7rem; font-weight: 700;
          background: var(--accent);
          color: white;
          padding: 3px 10px; border-radius: 100px;
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
