import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingWidgets from '@/components/layout/FloatingWidgets';
import Link from 'next/link';
import { SITE } from '@/lib/data';

export const metadata = {
  title: 'About Ishan Maduranga | Lead Mathematics Educator Sri Lanka',
  description: 'Learn about Ishan Maduranga, Sri Lanka\'s trusted online Mathematics teacher for Grades 6–11 & O/L. Over 8+ years of teaching experience in Sinhala & English medium.',
  keywords: ['Ishan Maduranga', 'Ishan Maduranga maths', 'Ishan Maduranga mathematics', 'Ishan Maduranga teacher', 'online maths teacher Sri Lanka'],
  alternates: {
    canonical: 'https://ishanmaduranga.lk/about',
  },
};

export default function AboutPage() {
  const jsonLdPerson = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    'name': 'Ishan Maduranga',
    'jobTitle': 'Senior Mathematics Educator',
    'knowsAbout': ['Mathematics', 'O/L Mathematics', 'Algebra', 'Geometry', 'Trigonometry', 'Statistics'],
    'description': 'Leading online Mathematics educator in Sri Lanka specializing in Grade 6–11 national curriculum in Sinhala and English medium.',
    'url': 'https://ishanmaduranga.lk/about',
    'sameAs': [
      'https://youtube.com/@ishanmaduranga333',
      'https://www.facebook.com/share/14gEfzCSjuS/?mibextid=wwXIfr'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <Header />
      <main style={{ background: 'var(--bg-dark)', color: '#fff', minHeight: '80vh', padding: '120px 0 60px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>
          
          {/* Hero Section */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <span style={{ background: 'rgba(37,99,235,0.15)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.3)', padding: '6px 16px', borderRadius: '999px', fontSize: '0.85rem', fontWeight: '700', letterSpacing: '0.05em' }}>
              ABOUT THE EDUCATOR
            </span>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '900', margin: '16px 0', background: 'linear-gradient(135deg, #fff 30%, #94a3b8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Ishan Maduranga
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#94a3b8', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
              Dedicated to making Mathematics clear, logical, and enjoyable for Grade 6–11 students across Sri Lanka.
            </p>
          </div>

          {/* Bio Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start', marginBottom: '60px' }}>
            <div style={{ background: 'rgba(15,23,42,0.6)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '20px', padding: '24px', textAlign: 'center' }}>
              <img
                src="/images/ishan_maduranga.png"
                alt="Ishan Maduranga Mathematics Educator"
                style={{ width: '180px', height: '180px', borderRadius: '50%', objectFit: 'cover', border: '4px solid #2563eb', margin: '0 auto 20px' }}
              />
              <h2 style={{ fontSize: '1.3rem', fontWeight: '800', margin: '0 0 6px', color: '#fff' }}>Ishan Maduranga</h2>
              <p style={{ fontSize: '0.9rem', color: '#3b82f6', fontWeight: '600', margin: '0 0 16px' }}>Lead Maths Educator (Online)</p>
              
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', textAlign: 'left', fontSize: '0.88rem', color: '#cbd5e1' }}>
                <p style={{ margin: '8px 0' }}>🎓 <strong>Background:</strong> B.Sc. Mathematics & Education</p>
                <p style={{ margin: '8px 0' }}>⏱ <strong>Experience:</strong> 8+ Years Teaching</p>
                <p style={{ margin: '8px 0' }}>🗣 <strong>Medium:</strong> Sinhala & English</p>
                <p style={{ margin: '8px 0' }}>📍 <strong>Format:</strong> 100% Online (Sri Lanka)</p>
              </div>

              <a
                href={`https://wa.me/${SITE.whatsapp}`}
                target="_blank"
                rel="noreferrer"
                style={{ display: 'block', marginTop: '20px', background: '#25D366', color: '#fff', padding: '12px', borderRadius: '12px', fontWeight: '700', textDecoration: 'none', textAlign: 'center' }}
              >
                💬 Contact on WhatsApp
              </a>
            </div>

            <div style={{ background: 'rgba(15,23,42,0.4)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '20px', padding: '32px' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#fff', marginBottom: '16px' }}>Teaching Philosophy & Approach</h2>
              <p style={{ color: '#cbd5e1', lineHeight: '1.7', marginBottom: '20px' }}>
                Mathematics is often perceived as a difficult subject, but with the right guidance and step-by-step breakdown, every student can master it. My goal at Ishan Maduranga Mathematics (MathSpark) is to simplify complex mathematical concepts, build problem-solving confidence, and prepare students thoroughly for term tests and national G.C.E. O/L examinations.
              </p>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#3b82f6', margin: '24px 0 12px' }}>What Makes Our Online Classes Unique?</h3>
              <ul style={{ color: '#cbd5e1', paddingLeft: '20px', lineHeight: '1.8' }}>
                <li><strong>Step-by-Step Problem Solving:</strong> Clear explanations for every theorem, equation, and past paper question.</li>
                <li><strong>Live Interactive Sessions & Recordings:</strong> Attend live weekly sessions with full HD recordings available anytime.</li>
                <li><strong>Comprehensive Study Materials:</strong> Structured PDF tutes, monthly model papers, and past paper discussions.</li>
                <li><strong>Direct WhatsApp Student Support:</strong> Clear doubts directly with Ishan Sir between classes.</li>
              </ul>

              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#3b82f6', margin: '24px 0 12px' }}>Grades & Classes Offered</h3>
              <p style={{ color: '#cbd5e1', lineHeight: '1.6' }}>
                We conduct online live classes and paper discussions for Grades 6, 7, 8, 9, 10, and 11 (O/L Revision) in both <strong>Sinhala Medium</strong> and <strong>English Medium</strong>.
              </p>

              <div style={{ marginTop: '30px', display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                <Link href="/ol-maths" className="btn btn-primary btn-md" style={{ textDecoration: 'none' }}>
                  Explore O/L Revision Class
                </Link>
                <Link href="/contact" className="btn btn-outline btn-md" style={{ textDecoration: 'none' }}>
                  Get Class Schedule
                </Link>
              </div>
            </div>
          </div>

          {/* Social Links & Trust */}
          <div style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#fff', marginBottom: '12px' }}>Follow Official Channels</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.95rem', marginBottom: '20px' }}>Join thousands of students on our official YouTube & Facebook pages for free lesson previews and paper discussions.</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <a href="https://youtube.com/@ishanmaduranga333" target="_blank" rel="noreferrer" style={{ background: '#ff0000', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none' }}>
                ▶ YouTube (@ishanmaduranga333)
              </a>
              <a href="https://www.facebook.com/share/14gEfzCSjuS/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ background: '#1877f2', color: '#fff', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', textDecoration: 'none' }}>
                📘 Facebook Page
              </a>
            </div>
          </div>

        </div>
      </main>
      <Footer />
      <FloatingWidgets />
    </>
  );
}
