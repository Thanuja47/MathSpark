import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import Link from 'next/link';

export const metadata = {
  title: 'Mathematics Study Guides & O/L Preparation Blog | Ishan Maduranga',
  description: 'Free mathematics study tips, Grade 6–11 lesson guides, and G.C.E. O/L exam preparation advice in English and Sinhala by Ishan Maduranga.',
  keywords: [
    'O/L maths study tips Sri Lanka',
    'Grade 6-11 mathematics lesson guides',
    'සාමාන්‍ය පෙළ ගණිතය පාඩම්',
    'Ishan Maduranga blog',
    'maths past paper techniques'
  ],
  alternates: {
    canonical: 'https://ishanmaduranga.lk/blog',
  },
};

const blogPosts = [
  {
    slug: 'how-to-prepare-for-ol-maths-sri-lanka',
    titleEn: 'How to Prepare for Sri Lanka G.C.E. O/L Mathematics (Top Strategies)',
    titleSi: 'සාමාන්‍ය පෙළ (O/L) ගණිතය විභාගයට නිවැරදිව සූදානම් වන්නේ කෙසේද?',
    date: 'August 15, 2026',
    excerptEn: 'Discover step-by-step revision plans, past paper time management techniques, and common student mistakes to avoid in O/L Mathematics.',
    excerptSi: 'O/L ගණිතය ප්‍රශ්න පත්‍රයට ලකුණු වැඩි කරගැනීම සඳහා කාලය කළමනාකරණය සහ නිවැරදි අධ්‍යයන ක්‍රමවේද.',
    category: 'O/L Preparation'
  },
  {
    slug: 'grade-6-to-11-maths-score-improvement',
    titleEn: 'How to Improve Grade 6–11 Mathematics Marks (Proven Methods)',
    titleSi: '6–11 ශ්‍රේණිවල ගණිතය ලකුණු ඉහළ නංවා ගන්නා ආකාරය',
    date: 'August 10, 2026',
    excerptEn: 'Practical guidance for students and parents to overcome math fear, master fundamentals, and excel in term test exams.',
    excerptSi: 'ගණිතයට ඇති බිය නැති කරගනිමින් මුලසිටම සූත්‍ර සහ සිද්ධාන්ත තේරුම් ගැනීමේ සාර්ථක පියවර.',
    category: 'Study Tips'
  }
];

export default function BlogHubPage() {
  return (
    <>
      <Header />
      <main style={{ background: 'var(--bg-dark)', color: '#fff', minHeight: '80vh', padding: '120px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{ background: 'rgba(37,99,235,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', padding: '6px 16px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700' }}>
              EDUCATIONAL RESOURCES & GUIDES
            </span>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '900', margin: '16px 0', background: 'linear-gradient(135deg, #fff 30%, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Mathematics Study Hub & O/L Guides
            </h1>
            <p style={{ fontSize: '1.05rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Articles, study plans, and exam revision guides written by Ishan Maduranga for Sri Lankan students and parents.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            {blogPosts.map((post) => (
              <article key={post.slug} style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ background: 'rgba(59,130,246,0.2)', color: '#60a5fa', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: '700' }}>
                    {post.category}
                  </span>
                  <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '14px 0 8px', color: '#fff', lineHeight: '1.4' }}>
                    {post.titleEn}
                  </h2>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: '700', margin: '0 0 12px', color: '#cbd5e1', lineHeight: '1.4' }}>
                    {post.titleSi}
                  </h3>
                  <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
                    {post.excerptEn}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#64748b', fontSize: '0.8rem' }}>📅 {post.date}</span>
                  <Link href={`/blog/${post.slug}`} className="btn btn-outline btn-sm" style={{ textDecoration: 'none' }}>
                    Read Article →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div style={{ background: 'rgba(30,41,59,0.3)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#fff', marginBottom: '8px' }}>Looking for Live Online Classes?</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>Join Ishan Maduranga&apos;s live Zoom classes for Grade 6–11 with recordings and personal WhatsApp support.</p>
            <Link href="/ol-maths" className="btn btn-primary btn-md" style={{ textDecoration: 'none' }}>
              Explore O/L Mathematics Classes
            </Link>
          </div>

        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
