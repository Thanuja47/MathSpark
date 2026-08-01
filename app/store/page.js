'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { STORE_ITEMS as STATIC_STORE_ITEMS } from '@/lib/data';

export default function StorePage() {
  const [storeItems, setStoreItems] = useState(STATIC_STORE_ITEMS);
  const [orderingItem, setOrderingItem] = useState(null);
  const [studentName, setStudentName] = useState('');
  const [studentPhone, setStudentPhone] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    fetch('/api/store')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const liveFormatted = data.map(item => ({
            id: item.id,
            title: item.name,
            type: 'Tute Pack',
            price: item.price,
            currency: 'LKR',
            inStock: (item.stock || 0) > 0,
            badge: 'Official',
            description: item.description || 'Official MathSpark print edition tute pack.',
          }));
          setStoreItems([...liveFormatted, ...STATIC_STORE_ITEMS]);
        }
      })
      .catch(err => console.error('Error fetching store items:', err));
  }, []);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!studentName || !studentPhone || !orderingItem) return;

    const trackId = `MSP-${Math.floor(1000 + Math.random() * 9000)}`;

    try {
      const res = await fetch('/api/tracking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: trackId,
          student: studentName,
          phone: studentPhone,
          item: orderingItem.title,
          status: 'Processing',
          courier: 'Domex Express',
        }),
      });

      if (res.ok) {
        setOrderSuccess(trackId);
        setOrderingItem(null);
        setStudentName('');
        setStudentPhone('');
      }
    } catch (err) {
      alert('Order failed. Please try again.');
    }
  };

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
              MathSpark <span className="theme-gradient">Store</span>
            </h1>
            <p className="page-hero-desc">
              Get official revision books, formula sheets, workbooks, and past paper packs delivered to your doorstep.
            </p>
          </div>
        </section>

        {orderSuccess && (
          <div className="container" style={{ paddingTop: 30 }}>
            <div style={{
              background: 'rgba(0,200,150,0.1)',
              border: '1px solid #00C896',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              color: '#00C896',
              textAlign: 'center'
            }}>
              <h3>🎉 Order Placed Successfully!</h3>
              <p style={{ marginTop: 8 }}>Your Tracking ID: <strong><code>{orderSuccess}</code></strong></p>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: 4 }}>
                You can track your delivery status anytime on our <a href="/tracking" style={{ color: '#00C896', textDecoration: 'underline' }}>Tracking Page</a>.
              </p>
            </div>
          </div>
        )}

        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div className="store-grid">
              {storeItems.map((item) => (
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
                      onClick={() => setOrderingItem(item)}
                    >
                      {item.inStock ? 'Order Now 🛒' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Modal for placing order */}
        {orderingItem && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20
          }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-xl)', padding: 32, maxWidth: 460, width: '100%'
            }}>
              <h3 style={{ marginBottom: 8 }}>Order: {orderingItem.title}</h3>
              <p className="text-muted text-sm" style={{ marginBottom: 20 }}>
                Total: LKR {orderingItem.price.toLocaleString()} (Cash on Delivery / Courier Delivery)
              </p>
              <form onSubmit={handlePlaceOrder}>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: Kavindi Perera"
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="form-label">WhatsApp / Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Ex: 0712345678"
                    value={studentPhone}
                    onChange={(e) => setStudentPhone(e.target.value)}
                    required
                  />
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setOrderingItem(null)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-accent">
                    Confirm Order 🚀
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWidgets />

      <style jsx>{`
        .store-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
          gap: 24px;
        }
        .store-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: var(--radius-lg);
          overflow: hidden;
          display: flex; flex-direction: column;
        }
        .store-card-image {
          height: 160px;
          position: relative;
        }
        .store-img-placeholder {
          width: 100%; height: 100%;
          background: linear-gradient(135deg, var(--surface), var(--surface-2));
          display: flex; align-items: center; justify-content: center;
          font-size: 2.5rem;
          position: relative;
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
        }
        .store-card-badge {
          position: absolute;
          top: 10px; left: 10px;
          background: var(--accent-gradient);
          color: white;
          font-size: 0.68rem; font-weight: 700;
          padding: 4px 10px; border-radius: var(--radius-xs);
        }
        .store-card-body {
          padding: 20px; flex: 1;
        }
        .store-card-title {
          font-size: 1.05rem; margin-bottom: 8px;
        }
        .store-card-desc {
          font-size: 0.82rem; color: var(--text-muted); margin-bottom: 16px;
        }
        .store-price-row {
          display: flex; align-items: center; gap: 10px;
        }
        .store-price {
          font-family: var(--font-mono); font-weight: 700; color: var(--paper); font-size: 1.1rem;
        }
        .store-original-price {
          font-family: var(--font-mono); font-size: 0.85rem; color: var(--muted); text-decoration: line-through;
        }
        .store-card-footer {
          padding: 0 20px 20px;
        }
      `}</style>
    </>
  );
}
