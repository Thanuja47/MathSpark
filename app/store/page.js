'use client';
import { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import { STORE_ITEMS as STATIC_STORE_ITEMS } from '@/lib/data';

export default function StorePage() {
  const [storeItems, setStoreItems] = useState(STATIC_STORE_ITEMS);
  const [orderingItem, setOrderingItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [orderError, setOrderError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Fetch logged in user profile
    fetch('/api/auth/me')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user) setCurrentUser(data.user);
      })
      .catch(() => {});

    // Fetch dynamic store items from DB
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
            imageUrl: item.imageUrl,
          }));
          setStoreItems([...liveFormatted, ...STATIC_STORE_ITEMS]);
        }
      })
      .catch(err => console.error('Error fetching store items:', err));
  }, []);

  const handleOpenOrderModal = (item) => {
    if (!currentUser) {
      alert('Please log in to place an order.');
      return;
    }
    setOrderingItem(item);
    setQuantity(1);
    setOrderError(null);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!orderingItem) return;

    setSubmitting(true);
    setOrderError(null);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          storeItemId: orderingItem.id,
          itemTitle: orderingItem.title,
          itemPrice: orderingItem.price,
          quantity: quantity,
        }),
      });

      const data = await res.json();
      setSubmitting(false);

      if (!res.ok) {
        setOrderError(data.error || 'Failed to place order.');
      } else {
        setOrderSuccess(data.message || "Order placed! We'll contact you on WhatsApp to confirm payment via bank transfer.");
        setOrderingItem(null);
      }
    } catch (err) {
      setSubmitting(false);
      setOrderError('Server error. Please try again.');
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
              background: 'rgba(16,185,129,0.1)',
              border: '1px solid #10B981',
              borderRadius: 'var(--radius-lg)',
              padding: 24,
              color: '#10B981',
              textAlign: 'center'
            }}>
              <h3>🎉 {orderSuccess}</h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--paper)', marginTop: 8 }}>
                Bank Transfer &amp; WhatsApp payment details will be sent to your WhatsApp number.
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
                    {item.imageUrl ? (
                      <img src={item.imageUrl} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div className="store-img-placeholder">
                        <span>📖</span>
                        <div className="store-type-badge">{item.type.toUpperCase()}</div>
                      </div>
                    )}
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
                      onClick={() => handleOpenOrderModal(item)}
                    >
                      {item.inStock ? 'Order Now 🛒' : 'Out of Stock'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Order Modal */}
        {orderingItem && (
          <div style={{
            position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20
          }}>
            <div style={{
              background: 'var(--surface)', border: '1px solid var(--rule)',
              borderRadius: 'var(--radius-lg)', padding: 32, maxWidth: 460, width: '100%'
            }}>
              <h3 style={{ marginBottom: 8, color: 'var(--paper)' }}>Order Item</h3>
              <div style={{ background: 'var(--surface-2)', padding: 14, borderRadius: 'var(--radius-sm)', marginBottom: 20 }}>
                <div style={{ fontWeight: 700, color: 'var(--paper)', fontSize: '1rem' }}>{orderingItem.title}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--muted)', marginTop: 4 }}>
                  Price: <strong>LKR {orderingItem.price.toLocaleString()}</strong> each
                </div>
              </div>

              {orderError && (
                <div style={{ color: '#f87171', background: 'rgba(239,68,68,0.1)', padding: 10, borderRadius: 6, marginBottom: 16, fontSize: '0.85rem' }}>
                  {orderError}
                </div>
              )}

              <form onSubmit={handlePlaceOrder}>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" style={{ color: 'var(--text)' }}>Student Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentUser?.name || ''}
                    disabled
                    style={{ opacity: 0.8 }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 16 }}>
                  <label className="form-label" style={{ color: 'var(--text)' }}>WhatsApp Phone Number</label>
                  <input
                    type="text"
                    className="form-input"
                    value={currentUser?.phone || ''}
                    disabled
                    style={{ opacity: 0.8 }}
                  />
                </div>
                <div className="form-group" style={{ marginBottom: 20 }}>
                  <label className="form-label" style={{ color: 'var(--text)' }}>Quantity</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className="form-input"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                  />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--paper)', marginBottom: 20, textAlign: 'right' }}>
                  Total: LKR {(orderingItem.price * quantity).toLocaleString()}
                </div>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                  <button type="button" className="btn btn-ghost" onClick={() => setOrderingItem(null)} disabled={submitting}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary" disabled={submitting}>
                    {submitting ? 'Placing Order...' : 'Confirm Order 🚀'}
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
          border: 1px solid var(--rule);
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
          background: var(--cobalt);
          color: white;
          font-size: 0.68rem; font-weight: 700;
          padding: 4px 10px; border-radius: var(--radius-xs);
        }
        .store-card-body {
          padding: 20px; flex: 1;
        }
        .store-card-title {
          font-size: 1.05rem; margin-bottom: 8px; color: var(--paper);
        }
        .store-card-desc {
          font-size: 0.82rem; color: var(--muted); margin-bottom: 16px;
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
        .form-group {
          display: flex; flex-direction: column;
        }
        .form-label {
          font-size: 0.85rem; font-weight: 600; margin-bottom: 6px;
        }
        .form-input {
          padding: 10px 14px; background: var(--surface-2); border: 1px solid var(--rule);
          border-radius: var(--radius-sm); color: var(--paper); font-size: 0.9rem;
        }
      `}</style>
    </>
  );
}
